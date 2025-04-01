const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/sport_app_db';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Підключено до MongoDB для заповнення'))
  .catch(err => console.error('Помилка підключення до MongoDB:', err));

// Схема моделі Exercise
const exerciseSchema = new mongoose.Schema({
  name: String,
  description: String
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

// Схема моделі Course
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  modules: [String]
});
const Course = mongoose.model('Course', courseSchema);

const initialExercises = [
  { name: 'Віджимання через скрипт', description: 'Вправа, додана через скрипт.' },
  { name: 'Присідання через скрипт', description: 'Ще одна вправа, додана через скрипт.' },
  { name: 'Планка через скрипт', description: 'Статична вправа для корпусу, додана через скрипт.' }
];

const initialCourses = [
  { title: 'Курс для початківців', description: 'Вступний курс з основних вправ.', modules: ['Розминка', 'Базові вправи', 'Заминка'] },
  { title: 'Інтенсивний курс', description: 'Програма для досвідчених спортсменів.', modules: ['Кардіо', 'Силові вправи', 'Розтяжка'] }
];

async function seedDatabase() {
  try {
    await Exercise.deleteMany({});
    console.log('Колекцію вправ очищено');
    await Exercise.insertMany(initialExercises);
    console.log('Початкові вправи додано до бази даних');

    await Course.deleteMany({});
    console.log('Колекцію курсів очищено');
    await Course.insertMany(initialCourses);
    console.log('Початкові курси додано до бази даних');

    mongoose.disconnect();
    console.log('Відключено від MongoDB');
  } catch (err) {
    console.error('Помилка заповнення бази даних:', err);
    mongoose.disconnect();
  }
}

seedDatabase();