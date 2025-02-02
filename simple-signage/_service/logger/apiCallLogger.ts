import {LogPayload} from "@/_types/logger/payload";
import path from "path";
import dayjs from "dayjs";

const LOG_SAVE_API = path.resolve(process.env.LOG_SAVE_API ?? "", "public/uploads");

export class ApiCallLogger {
    static async error(error: Error) {
        try {
            const payload: LogPayload = {
                message: error.message,
                stack: error.stack,
                timestamp: dayjs().toISOString(),
            }
            const response = await fetch(LOG_SAVE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to log error to the external API');
            }
        } catch (apiError) {
            console.error('Failed to log error to the external API:', apiError);
        }
    }
}