const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.post('/submit', (req, res) => {
	const submission = req.body;
	
	fs.readFile('./data/submissions.json', 'utf8', (err, data) => {
		if (err) {
			console.error('Ошибка чтения файла:', err);
			return res.status(500).send('Ошибка сервера.');
		}
		
		const submissions = data ? JSON.parse(data) : [];
		submissions.push(submission);
		
		fs.writeFile('./data/submissions.json', JSON.stringify(submissions, null, 2), (err) => {
			if (err) {
				console.error('Ошибка записи в файл:', err);
				return res.status(500).send('Ошибка сервера.');
			}
			
			res.status(200).send('Данные успешно сохранены.');
		});
	});
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});
