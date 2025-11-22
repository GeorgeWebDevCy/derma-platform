import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { SPECIALTIES } from "@/lib/specialties"

export async function GET() {
    const session = await auth()
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let consultations
    if (session.user.role === "doctor") {
        consultations = await prisma.consultation.findMany({
            include: { patient: true },
            orderBy: { createdAt: "desc" },
        })
    } else {
        consultations = await prisma.consultation.findMany({
            where: { patientId: session.user.id },
            include: { doctor: true },
            orderBy: { createdAt: "desc" },
        })
    }

    return NextResponse.json({ consultations })
}

export async function POST(request: Request) {
    const session = await auth()
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (session.user.role !== "patient") {
        return NextResponse.json({ error: "Only patients can create consultations" }, { status: 403 })
    }

    const body = await request.json().catch(() => ({}))
    const description = typeof body.description === "string" && body.description.trim().length > 0
        ? body.description.trim()
        : "New consultation request"
    const symptoms = typeof body.symptoms === "string" && body.symptoms.trim().length > 0 ? body.symptoms.trim() : null
    const duration = typeof body.duration === "string" && body.duration.trim().length > 0 ? body.duration.trim() : null
    const requestedSpecialtyRaw = typeof body.requestedSpecialty === "string" && body.requestedSpecialty.trim().length > 0 ? body.requestedSpecialty.trim() : null
    const requestedSpecialty = requestedSpecialtyRaw && SPECIALTIES.includes(requestedSpecialtyRaw) ? requestedSpecialtyRaw : null
    const images = Array.isArray(body.images)
        ? body.images.filter((v: unknown) => typeof v === "string" && v.trim().length > 0).map((v: string) => v.trim())
        : []

    await prisma.consultation.create({
        data: {
            patientId: session.user.id,
            status: "pending",
            description,
            symptoms,
            duration,
            requestedSpecialty,
            images: images.length ? JSON.stringify(images) : null,
        },
    })

    return NextResponse.json({ ok: true })
}
