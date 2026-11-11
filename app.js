import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import indexRoutes from './routes/index.route.js';
import { addCurrentDate } from './middlewares/currentDate.middleware.js';
import { logGetRequest } from './middlewares/getLog.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Middlewares חיצוניים (Third-Party)
// ==========================================

// 1. CORS - מאפשר גישה לשרת מכל יישום צד-לקוח (Client) חיצוני ללא חסימות דפדפן
app.use(cors());

// 2. Helmet - מוסיף כותרות אבטחה ל-HTTP כדי להגן מפני פגיעויות נפוצות
app.use(helmet());

// 3. Morgan - מדפיס באופן אוטומטי לטרמינל את נתוני כל הבקשות המגיעות לשרת (במצב פיתוח)
app.use(morgan('dev'));

// 4. Express-Rate-Limit - מגביל את מספר הבקשות המותר מכתובת IP מסוימת בפרק זמן מוגדר למניעת עומסים
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 דקות
    max: 100 // מקסימום 100 בקשות לכל IP
});
app.use(limiter);


app.use(express.json());



app.use(addCurrentDate);


app.use(logGetRequest);


app.use('/api', indexRoutes);

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`השרת רץ ומאזין בכתובת http://localhost:${PORT}`);
});