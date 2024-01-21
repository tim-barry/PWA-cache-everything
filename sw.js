// Runs in Service Worker Scope (no access to DOM)
// Caches are shared across the origin and accessible to both SW scope and page scope

const CACHE_NAME = "v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.add(OFFLINE_URL)));
});

function fetch_handler(event) {
	// Serve from the cache if present; add to the cache if not
	event.respondWith(caches.match(event.request).then(found => found ? found :
		caches.open(CACHE_NAME).then(cache =>
			fetch(event.request).then(
				res => cache.put(event.request, res.clone()).then(() => res),
				err => (event.request.mode === 'navigate') ? caches.match(OFFLINE_URL) : undefined)
		)
	));
}

self.addEventListener("fetch", fetch_handler);

