const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Будь ласка, введіть дійсну електронну адресу'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  // Можете додати інші поля за потреби (наприклад, role)
}, { timestamps: true });

// Перед збереженням користувача хешуємо пароль
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Метод для порівняння введеного пароля з паролем у базі даних
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;