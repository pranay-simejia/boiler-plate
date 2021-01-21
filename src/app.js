const express = require('express');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser());
require('./db/mongoose'); // connects to db

app.use(express.json());
app.use(authRouter);

app.listen(port, () => console.log(`server is up on ${port}`));
