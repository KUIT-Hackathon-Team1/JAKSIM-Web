import { useNavigate } from "react-router-dom";
import GoalNewForm from "../../components/GoalNewForm";

const GoalNew = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FEF6EE]">
      <header className="h-13 grid grid-cols-[1fr_auto_1fr] items-center bg-white border-b border-gray-100 px-4">
        <div className="flex justify-start">
          <button aria-label="back" onClick={() => navigate("/home")} className="cursor-pointer">
            <img src="/arrow-left.svg" alt="뒤로가기" />
          </button>
        </div>

        <h1 className="text-[18px] font-semibold text-[#3F3E3A] text-center">목표 세우기</h1>

        <div></div>
      </header>

      <GoalNewForm />
    </div>
  );
};

export default GoalNew;
