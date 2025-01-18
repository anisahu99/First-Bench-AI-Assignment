const User = require('../models/User');
const getAllUsers = async(req, res,)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
      console.error(err.stack);
      res.status(500).json({ message: 'Error fetching users', error: error.message });
      
    }
}

module.exports = { getAllUsers };