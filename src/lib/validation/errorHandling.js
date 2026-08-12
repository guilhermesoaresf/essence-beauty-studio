
export function showErrors(errors) {
  Object.entries(errors).forEach(([field, messages]) => {
    const errorElement = document.querySelector(`[data-error="${field}"]`);
    const labelError = document.getElementById(`label-${field}`);
    const inputError = document.getElementById(`${field}`);
    if(errorElement && labelError && inputError && messages?.length) {
      errorElement.textContent = messages[0];
      errorElement.classList.remove('hidden');
      labelError.classList.add('text-red-500');
      labelError.classList.remove('text-foreground');
      inputError.classList.remove('border-black', 'focus:border-primary');
      inputError.classList.add('border-red-500');
    }
  });
}

export function showFieldError(field, result) {
  const fieldError = document.querySelector(`[data-error="${field.id}"]`);
  const labelError = document.getElementById(`label-${field.id}`);

  if (result.success) {
    fieldError?.classList.add('hidden');
    labelError?.classList.add('text-foreground');
    labelError?.classList.remove('text-red-500');
    field.classList.remove('border-red-500');
    field.classList.add('border-black', 'focus:border-primary');
  } else {
    if (fieldError) {
      fieldError.classList.remove('hidden');
      labelError?.classList.add('text-red-500');
      labelError?.classList.remove('text-foreground');
      field.classList.remove('border-black', 'focus:border-primary');
      field.classList.add('border-red-500');
      fieldError.textContent = result.error.issues[0].message;
    }
  }
}

export function clearErrors() {
  const errors = document.querySelectorAll(`[data-error]`);
  errors.forEach(element => {
    element.textContent = '';
    element.classList.add('hidden');
  });

  document.querySelectorAll('.label-error').forEach((label) => {
    label.classList.remove('text-red-500');
  });

  document.querySelectorAll('.input-error').forEach((field) => {
    field.classList.remove('border-red-500');
    field.classList.add('border-black', 'focus:border-primary');
  });
}
