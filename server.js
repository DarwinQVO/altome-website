import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

// Load ENV vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize MP Client natively with the provided Access Token
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

app.post('/api/create_preference', async (req, res) => {
  console.log("[PAYMENTS] Creating MercadoPago preference...");
  try {
    const { items, shippingFee } = req.body;

    // Translate cart items into MercadoPago object format
    const mpItems = items.map(item => ({
      id: item.uniqueId || item.id || 'ITEM',
      title: item.name,
      quantity: item.quantity,
      unit_price: Number(item.price),
      currency_id: 'MXN'
    }));

    // Explicitly add shipping cost as an internal line item if applicable
    if (shippingFee > 0) {
      mpItems.push({
        id: 'SHIPPING',
        title: 'Costo de Envío',
        quantity: 1,
        unit_price: Number(shippingFee),
        currency_id: 'MXN'
      });
    }

    const preference = new Preference(client);
    
    // Create the preference with explicit localhost redirect loops handling hash-based routing
    const result = await preference.create({
      body: {
        items: mpItems,
        back_urls: {
          success: 'https://darwinqvo.github.io/altome-website',
          failure: 'https://darwinqvo.github.io/altome-website',
          pending: 'https://darwinqvo.github.io/altome-website'
        },
        auto_return: 'approved'
      }
    });

    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error('MP Preference Error Matrix:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/quote_shipping', async (req, res) => {
  console.log(`[LOGISTICS] Incoming request for zip: ${req.body?.zipcode}`);
  try {
    const { zipcode } = req.body;
    if (!zipcode) return res.status(400).json({ error: 'Zip Code required' });

    const zipStr = zipcode.trim();

    // Authenticity delay for presentation UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Zona 1: Local / Península (Empieza con 77)
    if (zipStr.startsWith('77') && zipStr.length === 5) {
      return res.json({ price: 50, provider: 'Reparto Península (Día Siguiente)' });
    }

    // Zona 2: Interior de la República Mexicana (5 dígitos exactos)
    const isMexicanZip = zipStr.length === 5 && /^\d+$/.test(zipStr);
    if (isMexicanZip) {
      return res.json({ price: 200, provider: 'FedEx Nacional Standar' });
    }

    // Zona 3: Internacional (USA, Global - Formatos alfanuméricos o distintos)
    return res.json({ price: 550, provider: 'DHL Express (Internacional Aéreo)' });

  } catch (error) {
    console.error("Internal Engine Error:", error);
    res.json({ price: 200, provider: 'Tarifa Fija Nacional', fallback: true });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Secure Payment Server running on port ${PORT}`));
