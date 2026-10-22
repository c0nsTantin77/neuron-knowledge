/* Password-encrypted storage for this browser. The password is never stored. */
(function(root){
'use strict';
const storageKey='neuron-key-vault-v1',iterations=600000;
const encode=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes)));
const decode=text=>Uint8Array.from(atob(text),c=>c.charCodeAt(0));
async function derive(password,salt){
 if(typeof password!=='string'||password.length<12||password.length>256)throw Error('解锁口令需为 12–256 个字符。');
 const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
async function seal(config,password){
 const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));
 const key=await derive(password,salt);
 const ciphertext=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:new TextEncoder().encode(storageKey)},key,new TextEncoder().encode(JSON.stringify(config)));
 return {version:1,salt:encode(salt),iv:encode(iv),ciphertext:encode(ciphertext)};
}
async function open(record,password){
 if(record?.version!==1||typeof record.ciphertext!=='string'||record.ciphertext.length>20000)throw Error('本机密钥记录损坏，请重新保存。');
 try{
 const salt=decode(record.salt),iv=decode(record.iv);if(salt.length!==16||iv.length!==12)throw Error();
 const key=await derive(password,salt);
 const clear=await crypto.subtle.decrypt({name:'AES-GCM',iv,additionalData:new TextEncoder().encode(storageKey)},key,decode(record.ciphertext));
 const config=JSON.parse(new TextDecoder().decode(clear));
 if(typeof config.key!=='string'||config.key.length>4096||typeof config.endpoint!=='string'||typeof config.model!=='string')throw Error();
 return config;
 }catch{throw Error('解锁失败。请检查口令；密钥记录也可能已损坏。')}
}
const api={seal,open,storageKey};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.NeuronVault=api;
})(typeof window!=='undefined'?window:globalThis);
