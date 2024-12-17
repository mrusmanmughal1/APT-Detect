import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCHeckList = async () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const API = `${baseUrl}api/apt-checklist/`;

  const res = await axios.get(API);
  return res;
};

export const useGetStats = () => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["checklist"],
    queryFn: getCHeckList,
  });
  return { data, isLoading, status, isError };
};
