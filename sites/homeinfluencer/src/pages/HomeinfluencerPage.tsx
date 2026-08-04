import { useState } from 'react';

export default function HomeinfluencerPage({ apiEndpoint }: { apiEndpoint: string }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = '請輸入姓名';
    if (!formData.email.trim()) e.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = '格式不正確';
    if (!formData.company.trim()) e.company = '請輸入公司名稱';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(apiEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source: '寓見行家' }) });
      if (res.ok) { setIsSuccess(true); setFormData({ name: '', email: '', company: '', message: '' }); }
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#0f0f0f', minHeight:'100vh', fontFamily:"'Noto Sans TC','PingFang TC',sans-serif", color:'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gold-pulse { 0%,100%{opacity:0.8} 50%{opacity:1} }
        .fade-up { animation: fadeUp 0.9s ease-out forwards; }
        .gold-line { background: linear-gradient(90deg, transparent, #c9a84c, transparent); height:1px; }
        .gold-text { color:#c9a84c; }
        .gold-border { border: 1px solid rgba(201,168,76,0.2); }
      `}</style>

      {/* Nav — minimal, luxury */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'20px 60px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(15,15,15,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:32, height:32, border:'1px solid #c9a84c', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'#c9a84c', fontSize:14, fontWeight:700, fontFamily:"'Noto Serif TC',serif" }}>寓</span>
          </div>
          <span style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:18, letterSpacing:3, color:'white' }}>寓見行家</span>
        </div>
        <div style={{ display:'flex', gap:32 }}>
          <a href="#services" style={{ color:'rgba(255,255,255,0.5)', fontSize:13, textDecoration:'none', letterSpacing:1 }}>服務項目</a>
          <a href="#contact" style={{ padding:'8px 24px', border:'1px solid #c9a84c', color:'#c9a84c', fontSize:13, textDecoration:'none', letterSpacing:1 }}>預約諮詢</a>
        </div>
      </nav>

      {/* Hero — full bleed dark, gold accents */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', paddingTop:80 }}>
        {/* Gold accent line top */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, #c9a84c55, transparent)' }} />
        {/* Subtle texture overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 60px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center', width:'100%', position:'relative', zIndex:2 }}>
          <div>
            <p style={{ fontFamily:"'Noto Serif TC'", color:'#c9a84c', fontSize:13, letterSpacing:4, margin:'0 0 20px', animation:'fadeUp 0.8s ease-out' }}>REAL ESTATE INFLUENCER</p>
            <h1 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:52, lineHeight:1.2, margin:'0 0 28px', animation:'fadeUp 0.8s ease-out 0.1s both' }}>
              房地產網紅行銷<br />
              <span className="gold-text">重新定義帶看</span>
            </h1>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.45)', lineHeight:2, margin:'0 0 40px', maxWidth:440, fontWeight:300, animation:'fadeUp 0.8s ease-out 0.2s both' }}>
              1,500+地產網紅，從預售建案到成屋代銷，用深度內容創造精準購屋流量。線上蓄客、看屋團報名、代銷培訓，一把罩。
            </p>
            <a href="#contact" style={{ display:'inline-block', padding:'14px 40px', border:'1px solid #c9a84c', color:'#c9a84c', textDecoration:'none', fontSize:13, letterSpacing:2, fontWeight:500, transition:'all 0.3s', animation:'fadeUp 0.8s ease-out 0.3s both' }}>
              取得建案方案
            </a>
          </div>

          {/* Right: elegant stat cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:20, animation:'fadeUp 0.8s ease-out 0.2s both' }}>
            {[{v:'1,500+',l:'地產網紅',d:'涵蓋六都新建案'}, {v:'200+',l:'建案合作',d:'含北中南預售與成屋'}, {v:'8,000+',l:'帶看報名',d:'精準高意向購屋族'}, {v:'36h',l:'急速回覆',d:'專案經理一對一'}].map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:24, padding:'20px 24px', borderLeft:'2px solid #c9a84c', background:'rgba(201,168,76,0.04)' }}>
                <div style={{ minWidth:80 }}>
                  <div style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:28, color:'#c9a84c' }}>{s.v}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', letterSpacing:1 }}>{s.l}</div>
                </div>
                <div style={{ width:1, height:40, background:'rgba(201,168,76,0.2)' }} />
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.35)', fontWeight:300 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div style={{ maxWidth:800, margin:'0 auto', height:1, background:'linear-gradient(90deg, transparent, #c9a84c55, transparent)' }} />

      {/* Services */}
      <section id="services" style={{ padding:'100px 60px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <p style={{ fontFamily:"'Noto Serif TC'", color:'#c9a84c', fontSize:12, letterSpacing:4, margin:'0 0 12px' }}>WHAT WE OFFER</p>
          <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:32, color:'white', margin:'0 0 60px' }}>服務項目</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, border:'1px solid rgba(201,168,76,0.15)' }}>
            {[
              {n:'01',t:'新建案網紅行銷',d:'線上蓄客、看屋團、代銷培訓，結合網紅帶看與精準廣告投放'},
              {n:'02',t:'地產網紅資料庫',d:'根據建案地點、坪數與目標客群，AI推薦最適合的在地網紅人選'},
              {n:'03',t:'購屋內容策略',d:'置產理財、在地生活、室內設計，打造高質感購屋決策內容'},
            ].map((s,i) => (
              <div key={i} style={{ padding:'48px 36px', borderRight:i<2?'1px solid rgba(201,168,76,0.15)':'none', background:'rgba(201,168,76,0.02)' }}>
                <div style={{ fontSize:11, color:'rgba(201,168,76,0.4)', letterSpacing:3, marginBottom:20 }}>{s.n}</div>
                <h3 style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:20, color:'white', margin:'0 0 16px' }}>{s.t}</h3>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.35)', lineHeight:1.9, fontWeight:300, margin:0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding:'80px 60px', background:'rgba(201,168,76,0.04)', borderTop:'1px solid rgba(201,168,76,0.1)', borderBottom:'1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontFamily:"'Noto Serif TC'", fontStyle:'italic', fontSize:22, color:'rgba(255,255,255,0.7)', lineHeight:2, margin:'0 0 24px', fontWeight:400 }}>
            「寓見行家把傳統代銷的帶看流程，變成了一個可以被放大十倍的精準內容工廠。」
          </p>
          <p style={{ color:'#c9a84c', fontSize:13, letterSpacing:2, margin:0 }}>— 北部某上市建商 行銷副總</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding:'100px 60px' }}>
        <div style={{ maxWidth:560, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:32, color:'white', margin:'0 0 12px' }}>預約建案諮詢</h2>
            <p style={{ color:'rgba(255,255,255,0.3)', fontSize:14 }}>留下聯絡方式，我們的專案經理會在36小時內與您聯繫</p>
          </div>
          {isSuccess ? (
            <div style={{ textAlign:'center', padding:'48px', border:'1px solid rgba(201,168,76,0.3)', background:'rgba(201,168,76,0.04)' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>✓</div>
              <h3 style={{ color:'#c9a84c', fontFamily:"'Noto Serif TC'", fontWeight:700, margin:'0 0 8px' }}>已收到您的需求</h3>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>36小時內會有專人與您聯繫</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[{n:'name',p:'姓名 *',t:'text'},{n:'company',p:'公司名稱 *',t:'text'},{n:'email',p:'Email *',t:'email'}].map(f => (
                <div key={f.n}>
                  <input name={f.n} type={f.t} value={(formData as any)[f.n]} onChange={handleChange} placeholder={f.p}
                    style={{ width:'100%', padding:'14px 0', border:'none', borderBottom:'1px solid rgba(201,168,76,0.3)', background:'transparent', color:'white', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                  {errors[f.n] && <p style={{ color:'#f87171', fontSize:12, margin:'4px 0 0' }}>{errors[f.n]}</p>}
                </div>
              ))}
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="建案名稱、地區、預計開案時間、網紅合作需求..."
                style={{ width:'100%', padding:'14px 0', border:'none', borderBottom:'1px solid rgba(201,168,76,0.3)', background:'transparent', color:'white', fontSize:15, outline:'none', resize:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
              <button type="submit" disabled={isSubmitting}
                style={{ marginTop:16, padding:'16px', background:'transparent', border:'1px solid #c9a84c', color:'#c9a84c', fontWeight:700, fontSize:13, letterSpacing:2, cursor:isSubmitting?'not-allowed':'pointer' }}>
                {isSubmitting ? '傳送中...' : '送出諮詢'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ padding:'32px 60px', borderTop:'1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ color:'#c9a84c', fontFamily:"'Noto Serif TC'", fontSize:14, fontWeight:700 }}>寓見行家</span>
          </div>
          <p style={{ color:'rgba(255,255,255,0.15)', fontSize:11, letterSpacing:1, margin:0 }}>© 2026 HOME INFLUENCER ADVISORS · 房地產網紅經紀</p>
        </div>
      </footer>
    </div>
  );
}
