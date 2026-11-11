// מידלוואר המצרף את התאריך והשעה הנוכחיים לאובייקט הבקשה (req) עבור כל פנייה לשרת
export const addCurrentDate = (req, res, next) => {
    req.currentDate = new Date();
    next();
};