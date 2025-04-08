const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const User = require('./models/user');

app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017/sport_app_db';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Підключено до MongoDB'))
  .catch(err => console.error('Помилка підключення до MongoDB:', err));

// *** Маршрут для реєстрації користувача ***
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Будь ласка, заповніть усі поля' });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Користувач з таким ім\'ям користувача або email вже існує' });
    }
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Користувача успішно зареєстровано', userId: savedUser._id });
  } catch (error) {
    console.error('Помилка реєстрації користувача:', error);
    res.status(500).json({ message: 'Помилка при реєстрації користувача' });
  }
});

// Створюємо схему для наших вправ
const exerciseSchema = new mongoose.Schema({
  name: String,
  description: String
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

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
  modules: [String]
});
const Course = mongoose.model('Course', courseSchema);

app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error('Помилка отримання курсів:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

const jwt = require('jsonwebtoken');
const secretKey = 'ваш_секретний_ключ'; // *** ЗАМІНИТИ НА ВЛАСНИЙ СЕКРЕТНИЙ КЛЮЧ (бажано зберігати в змінних середовища) ***

// *** Маршрут для входу користувача ***
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Будь ласка, введіть ім\'я користувача та пароль' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Неправильне ім\'я користувача або пароль' });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неправильне ім\'я користувача або пароль' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Вхід успішний!', token });
  } catch (error) {
    console.error('Помилка входу:', error);
    res.status(500).json({ message: 'Помилка при вході' });
  }
});