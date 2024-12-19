import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getnormal = async () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const API = `${baseUrl}api/normal-ips`;

  const res = await axios.get(API);
  return res;
};

export const useGetLocalIP = () => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["AllStats"],
    queryFn: getnormal,
  });
  return { data, isLoading, status, isError };
};
