const express = require('express');
const {ObjectId} = require ('mongodb'); 

const router = express.Router(); 


router.post('/note',(req,res) => { 
    const { notesCollection } = req.app.locals;

    // Cara Insert Data Ke Collection 
    notesCollection.insertOne(req.body).then((result) => { 
        console.log(result);
    });  

    res.status(200).json('Data Berhasil di Simpan');
});

router.get('/notes',(req,res) => { 
    const { notesCollection} = req.app.locals; 

    // find All Notes 
    notesCollection 
    .find()
    .toArray()
    .then((result) => {
        res.status(200).json(result);
    });
});


router.get('/notes/:id',(req,res) => {
    const {notesCollection} = req.app.locals; 


    // Mencari Notes Berdasarkan Id nya 
    notesCollection.findOne({_id:ObjectId(req.params.id)}).then((result) => { 
        res.status(200).json(result);
    });
});



router.put('/note/:id',(req,res) => { 
    const {notesCollection} = req.app.locals;

    // Cara Update data Collections 
    notesCollection
    .updateOne({_id:ObjectId(req.params.id)}, {$set: {title: req.body.title, note: req.body.note }})
    .then((result) => { 
    console.log(result);
    }); 
    res.status(200).json('dDA')
    });

router.delete('/note/:id',(req,res) => { 
    const {notesCollection} = req.app.locals; 

    // Cara Deleted data Collections 
    notesCollection.deleteOne({_id:ObjectId(req.params.id)}).then((result) => { 
        console.log(result);
    })

    res.status(200).json('Yey Data Berhasil di Hapus ')
})



module.exports = router;