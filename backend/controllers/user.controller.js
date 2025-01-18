const User = require('../models/User');
const bcrypt = require('bcrypt');


// Reactivate
const reActivateAccount = async(req, res)=>{
    const { email } = req.user;
    
    try {
        const user = await User.findOne( { email } );
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.status === 'Active'){
            return res.status(400).json({ message: 'Account is already active' });
        }
        await User.updateOne(
            { email },  // Filter to find the document
            { $set: { status:'Active' } } // Update to set a new value for the field
        );
        res.status(200).json({ message: 'Account reactivated successfully' });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


// Deactivate

const deActivateAccount = async(req, res)=>{
    const email = req.user.email;
    
    try {
        const user = await User.findOne( { email } );
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.status === 'Deactivated'){
            return res.status(400).json({ message: 'Account is already deactivated' });
        }
        await User.updateOne(
            { email },  // Filter to find the document
            { $set: { status:'Deactivated' } } // Update to set a new value for the field
        );
        res.status(200).json({ message: 'Account Deactivated successfully' });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// updataUserDetails

const updateDetails = async(req, res)=>{
    const { email } = req.user;
    const { updateName, updateEmail, updatePhoneNumber, updatePassword } = req.body;
    
    try {
        const user = await User.findOne( { email } );
        if(!user){
            return res.status(400).json({ message: 'emailId does not exist ' });
        }
        let hashedpassword;
        if(updatePassword){
            const salt = await bcrypt.genSalt(10);
            hashedpassword = await bcrypt.hash(updatePassword, salt);

        }
        await User.updateOne(
            { email },  // Filter to find the document
            { $set: { name: updateName, email: updateEmail, password: hashedpassword } } // Update to set a new value for the field
        );
        res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = {
    reActivateAccount, deActivateAccount, updateDetails 
}

