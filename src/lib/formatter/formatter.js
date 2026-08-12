import { formatDate } from "./formatDate.js";
import { formatPhone } from "./formatPhone.js";
import { formatTime } from "./formatTime.js";

export function formatInputs() {
  formatDate();
  formatTime();
  formatPhone();
}
