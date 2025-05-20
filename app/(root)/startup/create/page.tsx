import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="bg-gray-300 mx-2 border-b-4 border-black">
        <div className="max-w-[700px] mx-auto px-16 py-8 items-center flex flex-col">
          <div className="text-3xl my-8 px-4 py-2 bg-amber-200 rounded-2xl border-2 border-r-4 border-b-4 border-black">
            Submit your startup
          </div>
        </div>
      </section>
      <StartupForm />
    </>
  );
};

export default page;
