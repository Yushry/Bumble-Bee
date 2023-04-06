import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connect from './config/db.js';
import cors from 'cors';
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoutes.js'
import productRoute from './routes/productRoute.js'
import usersRoute from './routes/userCrudRoutes.js'
import orderRoute from './routes/orderRoutes.js'

//-------DOTENV------>
dotenv.config();


const app = express();


//-----MIDDLEWARE--------->
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//-----ROUTES--------->
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/order', orderRoute);



//-----LISTEN & PORT--------->
const port = process.env.PORT || 5000;
app.listen(port, () => {
    connect();
    console.log(`Server is running ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgYellow.black);
});