import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { Button } from "./ui/button";
import { LogOut, PlusCircle } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">IdeaShare</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session && session.user ? (
              <>
                <Link href={"/startup/create"}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Create</span>
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>

                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full p-0"
                >
                  <Image
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </Button>
              </>
            ) : (
              <Button
                onClick={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
