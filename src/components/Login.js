import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Для перенаправлення після входу

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Хук для навігації

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', { // Припустимо, у нас буде ендпоінт /api/login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Вхід успішний!');
        setError('');
        console.log('Вхід успішний:', data);
		localStorage.setItem('token', data.token);
        // Збережіть отриманий токен (ми реалізуємо це пізніше)
        // Наприклад, localStorage.setItem('token', data.token);
        // Перенаправте користувача на головну сторінку або іншу захищену сторінку
        navigate('/');
      } else {
        setError(data.message || 'Неправильні облікові дані');
        setMessage('');
        console.error('Помилка входу:', data);
      }

    } catch (error) {
      setError('Помилка підключення до сервера');
      setMessage('');
      console.error('Помилка входу:', error);
    }
  };

  return (
    <div>
      <h2>Вхід</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
}

export default Login;