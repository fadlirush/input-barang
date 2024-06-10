const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");
const app = express();
const port = 3003;

const pool = new Pool({
  user: "postgres",
  host: "10.240.6.70",
  database: "barangdb",
  password: "dilan651104",
  port: 5432,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/add", async (req, res) => {
  const { nama, harga, stok, category } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO barang (nama, harga, stok, category) VALUES ($1, $2, $3, $4)",
      [nama, harga, stok, category]
    );
    res.redirect("/list");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get("/list", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM barang");
    res.render("list", { barangs: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM barang WHERE id = $1", [id]);
    res.render("edit", { barang: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, harga, stok, category } = req.body;
  try {
    await pool.query(
      "UPDATE barang SET nama = $1, harga = $2, stok = $3, category = $4 WHERE id = $5",
      [nama, harga, stok, category, id]
    );
    res.redirect("/list");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM barang WHERE id = $1", [id]);
    res.redirect("/list");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
