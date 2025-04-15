export const errorHandler = (err, req, res, next) => {
    console.log(`[ERROR] ${err.message}`);

    res.status(res.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};
