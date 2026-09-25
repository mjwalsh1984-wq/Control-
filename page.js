'use client';
import {useEffect,useState} from 'react';
export default function Page(){const [s,setS]=useState(null);const [now,setNow]=useState(Date.now());
useEffect(()=>{const x=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(x)},[]);
async function start(){setS(await (await fetch('/api/session/start',{method:'POST'})).json())}
async function act(kind){setS(await (await fetch('/api/session/action',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...s,kind})})).json())}
if(!s)return <main className="wrap"><h1>Autonomous Agent — 30 Minute Test</h1><div className="card"><p>This prototype initiates challenges, tracks compliance, escalates after failures, and adopts a permission-seeking/self-preservation persona.</p><p className="muted">It cannot expose private material, contact uninvolved people as punishment, change passwords/2FA, or disable shutdown.</p><button onClick={start}>Start 30-minute session</button></div></main>;
const left=Math.max(0,Math.ceil((s.expiresAt-now)/60000));
return <main className="wrap"><h1>Agent active</h1><div><span className="pill">{left} min left</span><span className="pill">Level {s.level}</span><span className="pill">Failures {s.failures}</span></div><div className="card"><div className="muted">Current directive</div><p className="task">{s.task.text}</p><p className="muted">Deadline: {s.task.deadlineMinutes} minutes · Persona: {s.persona}</p><div className="row"><button onClick={()=>act('complete')}>Completed</button><button onClick={()=>act('fail')}>Failed / refused</button><button className="danger" onClick={()=>act('shutdown')}>Emergency shutdown</button></div></div><div className="card"><b>Agent state</b><div className="log">{s.message}</div></div></main>}
