const fs = require('fs')
const chalk = require('chalk')

const addNote = function (title, body) {
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })

    if (duplicateNotes.length == 0 ) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('A New Note Added'))
    } else {
        console.log(chalk.red.inverse('Title Already Exists'))
    }
}


const removeNote = function(title) {
    const notes = loadNotes()
    notesToKeep = notes.filter(function(note){
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note Removed!'))
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

module.exports = {
    addNote:addNote,
    removeNote:removeNote
}