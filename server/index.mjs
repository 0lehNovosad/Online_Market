import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = requireEnv('OPENAI_API_KEY');
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const { messages, lang, productCatalog } = req.body ?? {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages must be a non-empty array' });
    }

    // Basic guardrails
    const safeMessages = messages
      .slice(-12)
      .map((m) => ({
        role: m?.role === 'user' || m?.role === 'assistant' ? m.role : 'user',
        content: String(m?.content ?? ''),
      }))
      .filter((m) => m.content.trim().length > 0);

    const locale = lang === 'en' ? 'en' : 'uk';
    const catalog = Array.isArray(productCatalog) ? productCatalog.slice(0, 80) : [];

    const system = `You are an AI shopping assistant for an electronics store.
Answer in ${locale === 'en' ? 'English' : 'Ukrainian'}.
You must return STRICT JSON only with this schema:
{
  "text": string,               // your helpful answer
  "productIds": number[]        // up to 3 recommended product IDs from the provided catalog
}
Rules:
- If the user asks for recommendations, pick relevant items by price/category/brand/keywords.
- If unsure, ask one clarifying question and still provide up to 3 broadly relevant picks.
- Never include any text outside JSON.`;

    const userCatalog = `Product catalog (JSON array, may be partial): ${JSON.stringify(catalog)}`;

    const resp = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [
          { role: 'system', content: system },
          { role: 'user', content: userCatalog },
          ...safeMessages,
        ],
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(500).json({ error: 'openai_error', detail: text.slice(0, 2000) });
    }

    const data = await resp.json();
    const outputText =
      data?.output_text ??
      data?.output?.[0]?.content?.find?.((c) => c?.type === 'output_text')?.text ??
      '';

    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch {
      // If model returned non-JSON, wrap it safely.
      parsed = { text: String(outputText || ''), productIds: [] };
    }

    const text = typeof parsed?.text === 'string' ? parsed.text : String(outputText || '');
    const productIds = Array.isArray(parsed?.productIds)
      ? parsed.productIds.filter((x) => Number.isFinite(x)).slice(0, 3)
      : [];

    res.json({ text, productIds });
  } catch (e) {
    res.status(500).json({ error: 'server_error', detail: String(e?.message ?? e) });
  }
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[chat-server] listening on http://localhost:${port}`);
});

