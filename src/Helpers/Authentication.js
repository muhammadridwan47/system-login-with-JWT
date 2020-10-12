const jwt = require('jsonwebtoken');
const db = require("../Helpers/db");
const admin = (req,res,next) =>
{
    // ambil dari req headers 
    const authHeader = req.headers['authorization'] 
    const token = authHeader && authHeader.split(' ')[1]
    // jika token ksosong 
    if (token === null) return res.sendStatus(401);
    // verify
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        // jika tidak sesuai block status
        if (err)return res.sendStatus(403);
        // mangambil payload dan decode 
        // req.user = user;
        let email = user.email;
        const query = "SELECT * FROM users WHERE email=?";
        db.query(query, email, (err, data) => {
           if (data[0].status !== 'admin') return res.sendStatus(403);
        })

        // lanjut
        next();
    });
}

const allAccess = (req,res,next) =>
{
    const authHeader = req.headers['authorization'] 
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if (err)return res.sendStatus(403);
        let email = user.email;
        const query = "SELECT * FROM users WHERE email=?";
        db.query(query, email, (err, data) => {
            if (data.length === 0) return res.sendStatus(403);
        })
        next();
    });
}


module.exports = {
    admin : admin,
    allAccess : allAccess
}