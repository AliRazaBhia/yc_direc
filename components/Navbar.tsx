import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import { BadgePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  const Session = await auth();
  // console.log(Session)

  return (
    <header className="px-5 py-3 bg-white shadow-sm -font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex  items-center gap-5 text-black --font-work-sans ">
          {Session && Session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden"/>
              </Link>
              <SignOut />
              <Link href={`/user/${Session?.id}`}>
                <Avatar className="size-10">
                    <AvatarImage src={Session?.user?.image || ''} alt={Session?.user?.name || ''}/>
                    <AvatarFallback>
                        AV
                    </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </nav>
    </header>
  );
}
