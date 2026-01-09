import { useNavigate } from "react-router-dom";
import jaksimLogo from "../../assets/logo-jaksim.svg";
import icBack from "../../assets/ic-back.svg";
import icLoop from "../../assets/ic-loop.svg";
import icStreak from "../../assets/ic-streak.svg";
import icTrophy from "../../assets/ic-trophy.svg";
import icGoalStar from "../../assets/orange-star.svg";

const GoalProgressRing = ({ days }: { days: number }) => {
  // 전체 둘레 계산 (2 * pi * r) -> 반지름 50일 때 약 314
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // 3등분한 한 섹션의 길이 (약간의 간격을 위해 2를 뺌)
  const segmentLength = circumference / 3 - 2;
  const gapLength = 2; // 섹션 사이의 아주 미세한 간격

  return (
    <svg
      width="106"
      height="106"
      viewBox="0 0 120 120"
      className="absolute -rotate-90"
    >
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={i < days ? "yellow" : "#E8E6E5"} // 성공한 날은 주황색, 아니면 회색
          strokeWidth="6"
          strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
          strokeDashoffset={-i * (segmentLength + gapLength)}
          strokeLinecap="round" // 끝부분을 둥글게 처리
          className="transition-all duration-500"
        />
      ))}
    </svg>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const hasInProgress = false; // 테스트를 위해 우선 false로 설정

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header: back 아이콘 & 로고 */}
      <header className="h-[53px] p-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-1 active:opacity-50 transition-opacity"
        >
          <img src={icBack} alt="Back" className="w-6 h-6" />{" "}
        </button>
        <img src={jaksimLogo} alt="Jaksim Logo" className="w-6 h-6" />
        <div className="w-8" />
      </header>

      <main className="flex-1 px-6 pt-6">
        {/* 통계 카드 영역 */}
        <section className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex justify-between items-center mb-10 border border-gray-50">
          {/* 완료 루프: 뱃지의 수 */}
          <div className="flex flex-col items-center flex-1 border-r border-gray-100">
            <div className="flex items-center gap-1.5 mb-2">
              <img src={icLoop} alt="loop" className="w-4 h-4" />
              <span className="text-[11px] font-medium text-gray-500">
                완료 루프
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800">0</span>
          </div>

          {/* 연속 달성: 목표 달성 일수 */}
          <div className="flex flex-col items-center flex-1 border-r border-gray-100">
            <div className="flex items-center gap-1.5 mb-2">
              <img src={icStreak} alt="streak" className="w-4 h-4" />
              <span className="text-[11px] font-medium text-gray-500">
                연속 달성
              </span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-gray-800">0</span>
              <span className="text-xs text-gray-600 font-medium">일</span>
            </div>
          </div>

          {/* 내 달성률 */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <img src={icTrophy} alt="trophy" className="w-4 h-4" />
              <span className="text-[11px] font-medium text-gray-500">
                내 달성률
              </span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-gray-800">0</span>
              <span className="text-xs text-gray-600 font-medium">%</span>
            </div>
          </div>
        </section>

        {/* 조건부 렌더링 (목표 미존재 시) */}
        {!hasInProgress && (
          <div className="flex flex-col items-center justify-center mt-12">
            {/* 안내 텍스트 */}
            <div className="text-center mb-10">
              <p className="text-black font-medium text-lg mb-1">
                아직 계획한 목표가 없어요
              </p>
              <p className="text-gray-700 text-sm">3일 목표를 같이 계획해요</p>
            </div>
            {/* 1. "새 목표 +" 말풍선 버튼 */}
            <div className="relative mb-6">
              <button
                onClick={() => navigate("/goal/new")}
                className="px-5 py-2 bg-white border-[1.5px] border-[#E9631A] rounded-full text-[#E9631A] text-sm font-bold shadow-sm active:scale-95 transition-transform"
              >
                새 목표 +
              </button>
              {/* 말풍선 꼬리 부분 */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-[1.5px] border-b-[1.5px] border-[#E9631A] rotate-45"></div>
            </div>

            {/* 2. 중앙 별 뱃지 영역 */}
            <div className="relative w-[106px] h-[106px] flex items-center justify-center">
              {/* 기존 회색 링 대신 3분할 링 배치 (현재는 진행 전이므로 0일 전달) */}
              <GoalProgressRing days={0} />

              {/* 안쪽 흰색 원 */}
              <div className="relative w-[79px] h-[76px] bg-white rounded-full border-[1.5px] border-[#E9631A] flex items-center justify-center shadow-inner">
                <img
                  src={icGoalStar}
                  alt="goal star"
                  className="w-[51px] h-[51px] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
