import mongoose from "mongoose";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
