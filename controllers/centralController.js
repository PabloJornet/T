const controller = {};


/*controller.list = (req, res,next) => {
  req.getConnection((err, conn) => {

    conn.query('select * from tserviciosxcentral, (error, results) => {
      if (err) {
        res.json(err);
       }
      conn.query('SELECT * FROM tcentral', (error, resp) => {
          if (error) throw error;
          res.render('centrales', {
              dataRegistros: resp,
              columnNames: results
          });
      });
  });





});*/


   controller.list = (req, res) => {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM tserviciosxcentral', (err, sxcs) => {
       if (err) {
        res.json(err);
       }
       res.render('centrales', {
          data: sxcs
       });
      });
    });
  };   





controller.actualizarServicios = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM tserviciosxcentral WHERE sxc_nroCentral = ?", [id], (err, rows) => {
      res.render('centrales', {
        data: rows[0]
      })
    });
  });
};


controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tcentral set ?', data, (err, central) => {
      console.log(central)
      res.redirect('/central');
    })
  })
};

 



  controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM tcentral WHERE cen_nro = ?", [id], (err, rows) => {
        res.render('centrales_edit', {
          data: rows[0]
        })
      });
    });
  };




  controller.update = (req, res) => {
    const { id} = req.params;
    const newCentral = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE tcentral set ? WHERE cen_nro = ?', [newCentral, id], (err, rows) => {
      res.redirect('/servicio');
    });
    });
  };








  

  controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM tserviciosxcentral WHERE cen_nro = ? and ', [id], (err, rows) => {
      res.redirect('/central');
    });
  });
}

module.exports = controller;