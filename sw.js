// どれトレ Service Worker
// 目的: index.html・manifest・アイコンをキャッシュし、電波が悪い/圏外でも
// 「起動して保存済み経路の最速電車をすぐ見る」というコア体験を止めない。

const CACHE_NAME = "doretore-cache-v1"; // 中身を更新したらこの番号を上げる
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png",
  "./icon-180.png"
];

// インストール時: アプリの表示に必要な最小限のファイルを一括キャッシュ
self.addEventListener("install", (event) => {
  self.skipWaiting(); // 新しいSWをすぐ有効化(更新の反映を待たせない)
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

// 有効化時: 古いバージョンのキャッシュを掃除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// fetch: stale-while-revalidate
// まずキャッシュを即返して起動を速くしつつ、裏で最新版を取りに行って
// 次回起動時に反映する(ダイヤ改正でコードを更新した時も自然に追従できる)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached); // オフライン時はキャッシュにフォールバック

      return cached || network;
    })
  );
});
