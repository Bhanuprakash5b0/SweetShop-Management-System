const db = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO people (name,role,hashedpassword) VALUES (?,?,?)",
    [name, role || "USER", hashed],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
};

exports.login = (req, res) => {
  const { name, password } = req.body;

  db.get(
    "SELECT * FROM people WHERE name=?",
    [name],
    async (err, user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      const valid = await bcrypt.compare(password, user.hashedpassword);
      if (!valid) return res.status(401).json({ message: "Wrong password" });

      const token = jwt.sign(
        { userid: user.userid, role: user.role },
        "SECRET_KEY",
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
};
