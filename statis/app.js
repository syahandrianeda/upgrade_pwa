const versisw = new Date().getTime();
const tesstatis = "versi222";
const tesdinamis = "versi222";
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.log('Teregistrasi', reg);


        })
        .catch((er) => console.log("Gagal Teregistrasi", er));

}