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

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parseNotes = [].concat(JSON.parse(notes));
            }
            
            catch(err) {
                parsedNotes = []
            }

            return parsedNotes;
        })
    }

    createNote() {
        const { title, text } = notes;
        if(!title || !text) {
            throw new Error("Pleas enter a valid note and title");
        }

        const newNote = { title, text, id: uuidv1()};
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => newNote)
    }
}