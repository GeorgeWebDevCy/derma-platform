import { NextResponse } from "next/server"

// Placeholder API to start wiring consultation data to dashboards.
// TODO: secure with auth middleware and connect to Prisma once schema is ready.
export async function GET() {
    return NextResponse.json({
        consultations: [
            {
                id: "placeholder-1",
                status: "pending",
                patientEmail: "patient@example.com",
                summary: "Skin rash, 2 days",
            },
        ],
    })
}

export async function POST() {
    return NextResponse.json(
        { message: "Consultation creation not yet implemented" },
        { status: 501 }
    )
}
