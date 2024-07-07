import { useUserContext } from "@/contexts/UserContext";

export const useCanSee = (role: string): boolean => {
  const { user } = useUserContext();
  if (!user) return false;

  return user.role === role;
};
