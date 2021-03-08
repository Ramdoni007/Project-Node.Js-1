const express = require('express');


const router = express.Router(); 

const {addNote,getAllNote,getNote,updateNote,deleteNote} = require('./handler');


router.post('/note',addNote);
router.get('/notes',getAllNote);
router.get('/note/:id',getNote);
router.put('/note/:id',updateNote);
router.delete('/note/:id',deleteNote);


module.exports = router;