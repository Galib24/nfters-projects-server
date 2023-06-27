require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// mongodb part 



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z8yqdyj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// fix connect to mongodb

const dbConnect = async () => {
    try {
        client.connect();
        console.log("Database Connected Successfully✅");

    } catch (error) {
        console.log(error.name, error.message);
    }
}
dbConnect()

const dataCollection = client.db('nftersDb').collection('Collections');

    

    app.get('/collections', async (req, res)=>{
        const result = await dataCollection.find().toArray();
        res.send(result);
    })



app.get('/', (req, res)=>{
    res.send('nfts is ok')
});

app.listen(port, ()=>{
    console.log(`nft is running on port ${port}`);
})