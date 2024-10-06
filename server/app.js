require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { body, validationResult, matchedData } = require('express-validator');
const { rateLimit } = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res) => {
		res
			.status(429)
			.json({ message: 'Too many requests, please try again later.' });
	},
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.post(
	'/',
	[
		body('name').trim().notEmpty().withMessage('Name is empty').escape(),
		body('email')
			.trim()
			.notEmpty()
			.withMessage('Email is empty')
			.escape()
			.isEmail()
			.withMessage('Not a valid email'),
		body('message').trim().notEmpty().withMessage('Message is empty').escape(),
	],
	(req, res) => {
		const result = validationResult(req);

		if (result.isEmpty()) {
			const data = matchedData(req);
			res.status(200).send(`Hello, ${data.name}.`);
		}

		res.status(400).send({ errors: result.array() });
	}
);

app.listen(PORT, () => console.log('Server running on port:', PORT));
