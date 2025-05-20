import { auth } from "@/auth";
import PostCard, { StartupType } from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID, STARTUP_QUERY_BY_AUTHOR } from "@/sanity/lib/query";
import { Author } from "@/sanity/sanity.types";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  const user: Author = await client.fetch(AUTHOR_BY_ID, { id });
  if (!user) return notFound();
  const session = await auth();

  const posts = await client.fetch(STARTUP_QUERY_BY_AUTHOR, {
    id: user._id,
  });
  return (
    <div className="flex flex-col md:flex-row my-8 mx-4 gap-5">
      <div className="max-w-[600px] mx-auto">
        <div className="flex flex-col items-center w-max bg-gray-300 md:mt-16 px-16 py-8 rounded-2xl border-4 border-black border-b-6 border-r-6 shadow-2xl shadow-gray-600">
          <div className="bg-amber-200 text-xl font-semibold px-8 py-4 rounded-3xl border-2 border-black -mt-14 w-fit">
            {user.name}
          </div>
          <div className="my-4">
            <img
              src={user.image}
              alt={user.name}
              width={72}
              height={72}
              className="rounded-full border-2 border-green-500"
            />
          </div>
          <p>{`@${user.username}`}</p>
        </div>
      </div>
      <div>
        <div className="my-4">
          <div className="text-xl font-bold">
            {session?.id === user.id
              ? "Your Startups"
              : `${user.name}'s Startups`}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {posts?.length > 0 &&
              posts.map((post: StartupType) => (
                <PostCard key={post._id} post={post} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
