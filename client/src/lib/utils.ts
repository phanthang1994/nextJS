import { type ClassValue, clsx } from "clsx"
import { toast } from "@/components/ui/use-toast"
// @ts-ignore
import { twMerge } from "tailwind-merge"
import { UseFormSetError } from "react-hook-form";
import { EntityError } from "./http";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({ error, setError, duration = 5000 }: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
      error.payload.errors.forEach((item => {
          setError(item.field, {
              type: 'server',
              message: item.message
          });
      }));
  } else {
      toast({
          title: 'Lỗi',
          description: error?.payload?.message ?? 'Lỗi không xác định',
          variant: 'destructive',
          duration: duration,
      });
  }
};
