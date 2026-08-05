'use client';
import Image from "next/image";
import Link from "next/link";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "@/app/utils/firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex items-center justify-between p-4">
        <Link href="/">
            <Image src="/youtube-logo.svg" alt="Youtube Logo" width={90} height={20} />
        </Link>
        <SignIn user = {user} />
    </nav>
  );
}