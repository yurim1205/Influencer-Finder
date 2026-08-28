'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {supabase} from '@/lib/supabase';
import { useAuthStore } from '@/app/stores/useAuthStore';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        subscribers: '',
        avgViews: '',
        gender: 'M',
        intro: '',
        contactHistory: '',
        contactDate: '',
        email: '',
    });

    const user = useAuthStore((state)=> state.user);
    const [isSaving, setIsSaving] = useState(false);

     const inputClass =
      'h-[42px] rounded-full border border-[#c6c1c1] bg-[#f5f3f6] px-5 text-[16px] text-black outline-none focus:border-[#4B5563] transition-all';
     const labelClass = 'text-[16px] font-medium text-[#717070]';

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSave = async()=> {
        if (!user) return;

        if (!formData.name || !formData.contactHistory) {
            alert('이름과 컨택 이력은 필수 입력값입니다.');
            return;
        }

        setIsSaving(true);

        const {error} = await supabase.from('my_influencers').insert({
            user_id: user.id,
            name: formData.name,
            gender: formData.gender,
            subscribers: Number(formData.subscribers) || 0,
            avg_views: Number(formData.avgViews) || 0,
            description: formData.intro,
            contact_point: formData.contactHistory,
            contact_email: formData.email,
            contact_date: formData.contactDate,
            contact_status: '미컨택',
            note: '',
        });

        setIsSaving(false);

        if (error) {
            console.error('저장 오류:', error);
            alert('저장에 실패했습니다.');
            return;
        }

        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="relative flex max-h-[90vh] w-full max-w-[548px] flex-col overflow-y-auto rounded-[32px] bg-[#fdfaff] p-8 sm:rounded-[62px]"
            >
                <div className="mb-6 flex items-center justify-between">
                    <p id="modal-title" className="text-[21px] font-medium text-black">
                        항목 추가
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="닫기"
                        className="flex h-6 w-6 items-center justify-center text-black hover:cursor-pointer"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className={labelClass}>
                            이름 <span className="text-[#ff5f5f]">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                            <label htmlFor="subscribers" className={labelClass}>
                                구독자수
                            </label>
                            <input
                                id="subscribers"
                                type="text"
                                value={formData.subscribers}
                                onChange={(e) => setFormData({ ...formData, subscribers: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <label htmlFor="avgViews" className={labelClass}>
                                평균 조회수
                            </label>
                            <input
                                id="avgViews"
                                type="text"
                                value={formData.avgViews}
                                onChange={(e) => setFormData({ ...formData, avgViews: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className={labelClass}>성별</span>
                        <div className="inline-flex h-[42px] w-[220px] items-center rounded-full border border-[#c6c1c1] bg-[#f5f3f6] p-1 hover:cursor-pointer">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: 'F' })}
                                className={`flex h-full flex-1 items-center justify-center rounded-full text-[16px] transition-colors hover:cursor-pointer ${
                                    formData.gender === 'F'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-[#717070]'
                                }`}
                            >
                                여
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: 'M' })}
                                className={`flex h-full flex-1 items-center justify-center rounded-full text-[16px] transition-colors hover:cursor-pointer ${
                                    formData.gender === 'M'
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-[#717070]'
                                }`}
                            >
                                남
                            </button>
                        </div>
                    </div>

                    <div className="h-px w-full bg-[#c6c1c1]" />

                    <div className="flex flex-col gap-6 sm:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                            <label htmlFor="contactHistory" className={labelClass}>
                                컨택 이력 <span className="text-[#ff5f5f]">*</span>
                            </label>
                            <input
                                id="contactHistory"
                                type="text"
                                value={formData.contactHistory}
                                onChange={(e) => setFormData({ ...formData, contactHistory: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <label htmlFor="lastContactDate" className={labelClass}>
                                과거 컨택 시기
                            </label>
                            <input
                                id="lastContactDate"
                                type="text"
                                value={formData.contactDate}
                                onChange={(e) => setFormData({ ...formData, contactDate: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="intro" className={labelClass}>
                            소개 및 대표 콘텐츠
                        </label>
                        <input
                            id="intro"
                            type="text"
                            value={formData.intro}
                            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-[53px] w-[118px] items-center justify-center rounded-full bg-[#e8dcea] text-[21px] 
                        font-medium text-[#717070] hover:cursor-pointer shadow-[0px_4px_10px_0px_#eaeaea]"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex h-[53px] w-[118px] items-center justify-center rounded-full bg-[#6a4f6a] text-[21px] 
                        font-medium text-white hover:cursor-pointer shadow-[0px_4px_10px_0px_#eaeaea]"
                    >
                        {isSaving ? '저장 중...' : '저장'}
                    </button>
                </div>
            </div>
        </div>
    );
}