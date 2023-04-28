const User = require('../model/User');
const bcrypt = require('bcrypt'); 

const handleNewUser = async (req,res)=>{
    const {user,pwd}= req.body;
    if(!user || !pwd) return res.status(400).json({'message' : 'Username and password are required'});
    //check for dublicate username in the db
    const dublicate = await User.findOne({username:user}).exec();
    if(dublicate) return res.sendStatus(409); //conflict
    try {
        //encrypt the password
        const hashedpwd = await bcrypt.hash(pwd,10);
        //Create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedpwd
        });

//         const newUser = new User();
//         newUser.username = user;
//         newUser.password = hashedpwd;
//         const result = await newUser.save();


       console.log(result);
         res.status(200).json({'success':`New user ${user} created!`});

    } catch (err) {
        res.status(400).json({'message': err.message})
    }

}
module.exports = {handleNewUser};