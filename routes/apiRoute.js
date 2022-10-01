// create paths
const router = require("express").Router();
const store = require("../db/store");

// make a route to notes
router.getNotes().then((req, res) => {
    // now get the notes from the store.js
    store.getNotes().then((notes) => {
        return resizeBy.json(notes)
    }).catch((err) => res.status(500).json(err))
});