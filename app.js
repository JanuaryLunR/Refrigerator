const express = require('express');
const bodyParser = require('body-parser');
const { Dispatcher } = require('moleculer');
// const { ApolloServer } = require('apollo-server-express');
const mongoose = require("mongoose");
const userBroker = require("./services/user.service");

// Initialize the Express app and set up body-parser:
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");
        userBroker.start();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Set up the Moleculer API Gateway
const gateway = new Dispatcher(broker);
app.use('/api', gateway.middleware());


app.listen(3220, () => {
    console.log('Server started on port ${3220}');
  });