const app = require('./app');
const express = require('express');
const mongoose = require('mongoose');

const port = 3000;
const uri = 'mongodb+srv://kantasaimanikanta:aaykTfqERDe3mlU0@cluster0.1akrvep.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});
app.listen(3000, () => console.log('Server running......'));

