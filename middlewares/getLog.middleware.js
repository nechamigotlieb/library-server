// מידלוואר המאזין לבקשות ומדפיס את התאריך רק עבור בקשות מסוג GET
export const logGetRequest = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(`[GET Request] התאריך והשעה: ${req.currentDate}`);
    }
    next();
};