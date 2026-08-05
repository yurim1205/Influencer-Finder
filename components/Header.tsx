'use client';

import { useAuthStore } from "@/app/stores/useAuthStore";
import Link from "next/link";

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);

    if (loading) return null;

    return (
        <div className="flex items-center gap-3">
            {user ? (
                <span className="text-gray-800 font-medium">
                    {user.user_metadata?.name ?? user.email}님
                    </span>
      ) : (
        <>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </>
      )}
        </div>
    );
}