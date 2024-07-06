import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
//需要在使用dotenv之前call这个方法
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { fileURLToPath } from 'url';
import path from 'path';

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

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块的目录路径
const __dirname = path.dirname(__filename);

console.log(__dirname);

// 配置静态文件中间件
app.use('/images', express.static(path.join(__dirname, 'data/public/images')));

// 创建router
app.get('/', (req, res) => {
    res.send('API is running');
});

// 每当有一个请求到达/api/products，我们将使用productRoutes router处理它
app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));