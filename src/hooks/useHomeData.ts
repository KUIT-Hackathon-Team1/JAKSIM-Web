import { useState, useEffect } from "react";
import { fetchHomeData } from "../api/home";
import type { HomeResponse } from "../api/types_2";

const useHomeData = () => {
  const [data, setData] = useState<HomeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchHomeData();
        setData(result);
      } catch (err) {
        console.error("데이터 로딩 중 에러 발생:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { data, isLoading, error };
};

export default useHomeData;
