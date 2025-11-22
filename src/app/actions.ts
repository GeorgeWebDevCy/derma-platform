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

    const consultation = await prisma.consultation.findUnique({ where: { id } })
    if (!consultation) throw new Error("Consultation not found")
    if (consultation.status !== "pending") throw new Error("Consultation already assigned")

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
