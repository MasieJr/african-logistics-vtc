import { PrismaClient, Role, JobStatus } from "@prisma/client";

// prisma/seed.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

// 1. Force the script to read both environment files just to be safe!
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

// 2. Setup Prisma 7 connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Clean-starting database seed...");
  await prisma.job.deleteMany({});
  await prisma.user.deleteMany({});

  // Generate a real secure hash for testing
  const hashedPassword = await bcrypt.hash("VtcDriver2026!", 10);

  const dispatcher = await prisma.user.create({
    data: {
      email: "dispatch@africanlogistics.com",
      name: "Mzi Khumalo",
      password: hashedPassword,
      role: Role.DISPATCHER,
      driverNumber: "ALV-001",
    },
  });

  const driver1 = await prisma.user.create({
    data: {
      email: "johannes@trucking.co.za",
      name: "Johannes Sipho",
      password: hashedPassword,
      role: Role.DRIVER,
      driverNumber: "ALV-002",
    },
  });

  const driver2 = await prisma.user.create({
    data: {
      email: "amina@logistics.com",
      name: "Amina Diop",
      password: hashedPassword,
      role: Role.DRIVER,
      driverNumber: "ALV-003",
    },
  });

  // 4. Create mock Job logs
  await prisma.job.createMany({
    data: [
      {
        driverId: driver1.id,
        departureCity: "Johannesburg (South Africa)",
        arrivalCity: "Gaborone (Botswana)",
        cargo: "Heavy Machinery",
        distanceKm: 350,
        fuelUsedLiters: 145.5,
        income: 4200.0,
        screenshotUrl:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7",
        status: JobStatus.APPROVED,
      },
      {
        driverId: driver1.id,
        departureCity: "Cape Town (South Africa)",
        arrivalCity: "Windhoek (Namibia)",
        cargo: "Electronic Components",
        distanceKm: 1480,
        fuelUsedLiters: 610.2,
        income: 18500.0,
        screenshotUrl:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7",
        status: JobStatus.APPROVED,
      },
      {
        driverId: driver2.id,
        departureCity: "Nairobi (Kenya)",
        arrivalCity: "Kampala (Uganda)",
        cargo: "Agricultural Supplies",
        distanceKm: 650,
        fuelUsedLiters: 270.0,
        income: 7800.0,
        screenshotUrl:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7",
        status: JobStatus.PENDING, // This one needs review from dispatch!
      },
    ],
  });

  console.log("Database successfully seeded with mock tracking metrics!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
