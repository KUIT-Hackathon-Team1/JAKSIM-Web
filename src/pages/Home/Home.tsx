import { useNavigate } from "react-router-dom";
import jaksimLogo from "../../assets/logo-jaksim.svg";
import icBack from "../../assets/ic-back.svg";
import icPathTrail from "../../assets/road.svg";

import icLoop from "../../assets/ic-loop.svg";
import icStreak from "../../assets/ic-streak.svg";
import icTrophy from "../../assets/ic-trophy.svg";
import icGoalStar from "../../assets/orange-star.svg";
import icNew from "../../assets/new.svg";
import icDefaultBadge from "../../assets/default-badge.svg";

// 컴포넌트
import HistoryBadge from "../../components/HistoryBadge";
import ProgressRing from "../../components/ProgressRing";

// 훅
import useHomeData from "../../hooks/useHomeData";

const Home = () => {
  const { data: homeData } = useHomeData();
  const { hasInProgress, badges, summary } = homeData;

  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#FEF6EE] flex flex-col overflow-hidden">
      {/* Header: back 아이콘 & 로고 */}
      <header className="h-[53px] p-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-1 active:opacity-50 transition-opacity"
        >
          <img src={icBack} alt="Back" className="w-6 h-6" />
        </button>
        <img src={jaksimLogo} alt="Jaksim Logo" className="w-6 h-6" />
        <div className="w-8" />
      </header>

      <main className="flex-1 overflow-y-auto relative scrollbar-hide">
        {/* 배경 곡선 경로 (케이스 2, 3에서만 노출) */}
        {badges.length > 0 && (
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[200px] pointer-events-none z-0">
            <img src={icPathTrail} alt="road" className="w-full" />
          </div>
        )}

        <div className="relative z-10 px-6 pt-6 flex flex-col items-center">
          {/* 통계 카드 영역 */}
          <section className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex justify-between items-center mx-8 mt-2 border border-gray-50">
            {/* 완료 루프: 뱃지의 수 */}
            <div className="flex flex-col items-center flex-1 border-r border-gray-100 py-2">
              <div className="flex items-center gap-1.5 mb-2">
                <img src={icLoop} alt="loop" className="w-4 h-4" />
                <span className="text-[11px] font-medium text-gray-500">
                  완료 루프
                </span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                {summary.completedLoops}
              </span>
            </div>

            {/* 연속 달성: 목표 달성 일수 */}
            <div className="flex flex-col items-center flex-1 border-r border-gray-100 py-2">
              <div className="flex items-center gap-1.5 mb-2">
                <img src={icStreak} alt="streak" className="w-4 h-4" />
                <span className="text-[11px] font-medium text-gray-500">
                  연속 달성
                </span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-bold text-gray-800">
                  {summary.streakDays}
                </span>
                <span className="text-xs text-gray-600 font-medium">일</span>
              </div>
            </div>

            {/* 내 달성률 */}
            <div className="flex flex-col items-center flex-1 py-2">
              <div className="flex items-center gap-1.5 mb-2">
                <img src={icTrophy} alt="trophy" className="w-4 h-4" />
                <span className="text-[11px] font-medium text-gray-500">
                  내 달성률
                </span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-bold text-gray-800">
                  {summary.achievementRate}
                </span>
                <span className="text-xs text-gray-600 font-medium">%</span>
              </div>
            </div>
          </section>
          {/* 조건부 렌더링 - 케이스1 (목표 & 이전 이력 존재X) */}
          {!hasInProgress && badges.length === 0 && (
            <div className="mb-10 flex flex-col items-center">
              {/* 안내 텍스트 */}
              <div className="text-center mb-10">
                <p className="text-black font-medium text-base mb-1">
                  아직 계획한 목표가 없어요
                </p>
                <p className="text-gray-700 text-sm leading-5">
                  3일 목표를 같이 계획해요
                </p>
              </div>
              {/* 1. 새 목표*/}
              <div className="relative mb-6">
                <img
                  src={icNew}
                  alt="new goal"
                  className="w-[80px] h-[49px] object-contain"
                />
              </div>

              {/* 2. 중앙 별 뱃지 영역 */}
              <div className="relative w-[106px] h-[106px] flex items-center justify-center">
                {/* 진행 링 */}
                <ProgressRing result="DEFAULT" angle={0} />
                <ProgressRing result="DEFAULT" angle={120} />
                <ProgressRing result="DEFAULT" angle={240} />

                {/* 흰색 원 배경 */}
                <img
                  src={icDefaultBadge}
                  alt="default badge"
                  className="absolute w-[79px] h-[76px] object-contain"
                />

                {/* 클릭 가능한 별 아이콘 */}
                <button
                  onClick={() => navigate("/goal/new")}
                  className="relative z-10 w-[51px] h-[51px] flex items-center justify-center active:scale-95 transition-transform"
                >
                  <img
                    src={icGoalStar}
                    alt="goal star"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
            </div>
          )}
          {/* 이전 진행 이력 리스트 (케이스 2, 3) */}
          {badges.length > 0 && (
            <div className="flex flex-col gap-16 pb-20 items-center w-full mt-10">
              {badges.map((badge, i) => (
                <div
                  key={badge.runId}
                  className={i % 2 === 0 ? "ml-[-60px]" : "mr-[-60px]"}
                >
                  <HistoryBadge badge={badge} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
