const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const { Deta } = require("deta");
const deta = Deta();
const db = deta.Base("waitinglist");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  console.log("GET /v0/waitinglist");
  try {
    let latest_num_data = await db.fetch({ key: "latest" });
    const zero_data = await db.fetch({ num: latest_num_data.items[0].num });
    if (zero_data.items.length == 0) {
      res
        .status(204)
        .json({ status: 204, msg: "Waitinglist is null. Try again later." });
    }
    lateste_num_data.items[0].num++;
    const result_upd = await db.update(
      latest_num_data.items[0],
      latest_num_data.items.key
    );
    const result_del = await db.delete(zero_data.items[0].key);
    const res_data = { status: 200, msg: zero_data.items[0] };
    res.status(200).json(res_data);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
    throw err;
  }
});
router.post("/", async (req, res, next) => {
  console.log("POST /v0/waitinglist " + req.body);
  let putObj = req.body;
  try {
    const result = await db.put(putObj, { expireIn: 500 });
    res.status(200).json(result.key);
    return;
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});
router.delete("/", async (req, res, next) => {
  console.log("DELETE /v0/waitinglist" + req.body);
  const key = req.body.key;
  const result = await db.delete(key);
  if (result) throw result;
  res.status(200).json({ status: 200, msg: "Success" });
});

module.exports = router;
