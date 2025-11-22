import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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

    await prisma.consultation.create({
        data: {
            patientId: session.user.id,
            status: "pending",
            description,
        },
    })

    return NextResponse.json({ ok: true })
}
