import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getstats = async () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const API = `${baseUrl}api/stats`;

  const res = await axios.get(API);
  return res;
};

export const useGetStats = () => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["AllStats"],
    queryFn: getstats,
  });
  return { data, isLoading, status, isError };
};
