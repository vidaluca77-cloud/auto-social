'use client'
import {useState} from 'react'
import axios from 'axios'
const api=process.env.NEXT_PUBLIC_API_BASE||'http://localhost:8000'
export default function Page(){
 const [file,setFile]=useState<File|null>(null)
 const [resp,setResp]=useState<any>(null)
 async function handle(){
  if(!file) return; const form=new FormData(); form.append('file',file);
  const r=await axios.post(api+'/transcribe',form,{headers:{'Content-Type':'multipart/form-data'}});
  setResp(r.data)
 }
 return (<main><h1>Content Repurposer IA</h1>
 <input type='file' accept='video/mp4' onChange={e=>setFile(e.target.files?.[0]||null)}/>
 <button onClick={handle}>Transcrire</button>
 {resp && <pre>{JSON.stringify(resp,null,2)}</pre>}</main>)
}