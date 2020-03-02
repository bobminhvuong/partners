const con = require('./../db');

module.exports = {
    create: create
}

function create(req, res) {
    let reqVip = req.body;
    let newVip = {
        email: reqVip.email,
        username: reqVip.username,
        email_transaction: reqVip.email_transaction,
        username_transaction: reqVip.username_transaction,
        status: 1,
        active: 1,
        user_id: reqVip.user_id,
        note: reqVip.note,
        expiration_date: new Date(),
        created: new Date()
    }
    con.query('INSERT INTO user_request_vips SET ?', newVip, (err, response) => {
        if (err) return res.send(err);
        return res.send({
            status: 1,
            message: 'Yêu cầu tạo vip thành công!',
            id: response.insertId
        })
    })
}