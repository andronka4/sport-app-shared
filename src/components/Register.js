import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
        // Можна перенаправити користувача на іншу сторінку після успішної реєстрації
        console.log('Реєстрація успішна:', data);
      } else {
        setError(data.message || 'Помилка реєстрації');
        setMessage('');
        console.error('Помилка реєстрації:', data);
      }

    } catch (error) {
      setError('Помилка підключення до сервера');
      setMessage('');
      console.error('Помилка реєстрації:', error);
    }
  };

  return (
    <div>
      <h2>Реєстрація</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Ім'я користувача:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Електронна адреса:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}

export default Register;