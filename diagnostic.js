import express from 'express';
const app = express();
app.get('/test', (req, res) => res.send('DIAGNOSTIC OK'));
app.listen(9999, () => console.log('Diagnostic listening on 9999'));
