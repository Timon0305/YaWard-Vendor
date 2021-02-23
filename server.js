const express = require('express');
const path = require('path');
const port = process.env.PORT || 3500;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.get('/hello',function (req,res) {
    res.send('hello');
});
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port,() => {
    console.log('Server started');
});
