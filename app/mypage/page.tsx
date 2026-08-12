'use client';

import { useState } from 'react';
import Link from 'next/link';

// 목업 데이터
interface MyInfluencer {
  id: string;
  name: string;
  gender: 'M' | 'F';
  subscribers: number;
  avgViews: number;
  description: string;
  contactEmail: string;
  contactDate: string;
  contactStatus: '미컨택' | '컨택' | '지원';
  note: string;
}

const mockData: MyInfluencer[] = [
  {
    id: '1',
    name: '귀곰',
    gender: 'M',
    subscribers: 787000,
    avgViews: 204000,
    description: "곰 모양 탈을 쓴 유튜버 '귀찮은 곰'이 가전제품을 실생활의 경험에 근거하여 꼼꼼하게 분석하며 소비자의 궁금증을 해소해주는 채널입니다.",
    contactEmail: 'companyssul@gmail.com',
    contactDate: '2026-02-20',
    contactStatus: '컨택',
    note: '2월에 협찬 문의함, 3월 초 답변 예정',
  },
  {
    id: '2',
    name: 'UnderKG',
    gender: 'M',
    subscribers: 755000,
    avgViews: 203000,
    description: '노트북, 핸드폰, 게임기, 카메라 등 다양한 스마트기기를 일정 기간 동안 실사용한 후기를 중심으로 리뷰하는 채널입니다.',
    contactEmail: 'underkg@gmail.com',
    contactDate: '',
    contactStatus: '미컨택',
    note: '',
  },
];

const TABS = ['전체', '미컨택', '컨택', '지원'] as const;
type TabType = (typeof TABS)[number];

const SORT_OPTIONS = [
  { value: 'subscribers', label: '구독자순' },
  { value: 'views', label: '조회수순' },
] as const;
type SortType = (typeof SORT_OPTIONS)[number]['value'];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('전체');
  const [sortType, setSortType] = useState<SortType>('subscribers');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 탭 필터 → 검색 필터 → 정렬 순으로 처리
  const filteredData = mockData
    .filter((item) => activeTab === '전체' || item.contactStatus === activeTab)
    .filter((item) => item.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    .sort((a, b) => {
      if (sortType === 'subscribers') return b.subscribers - a.subscribers;
      return b.avgViews - a.avgViews;
    });

  const formatCount = (num: number) => {
    if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
      <Link href="/" className="text-xl font-bold text-gray-500">
          Influencer Finder
      </Link>

        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border
         border-gray-300 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#6A4F6A] text-white'
                    : 'text-gray-600 hover:bg-[#B39CB5]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* 정렬 드롭다운 */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 flex items-center gap-2"
              >
                정렬: {SORT_OPTIONS.find((o) => o.value === sortType)?.label}
                <span>{isSortOpen ? '▲' : '▼'}</span>
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 z-50 w-32">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortType(option.value);
                        setIsSortOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-purple-50 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="이름으로 검색해주세요"
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 w-56"
            />
            <button className="px-4 py-2 bg-[#6A4F6A] text-white text-sm font-medium rounded-xl
            hover:-translate-y-1 hover:shadow-lg transition-all duration-300
            flex items-center gap-1 shadow-md shadow-gray-400/50">
              + 항목 추가
            </button>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-lg">저장한 인플루언서가 없습니다</p>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.5fr_0.7fr_1fr_1fr_1.5fr_1fr] gap-4 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-600 border-b border-gray-200">
              <span>이름</span>
              <span>성별</span>
              <span>구독자수</span>
              <span>평균조회수</span>
              <span>이메일</span>
              <span>컨택 이력</span>
            </div>

            {filteredData.map((item) => (
              <div key={item.id} className="border-b border-gray-100 last:border-b-0 px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.7fr_1fr_1fr_1.5fr_1fr] gap-2 md:gap-4 items-center">
                  <span className="font-semibold text-gray-800">{item.name}</span>

                  <span className="text-sm text-gray-500">
                    <span className="md:hidden">성별: </span>
                    {item.gender}
                  </span>

                  <span className="text-sm text-gray-500">
                    <span className="md:hidden">구독자수: </span>
                    {formatCount(item.subscribers)}
                  </span>

                  <span className="text-sm text-gray-500">
                    <span className="md:hidden">평균조회수: </span>
                    {formatCount(item.avgViews)}
                  </span>

                  <span className="text-sm text-gray-500 truncate">
                    <span className="md:hidden">이메일: </span>
                    {item.contactEmail || '-'}
                  </span>

                  <span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.contactStatus === '지원'
                          ? 'bg-blue-100 text-blue-700'
                          : item.contactStatus === '컨택'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.contactStatus}
                    </span>
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  <span className="font-medium text-gray-700">소개: </span>
                  {item.description || '등록된 소개가 없습니다'}
                </p>

                <p className="mt-1 text-sm text-gray-400 line-clamp-1">
                  <span className="font-medium text-gray-500">NOTE: </span>
                  {item.note || '작성된 메모 없음'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}