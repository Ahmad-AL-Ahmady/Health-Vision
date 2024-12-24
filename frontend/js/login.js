document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status === "success") {
      localStorage.setItem("token", data.token);

      window.location.href = "/success";
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during login");
  }
});
