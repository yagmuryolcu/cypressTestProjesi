import { useState, useEffect } from "react";
import '../App.css';

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  function validate() {
    const newErrors = {};
    if (!emailRegex.test(email)) newErrors.email = "Geçerli email giriniz.";
    if (!passwordRegex.test(password)) newErrors.password = "Şifre güçlü olmalı.";
    if (!accepted) newErrors.accepted = "Şartları kabul etmelisiniz.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    const valid = validate();
    setIsValid(valid);
  }, [email, password, accepted]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-cy="input-email"
      />
      {errors.email && <p data-cy="error-email">{errors.email}</p>}

      <label>Şifre</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-cy="input-password"
      />
      {errors.password && <p data-cy="error-password">{errors.password}</p>}

      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          data-cy="input-accepted"
        />
        Şartları kabul ediyorum
      </label>
      {errors.accepted && <p data-cy="error-accepted">{errors.accepted}</p>}

      <button
        type="submit"
        disabled={!isValid}
        data-cy="submit-btn"
      >
        Giriş
      </button>
    </form>
  );
}
