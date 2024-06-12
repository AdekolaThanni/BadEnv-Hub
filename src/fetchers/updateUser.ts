import fetcher from "@/utils/fetcher";

export default async function (userId: string, userData: any) {
    try {
        const {message} = await fetcher(`/users/${userId}`, "PUT", {user: userData});

        return message;
    } catch (error) {
        throw error;
    }
}