const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config({ path: './config/env.config' });

// Apollo server
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema/schema');
const server = new ApolloServer({
  playground: true,
  typeDefs,
  resolvers,
});

// Dev
const morgan = require('morgan');
const colors = require('colors');
const responseTime = require('response-time');

const app = express();

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(responseTime());
  app.use(morgan('dev'));
}

// Middleware
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'development' ? undefined : false,
  })
);

app.use(express.json()); // req.body

// Apollo middleware
server.applyMiddleware({ app });

// Routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/search'));

// Server
const PORT = 3001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
