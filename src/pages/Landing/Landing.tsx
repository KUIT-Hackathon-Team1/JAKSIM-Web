import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/ActionButton";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-t from-[#FEF6EE] to-white">
      <div className="">
        <div className="mx-auto flex min-h-screen flex-col px-6">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <img src="/logo.svg" alt="작심삼일 로고" className="mb-4" />
            <span className="mb-2 text-[12px] text-[#315762]">3일씩 쌓이는 나의 변화</span>
            <img src="/jaksim.svg" alt="작심삼일" className="h-[40px] w-auto" />
          </div>

          <div className="pb-10">
            <ActionButton variant="primary" onClick={() => navigate("/home")}>
              작심삼일 시작하기
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
