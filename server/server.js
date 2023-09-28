const express = require('express');
const { ApolloServer } = require('@apollo/server-express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors()); // Enable CORS for your server
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve the client build in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Define your GraphQL endpoint and apply middleware
  server.applyMiddleware({ app, path: '/graphql' });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-database', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  // Create Destination model
  const Destination = require('./models/destination');

  // Define routes for destinations
  app.get('/destination', async (req, res) => {
    try {
      const destinations = await Destination.find();
      res.json(destinations);
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/destination', async (req, res) => {
    try {
      const destination = await Destination.create(req.body);
      res.status(201).json(destination);
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/destination/:id', async (req, res) => {
    try {
      const updatedDestination = await Destination.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedDestination) {
        return res.status(404).json({ message: 'Destination not found' });
      }

      res.json(updatedDestination);
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();


