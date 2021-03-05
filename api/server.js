const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express();
const port = 3001; 


//Database Nya Nih 

// Ini syntax connect URL nya 

const url = 'mongodb://localhost:27017';

// Ini Nama Database nya 
const dbName = 'dinotesDB'; 

app.use(bodyParser.urlencoded({extended:true}));

// Ini connect ke database 
// MongoClient.connect(url,(err,client) => { 
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   client.close();
// });



// Ini Routes nya 

app.post('/note', (req, res) => {
  // Buat koneksi ke server
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const notesCollection = db.collection('notes');
    // Simpan data ke collection notes
    notesCollection.insertOne(req.body).then((result) => {
      // tampilkan hasilnya di console
      console.log(result);
    });
    // tutup koneksi ke database
    client.close();
  });
  // kirim status dan pesan dalam format json ke client
  res.status(200).json('Data successfully saved');
}); 

app.get('/notes',(req,res) => { 
  MongoClient.connect(url,(err,client) => { 
    const db = client.db(dbName);
    const notesCollection = db.collections('notes'); 

    // Cara Insert Data to Collections 

    notesCollection 
    .find()
    .toArray()
    .then((result) => { 
      res.status(200).json(result);
    }); 
    client.close();
  });
});

app.get('/note/:id', (req,res) => { 
  MongoClient.connect(url, (err,client) => {
    const db = client.db(dbName)
    const notesCollection = db.collection('notes') 

    // Cari note sesuai idnote
    notesCollection.findOne({_id: ObjectId (req.params.id)}).then((result) => { 
      res.status(200).json(result)
    } )

    client.close()
  })
  res.status(200).json('Data Sukses Untuk Di Update')
})




app.get('/notes', (req, res) => {
    res.send('Receive GET request');
  });

  app.get('/note/:id', (req, res) => {
    res.send('Received GET request with parameter');
  });
  app.put('/note/:id', (req, res) => {
    res.send('Received PUT request');
  });
  app.delete('/note/:id', (req, res) => {
    res.send('Received DELETE request');
  });


app.listen(port,() => { 
    console.log(`REST API listening at http://localhost:${port}`);
    });


    

