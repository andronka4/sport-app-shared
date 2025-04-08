import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ExerciseList from './components/ExerciseList';
import CourseList from './components/CourseList';
import HomePage from './components/HomePage';
import Register from './components/Register'; // Імпортуємо компонент Register
import Login from './components/Login'; // Імпортуємо компонент Login

function App() {
  return (
    <Router>
      <div className="app-container">
	  				<div className="auth-links">
						<Link to="/register" className="auth-sub-button">Реєстрація</Link> {/* Додаємо посилання на сторінку реєстрації */}
						<Link to="/login" className=" auth-sub-button">Вхід</Link> {/* Додаємо посилання на сторінку входу */}
					</div>
        <aside className="sidebar">
			<Link to="/" className="sidebar-button">Головна</Link>
			<Link to="/exercises" className="sidebar-button">Список вправ</Link>
			<Link to="/courses" className="sidebar-button">Готові курси</Link>



        </aside>
        <main className="main-content">
          <header className="app-header">

          </header>
          <Routes>

            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/courses" element={<CourseList />} />
		    <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} /> 
            <Route path="/login" element={<Login />} /> 
			
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;