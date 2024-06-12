import fetcher from "@/utils/fetcher";

export default async function (bountyStatus: "active" | "past" = "active") {
    try {
        const {data} = await fetcher(`/bounties?bountyStatus=${bountyStatus}`);

        return data.bounties;
    } catch (error) {
        throw error;
    }
}