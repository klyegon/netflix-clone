import { PrismaClient } from "@prisma/client";

// to solve the issue of hot reloading in next js
// where prisma client is initiated on every hot reloading
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;