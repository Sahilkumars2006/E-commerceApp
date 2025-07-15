import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User, InsertUser, LoginUser } from "@shared/schema";

export function useAuth() {
  return useQuery<User>({
    queryKey: ["/api/profile"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: LoginUser) => {
      return apiRequest<User>("/api/login", "POST", credentials);
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/profile"], user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: InsertUser) => {
      return apiRequest<User>("/api/register", "POST", userData);
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/profile"], user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      return apiRequest("/api/logout", "POST");
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}