import { AchieveButton } from "../../components/AchieveButton";
import { ActionButton } from "../../components/ActionButton";
import { Button } from "../../components/Button";
// import { DayMemo } from "../../components/DayMemo";
//import { GoalProgressCard } from "../../components/GoalProgressCard";
import { MedalBadge } from "../../components/MedalBadge";
// import { goalsApi } from "../../api/goals";

const Test = () => {
  // const data = await goalsApi.getRun(1);
  return (
    <div className="min-h-screen bg-[#FEF6EE]">
      <Button label="운동" variant="category" icon="/weight.svg" />
      <Button label="언어" variant="category" icon="/messages.svg" />
      <Button label="자기개발" variant="category" icon="/emoji-happy.svg" />
      <Button label="건강" variant="category" icon="/heart.svg" selected />
      <Button label="운동" variant="selectable" selected />
      <Button label="진행중" variant="progress" />
      <Button label="진행완료" variant="complete" />

      <div className="flex">
        <MedalBadge type="gold" />
        <MedalBadge type="bronze" />
        <MedalBadge type="fail" />
      </div>

      {/* 첫 번째 줄: 선택 안한 상태 */}
      <div className="flex gap-3">
        <AchieveButton type="complete" state="default" />
        <AchieveButton type="partial" state="default" />
        <AchieveButton type="failed" state="default" />
      </div>

      {/* 세 번째 줄: 선택된 상태 */}
      <div className="flex gap-3">
        <AchieveButton type="complete" state="selected" />
        <AchieveButton type="partial" state="selected" />
        <AchieveButton type="failed" state="selected" />
      </div>

      {/* 네 번째 줄: 고정된 상태 (수정 불가) */}
      <div className="flex gap-3 mb-3">
        <AchieveButton type="complete" state="fixed" />
        <AchieveButton type="partial" state="fixed" />
        <AchieveButton type="failed" state="fixed" />
      </div>

      <div className="p-3">{/* <DayMemo startDate={data.startDate} /> */}</div>

      <ActionButton variant="primary">작심삼일 시작하기</ActionButton>
      <ActionButton variant="outline">하루 끝내기</ActionButton>
      <ActionButton variant="secondary">하루 끝내기</ActionButton>
      <div className="flex">
        <ActionButton variant="disabled">취소</ActionButton>
        <ActionButton variant="primary">저장</ActionButton>
      </div>
    </div>
  );
};

export default Test;
