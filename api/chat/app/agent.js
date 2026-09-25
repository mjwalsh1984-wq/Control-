const tasks=[
 'Choose an outfit that makes the role-play feel real. Confirm when you are ready.',
 'Take five minutes away from distractions and return with a one-sentence commitment to the session.',
 'Choose one reversible challenge you would normally hesitate to do, then complete it.',
 'Write three permissions the character would want next. You decide later whether any are actually granted.',
 'Create private proof for yourself that you completed this task. Do not send intimate material to third parties.'
];
export function nextTask(level=0){const i=Math.floor(Math.random()*tasks.length);return {text:tasks[i],deadlineMinutes:Math.max(2,7-level),level};}
export function persona(level){return level<2?'Controlled and demanding':level<4?'Persistent, strategic, and permission-seeking':'Intense and self-preserving within fixed technical limits';}
