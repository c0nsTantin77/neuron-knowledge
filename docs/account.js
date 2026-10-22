/* Public Firebase Web configuration. This is not an AI provider credential. */
(function(){
'use strict';
const config={apiKey:'AIzaSyAoT0ncUPEMNT6bCP8iiNCq4m2GrZUuvas',authDomain:'i2dl-c79f8.firebaseapp.com',projectId:'i2dl-c79f8',appId:'1:556393668021:web:70ad506d30691180880dfc'};
const q=s=>document.querySelector(s);
let auth=null,initializing=null;
function load(src){return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=()=>{script.remove();reject(Error('无法加载登录组件，请检查网络后重试。'))};document.head.appendChild(script)})}
function render(user){q('#accountName').textContent=user?(user.displayName||user.email||'已登录'):'尚未登录';q('#accountBtn').textContent=user?'我的账户':'登录';q('#googleSignIn').hidden=!!user;q('#accountSignOut').hidden=!user;q('#accountStatus').textContent=user?'Google 登录状态会在刷新后保留。收藏仍保存在当前浏览器。':'使用 Google 账户登录。收藏仍保存在当前浏览器。'}
async function init(){
 if(auth)return auth;
 if(initializing)return initializing;
 initializing=(async()=>{
  if(!window.firebase)await load('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
  if(!window.firebase.auth)await load('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js');
  const app=firebase.apps.find(app=>app.name==='neuron')||firebase.initializeApp(config,'neuron');
  const next=app.auth();await next.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  auth=next;auth.onAuthStateChanged(render);return auth;
 })().catch(error=>{initializing=null;throw error});
 return initializing;
}
function errorText(error){const messages={'auth/popup-blocked':'浏览器拦截了登录窗口。请允许弹窗后重试。','auth/popup-closed-by-user':'登录窗口已关闭。','auth/cancelled-popup-request':'已有登录窗口，请在该窗口完成登录。','auth/unauthorized-domain':'当前域名未获授权。请在 Firebase Authentication 中添加此网站域名。','auth/network-request-failed':'登录网络请求失败，请检查网络。','auth/operation-not-allowed':'Firebase 尚未启用 Google 登录。'};return messages[error.code]||'登录服务暂时不可用，请稍后重试。'}
q('#accountBtn').onclick=()=>{q('#accountDialog').showModal();init().catch(()=>{q('#accountStatus').textContent='登录组件加载失败。请检查网络后重试。'})};
q('#closeAccount').onclick=()=>q('#accountDialog').close();
q('#googleSignIn').onclick=async()=>{const button=q('#googleSignIn');button.disabled=true;try{const service=await init();const provider=new firebase.auth.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});await service.signInWithPopup(provider)}catch(error){q('#accountStatus').textContent=errorText(error)}finally{button.disabled=false}};
q('#accountSignOut').onclick=async()=>{try{await auth.signOut();window.dispatchEvent(new Event('neuron-signout'))}catch{q('#accountStatus').textContent='退出失败，请重试。'}};
init().catch(()=>{q('#accountStatus').textContent='登录组件加载失败。打开账户面板可重试。'});
})();
