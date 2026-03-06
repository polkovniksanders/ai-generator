export interface User {
    id: number;
    uuid: string;
    name: string;
    surname: string;
    age: number;
    profession?: string;
    description?: string;
    image?: string;
    createdAt: string;
}

export interface CreateUserPayload {
    name: string;
    surname: string;
    age: number;
    profession?: string;
}

export interface CreateUserResponse {
    user: User;
    session: {
        count: number;
        limit: number;
        cooldownUntil: number | null;
        canGenerate: boolean;
        remaining: number;
    };
}
