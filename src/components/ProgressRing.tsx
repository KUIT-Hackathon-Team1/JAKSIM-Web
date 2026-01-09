import icProgressDefault from "../assets/progress-default.svg";
import icProgressFail from "../assets/progress-fail.svg";
import icProgressHalf from "../assets/progress-half.svg";
import icProgressSuccess from "../assets/progress-success.svg";

interface ProgressRingProps {
  result?: "SUCCESS" | "FAIL" | "DEFAULT" | "HALF";
  angle?: number;
}

const ProgressRing = ({ result = "DEFAULT", angle = 0 }: ProgressRingProps) => {
  const getProgressRingImage = (result: string) => {
    switch (result) {
      case "SUCCESS":
        return icProgressSuccess;
      case "FAIL":
        return icProgressFail;
      case "HALF":
        return icProgressHalf;
      default:
        return icProgressDefault;
    }
  };

  const rotationClass =
    angle === 0 ? "rotate-0" : angle === 120 ? "rotate-120" : "rotate-240";

  return (
    <img
      src={getProgressRingImage(result)}
      alt="progress ring"
      className={`absolute inset-0 w-full h-full ${rotationClass}`}
    />
  );
};

export default ProgressRing;
