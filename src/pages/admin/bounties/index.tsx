//@ts-nocheck
import AdminLayout from "@/components/AdminLayout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminHome() {
  const [bounties, setBounties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await axios.get("/api/get-bounties");
        console.log(response.data);
        setBounties(response.data.bounties);
      } catch (error) {
        console.error("Failed to fetch bounties", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBounties();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  const deleteBounty = async (id: any) => {
    if (confirm("Are you sure you want to delete this bounty?")) {
      try {
        await axios.post(`/api/delete-bounty`, { id });
        setBounties(bounties.filter((bounty) => bounty.id !== id));
        toast.success("Bounty deleted successfully");
      } catch (error) {
        console.error("Failed to delete bounty", error);
        toast.error("Failed to delete bounty");
      }
    }
  };

  return (
    <>
      <AdminLayout>
        <header>
          <div className="px-4 mx-auto mt-0 max-w-7xl sm:px-6 lg:px-8">
            <h1 className="my-2 text-3xl font-bold leading-tight tracking-tight text-white ">
              Bounties
            </h1>
          </div>
        </header>
        <main className="">
          <div className="mx-auto text-white max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto"></div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <Link href="/admin/dashboard">
                    <button
                      type="button"
                      className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add bounty
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flow-root mt-8">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle ">
                    <table className="min-w-full divide-y divide-slate-800">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Name
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
                            Reward
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            End Date
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Submissions Count
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {bounties.map((bountie) => (
                          <tr key={bountie.id}>
                            <td className="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0">
                              {bountie.title}
                            </td>
                            <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                              {bountie.description}
                            </td>
                            <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                              {bountie.reward}
                            </td>
                            <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                              {new Date(bountie.endDate).toLocaleDateString()}
                            </td>
                            <td className="px-3 py-4 text-sm text-white whitespace-nowrap">
                              {bountie.submissionCount}
                            </td>
                            <td className="relative flex items-center gap-5 py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                              <button
                                onClick={() => deleteBounty(bountie.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
