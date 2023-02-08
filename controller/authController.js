import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// import model User
import User from '../models/User.js';

// import validation
import { registerValidation, loginValidation } from '../configs/validation.js';

export const register = async (req, res) => {
  const { error, value } = await registerValidation(req.body);

  if (error)
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });

  const { name, email, password } = value;

  // cek duplikat email
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email sudah terdaftar',
    });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      status: 'success',
      message: 'Berhasil membuat akun',
      data: savedUser.id,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Gagal membuat user baru',
    });
  }
};

export const login = async (req, res) => {
  const { error, value } = await loginValidation(req.body);
  if (error)
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });

  const { email, password } = value;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email tidak terdaftar',
    });
  }

  // cek password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password salah',
    });
  }

  // membuat token menggunakan JWT
  const token = jwt.sign({ id: user._id }, 'agjdagjsdvjhadvhacsk', { expiresIn: '1h' });

  res.status(200).json({
    status: 'success',
    message: 'Berhasil login',
    token: token,
  });
};
