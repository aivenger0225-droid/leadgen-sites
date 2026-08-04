import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message, source } = req.body;

  // Basic validation
  if (!name || !email || !company) {
    return res.status(400).json({ error: '請填寫姓名、Email 和公司名稱' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: '請填寫有效的 Email' });
  }

  try {
    // ── 1. 發 email 通知 ──────────────────────────────────────
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Lead Gen <noreply@mail.starmatch.tw>',
      to: ['inquiry@starmatch.tw'],
      reply_to: email,
      subject: `【星脈行銷】新商機：${company} - ${name}`,
      html: `
        <h2>有新潛在客戶提交表單</h2>
        <p><strong>來源網站：</strong>starmatch.tw</p>
        <p><strong>姓名：</strong>${name}</p>
        <p><strong>公司：</strong>${company}</p>
        <p><strong>Email：</strong>${email}</p>
        <p><strong>需求描述：</strong>${message || '（未填寫）'}</p>
        <hr/>
        <p style="color:#666;font-size:12px">此信件由 starmatch.tw 網站自動發送</p>
      `,
    });

    // ── 2. 寫入 Google Sheets ────────────────────────────────
    const { google } = await import('googleapis');
    const sheets = google.sheets('v4');
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const client = await auth.getClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (spreadsheetId) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Leads!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            new Date().toISOString(),
            name,
            company,
            email,
            message || '',
            'starmatch.tw'
          ]],
        },
      });
    }

    return res.status(200).json({ success: true, message: '已收到您的諮詢，我們會盡快與您聯繫！' });
  } catch (error: any) {
    console.error('Lead API error:', error);
    // 即使 Google Sheets 失敗，仍視為成功（email 是主要通知）
    return res.status(200).json({ success: true, message: '已收到您的諮詢，我們會盡快與您聯繫！' });
  }
}
