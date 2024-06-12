//@ts-nocheck
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { IoAddCircleOutline } from "react-icons/io5";
import { useWallet } from "@solana/wallet-adapter-react";
import submitBounty from "@/fetchers/submitBounty";
import { useUser } from "@/contexts/UserProvider";
import toast from "react-hot-toast";
import getUser from "@/fetchers/getUser";

const submissionSchema = z.object({
  comments: z
    .string()
    .min(5, { message: "Comment must be at least 5 characters." }),
  contentLink: z
    .string()
    .min(10, { message: "Content Link must be at least 10 characters." }),
  socialLink: z.string(),
});

export default function SubmitModal({ open, setOpen, id, onComplete }: any) {
  const cancelButtonRef = useRef(null);
  const {user, setUser} = useUser();
  const [submissionLoading, setSubmissionLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(submissionSchema),
  });

  const onSubmit = async (data: any) => {
    const submissionData = {
      ...data,
      bountyId: id,
      userId: user.id,
    };

    try {
      setSubmissionLoading(true);

      await submitBounty(id, submissionData);

      const userNewData = await getUser(user.id);
      setUser(userNewData)

      toast.success("Submission successfully accepted");

      onComplete();
    } catch (error: any) {
      console.error("Error submitting data", error);
      toast.error(`Error submitting data: ${error.message}`)
    } finally {
      setSubmissionLoading(false)
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-[#161616]" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 text-white overflow-hidden text-left transition-all transform rounded-lg shadow-xl  bg-[#161616] sm:my-8 sm:w-full sm:max-w-lg sm:p-6 basis-[400px]">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-0 space-y-8 text-white"
                  >
                    <div>
                      <div className="text-2xl font-bold uppercase">Apply your work</div>
                      <div className=" text-center sm:mt-5">
                        <div className=" space-y-8 text-white">
                          {/* Content Link */}
                          <FormField
                            control={form.control}
                            name="contentLink"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-start">
                                <FormLabel className="font-bold text-xl">
                                  Content Link
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="border-[#6C6C6C] rounded-[5px]"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Social Link */}
                          <FormField
                            control={form.control}
                            name="socialLink"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-start">
                                <FormLabel className="font-bold text-xl">
                                  Social Link
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="border-[#6C6C6C] rounded-[5px]"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-start">
                                <FormLabel className="font-bold text-xl">
                                  Comments
                                </FormLabel>
                                <FormControl>
                                  <textarea
                                    {...field}
                                    className="w-full p-2 border bg-transparent border-[#6C6C6C] rounded-[5px]"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex items-end justify-end ">
                      <button
                        type="submit"
                        className="inline-flex justify-center text-xl float-right px-3 py-2 uppercase text-md font-bold text-[#6C6C6C] border-[#6C6C6C] border-2  rounded-[5px] shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <span className="">Submit</span>
                        
                        {submissionLoading && <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
                    }
                      </button>
                    </div>
                  </form>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
