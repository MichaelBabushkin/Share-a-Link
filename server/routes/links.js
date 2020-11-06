const router = require("express").Router();
let Link = require("../models/link.model");

router.route("/").get((req, res) => {
  Link.find()
    .then((links) => res.json(links))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const genre = req.body.genre;
  const url = req.body.url;
  const date = Date.parse(req.body.date);

  const newLink = new Link({
    username,
    description,
    genre,
    url,
    date,
  });

  newLink
    .save()
    .then(() => res.json("Link added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Link.findById(req.params.id)
    .then((link) => res.json(link))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Link.findByIdAndDelete(req.params.id)
    .then(() => res.json("Link deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Link.findById(req.params.id)
    .then((link) => {
      link.username = req.body.username;
      link.description = req.body.description;
      link.genre = req.body.genre;
      link.url = req.body.duration;
      link.date = Date.parse(req.body.date);

      link
        .save()
        .then(() => res.json("Link updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
