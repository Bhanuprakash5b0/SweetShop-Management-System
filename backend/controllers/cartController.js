const db = require("../db/database");

exports.getCart = (req, res) => {
  db.all(
    `SELECT items.id, items.itemname, items.price, cart.quantity
     FROM cart JOIN items ON cart.itemid = items.id
     WHERE cart.userid=?`,
    [req.user.userid],
    (err, rows) => res.json(rows)
  );
};

exports.addToCart = (req, res) => {
  const { itemid } = req.body;
  db.run(
    `INSERT INTO cart (userid,itemid,quantity)
     VALUES (?,?,1)
     ON CONFLICT(userid,itemid)
     DO UPDATE SET quantity = quantity + 1`,
    [req.user.userid, itemid],
    () => res.json({ success: true })
  );
};

exports.updateCart = (req, res) => {
  const { itemid, quantity } = req.body;
  if (quantity <= 0) {
    db.run(
      "DELETE FROM cart WHERE userid=? AND itemid=?",
      [req.user.userid, itemid],
      () => res.json({ success: true })
    );
  } else {
    db.run(
      "UPDATE cart SET quantity=? WHERE userid=? AND itemid=?",
      [quantity, req.user.userid, itemid],
      () => res.json({ success: true })
    );
  }
};
