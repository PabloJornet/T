const controller = {};
const conexion = require('../database/db')
const {promisify} = require('util')

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tcentral ', (err, centrales) => {
     if (err) {
      res.json(err);
     }
     res.render('centrales', {
        data: centrales
     });
    });
  });
};

controller.save = (req, res) => {
  const dataDomicilioCuenta = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tDomicilioCuenta set ?', dataDomicilioCuenta, (err, domicilioCuenta) => {
      console.log(domicilioCuenta)
      res.redirect('/domicilioCuenta');
    })
  })
};

 



  controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM tDomicilioCuenta WHERE dom_id = ?", [id], (err, rows) => {
        res.render('domicilioCuentas_edit', {
          dataDomicilioCuenta: rows[0]
        })
      });
    });
  };
  controller.update = (req, res) => {
    const { id } = req.params;
    const newDomicilioCuenta = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE tDomicilioCuenta set ? where dom_id = ?', [newDomicilioCuenta, id], (err, rows) => {
      res.redirect('/domicilioCuenta');
    });
    });
  };

  controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM tDomicilioCuenta WHERE dom_id = ?', [id], (err, rows) => {
      res.redirect('/domicilioCuenta');
    });
  });
}

module.exports = controller;