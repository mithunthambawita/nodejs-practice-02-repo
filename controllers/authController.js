const userDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const fsPromiss = require('fs').promises;
const path = require('path');


const handleLogin = async (req,res)=>{
    const {user,pwd}= req.body;
    if(!user || !pwd) return res.status(400).json({'message' : 'Username and password are required'});

    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401);//unautherize
    //evaluate password
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles);
        //create JWTs here
        const accessToken  = jwt.sign(
            {
                "UserInfo":{
                    "username": foundUser.username,
                    "roles":roles
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'60s'}
        );
        const refreshToken  = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        //Saving refreshToken with current user
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = {...foundUser,refreshToken};
        userDB.setUsers([...otherUsers,currentUser]);
        await fsPromiss.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
        );
        res.cookie('jwt',refreshToken,{httpOnly:true, sameSite:'none', secure:true, maxAge:24*60*60*1000});
        res.json({accessToken});
    }else{
        res.sendStatus(401);
    }
}
module.exports = {handleLogin};