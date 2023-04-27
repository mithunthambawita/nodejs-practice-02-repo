const userDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}
const fsPromiss = require('fs').promises;
const path = require('path');


const handleLogout=  async (req,res)=>{
//on client, also delete the access token

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookies.jwt;

    //is refresh token in db
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt',{httpOnly:true, sameSite:'none', secure:true})
        return res.sendStatus(403);
    }
//delete the refresh token
    const otherUsers = userDB.users.filter(person=> person.refreshToken !==foundUser.refreshToken);
    const currentUser = {...foundUser,refreshToken:''};
    userDB.setUsers([...otherUsers,currentUser]);
    await fsPromiss.writeFile(
        path.join(__dirname,'..','model','users.json'),
        JSON.stringify(userDB.users)
    )
    res.clearCookie('jwt',{httpOnly:true, sameSite:'none', secure:true});
    //secure tru - only serves on https
    res.sendStatus(204);

};
    
module.exports = {handleLogout};