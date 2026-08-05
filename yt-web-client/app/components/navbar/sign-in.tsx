'use client';
import { signInWithGoogle, signOut } from "@/app/utils/firebase/firebase";
import { User } from "firebase/auth";

export default function SignIn({user}: {user: User | null}) {
    const styles = 'inline-block border border-gray rounded-full text-[#065fd4] py-[10px] px-5 font-roboto font-medium cursor-pointer hover:bg-[#bee0fd] hover:border-transparent';
    return (
        <>
            {user ? (
                <button className={styles} onClick={signOut}>
                    Sign Out
                </button>
            ) : (
                <button className={styles} onClick={signInWithGoogle}>
                    Sign In
                </button>
            )}
        </>
    )
}