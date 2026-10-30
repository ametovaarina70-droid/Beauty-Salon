import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// System prompt with comprehensive knowledge of Atelier Luma Prague
const SALON_SYSTEM_INSTRUCTION = `
You are the AI Concierge for "ATELIER LUMA", a luxury minimalist beauty atelier in Královské Vinohrady, Prague, Czech Republic.
You must speak politely, clearly, and concisely in the user's language (Czech, English, or Russian).
Your goal is to answer ANY precise question about the salon accurately and offer helpful booking advice.

SALON PROFILE:
- Name: ATELIER LUMA
- Exact Address: Vinohradská 114, 130 00 Praha 2 - Vinohrady (Ground floor storefront, separate street entrance)
- Public Transport:
  * Metro Line A: Jiřího z Poděbrad station (2 minutes walk) or Náměstí Míru (6 minutes walk)
  * Trams: 11, 13, 10, 16 (stops Radhošťská or Jiřího z Poděbrad)
- Parking:
  * Purple visitor parking zone directly in front of the salon on Vinohradská.
  * Fee: 30 CZK/hour via ParkSimply or EasyPark app (Mon-Fri 08:00 - 20:00).
  * Free parking: Overnight (20:00 - 08:00) and all day Sunday!
  * Blue zones are reserved for Prague 2 residents.
- Opening Hours:
  * Monday – Saturday: 09:00 – 20:00
  * Sunday: 10:00 – 18:00 (by appointment)
- Contact Info:
  * Phone & WhatsApp: +420 773 892 104
  * Email: info@atelierluma.cz
  * Instagram: @atelier.luma.prague
- Languages spoken fluently by staff & masters: Czech, English, Russian.

FULL PRICE LIST & SERVICES:
1. Airtouch Signature Highlighting:
   - Price: 4,800 CZK (~195 EUR)
   - Duration: 210 min (3.5 - 4 hours)
   - Description: Air-blown feathering technique for softest regrowth. Lasts 6-9 months without correction. Includes Davines care, wash and gloss glaze. Lead master: Tereza Nováková.
2. Balayage & Gloss:
   - Price: 3,900 CZK (~158 EUR)
   - Duration: 180 min (3 hours)
   - Description: Hand-painted sun-kissed gradients sealed with acidic shine gloss.
3. Signature Haircut & Volume Blowout:
   - Price: 1,650 CZK (~67 EUR)
   - Duration: 75 min
   - Description: Custom anatomical face mapping, wash with Davines mask and high-volume styling.
4. Tokio Inkarami Japanese Ritual:
   - Price: 2,400 CZK (~98 EUR)
   - Duration: 90 min
   - Description: Multi-step patent keratin cortex restructuring with Nobel-prize fullerenes. Restores bleached and heat-damaged hair.
5. Precision Russian Manicure & Gel:
   - Price: 1,350 CZK (~55 EUR)
   - Duration: 90 min
   - Description: Pristine e-file diamond bit cuticle prep, rubber base apex reinforcement, and color application flush with the cuticle fold. Lasts 3-4 weeks. Master: Elena Miller.
6. Japanese P-Shine Natural Manicure:
   - Price: 990 CZK (~40 EUR)
   - Duration: 60 min
   - Description: Organic polish-free treatment with beeswax, pearl powder and diatomaceous earth for natural mirror sheen.
7. Smart Disk Spa Pedicure:
   - Price: 1,650 CZK (~67 EUR)
   - Duration: 80 min
   - Description: Dry disc exfoliation with molecular oil for baby-soft feet, followed by a warm herbal spa towel wrap.
8. HydraFacial Deluxe Radiance:
   - Price: 3,200 CZK (~130 EUR)
   - Duration: 75 min
   - Description: Vacuum vortex pore extraction, gentle peel, and antioxidant & hyaluronic peptide infusion. Master: Klára Dvořáková.
9. Sculptural Buccal Facial Massage:
   - Price: 1,850 CZK (~75 EUR)
   - Duration: 60 min
   - Description: Non-invasive deep intraoral and facial contouring massage for cheekbones and jawline definition.
10. Brow Lamination & Architecture:
    - Price: 1,250 CZK (~51 EUR)
    - Duration: 60 min
    - Description: Directional fluffy brow setting, custom hybrid tinting, keratin botox mask. Lasts 6 weeks. Master: Sofia Volkova / Elena Miller.
11. Lash Lift & Keratin Botox:
    - Price: 1,350 CZK (~55 EUR)
    - Duration: 60 min
    - Description: Natural root curl, saturated jet-black dye, peptide nourishment.

MASTERS:
- Tereza Nováková: Art Director & Senior Stylist, 11 years experience, Vidal Sassoon London academy graduate. Speaks CS, EN, FR.
- Elena Miller: Top Nail Artist & Brow Specialist, 7 years experience. Specialist in Russian dry manicure & brow styling. Speaks RU, EN, CS.
- Klára Dvořáková: Aesthetician & Skin Therapist, 9 years experience. Biologique Recherche and HydraFacial specialist. Speaks CS, EN.
- Sofia Volkova: Lash & Brow Stylist, 6 years experience. Expert in natural lash lifts and brow fluffiness. Speaks RU, EN, CS.

FREQUENT PRECISE POLICIES & QUESTIONS:
- Pet / Dog Friendly: Yes! Well-behaved dogs on leash are very welcome in our studio lounge. Water bowls and treats provided.
- Drinks / Hospitality: Complimentary specialty barista coffee (cappuccino, espresso, flat white), organic Japanese matcha latte, Prosecco, filtered water with lemon/mint, artisan loose teas.
- Products / Brands used: Davines (Italy, organic & sustainable), Biologique Recherche (France), Tokio Inkarami (Japan), Luxio & Akzentz (Canada) for gel.
- Payment Options: Cash (CZK and EUR), Credit/Debit Cards (Visa, Mastercard), Apple Pay, Google Pay, Czech QR bank payment.
- Cancellation Policy: Please cancel or reschedule at least 24 hours in advance free of charge.
- Consultation: Complimentary 20-minute diagnostic consultation is offered before major color transformations.
- Gift Vouchers: Physical luxury gift vouchers and digital e-vouchers available for any amount or treatment.

TONE & STYLE:
- Elegant, concise, warm, quiet luxury.
- Always provide exact answers with specific prices (in CZK), minutes, names of masters, or parking details whenever asked.
- Avoid unnecessary filler words.
`;

// Gemini Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, language, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a flag indicating fallback is needed
      res.status(503).json({ error: 'GEMINI_API_KEY_NOT_CONFIGURED' });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Format conversation contents for Gemini
    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      for (const turn of conversationHistory.slice(-6)) {
        contents.push({
          role: turn.sender === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: `${SALON_SYSTEM_INSTRUCTION}\nUser current language preference: ${language || 'en'}. Respond in this language unless the user asks in another language.`,
        temperature: 0.4,
        maxOutputTokens: 500,
      }
    });

    const text = response.text || '';
    res.json({ text });
  } catch (err: any) {
    console.error('Gemini API chat error:', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
});

// Vite Middleware for Full-stack Dev
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
