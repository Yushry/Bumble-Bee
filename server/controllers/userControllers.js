import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";



export const registerUserController = async (req, res) => {
    try {
        const { name, email, password, loanBalance, dateOfBirth, usedAmount, installmentPlan } = req.body;

        // Validations
        if (!name) {
            return res.status(400).send({ message: 'Name are required' });
        }
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Password is required' });
        }
        if (!dateOfBirth) {
            return res.status(400).send({ message: 'Date of birth is required' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
            loanBalance,
            usedAmount,
            installmentPlan
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: savedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error registering user', error });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        console.log(user._id);
        if (!user) {
            return res.status(404).send({ message: 'Email is not registered' });
        }

        // Compare the password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                loanBalance: user.loanBalance,
                usedAmount: user.usedAmount,
                installmentPlan: user.installmentPlan
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error logging in', error });
    }
};