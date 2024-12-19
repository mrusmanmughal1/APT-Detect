import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getMalicus = async () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const API = `${baseUrl}api/malicious-ips`;

  const res = await axios.get(API);
  return res;
};

export const useMalicious = () => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["Malicus"],
    queryFn: getMalicus,
  });
  return { data, isLoading, status, isError };
};
