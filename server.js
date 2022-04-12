// Require express & mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));



// Use this to log mongo queries being executed!
mongoose.set('debug', true);


app.listen(PORT, () => console.log(` 🌍 Connected on localhost:${PORT}`));


