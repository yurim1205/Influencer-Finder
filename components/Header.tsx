'use client';

import { useAuthStore } from "@/app/stores/useAuthStore";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);

    const handleLogout = async ()=> {
        await supabase.auth.signOut();
    };

    if (loading) return null;

    return (
        <div className="absolute top-0 right-0 p-6 flex items-center gap-3 z-50">
            {user ? (
                <>
                <span className="text-gray-800 font-medium">
                    {user.user_metadata?.name ?? user.email}님
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                    >
                     로그아웃
                    </button>
                </>
      ) : (
        <>
          <Link href="/login" className="
          text-gray-700 font-medium hover:text-purple-600 transition-colors">
            로그인
          </Link>

          <Link href="/signup" className="
          text-gray-700 font-medium hover:text-purple-600 transition-colors">
            회원가입
          </Link>
        </>
      )}
        </div>
    );
}