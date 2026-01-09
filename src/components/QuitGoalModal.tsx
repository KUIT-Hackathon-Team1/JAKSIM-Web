"use client";

import { ActionButton } from "./ActionButton";

interface QuitGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function QuitGoalModal({ isOpen, onClose, onConfirm }: QuitGoalModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-85 max-w-md bg-white rounded-[10px] p-8 text-center">
        <h2 className="text-[15px]">지금 목표를 끝내면,</h2>
        <p className="text-[15px] mb-1">남은 기간은 목표 결과에 반영되지 않습니다.</p>
        <p className="text-[12px] text-[#625E58] mb-4">조금 더 이어가면 목표를 달성할 수 있어요.</p>

        <div className="flex gap-3 w-full">
          <ActionButton variant="disabled" onClick={onConfirm}>
            목표 종료하기
          </ActionButton>
          <ActionButton variant="outline" onClick={onClose}>
            목표 계속하기
          </ActionButton>
        </div>
      </div>
    </>
  );
}
