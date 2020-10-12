const db = require('../Helpers/db')


const topUpModel = {
    getAllUsers: ()=> {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM topup', (err, res) => {
                if(!err) {
                    resolve(res) 
                }else{
                    reject(err)
                }
            })
        })
    },
    addTopUp: (body) =>  {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO topup SET ?`, body, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteTopUp: (id) =>  {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM topup WHERE id=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateTopUp: (id,body) =>  {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE topup SET ? WHERE id=${id}`,body, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}


module.exports = topUpModel

