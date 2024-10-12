import { PrismaClient } from '@prisma/client';

// Export prisma client as a global variable to prevent dev instances from hot reloading.

const globalPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalPrisma.prisma || new PrismaClient();
export default prisma;

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;