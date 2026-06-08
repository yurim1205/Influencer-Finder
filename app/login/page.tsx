'use client';

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-6">
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
            className="w-full mt-20 py-4 bg-[#B39CB5] text-white font-medium rounded-full hover:bg-purple-700 transition-colors"
            >
            로그인
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-purple-400 hover:underline">
                회원가입 하기
            </Link>
            </p>
        </div>
        </div>
    );
    }