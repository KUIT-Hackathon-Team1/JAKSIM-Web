interface GoalProgressRingProps {
  days: number;
}

const GoalProgressRing = ({ days }: GoalProgressRingProps) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

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
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      ))}
    </svg>
  );
};

export default GoalProgressRing;
