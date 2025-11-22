'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function requestConsultation() {
    const session = await auth()

    if (!session || !session.user || !session.user.email) {
        throw new Error("Unauthorized")
    }

    // 1. Get or Create Patient Profile
    // In a real app, this would happen during onboarding
    let user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { patientProfile: true }
    })

    if (!user) throw new Error("User not found")

    if (!user.patientProfile) {
        await prisma.patientProfile.create({
            data: {
                userId: user.id
            }
        })
    }

    // 2. Create Consultation Request
    await prisma.consultation.create({
        data: {
            patientId: user.id,
            status: "pending",
            description: "New consultation request"
        }
    })

    // 3. Trigger Matching Logic (Placeholder)
    // await matchDoctor(consultation.id)

    revalidatePath("/dashboard/patient")
}
