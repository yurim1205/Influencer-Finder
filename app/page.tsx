'use client';

import SearchBar from "@/components/common/mainSearchBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  // 검색 키워드 받는 부모 함수
  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      toast.error(`검색어를 입력해주세요!` , {   // toast.error: 에러 메시지 출력
        duration: 2000, 
        position: "top-center" 
      }); 
      return;
    }
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  const categories = ['#뷰티', '#게임', '#음악', '#요리', '#여행', '#패션', '#운동', '#브이로그'];

  return (
    <>
    <Toaster position="top-center" />
    <header className="absolute top-0 right-0 p-6 flex gap-8 z-50">
      <Link href="/login" className="text-gray-700 font-medium hover:text-purple-600 transition-colors">
        로그인
      </Link>
      <Link href="/signup" className="text-gray-700 font-medium hover:text-purple-600 transition-colors">
        회원가입
      </Link>
    </header>
      <main className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-10 text-center">
          키워드로 원하는 채널을 탐색해보세요 ✨
        </h1>

        <div className="w-full max-w-3xl">
          <SearchBar onSearch={handleSearch}/>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mt-8 justify-center">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => handleSearch(category.replace('#', ''))}
                className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm text-gray-800 
                shadow-lg shadow-black/10 hover:bg-purple-100 hover:text-purple-600 
                transition-all duration-200 cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}