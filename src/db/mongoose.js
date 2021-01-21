const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://pogo:CZ6NvTxbhJhRlG3C@cluster0.x9rfr.mongodb.net/<dbname>?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on('connected', () => console.log('connected to DB'));
mongoose.connection.on('error', (e) =>
	console.log(' error connecting to DB' + e)
);
