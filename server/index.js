import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Mercado Pago Configuration
// User should put their real Access Token in .env
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-60586940733596-031518-7ce325785f80b18f02900b9533c64c20-205167664' 
});

app.post('/api/create_preference', async (req, res) => {
  try {
    const { items, shippingFee, payer } = req.body;

    // Build items for MP
    const mpItems = items.map(item => ({
      id: item.id || item.uniqueId,
      title: item.name,
      unit_price: Number(item.price),
      quantity: Number(item.quantity),
      currency_id: 'MXN'
    }));

    // Add shipping as an item if exists
    if (shippingFee > 0) {
      mpItems.push({
        title: 'Envío ALTOMÉ',
        unit_price: Number(shippingFee),
        quantity: 1,
        currency_id: 'MXN'
      });
    }

    const preference = new Preference(client);
    
    const result = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: payer.name,
          email: payer.email,
        },
        back_urls: {
          success: 'https://darwinqvo.github.io/altome-website/#/success',
          failure: 'https://darwinqvo.github.io/altome-website/#/cart',
          pending: 'https://darwinqvo.github.io/altome-website/#/pending'
        },
        auto_return: 'approved',
      }
    });

    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error('MP Preference Error:', error);
    res.status(500).json({ error: 'Failed to create payment preference' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ALTOMÉ Payment Server running on port ${PORT}`);
});
