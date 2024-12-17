import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getflows = async () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const API = `${baseUrl}api/flows/`;

  const res = await axios.get(API);
  return res;
};

export const useGetStats = () => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["allflow"],
    queryFn: getflows,
  });
  return { data, isLoading, status, isError };
};
