// CM100 Crew Planner — Service Worker
// Caches the app shell so it loads fully offline after first visit

const CACHE = "cm100-v1";
const ASSETS = ["/cm100-crew/", "/cm100-crew/index.html"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  // Only intercept same-origin navigation and asset requests
  // Let GitHub API and Gist API calls go through normally
  const url = new URL(e.request.url);
  const isAppShell = url.hostname === self.location.hostname;
  const isGitHubAPI = url.hostname === "api.github.com";

  if(isGitHubAPI){
    // Always fetch API calls live — never cache sync data
    e.respondWith(fetch(e.request));
    return;
  }

  if(isAppShell){
    e.respondWith(
      caches.match(e.request).then(cached => {
        // Return cache immediately, then update in background
        const network = fetch(e.request).then(res => {
          if(res.ok){
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
  }
});
