import { modalContents } from "../../content/modalContent.js";

let lastTrigger = null;

export function openModal(key, trigger = null) {
  const content = modalContents[key];
  const modal = document.getElementById("modal-overlay");

  if (!content || !modal) return;

  const title = modal.querySelector("#modal-title");
  const message = modal.querySelector("#modal-message");
  const closeButton = modal.querySelector("#close-modal");

  if (!title || !message) return;

  title.textContent = content.title;
  message.textContent = content.message;
  lastTrigger = trigger;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.setAttribute("aria-hidden", "false");
  closeButton?.focus();
}

export function closeModal() {
  const modal = document.getElementById("modal-overlay");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modal.setAttribute("aria-hidden", "true");
  lastTrigger?.focus?.();
}

export function initModal() {
  if (document.documentElement.dataset.modalReady) return;
  document.documentElement.dataset.modalReady = "true";

  document.addEventListener("click", (event) => {
    const modal = document.getElementById("modal-overlay");
    const target = event.target;

    if (target?.closest?.("#close-modal, #confirm-modal") || target === modal) {
      closeModal();
      return;
    }

    const trigger = target?.closest?.("[data-modal]");
    if (trigger) openModal(trigger.dataset.modal, trigger);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}
