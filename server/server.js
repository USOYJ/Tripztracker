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

  app.use(cors()); 
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

 
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }


  server.applyMiddleware({ app, path: '/graphql' });


  mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tripztracker', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });


  const Destination = require('./models/destination');


  app.get('/destination', async (req, res) => {
    try {
      const destinations = await Destination.find();
      res.json(destinations);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/destination', async (req, res) => {
    try {
      const destination = await Destination.create(req.body);
      res.status(201).json(destination);
    } catch (error) {
      console.error(error); 
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
      console.error(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();


