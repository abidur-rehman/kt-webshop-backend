const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://user1:password@localhost:27017/kt-webshop';

const createProduct = async (req, res, next) => {
  console.log(`Passed in product ${req.body.name} ${req.body.price}`);
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };
  const client = new MongoClient(url);

  console.log(`client ${JSON.stringify(client)}`);
  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('products').insertOne(newProduct);
    console.log('Connected to the db');
  } catch (error) {
    return res.json({message: 'Could not store data.'});
  };
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    console.log(`Connected db name ${db.databaseName}`);
    products = await db.collection('products').find().toArray();
    console.log(`Returned products ${JSON.stringify(products)}`);
  } catch (error) {
    return res.json({message: 'Could not get data.'});
  };
  client.close();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
