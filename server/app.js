require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
	const { name, email, message } = req.body;

	console.log({ name, email, message });

	res.send('Success!');
});

app.listen(PORT, () => console.log('Server running on port:', PORT));
