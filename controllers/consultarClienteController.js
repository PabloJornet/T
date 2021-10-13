const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tcliente', (err, personas) => {
     if (err) {
      res.json(err);
     }
     res.render('consultarClientes', {
        data: personas
     });
    });
  });
};

controller.listE = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tcliente', (err, persona) => {
     if (err) {
      res.json(err);
     }
     res.render('consultarClientes', {
        data: persona     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tcliente set ?', data, (err, persona) => {
      console.log(persona)
      res.redirect('/consultarPersona');
    })
  })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM tcliente WHERE cli_doc = ?", [id], (err, rows) => {
        res.render('consultarClientes_edit', {
          data: rows[0]
        })
      });
    });
  };

  controller.update = (req, res) => {
    const { id} = req.params;
    const newPersona = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE tcliente set ? WHERE cli_doc = ?', [newPersona, id], (err, rows) => {
      res.redirect('/consultarClientes');
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

controller.consultarContrato = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT  u.*,cue.*,cen.* FROM users u JOIN tcuenta cue ON u.id=cue.cue_idU JOIN tcentral cen ON cen.cen_cta=cue.cue_cta WHERE cue_Doc = ?", [id], (err, rows) => {
      res.render('consultarContratos', {
        data: rows
      })
    });
  });
};
// SELECT  FROM 








module.exports = controller;