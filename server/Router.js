const express = require('express');

const router = express();

router.get('/', (req, res) => {
    res.send('The server is up and running');
});

module.exports = router;