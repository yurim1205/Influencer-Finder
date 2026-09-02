'use client';

import { useAuthStore } from "@/app/stores/useAuthStore";
import {useState, useRef, useEffect} from 'react';
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, User, LogOut, ChevronDown } from 'lucide-react';

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

     {/* 로그아웃 메뉴 연결 */}
    const handleLogout = async ()=> {
        await supabase.auth.signOut();
        setIsMenuOpen(false);
    };

    {/* 마이페이지 메뉴 연결 */}
    const handleMyPage = () => {
        setIsMenuOpen(false);
        router.push('/mypage');
    }

    useEffect(() => {
        if (!isMenuOpen) return;
    
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);
    
    if (loading) return null;

    return (
        <div className="absolute top-0 right-0 p-6 flex items-center gap-3 z-50">
            {user ? (
                <div className="relative" ref={menuRef}>
                    {/* 사용자명 이름 옆에 드롭다운 아이콘 추가 */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-1 text-gray-800 font-medium hover:cursor-pointer"
                    >
                         {user.user_metadata?.name ?? user.email}님
                         <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {/* 드롭다운 내용 퍼블리싱 */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-5 shadow-lg border border-gray-100 z-50">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {user.user_metadata?.name ?? '사용자'}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {user.email}
                                    </p>
                            </div>

                            {/* X 버튼 추가 */}
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="닫기"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="my-4 h-px w-full bg-gray-200" />

                         {/* 마이페이지 메뉴 연결 */}
                            <button
                                onClick={handleMyPage}
                                className="flex w-full items-center gap-2 py-2 text-gray-700 hover:text-gray-900"
                            >
                                <User className="h-5 w-5" />
                                my page
                            </button>

                        {/* 로그아웃 버튼 연결 (기존 로직 연결) */}
                        <button 
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 py-2 text-red-500 hover:text-red-600"
                        >
                            <LogOut className="h-5 w-5" />
                                Log out
                        </button>
                    </div>
                    )}
                </div>
            ) : (
                <>
                    <Link href="/login" className="text-gray-500 font-semibold hover:text-purple-600 transition-colors">
                        로그인
                    </Link>
                    <Link href="/signup" className="text-gray-500 font-semibold hover:text-purple-800 transition-colors">
                        회원가입
                    </Link>
                </>
            )}
        </div>
    );
}