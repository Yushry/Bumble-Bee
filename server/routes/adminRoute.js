import express from "express";
import { registerAdminController,  
    loginAdminController
} from "../controllers/adminControllers.js";

// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();


//REGISTER
router.post("/register", registerAdminController);


//LOGIN 
router.post("/login", loginAdminController);


export default router;
