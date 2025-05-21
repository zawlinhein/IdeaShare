import { formatDate } from "@/lib/utils";
import React from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Startup, Author } from "@/sanity/sanity.types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

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
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          {/* Date and View Count */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
            <span>{formatDate(_createdAt)}</span>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{views}</span>
            </div>
          </div>

          {/* Username, Title and Profile Image */}
          <div className="flex mb-3">
            <div className="flex-1 pr-3">
              <Link href={`/user/${authorId}`}>
                <p className="text-sm font-medium">@{username}</p>
              </Link>
              <Link href={`/startup/${_id}`}>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={image || "https://placehold.co/48x48/png"}
                alt={`${username}'s profile`}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 line-clamp-1 mb-4">{description}</p>
        </div>

        {/* Startup Image */}
        <div className="w-full h-48 relative">
          <Image
            src={image || "https://placehold.co/48x48/png"}
            alt={title || ""}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4">
        {/* Category */}
        <Badge variant="outline">{category}</Badge>

        {/* View Details Button */}
        <Link href={`/startup/${_id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
