import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

export const handleErrors = (errors: FieldErrors) => {
  const firstError = Object.values(errors)[0];

  if (firstError?.message) {
    toast.error(String(firstError.message), { duration: 1500 });
  }
};
