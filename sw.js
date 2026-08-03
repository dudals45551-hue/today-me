const CACHE='harin-seoyul-v621';
const CORE=['./','./index.html','./style.css','./manifest.json',
'./icons/app-photo-192-v621.png','./icons/app-photo-512-v621.png',
'./icons/app-photo-maskable-512-v621.png'];

self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
 self.skipWaiting();
});

self.addEventListener('activate',event=>{
 event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
 );
 self.clients.claim();
});

self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 event.respondWith(
  fetch(event.request).then(response=>{
   const copy=response.clone();
   caches.open(CACHE).then(cache=>cache.put(event.request,copy));
   return response;
  }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html')))
 );
});
