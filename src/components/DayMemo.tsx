import { useState } from "react";

interface DayMemoProps {
  startDate: string;
  initialDay?: 1 | 2 | 3;
  onMemoChange?: (day: number, memo: string) => void;
}

export const DayMemo = ({ startDate, initialDay = 1, onMemoChange }: DayMemoProps) => {
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(initialDay);
  const [memos, setMemos] = useState<Record<1 | 2 | 3, string>>({
    1: "",
    2: "",
    3: "",
  });

  // 현재까지 지난 날짜 계산
  const getCurrentDay = (): number => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, Math.min(diffDays, 3));
  };

  const maxDay = getCurrentDay();

  // 날짜 계산
  const getDateForDay = (day: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (day - 1));
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "-")
      .replace(".", "");
  };

  const handleDayClick = (day: 1 | 2 | 3) => {
    // 지난 날짜만 클릭 가능
    if (day <= maxDay) {
      setSelectedDay(day);
    }
  };

  const handleMemoChange = (value: string) => {
    const newMemos = {
      ...memos,
      [selectedDay]: value,
    };
    setMemos(newMemos);
    onMemoChange?.(selectedDay, value);
  };

  return (
    <div className="p-3">
      {/* 탭 */}
      <div className="flex gap-2">
        {([1, 2, 3] as const).map((day) => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            disabled={day > maxDay}
            className={`px-6 py-1 rounded-t-2xl font-semibold text-lg ${
              selectedDay === day
                ? "bg-white text-[#315762]"
                : day > maxDay
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#FFBF3F] text-white"
            }`}
          >
            D+{day}
          </button>
        ))}
      </div>

      {/* 메모 입력 */}
      <div className="bg-white rounded-b-[10px] rounded-tr-[10px] p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[15px] font-semibold text-[#252422]">오늘 메모</h3>
          <span className="text-[12px] text-gray-500">{getDateForDay(selectedDay)}</span>
        </div>

        <div className="relative">
          <textarea
            value={memos[selectedDay]}
            onChange={(e) => handleMemoChange(e.target.value)}
            placeholder="오늘 느낀 점을 기록해 보세요"
            maxLength={100}
            className="w-full h-38 p-4 text-[#989898] text-[12px] bg-gray-50 rounded-[10px] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFBF3F] placeholder:text-gray-400"
          />
          <div className="absolute bottom-4 right-4 text-[10px] text-[#989898]">{memos[selectedDay].length}/100</div>
        </div>
      </div>
    </div>
  );
};
