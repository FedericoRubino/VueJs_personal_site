const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();
const dbUrl =
  "mongodb+srv://abc123:suchagreatpassowrd123123@cluster0.8hrzl.mongodb.net/Vue_express_fullstack?retryWrites=true&w=majority";

// Get Post
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.db("Vue_express_fullstack").collection("posts");
}

module.exports = router;
