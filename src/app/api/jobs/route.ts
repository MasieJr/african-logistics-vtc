import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized access path denied." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const {
      departureCity,
      arrivalCity,
      cargo,
      distanceKm,
      fuelUsedLiters,
      income,
      screenshotUrl,
    } = body;

    if (!departureCity || !arrivalCity || !cargo || !distanceKm || !income) {
      return NextResponse.json(
        { error: "Missing required core delivery logging parameters." },
        { status: 400 },
      );
    }

    const newJob = await prisma.job.create({
      data: {
        driverId: session.user.id,
        departureCity,
        arrivalCity,
        cargo,
        distanceKm,
        fuelUsedLiters: fuelUsedLiters || 0.0,
        income,
        screenshotUrl,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Database Write Job Failure Stacktrace:", error);
    return NextResponse.json(
      { error: "Internal processing engine system error." },
      { status: 500 },
    );
  }
}
