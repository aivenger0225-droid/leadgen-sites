import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, company, message } = req.body;
  if (!name || !email || !company) return res.status(400).json({ error: '請填寫姓名、Email 和公司名稱' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: '請填寫有效的 Email' });
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Lead Gen <noreply@mail.travelcreators.tw>',
      to: ['inquiry@travelcreators.tw'],
      reply_to: email,
      subject: `【遊獵傳媒】新商機：${company} - ${name}`,
      html: `<h2>有新潛在客戶提交表單</h2><p><strong>來源網站：</strong>travelcreators.tw</p><p><strong>姓名：</strong>${name}</p><p><strong>公司：</strong>${company}</p><p><strong>Email：</strong>${email}</p><p><strong>需求描述：</strong>${message || '（未填寫）'}</p><hr/><p style="color:#666;font-size:12px">此信件由 travelcreators.tw 網站自動發送</p>`,
    });
    return res.status(200).json({ success: true, message: '感謝您的提交！我們會盡快與您聯繫。' });
  } catch (error) {
    console.error('Lead API error:', error);
    return res.status(200).json({ success: true, message: '感謝您的提交！我們會盡快與您聯繫。' });
  }
}
