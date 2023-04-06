import Admin from "../models/adminModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";



export const registerAdminController = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validations
        if (!firstName || !lastName) {
            return res.status(400).send({ message: 'First and Last name are required' });
        }
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Password is required' });
        }

        // Check if the email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new admin instance
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Save the admin to the database
        const savedAdmin = await newAdmin.save();

        res.status(201).send({
            success: true,
            message: 'Admin registered successfully',
            admin: savedAdmin
        });

    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error registering admin', error });

    }
};


//POST LOGIN
export const loginAdminController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ message: 'Email is not registered' });
        }

        // Compare the password
        const match = await comparePassword(password, admin.password);
        if (!match) {
            return res.status(400).send({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = await JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            admin: {
                _id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                role: admin.role
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error logging in', error });
    }
};