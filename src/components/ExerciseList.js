
import React, { useState, useEffect } from 'react';
import styles from './ExerciseList.module.css';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/exercises')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExercises(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error("Помилка отримання даних:", error);
      });
  }, []); // Пустий масив залежностей означає, що ефект спрацює лише один раз після початкового рендерингу

  if (loading) {
    return <p>Завантаження вправ...</p>;
  }

  if (error) {
    return <p>Виникла помилка при завантаженні вправ: {error.message}</p>;
  }

  return (
    <div>
      <h2 className={styles.exerciseHeading}>Список вправ</h2>
      <ul className={styles.exerciseList}>
        {exercises.map(exercise => (
          <li key={exercise.id} className={styles.exerciseItem}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;