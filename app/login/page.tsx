'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-6">
         
        <button
            onClick={() => router.back()}
            className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
            <ChevronLeft className="w-8 h-8 text-gray-400"/>
        </button>

        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 w-full h-[600px] max-w-lg shadow-sm border border-white/50">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 font-['Carlito']">
        Log in
        </h1>
            <div className="mb-8" /> 

            <div className="flex flex-col gap-6">
                <div>
                    <label className="text-sm text-gray-800 mt-6 mb-2 block">이메일</label>
                    <input
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-800 mb-2 block">비밀번호</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                </div>
            </div>

            <button
            className="w-full mt-20 py-4 bg-[#B39CB5] text-white font-medium rounded-full shadow-lg
            hover:scale-110 transition-transform
            duration-300 cursor-pointer"
            >
            로그인
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-[#B39CB5] hover:underline">
                회원가입 하기
            </Link>
            </p>
        </div>
        </div>
    );
    }