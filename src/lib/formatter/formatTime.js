export function formatTime() {
  const time = document.getElementById("preferredTime");

  if (!time) return;

  time.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      value = value.replace(
        /^(\d{2})(\d+)/,
        "$1:$2"
      );
    }

    e.target.value = value;
  });
}
