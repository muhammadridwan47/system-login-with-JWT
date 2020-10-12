const db = require("../Helpers/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const refreshTokens = [];
const authModel = {
  logout: (body) => {
    return new Promise((resolve, reject) => {
      const { token } = body;
      if (!token)reject('token is required');
      if (!refreshTokens.includes(token))
      {
        reject('this token invalid');
      }
      
      // refreshTokens = refreshTokens.filter(refresh => {
      //    return refresh !== body.token 
      // })
        resolve('Successfully')
      
      
    });
  },
  register: (body) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        const { password } = body;
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newBody = { ...body, password: hashedPassword };
          if (err) {
            reject(err);
          }
          const query = "INSERT INTO users SET ?";
          db.query(query, newBody, (err, data) => {
            if (!err) {
              resolve(newBody);
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },
  token: (body) => {
    return new Promise((resolve, reject) => {
      const { token } = body;
      if (token.length === 0)reject('token is required');
      if (!refreshTokens.includes(token)) reject('this token invalid');
      jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24h'});
        resolve(accessToken);
      });

    });
  },
  login: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      // console.log(password,email)
      const query = "SELECT * FROM users WHERE email=?";
      db.query(query, email, (err, data) => {
        let dataUser = data[0];
        if (!data.length) {
          reject("Email Salah.");
        } else {
          if (!err) {

            const userData =  {email: dataUser.email,id: dataUser.id,name: dataUser.name}
            const accessToken = jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24h'});
            const refreshToken = jwt.sign(userData,process.env.REFRESH_TOKEN_SECRET);
            const token = {accessToken:accessToken,refreshToken:refreshToken}
            refreshTokens.push(refreshToken);
            // console.log(refreshTokens)
            bcrypt.compare(password, dataUser.password, function (err, result) {
              if (err) {
                reject("Password Salah");
              } else {
                if (!result) {
                  reject("Password Salah");
                } else {
                  const sql = "SELECT * FROM users WHERE password=?";
                  db.query(sql, dataUser.password, (err, data) => {
                    if (!err) {
                      resolve(token);
                    } else {
                      reject("Password Salah");
                    }
                  });
                }
              }
            });
          } else {
            reject(err);
          }
        }
      });
    });
  },
 

};

module.exports = authModel;
