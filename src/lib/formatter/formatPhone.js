export function formatPhone() {
  const phone = document.getElementById("phone");

  if (!phone) return;

  phone.addEventListener("input", (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    event.target.value = value;
  });
}
