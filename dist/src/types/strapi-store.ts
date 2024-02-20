export interface StrapiHTTPHeader {
    "Content-Type": string;
    "Authorization"?: string;
}

export interface StrapiUser {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface StrapiAuthenticationError {
    status?: number;
    name: string;
    message: string;
    details?: {
        errors?: Array<{
            message: string,
            name: string,
            path: Array<string>
        }>
    };
}