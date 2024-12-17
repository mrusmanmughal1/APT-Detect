import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../services/useAuth";

export const useLogin = () => {
  const navigate = useNavigate();

  const query = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      toast.success("Welcome To Dashboard !");
      navigate("/dashboard/monitoring", { replace: true });
      query.setQueryData(["user"], user.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
};
