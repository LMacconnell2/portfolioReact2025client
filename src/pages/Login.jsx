import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <main class="login-page">
      <section id="login-form-section">
        <form id="login-form" onSubmit={handleLogin}>
          <p>
            <label htmlFor="login-email-input">Email:</label>
          </p>
          <p>
            <input
              id="login-email-input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="login-password-input">Password:</label>
          </p>
          <p>
            <input
              id="login-password-input"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>

          <button id="login-button" type="submit">Log in</button>

          <p><a id="login-register-link" href="/register">No Account? Register</a></p>
          <p><a id="login-home-link" href="/">Home</a></p>
        </form>
      </section>
    </main>
  );
}