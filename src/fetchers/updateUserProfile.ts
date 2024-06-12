import fetcher from "@/utils/fetcher";

export default async function (userId: string, userProfile: any, profileIsNew: boolean) {
    try {
        const {message} = await fetcher(`/users/${userId}/profile?profileIsNew=${profileIsNew}`, "PUT", {...userProfile});

        return message;
    } catch (error) {
        throw error;
    }
}