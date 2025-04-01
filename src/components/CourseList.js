import React, { useState, useEffect } from 'react';
import styles from './CourseList.module.css';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error("Помилка отримання курсів:", error);
      });
  }, []);

  if (loading) {
    return <p>Завантаження курсів...</p>;
  }

  if (error) {
    return <p>Виникла помилка при завантаженні курсів: {error.message}</p>;
  }

  return (
    <div>
      <h2>Готові курси</h2>
      <ul className={styles.courseList}>
        {courses.map(course => (
          <li key={course._id} className={styles.courseItem}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {course.modules && course.modules.length > 0 && (
              <ul>
                {course.modules.map((module, index) => (
                  <li key={index}>{module}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;