import { useState } from 'react';

const destinations = [
  { id:'japan', name:'日本', icon:'🗾', types:['賞櫻楓葉','溫泉旅遊','美食探索','城市逛街'], avgReach:'3,200+' },
  { id:'se-asia', name:'東南亞', icon:'🌴', types:['海島度假','水上活動','文化探索','奢華酒店'], avgReach:'4,800+' },
  { id:'tw', name:'台灣本地', icon:'🏝', types:['深度旅遊','特色住宿','自然景觀','在地體驗'], avgReach:'6,500+' },
  { id:'korea', name:'韓國', icon:'🎎', types:['追星旅遊','購物血拼','美食推薦','季節限定'], avgReach:'3,800+' },
  { id:'eu', name:'歐洲', icon:'🏰', types:['精品旅遊','鐵道之旅','藝術文化','米其林餐廳'], avgReach:'2,200+' },
  { id:'china', name:'中國内地', icon:'🏯', types:['文化探索','網紅景點','深度定製',' luxury體驗'], avgReach:'2,900+' },
];

const contentTypes = ['Instagram 圖文', 'TikTok 短影片', 'YouTube 深度遊記', '直播帶貨', 'LINE 官方帳號推廣', '跨平台整合'];

export default function TravelcreatorsPage({ apiEndpoint }: { apiEndpoint: string }) {
  const [step, setStep] = useState<'explore' | 'proposal'>('explore');
  const [selectedDest, setSelectedDest] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [contentType, setContentType] = useState('');
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSubmitting_success] = useState(false);

  const toggleDest = (id: string) => {
    setSelectedDest(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };
  const toggleType = (t: string) => {
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const canProceed = selectedDest.length > 0 && selectedTypes.length > 0 && contentType;

  const validateForm = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = '請輸入姓名';
    if (!form.email.trim()) e.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '格式不正確';
    if (!form.company.trim()) e.company = '請輸入公司名稱';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const destNames = selectedDest.map(id => destinations.find(d => d.id === id)?.name).join(', ');
      const res = await fetch(apiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, destinations: destNames, contentTypes: selectedTypes.join(', '), contentType, source: '遊獵傳媒-旅遊網紅' }),
      });
      if (res.ok) setIsSubmitting_success(true);
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#020b1a', minHeight:'100vh', fontFamily:"'Noto Sans TC','PingFang TC',sans-serif", color:'white', overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Noto+Sans+TC:wght@300;400;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-border { 0%,100%{box-shadow:0 0 0 0 rgba(14,90,122,0.4)} 50%{box-shadow:0 0 0 8px rgba(14,90,122,0)} }
        .fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .dest-card { border:1px solid rgba(14,90,122,0.25); background:rgba(14,90,122,0.05); transition:all 0.25s; cursor:pointer; }
        .dest-card:hover { border-color:rgba(14,90,122,0.5); background:rgba(14,90,122,0.1); }
        .dest-card.selected { border-color:#0ea5e9; background:rgba(14,90,122,0.15); box-shadow:0 0 20px rgba(14,90,122,0.3); animation:pulse-border 2s infinite; }
        .ocean-btn { background:linear-gradient(135deg,#0369a1,#0ea5e9); border:none; box-shadow:0 4px 20px rgba(14,90,122,0.4); }
        .ocean-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .type-chip { border:1px solid rgba(14,90,122,0.3); padding:8px 16px; border-radius:20px; font-size:13; cursor:pointer; transition:all 0.2s; color:rgba(255,255,255,0.5); }
        .type-chip.selected { background:rgba(14,90,122,0.3); border-color:#0ea5e9; color:#0ea5e9; }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'18px 48px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(2,11,26,0.92)', backdropFilter:'blur(15px)', borderBottom:'1px solid rgba(14,90,122,0.2)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', border:'1px solid #0ea5e9', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:18 }}>🌍</span>
          </div>
          <span style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:18, letterSpacing:2 }}>TRAVELCREATORS</span>
        </div>
        <a href="#proposal" onClick={() => setStep('proposal')} style={{ padding:'9px 26px', borderRadius:6, background:'linear-gradient(135deg,#0369a1,#0ea5e9)', color:'white', fontWeight:700, fontSize:13, textDecoration:'none', letterSpacing:1 }}>直接提案</a>
      </nav>

      {/* Explore destination flow */}
      {step === 'explore' && !isSuccess && (
        <section style={{ minHeight:'100vh', paddingTop:80 }}>
          {/* Header */}
          <div style={{ textAlign:'center', padding:'60px 48px 40px', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%, rgba(14,90,122,0.2) 0%, transparent 60%)', pointerEvents:'none' }} />
            <p style={{ fontFamily:'Oswald,sans-serif', fontSize:12, letterSpacing:5, color:'#0ea5e9', margin:'0 0 12px', opacity:0.8 }}>DESTINATION EXPLORER</p>
            <h1 style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:48, lineHeight:1.1, margin:'0 0 12px', letterSpacing:1 }}>
              選擇您的< span style={{ color:'#0ea5e9' }}>目的地</span>
            </h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15, fontWeight:300 }}>選擇感興趣的目的地，了解我們可以提供的旅遊網紅內容方案</p>
          </div>

          {/* Step 1: Destinations */}
          <div style={{ maxWidth:1000, margin:'0 auto', padding:'0 48px 48px' }}>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', margin:'0 0 16px', letterSpacing:1 }}>STEP 1 · 選擇目的地（可複選）</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:40 }}>
              {destinations.map(d => (
                <div key={d.id} onClick={() => toggleDest(d.id)}
                  className={`dest-card ${selectedDest.includes(d.id) ? 'selected' : ''}`}
                  style={{ padding:'24px 20px', borderRadius:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                    <span style={{ fontSize:28 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:16, fontFamily:'Oswald,sans-serif', letterSpacing:1 }}>{d.name}</div>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)' }}>觸及 {d.avgReach}/位網紅</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {d.types.map(t => (
                      <span key={t} style={{ fontSize:11, padding:'2px 8px', borderRadius:10, background:'rgba(14,90,122,0.15)', color:'rgba(255,255,255,0.4)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Step 2: Content types */}
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', margin:'0 0 16px', letterSpacing:1 }}>STEP 2 · 內容風格（可複選）</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:40 }}>
              {contentTypes.map(t => (
                <button type="button" key={t} onClick={() => toggleType(t)}
                  className={`type-chip ${selectedTypes.includes(t) ? 'selected' : ''}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Step 3: Primary content type */}
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', margin:'0 0 16px', letterSpacing:1 }}>STEP 3 · 主要內容形式 *</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:48 }}>
              {contentTypes.map(t => (
                <button type="button" key={t} onClick={() => setContentType(t)}
                  style={{ padding:'10px 20px', borderRadius:8, border:`1px solid ${contentType === t ? '#0ea5e9' : 'rgba(14,90,122,0.3)'}`, background: contentType === t ? 'rgba(14,90,122,0.2)' : 'transparent', color: contentType === t ? '#0ea5e9' : 'rgba(255,255,255,0.4)', fontSize:14, cursor:'pointer', fontFamily:"'Noto Sans TC',sans-serif" }}>
                  {t}
                </button>
              ))}
            </div>

            <button type="button" disabled={!canProceed} onClick={() => setStep('proposal')}
              style={{ width:'100%', padding:'16px', borderRadius:8, background: canProceed ? 'linear-gradient(135deg,#0369a1,#0ea5e9)' : 'rgba(14,90,122,0.1)', border:'none', color:'white', fontWeight:700, fontSize:15, cursor:canProceed?'pointer':'not-allowed', letterSpacing:1 }}>
              根據選擇產生內容提案 →
            </button>
          </div>
        </section>
      )}

      {/* Proposal / Contact */}
      {step === 'proposal' && !isSuccess && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80 }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, rgba(14,90,122,0.15) 0%, transparent 60%)', pointerEvents:'none' }} />
          <div style={{ maxWidth:600, margin:'0 auto', padding:'80px 48px', width:'100%', position:'relative', zIndex:10 }}>
            <button type="button" onClick={() => setStep('explore')}
              style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14, marginBottom:32, display:'flex', alignItems:'center', gap:8 }}>
              ← 重新選擇目的地
            </button>

            <div style={{ textAlign:'center', marginBottom:40 }}>
              <p style={{ fontFamily:'Oswald,sans-serif', fontSize:12, letterSpacing:4, color:'#0ea5e9', margin:'0 0 12px', opacity:0.8 }}>CONTENT PROPOSAL</p>
              <h2 style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:36, color:'white', margin:'0 0 8px', letterSpacing:1 }}>內容提案諮詢</h2>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, fontWeight:300 }}>填寫聯絡資訊，我們會根據您的選擇提供初步內容提案</p>
            </div>

            {/* Selection summary */}
            {selectedDest.length > 0 && (
              <div style={{ padding:'16px 20px', borderRadius:12, background:'rgba(14,90,122,0.1)', border:'1px solid rgba(14,90,122,0.3)', marginBottom:32, display:'flex', flexWrap:'wrap', gap:8 }}>
                {selectedDest.map(id => {
                  const d = destinations.find(x => x.id === id);
                  return <span key={id} style={{ padding:'4px 12px', borderRadius:20, background:'rgba(14,90,122,0.2)', color:'#0ea5e9', fontSize:13 }}>{d?.icon} {d?.name}</span>;
                })}
                {selectedTypes.map(t => (
                  <span key={t} style={{ padding:'4px 12px', borderRadius:20, background:'rgba(14,90,122,0.1)', color:'rgba(255,255,255,0.4)', fontSize:12 }}>{t}</span>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[{n:'name',p:'姓名 *',t:'text'},{n:'company',p:'品牌名稱 *',t:'text'},{n:'email',p:'Email *',t:'email'}].map(f => (
                <div key={f.n}>
                  <input name={f.n} type={f.t} value={(form as any)[f.n]} onChange={e => setForm(p => ({...p, [e.target.name]: e.target.value}))}
                    placeholder={f.p} style={{ width:'100%', padding:'15px 18px', borderRadius:8, background:'rgba(14,90,122,0.08)', border:'1px solid rgba(14,90,122,0.3)', color:'white', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                  {errors[f.n] && <p style={{ color:'#f87171', fontSize:12, marginTop:4 }}>{errors[f.n]}</p>}
                </div>
              ))}
              <textarea name="message" value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} rows={4}
                placeholder="想製作什麼類型的旅遊內容？預算範圍、期望時程..."
                style={{ width:'100%', padding:'15px 18px', borderRadius:8, background:'rgba(14,90,122,0.08)', border:'1px solid rgba(14,90,122,0.3)', color:'white', fontSize:15, outline:'none', resize:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
              <button type="submit" disabled={isSubmitting} className="ocean-btn"
                style={{ padding:'16px', borderRadius:8, color:'white', fontWeight:700, fontSize:14, cursor:isSubmitting?'not-allowed':'pointer', letterSpacing:1 }}>
                {isSubmitting ? '傳送中...' : '送出需求 →'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Success */}
      {isSuccess && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ textAlign:'center', maxWidth:480, padding:'48px 32px' }}>
            <div style={{ fontSize:72, marginBottom:20, filter:'drop-shadow(0 0 30px rgba(14,165,233,0.4))' }}>🌍</div>
            <h2 style={{ fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:32, color:'white', margin:'0 0 12px', letterSpacing:1 }}>提案需求已收到</h2>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:16, lineHeight:1.8 }}>
              我們的旅遊內容顧問會在24小時內與您聯繫，根據您的目的地與內容需求提供專屬提案。
            </p>
          </div>
        </section>
      )}

      <footer style={{ padding:'28px 48px', borderTop:'1px solid rgba(14,90,122,0.15)', textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.12)', fontSize:12, letterSpacing:1, margin:0 }}>© 2026 TRAVELCREATORS 遊獵傳媒 · 旅遊品牌內容供應商</p>
      </footer>
    </div>
  );
}
