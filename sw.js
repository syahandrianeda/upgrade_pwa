const staticCacheName = "site-static-tp4";//+ new Date().getTime();
const dynamicChace = "cache_dynamic_tp2";//+ new Date().getTime();

const assets = [
    "/",
    "/img/Gambar20%Orangtua%20copy.png",
    "/img/PTK.png",
    "/img/anaksd.png",
    "/img/icons/pic144.png",
    "/statis/main.js",
    "/statis/guru.js",
    "/statis/gk.js",
    "/statis/siswa.js",

    "/script/ortujs.js",
    "/script/renderpdf.js",
    "/script/siswa.js",
    "/script/materi.js",
    "/script/uploadmedia.js",


    "/kepsek/exceltabel.js",
    "/kepsek/skrip.js",
    "/kepsek/umum.js",
    "/kepsek/unfaedah.js",
    "/kepsek/videoelamaso.js",
    "/kepsek/zframe.js",
    "/user/elamaso_offline.html",

    "/staff/staff.js",
    "/staff/exceltabel.js",
    "/staff/umum.js",
    "/staff/unfaedah.js",
    "/staff/videolamaso.js"



];


const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);

        }).catch(err => console.log(err))
    );
});


self.addEventListener('activate', evt => {

    // console.log('server worker berahsil diaktivasi')
    evt.waitUntil(
        caches.keys().then(keys => {
            //         //console.log(keys);
            return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicChace)
                .map(key => caches.delete(key))
                //             .map(key => caches.delete(key))
            );
            //     })
            // );
        })
    )
})
self.addEventListener('fetch', evt => {

    // console.log(evt.request.url);
    if (evt.request.url.indexOf('https://script.google.com') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicChace).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        // check cached items size
                        limitCacheSize(dynamicChace, 5);
                        return fetchRes;
                    })
                });
            }).catch((er) => {
                console.log(er)
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('/user/elamaso_offline.html');
                }
            })
        );
    }
    // // console.log('fetch event', evt);
})