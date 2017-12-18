import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';

const server = express();

server.use('/assets', express.static('dist/assets'));

server.get('/', (req, res) => {
    const isMobile = true; // assume it's mobile
    const initialState = { isMobile };
    const appString = renderToString(<App {...initialState} />);

    res.send(template({
        body: appString,
        title: 'Hello World from the server',
        initialState: JSON.stringify(initialState)
    }));
});

const port = 8080;
server.listen(port);
console.log(`Listening on port ${port}`);