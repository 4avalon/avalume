const token = localStorage.getItem("token");

if (!token) {
  alert("Você precisa estar logado.");
  window.location.href = "../login/login.html";
} else {
  fetch("http://localhost:3000/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Token inválido.");
      return res.json();
    })
    .then((data) => {
      document.getElementById("username").textContent = data.username;
      document.getElementById("userId").textContent = data.id;
    })
    .catch(() => {
      alert("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "../login/login.html";
    });
}

document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Você saiu com sucesso.");
  window.location.href = "../login/login.html";
});
