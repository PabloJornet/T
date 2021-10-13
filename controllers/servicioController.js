const controller = {};


controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tservicio', (err, servicios) => {
     if (err) {
      res.json(err);
     }
     res.render('servicios', {
        data: servicios
     });   });   });   };  

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tservicio set ?', data, (err, servicio) => {
      console.log(servicio)
      res.redirect('/servicio');
    })   })    };

  controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM tservicio WHERE ser_cod = ?", [id], (err, rows) => {
        res.render('servicios_edit', {
          data: rows[0]
        })   });    });     };

  controller.update = (req, res) => {
    const { id} = req.params;
    const newServicio = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE tservicio set ? WHERE ser_cod = ?', [newServicio, id], (err, rows) => {
      res.redirect('/servicio');
    });    });    };

  controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM tservicio WHERE ser_cod = ?', [id], (err, rows) => {
      res.redirect('/servicio');
    });     });   }  

module.exports = controller;