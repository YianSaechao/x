const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db.js');
const { userRouter } = require('./routes/users.js'); 
const { recipesRouter } = require('./routes/recipes.js');
const morgan = require('morgan');
const helmet = require('helmet');



const PORT = 3000;

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use(morgan('dev'));
app.use(helmet());

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});
