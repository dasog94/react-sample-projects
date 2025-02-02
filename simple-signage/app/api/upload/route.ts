import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {ApiResponse} from "@/_types/api/response";
import {StatusCodes} from "http-status-codes";

const UPLOAD_DIR = path.resolve(process.env.UPLOADED_IMAGE_PATH ?? "", "public/uploads");

export const config = {
    api: {
        bodyParser: false,
    },
};

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as File) || null;

    if (!file) {
        return NextResponse.json<ApiResponse<string>>({
            success: false,
            message: 'No file uploaded',
        }, { status: StatusCodes.BAD_REQUEST });
    }

    try {
        const fileId = file.name;
        await fs.writeFile(path.join(UPLOAD_DIR, fileId), Buffer.from(await file.arrayBuffer()));
        return NextResponse.json<ApiResponse< string >>({
            success: true,
            data: fileId,
        }, { status: StatusCodes.CREATED });
    } catch (error) {
        console.error(error);
        return NextResponse.json<ApiResponse< null >>({
            success: false,
            message: 'Error saving the file',
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
};