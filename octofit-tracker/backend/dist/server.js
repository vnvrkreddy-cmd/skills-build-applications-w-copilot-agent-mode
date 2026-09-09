import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
app.use('/api', apiRouter);
export const start = async () => {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit API listening at ${apiBaseUrl}`);
    });
};
start().catch((error) => {
    console.error('Unable to start OctoFit API', error);
    process.exitCode = 1;
});
