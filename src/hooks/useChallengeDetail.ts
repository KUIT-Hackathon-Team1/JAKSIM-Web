import { useState, useEffect } from "react";
import { goalsApi } from "../api/goals";
import type { GoalRunResponse } from "../api/types";

export const useChallengeDetail = (runId: number) => {
  const [data, setData] = useState<GoalRunResponse | null>(null);

  useEffect(() => {
    goalsApi.getRun(runId).then(setData).catch(console.error);
  }, [runId]);

  return data;
};
