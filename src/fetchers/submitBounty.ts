import fetcher from "@/utils/fetcher";

export default async function (bountyId: string, submissionData: any) {
    try {
        await fetcher(`/bounties/${bountyId}/submit`, "POST", submissionData);
    } catch (error) {
        throw error;
    }
}