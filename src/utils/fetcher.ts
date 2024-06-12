export default async (endpoint: string, method: string = "GET", body?: any) => {
    try {
        const fetchOptions: any = {};

        fetchOptions.method = method.toUpperCase();
        fetchOptions.headers = {
            'Content-Type': "application/json",
        }

        if (method.toLowerCase() !== "GET") {
            fetchOptions.body = JSON.stringify(body)
        }

        const serverUrl = process.env.NEXTAUTH_URL === "http://localhost:3000" ? "http://localhost:8080" : "https://bad-env-server.vercel.app"
        const response = await fetch(`${serverUrl}/api/v1${endpoint}`, fetchOptions);
    
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message)
        }
    
        return data;    
    } catch (error) {
        throw error;
    }
}