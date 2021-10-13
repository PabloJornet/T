const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tservicio', (err, servicioClientes) => {
     if (err) {
      res.json(err);
     }
     res.render('servicioClientes', {
        data: servicioClientes
     });
    });
  });
};



controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tserviciosxcentral set ?', data, (err, servicioCliente) => {
      console.log(servicioCliente)
      res.redirect('/servicioCliente');
    })
  })
};

 

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM tservicio WHERE ser_cod = ?", [id], (err, rows) => {
      res.render('servicioClientes', {
        data: rows[0]
      })
    });
  });
};


controller.consultarSC = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM tServicioXCentral WHERE sxc_cta = ?", [id], (err, rows) => {
      res.render('consultarServicioClientes', {
        data: rows
      })
    });
  });
};




  controller.saveSCliente = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM tservicio WHERE ser_cod = ?", [id], (err, rows) => {
        res.render('/servicioClientes', {
          data: rows[0]
        })
      });
    });
  };




  controller.update = (req, res) => {
    const { id} = req.params;
    const newServicioCliente = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE tServicioXCentral set ? WHERE servicioNombre = ?', [newServicioCliente, id], (err, rows) => {
      res.redirect('/servicioCliente');
    });
    });
  };








  

  controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM tServicioXCentral WHERE servicioNombre = ?', [id], (err, rows) => {
      res.redirect('/servicioCliente');
    });
  });
}

module.exports = controller;