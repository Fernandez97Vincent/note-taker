// creating paths
const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }
    // getter to get notes
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            }
            
            catch(err) {
                parsedNotes = []
            }

            return parsedNotes;
        })
    }

    createNote(note) {
        const { title, text } = note;
        if(!title || !text) {
            throw new Error("Please enter a valid note and title");
        }
        // creating notes
        const newNote = { title, text, id: uuidv1()};
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => newNote)
    }

    // creating a way to delete a note
    deleteNote(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store()
// now create a path in html routes