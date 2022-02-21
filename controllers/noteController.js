const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Index Route
router.get('/', (req, res) => {
  Note.find({}, (error, notes) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(200).json(notes);
  });
});

// Create/POST Route:
router.post('/', (req, res) => {
  Note.create(req.body, (error, createdNote) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(200).json(createdNote);
  });
});

// Show Route:
router.get('/:id', (req, res) => {
  Note.findById(req.params.id, (error, note) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(200).json(note);
  });
});

// Delete Route:
router.delete('/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id, (error, note) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(200).json(note);
  });
});

// Update Route:
router.put('/:id', (req, res) => {
  Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedNote) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }

      res.status(200).json(updatedNote);
    }
  );
});

// Update Route:
router.put('/edit/:id', (req, res) => {
  Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedNote) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }

      res.status(200).json(updatedNote);
    }
  );
});

// Search Route
router.get('/search=:criteria', (req, res) => {
  console.log(req.params);
  Note.find({
    $or: [
      { owner: new RegExp(req.params.criteria, 'i') },
      { post: new RegExp(req.params.criteria, 'i') },
      { comments: new RegExp(req.params.criteria, 'i') },
      { tags: new RegExp(req.params.criteria, 'i') },
    ],
  })
    .collation({ locale: 'en_US' })
    .then((notes) => {
      res.json(notes);
    });
});

module.exports = router;
