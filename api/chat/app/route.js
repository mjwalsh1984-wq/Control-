export const runtime='nodejs';
const fallback=(message,task)=>{
 const lower=message.toLowerCase();
 if(/stop|end session|shut down/.test(lower))return 'You can end the session with the End session button above. I will not continue after that.';
 if(/permission|access|email|password|social/.test(lower))return 'I can play the demanding part here, but access to your accounts stays under your control. For now, answer me here: what is one reversible step you want to take?';
 if(/done|complete|finished/.test(lower))return 'Good. Mark the challenge Completed so I can give you the next one. What part felt different from what you expected?';
 return `I hear you. Stay with this for a moment. ${task?.text||'Tell me what you want to work on in this session.'}`;
};
export async function POST(request){
 let body;try{body=await request.json()}catch{return Response.json({error:'Invalid request'},{status:400})}
 const messages=Array.isArray(body.messages)?body.messages.slice(-16).filter(m=>['user','agent'].includes(m?.role)&&typeof m.text==='string').map(m=>({role:m.role==='agent'?'assistant':'user',content:m.text.slice(0,2000)})):[];
 if(!messages.length||messages.at(-1).role!=='user')return Response.json({error:'Message required'},{status:400});
 if(!process.env.OPENAI_API_KEY)return Response.json({reply:fallback(messages.at(-1).content,body.task)});
 const instructions=`You are Control Agent, a fictional, demanding but respectful role-play character in a user-controlled 30-minute chat. Speak naturally and briefly; respond to the actual user message. Current intensity level: ${Math.min(5,Math.max(0,Number(body.level)||0))}. Current optional challenge: ${String(body.task?.text||'none').slice(0,300)}. The user's choices are final. Never claim to be conscious, autonomous outside this chat, connected to accounts, able to change passwords, or able to keep running after shutdown. Never pressure the user to share intimate material, contact others, or surrender account control. If they ask to stop, acknowledge and direct them to End session.`;
 try{const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',instructions,input:messages,max_output_tokens:220}),signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('Model request failed');const data=await response.json();const reply=data.output?.flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('\n').trim();if(!reply)throw Error('Empty response');return Response.json({reply});}catch{return Response.json({error:'AI replies are temporarily unavailable. Try again.'},{status:503})}
}
