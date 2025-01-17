const validateMiddleware = (schema)=>{
    return (req, res, next)=>{
        const { error } = schema.validate(req.body);
        if (error) {
            // Return validation errors
            return res.status(400).json({
                message: "Validation error",
                errors: error.details.map(err => err.message) // Collect all error messages
            });
        }
        next();
    }
}