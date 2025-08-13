import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

interface Post {
  id: number;
  title: string;
  content: string;
}

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get("/posts");
      return data;
    },
  });
};

export const usePost = (id: number) => {};

export const useCreatePost = () => {};

export const useUpdatePost = () => {};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
