import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { Post } from "../types";

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get("/posts");
      return data;
    },
  });
};

export const usePost = (id: number) => {
  return useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: Partial<Post>) => api.post("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPost: Post) =>
      api.put(`/posts/${updatedPost.id}`, updatedPost),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", variables.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
