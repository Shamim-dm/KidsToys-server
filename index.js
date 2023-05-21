const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

// midleware
app.use(cors())
app.use(express.json())







const uri = `mongodb+srv://${process.env.TOYS_USER}:${process.env.TOYS_SECRET_KEY}@cluster0.ihm52cv.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
  //  await client.connect();

const toysCollections = client.db('toy-vehicles').collection('products')
const addProductsCollections = client.db('toy-vehicles').collection('addProducts')



// get data from mongodb
app.get('/products', async(req, res)=>{
    const cursor = toysCollections.find()
    const result = await cursor.toArray()
    // console.log(result)
    res.send(result)
})

app.get('/products/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await toysCollections.findOne(query)
  res.send(result)
})


// add data to mongodb
app.post('/addProducts', async(req, res)=>{
  const newToys = req.body;
  const result = await addProductsCollections.insertOne(newToys)
  res.send(result)
})

app.get('/addProducts', async(req, res)=>{
  const cursor = addProductsCollections.find().limit(20)
  const result = await cursor.toArray()
  // console.log(result)
  res.send(result)
})


// app.get('/addProducts/:email', async(req, res)=> {
//   console.log(req.query.email)
//   let query = {};
//   if(req.query?.email) {
//     query = {email: req.query.email}
//   }
//   const result = await addProductsCollections.find(query).toArray()
//   res.send(result)
// })



app.get('/addProducts/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await addProductsCollections.findOne(query)
  res.send(result)
})

  // delete data from mongodb
  app.delete('/addProducts/:id', async(req, res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)} 
    const result = await addProductsCollections.deleteOne(query)
    res.send(result)
  })

  app.put('/addProducts/:id', async(req, res)=>{
    const id = req.params.id;
    const updateToy = req.body
    const query = {_Id: new ObjectId(id)}
    const option = {upsert: true}
    const toys = {
      $set: {
        name: updateToy.name,
        email: updateToy.email,
        category: updateToy.category,
        price: updateToy.price,
        quantity: updateToy.quantity,
        date: updateToy.date,
        toy_name: updateToy.toy_name ,
        discription: updateToy.discription ,   
        rating: updateToy.rating ,
      }
    }
    const result = await addProductsCollections.updateOne(query, toys, option)
    console.log(result)
    res.send(result)

  })






  // app.get("/getJobsByText/:text", async (req, res) => {
  //   const text = req.params.text;
  //   const result = await addProductsCollections
  //     .find({
  //       $or: [
  //         { title: { $regex: text, $options: "i" } },
  //         { category: { $regex: text, $options: "i" } },
  //       ],
  //     })
  //     .toArray();
  //   res.send(result);
  // });












// app.get('/addProducts', async (req, res)=>{
//   const body = req.body;
//   console.log(body)
//   const result = await addProductsCollections.insertOne(body)
//   res.send(result)
 
// })

// app.patch('/addProducts/:id', async(req, res)=>{
//   const id = req.params.id;
//   const filter = {_id: new ObjectId(id)}
//   const updateBooking = req.body;
//   const updateDoc = {
//     $set: {
//       status: updateBooking.status
//     },
//   };
//  const result = await addProductsCollections.updateOne(filter, updateDoc)
//  res.send(result)
// })


// app.delete('/addProducts/:id', async(req, res)=>{
//   const id = req.params.id
//   const query = {_id: new ObjectId(id)}
//   const result = addProductsCollections.deleteOne(query)
//   res.send(result)
// })
















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res)=>{
    res.send('toys vehicles is running')
})
app.listen(port, ()=>{
    console.log(`toy vehicles is running on port ${port}`)
})