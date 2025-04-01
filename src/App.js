import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ExerciseList from './components/ExerciseList';
import CourseList from './components/CourseList';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <Link to="/exercises" className="sidebar-button">Список вправ</Link>
          <Link to="/courses" className="sidebar-button">Готові курси</Link>
        </aside>
        <main className="main-content">
          <header className="app-header">

          </header>
          <Routes>

            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/" element={<HomePage />} /> {/* Головна сторінка */}

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;