import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup } from "../services/useAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const nav = useNavigate();
  const { mutate: signupcall, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address."
      );
      nav("./login");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signupcall, isPending };
}
