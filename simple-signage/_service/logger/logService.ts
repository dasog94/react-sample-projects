import { ApiCallLogger } from '@/_service/logger/apiCallLogger';
import { DbSaveLogger } from '@/_service/logger/dbSaveLogger';

const USE_EXTERNAL_LOGGING = process.env.USE_EXTERNAL_LOGGING === 'true';

export class LogService {
    static async error(error: Error) {
        if (USE_EXTERNAL_LOGGING) {
            try {
                await ApiCallLogger.error(error);
            } catch (apiError) {
                console.error('API logging failed, falling back to DB logging:', apiError);
                try {
                    await DbSaveLogger.error(error);
                } catch (dbError) {
                    console.error('Failed to log error to the database:', dbError);
                }
            }
        } else {
            console.error('External logging is disabled. Error:', error);
        }
    }
}