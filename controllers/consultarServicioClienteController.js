const controller = {};

controller.list = (req, res,next) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tserviciosxcentral', (err, consultarServicioClientes) => {
     if (err) {
      res.json(err);
     }
     res.render('centrales', {
        data2: consultarServicioClientes
     });
    });
  });
};

controller.list = (req, res,next) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tserviciosxcentral', (err, consultarServicioClientes) => {
     if (err) {
      res.json(err);
     }
     res.render('centrales', {
        data: consultarServicioClientes
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
  
    conn.query('UPDATE tserviciosxcentral set ? WHERE servicioNombre = ?', [newServicioCliente, id], (err, rows) => {
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