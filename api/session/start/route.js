import {nextTask,persona,voice,scenario} from '../../../../lib/agent';
export async function POST(){const level=0;return Response.json({startedAt:Date.now(),expiresAt:Date.now()+30*60*1000,level,failures:0,task:nextTask(level),persona:persona(level),scenario:scenario(level),message:voice(level)})}
