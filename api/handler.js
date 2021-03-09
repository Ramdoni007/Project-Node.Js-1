const { ObjectID } = require('bson');
const {ObjectId} = require('mongodb');

exports.addNote = ((req,res) => { 
    const{notesCollection} = req.app.locals;
    // Code Untuk Mencaru Data Ke Collections

    notesCollection.insertOne(req.body).then((result) => { 
        console.log(result);
    }); 
    res.status(200).json('Data Berhasil di Simpan Ya:)');
});


exports.getAllNotes = ((req,res) => { 
    const {notesCollection} = req.app.locals;

    // kode mencari semua notes 
    notesCollection
    .find()
    .toArray()
    .then((result) => { 
        res.status(200).json(result);
    });
});


exports.getNote = ((req,res) => { 
    const {notesCollection} = req.app.locals;

    // kode Mencari Notes Seusai dengan Id : 
    notesCollection.findOne({_id:ObjectId(req.params.id)}).then((result)=> { 
        res.status(200).json(result);
    }) ; 
});

exports.updateNote = (req, res) => {
    const { notesCollection } = req.app.locals;
    // update data collection
    notesCollection
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: { title: req.body.title, note: req.body.note } })
      .then((result) => {
        console.log(result);
      });
    res.status(200).json('Data successfully updated');
  };


exports.deleteNote = ((req,res) => { 
    const {notesCollection} = req.app.locals; 

    // Kode Untuk Mendelete Data Collections 
    notesCollection.deleteOne({_id:ObjectID(req.params.id)}).then((result)=> { 
        console.log(result);
    });
    res.status(200).json(' Yeyyyy Data Berhasil di Hapus')
});
