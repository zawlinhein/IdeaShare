import { StartupType } from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/query";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post: StartupType = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();
  return (
    <>
      <section className="bg-gray-300 mx-2 border-b-4 border-black">
        <div className="max-w-[700px] mx-auto px-16 py-8 items-center flex flex-col">
          <div className="px-2 py-1 bg-yellow-300 w-fit rounded-xl border-2 border-b-4 border-r-4 border-black my-1">
            {formatDate(post._createdAt)}
          </div>
          <div className="bg-pink-300 w-full px-8 py-8 text-center my-8 text-2xl font-bold rounded-2xl border-4 border-black">
            {post.title}
          </div>
          <div className="">{post.description}</div>
        </div>
      </section>
      <section className="max-w-[700px] mx-auto px-16 py-4 my-4 items-center flex flex-col">
        <div className=" mx-auto ">
          {post.image && (
            <img
              src={post.image}
              alt={post.title || ""}
              className="rounded-xl"
            />
          )}
        </div>
        <div className="w-full flex flex-row justify-between items-center my-2">
          <Link href={`/user/${post.author._id}`}>
            <div className="flex flex-row">
              <Image
                src={post.author.image!}
                width={48}
                height={48}
                alt={post.author.name!}
                className="rounded-full"
              />
              <div className="flex flex-col mx-2">
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-gray-400 text-sm">{`@${post.author.username}`}</div>
              </div>
            </div>
          </Link>
          <div className="border-1 border-green-400 bg-green-200 rounded-3xl px-2 py-1 border-b-2 border-r-2">
            {post.category}
          </div>
        </div>
        <div className="text-2xl font-bold flex flex-row self-start">
          Pitch Details
        </div>
        <div className="border-2 bg-green-100 border-black rounded-xl px-2 py-1 self-start">
          {post.pitch}
        </div>

        <Suspense fallback={<Skeleton />}>
          <View id={post._id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
