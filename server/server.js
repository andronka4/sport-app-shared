const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Імпортуємо Mongoose
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Рядок підключення до MongoDB. Переконайся, що назва бази даних відповідає твоїй.
const uri = 'mongodb://127.0.0.1:27017/sport_app_db';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Підключено до MongoDB'))
  .catch(err => console.error('Помилка підключення до MongoDB:', err));

// Створюємо схему для наших вправ
const exerciseSchema = new mongoose.Schema({
  name: String,
  description: String
});

// Створюємо модель на основі схеми
const Exercise = mongoose.model('Exercise', exerciseSchema);

// Кінцева точка API для отримання списку вправ з бази даних
app.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    console.error('Помилка отримання вправ:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});




// Створюємо схему для готових курсів
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  modules: [String] // Припустимо, що курс складається з модулів (назви модулів)
});

// Створюємо модель на основі схеми
const Course = mongoose.model('Course', courseSchema);

// Кінцева точка API для отримання списку готових курсів з бази даних
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error('Помилка отримання курсів:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});