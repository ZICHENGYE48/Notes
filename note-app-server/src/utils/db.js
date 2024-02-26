const mongoose = require('mongoose');

const connectToDB = async () => {
  const connectionString = process.env.CONNECTION_STRING;
  if (!connectionString) {
    console.error('CONNECTION_STRING is not set');
    process.exit(1);
  }
  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error(error);
    process.exit(2);
  });
  db.on('connected', () => {
    console.log('Connected to database');
  });
  db.on('disconnected', () => {
    console.log('Disconnected from database');
  });

  return mongoose.connect(connectionString);
};

module.exports = connectToDB;
