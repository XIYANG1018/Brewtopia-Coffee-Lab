import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
//需要在使用dotenv之前call这个方法
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { fileURLToPath } from 'url';

// 定义端口
const port = process.env.PORT || 5000;

connectDB(); //在创建应用程序之前调用connectDB
//创建应用程序实例
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());



// 每当有一个请求到达/api/products，我们将使用productRoutes router处理它
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);



// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块的目录路径
const __dirname = path.dirname(__filename);


// 配置静态文件中间件
app.use('/images', express.static(path.join(__dirname, 'data/public/images')));
app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

if (process.env.NODE_ENV === 'production') {
    // set static folder
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    // any route that is not the api route will load the index.html file
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}
    




app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));