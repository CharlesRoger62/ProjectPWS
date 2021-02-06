const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:pwsadmin@pwsproject.9oa83.mongodb.net/PWSDB?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database connected ...!');
};

module.exports = connectDB;
