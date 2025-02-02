import { PrismaClient } from '@prisma/client';
import dayjs from "dayjs";
import {LogPayload} from "@/_types/logger/payload";

const prisma = new PrismaClient();

export class DbSaveLogger {
    static async error(error: Error) {
        try {
            const log : LogPayload = {
                message: error.message,
                stack: error.stack,
                timestamp: dayjs().toISOString(),
            }
            await prisma.errorLog.create({
                data: log,
            });
        } catch (dbError) {
            console.error('Failed to log error to the database:', dbError);
        }
    }
}