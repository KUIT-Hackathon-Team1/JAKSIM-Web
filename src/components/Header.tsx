"use client";

import { useState } from "react";
import QuitGoalModal from "./QuitGoalModal";

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  onEdit: () => void;
  onComplete: () => void;
}

export default function Header({ title, onBack, onEdit, onComplete }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="relative h-13 grid grid-cols-[1fr_auto_1fr] items-center bg-white border-b border-gray-100 px-4">
        <div className="flex justify-start">
          {onBack && (
            <button aria-label="back" onClick={onBack} className="cursor-pointer">
              <img src="/arrow-left.svg" alt="뒤로가기" />
            </button>
          )}
        </div>

        <h1 className="text-[18px] font-semibold text-gray-900 text-center">{title}</h1>

        <div className="flex justify-end">
          <div className="relative">
            <button aria-label="menu" onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
              <img src="/more-vertical.svg" alt="더보기" />
            </button>

            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />

                <div className="absolute right-2 top-7 z-20 w-28 bg-[#F6F5F5] rounded-lg shadow-md py-2">
                  <button
                    onClick={() => {
                      onEdit();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-2 text-[#252422] cursor-pointer"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => {
                      onComplete();
                      setIsModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-2 text-[#252422] cursor-pointer"
                  >
                    목표 끝내기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <QuitGoalModal isOpen={isModalOpen} onConfirm={() => console.log("d")} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
