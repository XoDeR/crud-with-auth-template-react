import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../stores/authStore";
import api from "../api/api";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (credentials: any) => api.post("/auth/login", credentials),
    onSuccess: (data) => {
      setToken(data.data.token);
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (userData: any) => api.post("/auth/register", userData),
    onSuccess: (data) => {
      setToken(data.data.token);
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });
};
