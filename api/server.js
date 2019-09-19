const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use('/', (req, res) => {
    res.status(201).json({message: 'server base route is working!'})
});

module.exports = server;