'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex">
      
      {/* 왼쪽 영역 */}
      <div className="flex flex-col justify-between p-10 w-1/2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </button>

        <p className="text-2xl font-bold text-gray-800">
          서비스 관련 문구
        </p>
      </div>

      {/* 오른쪽 폼 영역 */}
      <div className="flex items-center justify-center w-1/2 p-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 w-full max-w-lg shadow-sm border border-white/50">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8 font-['Carlito']">
            Sign UP
          </h1>

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm text-gray-800 mb-2 block">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-800 mb-2 block">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-800 mb-2 block">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <p className="text-xs text-gray-400 mt-1">6자 이상 입력해주세요</p>
            </div>

            <div>
              <label className="text-sm text-gray-800 mb-2 block">비밀번호 확인</label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>
          </div>

          <button
            className="w-full mt-8 py-4 bg-[#B39CB5] text-white font-medium rounded-full hover:bg-purple-400 transition-colors"
          >
            회원가입
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-[#B39CB5] hover:underline">
              로그인 하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}