export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Data is invalid',
            data: null,
            errors: error.errors.map((e) => ({
                path: e.path[0],
                message: e.message,
            })),
        });
    }
};
