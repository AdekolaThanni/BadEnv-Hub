//@ts-nocheck
import AdminLayout from "@/components/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const bountySchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  endDate: z.string(), // You can add more validation based on your date format
  reward: z.string().min(1, {
    message: "Reward must be greater than 0.",
  }),
});

export default function AdminHome() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(bountySchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/create-bounty", data); // Replace '/api/your-endpoint' with your actual endpoint
      toast.success("Bounty created successfully!");
      router.push("/admin/bounties");
    } catch (error) {
      console.error(error);
      toast.error("Error creating bounty.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminLayout>
        <header>
          <div className="flex items-center justify-between w-full px-4 mx-auto mt-0 max-w-7xl sm:px-6 lg:px-8">
            <h1 className="my-2 text-3xl font-bold leading-tight tracking-tight text-white ">
              Create new bounty
            </h1>
            <div>
              <Link href="/admin/bounties/">
                <button className="px-4 py-3 text-white rounded-lg btn bg-slate-700">
                  SHOW BOUNTIIES
                </button>
              </Link>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto text-white max-w-7xl sm:px-6 lg:px-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the title of the bounty.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Describe the bounty details.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* End Date */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Specify the end date of the bounty.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Reward */}
                <FormField
                  control={form.control}
                  name="reward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reward</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormDescription>Set the reward amount.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="rounded-lg bg-slate-800" type="submit">
                  Create Bounty
                </Button>
              </form>
            </Form>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
