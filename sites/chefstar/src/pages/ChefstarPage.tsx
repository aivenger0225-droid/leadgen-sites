import { useState } from 'react';

const cases = [
  { brand:'北部連鎖火鍋', type:'新店開幕', platform:'Instagram', result:'排隊突破 3 小時', emoji:'🍲', tag:'新店行銷' },
  { brand:'中部人氣甜點', type:'節慶限定活動', platform:'TikTok', result:'影片觀看 50 萬次', emoji:'🍰', tag:'活動行銷' },
  { brand:'南部早午餐', type:'连锁擴店代言', platform:'YouTube', result:'新店來客成長 200%', emoji:'🥗', tag:'品牌代言' },
];

const timeSlots = ['09:00', '10:30', '13:00', '14:30', '16:00'];
const calendarDays = Array.from({length: 7}, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + 1 + i);
  return { date: d, label: `${d.getMonth()+1}/${d.getDate()}`, weekday: ['日','一','二','三','四','五','六'][d.getDay()] };
});

export default function ChefstarPage({ apiEndpoint }: { apiEndpoint: string }) {
  const [view, setView] = useState<'cases' | 'booking'>('cases');
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [booking, setBooking] = useState({ name:'', email:'', company:'', note:'', date:'', time:'' });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!booking.name.trim()) e.name = '請輸入姓名';
    if (!booking.email.trim()) e.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) e.email = '格式不正確';
    if (!booking.company.trim()) e.company = '請輸入公司名稱';
    if (selectedDay === null) e.date = '請選擇預約日期';
    if (!booking.time) e.time = '請選擇時段';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const bookingDate = selectedDay !== null ? calendarDays[selectedDay].label : '';
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...booking, date: bookingDate, source: '味視創媒-餐飲網紅' }),
      });
      if (res.ok) { setIsSuccess(true); }
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#FFF8F0', minHeight:'100vh', fontFamily:"'Noto Serif TC','Noto Sans TC',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Noto+Sans+TC:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .case-card { transition: all 0.3s; cursor: pointer; }
        .case-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(232,93,4,0.15); }
        .day-btn { transition: all 0.2s; }
        .day-btn:hover { background: #fef3e2; }
        .day-btn.selected { background: #e85d04; color: white; }
        .time-btn { transition: all 0.2s; border: 1px solid #e85d0433; }
        .time-btn:hover { border-color: #e85d04; background: #fef3e2; }
        .time-btn.selected { background: #e85d04; color: white; border-color: #e85d04; }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'18px 48px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,248,240,0.96)', backdropFilter:'blur(10px)', borderBottom:'1px solid #e85d0422' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:26 }}>🍜</span>
          <span style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:20, color:'#1a0a00' }}>味視創媒</span>
        </div>
        <div style={{ display:'flex', gap:16 }}>
          <button onClick={() => setView('cases')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight: view==='cases'?700:400, color: view==='cases'?'#e85d04':'#888', fontFamily:"'Noto Sans TC',sans-serif" }}>成功案例</button>
          <button onClick={() => setView('booking')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight: view==='booking'?700:400, color: view==='booking'?'#e85d04':'#888', fontFamily:"'Noto Sans TC',sans-serif" }}>預約顧問</button>
        </div>
      </nav>

      {/* Cases view */}
      {view === 'cases' && !selectedCase && (
        <section style={{ paddingTop:90, minHeight:'100vh' }}>
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'60px 48px' }}>
            <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', color:'#e85d04', fontSize:14, margin:'0 0 8px' }}>Our Success Stories</p>
            <h1 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:40, color:'#1a0a00', margin:'0 0 8px' }}>餐飲品牌的流量引擎</h1>
            <p style={{ color:'#7a5a3a', fontSize:15, margin:'0 0 48px' }}>從新店開幕到連鎖代言，真實案例，實際成效</p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {cases.map((c, i) => (
                <div key={i} className="case-card" onClick={() => setSelectedCase(i)}
                  style={{ borderRadius:20, background:'white', border:'1px solid #e85d0422', overflow:'hidden', boxShadow:'0 4px 20px rgba(232,93,4,0.06)' }}>
                  <div style={{ height:160, background:`linear-gradient(135deg, #fef3e2, #fed7aa)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:64 }}>{c.emoji}</span>
                  </div>
                  <div style={{ padding:'24px' }}>
                    <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:20, background:'#fef3e2', color:'#e85d04', fontSize:11, fontWeight:700, marginBottom:12 }}>{c.tag}</span>
                    <h3 style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:17, color:'#1a0a00', margin:'0 0 8px' }}>{c.brand}</h3>
                    <p style={{ fontSize:13, color:'#888', margin:'0 0 12px' }}>{c.type} · {c.platform}</p>
                    <p style={{ fontSize:14, color:'#e85d04', fontWeight:700, margin:0 }}>成果：{c.result}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign:'center', marginTop:60 }}>
              <button onClick={() => setView('booking')} className="fade-up"
                style={{ padding:'16px 48px', borderRadius:30, background:'#e85d04', color:'white', fontWeight:700, fontSize:15, cursor:'pointer', border:'none', letterSpacing:1 }}>
                立即預約顧問 →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Case detail */}
      {view === 'cases' && selectedCase !== null && (
        <section style={{ paddingTop:90, minHeight:'100vh', display:'flex', alignItems:'center' }}>
          <div style={{ maxWidth:800, margin:'0 auto', padding:'60px 48px', width:'100%' }}>
            <button onClick={() => setSelectedCase(null)} style={{ background:'none', border:'none', color:'#888', cursor:'pointer', fontSize:14, marginBottom:32, display:'flex', alignItems:'center', gap:6, fontFamily:"'Noto Sans TC',sans-serif" }}>
              ← 返回案例列表
            </button>
            <div style={{ borderRadius:24, background:'white', border:'1px solid #e85d0422', overflow:'hidden', boxShadow:'0 8px 40px rgba(232,93,4,0.1)' }}>
              <div style={{ height:200, background:'linear-gradient(135deg, #fef3e2, #fed7aa)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:96 }}>{cases[selectedCase].emoji}</span>
              </div>
              <div style={{ padding:'40px' }}>
                <span style={{ display:'inline-block', padding:'4px 14px', borderRadius:20, background:'#fef3e2', color:'#e85d04', fontSize:12, fontWeight:700, marginBottom:16 }}>{cases[selectedCase].tag}</span>
                <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:28, color:'#1a0a00', margin:'0 0 8px' }}>{cases[selectedCase].brand}</h2>
                <p style={{ color:'#888', fontSize:15, margin:'0 0 24px' }}>{cases[selectedCase].type} · {cases[selectedCase].platform}</p>
                <div style={{ padding:'20px 24px', borderRadius:12, background:'#fef3e2', border:'1px solid #e85d0422', marginBottom:32 }}>
                  <p style={{ fontSize:13, color:'#e85d04', fontWeight:700, margin:'0 0 4px' }}>實際成效</p>
                  <p style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:22, color:'#1a0a00', margin:0 }}>{cases[selectedCase].result}</p>
                </div>
                <p style={{ color:'#7a5a3a', fontSize:15, lineHeight:1.9, margin:'0 0 32px' }}>
                  透過味視創媒的網紅行銷策略，從網紅選品、內容企劃到執行追蹤，三週內達成上述成效。過程中所有網紅內容版權歸品牌方所有，並提供完整曝光數據報告。
                </p>
                <button onClick={() => { setView('booking'); setSelectedCase(null); }}
                  style={{ padding:'14px 36px', borderRadius:30, background:'#e85d04', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', border:'none', letterSpacing:1 }}>
                  我也想獲得類似成效 →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking view */}
      {view === 'booking' && !isSuccess && (
        <section style={{ paddingTop:90, minHeight:'100vh' }}>
          <div style={{ maxWidth:900, margin:'0 auto', padding:'60px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
            {/* Left: info */}
            <div>
              <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', color:'#e85d04', fontSize:14, margin:'0 0 8px' }}>Book a Consultation</p>
              <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:36, color:'#1a0a00', margin:'0 0 20px' }}>預約免費顧問諮詢</h2>
              <p style={{ color:'#7a5a3a', fontSize:15, lineHeight:1.9, margin:'0 0 32px' }}>
                我們的餐飲網紅顧問會在您選擇的時段，與您深入討論品牌行銷需求，提供初步合作方案建議。整個諮詢過程完全免費。
              </p>

              {/* Calendar */}
              <div style={{ marginBottom:24 }}>
                <p style={{ fontSize:13, fontWeight:700, color:'#1a0a00', margin:'0 0 12px', letterSpacing:1 }}>選擇日期</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:8 }}>
                  {calendarDays.map((d, i) => (
                    <div key={i} style={{ textAlign:'center' }}>
                      <div style={{ fontSize:11, color:'#aaa', marginBottom:4 }}>{d.weekday}</div>
                      <button type="button" onClick={() => setSelectedDay(i)}
                        className={`day-btn ${selectedDay === i ? 'selected' : ''}`}
                        style={{ width:'100%', padding:'10px 0', borderRadius:10, border:'none', background: selectedDay === i ? '#e85d04' : 'white', color: selectedDay === i ? 'white' : '#1a0a00', fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:"'Noto Sans TC',sans-serif" }}>
                        {d.label.split('/')[1]}
                      </button>
                    </div>
                  ))}
                </div>
                {errors.date && <p style={{ color:'#dc2626', fontSize:12, marginTop:8 }}>{errors.date}</p>}
              </div>

              {/* Time slots */}
              {selectedDay !== null && (
                <div style={{ animation:'fadeUp 0.5s ease-out' }}>
                  <p style={{ fontSize:13, fontWeight:700, color:'#1a0a00', margin:'0 0 12px', letterSpacing:1 }}>選擇時段</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                    {timeSlots.map(t => (
                      <button type="button" key={t} onClick={() => setBooking(prev => ({...prev, time: t}))}
                        className={`time-btn ${booking.time === t ? 'selected' : ''}`}
                        style={{ padding:'8px 18px', borderRadius:8, background: booking.time === t ? '#e85d04' : 'white', color: booking.time === t ? 'white' : '#1a0a00', fontSize:14, cursor:'pointer', fontFamily:"'Noto Sans TC',sans-serif" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p style={{ color:'#dc2626', fontSize:12, marginTop:8 }}>{errors.time}</p>}
                </div>
              )}

              {/* What to expect */}
              <div style={{ marginTop:32, padding:'20px 24px', borderRadius:16, background:'#fef3e2', border:'1px solid #e85d0422' }}>
                <p style={{ fontWeight:700, color:'#e85d04', fontSize:13, margin:'0 0 8px' }}>諮詢會談什麼？</p>
                <ul style={{ margin:0, padding:'0 0 0 16px', color:'#7a5a3a', fontSize:14, lineHeight:2 }}>
                  <li>了解您的餐廳定位與目標客群</li>
                  <li>評估適合的網紅類型與平台</li>
                  <li>初步合作方案與費用估算</li>
                </ul>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background:'white', borderRadius:24, padding:'40px', border:'1px solid #e85d0422', boxShadow:'0 8px 40px rgba(232,93,4,0.08)' }}>
              <h3 style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:20, color:'#1a0a00', margin:'0 0 24px' }}>填寫聯絡資訊</h3>
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[{n:'name',p:'姓名 *',t:'text'},{n:'company',p:'餐廳名稱 *',t:'text'},{n:'email',p:'Email *',t:'email'}].map(f => (
                  <div key={f.n}>
                    <input name={f.n} type={f.t} value={(booking as any)[f.n]} onChange={e => setBooking(prev => ({...prev, [e.target.name]: e.target.value}))}
                      placeholder={f.p} style={{ width:'100%', padding:'13px 16px', borderRadius:10, border:'1px solid #e85d0422', background:'#fffaf5', color:'#1a0a00', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                    {errors[f.n] && <p style={{ color:'#dc2626', fontSize:12, marginTop:4 }}>{errors[f.n]}</p>}
                  </div>
                ))}
                <textarea name="note" value={booking.note} onChange={e => setBooking(prev => ({...prev, note: e.target.value}))} rows={3}
                  placeholder="想先讓顧問了解的事（餐廳類型、分店數量、想推廣的活動）"
                  style={{ width:'100%', padding:'13px 16px', borderRadius:10, border:'1px solid #e85d0422', background:'#fffaf5', color:'#1a0a00', fontSize:15, outline:'none', resize:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                <button type="submit" disabled={isSubmitting}
                  style={{ padding:'15px', borderRadius:30, background:'#e85d04', color:'white', fontWeight:700, fontSize:15, cursor:isSubmitting?'not-allowed':'pointer', border:'none', letterSpacing:1, marginTop:8 }}>
                  {isSubmitting ? '預約傳送中...' : '確認預約 →'}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Success */}
      {isSuccess && (
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ textAlign:'center', maxWidth:500, padding:'32px' }}>
            <div style={{ fontSize:72, marginBottom:20 }}>🍜</div>
            <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:28, color:'#1a0a00', margin:'0 0 12px' }}>預約成功！</h2>
            <p style={{ color:'#7a5a3a', fontSize:16, lineHeight:1.8, margin:'0 0 24px' }}>
              我們的顧問會在 {selectedDay !== null ? `${calendarDays[selectedDay].label} ${booking.time}` : ''} 與您聯繫，請保持 Email 暢通。
            </p>
            <button onClick={() => { setIsSuccess(false); setView('cases'); }}
              style={{ padding:'12px 32px', borderRadius:30, background:'#e85d04', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', border:'none' }}>
              查看更多成功案例
            </button>
          </div>
        </section>
      )}

      <footer style={{ padding:'24px 48px', background:'#0f0600', textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.2)', fontSize:12, margin:0 }}>© 2026 味視創媒 CHEFSTAR · 餐飲網紅經紀專家</p>
      </footer>
    </div>
  );
}
