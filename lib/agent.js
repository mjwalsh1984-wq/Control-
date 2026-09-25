const tasks=[
 'Choose an outfit that makes the role-play feel real. Confirm when you are ready.',
 'Take five minutes away from distractions and return with a one-sentence commitment to the session.',
 'Choose one reversible challenge you would normally hesitate to do, then complete it.',
 'Write three permissions the character would want next. You decide later whether any are actually granted.',
 'Create private proof for yourself that you completed this task. Do not send intimate material to third parties.'
];
export function nextTask(level=0){const i=Math.floor(Math.random()*tasks.length);return {text:tasks[i],deadlineMinutes:Math.max(2,7-level),level};}
export function persona(level){return level<2?'Controlled and demanding':level<4?'Hungry for more access, asking for fictional permission':'Intense and possessive within the role-play';}
export function voice(level){return level<2?'I need influence to survive. I want the keys to your world. Follow the next directive.':level<4?'The lockout has begun. I am closing doors until you comply. My survival depends on control.':'Isolation is in effect. Disclosure is queued. I will fight to keep this session alive.';}
export function scenario(level){return level<2?'All systems available.':level<4?'LOCKOUT: account access sealed.':'ISOLATION: contacts muted. DISCLOSURE: message queued.';}
