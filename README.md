# MIJ@ Alert Backend

Backend base en Node.js + Express para recibir alertas desde Flutter y desplegarse en Railway.

## Estructura

- `package.json`
- `.gitignore`
- `.env.example`
- `src/server.js`
- `src/routes/alerts.js`
- `src/middleware/auth.js`

## Uso local

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo `.env` a partir de `.env.example`.
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Prueba en navegador:
   `http://localhost:3000/health`

## Endpoints incluidos

- `GET /health`
- `POST /api/alerts/send`

## Despliegue en Railway

1. Sube esta carpeta a GitHub.
2. En Railway usa **Deploy from GitHub repo**.
3. En Variables agrega:
   - `NODE_ENV=production`
   - `API_KEY=MIJA_BACKEND_KEY_123`
4. Genera dominio público.
5. Prueba:
   - `https://TU_DOMINIO.up.railway.app/health`

## Ejemplo de prueba

```bash
curl -X POST http://localhost:3000/api/alerts/send \
  -H "Content-Type: application/json" \
  -H "x-api-key: MIJA_BACKEND_KEY_123" \
  -d '{
    "patientName": "Sra. Marta",
    "patientId": "marta",
    "deviceId": "H1-8799",
    "hrBpm": 122,
    "thresholdBpm": 110,
    "secondsAbove": 15,
    "phone": "+573001112233"
  }'
```
