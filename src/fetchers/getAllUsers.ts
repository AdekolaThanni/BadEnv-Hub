import fetcher from "@/utils/fetcher";

export default async function () {
    try {
        const {data} = await fetcher(`/users`);

        return data.users;
    } catch (error) {
        throw error;
    }
}