const db = require("../db/database");

exports.getItems = (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    res.json(rows);
  });
};

exports.addItem = (req, res) => {
  const { itemname, price, quantity } = req.body;
  db.run(
    "INSERT INTO items (itemname,price,quantity) VALUES (?,?,?)",
    [itemname, price, quantity],
    () => res.json({ success: true })
  );
};

exports.updateItem = (req, res) => {
  const { itemname, price, quantity } = req.body;
  db.run(
    "UPDATE items SET itemname=?, price=?, quantity=? WHERE id=?",
    [itemname, price, quantity, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
};

exports.deleteItem = (req, res) => {
  db.run("DELETE FROM items WHERE id=?", [req.params.id], () =>
    res.json({ success: true })
  );
};
