import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { LogOutIcon, PlusCircleIcon } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white font-work-sans shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"https://placehold.co/144x30/png"}
            alt="logo"
            width={144}
            height={30}
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="sm:hidden">
                  <PlusCircleIcon className="size-6" />
                </span>
                <span className="max-sm:hidden font-bold">Create</span>
              </Link>
              <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span className="sm:hidden">
                  <LogOutIcon className="size-6" />
                </span>
                <span className="max-sm:hidden font-bold">Logout</span>
              </button>
              <Link href={`/user/${session.id}`}>
                <img
                  src={session.user.image || ""}
                  alt={session.user.name || ""}
                  className="rounded-full w-[48px] h-[48px]"
                />
              </Link>
            </>
          ) : (
            <button
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
