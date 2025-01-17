const User = require('../models/User');


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
    } catch (error) {
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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// updataUserDetails

const updateDetails = async(req, res)=>{
    const { name, email, phoneNumber, password } = req.body;
    
    try {
        const user = await User.findOne( { email } );
        if(user){
            return res.status(400).json({ message: ' try different emailId ' });
        }
        
        await User.updateOne(
            { email },  // Filter to find the document
            { $set: { name, email, password } } // Update to set a new value for the field
        );
        res.status(200).json({ message: 'Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = {
    reActivateAccount, deActivateAccount, updateDetails 
}

