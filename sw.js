self.addEventListener("install", (event) => {
  console.log("Service Worker installiert");
});

self.addEventListener("fetch", (event) => {
  // Für Version 2.0 noch keine Offline-Logik.
});
