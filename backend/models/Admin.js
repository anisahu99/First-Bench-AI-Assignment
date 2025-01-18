const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Pre-save hook to hash password
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create the User model
module.exports = mongoose.model('Admin', adminSchema);