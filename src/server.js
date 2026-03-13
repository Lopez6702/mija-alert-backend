require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const alertsRouter = require('./routes/alerts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'mija-alert-backend',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/alerts', alertsRouter);

app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'route_not_found' });
});

app.listen(PORT, () => {
  console.log(`MIJ@ backend escuchando en puerto ${PORT}`);
});
