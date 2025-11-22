'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function getSessionOrThrow() {
    const session = await auth()
    if (!session || !session.user?.id) {
        throw new Error("Unauthorized")
    }
    return session
}

export async function requestConsultation(formData?: FormData) {
    const session = await getSessionOrThrow()

    const description = formData?.get("description")?.toString().trim() || "New consultation request"
    const symptoms = formData?.get("symptoms")?.toString().trim() || null
    const duration = formData?.get("duration")?.toString().trim() || null
    const requestedSpecialty = formData?.get("requestedSpecialty")?.toString().trim() || null
    const imagesInput = formData?.get("images")?.toString().trim() || ""
    const imageList =
        imagesInput
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean) || []

    // Ensure patient profile exists for the requesting user
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { patientProfile: true },
    })

    if (!user) throw new Error("User not found")

    if (!user.patientProfile) {
        await prisma.patientProfile.create({
            data: { userId: user.id },
        })
    }

    await prisma.consultation.create({
        data: {
            patientId: user.id,
            status: "pending",
            description,
            symptoms,
            duration,
            requestedSpecialty,
            images: imageList.length ? JSON.stringify(imageList) : null,
        },
    })

    revalidatePath("/dashboard/patient")
    revalidatePath("/dashboard/doctor")
}

export async function acceptConsultation(formData: FormData) {
    const session = await getSessionOrThrow()
    const id = formData.get("consultationId")?.toString()
    if (!id) throw new Error("Missing consultationId")
    if (session.user.role !== "doctor") throw new Error("Only doctors can accept consultations")

    const [consultation, doctorProfile] = await Promise.all([
        prisma.consultation.findUnique({ where: { id } }),
        prisma.doctorProfile.findUnique({ where: { userId: session.user.id } }),
    ])
    if (!consultation) throw new Error("Consultation not found")
    if (consultation.status !== "pending") throw new Error("Consultation already assigned")
    if (!doctorProfile?.isAvailable) throw new Error("You must be online to accept consultations")

    await prisma.consultation.update({
        where: { id },
        data: { doctorId: session.user.id, status: "assigned" },
    })

    revalidatePath("/dashboard/doctor")
    revalidatePath("/dashboard/patient")
}

export async function completeConsultation(formData: FormData) {
    const session = await getSessionOrThrow()
    const id = formData.get("consultationId")?.toString()
    if (!id) throw new Error("Missing consultationId")
    if (session.user.role !== "doctor") throw new Error("Only doctors can complete consultations")

    const consultation = await prisma.consultation.findUnique({ where: { id } })
    if (!consultation) throw new Error("Consultation not found")
    if (consultation.doctorId !== session.user.id) throw new Error("You are not assigned to this consultation")

    await prisma.consultation.update({
        where: { id },
        data: { status: "completed" },
    })

    revalidatePath("/dashboard/doctor")
    revalidatePath("/dashboard/patient")
}

export async function releaseConsultation(formData: FormData) {
    const session = await getSessionOrThrow()
    if (session.user.role !== "doctor") throw new Error("Only doctors can release consultations")

    const id = formData.get("consultationId")?.toString()
    if (!id) throw new Error("Missing consultationId")

    const consultation = await prisma.consultation.findUnique({ where: { id } })
    if (!consultation) throw new Error("Consultation not found")
    if (consultation.doctorId !== session.user.id) throw new Error("You are not assigned to this consultation")
    if (consultation.status !== "assigned") throw new Error("Only assigned consultations can be released")

    await prisma.consultation.update({
        where: { id },
        data: { status: "pending", doctorId: null },
    })

    revalidatePath("/dashboard/doctor")
    revalidatePath("/dashboard/patient")
}

export async function upsertDoctorProfile(formData: FormData) {
    const session = await getSessionOrThrow()
    if (session.user.role !== "doctor") throw new Error("Only doctors can update doctor profile")

    const bio = formData.get("bio")?.toString().trim() || null
    const specialty = formData.get("specialty")?.toString().trim() || null

    await prisma.doctorProfile.upsert({
        where: { userId: session.user.id },
        update: { bio, specialty },
        create: { userId: session.user.id, bio, specialty },
    })

    revalidatePath("/dashboard/doctor")
    revalidatePath("/auth/doctor/signup")
}

export async function updateConsultationNotes(formData: FormData) {
    const session = await getSessionOrThrow()
    if (session.user.role !== "doctor") throw new Error("Only doctors can add notes")

    const id = formData.get("consultationId")?.toString()
    const notes = formData.get("notes")?.toString().trim() || null
    if (!id) throw new Error("Missing consultationId")

    const consultation = await prisma.consultation.findUnique({ where: { id } })
    if (!consultation) throw new Error("Consultation not found")
    if (consultation.doctorId !== session.user.id) throw new Error("You are not assigned to this consultation")

    await prisma.consultation.update({
        where: { id },
        data: { notes },
    })

    revalidatePath("/dashboard/doctor")
    revalidatePath("/dashboard/patient")
}

export async function setDoctorAvailability(formData: FormData) {
    const session = await getSessionOrThrow()
    if (session.user.role !== "doctor") throw new Error("Only doctors can set availability")

    const status = formData.get("status")?.toString()
    const isAvailable = status === "online"

    await prisma.doctorProfile.upsert({
        where: { userId: session.user.id },
        update: { isAvailable },
        create: { userId: session.user.id, isAvailable },
    })

    revalidatePath("/dashboard/doctor")
    revalidatePath("/dashboard/patient")
}

export async function cancelConsultation(formData: FormData) {
    const session = await getSessionOrThrow()
    if (session.user.role !== "patient") throw new Error("Only patients can cancel consultations")

    const id = formData.get("consultationId")?.toString()
    if (!id) throw new Error("Missing consultationId")

    const consultation = await prisma.consultation.findUnique({ where: { id } })
    if (!consultation) throw new Error("Consultation not found")
    if (consultation.patientId !== session.user.id) throw new Error("Not your consultation")
    if (consultation.status !== "pending") throw new Error("Only pending consultations can be cancelled")

    await prisma.consultation.update({
        where: { id },
        data: { status: "cancelled" },
    })

    revalidatePath("/dashboard/patient")
    revalidatePath("/dashboard/doctor")
}
