//@ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get("/api/get-subs");
      setSubmissions(response.data);
    } catch (error) {
      console.error("Failed to fetch submissions", error);
      toast.error("Failed to fetch submissions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleApproval = async (submissionId: any, newStatus: any) => {
    try {
      await axios.post("/api/update-status", {
        submissionId,
        status: newStatus,
      });
      fetchSubmissions();
      toast.success(`Submission ${newStatus}`);
    } catch (error) {
      console.error("Failed to update submission status", error);
      toast.error("Failed to update submission status");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <AdminLayout>
      <header>
        <div className="px-4 mx-auto mt-0 max-w-7xl sm:px-6 lg:px-8">
          <h1 className="my-2 text-3xl font-bold leading-tight tracking-tight text-white ">
            Submissions
          </h1>
        </div>
      </header>
      <div className="container mx-auto overflow-x-auto">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <table className="min-w-full divide-y divide-slate-800">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                >
                  Wallet Id
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Content Link
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Social Link
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-white divide-y divide-slate-800">
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  {/* Map your submission data to table rows */}
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0">
                    <div className="w-[120px] overflow-y-auto">
                      {submission.wallet.address}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                    {submission.description}
                  </td>
                  <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                    {submission.contentLink}
                  </td>
                  <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                    {submission.socialLink}
                  </td>

                  <td className="flex items-center gap-5 px-3 py-4 text-sm text-white whitespace-nowrap">
                    {submission.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleApproval(submission.id, "approved")
                          }
                          className="px-5 py-2 text-black bg-green-500"
                        >
                          Approve
                        </button>
                        <button
                          className="px-5 py-2 text-black bg-red-500"
                          onClick={() =>
                            handleApproval(submission.id, "declined")
                          }
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <>
                        {submission.status === "approved" ? (
                          <>
                            <button className="px-5 py-2 text-black bg-green-500">
                              Approved
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="px-5 py-2 text-black bg-red-500">
                              Declined
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
