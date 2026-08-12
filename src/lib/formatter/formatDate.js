export function formatDate() {
  const date = document.getElementById("preferredDate");

  if (!date) return;

  date.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length > 4) {
      value = value.replace(
        /^(\d{2})(\d{2})(\d+)/,
        "$1/$2/$3"
      );
    } else if (value.length > 2) {
      value = value.replace(
        /^(\d{2})(\d+)/,
        "$1/$2"
      );
    }

    e.target.value = value;
  });
}
