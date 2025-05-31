const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./spec.yaml');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let phoneDirectory = [
    {
        id: 1,
        lastName: 'Alex',
        firstName: 'QWERTY',
        middleName: 'ZXC',
        phoneNumber: '+1 (234) 567-89-00',
        address: 'ул. Пушкина, д. Колотушкина'
    }
];

app.get('/tel', (req, res) => {
    res.status(200).json(phoneDirectory);
});

app.post('/tel', (req, res) => {
    const newEntry = {
        id: phoneDirectory.length + 1,
        ...req.body
    };
    phoneDirectory.push(newEntry);
    res.status(201).json(newEntry);
});

app.put('/tel', (req, res) => {
    const entryIndex = phoneDirectory.findIndex(entry => entry.id === req.body.id);
    if (entryIndex === -1) {
        return res.status(404).json({ message: 'Запись не найдена' });
    }
    phoneDirectory[entryIndex] = req.body;
    res.json(phoneDirectory[entryIndex]);
});

app.delete('/tel', (req, res) => {
    const entryIndex = phoneDirectory.findIndex(entry => entry.id === req.body.id);
    if (entryIndex === -1) {
        return res.status(404).json({ message: 'Запись не найдена' });
    }
    phoneDirectory = phoneDirectory.filter(entry => entry.id !== req.body.id);
    res.json({ message: 'Запись успешно удалена' });
});

app.listen(PORT, () => {
    console.log(`Swagger http://localhost:${PORT}/swagger`);
});