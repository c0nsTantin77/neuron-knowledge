globalThis.crypto=require('node:crypto').webcrypto;
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {seal,open}=require('./docs/vault.js');
test('encrypted credentials survive serialization and require the password',async()=>{
 const config={endpoint:'https://api.example.com/chat/completions',model:'test',key:'synthetic-secret'};
 const encrypted=await seal(config,'test-password-123');
 assert.equal(JSON.stringify(encrypted).includes(config.key),false);
 assert.deepEqual(await open(JSON.parse(JSON.stringify(encrypted)),'test-password-123'),config);
 await assert.rejects(open(encrypted,'wrong-password-123'));
 const modified={...encrypted,ciphertext:encrypted.ciphertext.slice(0,-8)+'AAAAAAAA'};
 await assert.rejects(open(modified,'test-password-123'));
 const second=await seal(config,'test-password-123');assert.notEqual(second.ciphertext,encrypted.ciphertext);
});
test('reject weak passwords and unknown record formats',async()=>{
 await assert.rejects(seal({key:'test'},'short'));
 await assert.rejects(open({version:2},'test-password-123'));
});
test('UI restores encrypted configuration after reload and uses the restored key',async()=>{
 const vm=require('node:vm'),fs=require('node:fs'),storage=new Map();let sent;
 function page(){const elements=new Map();const q=id=>{if(!elements.has(id))elements.set(id,{value:'',textContent:'',addEventListener(){},showModal(){},close(){}});return elements.get(id)};
 const context={URL,AbortController,setTimeout,clearTimeout,window:{NeuronVault:require('./docs/vault.js')},document:{querySelector:q},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},toast(){},fetch:async(url,options)=>{sent=options;return {ok:true,json:async()=>({choices:[{message:{content:'OK'}}]})}}};
 vm.runInNewContext(fs.readFileSync(require.resolve('./docs/ai.js'),'utf8'),context);return q;}
 let q=page();q('#apiEndpoint').value='https://api.example.com/chat/completions';q('#apiModel').value='test';q('#apiKey').value='synthetic-test-key';q('#vaultPassword').value='synthetic-password-123';await q('#saveVault').onclick();
 assert.equal(q('#vaultPassword').value,'');assert.ok(![...storage.values()].join('').includes('synthetic-test-key'));
 q=page();assert.equal(q('#apiKey').value,'');q('#vaultPassword').value='synthetic-password-123';await q('#unlockVault').onclick();assert.equal(q('#apiKey').value,'synthetic-test-key');await q('#testApi').onclick();assert.equal(sent.headers.Authorization,'Bearer synthetic-test-key');
 await q('#deleteVault').onclick();assert.equal(storage.size,0);assert.equal(q('#apiKey').value,'');
});
