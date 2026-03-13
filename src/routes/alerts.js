const express = require('express');
const { requireApiKey } = require('../middleware/auth');

const router = express.Router();

router.post('/send', requireApiKey, async (req, res) => {
  try {
    const {
      patientName = 'Paciente',
      patientId = 'default',
      deviceId = 'unknown',
      hrBpm,
      thresholdBpm,
      secondsAbove,
      phone = ''
    } = req.body || {};

    if (hrBpm === undefined || thresholdBpm === undefined || secondsAbove === undefined) {
      return res.status(400).json({
        ok: false,
        error: 'missing_required_fields',
        required: ['hrBpm', 'thresholdBpm', 'secondsAbove']
      });
    }

    const alertPayload = {
      patientName,
      patientId,
      deviceId,
      hrBpm,
      thresholdBpm,
      secondsAbove,
      phone,
      receivedAt: new Date().toISOString()
    };

    console.log('Alerta recibida:', JSON.stringify(alertPayload, null, 2));

    return res.json({
      ok: true,
      message: 'alert_received',
      nextStep: 'Aquí se conectará WhatsApp Business Platform o Twilio SMS',
      data: alertPayload
    });
  } catch (error) {
    console.error('Error en /api/alerts/send:', error);
    return res.status(500).json({ ok: false, error: error.message || 'internal_error' });
  }
});

module.exports = router;
