// create paths
const router = require("express").Router();
const store = require("../db/store");

// make a route to notes

router.get('/notes', (req, res) => {
    store.getNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
});

//posting notes
router.post('/notes', (req, res) => {
    store.createNote(req.body).then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
})

// path to delete notes
router.delete("/notes/:id", (req, res) => {
    store.deleteNote(req.params.id).then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err))
})

module.exports = router;