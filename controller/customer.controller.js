var config = require('../config');
const con = require('../db');

module.exports = {
    getAll: getAll,
    deleteCus: deleteCus,
    AddOrEdit: AddOrEdit
}

function getAll(req, res) {
    let filter = JSON.parse(req.query.filter.replace('.$.', '%').replace('.$.', '%'));
    let find = filter.find && filter.find != '' ?
        `AND (cus.fullname like '%${filter.find}%' ) OR cus.phone like '%${filter.find}%' OR cus.email like '%${filter.find}%' OR cus.transaction_code like '%${filter.find}%'`
        : '';
    let sql = `SELECT cus.* FROM customers as cus WHERE 1 ${find} LIMIT ${filter.offset},${filter.limit}`;

    let sqlCount = `SELECT count(cus.id) as tt FROM customers cus WHERE 1 ${find}`;
    con.query(sql, (err, response) => {
        if (err) return res.send(err);
        con.query(sqlCount, (err, c) => {
            if (c && response) return res.send({ status: 1, message: 'oke', data: response, count: c[0].tt });
            return res.send(err);
        })
    })
}

function deleteCus(req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM customer as cus WHERE cus.id=${id}`;
    con.query(sql, (err, res) => {
        if (err) return res.send(err);
        return res.send({
            status: 1,
            message: 'Xóa khách hàng thành công!'
        })
    })
}

function AddOrEdit(req, res) {
    let cus = req.body;
    let request = {
        fullname: cus.fullname,
        transaction_code: cus.transaction_code,
        email: cus.email,
        username_telegram: cus.username_telegram,
        price_transaction: cus.price_transaction,
        phone: cus.phone,
        active: cus.active,
        user_id: cus.user_id,
        note: cus.note,
        created: new Date()
    };
    if (cus.id) {
        con.query(
            'UPDATE customers SET ? WHERE id=' + cus.id,
            request,
            (err, response) => {
                if (err) return res.send(err);
                return res.send({
                    status: 1,
                    message: 'Cập nhật khách hàng thành công!'
                });
            });

    } else {

        con.query(
            'SELECT * FROM customers u WHERE (u.phone =? OR u.email = ?) AND user_id',
            [request.phone, request.email, request.user_id],
            (err, r) => {
                if (err) return res.send(err);
                if (r && r.length > 0) {
                    return res.send({
                        status: 0,
                        message: 'Khách hàng này đã tồn tại!'
                    });
                } else {
                    con.query('INSERT INTO customers SET ?', request, (err, response) => {
                        if (err) return res.send(err);
                        return res.send({
                            status: 1,
                            id: response.insertId,
                            message: 'Tạo khách hàng thành công!'
                        })
                    })
                }
            })

    }
}
