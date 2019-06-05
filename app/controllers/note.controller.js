const Note = require('../models/note.model');

// Create and save a new Note
exports.create = (req, res) => {
  // Validate request
  if(!req.body.content) {
    return res.status(400).send({
      message: "Content cannot be empty."
    })
  }

  // Create a Note
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  });

  // Save Note in the database
  note.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "An error occurred while creating your Note."
    });
  });
};

// Retrieve and return all Notes from the database
exports.findAll = (req, res) => {
  Note.find()
  .then(notes => {
    res.send(notes);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "An error occurred while retrieving your Notes."
    });
  });
};

// Find a single Note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: "Cannot find Note " + req.params.noteId
      });
    }
    res.send(note);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
      message: "Cannot find Note " + req.params.notedId
    });
  }
  return res.status(500).send({
    message: "Error retrieving Note " + req.params.noteId
    });
  });
};

// Update a note identified by the noteId
exports.update = (req, res) => {
    // Validate request
    if(!req.body.content) {
      return res.status(400).send({
        message: "Content cannot be empty."
      });
    }

    // Find Note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
      title: req.body.title || "Untitled Note",
      content: req.body.content
    }, {new: true})
    .then(note => {
      if(!note) {
        return res.status(404).send({
          message: "Cannot find Note " + req.params.noteId
        });
      }
      res.send(note);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
        message: "Cannot find Note " + req.params.notedId
      });
    }
    return res.status(500).send({
      message: "Error updating Note " + req.params.noteId
      });
    });
};

// Delete a Note with the specified noteId
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: "Cannot find Note " + req.params.noteId
      });
    }
    res.send({message: "Note deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
      message: "Cannot find Note " + req.params.notedId
    });
  }
  return res.status(500).send({
    message: "Could not delete Note " + req.params.noteId
    });
  });
};