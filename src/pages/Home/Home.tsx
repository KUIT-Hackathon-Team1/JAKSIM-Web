import { useNavigate } from "react-router-dom";
import jaksimLogo from "../../assets/logo-jaksim.svg";
import icBack from "../../assets/ic-back.svg";
import icPathTrail from "../../assets/road.svg";

import icLoop from "../../assets/ic-loop.svg";
import icStreak from "../../assets/ic-streak.svg";
import icTrophy from "../../assets/ic-trophy.svg";
import icNew from "../../assets/new.svg";
import icIng from "../../assets/ing.svg";
import icDefaultBadge from "../../assets/default-badge.svg";

// 컴포넌트
import HistoryBadge from "../../components/HistoryBadge";
import ProgressRing from "../../components/ProgressRing";

// 훅
import useHomeData from "../../hooks/useHomeData";

const Home = () => {
  const { data: homeData, isLoading } = useHomeData();
  const navigate = useNavigate();

  if (isLoading || !homeData) {
    return (
      <div className="h-screen bg-[#FEF6EE] flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  const { hasInProgress, badges, summary: rawSummary } = homeData;

  const summary = {
    completedLoops: (rawSummary as any).totalRuns ?? 0,
    streakDays: (rawSummary as any).inProgressRuns ?? 0,
    achievementRate: (rawSummary as any).gold ?? 0,
  };

  const mapCategoryToIconKey = (category?: string): string => {
    const categoryMap: Record<string, string> = {
      health: "health",
      exercise: "weight",
      weight: "weight",
      language: "language",
      "self-development": "self-development",
    };
    return categoryMap[(category || "").toLowerCase()] || "empty";
  };

  const mapBorderToResult = (
    border?: string
  ): "SUCCESS" | "FAIL" | "HALF" | "DEFAULT" => {
    switch (border) {
      case "DONE":
        return "SUCCESS";
      case "PARTIAL":
        return "HALF";
      case "FAIL":
        return "FAIL";
      default:
        return "DEFAULT";
    }
  };

  const badgesWithIconKey = badges.map((badge) => ({
    ...badge,
    categoryIconKey: mapCategoryToIconKey(badge.category),
  }));

  // 로그 출력 - 읽기 쉬운 형식
  console.log("=== Home Badges Data ===");
  badgesWithIconKey.forEach((b, idx) => {
    const border = (b as any).border;
    console.log(
      `[${idx}] goalId: ${b.goalId}, runId: ${b.runId}, category: ${
        b.category
      }, border: [${border ? border.join(", ") : "없음"}]`
    );
  });
  console.log("=======================");

  const groupedBadges = badgesWithIconKey.sort((a, b) => b.runId - a.runId);

  const inProgressBadge = badgesWithIconKey.find(
    (badge) => badge.runStatus === "IN_PROGRESS"
  );
  const inProgressGoalId = inProgressBadge?.goalId;

  return (
    <div className="h-screen bg-[#FEF6EE] flex flex-col overflow-hidden">
      <header className="h-[53px] p-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate("/")}
          className="p-1 active:opacity-50 transition-opacity"
        >
          <img src={icBack} alt="Back" className="w-6 h-6" />
        </button>
        <img src={jaksimLogo} alt="Jaksim Logo" className="w-6 h-6" />
        <div className="w-8" />
      </header>

      <main className="flex-1 overflow-y-auto relative scrollbar-hide">
        {badgesWithIconKey.length > 0 && (
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[200px] pointer-events-none z-0 flex flex-col items-center">
            {[...Array(10)].map((_, i) => (
              <img key={i} src={icPathTrail} alt="road" className="w-[150px]" />
            ))}
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center w-full">
          <section className="bg-white h-20 rounded-2xl shadow-[0_10px_10px_-6px_rgba(0,0,0,0.07)] flex justify-between items-center w-[calc(100%-64px)] mt-2 border border-gray-50">
            <div className="flex flex-col items-center flex-1 border-r border-gray-100 py-2">
              <div className="flex items-center gap-2 mb-2">
                <img src={icLoop} alt="loop" className="w-4 h-4" />
                <span className="text-[12px] font-medium text-black">
                  완료 루프
                </span>
              </div>
              <span className="text-xl font-bold text-black">
                {summary.completedLoops}
              </span>
            </div>
            <div className="flex flex-col items-center flex-1 border-r border-gray-100 py-2">
              <div className="flex items-center gap-2 mb-2">
                <img src={icStreak} alt="streak" className="w-4 h-4" />
                <span className="text-[12px] font-medium text-black">
                  연속 달성
                </span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-bold text-black">
                  {summary.streakDays}
                </span>
                <span className="text-xs text-black font-medium">일</span>
              </div>
            </div>
            <div className="flex flex-col items-center flex-1 py-2">
              <div className="flex items-center gap-2 mb-2">
                <img src={icTrophy} alt="trophy" className="w-4 h-4" />
                <span className="text-[12px] font-medium text-black">
                  내 달성률
                </span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-bold text-black">
                  {summary.achievementRate}
                </span>
                <span className="text-xs text-black font-medium">%</span>
              </div>
            </div>
          </section>

          {!hasInProgress && badgesWithIconKey.length === 0 && (
            <div className="mb-10 flex flex-col items-center">
              <div className="text-center mt-30 mb-10">
                <p className="text-black font-medium text-base mb-1">
                  아직 계획한 목표가 없어요
                </p>
                <p className="text-gray-700 text-sm leading-5">
                  3일 목표를 같이 계획해요
                </p>
              </div>
              <div className="relative mb-2">
                <img
                  src={icNew}
                  alt="new goal"
                  className="w-[80px] h-[49px] object-contain"
                />
              </div>

              <div className="relative w-[106px] h-[106px] flex items-center justify-center">
                <ProgressRing result="DEFAULT" angle={0} />
                <ProgressRing result="DEFAULT" angle={120} />
                <ProgressRing result="DEFAULT" angle={240} />

                <button
                  onClick={() => navigate("/goal/new")}
                  className="relative z-10 w-[79px] h-[76px] flex items-center justify-center active:scale-95 transition-transform"
                >
                  <img
                    src={`/badge/default-empty.svg`}
                    alt="goal star"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
            </div>
          )}

          {!hasInProgress && badgesWithIconKey.length > 0 && (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col gap-16 pb-20 items-center w-full mt-10">
                <div className="ml-[-60px]">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <img
                        src={icNew}
                        alt="new goal"
                        className="w-[80px] h-[49px] object-contain"
                      />
                    </div>

                    <div className="relative w-[106px] h-[106px] flex items-center justify-center">
                      <ProgressRing result="DEFAULT" angle={0} />
                      <ProgressRing result="DEFAULT" angle={120} />
                      <ProgressRing result="DEFAULT" angle={240} />

                      <img
                        src={icDefaultBadge}
                        alt="default badge"
                        className="absolute w-[79px] h-[76px] object-contain"
                      />

                      <button
                        onClick={() => navigate("/goal/new")}
                        className="relative z-10 w-[51px] h-[51px] flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <img src={`/badge/default-empty.svg`} alt="goal star" />
                      </button>
                    </div>
                  </div>
                </div>

                {groupedBadges
                  .filter((badge) => badge.goalId !== inProgressGoalId)
                  .map((badge, i) => (
                    <div
                      key={badge.goalId}
                      className={
                        (i + 1) % 2 === 0 ? "ml-[-60px]" : "mr-[-60px]"
                      }
                    >
                      <HistoryBadge
                        badge={badge}
                        relatedBadges={[
                          {
                            runId: 1,
                            result: (badge as any).border?.[0]
                              ? mapBorderToResult((badge as any).border[0])
                              : "DEFAULT",
                          },
                          {
                            runId: 2,
                            result: (badge as any).border?.[1]
                              ? mapBorderToResult((badge as any).border[1])
                              : "DEFAULT",
                          },
                          {
                            runId: 3,
                            result: (badge as any).border?.[2]
                              ? mapBorderToResult((badge as any).border[2])
                              : "DEFAULT",
                          },
                        ]}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {hasInProgress && badgesWithIconKey.length > 0 && (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col gap-16 pb-20 items-center w-full mt-10">
                <div className="ml-[-60px]">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <img
                        src={icIng}
                        alt="in progress goal"
                        className="w-[80px] h-[49px] object-contain"
                      />
                    </div>

                    {inProgressBadge && (
                      <HistoryBadge
                        badge={inProgressBadge}
                        relatedBadges={[
                          {
                            runId: 1,
                            result: (inProgressBadge as any).border?.[0]
                              ? mapBorderToResult(
                                  (inProgressBadge as any).border[0]
                                )
                              : "DEFAULT",
                          },
                          {
                            runId: 2,
                            result: (inProgressBadge as any).border?.[1]
                              ? mapBorderToResult(
                                  (inProgressBadge as any).border[1]
                                )
                              : "DEFAULT",
                          },
                          {
                            runId: 3,
                            result: (inProgressBadge as any).border?.[2]
                              ? mapBorderToResult(
                                  (inProgressBadge as any).border[2]
                                )
                              : "DEFAULT",
                          },
                        ]}
                        onClick={() =>
                          navigate(`/goal/${(inProgressBadge as any).runId}`)
                        }
                      />
                    )}
                  </div>
                </div>

                {groupedBadges
                  .filter((badge) => badge.goalId !== inProgressGoalId)
                  .map((badge, i) => (
                    <div
                      key={badge.goalId}
                      className={
                        (i + 1) % 2 === 0 ? "ml-[-60px]" : "mr-[-60px]"
                      }
                    >
                      <HistoryBadge
                        badge={badge}
                        relatedBadges={[
                          {
                            runId: 1,
                            result: (badge as any).border?.[0]
                              ? mapBorderToResult((badge as any).border[0])
                              : "DEFAULT",
                          },
                          {
                            runId: 2,
                            result: (badge as any).border?.[1]
                              ? mapBorderToResult((badge as any).border[1])
                              : "DEFAULT",
                          },
                          {
                            runId: 3,
                            result: (badge as any).border?.[2]
                              ? mapBorderToResult((badge as any).border[2])
                              : "DEFAULT",
                          },
                        ]}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
