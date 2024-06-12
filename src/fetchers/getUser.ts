import fetcher from "@/utils/fetcher";

export default async function (userId: string) {
    try {
        const {data} = await fetcher(`/users/${userId}`);

        return data.user;
    } catch (error) {
        throw error;
    }
}