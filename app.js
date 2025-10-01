const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});
