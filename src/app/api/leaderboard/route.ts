import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const drivers = await prisma.user.findMany({
      where: {
        role: "DRIVER",
      },
      select: {
        id: true,
        name: true,
        driverNumber: true,
        jobs: {
          where: {
            status: "APPROVED",
          },
          select: {
            distanceKm: true,
            income: true,
          },
        },
      },
    });

    const leaderboardData = drivers.map((driver) => {
      const totalKm = driver.jobs.reduce((sum, job) => sum + job.distanceKm, 0);
      const totalRevenue = driver.jobs.reduce(
        (sum, job) => sum + job.income,
        0,
      );
      const jobsCompleted = driver.jobs.length;

      return {
        id: driver.id,
        name: driver.name,
        driverNumber: driver.driverNumber || "Unassigned",
        totalKm,
        totalRevenue,
        jobsCompleted,
      };
    });

    leaderboardData.sort((a, b) => b.totalKm - a.totalKm);

    return NextResponse.json(leaderboardData, { status: 200 });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to compile telemetry statistics" },
      { status: 500 },
    );
  }
}
