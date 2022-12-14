const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/recipes', {
mongoose.connect(process.env.DATABASE_URL, {    
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// shortcut to mongoose.connection
const db = mongoose.connection

db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})