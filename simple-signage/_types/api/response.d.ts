export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T | Array<T>;
}