const connectToMongo = require('./db/db');
const express = require('express');
const cors = require('cors');
const path = require('path');

connectToMongo();
const app = express()
const PORT = process.env.port || 6001;

// Middleware
app.use(cors())
app.use(express.json())

// Available Routes

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/product', require('./routes/product'));

app.listen(PORT, () => {
  console.log(`FIYWEB listening on port ${PORT}`)
})