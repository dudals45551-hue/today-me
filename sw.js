const CACHE='harin-seoyul-v625';
const OFFLINE='/today-me/index.html';

self.addEventListener('install',event=>{
 event.waitUntil(
   caches.open(CACHE).then(async cache=>{
     const files=[
       '/today-me/',
       '/today-me/index.html',
       '/today-me/manifest.json',
       '/today-me/app-icon-192-v624.png',
       '/today-me/app-icon-512-v624.png',
       '/today-me/app-icon-maskable-512-v624.png'
     ];
     await Promise.allSettled(files.map(file=>cache.add(file)));
   })
 );
 self.skipWaiting();
});

self.addEventListener('activate',event=>{
 event.waitUntil(
   caches.keys().then(keys=>Promise.all(
     keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))
   ))
 );
 self.clients.claim();
});

self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 event.respondWith(
   fetch(event.request).then(response=>{
     if(response && response.ok){
       const copy=response.clone();
       caches.open(CACHE).then(cache=>cache.put(event.request,copy));
     }
     return response;
   }).catch(async()=>{
     const cached=await caches.match(event.request);
     return cached || caches.match(OFFLINE);
   })
 );
});
