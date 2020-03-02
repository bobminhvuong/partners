const con = require('../db');

module.exports = {
    AddOrUpdate: AddOrUpdate,
    getToolSales: getToolSales
}

function getToolSales(req, res) {
    let userId = req.params.userId;
    con.query('SELECT * FROM toolSales ts WHERE ts.user_id=' + userId, (err, response) => {
        if (err) return res.send(err);
        if (response.length == 0) {
            return res.send({
                status: 1,
                message: 'Bạn chưa đăng kí công cụ sales!'
            })
        } else {
            return res.send({
                status: 1,
                message: 'oke',
                data: response[0]
            })
        }
    });
}

function AddOrUpdate(req, res) {
    let tool = req.body;
    if (tool.id) {
        let toolEdit = {
            email: tool.email,
            name_card: tool.name_card,
            landing_page: tool.landing_page,
            note: tool.note
        }
        con.query('UPDATE tool_sales SET ? WHERE id=' + tool.id, toolEdit, (err, response) => {
            if (err) return res.send(err);
            return res.send({
                status: 1,
                message: 'Cập nhật thành công',
            })
        })
    } else {
        let newTool = {
            email: tool.email,
            name_card: tool.name_card,
            landing_page: tool.landing_page,
            user_id: tool.user_id,
            note: tool.note,
            active: 1,
            created: new Date()
        }
        con.query('INSERT INTO tool_sales SET ?', newTool, (err, response) => {
            if (err) return res.send(err);
            return res.send({
                status: 1,
                message: 'Đăng ký công cụ sales thành công!',
                id: response.insertId
            })
        })
    }

}