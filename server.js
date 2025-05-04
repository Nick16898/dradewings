const express = require('express');
const bodyParser = require('body-parser');
const connectToMongo = require('./app/connection/db');
const cors = require('cors');
const app = express();
const port = 8080;


// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
connectToMongo();
app.use(cors());

// tradewings routes
app.use('/tradewings/admin', require('./app/controller/admin/admin.routes'));
app.use('/tradewings/admin/product', require('./app/controller/product/product.routes'));
app.use('/tradewings/admin/enquiry', require('./app/controller/enquiry/enquiry.routes'));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Admin API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});