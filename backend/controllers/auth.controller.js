const User = require('../models/User');
const Admin = require('../models/Admin');
const bcr = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req, res)=>{
    const { name, email, password, phoneNumber, role } = req.body;
    if(role==='User'){
        try {
            const existUser = await User.findOne( { email } );
            if(existUser){
                return res.status(400).json({ message: 'email already exist!' });
            }
        
            const hashedPassword = await bcr.hash(password, 10);
            const user = new User({name, email, password: hashedPassword, phoneNumber, role});
            await User.save();
            res.status(201).json({ success:true, message: `User created successfully` });
        } catch (error) {
            console.error(err.stack);
            res.status(500).json({ success:false, message: `Error creating User` });

        }
    }else if(role==='Admin'){
        try {
            const existAdmin = await Admin.findOne( { email } );
            if(existUser){
                return res.status(400).json({ message: 'email already exist!' });
            }
        
            const hashedPassword = await bcr.hash(password, 10);
            const admin = new User({name, email, password: hashedPassword, phoneNumber});
            await Admin.save();
            res.status(201).json({ success:true, message: `Admin created successfully` });
        } catch (error) {
            console.error(err.stack);
            res.status(500).json({ success:false, message: `Error creating admin` });
        }

    }else{
        console.error(err.stack);
        res.status(400).json({ message: 'invalid role' });
    }

}

const login = async(req, res)=>{
    const { email, password, role } = req.body;
    if(role==='User'){

        try {
            const user = await User.findOne( { email } );
            if(!user){
                return res.status(400).json({ message: 'Invalid credentials!' });
            }
            // Check password
            const isPasswordValid = await bcr.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            // Generate JWT
            const token = jwt.sign( { name:user.name, email: user.email, role:'User' }, process.env.JWT_SECRET_KEY, { expireIn: '1d' } );
    
            if(user.status==='Deactivated'){
                return res.status(400).json({ message: 'This account has been deactivated', token });
            }
    
            res.status(200).json({ success:true, message: `user login successfully`, token });
        } catch (error) {
            res.status(500).json({ success:false, message: `Error loging user`, error: error.message });
        }
    }else if(role==='Admin'){
        try{
            const admin = await Admin.findOne( { email } );
            if(!admin){
                return res.status(400).json({ message: 'Invalid credentials!' });
            }
            // Check password
            const isPasswordValid = await bcr.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            // Generate JWT
            const token = jwt.sign( { name:admin.name, email: admin.email, role:'Admin' }, process.env.JWT_SECRET_KEY, { expireIn: '1d' } );
    
            if(admin.status==='Deactivated'){
                return res.status(400).json({ message: 'This account has been deactivated', token });
            }
    
            res.status(200).json({ success:true, message: `admin login successfully`, token });
        }
        catch (error) {
            res.status(500).json({ success:false, message: `Error loging admin`, error: error.message });
        }
    }else{
        res.status(400).json({ message: 'invalid role' });
    }
}

module.exports = { register, login };