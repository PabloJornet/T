const controller = {};
const conexion = require('../database/db');
const {promisify} = require('util')

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tcliente', (err, personas) => {
     if (err) {
      res.json(err);
     }
     res.render('personas', {
        data: personas
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tcliente set ?', data, (err, persona) => {
      console.log(persona)
      res.redirect('/persona');
    })
  })
};

 



  controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM tcliente WHERE cli_doc = ?", [id], (err, rows) => {
        res.render('personas_edit', {
          data: rows[0]
        })
      });
    });
  };
  controller.update = (req, res) => {
    const { id } = req.params;
    const newPersona = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE tcliente set ? WHERE cli_doc = ?', [newPersona, id], (err, rows) => {
      res.redirect('/persona');
    });
    });
  };

  controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM tcliente WHERE cli_doc = ?', [id], (err, rows) => {
      res.redirect('/persona');
    });
  });
}

module.exports = controller;