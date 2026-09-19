// Example backend contract. Keep your Gemini API key on the server.
// This file is intentionally not wired into GitHub Pages because Pages is static hosting.
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app=express();app.use(cors());app.use(express.json({limit:'15mb'}));
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model=genAI.getGenerativeModel({model:'gemini-3.1-flash-lite'});
const system=`You are ForgeMind, a general programming-first AI. Support Roblox Luau, web development, Python, JavaScript, TypeScript, Minecraft Bedrock, FNF engines, C/C++, Java and other common development environments. Inspect provided context carefully. Do not invent files or APIs. Prefer complete, runnable solutions. When code is requested, return concise explanations and code. Never reveal server secrets.`;
app.post('/api/chat',async(req,res)=>{try{const message=String(req.body?.message||'');if(!message)return res.status(400).json({error:'message required'});const result=await model.generateContent([{text:system},{text:message}]);res.json({reply:result.response.text()})}catch(e){res.status(500).json({error:e.message})}});
app.listen(process.env.PORT||3000,()=>console.log('ForgeMind backend running'));
