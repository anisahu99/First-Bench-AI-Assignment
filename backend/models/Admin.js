const mongoose = require('mongoose');

// Define the user schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        validate: {
            validator: function (v) {
                // Regex for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Optional: Set a minimum length for password
        validate: {
            validator: function (v) {
                // Optional: Add regex for password complexity
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: "Password must be at least 8 characters long and contain at least one letter and one number."
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Regex for phone number validation (e.g., 10 digits)
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    
});

// Create the User model
module.exports = mongoose.model('Admin', adminSchema);