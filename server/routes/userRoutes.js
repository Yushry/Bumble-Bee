import express from "express";
import { registerUserController , loginUser } from "../controllers/userControllers.js";



//router object
const router = express.Router();


//REGISTER
router.post("/register", registerUserController);


// //LOGIN 
router.post("/login", loginUser);


export default router;