const API_URL = process.env.EXPO_PUBLIC_API_URL!

export interface FetchDataResponse {
    success: boolean;
    message?: string;
    result?: any;
}

export interface IUser {
    _id: string;
    email: string;
    username: string;
    avatar: string;
}

export interface ILoginUser {
    success: boolean;
    token: string;
    user: IUser;
}


const fetchData = async (api: string, method: 'GET' | 'POST' | 'DELETE' | 'PUT', body: object | null = null) => {
    try {
        const response = await fetch(`${API_URL}${api}`, {
            method,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
            },
            body: body ? JSON.stringify(body) : null,
        });
        const result = await response.json();

        if (!response.ok && result.success === false) {
            throw new Error(result.message || 'Network response was not ok');
        }

        return result
    } catch (error: unknown) {
        console.log('Something went wrong:', (error as Error).message);
        throw new Error((error as Error).message);
    }
};


export const loginUser = async (email: string, password: string) => {
    const api = '/auth/login';
    const method = 'POST';
    const body = { email, password };

    return fetchData(api, method, body);
};

export const registerUser = async (email: string, password: string, username: string) => {
    const api = '/auth/register';
    const method = 'POST';
    const body = { email, password, username };

    return fetchData(api, method, body);
};

export const getUser = async (userId: string) => {
    const api = `/users/${userId}`;
    const method = 'GET';
    const body = {};

    return fetchData(api, method, body);
};

export const getVideos = async () => {
    const api = '/videos';
    const method = 'GET';

    return fetchData(api, method);
};

export const getLatestVideos = async () => {
    const api = '/videos/?sort[createdAt]=desc&limit=6';
    const method = 'GET';

    return fetchData(api, method);
};