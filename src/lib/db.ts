import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

// 1. Force the script to read both environment files just to be safe!
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

// 2. Setup Prisma 7 connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = new PrismaClient({ adapter });
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? ["query", "error", "warn"]
//         : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
