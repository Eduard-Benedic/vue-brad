const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// GET POSTS
router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});
// ADD POST

router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// DELETE POST

router.delete("/:id", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostCollection() {
  const connectionStr =
    "mongodb+srv://eduard:3dLIaPIdB3n3d1c@cluster0-snmef.mongodb.net/test";
  const client = await mongodb.MongoClient.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db("vue-app").collection("posts");
}

module.exports = router;
