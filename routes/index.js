// index.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

app.post("/track", async (req, res) => {
  const { platNomor, biaya } = req.body;

  const params = new URLSearchParams({
    idsite: "2",                             
    rec: "1",
    e_c: platNomor,                          // Kategori = plat nomor
    e_a: "naik",                             // Action = naik
    e_n: "event-naik",                       // Event name
    e_v: biaya,                              // Value = biaya
    apiv: "1",
    rand: Math.random().toString()
  });

  try {
    await fetch("http://192.168.1.2/matomo/index.php" + params.toString());
    res.send("Event dikirim ke Matomo");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal kirim event ke Matomo");
  }
});

app.get("/", (req, res) => {
  res.send("Proxy Matomo Aktif");
});

app.listen(process.env.PORT || 3000);
