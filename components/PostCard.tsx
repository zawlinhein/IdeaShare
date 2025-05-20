import { formatDate } from "@/lib/utils";
import React from "react";
import { EyeIcon, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Startup, Author } from "@/sanity/sanity.types";

export type StartupType = Omit<Startup, "author"> & { author: Author };

const PostCard = ({ post }: { post: StartupType }) => {
  const {
    _createdAt,
    author: { _id: authorId, username },
    _id,
    views,
    description,
    image,
    title,
    category,
  } = post;

  return (
    <li className="border-2 border-b-4 border-r-4 ring-2 border-black px-4 py-2 rounded-3xl my-4 bg-gray-200 shadow-lg shadow-gray-500">
      <div className="flex justify-between gap-4">
        <div className="text-xs">{formatDate(_createdAt)}</div>
        <div className="flex gap-1">
          <EyeIcon className="size-5 align-middle" />
          <span className="px-1 text-red-500 text-xs">{views}</span>
        </div>
      </div>
      <div className="my-4 justify-between flex gap-4">
        <div className="flex-col">
          <div className="flex items-center">
            <User className="size-4 mr-1" />
            <Link href={`/user/${authorId}`}>
              <p className="font-semibold line-clamp-1">{username}</p>
            </Link>
          </div>
          <Link href={`/startup/${_id}`}>
            <p className="text-2xl font-semibold line-clamp-1">{title}</p>
          </Link>
        </div>
        <div>
          <Link href={`/user/${authorId}`}>
            <Image
              src={"https://placehold.co/48x48/png"}
              alt={username || ""}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className=" line-clamp-2">{description}</p>
      </Link>
      <img
        src={image}
        alt={title}
        className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-md mt-2"
      />
      <div className="flex justify-between gap-4 mt-4 items-center">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-xs text-blue-700 text-center ">{category}</p>
        </Link>
        <Button asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default PostCard;
