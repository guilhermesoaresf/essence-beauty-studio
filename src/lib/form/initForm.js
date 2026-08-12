import { formatInputs } from "../formatter/formatter";
import { openModal } from "../modal/modal";
import { setSubmitted, validateField, validateForm } from "../validation/formValidation";

export function initForm() {
  const form = document.getElementById("scheduling-form");
  const fields = document.querySelectorAll('.input-error');

  if (!form || form.dataset.ready) return;
  form.dataset.ready = "true";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!validateForm(form)) return;

    openModal("scheduling");
    form.reset();
    setSubmitted(false);
  });

  fields.forEach(field => {
    field.addEventListener("input", () => {
      validateField(field);
    });
  });

  formatInputs();
}

document.addEventListener("astro:page-load", initForm);
