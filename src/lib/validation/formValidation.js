import { schedulingSchema } from "../schemas/schedulingSchema";
import { clearErrors, showErrors, showFieldError } from "./errorHandling";
import { z } from "zod";

let submitted = false;

export function validateForm(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const result = schedulingSchema.safeParse(data);

  clearErrors();

  if (!result.success) {
    showErrors(z.flattenError(result.error).fieldErrors);
    return false;
  }

  return true;
}

export function validateField(field) {
  if(!submitted) return;

  const fieldSchema = schedulingSchema.shape[field.id];
  if (!fieldSchema) return;

  const result = fieldSchema.safeParse(field.value);

  showFieldError(field, result);
}

export function setSubmitted(isSubmitted) {
  submitted = isSubmitted;
}
