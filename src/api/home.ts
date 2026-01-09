import type { HomeResponse } from "./types_2";

const BASE_URL = "http://13.124.238.240:8080/api";

export const fetchHomeData = async (): Promise<HomeResponse> => {
  const response = await fetch(`${BASE_URL}/home`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": "test-uuid-1234", // 명세서 필수 헤더
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오지 못했습니다.");
  }

  return await response.json();
};
