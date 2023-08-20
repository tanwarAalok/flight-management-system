const express = require('express');

const { ServerConfig, Queue } = require('./config');
const apiRoutes = require('./routes');
const CRONS = require('./utils/common/cron-jobs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    CRONS();
    await Queue.connectQueue();
});
