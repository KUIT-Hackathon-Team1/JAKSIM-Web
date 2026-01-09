import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoalContinueForm from "../../components/GoalContinueForm";

const GoalContinue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || "maintain";
  const [intention, setIntention] = useState("");

  return (
    <div className="min-h-screen bg-[#FEF6EE]">
      <header className="h-13 grid grid-cols-[1fr_auto_1fr] items-center bg-white border-b border-gray-100 px-4">
        <div className="flex justify-start">
          <button aria-label="back" onClick={() => navigate("/home")} className="cursor-pointer">
            <img src="/arrow-left.svg" alt="뒤로가기" />
          </button>
        </div>
        <h1 className="text-[18px] font-semibold text-[#3F3E3A] text-center">목표 계속하기</h1>
      </header>

      <GoalContinueForm value={intention} onChange={setIntention} difficulty={difficulty} />
    </div>
  );
};

export default GoalContinue;
