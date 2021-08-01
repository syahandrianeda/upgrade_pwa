
let msb_obje = {};
let valueeditormateri = {};
let jsonmateridihapus = "";
let jsonmaterisekolahlain = "";
let btnfn7cekpreview = document.querySelector(".fn7cekpreview");
let eidmateri = document.querySelector("#idmateri");
let hteks = {}; //{} id: 0, data: eidmateri.value };
let flag = 0;
let ahteks = "";
let urlmaterisekolahlain = [];
////////////////// dari VARIABEL.JS
let jsonguru = [],
    jsondatamurid = [],
    jsonabsen = [],
    jsondatapendaftar = [],
    arraysiswatidakaktif = [];
let jumlahseluruhsiswadisekolah = "",
    tekstapel = "",
    awalmasuksekolah = "",
    angkasemester = "";


let url_login_guru; // pengganti script_url untuk memanggil data_user!
let url_login_siswa;
let url_absenkaldik;
let url_data_siswa; //pengganti script_url untuk memanggil tab "datasiswa"!
let url_data_absen; // pengganti data absen, include kelas. Kriteria bulan, perhari ada di aksi
let url_data_pembelajaran;
let url_data_nilai;
let url_data_kurikulum;

// variabel nilai-nilai
let nilairespon = [];
let nilairesponkronologi = [];
let kronologijson = [];

const anjangsanaguru = () => {
    alert("Maaf, fitur belum tersedia")
};



///////////////// source aafnbaruv7.js//////////////////////////////////////////////
const pgeditnosoal = () => {
    let val = inputnosoalpg.value;
    let txar = document.getElementById("ketpen4");
    document.getElementById("contohsoalke-1").innerHTML = val;
    txar.textContent = `_PG_${val} #
_OPSI-PG_${val}A #
_OPSI-PG_${val}B #
_OPSI-PG_${val}C #
_OPSI-PG_${val}D #
`
};
const pgeditnosoalC = () => {
    let val = inputnosoalpgC.value;
    let txar = document.getElementById("ketpen27");
    document.getElementById("contohsoalke-1C").innerHTML = val;
    txar.textContent = `_PG_${val} # ....
_OPSI-PG-C_${val}A #
_OPSI-PG-C_${val}B #
_OPSI-PG-C_${val}C #

`
};
const pgeditnosoaltabel = () => {
    let val = inputnosoalpgtabel.value;
    let txar = document.getElementById("ketpen5");
    document.getElementById("contohsoaltabelke1").innerHTML = val;
    txar.textContent = `
_PG_${val} #
_START-TABEL-OPSI_
Opsi <|HEADER|>	Header	<|HEADER|>	Contoh
_OPSI-SEL_${val}A	<|>	#	<|>	#
_OPSI-SEL_${val}B 	<|>	#	<|>	#
_OPSI-SEL_${val}C 	<|>	#	<|>	#
_OPSI-SEL_${val}D 	<|>	#	<|>	#`
};
const editnosoalessay = () => {
    let val = inputnosoalessay.value;
    let txar = document.getElementById("ketpen6");
    document.getElementById("contohsoalessay").innerHTML = val;
    txar.textContent = `_ESSAY-NO_${val} #`
};
const tombolketikjawaban = (id) => {
    alert("Siswa mengetik jawaban essay nomor " + id)
};
const tomboluploadjawaban = (id) => {
    alert("Siswa mengupload jawaban essay nomor " + id)
};
const klikpotosiswa = (el) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";

};
const fnv7hapusmateri = (ids) => {
    let konfirmasihapus = confirm("Anda yakin ingin menghapus konten materi ini? \n \n Jika Anda menghapusnya, maka seluruh jenjang kelas Anda tidak bisa mengakses konten materi ini lagi. Baik oleh guru sejawat Anda maupun siswa. Pastikan Anda yakin dan telah mengkonfirmasi bersama guru sejawat Anda di sekolah untuk tidak menggunakan konten materi ini. \n \n Jika tetap ingin menghapus, klik OK. / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return
    }
    let brs = kronologijson[ids].idbaris;
    let data = new FormData();
    data.append("idbaris", brs);

    fetch(linkmateri + "&action=hapusmateridaridaftar", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
};
const fnv7perbaikikonten = (ids) => {
    let id = kronologijson[ids].idtgl;
    let brs = kronologijson[ids].idbaris;
    let teksidok = addZero(new Date(id).getDate()) + "" + addZero(new Date(id).getMonth() + 1) + "" + new Date(id).getFullYear();
    let data = new FormData();
    data.append("dibuatoleh", namauser);
    data.append("crtToken", teksidok);
    data.append("idbaris", brs);
    fetch(linkmateri + "&action=aktifkancrtToken", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
};
const fnv7kotenmateridihapus = (ids) => {
    //alert('ids = ' + ids);
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    fetch(linkmateri + "&action=kronologhapus&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            jsonmateridihapus = k.result;
            let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
                <th> Baris Database</th>
                <th> Judul Materi</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
            let kk = k.result;

            if (kk.length > 0) {
                for (a = 0; a < kk.length; a++) {
                    temp += `
            <tr><td>${kk[a].idbaris}</td>
                <td> ${kk[a].idmapel.toUpperCase()}</td>
                <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                <td><button onclick="fn7preview('${a}')" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                <td class='fn7tombolaksi${a}'> <button onclick="fn7kembalikankonten('${a}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
                <button onclick="fn7jadikankontenbaru('${a}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>
                </td>
            </tr>
            `
                }
            } else {
                temp += `
            <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
            }
            temp += `</tbody></table></div>`;
            timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="pembelajaran()"> Kembali ke Kronologi</button><hr><h4>Materi di Jenjang Kelas Anda yang telah dihapus:</h4>` + temp;

        })
        .catch(er => console.log(er));
};
const fn7preview = (par) => {
    pranalamateri.style.display = 'block';

    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    let datamateri = jsonmateridihapus;


    //bikin judul h4
    var judul = document.createElement("h4");
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = "";
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Dibuat/Diedit Oleh";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].dibuatoleh;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas";
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Identitas Pembelajaran";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses";
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>(Menerima Jawaban/Tugas Siswa)";
    } else {
        keteranganakses = "LATIHAN <br>(Tidak menerima jawaban/tugas)";
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi";
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban");
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Baris Database Materi";
    var td = tr.insertCell(-1);
    td.innerHTML = `${datamateri[par].idbaris}`;



    tes.appendChild(tabelidentitas);
    var brek = document.createElement("div");

    brek.setAttribute("style", "break-after:page");
    brek.innerHTML = "<h4 class='w3-center'>PREVIEW MATERI DI ELAMASO SISWA</h4>"
    tes.appendChild(brek);

    //var idm = encodeURIComponent(datamateri[par].idmateri);
    var idm = datamateri[par].idmateri;
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {

        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;


        let tekskunci = brkline(json).kunci;

        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG";
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> ";
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>";

            }
        }

    })
    // ;
};
const fn7kembalikankonten = (id) => {
    let konfirmasihapus = confirm("Anda yakin ingin mengembalikan materi ini di Time Line Anda? \n \n Jika tetap ingin mengembalikan, klik OK. / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let brs = jsonmateridihapus[id].idbaris;
    let data = new FormData();
    data.append("idbaris", brs);
    data.append("idtoken", idJenjang);

    fetch(linkmateri + "&action=kembalikanmateridaridaftar", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {

            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
};
const fn7jadikankontenbaru = (id) => {
    let konfirmasihapus = confirm("Anda yakin ingin menyimpan Konten Materi ini menjadi draft Anda? \n \n Simpanan Draft sebelumnya akan hilang dan digantikan dengan draft ini. \n\n Jika tetap ingin menyimpan draf, klik OK.  / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let ids = id;
    let tdtombol = document.querySelector(".fn7tombolaksi" + ids);
    tdtombol.innerHTML = `<button onclick="fn7kembalikankonten('${ids}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
    <i class='fa fa-refresh fa-spin w3-xxlarge'></i>`
    let idmapel = jsonmateridihapus[id].idmapel;
    let iddurasi = jsonmateridihapus[id].iddurasi;
    let idaksessiswa = jsonmateridihapus[id].idaksessiswa;
    let jenistagihan = jsonmateridihapus[id].jenistagihan;
    let idtgl = new Date()
    let idtglend = new Date();
    $.getJSON(linkmateri + "&idmateri=" + jsonmateridihapus[id].idmateri + "&action=previewriwayat", function (json) {
        let kontenmateri = json;
        let botakin = window.btoa(unescape(encodeURIComponent(kontenmateri)));
        //let botakin = window.btoa(unescape(kontenmateri));
        let obj = {};
        obj.idmapel = idmapel;
        obj.iddurasi = iddurasi;
        obj.jenistagihan = jenistagihan;
        obj.idaksessiswa = idaksessiswa;
        obj.idtgl = idtgl;
        obj.idtglend = idtglend;
        obj.botakin = botakin;

        window.localStorage.setItem("drafmateri", JSON.stringify(obj));
        tdtombol.innerHTML = `<button onclick="fn7kembalikankonten('${ids}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
        <button onclick="fn7jadikankontenbaru('${ids}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>`;

        let ingindownload = confirm("Draft berhasil disimpan, apakah Anda ingin mendownload materi ini juga?");
        if (ingindownload) {
            downloadfiledraft(json, idmapel);
        } else {
            alert('Draft berhasil disimpan, silakan menuju menu UPLOAD MATERI lalu klik TARUH DRAFT');
        }
    })


};
const downloadfiledraft = (json, namafile) => {
    var blob = new Blob([json], {
        type: "text/plain"
    });
    window.URL = window.URL || window.webkitURL;
    link = window.URL.createObjectURL(blob);
    a = document.createElement("a");
    a.download = namafile + " id=" + new Date().getTime();
    a.href = link;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
};
const berandaguru = () => {
    tampilinsublamangurukelas("beranda")
};
const fn7selectreposistory = () => {
    let x = document.getElementById("pilihanrepositorysekolahlain").selectedIndex;
    let y = document.getElementById("pilihanrepositorysekolahlain").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);  
    let xx = y[x].value;
    if (y[x].index !== 0) {
        tempatrepositorysekolahlain.innerHTML = "<i class='fa fa-refresh fa-spin w3-xxlarge'></i>";

        fetch(urlmaterisekolahlain[xx] + "&action=kronolog&idtoken=" + idJenjang)
            .then(m => m.json())
            .then(k => {
                // console.log(k);
                jsonmaterisekolahlain = k.result; //.filter(k => k.idpendaftar !== "tolak");

                let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
            <th> Judul Materi</th>
                <th> Mapel dan KD</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Dibuat oleh</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
                let kk = k.result; //.filter(k => k.idpendaftar !== "tolak");

                let objekgagal = {
                    'MAPELTIDAKDIISI_3.1': ['1', '2']
                };
                if (kk.length > 0) {
                    for (a = 0; a < kk.length; a++) {
                        // console.log(a);
                        // console.log("________");
                        // console.log(kk[a].idbaris);
                        // console.log("________");
                        // console.log(kk[a].kuncikd);
                        let ab;
                        if (kk[a].kuncikd == "undefined") {
                            ab = objekgagal;

                        } else {
                            ab = JSON.parse(kk[a].kuncikd)
                        };

                        temp += `
                        <tr>
                        <td>${kk[a].idmapel.toUpperCase()}</td>
                        <td>`
                        let obab = Object.keys(ab);

                        let untukKD = `<table class='versi-table w3-tiny'>
                        <tr>
                            <th> Mapel</th>
                            <th> KD </th>
                            <th> No. Soal </th>
                        </tr>
                        `
                        for (b = 0; b < obab.length; b++) {
                            let key = obab[b];

                            let arrsplit = ab[key].join("<br/>");

                            untukKD += `
                                <tr>
                                    <td>${obab[b].split("_")[0]}</td>
                                    <td>${obab[b].split("_")[1]}</td>
                                    <td>${(ab[obab[b]] == "undefined") ? "Tidak terdeteksi" : arrsplit}</td>
                                </tr>
                            `
                        }
                        untukKD += `</table>`;
                        temp += untukKD;
                        temp += `
                        </td>
                        <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                        <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                        
                        <td>${kk[a].dibuatoleh}</td>
                        <td><button onclick="fn7previewsekolahlain(${a},${xx})" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                        <td class="fn7tombolaksisekolahlain${a}"><button onclick="fn7jadikankontenbarudarisekolahlain(${a},${xx})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button></td>
                        
                    </tr>
            `
                    }
                } else {
                    temp += `  <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
                }
                temp += `</tbody></table></br>`;
                tempatrepositorysekolahlain.innerHTML = "Berikut ini Konten Materi di Jenjang Kelas " + idJenjang + " yang telah dipublikasikan di " + y[x].text;
                tempatrepositorysekolahlain.innerHTML += temp;

            })

    } else {
        tempatrepositorysekolahlain.innerHTML = "Silakan pilih sekolah untuk melihat Konten Materi yang telah dipublikasikan di Sekolah yang terdaftar di Elamaso";

    }
};
const fn7previewsekolahlain = (indektabel, indeksekolah) => {
    //alert("Indek materi " + indektabel + "\n\n Indek sekolah: " + indeksekolah);
    pranalamateri.style.display = 'block';

    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    // let datamateri = jsonmateridihapus;
    let par = indektabel;
    let datamateri = jsonmaterisekolahlain;


    //bikin judul h4
    var judul = document.createElement("h4");
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = "";
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Dibuat/Diedit Oleh";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].dibuatoleh;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas";
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Identitas Pembelajaran";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses";
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>(Menerima Jawaban/Tugas Siswa)";
    } else {
        keteranganakses = "LATIHAN <br>(Tidak menerima jawaban/tugas)";
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi";
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban");
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Baris Database Materi";
    var td = tr.insertCell(-1);
    td.innerHTML = `${datamateri[par].idbaris}`;



    tes.appendChild(tabelidentitas);
    var brek = document.createElement("div");

    brek.setAttribute("style", "break-after:page");
    brek.innerHTML = "<h4 class='w3-center'>PREVIEW MATERI DI ELAMASO SISWA</h4>"
    tes.appendChild(brek);

    //var idm = encodeURIComponent(datamateri[par].idmateri);
    var idm = datamateri[par].idmateri;
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(urlmaterisekolahlain[indeksekolah] + "&idmateri=" + idm + "&action=previewriwayat", function (json) {

        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;

        let tekskunci = brkline(json).kunci;

        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG";
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> ";
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>";

            }
        }

    })
};
const fn7jadikankontenbarudarisekolahlain = (id, indeksekolah) => {
    //alert("Indek materi " + id + "\n\n Indek sekolah: " + indeksekolah);
    let konfirmasihapus = confirm("Anda yakin ingin menyimpan Konten Materi ini menjadi draft Anda? \n \n Simpanan Draft sebelumnya akan hilang dan digantikan dengan draft ini. \n\n Jika tetap ingin menyimpan draf, klik OK.  / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let ids = id;
    let tdtombol = document.querySelector(".fn7tombolaksisekolahlain" + ids);
    tdtombol.innerHTML = `<i class='fa fa-refresh fa-spin w3-xxlarge'></i>`
    let idmapel = jsonmaterisekolahlain[id].idmapel;
    let iddurasi = jsonmaterisekolahlain[id].iddurasi;
    let idaksessiswa = jsonmaterisekolahlain[id].idaksessiswa;
    let jenistagihan = jsonmaterisekolahlain[id].jenistagihan;
    let idtgl = new Date()
    let idtglend = new Date();
    $.getJSON(urlmaterisekolahlain[indeksekolah] + "&idmateri=" + jsonmaterisekolahlain[id].idmateri + "&action=previewriwayat", function (json) {
        let kontenmateri = json;
        let botakin = window.btoa(unescape(encodeURIComponent(kontenmateri)));
        //let botakin = window.btoa(unescape(kontenmateri));
        let obj = {};
        obj.idmapel = idmapel;
        obj.iddurasi = iddurasi;
        obj.jenistagihan = jenistagihan;
        obj.idaksessiswa = idaksessiswa;
        obj.idtgl = idtgl;
        obj.idtglend = idtglend;
        obj.botakin = botakin;

        window.localStorage.setItem("drafmateri", JSON.stringify(obj));
        tdtombol.innerHTML = `<button onclick="fn7jadikankontenbarudarisekolahlain(${id},${indeksekolah})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button>`;

        let ingindownload = confirm("Draft berhasil disimpan, apakah Anda ingin mendownload materi ini juga?");
        if (ingindownload) {
            downloadfiledraft(json, idmapel);
        } else {
            alert('Draft berhasil disimpan, silakan menuju menu UPLOAD MATERI lalu klik TARUH DRAFT');
        }
    })


};

btnfn7cekpreview.addEventListener("click", function () {
    //pratinjaubuatmateri();
    let div = document.getElementById("prev_dragable")
    div.style.display = "block";
    let y = div.offsetTop - 45;
    window.scrollTo({ top: y, behavior: 'smooth' });

});
dragElement(document.getElementById("prev_dragable"));
let btnfn7petunjukuploadmateri = document.querySelector(".fn7petunjukuploadmateri");
btnfn7petunjukuploadmateri.addEventListener("click", function () {
    petunjukuploadmateri();
});
let btnfn7gambar = document.querySelector(".fn7gambar");
btnfn7gambar.addEventListener("click", function () {
    daftarGambar();
});
let btnfn7simpandraft = document.querySelector(".fn7simpandraft");
btnfn7simpandraft.addEventListener("click", function () {
    simpancatatansementara();
});
let btnfn7taruhdraft = document.querySelector(".fn7taruhdraft");
btnfn7taruhdraft.addEventListener("click", function () {
    taruhcatatansementara();
});

const ubahijinpublik = (id) => {
    //alert("id = " + id);
    let data = kronologijson[id];
    let idbaris = data.idbaris;
    let kirimdata = new FormData();
    kirimdata.append("idbaris", idbaris);
    fetch(linkmateri + "&action=berbagikontenmateri", {
        method: 'post',
        body: kirimdata
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        })
        .catch(er => alert(er))
};
const fnv7kotenmateridihapusmapel = (ids) => {
    //alert('ids = ' + ids);
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    fetch(linkmateri + "&action=kronologhapus&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            jsonmateridihapus = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);
            let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
                <th> Baris Database</th>
                <th> Judul Materi</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
            let kk = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);;

            if (kk.length > 0) {
                for (a = 0; a < kk.length; a++) {
                    temp += `
            <tr><td>${kk[a].idbaris}</td>
                <td> ${kk[a].idmapel.toUpperCase()}</td>
                <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                <td><button onclick="fn7preview('${a}')" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                <td class='fn7tombolaksi${a}'> <button onclick="fn7kembalikankonten('${a}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
                <button onclick="fn7jadikankontenbaru('${a}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>
                </td>
            </tr>
            `
                }
            } else {
                temp += `
            <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
            }
            temp += `</tbody></table></div>`;
            timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="pembelajaran()"> Kembali ke Kronologi</button><hr><h4>Materi di Jenjang Kelas Anda yang telah dihapus:</h4>` + temp;

        })
        .catch(er => console.log(er));
};
const fn7selectreposistorymapel = () => {
    let x = document.getElementById("pilihanrepositorysekolahlain").selectedIndex;
    let y = document.getElementById("pilihanrepositorysekolahlain").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);  
    let xx = y[x].value;
    if (y[x].index !== 0) {
        tempatrepositorysekolahlain.innerHTML = "<i class='fa fa-refresh fa-spin w3-xxlarge'></i>";

        fetch(urlmaterisekolahlain[xx] + "&action=kronolog&idtoken=" + idJenjang)
            .then(m => m.json())
            .then(k => {
                // console.log(k);
                jsonmaterisekolahlain = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);

                let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
            <th> Judul Materi</th>
                <th> Mapel dan KD</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Dibuat oleh</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
                let kk = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);

                let objekgagal = {
                    'MAPELTIDAKDIISI_3.1': ['1', '2']
                };
                if (kk.length > 0) {
                    for (a = 0; a < kk.length; a++) {

                        let ab;
                        if (kk[a].kuncikd == "undefined") {
                            ab = objekgagal;

                        } else {
                            ab = JSON.parse(kk[a].kuncikd)
                        };

                        temp += `
                        <tr>
                        <td>${kk[a].idmapel.toUpperCase()}</td>
                        <td>`
                        let obab = Object.keys(ab);

                        let untukKD = `<table class='versi-table w3-tiny'>
                        <tr>
                            <th> Mapel</th>
                            <th> KD </th>
                            <th> No. Soal </th>
                        </tr>
                        `
                        for (b = 0; b < obab.length; b++) {
                            let key = obab[b];

                            let arrsplit = ab[key].join("<br/>");

                            untukKD += `
                                <tr>
                                    <td>${obab[b].split("_")[0]}</td>
                                    <td>${obab[b].split("_")[1]}</td>
                                    <td>${(ab[obab[b]] == "undefined") ? "Tidak terdeteksi" : arrsplit}</td>
                                </tr>
                            `
                        }
                        untukKD += `</table>`;
                        temp += untukKD;
                        temp += `
                        </td>
                        <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                        <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                        
                        <td>${kk[a].dibuatoleh}</td>
                        <td><button onclick="fn7previewsekolahlain(${a},${xx})" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                        <td class="fn7tombolaksisekolahlain${a}"><button onclick="fn7jadikankontenbarudarisekolahlain(${a},${xx})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button></td>
                        
                    </tr>
            `
                    }
                } else {
                    temp += `  <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
                }
                temp += `</tbody></table></div>`;
                tempatrepositorysekolahlain.innerHTML = "Berikut ini Konten Materi di Jenjang Kelas " + idJenjang + " yang telah dipublikasikan di " + y[x].text;
                tempatrepositorysekolahlain.innerHTML += temp;

            })

    } else {
        tempatrepositorysekolahlain.innerHTML = "Silakan pilih sekolah untuk melihat Konten Materi yang telah dipublikasikan di Sekolah yang terdaftar di Elamaso";

    }
};
eidmateri.addEventListener("blur", function (e) {


    //hteks.id = new Date().getTime();
    let teks = e.target.value;

    // ahteks.push(hteks)
    ahteks += teks + "<<|>>"
    flag++

})
let btnundo = document.querySelector(".fn7undo");
btnundo.addEventListener("click", function () {

    if (flag > 0) {
        flag--;
    }


    let ar = ahteks.split("<<|>>");

    let x = parseInt(flag);
    let textarea = document.querySelector("#idmateri");
    textarea.value = ar[x];
});
let btnredo = document.querySelector(".fn7redo");
btnredo.addEventListener("click", function () {

    let ar = ahteks.split("<<|>>");
    let mak = ar.length - 1;
    if (flag < mak) {
        flag++;
    }

    let x = parseInt(flag);
    let textarea = document.querySelector("#idmateri");
    textarea.value = ar[x];

});
let btnfn7video = document.querySelector(".fn7video");
btnfn7video.addEventListener("click", function () {
    daftarvideo();
});
function barufindkuncipgkd(teks) {
    // let findPG = teks.match(/^_PG_\d{1,2}\s|^_OPSI-PG_\d{1,2}[A-D]\s|^_OPSI-PG-C_\d+[A-D]\s|^_OPSI-SEL_\d{1,2}[A-D]\s|^_ESSAY-NO_\d{1,2}\s/gm);
    let findPG = teks.match(/^_PG_\d+\s|^_OPSI-PG_\d+[A-D]\s|^_OPSI-PG-C_\d+[A-D]\s|^_OPSI-SEL_\d+[A-D]\s|^_ESSAY-NO_\d+\s/gm);
    let textarea = document.getElementById("idmateri");
    // <div id="divbantu_kuncijawaban"></div>
    // <div id="divbantu_sebarankd"></div>
    let div = document.querySelector(".tekeditorpg");
    let divekd = document.querySelector(".tekesebarankd");
    let divradiopg = document.getElementById("divbantu_kuncijawaban");
    let seljt = document.getElementById("jenistagihan");
    let valjt = seljt.options[seljt.selectedIndex].value;
    let jtKD4 = ["kpraktik", "kproduk", "kproyek", "uspraktek"];
    divradiopg.innerHTML = "";

    if (findPG !== null) {
        let cekcariopsi = teks.match(/^_OPSI-PG_\d+[A-D]\s|^_OPSI-PG-C_\d+[A-D]\s|^_OPSI-SEL_\d+[A-D]\s/gm);


        let tanpaspasi = findPG.map(s => s.replace(/\s|\t/g, ""));
        let opsinya = (cekcariopsi == null) ? [] : cekcariopsi.map(s => s.replace(/\s|\t/g, ""));



        valueeditormateri = {};
        let cekduplikat = tanpaspasi.filter((x, i, a) => a.indexOf(x) !== i)
        valueeditormateri["elemenduplikat"] = cekduplikat;



        let koleksiEl_PG = tanpaspasi.filter(s => s.indexOf("_PG_") > -1); //.map(m=> m.replace("_PG_"));
        let koleksino_PG = tanpaspasi.filter(s => s.indexOf("_PG_") > -1).map(m => parseInt(m.replace("_PG_", "")));
        // let koleksiopsi_PG = opsinya.map(s => s.replace("_OPSI-PG_", "") || s.replace("_OPSI-PG-C_", "") || s.replace("_OPSI-SEL_", "")); //.map(m => m.match(/\d[A-D]/g)[0]);
        let koleksiopsi_PG = opsinya.map(s => s.match(/\d+[A-D]/)[0])

        valueeditormateri["koleksi_el_pg"] = koleksiEl_PG; // "_SEMUA KODE_"
        valueeditormateri["koleksi_no_pg"] = koleksino_PG; // 
        valueeditormateri["koleksi_opsi_pg"] = koleksiopsi_PG;
        let pg_duplikat = koleksiopsi_PG.filter((x, i, a) => a.indexOf(x) !== i);
        valueeditormateri["koleksi_opsi_pg_duplikat"] = pg_duplikat;
        valueeditormateri["koleksi_all_elemen"] = tanpaspasi;

        // valueeditormateri["koleksino_opsi"] = opsinya.map(m => m.replace(/_/, ""));
        let PG = [];
        for (i = 0; i < koleksino_PG.length; i++) {
            let cocokkan = koleksino_PG[i];
            let pattern = cocokkan;

            let nopg = koleksiopsi_PG.filter(s => (s == cocokkan + "A" || s == cocokkan + "B" || s == cocokkan + "C" || s == cocokkan + "D"));
            let obj = {};
            obj["nosoal"] = koleksino_PG[i];
            obj["arrayopsi"] = nopg;

            PG.push(obj);
        }
        // valueeditormateri["PG"] = PG;
        let filteressay = tanpaspasi.filter(s => s.indexOf("_ESSAY-NO_") > -1);;
        let filter_no_essay = tanpaspasi.filter(s => s.indexOf("_ESSAY-NO_") > -1).map(m => parseInt(m.replace("_ESSAY-NO_", "")));

        let koleksi_all_nosoal = koleksino_PG.concat(filter_no_essay);
        let koleksi_nosoal_duplikat = koleksi_all_nosoal.filter((x, i, a) => a.indexOf(x) !== i);



        valueeditormateri["koleksi_el_essay"] = filteressay;
        valueeditormateri["koleksi_no_essay"] = filter_no_essay;
        valueeditormateri["koleksi_all_nosoal"] = koleksi_all_nosoal;
        valueeditormateri["koleksi_nosoal_duplikat"] = koleksi_nosoal_duplikat;
        valueeditormateri["NOSOAL"] = PG;


        let html = "";
        let ketesay = "";

        let oke = "Kode Soal PG dan Opsinya yang terdeteksi:";
        let el_input = "";

        // GA BOLEH ADA DUPLIKAT, harusnol;
        let nolelemen = cekduplikat.length;
        let nolnomorsoal = koleksi_nosoal_duplikat.length;
        let nolopsipg = pg_duplikat.length;

        if (nolelemen > 0 || nolnomorsoal > 0 || nolopsipg > 0) {
            html = "Maaf, Ada kode/tag yang salah:"
            if (nolelemen > 0) {
                html += "<br/><br/>Terdapat Kode ELemen yang dupplikat yaitu ";
                for (i = 0; i < cekduplikat.length; i++) {
                    html += "<b>" + cekduplikat[i] + "</b>, ";
                }
                html += "<br/><br/>";
            }
            if (nolnomorsoal > 0) {
                html += "<br/><br/>Terdapat Kode Nomor Soal yang sama. yaitu ";
                for (i = 0; i < koleksi_nosoal_duplikat.length; i++) {
                    html += "<b>" + koleksi_nosoal_duplikat[i] + "</b>, ";
                }
                html += "<br/>";
                html += "<br/>Jika nomor soal yang sama tersebut adalah PG dan Essay, utamakan penomoran soal essay melanjutkan dari nomor soal PG sebelumnya";
            }
            if (nolopsipg > 0) {
                html += "<br/><br/>Terdapat opsi PG yang sama. yaitu ";
                for (i = 0; i < pg_duplikat.length; i++) {
                    html += "<b>" + pg_duplikat[i] + "</b>, ";
                }

            }

        } else {
            let objekdatasoal = valueeditormateri.NOSOAL;
            let soalessay = valueeditormateri["koleksi_no_essay"];
            ketesay = "<hr/>";
            // console.log(objekdatasoal)
            if (objekdatasoal.length == 0) {
                html = `TIDAK TERDETEKSI ADANYA SOAL PILIHAN GANDA`
            } else {
                html = "Silakan Pilih tiap-tiap Opsi Pilihan Ganda tiap nomor soal berikut sebagai kunci jawabannya."
                html += `<table class="w3-table-all w3-tiny garis w3-centered"><tr>
                <th>No Soal</th>
                <th colspan="4">Opsi Jawaban<br/><sub>(Klik hurufny, huruf yang menyala adalah kunci jawaban pilihan Anda</sub></th>
                </tr>`
                for (let a = 0; a < objekdatasoal.length; a++) {
                    html += `<tr><td class="warnaeka">${objekdatasoal[a].nosoal}</td>`;
                    let arrayopsi = objekdatasoal[a].arrayopsi;
                    //console.log(arrayopsi);
                    for (let b = 0; b < arrayopsi.length; b++) {
                        html += `<td class="tdpg_pgeditor_${arrayopsi[b]} tdnosoal_editor_${objekdatasoal[a].nosoal} td_ke${b}" style="cursor:pointer">
                        <label for="tomboleditor_bantuopsi${arrayopsi[b]}" class="lbl_pgeditor_${arrayopsi[b]}">${arrayopsi[b].match(/\D/)[0]}</label>
                        </td>`;
                        el_input += `<br/><input type="radio" id="tomboleditor_bantuopsi${arrayopsi[b]}" name="rdsoal_${objekdatasoal[a].nosoal}" class="pg_buatkuncikd" value="${arrayopsi[b]}" onchange="checked_buatkunci(this)"/>${arrayopsi[b]}`;

                    }

                    html += `</tr>`
                }
                html += `</table>`;


            }
            if (soalessay.length == 0) {
                ketesay += "TIDAK TERDETEKSI ADANYA SOAL ESSAY"
            } else {
                ketesay += "SOAL ESSAY TERDETEKSI:<br/>"
                ketesay += `Nomor-nomor soal Essay<br/><br/>`;
                soalessay.forEach(element => {
                    ketesay += `<span class="w3-badge warnaeka w3-border-bottom w3-border-black w3-margin w3-text-black">${element}</span>`
                });

            }


        }
        div.innerHTML = html + ketesay;
        divradiopg.innerHTML = el_input;
        //console.log(buateditorkdaktif)
        let cekkunci = teks.match(/^_KUNCI-PG_/gm);
        let cekkd = teks.match(/^_KUNCI-KD_/gm);
        let val = textarea.value;
        let n = val.length;

        if (cekkd !== null) {
            let awalkd = val.indexOf("_KUNCI-KD_");
            let batasawalkd = val.substring(awalkd, n)

            let str_kd_kunci = batasawalkd.split("\n")[0];


            if (cekkd.length > 1) {
                alert("Anda membuat kode sebaran KD lebih dari 1. Kode pada baris tersebut akan dihapus.");
                textarea.value = textarea.value.replace(str_kd_kunci, "");
            } else {
                let arr0 = str_kd_kunci.replace("_KUNCI-KD_", "");
                let arr1 = arr0.replace(/\s+/gm, "")
                let grup = arr1.split("<||>");

                let htmlsebaran = ""
                if (valjt == "") {
                    htmlsebaran = `Anda Akan membuat konten materi jenis tagihan tanpa menerima respon jawaban siswa namun sebaran KD sifatnya wajib. Untuk membantu menggenerate sebaran KD, klik tombol <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>.(Jika belum Berubah, ketikan sesuatu di teks area materi)`;
                } else {

                }

                let indekjt = jtKD4.indexOf(valjt);
                // console.log(indekjt);
                // console.log(valjt);

                let stKD3apaKD4 = ""
                if (indekjt == -1) {
                    stKD3apaKD4 = " Kompetensi Pengetahuan (KD-3) "
                } else {
                    stKD3apaKD4 = " Kompetensi Keterampilan (KD-4) "

                }

                htmlsebaran = "SEBARAN KD TERDETEKSI<br/>"
                htmlsebaran += `Anda memilih jenis Tagihan <span class="w3-card-4 w3-margin-bottom warnaeka"> ${stKD3apaKD4}</span>.<br/><br/>
                    Atau Jika Anda perlu membuat sebaran KD dari fitur elamaso, silakan klik <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>
                    <br/><br/>
                    Berikut hasil tabel Sebran KD pada konten materi Anda yang terbaca oleh sistem:
                    <table class="w3-table-all w3-bordered"><tr>
                    <th>Mata Pelajaran (Kode)</th>
                    <th>No KD</th>
                    <th>Nomor Soal</th>
                    </tr>`;
                for (let g = 0; g < grup.length; g++) {
                    let grupmapel = grup[g].split(":");
                    htmlsebaran += `<tr>
                        <td>${grupmapel[0].split("_")[0]}</td>
                        <td>${grupmapel[0].split("_")[1]}</td>
                        <td>${grupmapel[1]}</td>
                        <td></td></tr>`
                }
                htmlsebaran += `</table><hr/> Berdasarkan Urutan Soal
                   <div class="w3-card-4">
                    `;
                //mengurutkan soal;
                let mod_str = JSON.parse(objekKD(str_kd_kunci));
                let mod_obj = ubahjsonkuncikd(mod_str);

                let oo = Object.keys(mod_obj);

                for (h = 0; h < oo.length; h++) {
                    htmlsebaran += `<div class="w3-left w3-margin warnaeka w3-border-bottom w3-border-black w3-padding w3-round w3-text-black">
                        <span class="w3-badge w3-margin-right w3-white">${oo[h]}</span> ${mod_obj[oo[h]].split("_")[0]} KD ${mod_obj[oo[h]].split("_")[1]}
                        </div>`

                }


                // console.log(mod_str);
                // console.log(mod_obj);
                htmlsebaran += `</div>`



                divekd.innerHTML = htmlsebaran;
            }


        }

        if (cekkunci !== null) {
            // console.log(cekkunci);

            let awal = val.indexOf("_KUNCI-PG_");
            let batasawal = val.substring(awal, n)

            let str_pg_kunci = batasawal.split("\n")[0];
            if (cekkunci.length > 1) {
                alert("Anda membuat kode kunci jawaban PG lebih dari 1. Kode pada baris tersebut akan dihapus.");
                textarea.value = textarea.value.replace(str_pg_kunci, "");
            } else {
                let cekunci = str_pg_kunci.match(/\d+[A-D]/gm);
                //console.log(str_pg_kunci);
                for (let a = 0; a < cekunci.length; a++) {
                    let tdel = document.querySelector(".tdpg_pgeditor_" + cekunci[a]);
                    tdel.className += " w3-light-blue";
                    document.getElementById("tomboleditor_bantuopsi" + cekunci[a]).checked = true;
                }

            }

        }



    } else {
        let html = ` PENGATURAN KUNCI JAWABAN
        <br /><br />
        Saat ini belum terdeteksi adanya nomor soal Pilihan Ganda atau ESSAY diketikan Anda. Nomor soal dan
        pilihan opsi jawabannya akan muncul otomatis. Anda tinggal memilih Opsi Jawaban di
        tiap-tiap opsi yang terdeteksi sebagai KUNCI JAWABAN soal PG Anda.
        <br /><br />Abaikan pesan ini jika Anda akan memmbuat konten materi tanpa adanya tagihan
        <br/><br/>
        <table class="w3-table-all tabelpilihkuncipg">
           
        </table>`;
        let html2 = `SEBARAN KD TIDAK TERDETEKSI (Sebaran KD Wajib diisi) Silakan gunakan fitur ini: <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>*
        `
        div.innerHTML = html;
        divekd.innerHTML = html2;
    }
    // let cariopsi =(cekcariopsi !== null)?[]:cekcariopsi; 
    //console.log(cekkcariopsi)k;

}
eidmateri.addEventListener("keyup", function (e) {
    let teks = e.target.value;


    // let teks = e.target.value;
    if (teks !== "") {
        barufindkuncipgkd(teks);

    }
    pratinjaubuatmateri();

});
function generaterasebarankd() {
    // alert("modal generate sebaran KD");
    modalbuatsebarankd.style.display = "block";
    let datakd = buateditorkdaktif
    let seljt = document.getElementById("jenistagihan");
    let valjt = seljt.options[seljt.selectedIndex].value;
    let jtKD4 = ["kpraktik", "kproduk", "kproyek", "uspraktek"];
    let indekjt = jtKD4.indexOf(valjt);
    let indekkd = "";
    let colkd = "kd3";
    // console.log(indekjt);
    // console.log(valjt);

    let stKD3apaKD4 = ""
    if (indekjt == -1) {
        stKD3apaKD4 = " Kompetensi Pengetahuan (KD-3) ";
        indekkd = "cekliskd3";
        colkd = "kd3"
    } else {
        stKD3apaKD4 = " Kompetensi Keterampilan (KD-4) ";
        indekkd = "cekliskd4";
        colkd = "kd4";
    };
    msb_obje = {}
    let datakdaktif = datakd.filter(s => s[indekkd] === true);
    //datakd.filter(s => Object.keys(s).filter(d => datakd[indekkd] == true)); //Object.entries(datakd).filter(([k, v]) => k === indekkd && v === true)
    //console.table(datakdaktif);
    let datamapelaktif = datakdaktif.map(s => s["mapel"]).filter((x, i, a) => a.indexOf(x) == i);

    msb_obje["datamapel"] = datamapelaktif;
    datamapelaktif.forEach(s => {
        msb_obje[s] = datakdaktif.filter(d => d["mapel"] == s).map(m => m[colkd]);
    })
    //console.log(datamapelaktif)
    //console.log(msb_obje) //
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let isihtml = "";
    let opsihtmlmapel = "";
    let opsihtmlkd = "";
    //deteksi sebaranKD di textarea
    let teksarea = document.getElementById("idmateri");
    let val = teksarea.value;
    let n = val.length;
    let ada = val.indexOf("_KUNCI-KD_");
    ///let awal = val.indexOf("_KUNCI-PG_");
    let batasawal = val.substring(ada, n)

    let str_pg_d = batasawal.split("\n")[0];

    if (ada == -1) {
        for (let i = 0; i < datamapelaktif.length; i++) {
            if (i == 0) {
                opsihtmlmapel += `<option value="${datamapelaktif[i]}" selected>${datamapelaktif[i]}</option>`;
            } else {
                opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
            }
        };
        let selectmap = datamapelaktif[0];
        let kdmapelpertama = msb_obje[selectmap];
        for (i = 0; i < kdmapelpertama.length; i++) {
            opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}<option>`;
        }
        document.querySelector(".brsmapel_0").innerHTML = opsihtmlmapel;
        document.querySelector(".brskd_0").innerHTML = opsihtmlkd;
    } else {
        let arr0 = str_pg_d.replace("_KUNCI-KD_", "");
        let arr1 = arr0.replace(/\s+/gm, "")
        let mgrup = arr1.split("<||>");
        // console.log(mgrup);
        let mapelsesuai = [];
        let mapeltidaksesuai = [];
        let nosoalngaco;

        let tr, td;
        let rr = mgrup.length - tabel.rows.length;
        let htmlrow = ""
        //update dulu tabel formatnya ...)
        for (let g = 0; g < mgrup.length; g++) {
            let r = g
            htmlrow += `<tr>
                <td>
                    <select class="w3-select mbs_selectmapel brsmapel_${r}" onchange="fn_mbs_selectmapel(this)">
                        <option value="" selected>PILIH MAPEL</option>
                    </select>
                </td>
                <td>
                    <select class="w3-select mbs_selectkd brskd_${r}" onchange="fn_mbs_selectkd(this)">
                        <option value="" selected>PILIH KD</option>
                    </select>
                </td>
                <td>
                    <input class="w3-input w3-border w3-border-teal mbs_textarea brsnosoal_${r}" placeholder="Contoh pengisian: 1,2,3 (di akhir nomor jangan diberi koma)"/>
                </td></tr>`;
        }
        tabel.innerHTML = htmlrow

        //ambil data sebaran kd dari teks area
        for (g = 0; g < mgrup.length; g++) {
            let grup = mgrup[g].split(":");
            opsihtmlmapel = "";
            opsihtmlkd = "";
            let nmp = grup[0].split("_")[0];
            let nkd = grup[0].split("_")[1];
            let valnosoal = grup[1]

            nosoalngaco = nkd.match(/(\d+[A-Za-z.])/);
            if (datamapelaktif.indexOf(nmp) > -1) {

                for (let i = 0; i < datamapelaktif.length; i++) {
                    opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
                };
                let selectmap = nmp;
                let kdmapelpertama = msb_obje[selectmap];
                for (i = 0; i < kdmapelpertama.length; i++) {
                    opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}</option>`;
                }

                if (kdmapelpertama.indexOf(nkd) == -1) {
                    tabel.rows[g].cells[1].style.backgroundColor = "red";
                }
                document.querySelector(".brsmapel_" + g).innerHTML = opsihtmlmapel;
                document.querySelector(".brskd_" + g).innerHTML = opsihtmlkd;
                //
                document.querySelector(".brsmapel_" + g).value = nmp;
                document.querySelector(".brskd_" + g).value = nmp + "_" + nkd;

                document.querySelector(".brsnosoal_" + g).value = valnosoal.replace(/[azAZ.]/gm, ",");



            } else {
                //mapeltidaksesuai.push(nmp);
                for (let i = 0; i < datamapelaktif.length; i++) {
                    if (i == 0) {
                        opsihtmlmapel += `<option value="${datamapelaktif[i]}" selected>${datamapelaktif[i]}</option>`;
                    } else {
                        opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
                    }
                };
                let selectmap = datamapelaktif[0];
                let kdmapelpertama = msb_obje[selectmap];

                for (i = 0; i < kdmapelpertama.length; i++) {
                    opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}</option>`;

                }
                tabel.rows[g].cells[0].style.backgroundColor = "red";
                document.querySelector(".brsmapel_" + g).innerHTML = opsihtmlmapel;

                document.querySelector(".brskd_" + g).innerHTML = opsihtmlkd;

                document.querySelector(".brsmapel_" + g).value = nmp;
                document.querySelector(".brskd_" + g).value = nmp + "_" + nkd;

                document.querySelector(".brsnosoal_" + g).value = valnosoal.replace(/[azAZ.]/gm, ",");
            }
        }
    }
};
function fn_mbs_tambahbaris() {
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let lr = tabel.rows.length;
    let opsimapel = msb_obje["datamapel"];
    let html = "";
    opsimapel.forEach(s => {
        html += `<option value="${s}">${s}</option>`
    })
    let cr_tr = tabel.insertRow(-1);
    let cr_td = cr_tr.insertCell(-1);

    cr_td.innerHTML = `<select class="w3-select mbs_selectmapel brsmapel_${lr}" onchange="fn_mbs_selectmapel(this)">
   ${html}
</select>`;

    cr_td = cr_tr.insertCell(-1);
    cr_td.innerHTML = `<select class="w3-select mbs_selectkd brskd_${lr}" onchange="fn_mbs_selectkd(this)">
                <option value="" selected>PILIH MAPEL DULU</option>
                </select>`;
    cr_td = cr_tr.insertCell(-1);
    cr_td.innerHTML = `<input class="w3-input w3-border w3-border-teal mbs_textarea brsnosoal_${lr}" placeholder="Contoh pengisian: 1,2,3 (di akhir nomor jangan diberi koma)"/>`;
};
function fn_mbs_selectmapel(el) {
    let attr = el.className; //.indexOf("brsmapel_");
    let baris = attr.match(/(\d+)/gm)[1];
    let ops = document.querySelector(".brsmapel_" + baris).options;
    let indek = document.querySelector(".brsmapel_" + baris).selectedIndex;
    let val = ops[indek].value;
    let divopsikd = document.querySelector(".brskd_" + baris);
    let opsikd = msb_obje[val];
    let html = "";
    opsikd.forEach(s => {
        html += `<option value="${val}_${s}">${s}</option>`
    });
    divopsikd.innerHTML = html;


};

function fn_mbs_selectkd(el) {

};

function fn_mbs_simpansebarankd() {
    let teksarea = document.getElementById("idmateri");
    let val = teksarea.value;
    let n = val.length;
    let awal = val.indexOf("_KUNCI-KD_");
    let batasawal = val.substring(awal, n)
    let cari = batasawal.split("\n")[0];
    let arr = "_KUNCI-KD_"
    let elkd = document.querySelectorAll(".mbs_selectkd");
    //brsnosoal_${r}
    let ar = [];
    for (i = 0; i < elkd.length; i++) {
        let elinput = elkd[i].value + ":";
        let attr = elkd[i].className; //.indexOf("brsmapel_");
        let baris = attr.match(/(\d+)/gm)[1];
        let nomorinput = document.querySelector(".brsnosoal_" + baris);
        let valno = nomorinput.value
        elinput += valno;
        ar.push(elinput);
    }
    arr += ar.join("<||>")
    if (awal == -1) {
        teksarea.value += "\n\n" + arr;
    } else {
        teksarea.value = teksarea.value.replace(cari, arr);
    }
    alert("Sebaran KD Berhasil Tersimpan.")

};

function fn_mbs_hapusbaris() {
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let lr = tabel.rows.length;
    if (lr == 1) {
        alert("Maaf, tidak bisa menghapus lagi.")
        return
    };
    let row = tabel.rows;

    tabel.deleteRow(-1);

};
function tanpasebarankd() {
    let teksarea = document.getElementById("idmateri");
    let arr = "_KUNCI-KD_NONKD_5.1:1";
    let val = teksarea.value;
    let n = val.length;
    let awal = val.indexOf("_KUNCI-KD_");
    let batasawal = val.substring(awal, n)
    let cari = batasawal.split("\n")[0];

    if (awal == -1) {
        teksarea.value += "\n\n" + arr;
    } else {
        teksarea.value = teksarea.value.replace(cari, arr);
    }

};
const checked_buatkunci = (el) => {
    let opsilengkap = el.value; //1A
    let no = el.value.match(/\d+/); //1A
    let ele = document.querySelectorAll(".tdnosoal_editor_" + no);
    let elaktif = document.querySelector(".tdpg_pgeditor_" + opsilengkap);
    //hapus dulu bg warannya;
    for (i = 0; i < ele.length; i++) {
        ele[i].className = ele[i].className.replace("w3-light-blue", "");
    };
    elaktif.className += " w3-light-blue";

    let textarea = document.getElementById("idmateri");
    let val = textarea.value;
    let n = val.length;
    let awal = val.indexOf("_KUNCI-PG_");
    let batasawal = val.substring(awal, n)

    let str_pg_kunci = batasawal.split("\n")[0];

    let ceklis = document.querySelectorAll(".pg_buatkuncikd");
    let arrceklis = []
    for (j = 0; j < ceklis.length; j++) {
        let n = ceklis[j].value;
        if (ceklis[j].checked) {
            arrceklis.push(n)

        }

    }
    // console.log(arrceklis)
    let teksnya = "_KUNCI-PG_" + arrceklis.join(",")
    // console.log(str_pg_kunci)
    // console.log(teksnya);
    // textarea.value = textarea.value.substring(0, awal) + teksnya + textarea.value.substring(end, len);
    let teksganti = str_pg_kunci;
    // console.log(awal)
    if (awal == -1) {
        textarea.value = textarea.value + "\n\n" + teksnya; //+ textarea.value.substring(end, len);
    } else {
        textarea.value = textarea.value.replace(str_pg_kunci, teksnya);

    }


};
async function kurikulumdiamdiam() {
    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel"); //.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }


    let tas = "kelas" + idJenjang;
    await fetch(linkmateri + "&action=cekdkkm&tab=" + tas)
        .then(m => m.json())
        .then(k => {

            let statusunggah = (k.unggah == "Jenjang Kelas Anda sudah mengunggah KKM dan KD") ? true : false;
            let data = k.result;
            buateditorkdaktif = data;
            //console.log(data)


        })
        .catch(er => {
            console.log(er);

        })





};
async function kurikulumdiamdiamgagal() {
    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel"); //.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }


    let tabkd = document.querySelector(".classtabkd");
    let tabkkm = document.querySelector(".classtabkkm");
    let tabupl = document.querySelector(".classtabuploadkurikulum");
    tabkd.innerHTML = "Kompetensi Dasar <i class='fa fa-spin fa-spinner'></i>"
    tabkkm.innerHTML = "KKM <i class='fa fa-spin fa-spinner'></i>"
    tabupl.innerHTML = "Upload Kurikulum <i class='fa fa-spin fa-spinner'></i>"

    kurikulum_kd.style.display = "block";
    //document.getElementById("kurikulum_kd").click();
    //------------------------------------------
    let islam = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    let bolislam = (islam == 0) ? false : true;

    let kristen = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    let bolkristen = (kristen == 0) ? false : true;

    let katolik = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    let bolkatolik = (katolik == 0) ? false : true;

    let hindu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    let bolhindu = (hindu == 0) ? false : true;

    let budha = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    let bolbudha = (budha == 0) ? false : true;
    let khonghucu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khong Hu Cu" || lk.pd_agama == "KHONG HUCU" || lk.pd_agama == "Khong Hucu" || lk.pd_agama == "Khong hucu") {
            return true;
        }
    }).length;
    let bolkhonghucu = (khonghucu == 0) ? false : true;


    let divkurikulum = document.getElementById("kurikulum_kd");
    divkurikulum.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'></i>";


    let tekshtml = "<h3> Kompetensi Dasar</h3>Sebaran Kompetensi Dasar<hr/>";
    tekshtml += `<button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><hr/>`;
    let tragama = "";
    let elkkm = "";


    if (bolislam) {
        tragama += `<tr><td>Pendidikan Agama Islam dan Budi Pekerti</td><td>PAI</td>
        <td>
            <label for="kd3_PAI_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.1" name="kd3_PAI_3.1" />
                3.1
            </label><br>
            <label for="kd3_PAI_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.2" name="kd3_PAI_3.2" />
                3.2
                </label><br>
            <label for="kd3_PAI_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.3" name="kd3_PAI_3.3" />
                3.3
                </label><br>
            <label for="kd3_PAI_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.4" name="kd3_PAI_3.4" />
                3.4
            </label><br>
            <label for="kd3_PAI_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.5" name="kd3_PAI_3.5" />
                3.5
            </label><br>
            <label for="kd3_PAI_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.6" name="kd3_PAI_3.6" />
                3.6
                </label><br>
            <label for="kd3_PAI_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.7" name="kd3_PAI_3.7" />
                3.7
                </label><br>
            <label for="kd3_PAI_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.8" name="kd3_PAI_3.8" />
                3.8
            </label><br>
            <label for="kd3_PAI_3.9">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.9" name="kd3_PAI_3.9" />
                3.9
            </label><br>
            <label for="kd3_PAI_3.10">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.10" name="kd3_PAI_3.10" />
                3.10
                </label><br>
            <label for="kd3_PAI_3.11">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.11" name="kd3_PAI_3.11" />
                3.11
                </label><br>
            <label for="kd3_PAI_3.12">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.12" name="kd3_PAI_3.12" />
                3.12
            </label><br>
            <label for="kd3_PAI_3.13">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.13" name="kd3_PAI_3.13" />
                3.13
            </label><br>
            <label for="kd3_PAI_3.14">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.14" name="kd3_PAI_3.14" />
                3.14
                </label><br>
            <label for="kd3_PAI_3.15">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.15" name="kd3_PAI_3.15" />
                3.15
                </label><br>
            <label for="kd3_PAI_3.16">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.16" name="kd3_PAI_3.16" />
                3.16
            </label><br>
             <label for="kd3_PAI_3.17">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.17" name="kd3_PAI_3.17" />
                3.17
                </label><br>
            <label for="kd3_PAI_3.18">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.18" name="kd3_PAI_3.18" />
                3.18
            </label><br>
            <label for="kd3_PAI_3.19">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.19" name="kd3_PAI_3.19" />
                3.19
            </label><br>
            <label for="kd3_PAI_3.20">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.20" name="kd3_PAI_3.20" />
                3.20
                </label><br>
            <label for="kd3_PAI_3.21">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.21" name="kd3_PAI_3.21" />
                3.21
                </label>
        </td>
        <td>
        
        <label for="kd4_PAI_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.1" name="kd4_PAI_4.1" />
        4.1
        </label><br>
        <label for="kd4_PAI_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.2" name="kd4_PAI_4.2" />
        4.2
        </label><br>
        <label for="kd4_PAI_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.3" name="kd4_PAI_4.3" />
        4.3
        </label><br>
        <label for="kd4_PAI_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.4" name="kd4_PAI_4.4" />
        4.4
        </label><br>
        <label for="kd4_PAI_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.5" name="kd4_PAI_4.5" />
        4.5
        </label><br>
        <label for="kd4_PAI_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.6" name="kd4_PAI_4.6" />
        4.6
        </label><br>
        <label for="kd4_PAI_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.7" name="kd4_PAI_4.7" />
        4.7
        </label><br>
        <label for="kd4_PAI_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.8" name="kd4_PAI_4.8" />
        4.8
        </label><br>
        <label for="kd4_PAI_4.9">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.9" name="kd4_PAI_4.9" />
        4.9
        </label><br>
        <label for="kd4_PAI_4.10">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_3.10" name="kd4_PAI_4.10" />
        4.10
        </label><br>
        <label for="kd4_PAI_4.11">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.11" name="kd4_PAI_4.11" />
        4.11
        </label><br>
        <label for="kd4_PAI_4.12">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.12" name="kd4_PAI_4.12" />
        4.12
        </label><br>
        <label for="kd4_PAI_4.13">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.13" name="kd4_PAI_4.13" />
        4.13
        </label><br>
        <label for="kd4_PAI_4.14">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.14" name="kd4_PAI_4.14" />
        4.14
        </label><br>
        <label for="kd4_PAI_4.15">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.15" name="kd4_PAI_4.15" />
        4.15
        </label><br>
        <label for="kd4_PAI_4.16">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.16" name="kd4_PAI_4.16" />
        4.16
        </label><br>
        <label for="kd4_PAI_4.17">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.17" name="kd4_PAI_4.17" />
        4.17
        </label><br>
        <label for="kd4_PAI_4.18">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.18" name="kd4_PAI_4.18" />
        4.18
        </label><br>
        <label for="kd4_PAI_4.19">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.19" name="kd4_PAI_4.19" />
        4.19
        </label><br>
        <label for="kd4_PAI_4.20">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.20" name="kd4_PAI_4.20" />
        4.20
        </label><br>
        <label for="kd4_PAI_4.21">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.21" name="kd4_PAI_4.21" />
        4.21
        </label>
        </td>
        </tr>`;
        elkkm += `<tr><td>PAI</td><td contenteditable="true" id="namamapelraport_PAI">Pendidikan Agama Islam dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PAI">00</td></tr>`;
    }
    if (bolkristen) {
        tragama += `<tr><td>Pendidikan Agama Kristen dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Kristen sebanyak ${kristen} siswa.<sub></td><td>PKRIS</td>
        <td>
            <label for="kd3_PKRIS_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.1" name="kd3_PKRIS_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKRIS_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.2" name="kd3_PKRIS_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKRIS_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.3" name="kd3_PKRIS_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKRIS_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.4" name="kd3_PKRIS_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PKRIS_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.1" name="kd4_PKRIS_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKRIS_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.2" name="kd4_PKRIS_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKRIS_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.3" name="kd4_PKRIS_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKRIS_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.4" name="kd4_PKRIS_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PKRIS</td><td contenteditable="true" id="namamapelraport_PKRIS">Pendidikan Agama Kristen dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKRIS">00</td></tr>`;
    }
    if (bolkatolik) {
        tragama += `<tr><td>Pendidikan Agama Katholik dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Katolik sebanyak ${katolik} siswa.<sub></td><td>PKATO</td>
        <td>
            <label for="kd3_PKATO_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.1" name="kd3_PKATO_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKATO_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.2" name="kd3_PKATO_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKATO_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.3" name="kd3_PKATO_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKATO_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.4" name="kd3_PKATO_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKATO_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.5" name="kd3_PKATO_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKATO_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.6" name="kd3_PKATO_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKATO_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.7" name="kd3_PKATO_3.7" />
                3.7
                </label><br>
            <label for="kd3_PKATO_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.8" name="kd3_PKATO_3.8" />
                3.8
            </label><br>
           
        </td>
        <td>
        
        <label for="kd4_PKATO_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.1" name="kd4_PKATO_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKATO_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.2" name="kd4_PKATO_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKATO_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.3" name="kd4_PKATO_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKATO_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.4" name="kd4_PKATO_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKATO_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.5" name="kd4_PKATO_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKATO_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.6" name="kd4_PKATO_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKATO_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.7" name="kd4_PKATO_4.7" />
        4.7
        </label><br>
        <label for="kd4_PKATO_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.8" name="kd4_PKATO_4.8" />
        4.8
        </label><br>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKATO</td><td contenteditable="true" id="namamapelraport_PKATO">Pendidikan Agama Katholik dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKATO">00</td></tr>`;
    }
    if (bolbudha) {
        tragama += `<tr><td>Pendidikan Agama Budha dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Budha sebanyak ${budha} siswa.<sub></td><td>PBUDH</td>
        <td>
            <label for="kd3_PBUDH_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.1" name="kd3_PBUDH_3.1" />
                3.1
            </label><br>
            <label for="kd3_PBUDH_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.2" name="kd3_PBUDH_3.2" />
                3.2
                </label><br>
            <label for="kd3_PBUDH_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.3" name="kd3_PBUDH_3.3" />
                3.3
                </label><br>
            <label for="kd3_PBUDH_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.4" name="kd3_PBUDH_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PBUDH_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.1" name="kd4_PBUDH_4.1" />
        4.1
        </label><br>
        <label for="kd4_PBUDH_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.2" name="kd4_PBUDH_4.2" />
        4.2
        </label><br>
        <label for="kd4_PBUDH_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.3" name="kd4_PBUDH_4.3" />
        4.3
        </label><br>
        <label for="kd4_PBUDH_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.4" name="kd4_PBUDH_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PBUDH</td><td contenteditable="true" id="namamapelraport_PBUDH">Pendidikan Agama Budha dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PBUDH">00</td></tr>`;
    }
    if (bolhindu) {
        tragama += `<tr><td>Pendidikan Agama Hindu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Hindu sebanyak ${hindu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PHIND_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.1" name="kd3_PHIND_3.1" />
                3.1
            </label><br>
            <label for="kd3_PHIND_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.2" name="kd3_PHIND_3.2" />
                3.2
                </label><br>
            <label for="kd3_PHIND_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.3" name="kd3_PHIND_3.3" />
                3.3
                </label><br>
            <label for="kd3_PHIND_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.4" name="kd3_PHIND_3.4" />
                3.4
            </label><br>
            <label for="kd3_PHIND_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.5" name="kd3_PHIND_3.5" />
                3.5
            </label><br>
            <label for="kd3_PHIND_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.6" name="kd3_PHIND_3.6" />
                3.6
                </label><br>
            <label for="kd3_PHIND_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.7" name="kd3_PHIND_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PHIND_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.1" name="kd4_PHIND_4.1" />
        4.1
        </label><br>
        <label for="kd4_PHIND_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.2" name="kd4_PHIND_4.2" />
        4.2
        </label><br>
        <label for="kd4_PHIND_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.3" name="kd4_PHIND_4.3" />
        4.3
        </label><br>
        <label for="kd4_PHIND_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.4" name="kd4_PHIND_4.4" />
        4.4
        </label><br>
        <label for="kd4_PHIND_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.5" name="kd4_PHIND_4.5" />
        4.5
        </label><br>
        <label for="kd4_PHIND_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.6" name="kd4_PHIND_4.6" />
        4.6
        </label><br>
        <label for="kd4_PHIND_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.7" name="kd4_PHIND_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PHIND</td><td contenteditable="true" id="namamapelraport_PHIND">Pendidikan Agama Hindu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PHIND">00</td></tr>`;
    }
    if (bolkhonghucu) {
        tragama += `<tr><td>Pendidikan Agama Khonghucu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Khonghucu sebanyak ${khonghucu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PKONG_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.1" name="kd3_PKONG_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKONG_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.2" name="kd3_PKONG_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKONG_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.3" name="kd3_PKONG_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKONG_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.4" name="kd3_PKONG_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKONG_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.5" name="kd3_PKONG_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKONG_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.6" name="kd3_PKONG_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKONG_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.7" name="kd3_PKONG_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PKONG_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.1" name="kd4_PKONG_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKONG_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.2" name="kd4_PKONG_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKONG_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.3" name="kd4_PKONG_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKONG_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.4" name="kd4_PKONG_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKONG_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.5" name="kd4_PKONG_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKONG_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.6" name="kd4_PKONG_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKONG_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.7" name="kd4_PKONG_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKONG</td><td contenteditable="true" id="namamapelraport_PKONG">Pendidikan Agama Khonghucu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKONG">00</td></tr>`;
    }

    if (!bolislam && !bolkristen && !bolkatolik && !bolbudha && !bolhindu && !bolkhonghucu) {
        tragama += `
        <tr>
            <td>Tidak terdeteksi adanya isian Agama di kelas Anda</td>
            <td>???</td>
            <td>Silakan lengkapi data siswa Anda</td>
            <td>Silakan lengkapi data siswa Anda</td>
        </tr>
        `;
        elkkm += `<tr><td>AGAMA</td><td>Tidak terdeteksi data agama di Data Siswa Anda</td><td>00</td=></tr>`;
    }

    let ipsipa = "";
    if (idJenjang >= 4) {
        ipsipa = `
        <tr>
        <td>Ilmu Pengetahuan Alam</td>
        <td>IPA</td>
        <td>
        <label for="kd3_IPA_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.1" name="kd3_IPA_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPA_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.2" name="kd3_IPA_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPA_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.3" name="kd3_IPA_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPA_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.4" name="kd3_IPA_3.4" />
        3.4
    </label><br>
    <label for="kd3_IPA_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.5" name="kd3_IPA_3.5" />
        3.5
    </label><br>
    <label for="kd3_IPA_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.6" name="kd3_IPA_3.6" />
        3.6
        </label><br>
    <label for="kd3_IPA_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.7" name="kd3_IPA_3.7" />
        3.7
        </label><br>
    <label for="kd3_IPA_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.8" name="kd3_IPA_3.8" />
        3.8
    </label><br>
    <label for="kd3_IPA_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.9" name="kd3_IPA_3.9" />
        3.9
</label>
    
 
        </td><td>
        <label for="kd4_IPA_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.1" name="kd4_IPA_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPA_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.2" name="kd4_IPA_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPA_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.3" name="kd4_IPA_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPA_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.4" name="kd4_IPA_4.4" />
        4.4
    </label><br>
    <label for="kd4_IPA_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.5" name="kd4_IPA_4.5" />
        4.5
    </label><br>
    <label for="kd4_IPA_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.6" name="kd4_IPA_4.6" />
        4.6
        </label><br>
    <label for="kd4_IPA_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.7" name="kd4_IPA_4.7" />
        4.7
        </label><br>
    <label for="kd4_IPA_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.8" name="kd4_IPA_4.8" />
        4.8
    </label><br>
    <label for="kd4_IPA_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.9" name="kd4_IPA_4.9" />
        4.9
    </label><br>
        </td>

    </tr> 
    <tr>    
        <td>Ilmu Pengetahuan Sosial</td>
        <td>IPS</td>
        <td>
        <label for="kd3_IPS_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.1" name="kd3_IPS_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPS_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.2" name="kd3_IPS_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPS_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.3" name="kd3_IPS_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPS_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.4" name="kd3_IPS_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_IPS_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.1" name="kd4_IPS_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPS_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.2" name="kd4_IPS_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPS_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.3" name="kd4_IPS_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPS_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.4" name="kd4_IPS_4.4" />
        4.4
    </label><br>
    
        </td>
    </tr> 
        `
    }

    tekshtml += `<div style="overflow-x:auto">
    <table class='versi-table' id="datadatakdraport">
    <tr >
        <th>Mata Pelajaran</th>
        <th>Kode Mapel</th>
        <th>Kompetensi Pengetahuan<br> (KI-3)</the>
        <th>Kompetensi Keterampilan <br>(KI-4)</thtyle>
    </tr>
    ${tragama}
    <tr>
        <td>Pendidikan Kewarganegaraan</td>
        <td>PKN</td>
    
        <td>
        <label for="kd3_PKN_3.1">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.1" name="kd3_PKN_3.1" />
            3.1
        </label><br>
        <label for="kd3_PKN_3.2">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.2" name="kd3_PKN_3.2" />
            3.2
            </label><br>
        <label for="kd3_PKN_3.3">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.3" name="kd3_PKN_3.3" />
            3.3
            </label><br>
        <label for="kd3_PKN_3.4">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.4" name="kd3_PKN_3.4" />
            3.4
        </label><br>
                   
       
    </td>
    <td>
            <label for="kd4_PKN_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.1" name="kd4_PKN_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKN_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.2" name="kd4_PKN_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKN_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.3" name="kd4_PKN_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKN_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.4" name="kd4_PKN_4.4" />
        4.4
        </label><br>
    
            </td>
        </tr>
    <tr>
        <td> Bahasa Indonesia
        </td><td>BINDO</td><td>
        <label for="kd3_BINDO_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.1" name="kd3_BINDO_3.1" />
        3.1
    </label><br>
    <label for="kd3_BINDO_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.2" name="kd3_BINDO_3.2" />
        3.2
        </label><br>
    <label for="kd3_BINDO_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.3" name="kd3_BINDO_3.3" />
        3.3
        </label><br>
    <label for="kd3_BINDO_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.4" name="kd3_BINDO_3.4" />
        3.4
    </label><br>
    <label for="kd3_BINDO_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.5" name="kd3_BINDO_3.5" />
        3.5
    </label><br>
    <label for="kd3_BINDO_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.6" name="kd3_BINDO_3.6" />
        3.6
        </label><br>
    <label for="kd3_BINDO_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.7" name="kd3_BINDO_3.7" />
        3.7
        </label><br>
    <label for="kd3_BINDO_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.8" name="kd3_BINDO_3.8" />
        3.8
    </label><br>
    <label for="kd3_BINDO_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.9" name="kd3_BINDO_3.9" />
        3.9
    </label><br>
    <label for="kd3_BINDO_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.10" name="kd3_BINDO_3.10" />
        3.10
        </label><br>
    <label for="kd3_BINDO_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.11" name="kd3_BINDO_3.11" />
        3.11
        </label><br>
 
        </td><td>
        <label for="kd4_BINDO_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.1" name="kd4_BINDO_4.1" />
        4.1
    </label><br>
    <label for="kd4_BINDO_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.2" name="kd4_BINDO_4.2" />
        4.2
        </label><br>
    <label for="kd4_BINDO_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.3" name="kd4_BINDO_4.3" />
        4.3
        </label><br>
    <label for="kd4_BINDO_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.4" name="kd4_BINDO_4.4" />
        4.4
    </label><br>
    <label for="kd4_BINDO_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.5" name="kd4_BINDO_4.5" />
        4.5
    </label><br>
    <label for="kd4_BINDO_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.6" name="kd4_BINDO_4.6" />
        4.6
        </label><br>
    <label for="kd4_BINDO_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.7" name="kd4_BINDO_4.7" />
        4.7
        </label><br>
    <label for="kd4_BINDO_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.8" name="kd4_BINDO_4.8" />
        4.8
    </label><br>
    <label for="kd4_BINDO_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.9" name="kd4_BINDO_4.9" />
        4.9
    </label><br>
    <label for="kd4_BINDO_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.10" name="kd4_BINDO_4.10" />
        4.10
        </label><br>
    <label for="kd4_BINDO_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.11" name="kd4_BINDO_4.11" />
        4.11
        </label><br>
 
        </td>
    </tr>
    <tr>
        <td>Matematika</td>
        <td>MTK</td>
        <td>
        <label for="kd3_MTK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.1" name="kd3_MTK_3.1" />
        3.1
    </label><br>
    <label for="kd3_MTK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.2" name="kd3_MTK_3.2" />
        3.2
        </label><br>
    <label for="kd3_MTK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.3" name="kd3_MTK_3.3" />
        3.3
        </label><br>
    <label for="kd3_MTK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.4" name="kd3_MTK_3.4" />
        3.4
    </label><br>
    <label for="kd3_MTK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.5" name="kd3_MTK_3.5" />
        3.5
    </label><br>
    <label for="kd3_MTK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.6" name="kd3_MTK_3.6" />
        3.6
        </label><br>
    <label for="kd3_MTK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.7" name="kd3_MTK_3.7" />
        3.7
        </label><br>
    <label for="kd3_MTK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.8" name="kd3_MTK_3.8" />
        3.8
    </label><br>
    <label for="kd3_MTK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.9" name="kd3_MTK_3.9" />
        3.9
    </label><br>
    <label for="kd3_MTK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.10" name="kd3_MTK_3.10" />
        3.10
        </label><br>
    <label for="kd3_MTK_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.11" name="kd3_MTK_3.11" />
        3.11
        </label><br>
<label for="kd3_MTK_3.12">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.12" name="kd3_MTK_3.12" />
        3.12
        </label><br>
    <label for="kd3_MTK_3.13">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.13" name="kd3_MTK_3.13" />
        3.13
        </label><br>
 
        </td>
        <td>
        <label for="kd4_MTK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.1" name="kd4_MTK_4.1" />
        4.1
    </label><br>
    <label for="kd4_MTK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.2" name="kd4_MTK_4.2" />
        4.2
        </label><br>
    <label for="kd4_MTK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.3" name="kd4_MTK_4.3" />
        4.3
        </label><br>
    <label for="kd4_MTK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.4" name="kd4_MTK_4.4" />
        4.4
    </label><br>
    <label for="kd4_MTK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.5" name="kd4_MTK_4.5" />
        4.5
    </label><br>
    <label for="kd4_MTK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.6" name="kd4_MTK_4.6" />
        4.6
        </label><br>
    <label for="kd4_MTK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.7" name="kd4_MTK_4.7" />
        4.7
        </label><br>
    <label for="kd4_MTK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.8" name="kd4_MTK_4.8" />
        4.8
    </label><br>
    <label for="kd4_MTK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.9" name="kd4_MTK_4.9" />
        4.9
    </label><br>
    <label for="kd4_MTK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.10" name="kd4_MTK_4.10" />
        4.10
        </label><br>
    <label for="kd4_MTK_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.11" name="kd4_MTK_4.11" />
        4.11
        </label><br>
<label for="kd4_MTK_4.12">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.12" name="kd4_MTK_4.12" />
        4.12
        </label><br>
    <label for="kd4_MTK_4.13">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.13" name="kd4_MTK_4.13" />
        4.13
        </label><br>
 
        </td>
    </tr> 
   ${ipsipa}
    <tr>
        <td>Seni Budaya dan Prakarya</td>
        <td>SBDP</td>
        <td>
        <label for="kd3_SBDP_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.1" name="kd3_SBDP_3.1" />
        3.1
    </label><br>
    <label for="kd3_SBDP_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.2" name="kd3_SBDP_3.2" />
        3.2
        </label><br>
    <label for="kd3_SBDP_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.3" name="kd3_SBDP_3.3" />
        3.3
        </label><br>
    <label for="kd3_SBDP_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.4" name="kd3_SBDP_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_SBDP_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.1" name="kd4_SBDP_4.1" />
        4.1
    </label><br>
    <label for="kd4_SBDP_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.2" name="kd4_SBDP_4.2" />
        4.2
        </label><br>
    <label for="kd4_SBDP_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.3" name="kd4_SBDP_4.3" />
        4.3
        </label><br>
    <label for="kd4_SBDP_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.4" name="kd4_SBDP_4.4" />
        4.4
    </label><br>
        </td>
    </tr> 
    <tr>
        <td>Pendidikan Jasmani dan Kesehatan<br>PJOK</td>
        <td>PJOK</td>
        <td>
        <label for="kd3_PJOK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.1" name="kd3_PJOK_3.1" />
        3.1
    </label><br>
    <label for="kd3_PJOK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.2" name="kd3_PJOK_3.2" />
        3.2
        </label><br>
    <label for="kd3_PJOK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.3" name="kd3_PJOK_3.3" />
        3.3
        </label><br>
    <label for="kd3_PJOK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.4" name="kd3_PJOK_3.4" />
        3.4
    </label><br>
    <label for="kd3_PJOK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.5" name="kd3_PJOK_3.5" />
        3.5
    </label><br>
    <label for="kd3_PJOK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.6" name="kd3_PJOK_3.6" />
        3.6
        </label><br>
    <label for="kd3_PJOK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.7" name="kd3_PJOK_3.7" />
        3.7
        </label><br>
    <label for="kd3_PJOK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.8" name="kd3_PJOK_3.8" />
        3.8
    </label><br>
    <label for="kd3_PJOK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.9" name="kd3_PJOK_3.9" />
        3.9
    </label><br>
    <label for="kd3_PJOK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.10" name="kd3_PJOK_3.10" />
        3.10
        </label><br>
   
 
        </td>
        <td>
        <label for="kd4_PJOK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.1" name="kd4_PJOK_4.1" />
        4.1
    </label><br>
    <label for="kd4_PJOK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.2" name="kd4_PJOK_4.2" />
        4.2
        </label><br>
    <label for="kd4_PJOK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.3" name="kd4_PJOK_4.3" />
        4.3
        </label><br>
    <label for="kd4_PJOK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.4" name="kd4_PJOK_4.4" />
        4.4
    </label><br>
    <label for="kd4_PJOK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.5" name="kd4_PJOK_4.5" />
        4.5
    </label><br>
    <label for="kd4_PJOK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.6" name="kd4_PJOK_4.6" />
        4.6
        </label><br>
    <label for="kd4_PJOK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.7" name="kd4_PJOK_4.7" />
        4.7
        </label><br>
    <label for="kd4_PJOK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.8" name="kd4_PJOK_4.8" />
        4.8
    </label><br>
    <label for="kd4_PJOK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.9" name="kd4_PJOK_4.9" />
        4.9
    </label><br>
    <label for="kd4_PJOK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.10" name="kd4_PJOK_4.10" />
        4.10
        </label><br>
        </td>
    </tr>
    <tr>
        <td>Bahasa Sunda</td>
        <td>BSUND</td>
        <td>
        <label for="kd3_BSUND_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.1" name="kd3_BSUND_3.1" />
        3.1
    </label><br>
    <label for="kd3_BSUND_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.2" name="kd3_BSUND_3.2" />
        3.2
        </label><br>
    <label for="kd3_BSUND_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.3" name="kd3_BSUND_3.3" />
        3.3
        </label><br>
    <label for="kd3_BSUND_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.4" name="kd3_BSUND_3.4" />
        3.4
    </label><br>
    <label for="kd3_BSUND_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.5" name="kd3_BSUND_3.5" />
        3.5
    </label><br>
    <label for="kd3_BSUND_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.6" name="kd3_BSUND_3.6" />
        3.6
        </label><br>
    <label for="kd3_BSUND_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.7" name="kd3_BSUND_3.7" />
        3.7
        </label><br>
    <label for="kd3_BSUND_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.8" name="kd3_BSUND_3.8" />
        3.8
    </label><br>
    <label for="kd3_BSUND_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.9" name="kd3_BSUND_3.9" />
        3.9
    </label><br>
    
 
        </td>
        <td>
        <label for="kd4_BSUND_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.1" name="kd4_BSUND_4.1" />
        4.1
    </label><br>
    <label for="kd4_BSUND_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.2" name="kd4_BSUND_4.2" />
        4.2
        </label><br>
    <label for="kd4_BSUND_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.3" name="kd4_BSUND_4.3" />
        4.3
        </label><br>
    <label for="kd4_BSUND_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.4" name="kd4_BSUND_4.4" />
        4.4
    </label><br>
    <label for="kd4_BSUND_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.5" name="kd4_BSUND_4.5" />
        4.5
    </label><br>
    <label for="kd4_BSUND_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.6" name="kd4_BSUND_4.6" />
        4.6
        </label><br>
    <label for="kd4_BSUND_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.7" name="kd4_BSUND_4.7" />
        4.7
        </label><br>
    <label for="kd4_BSUND_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.8" name="kd4_BSUND_4.8" />
        4.8
    </label><br>
    <label for="kd4_BSUND_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.9" name="kd4_BSUND_4.9" />
        4.9
    </label><br>
    
        </td>
    </tr>
    </table></div>`

    kurikulum_kkm.innerHTML = `<h3>Data Kriteria Ketuntasan Minimal (KKM)</h3>
    <button class="w3-button w3-blue" onclick="fnprinttabelkkm('printtabelkkm,DATA KKM KELAS ${idJenjang}, SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel},${StringTanggal(new Date())}')"><i class="fa fa-print"></i> Cetak</button>
   
    <hr/><div id="printtabelkkm"><center><table class="versi-table" id="ttttt">
        <tr>
            <th>Kode Mapel</th>
            <th>Identitas Mapel<br/><sub>Edit identitas mapel ini untuk identitas Mapel di Buku Raport</sub></th>
            <th>Nilai KKM</th>
        </tr>
        ${elkkm}
        <tr><td>PKN</td><td contenteditable="true" id="namamapelraport_PKN">Pendidikan Kewarganegaraan</td><td contenteditable="true" id="angkakkm_PKN">00</td></tr>
        <tr><td>BINDO</td><td contenteditable="true" id="namamapelraport_BINDO">Bahasa Indonesia</td><td contenteditable="true" id="angkakkm_BINDO">00</td></tr>
        <tr><td>MTK</td><td contenteditable="true" id="namamapelraport_MTK">Matematika</td><td contenteditable="true" id="angkakkm_MTK">00</td></tr>
        <tr><td>IPA</td><td contenteditable="true" id="namamapelraport_IPA">Ilmu Pengetahuan Alam</td><td contenteditable="true" id="angkakkm_IPA">00</td></tr>
        <tr><td>IPS</td><td contenteditable="true" id="namamapelraport_IPS">Ilmu Pengetahuan Sosial</td><td contenteditable="true" id="angkakkm_IPS">00</td></tr>
        <tr><td>PJOK</td><td contenteditable="true" id="namamapelraport_PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan</td><td contenteditable="true" id="angkakkm_PJOK">00</td></tr>
        <tr><td>SBDP</td><td contenteditable="true" id="namamapelraport_SBDP">Seni Budaya dan Prakarya</td><td contenteditable="true" id="angkakkm_SBDP">00</td></tr>
        <tr><td>BSUND</td><td contenteditable="true" id="namamapelraport_BSUND">Bahasa Sunda</td><td contenteditable="true" id="angkakkm_BSUND">00</td></tr>
    </table></center></div>
    <button onclick="fnsimpanidkkm()" class="w3-button w3-green w3-right">Simpan Perubahan</button><hr/>
    Keterangan: <sub class="w3-text-blue">Di tabel ini, Anda dapat mengedit nama mata pelajaran yang akan ditampilkan di Buku Raport Siswa. Di sini pula, Anda dapat mengubah KKM masing-masing mata pelajaran yang nantinya setiap KD akan otomatis menyesuaikan angka KKM yang Anda Edit di KKM yang Anda unggah di UPLOAD DATA (Setelah mengeklik tombol SIMPAN)</sub>
    
    `

    let tas = "kelas" + idJenjang;
    await fetch(linkmateri + "&action=cekdkkm&tab=" + tas)
        .then(m => m.json())
        .then(k => {

            let statusunggah = (k.unggah == "Jenjang Kelas Anda sudah mengunggah KKM dan KD") ? true : false;
            let data = k.result;

            if (statusunggah) {

                let teks = "<hr/><div style='overflow-x:auto'><table class='versi-table w3-small tabelkkmkd'><tr><th>Mata Pelajaran</th><th>KD-3</th><th>Indikator KI-3 <br>(Pengetahuan)</th><th>KD-4</th><th>Indikator KI-4 <br>(Keterampilan)</th><th>KKM</th></tr>";
                for (i = 0; i < data.length; i++) {
                    let divelkkm = document.getElementById("angkakkm_" + data[i].mapel);
                    if (divelkkm !== null) {
                        divelkkm.innerHTML = data[i].kkm;
                    }
                    // teks += "<tr><td>" + data[i].mapel + "</td><td>" + data[i].kd3 + "</td><td contenteditable='true'>" + data[i].indikatorkd3 + "</td><td>" + data[i].kd4 + "</td><td  contenteditable='true'>" + data[i].indikatorkd4 + "</td><td  contenteditable='true'>" + data[i].kkm + "</td></tr>";
                    teks += `<tr><td>${data[i].mapel}</td><td>${data[i].kd3}</td><td contenteditable="true" id="deskripsikd3_${data[i].mapel}_${data[i].kd3}">${data[i].indikatorkd3}</td><td>${data[i].kd4}</td><td contenteditable="true" id="deskripsikd4_${data[i].mapel}_${data[i].kd4}">${data[i].indikatorkd4}</td><td contenteditable="true">${data[i].kkm}</td></tr>`;
                    let truekd3 = data[i].cekliskd3;
                    let truekd4 = data[i].cekliskd4;
                    let iddiv = "kd3_" + data[i].mapel + "_" + data[i].kd3;
                    let divnya = document.getElementById(iddiv);
                    if (divnya !== null) {
                        if (truekd3) {
                            divnya.checked = true;
                        } else {
                            divnya.checked = false;
                        }
                    }
                    let iddivv = "kd4_" + data[i].mapel + "_" + data[i].kd4;
                    let divnyaa = document.getElementById(iddivv);
                    if (divnyaa !== null) {
                        if (truekd4) {
                            divnyaa.checked = true;
                        } else {
                            divnyaa.checked = false;
                        }
                    }


                }

                pisahpisah.innerHTML = k.unggah + `<hr/><button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><button class='w3-button w3-round-large w3-red' onclick="hapuskkmkd()">Hapus KKM dan KD</button><hr/>` + teks + "</table></div>";

            } else {
                pisahpisah.innerHTML = k.unggah + `<br/>Jika Anda belum mengunggah file KKM dan KD di server dan
                membutuhkan format filenya, silakan kunjungi Repository.</br><br /> Disana akan dijelaskan bagaimana caranya.<hr><label for="uploadcsv"><i class="fa fa-upload w3-button w3-blue w3-round-large"> Unggah File
                Format</i></label>
        <input type="file" onchange="uploadcsv()" id="uploadcsv" class="w3-hide" /><hr/>
        Berikut ini adalah contoh file KKM dan KD. Silakan unduh lalu Anda unggah pada tombol di atas, kemudian Anda edit (jika diperlukan);
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `
            }
            tabkd.innerHTML = "Kompetensi Dasar"
            tabkkm.innerHTML = "KKM"
            tabupl.innerHTML = "Upload Kurikulum"

        })
        .catch(er => {
            console.log(er);
            tabkd.innerHTML = "Kompetensi Dasar !"
            tabkkm.innerHTML = "KKM !"
            tabupl.innerHTML = "Upload Kurikulum !"
        })

    divkurikulum.innerHTML = tekshtml;



};

//////////////////////////////// source EDITOR.JS //////////////
window.onscroll = function () { scrollFunction() };
let elementini = document.querySelector(".tomboleditor");
let el_set_kuncipg = document.querySelector(".tekeditorpg");

function scrollFunction() {
    let a = document.querySelector("#idmateri").offsetTop;

    let b = document.querySelector("#loadketKD").offsetTop;// + 20;
    //console.log((rounded >= a && rounded <= b))
    var rounded = Math.round(document.documentElement.scrollTop);
    if (rounded >= a && rounded <= b) {
        elementini.className = elementini.className.replace("l12", "l9");
    } else {
        elementini.className = elementini.className.replace("l9", "l12");

    }
};

let btneditor = document.querySelector(".bukatekseditor");
let btneditor2 = document.querySelector(".bukatekseditor2");
let btneditor3 = document.querySelector(".bukatekseditor3");
btneditor.addEventListener("click", function () {
    let x = document.querySelector(".divtekseditor");
    if (x.className.indexOf("w3-show") == -1) {
        x.className = x.className.replace("w3-hide", "w3-show");
        btneditor.innerHTML = `<i class="fa fa-angle-double-up w3-medium"></i>`;
        btneditor2.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
        btneditor3.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        btneditor.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;

    }
    let y = document.querySelector(".divtekseditor2");
    y.className = y.className.replace("w3-show", "w3-hide");
    let z = document.querySelector(".divtekseditor3");
    z.className = z.className.replace("w3-show", "w3-hide");
});

btneditor2.addEventListener("click", function () {
    let x = document.querySelector(".divtekseditor2");
    if (x.className.indexOf("w3-show") == -1) {
        x.className = x.className.replace("w3-hide", "w3-show");
        btneditor2.innerHTML = `<i class="fa fa-angle-double-up w3-medium"></i>`;
        btneditor.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
        btneditor3.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;


    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        btneditor2.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
    }
    let y = document.querySelector(".divtekseditor");
    y.className = y.className.replace("w3-show", "w3-hide");
    let z = document.querySelector(".divtekseditor3");
    z.className = z.className.replace("w3-show", "w3-hide");
});

btneditor3.addEventListener("click", function () {
    let x = document.querySelector(".divtekseditor3");
    if (x.className.indexOf("w3-show") == -1) {
        x.className = x.className.replace("w3-hide", "w3-show");
        btneditor3.innerHTML = `<i class="fa fa-angle-double-up w3-medium"></i>`;
        btneditor2.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
        btneditor.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;


    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        btneditor3.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
    }
    let y = document.querySelector(".divtekseditor");
    y.className = y.className.replace("w3-show", "w3-hide");
    let z = document.querySelector(".divtekseditor2");
    z.className = z.className.replace("w3-show", "w3-hide");
});

let tombol1 = document.querySelector(".ed_ratatengah");
tombol1.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-center'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol2 = document.querySelector(".ed_ratapinggir");
tombol2.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-justify'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol3 = document.querySelector(".ed_ratakanan");
tombol3.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-right-align'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let tombol4 = document.querySelector(".ed_ratakiri");
tombol4.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-left-align'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol5 = document.querySelector(".ed_tebalkan");
tombol5.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<b>" + adabaris[i] + "</b>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let tombol6 = document.querySelector(".ed_miringkan");
tombol6.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<i>" + adabaris[i] + "</i>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let tombol7 = document.querySelector(".ed_garisbawah");
tombol7.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<u>" + adabaris[i] + "</u>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let tombol8 = document.querySelector(".ed_semuakapital");
tombol8.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<span style='text-transform:uppercase'>" + adabaris[i] + "</span>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol9 = document.querySelector(".ed_semuahurufkecil");
tombol9.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<span style='text-transform:lowercase'>" + adabaris[i] + "</span>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol10 = document.querySelector(".ed_tiapawalkatakapital");
tombol10.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<span style='text-transform:capitalize'>" + adabaris[i] + "</span>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol11 = document.querySelector(".ed_pangkat");
tombol11.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<sup>" + adabaris[i] + "</sup>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol12 = document.querySelector(".ed_subtitle");
tombol12.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<sub>" + adabaris[i] + "</sub>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol13 = document.querySelector(".ed_listnomor");
tombol13.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ol style='list-style-type:decimal;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let tombol14 = document.querySelector(".ed_listabjadkapital");
tombol14.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ol style='list-style-type:upper-alpha;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let tombol15 = document.querySelector(".ed_listabjadnonkapital");
tombol15.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ol style='list-style-type:lower-alpha;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombolbul = document.querySelector(".ed_listbulet");
tombolbul.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ul style='list-style-type:circle;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ul>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let tombolcustom = document.querySelector(".ed_listcustom");
tombolcustom.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ul style='list-style-type:none;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ul>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let btn_mtk = document.querySelector(".ed_pecahanbiasa");
btn_mtk.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let adabaris = sel.split("/");

    if (adabaris.length !== 2) {
        alert("tanda garis miring harus satu yang diblok");
        return
    }
    let replace = " _PECAHAN-BIASA_" + adabaris[0].replace(/\s+/g, "") + "/" + adabaris[1].replace(/\s+/g, "") + " ";


    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk2 = document.querySelector(".ed_pecahancampuran");
btn_mtk2.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let adabaris = sel.split("/");

    if (adabaris.length !== 3) {
        alert("tanda garis miring harus dua yang diblok: misal 2/3/4");
        return
    }
    let replace = " _PECAHAN-CAMPURAN_" + adabaris[0].replace(/\s+/g, "") + "/" + adabaris[1].replace(/\s+/g, "") + "/" + adabaris[2].replace(/\s+/g, "") + " ";


    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let btn_mtk3 = document.querySelector(".ed_pangkatn");
btn_mtk3.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let adabaris = sel.split("/");

    if (adabaris.length !== 2) {
        alert("tanda garis miring harus dua yang diblok: misal 2/3");
        return
    }
    let replace = " _PANGKAT_" + adabaris[0].replace(/\s+/g, "") + "/" + adabaris[1].replace(/\s+/g, "") + " ";


    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let btn_mtk4 = document.querySelector(".ed_akarkuadrat");
btn_mtk4.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " _AKAR-KUADRAT_" + sel.replace(/\s+/g, "") + " ";



    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk5 = document.querySelector(".ed_akarpangkattiga");
btn_mtk5.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " _AKAR-TIGA_" + sel.replace(/\s+/g, "") + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk6 = document.querySelector(".ed_kali");
btn_mtk6.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &times; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk7 = document.querySelector(".ed_bagi");
btn_mtk7.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &div; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let btn_mtk8 = document.querySelector(".ed_sudut");
btn_mtk8.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &ang; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk9 = document.querySelector(".ed_lebihkecilsamadengan");
btn_mtk9.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &le; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk10 = document.querySelector(".ed_lebihbesarsamadengan");
btn_mtk10.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &ge; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk11 = document.querySelector(".ed_plusminus");
btn_mtk11.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &PlusMinus; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk12 = document.querySelector(".ed_derajatsuhu");
btn_mtk12.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "&#176; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk13 = document.querySelector(".ed_ceklis");
btn_mtk13.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "&checkmark; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk14 = document.querySelector(".ed_pi");
btn_mtk14.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &#8508; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk15 = document.querySelector(".ed_panahkiri");
btn_mtk15.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &larr; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk16 = document.querySelector(".ed_panahkanan");
btn_mtk16.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &rarr; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk17 = document.querySelector(".ed_panahkiridobel");
btn_mtk17.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &DoubleLongLeftArrow; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk18 = document.querySelector(".ed_panahkanandobel");
btn_mtk18.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &DoubleLongRightArrow; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});

let btn_elamaso = document.querySelector(".ed_pgd");
btn_elamaso.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_pgd").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");
    let abjadopsi = ["", "A", "B", "C", "D"]
    if (adabaris.length !== 5) {
        alert("Maaf, area yang diblok harus 5 baris. Jika Soal/Opsi Anda lebih satu paragraf, gunakan fitur PETUNJUK");
        return
    }
    let replace = "";
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            if (i == 0) {
                let tekssoal = adabaris[i].slice(adabaris[i].indexOf(".") + 1, adabaris[i].length).replace(/\t/g, "");
                replace += "_PG_" + x + " " + tekssoal + "\n";
            } else {
                replace += "_OPSI-PG_" + x + abjadopsi[i] + " " + adabaris[i].slice(2, adabaris[i].length).replace(/\t/g, "") + "\n";
            }

        }
    }
    // replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_elamaso2 = document.querySelector(".ed_pgc");
btn_elamaso2.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_pgc").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");
    let abjadopsi = ["", "A", "B", "C", ""]
    if (adabaris.length !== 4) {
        alert("Maaf, area yang diblok harus 4 baris. Jika Soal/Opsi Anda lebih satu paragraf, gunakan fitur PETUNJUK");
        return
    }
    let replace = "";
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            if (i == 0) {
                let tekssoal = adabaris[i].slice(adabaris[i].indexOf(".") + 1, adabaris[i].length).replace(/\t/g, "");
                replace += "_PG_" + x + " " + tekssoal + "\n";
            } else {
                replace += "_OPSI-PG-C_" + x + abjadopsi[i] + " " + adabaris[i].slice(2, adabaris[i].length).replace(/\t/g, "") + "\n";
            }

        }
    }
    // replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_elamaso3 = document.querySelector(".ed_pgtabel");
btn_elamaso3.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_pgtabel").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");
    let abjadopsi = ["", "", "A", "B", "C", "D"]
    if (adabaris.length !== 6) {
        alert("Maaf, area yang diblok harus 6 baris (termasuk harus ada header opsi PG). Jika Soal/Opsi Anda lebih satu paragraf, gunakan fitur PETUNJUK \n \n Keterangan lebih lanjut, lihat Repository");
        return
    }
    let replace = "";
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            if (i == 0) {
                let tekssoal = adabaris[i].slice(adabaris[i].indexOf(".") + 1, adabaris[i].length).replace(/\t/g, "");
                replace += "_PG_" + x + " " + tekssoal + "\n";
            } else if (i == 1) {
                replace += "_START-TABEL-OPSI_\n";
                replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|HEADER|> ") + "\n";
            } else {
                replace += "_OPSI-SEL_" + x + abjadopsi[i] + " <|> " + adabaris[i].slice(2, adabaris[i].length).replace(/\t/g, " <|> ") + "\n";
            }
        }
    }

    replace += "_SELESAI-TABEL-OPSI_\n";

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_elamaso4 = document.querySelector(".ed_essay");
btn_elamaso4.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_essay").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    var replace = "_ESSAY-NO_" + x + " " + sel.slice(sel.indexOf(".") + 1, sel.length).replace(/\t/g, "").replace(/\n/g, " <br> ");

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_elamaso5 = document.querySelector(".ed_satubariskan");
btn_elamaso5.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");


    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    var replace = sel.slice(0, sel.length).replace(/\n/g, " <br> ");

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});

let btn_elamaso6 = document.querySelector(".ed_tabel");
btn_elamaso6.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.getElementById("ed_headertabel");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");

    let replace = "\n_START-TABEL_\n";
    if (x.checked) {
        for (i = 0; i < adabaris.length; i++) {
            if (i == 0) {
                replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|HEADER|> ") + "\n";
            } else {
                replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|> ") + "\n";

            }
        }

    } else {
        for (i = 0; i < adabaris.length; i++) {
            replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|> ") + "\n";
        }

    }

    replace += "_SELESAI-TABEL_\n";

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_elamaso7 = document.querySelector(".ed_youtube");
btn_elamaso7.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);


    let replace = "\n_YOUTUBE_" + sel;
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_elamaso8 = document.querySelector(".ed_pemisahkunci");
btn_elamaso8.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);


    let replace = " <||> " + sel;
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});

let btn_elamasosbk = document.querySelector(".ed_sebarankddaritabel");
btn_elamasosbk.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");


    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");

    let replace = "\n_KUNCI-KD_";

    for (i = 0; i < adabaris.length; i++) {
        if (i !== 0) {
            //replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <||> ");//+ "\n";
            replace += adabaris[i].split("\t")[0] + "_" + adabaris[i].split("\t")[1] + ":" + adabaris[i].split("\t")[2];//+ "<||>";
            if (i !== adabaris.length - 1) {
                replace += "<||>"
            }
        }

    }



    // replace += "_SELESAI-TABEL_\n";

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});

/////////////////////////////// source GURUPROFILDANKEHADIRAN.jS ////////////////////////

const aktifkanmodaltambahuser = (x) => {
    idgurubaru = x;
    idguru = parseFloat(idgurubaru) + 2;
}
async function tomboledituser() { //fungsi tombol untuk mengirimkan data ke server
    formedituser.style.display = "none";
    registrasikanedit.style.display = "none";
    prosesloadingdaftaredit.innerHTML = "<i class='fa fa-spin fa-spinner w3-jumbo'></i>";
    let formElem = document.getElementById("formedituser");
    let data = new FormData(formElem)
    data.append("brs", idguru);
    await fetch(linkDataUserWithIdss + "&action=editguru", {
        method: 'post',
        body: data //new FormData(formElem)
    }).then(m => m.json())
        .then(k => {
            //console.log(k);
            prosesloadingdaftaredit.innerHTML = k.info;
        })
        .catch(err => prosesloadingdaftaredit.innerHTML = "Proses Gagal, dengan kode error: " + err);
}
function kirimeditsiswsa() {
    let namaform = document.getElementById("modaledithapus");
    let data = new FormData(namaform);//new FormData(namaform);
    fetch(linkDataUserWithIdss + "&action=editsiswa", {
        method: 'POST',
        body: data
    }).then(m => m.json())
        .then(k => console.log(k.info))
        .catch(err => resultedit.innerHTML = err)

}
function bandingkan() {
    var dataku = $('#formedituser').serialize();
    dataku += "&brs=" + idguru;//keyidpendaftar.innerHTML;
    var link = linkDataUserWithIdss;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", link, true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            prosesloadingdaftaredit.innerHTML = JSON.parse(xhr.responseText);//"Terima kasih, Data Anda berhasil disimpan.";
            console.log(JSON.parse(xhr.responseText))
        }
    };
    xhr.send(dataku);
}
function validationedit() {
    var name = document.getElementById("usernameedit").value;
    var email = document.getElementById("emailedit").value;
    var sekolah = document.getElementById("sekolahedit").value;
    var kelas = document.getElementById("kelasedit").value;
    var dividpoto_potoguru = document.getElementById("idpoto_potoguruedit").innerHTML;
    var emailReg = email.indexOf("@gmail.com"); ///^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
    if (name === '' || email === '' || sekolah === '' || dividpoto_potoguru === '' || kelas === '') {
        alert("Mohon lengkapi formulir ini dengan lengkap! \r\n Terutama: email, Nama Pengguna, Nama Sekolah, Kelas, termasuk poto");
        return false;
    } else if (emailReg < 0) {
        alert("Format email Anda salah. Mohon gunakan akun Gmail ya ...");
        return false;
    } else {
        return true;
    }
}
function ungg_avataredit() {
    var item = document.getElementById("upl_avataredit").files[0]
    var oFReader = new FileReader();
    oFReader.readAsDataURL(item);
    oFReader.onload = function (oFREvent) {
        document.getElementById("avatarkuedit").src = oFREvent.target.result;
        var tempatidpotoguru = document.getElementById("idpoto_potoguruedit")
        tempatidpotoguru.innerHTML = "";
        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "data");
        inputbase64.value = oFREvent.target.result.replace(/^.*,/, '');
        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "filename");
        inputfilename.value = "avatar_" + guru_namalengkapedit.value.toUpperCase().replace(/\s+/, "_");
        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "mimeType")
        inputmimetype.value = "data:image/jpg"; //e.target.result.match(/^.*(?=;)/)[0]
        tempatidpotoguru.appendChild(inputbase64);
        tempatidpotoguru.appendChild(inputfilename);
        tempatidpotoguru.appendChild(inputmimetype);
    }
}
function fnlihatpasswordedit() { // fungsi untuk melihat input password (dalam simbol atau teks biasa)
    var x = document.getElementById("passwordedit");
    var label = document.getElementById("lihatpasswordedit");
    if (x.type === "password") {
        x.type = "text";
        label.innerHTML = "<i class='fa fa-eye-slash'></i> Sembunyikan Password"
    } else {
        x.type = "password";
        label.innerHTML = "<i class='fa fa-eye'></i> Lihat Password"
    }

}
function formatemail() {
    var inpemail = document.getElementById("emailedit")
    inpemail.value = inpemail.value.replace(/\s+/g, "").toLowerCase();
    if (inpemail.value.indexOf("gmail.com") < 0) {
        alert("Maaf, kami hanya menerima email dari akun Google. Misalnya emailanda@gmail.com")
        inpemail.value = ""
    }
}
function fnjangandobel() {
    let cekuser = jsondatapendaftar.filter(x => x.username == usernameedit.value);
    if (cekuser.length == 1) {
        document.getElementById("jangandobeledit").innerHTML = "Maaf, nama ini sudah pernah mendaftar. silakan gunakan username lain.";
        document.getElementById("usernameedit").value = "";
    } else {
        document.getElementById("jangandobeledit").innerHTML = "Username diijinkan";
    }
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
let linkkehadiranguru = "";
let linkdataguru = "";
const kehadiranguru = async () => {
    tampilinsublamangurukelas("kehadiranguru");

    if (jlo.ss_datanilai == "") {
        alert("Notifikasi ini akan mengupgrade laman Anda. Sebaiknya Anda login ulang untuk menghilangkan notifikasi ini setiap kali masuk ke laman piket");

        await fetch("https://script.google.com/macros/s/AKfycbwL1kT_ga2_KMMV1mPdZg_lDfhmur3Q1j5I_ZK7fvNIV7BIhkWF_zL0/exec?id=" + jlo.id)
            .then(m => m.json())
            .then(k => {

                linkkehadiranguru = k.ss_datanilai;
            })

    } else {
        linkkehadiranguru = jlo.ss_datanilai;
    }
    //console.log(linkkehadiranguru);

    if (constidguruabsen === undefined) {
        alert("undefined")
        await fetch(jlo.url_datauser + "?action=getidabsen&idrow=" + idguru + "&idss=" + jlo.ss_datauser)
            .then(m => m.json())
            .then(f => constidguruabsen = f.result)
    } else {
        //alert("oke")
    }

    let labelfor = document.getElementById("tombolabsenguru");
    labelfor.removeAttribute("for");
    labelfor.setAttribute("for", "kamerapiket");
    labelfor.innerHTML = "Ambil Poto";
    labelfor.setAttribute("class", labelfor.className.replace("w3-blue", "w3-green"));
    var poto = document.querySelector('.imgguruabsen')
    poto.src = "/img/192.png";
    // let selekhadir = document.getElementById("pilih_kehadirangurupiket");
    // selekhadir.setAttribute("class", selekhadir.className.replace("w3-show", "w3-hide"));

    //console.log(constidguruabsen);

    //####################################################################################
    // linkdataguru = jlo.url_datauser + "?action=dataguruall&idss=" + jlo.ss_datauser;
    // fetch(linkdataguru).then(m => m.json()).then(k => console.log(k));
    //####################################################################################

    //let idguruabsen = constidguruabsen;
    let d = new Date();
    let dd = d.getDate();
    let m = d.getMonth() + 1;
    let mm = addZero(m);
    let y = d.getFullYear();

    let divket = document.querySelector(".ketabsenkehadiranguru");
    let divimg = document.querySelector(".imgguruabsen");
    let divtombol = document.querySelector("#belumabsenkehadiranguru");
    //divtombol.className.replace(" w3-hide", " w3-show ");
    //belumabsenkehadiranguru 

    let idtanggal = dd + "" + mm + "" + y;//tglStringZero();
    //console.log(idtanggal);
    await fetch(linkkehadiranguru + "?action=cekabsen&idguruabsen=" + constidguruabsen + "&idtanggal=" + idtanggal)
        .then(z => z.json())
        .then(x => {
            // console.log(x);
            let banyakabsen = x.result.length;

            if (banyakabsen == 0) {

                divket.innerHTML = "Anda belum Absen piket hari ini";
                //divtombol.className.replace(" w3-hide", " w3-show ");
                divtombol.style.display = "block";
            } else {
                let disetujui = "";
                if (x.result[banyakabsen - 1].resume == "disetujui") {
                    divtombol.style.display = "none";
                    divimg.src = "https://drive.google.com/uc?export=view&id=" + x.result[banyakabsen - 1].fileContent;
                    disetujui = x.result[banyakabsen - 1].kehadiran + "<br/>(disetujui kepala sekolah)<br/>" + tanggalfulllengkap(x.result[banyakabsen - 1].timestamp);
                } else if (x.result[banyakabsen - 1].resume == "ditolak") {
                    divtombol.style.display = "block";
                    divimg.src = "/img/192.png";
                    disetujui = "Pesan Kepala sekolah : " + x.result[banyakabsen - 1].alasantolak;
                } else {
                    divtombol.style.display = "none";
                    divimg.src = "/img/192.png";
                    disetujui = "Anda sudah absen hari ini, tunggu konfirmasi dari Kepala Sekolah."
                }
                divket.innerHTML = disetujui;

            }

        })
}
const bantuabsenkehadiranguru = () => {

    //define the width to resize e.g 600px
    var resize_width = 150;//without px

    //get the image selected
    var item = document.querySelector('#kamerapiket').files[0];
    let kodedivpoto = document.querySelector("#datakirimgurupiket")

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image();//create a image
        img.src = event.target.result;//result is base64-encoded Data URI
        img.name = event.target.name;//set name (optional)
        img.size = event.target.size;//set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas');//create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

            // //assign it to thumb src
            var poto = document.querySelector('.imgguruabsen')
            poto.src = srcEncoded;


            //document.querySelector('#fileContent').value = srcEncoded;

            //   document.bantukirim.fileContent.value = srcEncoded;
            //document.getElementById("formidentitas").style.display="block";
            /*Now you can send "srcEncoded" to the server and
            convert it to a png o jpg. Also can send
            "el.target.name" that is the file's name.*/

            //buat element input dengan attribute name: data/fileContent, 

            kodedivpoto.innerHTML = "";

            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("id", "hgfileContent");
            inputbase64.value = srcEncoded.replace(/^.*,/, '');

            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("id", "hgfilename");
            inputfilename.value = "avatar_" + constidguruabsen + "_" + new Date().getTime();//StringTanggal(new Date());

            var inputmimetype = document.createElement("input");
            inputmimetype.setAttribute("id", "hgmimeType")
            inputmimetype.value = 'data:image/jpeg';//srcEncoded.match(/^.*(?=;)/)[0]
            //sekarang kita taroh di sini:
            //document.getElementById("idpoto_potoguru").value = srcEncode; //oFREvent.target.result;
            // buat generate input
            kodedivpoto.appendChild(inputbase64);
            kodedivpoto.appendChild(inputfilename);
            kodedivpoto.appendChild(inputmimetype);


        }
        //loginbantu.style.display = "inline-block";
    }


    let labelfor = document.getElementById("tombolabsenguru");
    labelfor.removeAttribute("for");
    labelfor.setAttribute("for", "kirimpotoabsenguru");
    labelfor.innerHTML = "Kirim";
    labelfor.setAttribute("class", labelfor.className.replace("w3-green", "w3-blue"));
    document.querySelector(".ketabsenkehadiranguru").innerHTML = "Poto Siap dikirim";
}
const modalfnkalenderkehadiranguru = () => {

    let x = document.getElementById("daftarpilihbulankehadiranguru").selectedIndex;
    let y = document.getElementById("daftarpilihbulankehadiranguru").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    if (y[x].value == "") {
        alert("Silakan pilih bulannya untuk mengetahui daftar piket Anda.");
        return
    }
    let namabulan = y[x].text;
    modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";

    let notgl = new Date(y[x].value);


    let tyear = notgl.getFullYear();
    let mont = notgl.getMonth();
    let tmont = notgl.getMonth() + 1;
    let tglakhir = daysInMonth(tmont, tyear);
    let lr = 1;

    let elkosong = document.querySelectorAll(".kosongindulu");
    for (let a = 0; a < elkosong.length; a++) {
        elkosong[a].innerHTML = "";
    }

    let ket = [];
    for (let i = 0; i < tglakhir; i++) {
        let dd = new Date(tyear, mont, (i + 1));
        let day = new Date(tyear, mont, (i + 1)).getDay(); /// dimulai dari 0
        let tday = new Date(tyear, mont, (i + 1)).getDate(); /// dimulai dari 0
        let idok = tday + "" + addZero(dd.getMonth() + 1) + "" + dd.getFullYear();
        let col = day + 1;


        let td = document.getElementById("kolomtabel" + lr + "_" + col)
        td.innerHTML = tday;
        //td.innerHTML += (rekapabsensiswabulanan.id == idok) ? `<br><img src=""/>` : `<br>Tidak Hadir`
        td.innerHTML += `<div id="td_${constidguruabsen}_${idok}"></div>`

        if (cocoklibur(dd)) {
            td.setAttribute("style", "background-color:red");
            let tgllibur = tanggalfull(dd) + " = " + keteranganlibur(dd)
            ket.push(tgllibur);
        } else {
            td.removeAttribute("style")
        }

        if (col == 7) {

            lr++
        }
    }
    if (ket.length == 0) {
        ketketliburkehadiranguru.innerHTML = ""
    } else {
        ketketliburkehadiranguru.innerHTML = ket.join("<br>")
    }
    let datee = StringTanggal(notgl);
    dataabsenbulanan(datee, namabulan)
}
const cocoklibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    //let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str)

    if (inte > -1) {
        return true
    } else {
        return false
    }

}
const keteranganlibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str);
    let arr = ''

    if (inte > -1) {
        arr = arrayKetLibur[inte]

    }

    return arr
}
const dataabsenbulanan = async (datee, namabulan) => {
    // console.log(datee + "\n\n" + namabulan)
    await fetch(linkkehadiranguru + "?action=rekapbulan&idguruabsen=" + constidguruabsen + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            //jsonabsenkelasperbulan = k[bulanapi];
            rekapabsensiswabulanan = k[namabulan];//.filter(s => s.name == namasiswa);
            //console.log(k)
            //---------------------------------------------------

            for (var i = 0; i < rekapabsensiswabulanan.length; i++) {
                //mengecek element kodeid
                //kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
                let kodetd = "td_" + encodeURIComponent(rekapabsensiswabulanan[i].idabsen) + "_" + rekapabsensiswabulanan[i].idtanggal;
                //console.log(kodetd)
                var isikehadiran = document.getElementById(kodetd)

                if (isikehadiran == null) {
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
                } else {
                    var link = rekapabsensiswabulanan[i].fileContent;
                    if (link !== "") {
                        var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

                    } else {

                        var linksplitt = idlogo;
                    }


                    var cekdiv = document.getElementById(kodetd);
                    if (cekdiv != null) {
                        //document.getElementById(kodetd).removeAttribute("onclick");

                        // isikehadiran.innerHTML = "<div style='width:22px;height:32px;cursor:pointer;border:1px solid blue'><a href='" + jsonabsenkelasperbulan[i].fileContent + "' target='_blank'><img src='https://drive.google.com/uc?export=view&id=" + linksplitt + "'  style='width:20px; height:30px'  alt='poto'><br/>" + jsonabsenkelasperbulan[i].kehadiran + "</a></div>";
                        isikehadiran.innerHTML = `<img class="w3-image" src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotoguru(this,'${rekapabsensiswabulanan[i].kehadiran}<br/>${rekapabsensiswabulanan[i].timestamp}')"/><br/>${rekapabsensiswabulanan[i].kehadiran}`;

                    }
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML +="";
                }

            }

        }).catch(er => {
            console.log(er)
        })

}
const klikpotoguru = (el, pesan) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";
    document.getElementById("pesanpreviewpotoabsen").innerHTML = pesan.split("<br/>")[0] + "<br/>" + tanggalfulllengkap(pesan.split("<br/>")[1])

}
const gurukirimabsen = () => {
    let x = document.getElementById("pilih_kehadirangurupiket").selectedIndex;
    let y = document.getElementById("pilih_kehadirangurupiket").options;
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idok = b + "" + addZero(c) + "" + d;
    document.querySelector(".ketabsenkehadiranguru").innerHTML = "<i class='fa fa-refresh fa-spin w3-large'></i>";
    belumabsenkehadiranguru.style.display = "none";
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    //alert("data yang dibutuhkan:\n\n jenis kehadiran" + y[x].value);
    //guruisiabsen

    let hadir = y[x].value;
    let database64 = document.getElementById("hgfileContent").value;
    let tipe = document.getElementById("hgmimeType").value;//.replace("data:", "");
    let filename = document.getElementById("hgfilename").value;
    //let siapa = constidguruabsen;
    let data = new FormData();
    data.append("database64", database64);
    data.append("tipe", tipe);
    data.append("filename", filename)
    data.append("hadir", hadir);
    data.append("idok", idok);
    data.append("idguruabsen", constidguruabsen);
    fetch(linkkehadiranguru + "?action=guruisiabsen", { method: 'post', body: data })
        .then(m => m.json())
        .then(f => {
            alert(f.result.replace('<br/>', '\n'));
            document.querySelector(".ketabsenkehadiranguru").innerHTML = f.result;
            kehadiranguru();
            //console.log(f);
        })
        .catch(er => {
            alert(er);
            document.querySelector(".ketabsenkehadiranguru").innerHTML = er;
            belumabsenkehadiranguru.style.display = "block";

        })
}
function pindahsemester() {
    let x = document.getElementById("selectpindahsemester").options;
    let y = document.getElementById("selectpindahsemester").selectedIndex;
    let val = x[y].value;
    let teks = x[y].text;
    if (val == "1") {
        let confirmm = confirm(`Anda yakin ingin melanjutkan ke WebbApp elamaso ${teks}? Klik OK untuk melanjutkan atau CANCEL untuk membatalkan.`);
        if (confirmm) {
            window.location.replace(web2021semester1)

        }
    }
}

///////////////////////////////////// source KURIKULUM.JS
function kurikulum() {
    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel");//.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }

    tampilinsublamangurukelas("kurikulum");
    let tabkd = document.querySelector(".classtabkd");
    let tabkkm = document.querySelector(".classtabkkm");
    let tabupl = document.querySelector(".classtabuploadkurikulum");
    tabkd.innerHTML = "Kompetensi Dasar <i class='fa fa-spin fa-spinner'></i>"
    tabkkm.innerHTML = "KKM <i class='fa fa-spin fa-spinner'></i>"
    tabupl.innerHTML = "Upload Kurikulum <i class='fa fa-spin fa-spinner'></i>"

    kurikulum_kd.style.display = "block";
    //document.getElementById("kurikulum_kd").click();
    //------------------------------------------
    let islam = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    let bolislam = (islam == 0) ? false : true;

    let kristen = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    let bolkristen = (kristen == 0) ? false : true;

    let katolik = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    let bolkatolik = (katolik == 0) ? false : true;

    let hindu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    let bolhindu = (hindu == 0) ? false : true;

    let budha = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    let bolbudha = (budha == 0) ? false : true;
    let khonghucu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khong Hu Cu" || lk.pd_agama == "KHONG HUCU" || lk.pd_agama == "Khong Hucu" || lk.pd_agama == "Khong hucu") {
            return true;
        }
    }).length;
    let bolkhonghucu = (khonghucu == 0) ? false : true;


    let divkurikulum = document.getElementById("kurikulum_kd");
    divkurikulum.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'></i>";


    let tekshtml = "<h3> Kompetensi Dasar</h3>Sebaran Kompetensi Dasar<hr/>";
    tekshtml += `<button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><hr/>`;
    let tragama = "";
    let elkkm = "";


    if (bolislam) {
        tragama += `<tr><td>Pendidikan Agama Islam dan Budi Pekerti</td><td>PAI</td>
        <td>
            <label for="kd3_PAI_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.1" name="kd3_PAI_3.1" />
                3.1
            </label><br>
            <label for="kd3_PAI_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.2" name="kd3_PAI_3.2" />
                3.2
                </label><br>
            <label for="kd3_PAI_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.3" name="kd3_PAI_3.3" />
                3.3
                </label><br>
            <label for="kd3_PAI_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.4" name="kd3_PAI_3.4" />
                3.4
            </label><br>
            <label for="kd3_PAI_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.5" name="kd3_PAI_3.5" />
                3.5
            </label><br>
            <label for="kd3_PAI_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.6" name="kd3_PAI_3.6" />
                3.6
                </label><br>
            <label for="kd3_PAI_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.7" name="kd3_PAI_3.7" />
                3.7
                </label><br>
            <label for="kd3_PAI_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.8" name="kd3_PAI_3.8" />
                3.8
            </label><br>
            <label for="kd3_PAI_3.9">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.9" name="kd3_PAI_3.9" />
                3.9
            </label><br>
            <label for="kd3_PAI_3.10">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.10" name="kd3_PAI_3.10" />
                3.10
                </label><br>
            <label for="kd3_PAI_3.11">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.11" name="kd3_PAI_3.11" />
                3.11
                </label><br>
            <label for="kd3_PAI_3.12">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.12" name="kd3_PAI_3.12" />
                3.12
            </label><br>
            <label for="kd3_PAI_3.13">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.13" name="kd3_PAI_3.13" />
                3.13
            </label><br>
            <label for="kd3_PAI_3.14">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.14" name="kd3_PAI_3.14" />
                3.14
                </label><br>
            <label for="kd3_PAI_3.15">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.15" name="kd3_PAI_3.15" />
                3.15
                </label><br>
            <label for="kd3_PAI_3.16">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.16" name="kd3_PAI_3.16" />
                3.16
            </label><br>
             <label for="kd3_PAI_3.17">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.17" name="kd3_PAI_3.17" />
                3.17
                </label><br>
            <label for="kd3_PAI_3.18">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.18" name="kd3_PAI_3.18" />
                3.18
            </label><br>
            <label for="kd3_PAI_3.19">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.19" name="kd3_PAI_3.19" />
                3.19
            </label><br>
            <label for="kd3_PAI_3.20">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.20" name="kd3_PAI_3.20" />
                3.20
                </label><br>
            <label for="kd3_PAI_3.21">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.21" name="kd3_PAI_3.21" />
                3.21
                </label>
        </td>
        <td>
        
        <label for="kd4_PAI_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.1" name="kd4_PAI_4.1" />
        4.1
        </label><br>
        <label for="kd4_PAI_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.2" name="kd4_PAI_4.2" />
        4.2
        </label><br>
        <label for="kd4_PAI_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.3" name="kd4_PAI_4.3" />
        4.3
        </label><br>
        <label for="kd4_PAI_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.4" name="kd4_PAI_4.4" />
        4.4
        </label><br>
        <label for="kd4_PAI_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.5" name="kd4_PAI_4.5" />
        4.5
        </label><br>
        <label for="kd4_PAI_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.6" name="kd4_PAI_4.6" />
        4.6
        </label><br>
        <label for="kd4_PAI_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.7" name="kd4_PAI_4.7" />
        4.7
        </label><br>
        <label for="kd4_PAI_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.8" name="kd4_PAI_4.8" />
        4.8
        </label><br>
        <label for="kd4_PAI_4.9">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.9" name="kd4_PAI_4.9" />
        4.9
        </label><br>
        <label for="kd4_PAI_4.10">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_3.10" name="kd4_PAI_4.10" />
        4.10
        </label><br>
        <label for="kd4_PAI_4.11">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.11" name="kd4_PAI_4.11" />
        4.11
        </label><br>
        <label for="kd4_PAI_4.12">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.12" name="kd4_PAI_4.12" />
        4.12
        </label><br>
        <label for="kd4_PAI_4.13">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.13" name="kd4_PAI_4.13" />
        4.13
        </label><br>
        <label for="kd4_PAI_4.14">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.14" name="kd4_PAI_4.14" />
        4.14
        </label><br>
        <label for="kd4_PAI_4.15">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.15" name="kd4_PAI_4.15" />
        4.15
        </label><br>
        <label for="kd4_PAI_4.16">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.16" name="kd4_PAI_4.16" />
        4.16
        </label><br>
        <label for="kd4_PAI_4.17">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.17" name="kd4_PAI_4.17" />
        4.17
        </label><br>
        <label for="kd4_PAI_4.18">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.18" name="kd4_PAI_4.18" />
        4.18
        </label><br>
        <label for="kd4_PAI_4.19">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.19" name="kd4_PAI_4.19" />
        4.19
        </label><br>
        <label for="kd4_PAI_4.20">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.20" name="kd4_PAI_4.20" />
        4.20
        </label><br>
        <label for="kd4_PAI_4.21">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.21" name="kd4_PAI_4.21" />
        4.21
        </label>
        </td>
        </tr>`;
        elkkm += `<tr><td>PAI</td><td contenteditable="true" id="namamapelraport_PAI">Pendidikan Agama Islam dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PAI">00</td></tr>`;
    }
    if (bolkristen) {
        tragama += `<tr><td>Pendidikan Agama Kristen dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Kristen sebanyak ${kristen} siswa.<sub></td><td>PKRIS</td>
        <td>
            <label for="kd3_PKRIS_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.1" name="kd3_PKRIS_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKRIS_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.2" name="kd3_PKRIS_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKRIS_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.3" name="kd3_PKRIS_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKRIS_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.4" name="kd3_PKRIS_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PKRIS_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.1" name="kd4_PKRIS_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKRIS_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.2" name="kd4_PKRIS_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKRIS_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.3" name="kd4_PKRIS_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKRIS_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.4" name="kd4_PKRIS_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PKRIS</td><td contenteditable="true" id="namamapelraport_PKRIS">Pendidikan Agama Kristen dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKRIS">00</td></tr>`;
    }
    if (bolkatolik) {
        tragama += `<tr><td>Pendidikan Agama Katholik dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Katolik sebanyak ${katolik} siswa.<sub></td><td>PKATO</td>
        <td>
            <label for="kd3_PKATO_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.1" name="kd3_PKATO_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKATO_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.2" name="kd3_PKATO_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKATO_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.3" name="kd3_PKATO_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKATO_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.4" name="kd3_PKATO_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKATO_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.5" name="kd3_PKATO_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKATO_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.6" name="kd3_PKATO_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKATO_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.7" name="kd3_PKATO_3.7" />
                3.7
                </label><br>
            <label for="kd3_PKATO_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.8" name="kd3_PKATO_3.8" />
                3.8
            </label><br>
           
        </td>
        <td>
        
        <label for="kd4_PKATO_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.1" name="kd4_PKATO_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKATO_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.2" name="kd4_PKATO_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKATO_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.3" name="kd4_PKATO_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKATO_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.4" name="kd4_PKATO_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKATO_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.5" name="kd4_PKATO_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKATO_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.6" name="kd4_PKATO_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKATO_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.7" name="kd4_PKATO_4.7" />
        4.7
        </label><br>
        <label for="kd4_PKATO_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.8" name="kd4_PKATO_4.8" />
        4.8
        </label><br>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKATO</td><td contenteditable="true" id="namamapelraport_PKATO">Pendidikan Agama Katholik dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKATO">00</td></tr>`;
    }
    if (bolbudha) {
        tragama += `<tr><td>Pendidikan Agama Budha dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Budha sebanyak ${budha} siswa.<sub></td><td>PBUDH</td>
        <td>
            <label for="kd3_PBUDH_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.1" name="kd3_PBUDH_3.1" />
                3.1
            </label><br>
            <label for="kd3_PBUDH_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.2" name="kd3_PBUDH_3.2" />
                3.2
                </label><br>
            <label for="kd3_PBUDH_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.3" name="kd3_PBUDH_3.3" />
                3.3
                </label><br>
            <label for="kd3_PBUDH_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.4" name="kd3_PBUDH_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PBUDH_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.1" name="kd4_PBUDH_4.1" />
        4.1
        </label><br>
        <label for="kd4_PBUDH_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.2" name="kd4_PBUDH_4.2" />
        4.2
        </label><br>
        <label for="kd4_PBUDH_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.3" name="kd4_PBUDH_4.3" />
        4.3
        </label><br>
        <label for="kd4_PBUDH_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.4" name="kd4_PBUDH_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PBUDH</td><td contenteditable="true" id="namamapelraport_PBUDH">Pendidikan Agama Budha dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PBUDH">00</td></tr>`;
    }
    if (bolhindu) {
        tragama += `<tr><td>Pendidikan Agama Hindu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Hindu sebanyak ${hindu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PHIND_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.1" name="kd3_PHIND_3.1" />
                3.1
            </label><br>
            <label for="kd3_PHIND_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.2" name="kd3_PHIND_3.2" />
                3.2
                </label><br>
            <label for="kd3_PHIND_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.3" name="kd3_PHIND_3.3" />
                3.3
                </label><br>
            <label for="kd3_PHIND_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.4" name="kd3_PHIND_3.4" />
                3.4
            </label><br>
            <label for="kd3_PHIND_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.5" name="kd3_PHIND_3.5" />
                3.5
            </label><br>
            <label for="kd3_PHIND_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.6" name="kd3_PHIND_3.6" />
                3.6
                </label><br>
            <label for="kd3_PHIND_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.7" name="kd3_PHIND_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PHIND_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.1" name="kd4_PHIND_4.1" />
        4.1
        </label><br>
        <label for="kd4_PHIND_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.2" name="kd4_PHIND_4.2" />
        4.2
        </label><br>
        <label for="kd4_PHIND_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.3" name="kd4_PHIND_4.3" />
        4.3
        </label><br>
        <label for="kd4_PHIND_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.4" name="kd4_PHIND_4.4" />
        4.4
        </label><br>
        <label for="kd4_PHIND_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.5" name="kd4_PHIND_4.5" />
        4.5
        </label><br>
        <label for="kd4_PHIND_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.6" name="kd4_PHIND_4.6" />
        4.6
        </label><br>
        <label for="kd4_PHIND_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.7" name="kd4_PHIND_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PHIND</td><td contenteditable="true" id="namamapelraport_PHIND">Pendidikan Agama Hindu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PHIND">00</td></tr>`;
    }
    if (bolkhonghucu) {
        tragama += `<tr><td>Pendidikan Agama Khonghucu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Khonghucu sebanyak ${khonghucu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PKONG_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.1" name="kd3_PKONG_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKONG_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.2" name="kd3_PKONG_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKONG_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.3" name="kd3_PKONG_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKONG_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.4" name="kd3_PKONG_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKONG_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.5" name="kd3_PKONG_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKONG_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.6" name="kd3_PKONG_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKONG_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.7" name="kd3_PKONG_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PKONG_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.1" name="kd4_PKONG_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKONG_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.2" name="kd4_PKONG_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKONG_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.3" name="kd4_PKONG_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKONG_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.4" name="kd4_PKONG_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKONG_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.5" name="kd4_PKONG_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKONG_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.6" name="kd4_PKONG_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKONG_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.7" name="kd4_PKONG_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKONG</td><td contenteditable="true" id="namamapelraport_PKONG">Pendidikan Agama Khonghucu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKONG">00</td></tr>`;
    }

    if (!bolislam && !bolkristen && !bolkatolik && !bolbudha && !bolhindu && !bolkhonghucu) {
        tragama += `
        <tr>
            <td>Tidak terdeteksi adanya isian Agama di kelas Anda</td>
            <td>???</td>
            <td>Silakan lengkapi data siswa Anda</td>
            <td>Silakan lengkapi data siswa Anda</td>
        </tr>
        `;
        elkkm += `<tr><td>AGAMA</td><td>Tidak terdeteksi data agama di Data Siswa Anda</td><td>00</td=></tr>`;
    }

    let ipsipa = "";
    if (idJenjang >= 4) {
        ipsipa = `
        <tr>
        <td>Ilmu Pengetahuan Alam</td>
        <td>IPA</td>
        <td>
        <label for="kd3_IPA_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.1" name="kd3_IPA_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPA_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.2" name="kd3_IPA_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPA_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.3" name="kd3_IPA_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPA_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.4" name="kd3_IPA_3.4" />
        3.4
    </label><br>
    <label for="kd3_IPA_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.5" name="kd3_IPA_3.5" />
        3.5
    </label><br>
    <label for="kd3_IPA_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.6" name="kd3_IPA_3.6" />
        3.6
        </label><br>
    <label for="kd3_IPA_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.7" name="kd3_IPA_3.7" />
        3.7
        </label><br>
    <label for="kd3_IPA_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.8" name="kd3_IPA_3.8" />
        3.8
    </label><br>
    <label for="kd3_IPA_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.9" name="kd3_IPA_3.9" />
        3.9
</label>
    
 
        </td><td>
        <label for="kd4_IPA_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.1" name="kd4_IPA_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPA_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.2" name="kd4_IPA_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPA_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.3" name="kd4_IPA_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPA_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.4" name="kd4_IPA_4.4" />
        4.4
    </label><br>
    <label for="kd4_IPA_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.5" name="kd4_IPA_4.5" />
        4.5
    </label><br>
    <label for="kd4_IPA_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.6" name="kd4_IPA_4.6" />
        4.6
        </label><br>
    <label for="kd4_IPA_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.7" name="kd4_IPA_4.7" />
        4.7
        </label><br>
    <label for="kd4_IPA_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.8" name="kd4_IPA_4.8" />
        4.8
    </label><br>
    <label for="kd4_IPA_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.9" name="kd4_IPA_4.9" />
        4.9
    </label><br>
        </td>

    </tr> 
    <tr>    
        <td>Ilmu Pengetahuan Sosial</td>
        <td>IPS</td>
        <td>
        <label for="kd3_IPS_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.1" name="kd3_IPS_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPS_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.2" name="kd3_IPS_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPS_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.3" name="kd3_IPS_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPS_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.4" name="kd3_IPS_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_IPS_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.1" name="kd4_IPS_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPS_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.2" name="kd4_IPS_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPS_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.3" name="kd4_IPS_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPS_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.4" name="kd4_IPS_4.4" />
        4.4
    </label><br>
    
        </td>
    </tr> 
        `
    }

    tekshtml += `<div style="overflow-x:auto">
    <table class='versi-table' id="datadatakdraport">
    <tr >
        <th>Mata Pelajaran</th>
        <th>Kode Mapel</th>
        <th>Kompetensi Pengetahuan<br> (KI-3)</the>
        <th>Kompetensi Keterampilan <br>(KI-4)</thtyle>
    </tr>
    ${tragama}
    <tr>
        <td>Pendidikan Kewarganegaraan</td>
        <td>PKN</td>
    
        <td>
        <label for="kd3_PKN_3.1">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.1" name="kd3_PKN_3.1" />
            3.1
        </label><br>
        <label for="kd3_PKN_3.2">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.2" name="kd3_PKN_3.2" />
            3.2
            </label><br>
        <label for="kd3_PKN_3.3">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.3" name="kd3_PKN_3.3" />
            3.3
            </label><br>
        <label for="kd3_PKN_3.4">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.4" name="kd3_PKN_3.4" />
            3.4
        </label><br>
                   
       
    </td>
    <td>
            <label for="kd4_PKN_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.1" name="kd4_PKN_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKN_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.2" name="kd4_PKN_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKN_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.3" name="kd4_PKN_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKN_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.4" name="kd4_PKN_4.4" />
        4.4
        </label><br>
    
            </td>
        </tr>
    <tr>
        <td> Bahasa Indonesia
        </td><td>BINDO</td><td>
        <label for="kd3_BINDO_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.1" name="kd3_BINDO_3.1" />
        3.1
    </label><br>
    <label for="kd3_BINDO_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.2" name="kd3_BINDO_3.2" />
        3.2
        </label><br>
    <label for="kd3_BINDO_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.3" name="kd3_BINDO_3.3" />
        3.3
        </label><br>
    <label for="kd3_BINDO_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.4" name="kd3_BINDO_3.4" />
        3.4
    </label><br>
    <label for="kd3_BINDO_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.5" name="kd3_BINDO_3.5" />
        3.5
    </label><br>
    <label for="kd3_BINDO_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.6" name="kd3_BINDO_3.6" />
        3.6
        </label><br>
    <label for="kd3_BINDO_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.7" name="kd3_BINDO_3.7" />
        3.7
        </label><br>
    <label for="kd3_BINDO_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.8" name="kd3_BINDO_3.8" />
        3.8
    </label><br>
    <label for="kd3_BINDO_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.9" name="kd3_BINDO_3.9" />
        3.9
    </label><br>
    <label for="kd3_BINDO_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.10" name="kd3_BINDO_3.10" />
        3.10
        </label><br>
    <label for="kd3_BINDO_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.11" name="kd3_BINDO_3.11" />
        3.11
        </label><br>
 
        </td><td>
        <label for="kd4_BINDO_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.1" name="kd4_BINDO_4.1" />
        4.1
    </label><br>
    <label for="kd4_BINDO_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.2" name="kd4_BINDO_4.2" />
        4.2
        </label><br>
    <label for="kd4_BINDO_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.3" name="kd4_BINDO_4.3" />
        4.3
        </label><br>
    <label for="kd4_BINDO_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.4" name="kd4_BINDO_4.4" />
        4.4
    </label><br>
    <label for="kd4_BINDO_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.5" name="kd4_BINDO_4.5" />
        4.5
    </label><br>
    <label for="kd4_BINDO_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.6" name="kd4_BINDO_4.6" />
        4.6
        </label><br>
    <label for="kd4_BINDO_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.7" name="kd4_BINDO_4.7" />
        4.7
        </label><br>
    <label for="kd4_BINDO_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.8" name="kd4_BINDO_4.8" />
        4.8
    </label><br>
    <label for="kd4_BINDO_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.9" name="kd4_BINDO_4.9" />
        4.9
    </label><br>
    <label for="kd4_BINDO_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.10" name="kd4_BINDO_4.10" />
        4.10
        </label><br>
    <label for="kd4_BINDO_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.11" name="kd4_BINDO_4.11" />
        4.11
        </label><br>
 
        </td>
    </tr>
    <tr>
        <td>Matematika</td>
        <td>MTK</td>
        <td>
        <label for="kd3_MTK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.1" name="kd3_MTK_3.1" />
        3.1
    </label><br>
    <label for="kd3_MTK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.2" name="kd3_MTK_3.2" />
        3.2
        </label><br>
    <label for="kd3_MTK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.3" name="kd3_MTK_3.3" />
        3.3
        </label><br>
    <label for="kd3_MTK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.4" name="kd3_MTK_3.4" />
        3.4
    </label><br>
    <label for="kd3_MTK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.5" name="kd3_MTK_3.5" />
        3.5
    </label><br>
    <label for="kd3_MTK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.6" name="kd3_MTK_3.6" />
        3.6
        </label><br>
    <label for="kd3_MTK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.7" name="kd3_MTK_3.7" />
        3.7
        </label><br>
    <label for="kd3_MTK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.8" name="kd3_MTK_3.8" />
        3.8
    </label><br>
    <label for="kd3_MTK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.9" name="kd3_MTK_3.9" />
        3.9
    </label><br>
    <label for="kd3_MTK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.10" name="kd3_MTK_3.10" />
        3.10
        </label><br>
    <label for="kd3_MTK_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.11" name="kd3_MTK_3.11" />
        3.11
        </label><br>
<label for="kd3_MTK_3.12">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.12" name="kd3_MTK_3.12" />
        3.12
        </label><br>
    <label for="kd3_MTK_3.13">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.13" name="kd3_MTK_3.13" />
        3.13
        </label><br>
 
        </td>
        <td>
        <label for="kd4_MTK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.1" name="kd4_MTK_4.1" />
        4.1
    </label><br>
    <label for="kd4_MTK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.2" name="kd4_MTK_4.2" />
        4.2
        </label><br>
    <label for="kd4_MTK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.3" name="kd4_MTK_4.3" />
        4.3
        </label><br>
    <label for="kd4_MTK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.4" name="kd4_MTK_4.4" />
        4.4
    </label><br>
    <label for="kd4_MTK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.5" name="kd4_MTK_4.5" />
        4.5
    </label><br>
    <label for="kd4_MTK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.6" name="kd4_MTK_4.6" />
        4.6
        </label><br>
    <label for="kd4_MTK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.7" name="kd4_MTK_4.7" />
        4.7
        </label><br>
    <label for="kd4_MTK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.8" name="kd4_MTK_4.8" />
        4.8
    </label><br>
    <label for="kd4_MTK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.9" name="kd4_MTK_4.9" />
        4.9
    </label><br>
    <label for="kd4_MTK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.10" name="kd4_MTK_4.10" />
        4.10
        </label><br>
    <label for="kd4_MTK_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.11" name="kd4_MTK_4.11" />
        4.11
        </label><br>
<label for="kd4_MTK_4.12">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.12" name="kd4_MTK_4.12" />
        4.12
        </label><br>
    <label for="kd4_MTK_4.13">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.13" name="kd4_MTK_4.13" />
        4.13
        </label><br>
 
        </td>
    </tr> 
   ${ipsipa}
    <tr>
        <td>Seni Budaya dan Prakarya</td>
        <td>SBDP</td>
        <td>
        <label for="kd3_SBDP_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.1" name="kd3_SBDP_3.1" />
        3.1
    </label><br>
    <label for="kd3_SBDP_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.2" name="kd3_SBDP_3.2" />
        3.2
        </label><br>
    <label for="kd3_SBDP_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.3" name="kd3_SBDP_3.3" />
        3.3
        </label><br>
    <label for="kd3_SBDP_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.4" name="kd3_SBDP_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_SBDP_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.1" name="kd4_SBDP_4.1" />
        4.1
    </label><br>
    <label for="kd4_SBDP_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.2" name="kd4_SBDP_4.2" />
        4.2
        </label><br>
    <label for="kd4_SBDP_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.3" name="kd4_SBDP_4.3" />
        4.3
        </label><br>
    <label for="kd4_SBDP_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.4" name="kd4_SBDP_4.4" />
        4.4
    </label><br>
        </td>
    </tr> 
    <tr>
        <td>Pendidikan Jasmani dan Kesehatan<br>PJOK</td>
        <td>PJOK</td>
        <td>
        <label for="kd3_PJOK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.1" name="kd3_PJOK_3.1" />
        3.1
    </label><br>
    <label for="kd3_PJOK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.2" name="kd3_PJOK_3.2" />
        3.2
        </label><br>
    <label for="kd3_PJOK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.3" name="kd3_PJOK_3.3" />
        3.3
        </label><br>
    <label for="kd3_PJOK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.4" name="kd3_PJOK_3.4" />
        3.4
    </label><br>
    <label for="kd3_PJOK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.5" name="kd3_PJOK_3.5" />
        3.5
    </label><br>
    <label for="kd3_PJOK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.6" name="kd3_PJOK_3.6" />
        3.6
        </label><br>
    <label for="kd3_PJOK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.7" name="kd3_PJOK_3.7" />
        3.7
        </label><br>
    <label for="kd3_PJOK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.8" name="kd3_PJOK_3.8" />
        3.8
    </label><br>
    <label for="kd3_PJOK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.9" name="kd3_PJOK_3.9" />
        3.9
    </label><br>
    <label for="kd3_PJOK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.10" name="kd3_PJOK_3.10" />
        3.10
        </label><br>
   
 
        </td>
        <td>
        <label for="kd4_PJOK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.1" name="kd4_PJOK_4.1" />
        4.1
    </label><br>
    <label for="kd4_PJOK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.2" name="kd4_PJOK_4.2" />
        4.2
        </label><br>
    <label for="kd4_PJOK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.3" name="kd4_PJOK_4.3" />
        4.3
        </label><br>
    <label for="kd4_PJOK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.4" name="kd4_PJOK_4.4" />
        4.4
    </label><br>
    <label for="kd4_PJOK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.5" name="kd4_PJOK_4.5" />
        4.5
    </label><br>
    <label for="kd4_PJOK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.6" name="kd4_PJOK_4.6" />
        4.6
        </label><br>
    <label for="kd4_PJOK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.7" name="kd4_PJOK_4.7" />
        4.7
        </label><br>
    <label for="kd4_PJOK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.8" name="kd4_PJOK_4.8" />
        4.8
    </label><br>
    <label for="kd4_PJOK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.9" name="kd4_PJOK_4.9" />
        4.9
    </label><br>
    <label for="kd4_PJOK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.10" name="kd4_PJOK_4.10" />
        4.10
        </label><br>
        </td>
    </tr>
    <tr>
        <td>Bahasa Sunda</td>
        <td>BSUND</td>
        <td>
        <label for="kd3_BSUND_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.1" name="kd3_BSUND_3.1" />
        3.1
    </label><br>
    <label for="kd3_BSUND_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.2" name="kd3_BSUND_3.2" />
        3.2
        </label><br>
    <label for="kd3_BSUND_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.3" name="kd3_BSUND_3.3" />
        3.3
        </label><br>
    <label for="kd3_BSUND_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.4" name="kd3_BSUND_3.4" />
        3.4
    </label><br>
    <label for="kd3_BSUND_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.5" name="kd3_BSUND_3.5" />
        3.5
    </label><br>
    <label for="kd3_BSUND_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.6" name="kd3_BSUND_3.6" />
        3.6
        </label><br>
    <label for="kd3_BSUND_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.7" name="kd3_BSUND_3.7" />
        3.7
        </label><br>
    <label for="kd3_BSUND_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.8" name="kd3_BSUND_3.8" />
        3.8
    </label><br>
    <label for="kd3_BSUND_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.9" name="kd3_BSUND_3.9" />
        3.9
    </label><br>
    
 
        </td>
        <td>
        <label for="kd4_BSUND_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.1" name="kd4_BSUND_4.1" />
        4.1
    </label><br>
    <label for="kd4_BSUND_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.2" name="kd4_BSUND_4.2" />
        4.2
        </label><br>
    <label for="kd4_BSUND_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.3" name="kd4_BSUND_4.3" />
        4.3
        </label><br>
    <label for="kd4_BSUND_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.4" name="kd4_BSUND_4.4" />
        4.4
    </label><br>
    <label for="kd4_BSUND_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.5" name="kd4_BSUND_4.5" />
        4.5
    </label><br>
    <label for="kd4_BSUND_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.6" name="kd4_BSUND_4.6" />
        4.6
        </label><br>
    <label for="kd4_BSUND_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.7" name="kd4_BSUND_4.7" />
        4.7
        </label><br>
    <label for="kd4_BSUND_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.8" name="kd4_BSUND_4.8" />
        4.8
    </label><br>
    <label for="kd4_BSUND_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.9" name="kd4_BSUND_4.9" />
        4.9
    </label><br>
    
        </td>
    </tr>
    </table></div>`

    kurikulum_kkm.innerHTML = `<h3>Data Kriteria Ketuntasan Minimal (KKM)</h3>
    <button class="w3-button w3-blue" onclick="fnprinttabelkkm('printtabelkkm,DATA KKM KELAS ${idJenjang}, SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel},${StringTanggal(new Date())}')"><i class="fa fa-print"></i> Cetak</button>
   
    <hr/><div id="printtabelkkm"><center><table class="versi-table" id="ttttt">
        <tr>
            <th>Kode Mapel</th>
            <th>Identitas Mapel<br/><sub>Edit identitas mapel ini untuk identitas Mapel di Buku Raport</sub></th>
            <th>Nilai KKM</th>
        </tr>
        ${elkkm}
        <tr><td>PKN</td><td contenteditable="true" id="namamapelraport_PKN">Pendidikan Kewarganegaraan</td><td contenteditable="true" id="angkakkm_PKN">00</td></tr>
        <tr><td>BINDO</td><td contenteditable="true" id="namamapelraport_BINDO">Bahasa Indonesia</td><td contenteditable="true" id="angkakkm_BINDO">00</td></tr>
        <tr><td>MTK</td><td contenteditable="true" id="namamapelraport_MTK">Matematika</td><td contenteditable="true" id="angkakkm_MTK">00</td></tr>
        <tr><td>IPA</td><td contenteditable="true" id="namamapelraport_IPA">Ilmu Pengetahuan Alam</td><td contenteditable="true" id="angkakkm_IPA">00</td></tr>
        <tr><td>IPS</td><td contenteditable="true" id="namamapelraport_IPS">Ilmu Pengetahuan Sosial</td><td contenteditable="true" id="angkakkm_IPS">00</td></tr>
        <tr><td>PJOK</td><td contenteditable="true" id="namamapelraport_PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan</td><td contenteditable="true" id="angkakkm_PJOK">00</td></tr>
        <tr><td>SBDP</td><td contenteditable="true" id="namamapelraport_SBDP">Seni Budaya dan Prakarya</td><td contenteditable="true" id="angkakkm_SBDP">00</td></tr>
        <tr><td>BSUND</td><td contenteditable="true" id="namamapelraport_BSUND">Bahasa Sunda</td><td contenteditable="true" id="angkakkm_BSUND">00</td></tr>
    </table></center></div>
    <button onclick="fnsimpanidkkm()" class="w3-button w3-green w3-right">Simpan Perubahan</button><hr/>
    Keterangan: <sub class="w3-text-blue">Di tabel ini, Anda dapat mengedit nama mata pelajaran yang akan ditampilkan di Buku Raport Siswa. Di sini pula, Anda dapat mengubah KKM masing-masing mata pelajaran yang nantinya setiap KD akan otomatis menyesuaikan angka KKM yang Anda Edit di KKM yang Anda unggah di UPLOAD DATA (Setelah mengeklik tombol SIMPAN)</sub>
    
    `

    let tas = "kelas" + idJenjang;
    fetch(linkmateri + "&action=cekdkkm&tab=" + tas)
        .then(m => m.json())
        .then(k => {

            let statusunggah = (k.unggah == "Jenjang Kelas Anda sudah mengunggah KKM dan KD") ? true : false;
            let data = k.result;

            if (statusunggah) {

                let teks = "<hr/><div style='overflow-x:auto'><table class='versi-table w3-small tabelkkmkd'><tr><th>Mata Pelajaran</th><th>KD-3</th><th>Indikator KI-3 <br>(Pengetahuan)</th><th>KD-4</th><th>Indikator KI-4 <br>(Keterampilan)</th><th>KKM</th></tr>";
                for (i = 0; i < data.length; i++) {
                    let divelkkm = document.getElementById("angkakkm_" + data[i].mapel);
                    if (divelkkm !== null) {
                        divelkkm.innerHTML = data[i].kkm;
                    }
                    // teks += "<tr><td>" + data[i].mapel + "</td><td>" + data[i].kd3 + "</td><td contenteditable='true'>" + data[i].indikatorkd3 + "</td><td>" + data[i].kd4 + "</td><td  contenteditable='true'>" + data[i].indikatorkd4 + "</td><td  contenteditable='true'>" + data[i].kkm + "</td></tr>";
                    teks += `<tr><td>${data[i].mapel}</td><td>${data[i].kd3}</td><td contenteditable="true" id="deskripsikd3_${data[i].mapel}_${data[i].kd3}">${data[i].indikatorkd3}</td><td>${data[i].kd4}</td><td contenteditable="true" id="deskripsikd4_${data[i].mapel}_${data[i].kd4}">${data[i].indikatorkd4}</td><td contenteditable="true">${data[i].kkm}</td></tr>`;
                    let truekd3 = data[i].cekliskd3;
                    let truekd4 = data[i].cekliskd4;
                    let iddiv = "kd3_" + data[i].mapel + "_" + data[i].kd3;
                    let divnya = document.getElementById(iddiv);
                    if (divnya !== null) {
                        if (truekd3) {
                            divnya.checked = true;
                        } else {
                            divnya.checked = false;
                        }
                    }
                    let iddivv = "kd4_" + data[i].mapel + "_" + data[i].kd4;
                    let divnyaa = document.getElementById(iddivv);
                    if (divnyaa !== null) {
                        if (truekd4) {
                            divnyaa.checked = true;
                        } else {
                            divnyaa.checked = false;
                        }
                    }


                }

                pisahpisah.innerHTML = k.unggah + `<hr/><button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><button class='w3-button w3-round-large w3-red' onclick="hapuskkmkd()">Hapus KKM dan KD</button><hr/>` + teks + "</table></div>";

            } else {
                pisahpisah.innerHTML = k.unggah + `<br/>Jika Anda belum mengunggah file KKM dan KD di server dan
                membutuhkan format filenya, silakan kunjungi Repository.</br><br /> Disana akan dijelaskan bagaimana caranya.<hr><label for="uploadcsv"><i class="fa fa-upload w3-button w3-blue w3-round-large"> Unggah File
                Format</i></label>
        <input type="file" onchange="uploadcsv()" id="uploadcsv" class="w3-hide" /><hr/>
        Berikut ini adalah contoh file KKM dan KD. Silakan unduh lalu Anda unggah pada tombol di atas, kemudian Anda edit (jika diperlukan);
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `
            }
            tabkd.innerHTML = "Kompetensi Dasar"
            tabkkm.innerHTML = "KKM"
            tabupl.innerHTML = "Upload Kurikulum"

        })
        .catch(er => {
            console.log(er);
            tabkd.innerHTML = "Kompetensi Dasar !"
            tabkkm.innerHTML = "KKM !"
            tabupl.innerHTML = "Upload Kurikulum !"
        })

    divkurikulum.innerHTML = tekshtml;



}
const fnsimpanidkkm = () => {
    let arrMapel = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG", "PKN", "BINDO", "MTK", "IPA", "IPS", "SBDP", "PJOK", "BSUND", "TIK"];
    let cKd = [21, 4, 8, 7, 4, 6, 4, 11, 13, 9, 4, 4, 10, 9, 9];
    let tabel = document.getElementsByClassName("tabelkkmkd")[0];
    let k = 1;

    for (i = 0; i < arrMapel.length; i++) {
        let el = document.getElementById("angkakkm_" + arrMapel[i]);
        // let urut = k;
        let batas = k + cKd[i];
        //console.log(urut);
        for (j = k; j < batas; j++) {
            if (el !== null) {
                tabel.rows[j].cells[5].innerHTML = el.innerHTML

            }
        }
        k = batas;

    }
    datacekliskd();
}
const tabelkearray = () => {
    let tabel = document.querySelector(".tabelkkmkd");
    let arr = [];
    let baris = tabel.rows.length;
    for (i = 0; i < baris; i++) {
        let arrtd = [];
        let td1 = tabel.rows[i].cells[0].innerHTML;
        let td2 = tabel.rows[i].cells[1].innerHTML;
        let td3 = tabel.rows[i].cells[2].innerHTML;
        let td4 = tabel.rows[i].cells[3].innerHTML;
        let td5 = tabel.rows[i].cells[4].innerHTML;
        let td6 = tabel.rows[i].cells[5].innerHTML;
        // let td7 = tabel.rows[i].cells[6].innerHTML;
        // let td8 = tabel.rows[i].cells[7].innerHTML;
        if (i == 0) {
            arrtd.push("mapel");
            arrtd.push("kd3");
            arrtd.push("indikatorkd3");
            arrtd.push("kd4");
            arrtd.push("indikatorkd4");
            arrtd.push("kkm");
            let teks = "cekliskd3"
            arrtd.push(teks);
            teks = "cekliskd4"
            arrtd.push(teks);

        } else {
            arrtd.push(td1);
            arrtd.push(td2);
            arrtd.push(td3);
            arrtd.push(td4);
            arrtd.push(td5);
            arrtd.push(td6);
            let teks = "kd3_" + td1 + "_" + td2;
            let trufals = document.getElementById(teks);
            let hsil = false;
            if (trufals !== null) {
                hsil = (trufals.checked) ? true : false;
            }
            arrtd.push(hsil);

            let teks4 = "kd4_" + td1 + "_" + td4;
            let trufals4 = document.getElementById(teks4);
            let hsil4 = false;
            if (trufals4 !== null) {
                hsil4 = (trufals4.checked) ? true : false;
            }
            arrtd.push(hsil4);


        }
        arr.push(arrtd)
    }
    // console.log(baris);
    // console.log(arr)
    //let starr = JSON.stringify(arr);
    // console.log(starr)
    return arr
}
const datacekliskd = () => {
    let statusupload = document.querySelector(".tabelkkmkd");
    if (statusupload == null) {
        alert("Jenjang Kelas Anda belum mengunggah file KKM dan KD");
        return
    }
    let tes = tabelkearray();
    let data = JSON.stringify(tes);
    let tab = "kelas" + idJenjang;
    let kirimin = new FormData();
    kirimin.append("tabel", data);
    fetch(linkmateri + "&action=simpancekliskd&tab=" + tab, {
        method: "post",
        body: kirimin
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
        })
        .catch(er => alert(er))
    //console.log(tes);
}
const uploadcsv = () => {
    let item = document.querySelector("#uploadcsv").files[0];
    pisahpisah.innerHTML = "<i class='fa fa-refresh fa-spin w3-large'></i>";
    let reader = new FileReader();
    reader.readAsDataURL(item);
    reader.onload = async function (e) {

        let bs64 = e.target.result.replace(/^.*,/, '');

        let data = new FormData();
        data.append("isi", bs64);
        data.append("tab", "kelas" + idJenjang);

        await fetch(linkmateri + "&action=uploadkurikulum", {
            method: "post",
            body: data,
        }).then(m => m.json())
            .then(k => {

                pisahpisah.innerHTML = k.result + `<hr/><button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><button class='w3-button w3-round-large w3-red' onclick="hapuskkmkd()">Hapus KKM dan KD</button>`;

                let teks = "<hr/><div style='overflow-x:auto'><table class='versi-table w3-small tabelkkmkd'><tr><th>Mata Pelajaran</th><th>KD-3</th><th>Indikator KI-3 <br>(Pengetahuan)</th><th>KD-4</th><th>Indikator KI-4 <br>(Keterampilan)</th><th>KKM</th></tr>";
                for (i = 1; i < k.arr.length; i++) {
                    //teks += "<tr><td>" + k.arr[i][0] + "</td><td>" + k.arr[i][1] + "</td><td contenteditable='true'>" + k.arr[i][2] + "</td><td>" + k.arr[i][3] + "</td><td contenteditable='true'>" + k.arr[i][4] + "</td><td contenteditable='true'>" + k.arr[i][5] + "</td></tr>"
                    teks += `<tr><td>${k.arr[i][0]}</td><td>${k.arr[i][1]}</td><td contenteditable='true' id="deskripsikd3_${k[i][0]}_${k.arr[i][1]}">${k.arr[i][2]}</td><td>${k.arr[i][3]}</td><td contenteditable='true' id="deskripsikd4_${k[i][0]}_${k.arr[i][3]}" >${k.arr[i][4]}</td><td contenteditable='true'>${k.arr[i][5]}</td></tr>`;
                }

                pisahpisah.innerHTML += teks + "</table></div>";
                alert("Selanjutnya, kami akan menyimpan data ceklis yang sebelumnya Anda isi (jika Ada)");
                datacekliskd();
            })
            .catch(er => {
                alert(er);
            })
    }
}
const hapuskkmkd = () => {
    let konfirmasihapus = confirm("Anda akan menghapus KKM dan KD ini di server. Konfirmasikan bersama teman sejawat Anda bahwa Anda akan menghapus KKM dan KD ini. Apakah Anda yakin?\n\n Klik OK untuk menghapus \nKlik CANCEL untuk membatalkan");
    if (!konfirmasihapus) {
        return
    }
    //alert("Anda menghapus");
    fetch(linkmateri + "&action=hapuskkmkd&tab=kelas" + idJenjang, {
        method: "post"
    })
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            pisahpisah.innerHTML = `Jika Anda belum mengunggah file KKM dan KD di server dan
            membutuhkan format filenya, silakan kunjungi Repository.<br/><br /> Disana akan dijelaskan bagaimana caranya.<hr><label for="uploadcsv"><i class="fa fa-upload w3-button w3-blue w3-round-large"> Unggah File
            Format</i></label><input type="file" onchange="uploadcsv()" id="uploadcsv" class="w3-hide" />`;
        })
        .catch(er => alert(er))

}
const fnprinttabelkkm = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");

    //datasiswadiv.innerHTML = ""

    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printPortrait(idtabel + ", " + judul1 + ", " + judul2 + ", " + tgl)
    //datasiswadiv.innerHTML = ""
}
////////////////////////////////// source NILAI.js
function nilaimapel() {

    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel");//.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }


    tampilinsublamangurukelas("mapel");
    ulhar.style.display = "block";
    //document.getElementById("kurikulum_kd").click();
    //------------------------------------------
    let islam = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    let bolislam = (islam == 0) ? false : true;

    let kristen = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    let bolkristen = (kristen == 0) ? false : true;

    let katolik = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    let bolkatolik = (katolik == 0) ? false : true;

    let hindu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    let bolhindu = (hindu == 0) ? false : true;

    let budha = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    let bolbudha = (budha == 0) ? false : true;
    let khonghucu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khong Hu Cu" || lk.pd_agama == "KHONG HUCU" || lk.pd_agama == "Khong Hucu" || lk.pd_agama == "Khong hucu") {
            return true;
        }
    }).length;
    let bolkhonghucu = (khonghucu == 0) ? false : true;


    let divkurikulum = document.getElementById("kurikulum_kd");


    let tekshtml = "<h3> Kompetensi Dasar</h3>";
    tekshtml += `<button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><hr/>`;

    let opsimapelagama = ""

    if (bolislam) {
        opsimapelagama += `<option id='agama1' value='PAI'>Pendidikan Agama Islam dan Budi Pekerti</option>`;
    }
    if (bolkristen) {
        opsimapelagama += `<option id='agama2' value='PKRIS'>Pendidikan Agama Kristen dan Budi Pekerti</option>`;
    }
    if (bolkatolik) {
        opsimapelagama += `<option id='agama3' value='PKATO'>Pendidikan Agama Katholik dan Budi Pekerti</option>`;
    }
    if (bolbudha) {
        opsimapelagama += `<option id='agama4' value='PBUDH'>Pendidikan Agama Budha dan Budi Pekerti</option>`;
    }
    if (bolhindu) {
        opsimapelagama += `<option id='agama5' value='PHIND'>Pendidikan Agama Hindu dan Budi Pekerti</option>`;
    }
    if (bolkhonghucu) {
        opsimapelagama += `<option id='agama6' value='PKONG'>Pendidikan Agama Khonghucu dan Budi Pekerti</option>`;
    }

    let adaips = "";
    if (idJenjang >= 4) {
        adaips = `
        <option value="IPA">Ilmu Pengetahuan Alam(IPA)</option>
    <option  value="IPS">Ilmu Pengetahuan SOSIAL (IPS)</option>
        `
    }
    let htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelulhar" onchange="nilaimapelulhar()">
    <option id="pilihnol" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selulhar0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selulhar1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selulhar2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selulhar5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selulhar6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selulhar6" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelulhar.innerHTML = htmlseleksiulhar;

    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelpts" onchange="nilaimapelpts()">
    <option id="pilihnolpts" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selptsr0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selpts1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selpts2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selpts5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selpts6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selpts7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelpts.innerHTML = htmlseleksiulhar;
    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelpaspak" onchange="nilaimapelpaspak()">
    <option id="pilihnolpaspak" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selpaspak0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selpaspak1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selpaspak2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selpaspak5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selpaspak6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selpaspak7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelpaspak.innerHTML = htmlseleksiulhar;
}

const fnkeyobjekmapel = (mapel, banyakkd) => {
    //let banyakkd = ["8_PH_03022021_PAI_3.8", "8_PH_03022021_PAI_3.9", "70_PH_03022021_PAI_3.8", "70_PH_03022021_PAI_3.9", "18_PH_16022021_IPA_3.8", "29_PH_22022021_PKN_3.3", "29_PH_22022021_BINDO_3.8", "29_PH_22022021_MTK_3.8", "34_PH_25022021_MTK_3.2", "36_PH_26022021_SBDP_3.2"];
    //let banyakkd = ["4_PH_29012021_MTK_3.4", "7_PH_05022021_PKN_3.2", "7_PH_05022021_BINDO_3.5", "7_PH_05022021_IPA_3.6", "7_PH_05022021_IPS_3.3", "7_PH_05022021_SBDP_3.2", "9_PH_11022021_PKN_3.3", "9_PH_11022021_BINDO_3.5", "9_PH_11022021_IPS_3.4", "9_PH_11022021_IPA_3.7", "9_PH_11022021_SBDP_3.3", "22_PH_18022021_MTK_3.5", "16_PH_19022021_PKN_3.3", "16_PH_19022021_BINDO_3.7", "16_PH_19022021_IPA_3.8", "16_PH_19022021_IPS_3.4", "16_PH_19022021_SBDP_3.4", "28_PH_22022021_IPS_3.4", "28_PH_22022021_IPA_3.7", "30_PH_24022021_MTK_3.5", "32_PH_25022021_IPS_3.4"];

    //let mapel = "PAI"

    let data = {};
    let pakefilter = banyakkd.filter(k => k.indexOf(mapel) > -1);
    data.namamapel = mapel;

    let ulanganke = [];
    for (i = 0; i < pakefilter.length; i++) {
        let mp = pakefilter[i].split("_")[0] + "_" + pakefilter[i].split("_")[1] + "_" + pakefilter[i].split("_")[2];
        if (ulanganke.indexOf(mp) == -1) {
            ulanganke.push(mp);
        }
    }

    let koleksi = {};
    for (j = 0; j < ulanganke.length; j++) {

        let arr = pakefilter.filter(k => k.indexOf(ulanganke[j]) > -1);

        koleksi[ulanganke[j]] = { "datakey": arr, "banyakkey": arr.length };//.map(k => k.split("_")[3] + "_" + k.split("_")[4]);

    }

    data.koleksiul = koleksi;

    return data
}
let pengenpengen = [];
const nilaimapelulhar = () => {
    let x = document.getElementById("selectnilaimapelulhar").selectedIndex;
    let y = document.getElementById("selectnilaimapelulhar").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);

    if (y[x].value == "") {
        alert("Silakan Pilih Mata Pelajaran");
        return
    }

    // let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksitokensiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.id);
    console.log(koleksiswa)
    console.log(koleksitokensiswa)
    datatabelnilaiulhar.innerHTML = "<hr/><i class='fa fa-refresh fa-spin w3-xxlarge'></i> Proses loading..."
    //alert("Fungsi baru")
    fetch(constlinknilai + "?action=lihatnilairekap&tab=PH&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            // console.log(r);
            // pengenpengen = r.records;
            // let darikronologijson = kronologijson;
            let PH = fnkeyobjekmapel(y[x].value, r.banyakkd);

            let cPH = Object.keys(PH.koleksiul);
            let allcount = 0;
            let arrallcount = [];
            for (a = 0; a < cPH.length; a++) {
                // allcount = allcount + PH.koleksiul[cPH[k]].datakey.length
                allcount += PH.koleksiul[cPH[a]].datakey.length;
                arrallcount.push(PH.koleksiul[cPH[a]].datakey.length);
            }
            // console.log(allcount)
            // console.log(PH);
            // console.log(cPH.length);
            // console.log(cPH);


            let tekshtml = "";
            if (cPH.length > 0) {
                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaiph_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", allcount);// cPH.length);
                th.innerHTML = `Rekap Penilaian Harian<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < cPH.length; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", arrallcount[i]);
                    th.innerHTML = inverstanggal(cPH[i].split("_")[2]) + `<button class="w3-blue w3-button" onclick="previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i></button>`;
                    tr.appendChild(th);

                    for (c = 0; c < arrallcount[i]; c++) {
                        th2 = document.createElement("th");
                        th2.innerHTML = "KD " + PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();
                    // let datanilai = r.records.filter(k => k.namasiswa == koleksiswa[j]);
                    let datanilai = r.records.filter(k => k.tokensiswa == koleksitokensiswa[j]);
                    console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < cPH.length; k++) {
                        for (d = 0; d < arrallcount[k]; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);
                            let key = PH.koleksiul[cPH[k]].datakey[d];
                            let isikan = (datanilai.length > 0) ? datanilai[datanilai.length - 1][key].replace(".", ",") : "0,00";
                            //revisi
                            let isinilai =

                                td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaiulhar.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaiph_${y[x].value},DAFTAR NILAI HARIAN <br>MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaiph_${y[x].value},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.toUpperCase()},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaiulhar.appendChild(tabel)
            } else {

                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaiph_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", 2);// cPH.length);
                th.innerHTML = `Rekap Penilaian Harian<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < 2; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", 1);
                    th.setAttribute("contenteditable", true);
                    th.innerHTML = "Ketik Tanggal";//inverstanggal(cPH[i].split("_")[2]) + `<br/><button class="w3-blue w3-button" onclick=" previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i> Lihat Materi</button>`;
                    tr.appendChild(th);

                    for (c = 0; c < 1; c++) {
                        th2 = document.createElement("th");
                        th2.setAttribute("contenteditable", true)
                        th2.innerHTML = "KD ";//+ PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();

                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < 2; k++) {
                        for (d = 0; d < 1; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);

                            let isikan = "tidak ada data"
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                //;datatabelnilaiulhar.innerHTML = `<hr/>`;
                datatabelnilaiulhar.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaiph_${y[x].value},DAFTAR NILAI HARIAN <br>MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaiph_${y[x].value},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaiulhar.appendChild(tabel)
                //datatabelnilaiulhar.innerHTML = `Tidak ada data`
            }

        })
        .catch(er => { alert(er); console.log(er) })
}
const nilaimapelpts = () => {
    let x = document.getElementById("selectnilaimapelpts").selectedIndex;
    let y = document.getElementById("selectnilaimapelpts").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);

    if (y[x].value == "") {
        alert("Silakan Pilih Mata Pelajaran");
        return
    }

    let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksitokensiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.id);
    datatabelnilaipts.innerHTML = "<hr/><i class='fa fa-refresh fa-spin w3-xxlarge'></i> Proses loading..."
    //alert("Fungsi baru")
    fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            // console.log(r);
            // pengenpengen = r.records;
            // let darikronologijson = kronologijson;
            let PH = fnkeyobjekmapel(y[x].value, r.banyakkd);
            let cPH = Object.keys(PH.koleksiul);
            let allcount = 0;
            let arrallcount = [];
            for (a = 0; a < cPH.length; a++) {
                // allcount = allcount + PH.koleksiul[cPH[k]].datakey.length
                allcount += PH.koleksiul[cPH[a]].datakey.length;
                arrallcount.push(PH.koleksiul[cPH[a]].datakey.length);
            }
            // console.log(allcount)
            // console.log(PH);
            // console.log(cPH.length);
            // console.log(cPH);


            let tekshtml = "";
            if (cPH.length > 0) {
                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipts_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", allcount);// cPH.length);
                th.innerHTML = `Rekap Penilaian Tengah Semester<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < cPH.length; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", arrallcount[i]);
                    th.innerHTML = inverstanggal(cPH[i].split("_")[2]) + `<button class="w3-blue w3-button" onclick="previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i></button>`;
                    tr.appendChild(th);

                    for (c = 0; c < arrallcount[i]; c++) {
                        th2 = document.createElement("th");
                        th2.innerHTML = "KD " + PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();
                    // let datanilai = r.records.filter(k => k.namasiswa == koleksiswa[j]);
                    let datanilai = r.records.filter(k => k.tokensiswa == koleksitokensiswa[j]);
                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < cPH.length; k++) {
                        for (d = 0; d < arrallcount[k]; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);
                            let key = PH.koleksiul[cPH[k]].datakey[d];
                            let isikan = (datanilai.length > 0) ? datanilai[datanilai.length - 1][key].replace(".", ",") : "0,00";
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipts.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipts.appendChild(tabel)
            } else {

                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipts_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", 2);// cPH.length);
                th.innerHTML = `Rekap Penilaian Tengah Semester<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < 2; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", 1);
                    th.setAttribute("contenteditable", true);
                    th.innerHTML = "Ketik Tanggal";//inverstanggal(cPH[i].split("_")[2]) + `<br/><button class="w3-blue w3-button" onclick=" previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i> Lihat Materi</button>`;
                    tr.appendChild(th);

                    for (c = 0; c < 1; c++) {
                        th2 = document.createElement("th");
                        th2.setAttribute("contenteditable", true)
                        th2.innerHTML = "KD ";//+ PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();

                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < 2; k++) {
                        for (d = 0; d < 1; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);

                            let isikan = "tidak ada data"
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipts.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipts.appendChild(tabel)
                //datatabelnilaiulhar.innerHTML = `Tidak ada data`
            }

        })
        .catch(er => alert(er))
}
const nilaimapelpaspak = () => {
    let idpaspak = (idSemester == 2) ? "PAK" : "PAS";
    let x = document.getElementById("selectnilaimapelpaspak").selectedIndex;
    let y = document.getElementById("selectnilaimapelpaspak").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);

    if (y[x].value == "") {
        alert("Silakan Pilih Mata Pelajaran");
        return
    }

    let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksitokensiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.id);
    datatabelnilaipaspak.innerHTML = "<hr/><i class='fa fa-refresh fa-spin w3-xxlarge'></i> Proses loading..."
    //alert("Fungsi baru")
    fetch(constlinknilai + "?action=lihatnilairekap&tab=" + idpaspak + "&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            // console.log(r);
            // pengenpengen = r.records;
            // let darikronologijson = kronologijson;
            let PH = fnkeyobjekmapel(y[x].value, r.banyakkd);
            let cPH = Object.keys(PH.koleksiul);
            let allcount = 0;
            let arrallcount = [];
            for (a = 0; a < cPH.length; a++) {
                // allcount = allcount + PH.koleksiul[cPH[k]].datakey.length
                allcount += PH.koleksiul[cPH[a]].datakey.length;
                arrallcount.push(PH.koleksiul[cPH[a]].datakey.length);
            }
            // console.log(allcount)
            // console.log(PH);
            // console.log(cPH.length);
            // console.log(cPH);



            if (cPH.length > 0) {
                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipaspak_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", allcount);// cPH.length);
                th.innerHTML = `Rekap ${(idSemester == 2) ? 'Penilaian Akhir Kelas' : 'Penilaian Akhir Semester'}<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < cPH.length; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", arrallcount[i]);
                    th.innerHTML = inverstanggal(cPH[i].split("_")[2]) + `<button class="w3-blue w3-button" onclick="previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i></button>`;
                    tr.appendChild(th);

                    for (c = 0; c < arrallcount[i]; c++) {
                        th2 = document.createElement("th");
                        th2.innerHTML = "KD " + PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();
                    // let datanilai = r.records.filter(k => k.namasiswa == koleksiswa[j]);
                    let datanilai = r.records.filter(k => k.tokensiswa == koleksitokensiswa[j]);
                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < cPH.length; k++) {
                        for (d = 0; d < arrallcount[k]; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);
                            let key = PH.koleksiul[cPH[k]].datakey[d];
                            let isikan = (datanilai.length > 0) ? datanilai[datanilai.length - 1][key].replace(".", ",") : "0,00";
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipaspak.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipaspak.appendChild(tabel)
            } else {

                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipaspak_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", 2);// cPH.length);
                th.innerHTML = `Rekap ${(idSemester == 2) ? 'Penilaian Akhir Kelas' : 'Penilaian Akhir Semester'}<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < 2; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", 1);
                    th.setAttribute("contenteditable", true);
                    th.innerHTML = "Ketik Tanggal";//inverstanggal(cPH[i].split("_")[2]) + `<br/><button class="w3-blue w3-button" onclick=" previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i> Lihat Materi</button>`;
                    tr.appendChild(th);

                    for (c = 0; c < 1; c++) {
                        th2 = document.createElement("th");
                        th2.setAttribute("contenteditable", true)
                        th2.innerHTML = "KD ";//+ PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();

                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < 2; k++) {
                        for (d = 0; d < 1; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);

                            let isikan = "tidak ada data"
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipaspak.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipaspak.appendChild(tabel)
                //datatabelnilaiulhar.innerHTML = `Tidak ada data`
            }

        })
        .catch(er => alert(er))
}

const inverstanggal = (par) => {
    //let par = "22022021";
    let tgl = parseInt(par.slice(0, 2));
    let bln = parseInt(deleteZero(par.slice(2, 4)));
    let thn = parseInt(par.slice(4, 8));
    let s = tanggalfull(thn + "-" + bln + "-" + tgl);
    return s
}

const prpw = (par) => {
    alert(par)
}
const previewsoalnilairekap = (par) => {
    if (kronologijson.length == 0) {
        alert("Anda harus melihat data Pembelajaran Anda terlebih dahulu untuk melihat preview konten materi ini.")
        return
    }
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    let datamateri = kronologijson.filter(k => k.idbaris == par)[0];


    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri.idSekolah
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Nama Siswa"
    var td = tr.insertCell(-1);
    td.innerHTML = "NAMA SISWA ANDA"
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri.idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri.idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN <br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri.idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;


    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "timer");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    cel1.innerHTML = "Timer: ";
    var cdtimer = document.createElement("input")
    cdtimer.setAttribute("id", "cd_seconds");
    cdtimer.setAttribute("disabled", "true");
    cdtimer.setAttribute("value", datamateri.iddurasi);
    cdtimer.setAttribute("style", "width:50px")
    cel1.appendChild(cdtimer);
    cel1.innerHTML += " Menit."
    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "tempatdurasi");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    var cdstatus = document.createElement("b");
    cdstatus.setAttribute("id", "cd_status");
    var tekscdstatus = document.createTextNode("Durasi Penyelesaian:");
    cdstatus.appendChild(tekscdstatus);
    var cdjam = document.createElement("span");
    cdjam.setAttribute("id", "cd_h");
    var tekscdjam = document.createTextNode("00:");
    cdjam.appendChild(tekscdjam);
    var cdmenit = document.createElement("span");
    cdmenit.setAttribute("id", "cd_m");
    var tekscdmenit = document.createTextNode("00:");
    cdmenit.appendChild(tekscdmenit);
    var cddetik = document.createElement("span");
    cddetik.setAttribute("id", "cd_s");
    var tekscddetik = document.createTextNode("00");
    cddetik.appendChild(tekscddetik);
    var cdpause = document.createElement("input")
    cdpause.setAttribute("type", "button");
    cdpause.setAttribute("id", "cd_pause");
    cdpause.setAttribute("value", "Jeda");
    var cdpstop = document.createElement("input")
    cdpstop.setAttribute("type", "button");
    cdpstop.setAttribute("id", "cd_stop");
    cdpstop.setAttribute("value", "Selesai");
    var gntibaris = document.createElement("br");
    var controltimer = document.createElement("b")
    var tekscontroltimer = document.createTextNode("Control Timer:");
    controltimer.appendChild(tekscontroltimer);
    var controlstart = document.createElement("input");
    controlstart.setAttribute("type", "button");
    controlstart.setAttribute("id", "cd_start");
    controlstart.setAttribute("value", "Mulai Mengerjakan");
    var controlreset = document.createElement("input");
    controlreset.setAttribute("type", "button");
    controlreset.setAttribute("id", "cd_reset");
    controlreset.setAttribute("value", "Reset Timer");
    var titikdua = document.createElement("b");
    var tekstitikdua = document.createTextNode(":");
    titikdua.appendChild(tekstitikdua);
    cel1.appendChild(controltimer);
    cel1.innerHTML += "<br/>";
    cel1.appendChild(controlstart);
    //cel1.appendChild(controlreset);
    //cel1.appendChild(cdpause);
    cel1.appendChild(cdpstop);
    cel1.appendChild(gntibaris);
    cel1.appendChild(cdstatus);
    cel1.innerHTML += ":<br/>";
    cel1.appendChild(cdjam);
    cel1.innerHTML += "";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);
    cel1.innerHTML += "<br/><sub>Waktu hanya berjalan di laman siswa</sub>";


    tes.appendChild(tabelidentitas)
    var brek = document.createElement("div")

    brek.setAttribute("style", "break-after:page");
    tes.appendChild(brek)

    var idm = encodeURIComponent(datamateri.idmateri);
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {
        //  loadingmodal.style.display="none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        //   document.querySelector(".kontenmateri").innerHTML += brkline(json);
        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;
        // forkuncijawaban.innerHTML = window.atob(brkline(json).kunci).split(",").join("<br>");
        let tekskunci = brkline(json).kunci;
        //console.log(tekskunci);
        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG"
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }

        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('idpracetak,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        tes.after(tombol)
    })
    // ;


}

const koleksinamasiswaberdasarkanagama = (idmapel) => {
    let namanamasiswa = [];
    if (idmapel == "PAI") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "ISLAM");//.map(k => k.pd_nama);

    }
    if (idmapel == "PKRIS") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "KRISTEN");//.map(k => k.pd_nama);

    }
    if (idmapel == "PKATO") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "KATHOLIK");//.map(k => k.pd_nama);

    }
    if (idmapel == "PBUDH") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "BUDHA");//.map(k => k.pd_nama);

    }
    if (idmapel == "PHIND") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "HINDU");//.map(k => k.pd_nama);

    }
    if (idmapel == "PKONG") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "KONGHUCU");//.map(k => k.pd_nama);

    }
    if (idmapel !== "PAI" && idmapel !== "PKRIS" && idmapel !== "PKATO" && idmapel !== "PBUDH" && idmapel !== "PHIND" && idmapel !== "PKONG") {
        namanamasiswa = jsondatasiswa;//.map(k => k.pd_nama);

    }

    return namanamasiswa

}

const ExcelModalTabNilai = (xx) => {
    let idtabel = xx.split(",")[0],
        namafileexcel = xx.split(",")[1],
        judul = xx.split(",")[2];
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);

    //------------------
    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    let tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];

    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    sel.innerHTML = judul;;

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel

    brs = tabeledithead.insertRow(3)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = idJenisGuru + " " + idNamaKelas
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    } else {
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipGuruKelas;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = idJenisGuru + " " + idNamaKelas


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek

        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    }


    let s = SemesterBerapaSekarang()
    $("#myTableCopy").table2excel({
        //exclude: ".excludeThisClass",
        //name: "Worksheet Name",
        //filename: "SomeFile.xls", // do include extension
        //preserveColors: true // set to true if you want background colors and font colors preserved
        name: "Worksheet Name",
        // filename: "Data Rekap Absen Kelas "+ ruangankelas +" Semester "+s+" dicetak pada " + new Date(),
        filename: namafileexcel,
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 4
    });
    datasiswadiv.innerHTML = "";
}

let dataapipts = {};
async function raportkelas() {
    let cekkurikulum = document.getElementById("ttttt");
    if (cekkurikulum == null) {
        alert("Untuk melihat data Raport, silakan periksa KKM terlebih dahulu untuk menggenerate identitas Raport Anda.");
        return
    }
    tampilinsublamangurukelas("raport");
    let tab = document.querySelector(".tabpetunjukraport");
    tab.click();

    // let htmlopsi = "<option value='' selected>Silakan Pilih Nama Siswa Anda</option>";
    // for (i = 0; i < jsondatasiswa.length; i++) {
    //     htmlopsi += `<option value="${i}" id='opsisiswapts_${i}'>${jsondatasiswa[i].pd_nama}</option>`
    // }
    // namasiswaraportpts.innerHTML = htmlopsi;

    // await fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
    //     .then(m => m.json())
    //     .then(r => {
    //         dataapipts = r;
    //         //  console.log(r)
    //     })
    let datakkm = koleksiarraymapelaktif();
    document.querySelector(".kkmsatuanpendidikan").innerHTML = datakkm.kkmmin;
    document.querySelectorAll(".a_kkm").forEach(k => k.innerHTML = datakkm.kkmmin);
    document.getElementById("a_rentangkkm").innerHTML = Math.round((100 - datakkm.kkmmin) / 3);

}
const raportbayanganpilih = () => {
    // pastikan dataapipts sudah diload;
    //console.log(dataapipts)
    if (dataapipts.records == "undefined") {
        alert("Data belum siap. Silakan coba lagi");
        return
    }

    //user memilih:
    let x = document.getElementById("namasiswaraportpts").selectedIndex;
    let y = document.getElementById("namasiswaraportpts").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    //elemen raport:
    let divraport = document.getElementById("tampilanraportpts");
    let el = "";
    if (y[x].value == "") {
        alert("Silakan Pilih Mata siswa Anda");
        divraport.innerHTML = "Pilih Siswa Anda"
        return
    }
    let indek = parseInt(y[x].value);
    //1st kop
    el = `<div class="w3-card-4 ">
    <div class="w3-container">
        <div class="w3-left w3-padding">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
        <h4>PEMERINTAH DAERAH KOTA ${jlo.kota.toUpperCase()}<br/>
        DINAS PENDIDIKAN<br/>
        <b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
        <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>    
    
    <div class="w3-main w3-padding">
    <h5 class="w3-center">LAPORAN HASIL PENILAIAN TENGAH SEMESTER ${idSemester}<br/>
    TAHUN PELAJARAN ${idTeksTapel}</h5>
    <div class="w3-left">
        <table class="w3-table-all w3-small">
        <tr>
            <td>Nama Siswa</td>
            <td>:</td>
            <td>${y[x].text}</td>
        </tr>
        <tr>
            <td>No. Induk Sekolah</td>
            <td>:</td>
            <td>${jsondatasiswa[indek].nis}</td>
        </tr>
        <tr>
            <td>Nama Sekolah</td>
            <td>:</td>
            <td>${idNamaSekolah}</td>
        </tr>
        </table><br/>
    </div>
    
    <div class="w3-right">
    <table class="w3-table-all w3-small">
    <tr>
        <td>Kelas</td>
        <td>:</td>
        <td>${idNamaKelas}</td>
    </tr>
    <tr>
        <td>Semester</td>
        <td>:</td>
        <td>${idSemester}</td>
    </tr>
    <tr>
        <td>Tahun Pelajaran</td>
        <td>:</td>
        <td>${idTeksTapel}</td>
    </tr>
    </table>
    </div>
    <div class="w3-container w3-main">
    <table class="w3-table-all"><tr><td>
    Alamat: ${editalamatkopsurat.innerHTML}
    </td></tr></table>
    </div>
    <br/><center style="overflow-x:auto">
    <table class="versi-table ">
    <thead>
        <tr>
            <th>No. </th>
            <th>Mata Pelajaran</th>
            <th>KKM</th>
            <th>Nilai</th>
            <th>Ketuntasan</th>
        </tr>
    </thead>
    <tbody>
  

    `;
    //agamasiswa
    let arrayagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
    let arraykodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];

    let agamasiswa = jsondatasiswa[indek].pd_agama;
    let cariindek = arrayagama.indexOf(agamasiswa);
    let idkkmagama, angkakkmagama, namamapelagama;
    let angkakkmmapel, namamapel;
    let arraynilai = [];
    let count;

    if (cariindek == -1) {
        el += `
        <tr>
        <td>1</td>
        <td>Agama Ananda tidak terdeteksi</td>
        <td>Agama Ananda tidak terdeteksi</td>
        <td>Agama Ananda tidak terdeteksi</td>
        <td>Agama Ananda tidak terdeteksi</td>
        </tr>
        `;

    } else {

        idkkmagama = "angkakkm_" + arraykodeagama[cariindek];
        //console.log(arraykodeagama[cariindek]);
        angkakkmagama = (document.getElementById(idkkmagama) == null) ? 0 : document.getElementById(idkkmagama).innerHTML;
        namamapelagama = (document.getElementById("namamapelraport_" + arraykodeagama[cariindek]) == null) ? "Gagal Meloading" : document.getElementById("namamapelraport_" + arraykodeagama[cariindek]).innerHTML;
        el += `
        <tr>
        <td>1</td>
        <td>${namamapelagama}</td>
        <td>${angkakkmagama}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, arraykodeagama[cariindek], angkakkmagama).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, arraykodeagama[cariindek], angkakkmagama).ketuntasan}</td>
        
        </tr>
        `;
        count = nilaidaridataapi(y[x].text, arraykodeagama[cariindek], angkakkmagama).nilai;

        arraynilai.push(count)

    }
    //pkn
    namamapel = document.getElementById("namamapelraport_PKN").innerHTML
    angkakkmmapel = document.getElementById("angkakkm_PKN").innerHTML
    el += `
        <tr>
        <td>2</td>
        <td>${namamapel}</td>
        <td>${angkakkmmapel}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "PKN", angkakkmmapel).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "PKN", angkakkmmapel).ketuntasan}</td>
        </tr>
        `;
    count = nilaidaridataapi(y[x].text, "PKN", angkakkmmapel).nilai;

    arraynilai.push(count)


    //Bindo
    namamapel = document.getElementById("namamapelraport_BINDO").innerHTML
    angkakkmmapel = document.getElementById("angkakkm_BINDO").innerHTML
    el += `
        <tr>
        <td>3</td>
        <td>${namamapel}</td>
        <td>${angkakkmmapel}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "BINDO", angkakkmmapel).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "BINDO", angkakkmmapel).ketuntasan}</td>
        </tr>
        `;
    count = nilaidaridataapi(y[x].text, "BINDO", angkakkmmapel).nilai;

    arraynilai.push(count)

    //MTK
    namamapel = document.getElementById("namamapelraport_MTK").innerHTML
    angkakkmmapel = document.getElementById("angkakkm_MTK").innerHTML
    el += `
        <tr>
        <td>4</td>
        <td>${namamapel}</td>
        <td>${angkakkmmapel}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "MTK", angkakkmmapel).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "MTK", angkakkmmapel).ketuntasan}</td>
        </tr>
        `;
    count = nilaidaridataapi(y[x].text, "MTK", angkakkmmapel).nilai;

    arraynilai.push(count)

    // UNTUK IPA DAN IPS HANYA ADA DI KELAS SELAIN KELAS 1, 2, 3
    if (idJenjang > 3) {
        //ipa
        namamapel = document.getElementById("namamapelraport_IPA").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_IPA").innerHTML
        el += `
            <tr>
            <td>5</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPA", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPA", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "IPA", angkakkmmapel).nilai;

        arraynilai.push(count)

        //ipS
        namamapel = document.getElementById("namamapelraport_IPS").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_IPS").innerHTML
        el += `
            <tr>
            <td>6</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPS", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPS", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "IPS", angkakkmmapel).nilai;

        arraynilai.push(count)

        //SBDP
        namamapel = document.getElementById("namamapelraport_SBDP").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_SBDP").innerHTML
        el += `
            <tr>
            <td>7</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai;

        arraynilai.push(count)

        //PJOK
        namamapel = document.getElementById("namamapelraport_PJOK").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_PJOK").innerHTML
        el += `
            <tr>
            <td>8</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).ketuntasan}</td>
            </tr>
            <tr>
            <td>9</td>
            <td colspan="4">Muatan Lokal</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai;

        arraynilai.push(count)

        //BSUND
        namamapel = document.getElementById("namamapelraport_BSUND").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_BSUND").innerHTML
        el += `
            <tr>
            <td></td>
            <td>a. ${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).ketuntasan}</td>
            </tr>
            
            `;
        count = nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai;

        arraynilai.push(count)

    } else {

        //SBDP
        namamapel = document.getElementById("namamapelraport_SBDP").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_SBDP").innerHTML
        el += `
            <tr>
            <td>5</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai;

        arraynilai.push(count)

        //PJOK
        namamapel = document.getElementById("namamapelraport_PJOK").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_PJOK").innerHTML
        el += `
            <tr>
            <td>6</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).ketuntasan}</td>
            </tr>
            <tr>
            <td>7</td>
            <td colspan="4">Muatan Lokal</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai;

        arraynilai.push(count)

        //BSUND
        namamapel = document.getElementById("namamapelraport_BSUND").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_BSUND").innerHTML
        el += `
            <tr>
            <td></td>
            <td>a. ${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).ketuntasan}</td>
            </tr>
            
            `;
        count = nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai;

        arraynilai.push(count)
    }

    // console.log(arraynilai);
    let er = arraynilai.filter(k => !(k == "" || k == "-" || k == "Belum Dilaksanakan" || k == "Gagal Loading"))
    //console.log(er)

    let jumlah
    if (er.length == 0) {
        jumlah = 0
    } else {
        jumlah = arraynilai.filter(k => !(k == "" || k == "-" || k == "Belum Dilaksanakan" || k == "Gagal Loading")).map(d => parseFloat(d)).reduce((a, b) => a + b);

    }
    //console.log(jumlah)

    el += `</tbody></table></center>
    <br/>
   <h4> Jumlah Nilai ( <em><b contenteditable="true">${jumlah}</b></em> )<br/>
   Rata-rata nilai ( <span  contenteditable="true">${(jumlah / arraynilai.length).toFixed(2)} </span> )
    </h4>
    <div class="w3-main w3-container">
  <div class="w3-left w3-container">
  <br/>
    Orang Tua/Wali
    <br/>
    <br/>
    <br/>
    <br/>
    -----------------------
    <br/>
    <br/>
    <br/>
  </div>
  <div class="w3-left w3-container">
  Mengetahui,<br/>  
  Kepala ${idNamaSekolah}
  <br/>
  <div id='barcodeptskepsek'></div>
  <b><u>${idNamaKepsek}</u></b><br/>
  NIP. ${idNipKepsek}
  <br/>
  <br/>
  <br/>
  </div>
  <div class="w3-right w3-container">
  ${jlo.kota}, <span  contenteditable="true"> ${tanggalfull(new Date())}</span><br/>
  ${idJenisGuru} ${idNamaKelas}
  <br/>
  <div id='barcodeptsguru'></div>
    <b><u>${namauser}</u></b><br/>
   NIP. ${idNipGuruKelas}
   <br/>
   <br/>
   <br/>

</div>


    `;
    //end el
    el += `


    </div></div>
    
    `
    divraport.innerHTML = el;

    //console.log(dataapipts);
    let datanama = y[x].text;
    let teksbarkode = "Data Raport PTS ini telah diketahui dan ditandatangani oleh Kepala " + idNamaSekolah + " untuk siswa atas nama " + datanama;//document.getElementById("text");
    let teksbarkode2 = "Data Raport PTS ini telah  ditandatangani oleh Guru Kelas " + idNamaKelas + " untuk siswa atas nama " + datanama;//document.getElementById("text");
    barcodekan('barcodeptskepsek', teksbarkode);
    barcodekan('barcodeptsguru', teksbarkode2);




}
const barcodekan = (el, teks) => {

    var qrcode = new QRCode(document.getElementById(el), {
        width: 100,
        height: 100
    });

    qrcode.clear();
    qrcode.makeCode(teks);



}
const nilaidaridataapi = (namasiswa, mapel, kkm) => {
    let data = {};
    // console.log(dataapipts.records)
    if (dataapipts.records === undefined) {
        data.nilai = "Gagal Loading";
        data.ketuntasan = "<b class='w3-text-red'>Gagal Loading</b>";

    } else {
        let kosong = dataapipts.records.filter(k => k.namasiswa == namasiswa);//.length;
        // console.log(kosong)

        if (kosong.length == 0) {
            data.nilai = "-";//"Tidak ada data";
            data.ketuntasan = "<b class='w3-text-red'>Tidak Tuntas</b>";
        } else {


            let d = dataapipts.records.filter(k => k.namasiswa == namasiswa)[0];

            let f = Object.keys(d).filter(k => k.indexOf(mapel) > -1);//.length;
            // console.log(f);
            if (f.length == 0) {
                data.nilai = "Belum Dilaksanakan";
                data.ketuntasan = "<b class='w3-text-yellow'>Menunggu Pelaksanaan</b>";
            } else {
                let l = Object.keys(d).filter(k => k.indexOf(mapel) > -1).map(j => (d[j] == "") ? 0 : parseInt(d[j])).reduce((a, b) => a + b);
                let nilai = (l / f.length).toFixed(0);
                if (nilai == "NaN") {
                    data.nilai = "-";
                    data.ketuntasan = "<b class='w3-text-red'>Tidak Tuntas</b>";
                } else {
                    data.nilai = nilai;
                    data.ketuntasan = (parseInt(nilai) >= parseInt(kkm)) ? "<b class='w3-text-blue'>Tuntas</b>" : "<b class='w3-text-red'>Tidak Tuntas</b>";



                }
            }
        }
    }
    return data

}
const printraportpts = () => {
    let isibody = document.getElementById("tampilanraportpts").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA RAPORT PTS</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `${isibody}`


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
const publikasikanraportpts = () => {
    //    alert("publikasikanraportpts()");
    let btn = document.querySelector(".tombolpublikasiraportpts");
    btn.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Proses Publikasi";
    let divraportpts = document.getElementById("tampilanraportpts");
    let op = document.getElementById("namasiswaraportpts").options;
    let indop = document.getElementById("namasiswaraportpts").selectedIndex;
    let namarpts = op[indop].text;
    if (divraportpts.innerHTML == "") {
        alert("Raport Belum siap dipublikasikan");
        btn.innerHTML = "<i class='fa fa-save'></i> Publikasikan";
    } else {
        let confr = confirm("Anda yakin ingin mempublikasikan raport ini kepada siswa yang bersangkutan? Anda masih bisa mengedit nilai dari tampilan raport tersebut. Data yang berhasil dipublikasikan akan muncul di tabel Publikasikan Raport PTS\n\n Klik [OK] untuk melanjutkan.\n\n Klik [NO] untuk membatalkan.");
        if (confr) {
            let tekhtml = divraportpts.innerHTML;
            let dtext = document.getElementById("tempattextarea");
            dtext.textContent = tekhtml.replace(/contenteditable=\"true\"/gi, "");
            let htmlraport = window.btoa(unescape(encodeURIComponent(dtext.textContent)));
            let data = new FormData();
            data.append("kelas", idNamaKelas);
            data.append("namasiswa", namarpts);
            data.append("htmlraport", htmlraport);
            fetch(constlinknilai + "?action=publikasiraportpts", {
                method: "post",
                body: data
            }).then(m => m.json())
                .then(r => {
                    alert(r.result + "Publikasi");
                    btn.innerHTML = "<i class='fa fa-save'></i> Publikasikan";
                })
                .catch(er => alert(er))
            // console.log(namarpts);
            // console.log(htmlraport);

            // let namasubfolder = e.parameter.kelas;
            // let namasiswa = e.parameter.namasiswa;
            // let htmlraport = e.parameter.htmlraport;
        }
    }
}
const gspublikasikan = () => {

}
const cekpublikasiraportpts = () => {
    //alert("cekpublikasiraportpts()");
    let bt = document.querySelector(".tombolcekpublikasiraportpts");
    bt.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    let div = document.querySelector(".kesiapanrapotpts");
    let tekshtml = `<h4>Data Publikasi Raport PTS</h4><table class="versi-table w3-small" id="tabelcekpublikasi">
                <thead><tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>Preview</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
                </thead><tbody>
                `;
    for (i = 0; i < jsondatasiswa.length; i++) {
        tekshtml += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${jsondatasiswa[i].pd_nama}</td>
                        <td class="w3-center">Belum dipublikasikan</td>
                        <td class="w3-center"><span class="w3-text-red">?</span></td>
                        <td class="w3-center">-</td>
                    </tr>
                    `
    }
    tekshtml += `</tbody></table>`;
    div.innerHTML = tekshtml;

    fetch(constlinknilai + "?action=cekpublikasiraportpts&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            //console.log(r);
            bt.innerHTML = "Cek Publikasi";
            let cekdata = r.result;

            if (cekdata == 0) {
                div.innerHTML = "<h4>Maaf, Anda belum pernah mempublikasikan Raport PTS</h4>";
            } else {
                let data = r.data;
                let datanama, dataid, dataaksi,
                    indektabel, idtabel = document.getElementById("tabelcekpublikasi").getElementsByTagName("tbody")[0];
                for (j = 0; j < data.length; j++) {
                    datanama = data[j].namasiswa;
                    dataid = data[j].raportpts;
                    dataaksi = data[j].ptspublikasi;
                    indektabel = jsondatasiswa.map(s => s.pd_nama).indexOf(datanama);

                    if (indektabel > -1) {
                        idtabel.rows[indektabel].cells[2].innerHTML = `<button onclick="previewraportpts('${dataid}')" title="Lihat")><i class="fa fa-eye"></i> Lihat</button>`;
                        idtabel.rows[indektabel].cells[3].innerHTML = (dataaksi == "show") ? `<b class="w3-text-green">&checkmark;</b>` : `<b class="w3-text-red">&times;</b>`;
                        idtabel.rows[indektabel].cells[4].innerHTML = (dataaksi == "show") ? `<button onclick="sembunyikanraportpts('${datanama}')" title="Hapus")><i class="fa fa-trash"></i> Hapus</button>` : `<button onclick="tampilkanraportpts('${datanama}')" title="Kembalikan")><i class="fa fa-refresh"></i> </button>`;
                    }



                }




            }

        })
        .catch(er => console.log(er))
    //console.log

}
const previewraportpts = (id) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    tes.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
    let tekshtml = "<h5>Data Raport PTS di e-Lamaso Siswa</h5>"
    $('.classReviewMateri').nextAll('button').remove();
    fetch(linkmateri + "&idmateri=" + id + "&action=previewriwayat")
        .then(m => m.json())
        .then(r => {
            tekshtml += `${r}<hr/>
        <center>
        <button onclick="alert('Siswa Mencetak raport ini')"><i class="fa fa-print"></i> Cetak</button>
        </center><hr/>
        `;
            tes.innerHTML = tekshtml;
        }).catch(er => {
            tekshtml += "Maaf terjadi kesalahan dengan kode: " + er;
            tes.innerHTML = tekshtml;
        })

}
const sembunyikanraportpts = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportpts&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=hide")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            cekpublikasiraportpts();
        })
        .catch(er => alert(er))
}
const tampilkanraportpts = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportpts&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=show")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            cekpublikasiraportpts();
        })
        .catch(er => alert(er))
}

//////////////////////////////// source VIDEOLAMASO.JS

let localStream = "";// vidvid2.style.display = "none";
let spanstatus = document.querySelector("#spanstatusrekaman");
let spanstatus2 = document.querySelector("#spanstatusrekaman2");
let videostatus = document.querySelector("#statusrekaman");
let elvid1 = document.querySelector("#divvid1");
let elvid2 = document.querySelector("#divvid2");
let start = document.getElementById('btnStart');
let stopB = document.getElementById('btnStop');
let btnBack = document.getElementById('btnBack');
let vidSave = document.getElementById('vid2');
let vidlayar = document.getElementById('vid1');


const mulaivideo = () => {
    // let divV = document.getElementById('vid2');
    // divV.style.display = "none";
    // divP.style.display = "block";
    // let divP = document.getElementById('vid1');
    // let vidvid2 = document.getElementById('divvid2');

    //resultuploadvideomateri.innerHTML = "";
    let constraintObj = {
        audio: true,
        video: {
            facingMode: "environment"
            // , //"user",
            // width: { min: 640, ideal: 1280, max: 1920 },
            // height: { min: 480, ideal: 720, max: 1080 }
            // class: 'responsive-iframebaru',
            // poster: '/img/192.png'
        }
    };
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    //handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function (constraintObj) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraintObj, resolve, reject);
            });
        }

    } else {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device => {
                    // console.log(device.kind.toUpperCase(), device.label);
                    // console.log(device.getTracks());
                    //alert(device.deviceId)
                })
            })
            .catch(err => {
                // console.log(err.name, err.message);
                alert(err.name + "\n" + err.message);
            })

    }


    navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function (mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                video.srcObject = mediaStreamObj;
            } else {
                //old version
                video.src = window.URL.createObjectURL(mediaStreamObj);
            }

            video.onloadedmetadata = function (ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };

            localStream = mediaStreamObj;
            //add listeners for saving video/audio

            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];

            start.addEventListener('click', (ev) => {
                // divP.style.display = "block";
                // divV.style.display = "none";
                spanstatus.innerHTML = "Sedang merekam <i class='fa fa-spin fa-refresh'></i>";
                videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "containerbaru w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "containerbaru w3-center w3-hide");

                //video.play();
                // console.log(mediaRecorder.state);
                if (mediaRecorder.state == "recording") {
                    alert("Anda sedang proses merekam.");
                    return
                }
                video.play();
                mediaRecorder.start();
                //localStream.getTracks().forEach(k => k = mediaStreamObj);
                //elvid2.getAttribute("class").replace("containerbaru w3-center w3-show", "containerbaru w3-center w3-hide")
            })
            stopB.addEventListener('click', (ev) => {
                if (mediaRecorder.state === "inactive") {
                    alert("Maaf, Tombol berfungsi ketika sedang proses rekaman");
                    return
                }
                videostatus.removeAttribute("class");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "containerbaru w3-center w3-hide");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "containerbaru w3-center w3-show");


                video.pause();
                mediaRecorder.stop();
                //localStream.getTracks().forEach(k => k.stop());
                // console.log(mediaRecorder.state);
                //console.log(mediaRecorder);
            });
            mediaRecorder.ondataavailable = function (ev) {

                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev) => {
                // divP.style.display = "none";
                // divV.style.display = "block";
                let blob = new Blob(chunks, { 'type': 'video/mp4;' });
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
                //console.log(formatBytes(blob.size, 2));
                spanstatus.innerHTML = "Ukuran Video " + formatBytes(blob.size, 2);
                //---------------------------------------------------
                var reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onload = function (e) {
                    let urlbs64 = e.target.result;
                    //console.log(urlbs64);
                    var inputbase64 = document.createElement("input");
                    inputbase64.setAttribute("name", "videodata");
                    inputbase64.setAttribute("id", "videodata");
                    inputbase64.value = urlbs64.replace(/^.*,/, '');

                    inputbase64.setAttribute("style", "display:none");

                    var inputfilename = document.createElement("input");
                    inputfilename.setAttribute("name", "videofilename");
                    inputfilename.setAttribute("id", "videofilename");
                    inputfilename.setAttribute("style", "display:none");
                    inputfilename.value = "Kelas_" + idJenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();;// + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

                    var inputmimetype = document.createElement("input");
                    inputmimetype.setAttribute("name", "videomimeType")
                    inputmimetype.setAttribute("id", "videomimeType")
                    inputmimetype.setAttribute("style", "display:none")

                    inputmimetype.value = "video/mp4";//srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg";;// 


                    resultuploadvideomateri.innerHTML = "";
                    resultuploadvideomateri.appendChild(inputbase64);
                    resultuploadvideomateri.appendChild(inputfilename);
                    resultuploadvideomateri.appendChild(inputmimetype);
                }
                //---------------------------------------------------
                chunks = [];

            }
            btnBack.addEventListener('click', (ev) => {
                if (mediaRecorder.state == "recording") {
                    alert("Anda sedang merekam. Silakan berhenti dulu dari perekaman");
                    return
                }
                video.play();
                vidSave.src = "";
                videostatus.removeAttribute("class");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "containerbaru w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
                spanstatus.innerHTML = "Kamera sudah siap, silakan rekam.";
                resultuploadvideomateri.innerHTML = "";



            })


        })
        .catch(function (err) {
            //console.log(err.name, err.message);
            alert(err.name + "\n" + err.message);
        });

    /*********************************
    getUserMedia returns a Promise
    resolve - returns a MediaStream Object
    reject returns one of the following errors
    AbortError - generic unknown cause
    NotAllowedError (SecurityError) - user rejected permissions
    NotFoundError - missing media track
    NotReadableError - user permissions given but hardware/OS error
    OverconstrainedError - constraint video settings preventing
    TypeError - audio: false, video: false
    *********************************/
    // let tmbldiv = document.getElementById("elemenvideogaleri");
    // tmbldiv.removeAttribute("style");
    // tmbldiv.setAttribute("style", "display:none");

    // elemenwebcam.setAttribute("style", "display:block");
    // kontrolgaleri.style.display = "inline-block";
    // resultuploadvideomateri.innerHTML = "";
    showtomboltombolwebcam();
}
const tutupkamera = () => {
    // vid.pause();
    // vidlayar.removeAttribute("src");
    //vidlayar.src=""
    // vidSave.removeAttribute("src");
    //vid.src = "";
    if (localStream == "") {
        alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    localStream.getTracks().forEach(k => k.stop());

    resultuploadvideomateri.innerHTML = "";
    tempattextarea.innerHTML = "";
}
function formatBytes(a, b = 2) {
    if (0 === a)
        return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}
const uploadvideomateri = () => {
    resultuploadvideomateri.innerHTML = "";


    //get the image selected
    var item = document.querySelector('#tmbluploadvideomateri').files[0];


    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        let mmtpe = event.target.result.match(/^.*(?=;)/)[0];


        var srcEncoded = event.target.result;


        resultuploadvideomateri.innerHTML = "";
        let di = document.createElement("div");
        di.setAttribute("class", "containerbaru w3-center")
        if (mmtpe.indexOf("application/vnd") > -1) {

            ifr = document.createElement("div");
            ifr.setAttribute("class", "responsive-iframebaru w3-xxxlarge w3-center");

            ifr.innerHTML = "PRATINJAU TIDAK TERSEDIA <br/> <br/> File Tidak Dikenal <br/> Jika tetap mengunggahnya, maka akan menjadi link download.";
            di.appendChild(ifr);
            resultuploadvideomateri.appendChild(di);
        } else {
            let ifr = document.createElement("iframe");
            ifr.setAttribute("class", "responsive-iframebaru")
            ifr.setAttribute("src", srcEncoded);
            di.appendChild(ifr);
            resultuploadvideomateri.appendChild(di)

        }
        resultuploadvideomateri.innerHTML += "<hr/>";

        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "videodata");
        inputbase64.setAttribute("id", "videodata");
        inputbase64.value = srcEncoded.replace(/^.*,/, '');
        inputbase64.setAttribute("style", "display:none");

        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "videofilename");
        inputfilename.setAttribute("id", "videofilename");
        inputfilename.setAttribute("style", "display:none");
        inputfilename.value = "Kelas_" + idJenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();;// + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "videomimeType")
        inputmimetype.setAttribute("id", "videomimeType")
        inputmimetype.setAttribute("style", "display:none")

        inputmimetype.value = srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg"; 


        resultuploadvideomateri.appendChild(inputbase64);
        resultuploadvideomateri.appendChild(inputfilename);
        resultuploadvideomateri.appendChild(inputmimetype);
        let teks1 = document.createTextNode("Data siap upload. Klik tombol ini ")
        resultuploadvideomateri.appendChild(teks1);
        let tmbl = document.createElement("button",);
        tmbl.setAttribute("class", "w3-black w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
        tmbl.setAttribute("onclick", "uplvideomateri2()");
        tmbl.innerHTML = "Upload ke Server"

        resultuploadvideomateri.append(tmbl);
        tmbl = document.createElement("button",);
        tmbl.setAttribute("class", "w3-red w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
        tmbl.setAttribute("onclick", "uplvideomateriyt()");
        tmbl.innerHTML = "Upload ke Youtube"

        resultuploadvideomateri.append(tmbl)

    }
    //daftarvideo();
    //tutupkamera();
}
function bukaelemengaleri() {
    let tmbldiv = document.getElementById("elemenvideogaleri");
    tmbldiv.removeAttribute("style");
    tmbldiv.setAttribute("style", "display:inline-block");
    tutupkamera();
    elemenwebcam.setAttribute("style", "display:none");
    // kontrolgaleri.style.display = "none";
    resultuploadvideomateri.innerHTML = "";
}
function bukaelemenwebcam() {
    let tmbldiv = document.getElementById("elemenvideogaleri");
    tmbldiv.removeAttribute("style");
    tmbldiv.setAttribute("style", "display:none");
    mulaivideo();
    elemenwebcam.setAttribute("style", "display:block");
    // kontrolgaleri.style.display = "inline-block";
    resultuploadvideomateri.innerHTML = "";
    showtomboltombolwebcam();

}
function bukascreenrecorder() {
    showtomboltombolscreenrecorder();
    let tmbldiv = document.getElementById("elemenvideogaleri");
    tmbldiv.removeAttribute("style");
    tmbldiv.setAttribute("style", "display:none");
    tutupkamera();
    elemenwebcam.setAttribute("style", "display:block");
    // kontrolgaleri.style.display = "inline-block";
    resultuploadvideomateri.innerHTML = "";


}
function showtomboltombolwebcam() {
    let el = document.getElementById("tomboltombolwebcam");
    let el2 = document.getElementById("tomboltombolscreenrecorder");
    el.style.display = "block";
    el2.style.display = "none";
    // vidlayar.setAttribute("poster", "/img/192.png");
    // vidlayar.play();
    // vidSave.stop();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
    spanstatus.innerHTML = "Kamera siap untuk merekam.";// <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");

}
function showtomboltombolscreenrecorder() {
    let el = document.getElementById("tomboltombolwebcam");
    let el2 = document.getElementById("tomboltombolscreenrecorder");
    el.style.display = "none";
    el2.style.display = "block";

    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
    spanstatus2.innerHTML = "Silakan pilih layar (Screen) untuk direkam.";// <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide")
}
const daftarvideo = async () => {
    //alert ("bakal dibuat modal");
    //koleksigambar.style.display = 'block';
    koleksivideo.style.display = 'block';
    tempattextarea.innerHTML = "";
    // document.getElementById("tabelkoleksigambarmateri").innerHTML ="";
    document.getElementById("tabelkoleksivideomateri").innerHTML = "<i class='fa fa-spin fa-refresh w3-xxxlarge'></i>";
    await fetch(linkmateri + "&action=koleksivideo")
        .then(m => m.json())
        .then(j => {
            // console.log(j)
            // console.log(j.records)
            // let datasheet = j.records;
            let tabelmateri = document.createElement("table");
            tabelmateri.setAttribute("class", "versi-table w3-card-4 w3-center");
            tabelmateri.setAttribute("id", "tabeltabelkoleksiuploadvideo");
            let row = tabelmateri.insertRow(0);
            let cell = row.insertCell(-1);
            cell.innerHTML = "No";
            cell = row.insertCell(-1);
            cell.setAttribute("style", "width:50%");
            cell.innerHTML = "Preview";
            cell = row.insertCell(-1);
            cell.innerHTML = "Tombol Copy";

            cell = row.insertCell(-1);
            cell.innerHTML = "Keterangan";



            for (let i = 0; i < j.records.length; i++) {
                row = tabelmateri.insertRow(-1);
                cell = row.insertCell(-1);
                cell.innerHTML = i + 1;
                cell = row.insertCell(-1);
                cell.innerHTML = j.records[i].htmlgambar;
                console.log(j.records[i].htmlgambar);
                cell = row.insertCell(-1);


                let txtarea = document.createElement("textarea");
                txtarea.setAttribute("id", "kodevideo" + i)
                txtarea.value = j.records[i].htmlgambar;
                txtarea.setAttribute("style", "width:30%");
                // cell.appendChild(txtarea);
                cell.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodevideo${i}')">Copy Kode</button>`;

                tempattextarea.appendChild(txtarea)
                cell = row.insertCell(-1);
                cell.innerHTML = j.records[i].keterangan;
            }
            document.getElementById("tabelkoleksivideomateri").innerHTML = "";
            document.getElementById("tabelkoleksivideomateri").appendChild(tabelmateri);

        })
    //console.log(linkmateri)
    mulaivideo()
}

let bukalayar = document.getElementById('bukalayar');
let mulairekamlayar = document.getElementById('start');
let stoprekamlayar = document.getElementById('stop');
let statusspan = document.getElementById('spanstatusrekaman2');
var displayMediaOptions = {
    audio: true,
    video: {
        mediaSource: "screen"
    }
}
let audioTrack, videoTrack, stream, mediaRecorderr, recordedChunks = [];
let tanda = 0;
bukalayar.addEventListener('click', (ev) => {


    layar = navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    layar.then(m => {
        [videoTrack] = m.getVideoTracks();
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((audiostream) => {
                [audioTrack] = audiostream.getAudioTracks();
                stream = new MediaStream([videoTrack, audioTrack]);
                // let video = document.querySelector('video');
                // if ("srcObject" in video) {
                //     video.srcObject = stream;
                // } else {
                //     //old version
                //     video.src = window.URL.createObjectURL(stream);
                // }
                //--------------------------------------------

                //--------------------------------------------
                vidlayar.srcObject = stream;
                localStream = stream;
                //vidSave.srcObject = stream;
                vidlayar.play();
                videoTrack.volume = 0;
                statusspan.innerHTML = "Anda siap merekam aktivitas layar. Klik tombol MULAI REKAM untuk merekam."
                mediaRecorderr = new MediaRecorder(stream);
                mediaRecorderr.ondataavailable = handleDataAvailable;
                mediaRecorderr.onstop = handleStop;
                tanda = 1;
            })



    })
    resultuploadvideomateri.innerHTML = "";
    tutupkamera();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
})
mulairekamlayar.addEventListener('click', (ev) => {
    // console.log(recordedChunks.length)
    //console.log(tanda)
    if (tanda == 0) {
        alert("Anda belum memilih layar untuk direkam. Silakan klik PILIH LAYAR dan arahkan pada layar yang ingin Anda rekam aktivitasnya.");
        return
    };
    spanstatus2.innerHTML = "Sedang merekam <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
    //console.log(mediaRecorderr);
    vidlayar.play();

    mediaRecorderr.start();


    resultuploadvideomateri.innerHTML = "";
    // Register Event Handlers

});
stoprekamlayar.addEventListener('click', (ev) => {
    if (tanda == 0 || mediaRecorderr.state == "inactive") {
        alert("Anda belum melakukan aktivitas rekam layar.")
        return
    }
    mediaRecorderr.stop();
    spanstatus2.innerHTML = "Rekaman Layar selesai dengan ";
    videostatus.removeAttribute("class");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-show");

});
function handleDataAvailable(e) {

    recordedChunks.push(e.data);
}
// Saves the video file on stop
async function handleStop(e) {
    resultuploadvideomateri.innerHTML = "";
    let blob = new Blob(recordedChunks, { 'type': 'video/mp4;' });
    recordedChunks = [];
    let videoURL = window.URL.createObjectURL(blob);
    vidSave.src = videoURL;

    spanstatus.innerHTML = "Ukuran Video " + formatBytes(blob.size, 2);
    spanstatus2.innerHTML += "Ukuran Video " + formatBytes(blob.size, 2);
    //---------------------------------------------------
    var reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = function (e) {
        let urlbs64 = e.target.result;
        // console.log(urlbs64);
        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "videodata");
        inputbase64.setAttribute("id", "videodata");
        inputbase64.value = urlbs64.replace(/^.*,/, '');

        inputbase64.setAttribute("style", "display:none");

        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "videofilename");
        inputfilename.setAttribute("id", "videofilename");
        inputfilename.setAttribute("style", "display:none");
        inputfilename.value = "Kelas_" + idJenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();;// + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "videomimeType")
        inputmimetype.setAttribute("id", "videomimeType")
        inputmimetype.setAttribute("style", "display:none")

        inputmimetype.value = "video/mp4";//srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg";;// 

        resultuploadvideomateri.innerHTML = ""
        resultuploadvideomateri.appendChild(inputbase64);
        resultuploadvideomateri.appendChild(inputfilename);
        resultuploadvideomateri.appendChild(inputmimetype);
    }
    //---------------------------------------------------
    recordedChunks = [];
    //vidlayar.src = "";
    tanda = 0;
    tutupkamera();


}
const uplvideomateri = async () => {
    let ketval = document.formuploadmateri.idmapel.value
    let val = (ketval == "") ? "e-lamaso" : ketval;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodata");
    gmbrfilename = document.getElementById("videofilename");
    gmbrmimeType = document.getElementById("videomimeType");
    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }
    let frmdata = new FormData();
    frmdata.append("gmbrdata", gmbrdata.value);
    frmdata.append("gmbrfilename", gmbrfilename.value);
    frmdata.append("gmbrmimeType", gmbrmimeType.value);
    frmdata.append("keterangan", val);

    resultuploadvideomateri.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`

    await fetch(linkmateri + "&action=uploadvideomateri", {
        method: 'post',
        body: frmdata
    })
        .then(m => m.json())
        .then(k => {
            //console.log(k);

            //resultuploadvideomateri.innerHTML = k.result;
            let txtarea = document.createElement("textarea");
            txtarea.setAttribute("id", "kodegambarjson")
            txtarea.textContent = k.result

            resultuploadvideomateri.innerHTML = `<br><button class="w3-button w3-tiny w3-block w3-round-xlarge w3-dark-grey" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            //tempattextarea.innerHTML = "";
            tempattextarea.appendChild(txtarea)

            let tb = document.getElementById("tabeltabelkoleksiuploadvideo");//.appendChild(txtarea)
            let tr = tb.insertRow(-1);
            let sel = tr.insertCell(-1);
            sel.innerHTML = "NEW";
            sel = tr.insertCell(-1);
            sel.innerHTML = k.result;
            sel = tr.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            sel = tr.insertCell(-1);
            sel.innerHTML = `Terbaru`;





            // resultuploadvideomateri.innerHTML = "";

            ///--------------------------------------------          
        })
        .catch(er => alert(er))


}
const uplvideomateri2 = async () => {
    let ketval = document.formuploadmateri.idmapel.value
    let val = (ketval == "") ? "e-lamaso" : ketval;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodata");
    gmbrfilename = document.getElementById("videofilename");
    gmbrmimeType = document.getElementById("videomimeType");
    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }
    let frmdata = new FormData();
    frmdata.append("gmbrdata", gmbrdata.value);
    frmdata.append("gmbrfilename", gmbrfilename.value);
    frmdata.append("gmbrmimeType", gmbrmimeType.value);
    frmdata.append("keterangan", val);

    resultuploadvideomateri.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`

    await fetch(linkmateri + "&action=uploadvideomateri", {
        method: 'post',
        body: frmdata
    })
        .then(m => m.json())
        .then(k => {
            //console.log(k);

            resultuploadvideomateri.innerHTML = k.result;
            let txtarea = document.createElement("textarea");
            txtarea.setAttribute("id", "kodegambarjson")
            txtarea.textContent = k.result

            resultuploadvideomateri.innerHTML += `<hr><button class="w3-button w3-tiny w3-block w3-round-xlarge w3-dark-grey" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            //tempattextarea.innerHTML = "";
            tempattextarea.appendChild(txtarea)
            //cell = row.insertCell(-1);
            //cell.innerHTML = j.records[i].keterangan;


            // document.getElementById("tabelkoleksigambarmateri").appendChild(tabelmateri)
            //document.getElementById("tabelkoleksigambarmateri").appendChild()
            //daftarGambar()
            let tb = document.getElementById("tabeltabelkoleksiuploadvideo");//.appendChild(txtarea)
            let tr = tb.insertRow(-1);
            let sel = tr.insertCell(-1);
            sel.innerHTML = "NEW";
            sel = tr.insertCell(-1);
            sel.innerHTML = k.result;
            sel = tr.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            sel = tr.insertCell(-1);
            sel.innerHTML = `Terbaru`;





            // resultuploadvideomateri.innerHTML = "";

            ///--------------------------------------------          
        })
        .catch(er => alert(er))


}
const uplvideomateriyt = () => {
    let ketval = document.formuploadmateri.idmapel.value
    let val = (ketval == "") ? "e-lamaso" : ketval;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodata");
    gmbrfilename = document.getElementById("videofilename");
    gmbrmimeType = document.getElementById("videomimeType");
    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }
    alert("Mengunggah video ke Youtube akan dipublikasikan di Chanel elamaso. Video Anda akan menjadi milik kami.")
    setTimeout(function () {
        alert("Maaf, fitur dalam tahap pengembangan.... :(")
    }, 1000);
    //resultuploadvideomateri.innerHTML = "";
}

///////////////////////// source WAKTU.JS
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}
function deleteZero(i) {
    if (i.slice(0, 1) == "0") {
        i = i.slice(1, 2);
    };
    return i;
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function tanggalfull(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn
}
function tanggalfulllengkap(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var detik = d.getSeconds()
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn + " Pukul " + addZero(jam) + ":" + addZero(menit) + ":" + addZero(detik);
}
const KoleksiIndeksBulandiSemester = (param) => {
    if (param == 1) {
        return [6, 7, 8, 9, 10, 11]
    } else {
        return [0, 1, 2, 3, 4, 5]
    }
}
const SemesterBerapaSekarang = () => { // mengembalikan string/integer berupa angka aja
    let sekarang = new Date();
    let indeksbulan = sekarang.getMonth();
    if (indeksbulan >= 6) {
        return 1

    } else {
        return 2
    }
}
angkasemester = SemesterBerapaSekarang();
const arrayIndeksBulan = KoleksiIndeksBulandiSemester(angkasemester);
const ArraySemesterDanTahunPelajaran = () => { // mengembalikan array berupa [semester, tahun pelajaran]
    let sekarang = new Date();
    let tahunawal, tahunakhir, strrtapel, semester, arr = [];
    let indeksbulan = sekarang.getMonth();
    let tahun = sekarang.getFullYear();
    if (indeksbulan >= 6) {
        semester = 1;
        tahunakhir = tahun + 1;
        tahunawal = tahun;
        strrtapel = tahunawal + "/" + tahunakhir;


    } else {
        semester = 2;
        tahunakhir = tahun;
        tahunawal = tahun - 1;
        strrtapel = tahunawal + "/" + tahunakhir;
    }
    arr.push(semester);
    arr.push(strrtapel);
    return arr


}
const NamaBulandariIndex = (index) => {
    let arraynamabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return arraynamabulan[index]


}
const namaBulanDiSemesterBerarpa = (idsemester, indeksbulan) => {
    let bulansemesterganjil = ["Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let bulansemestergenap = ["Januari", "Februari", "Maret", "April", "Mei", "Juni"];
    if (idsemester == 1) {
        return bulansemesterganjil[indeksbulan]
    }
    else {
        return bulansemestergenap[indeksbulan]

    }
}
const NamaHaridariIndex = (index) => {
    let arraynamabulan = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"];
    return arraynamabulan[index]


}
const kodeidabsen = (tgl) => {
    let d = new Date()
    let dt = d.getDate();
    let m = d.getMonth() + 1;
    let mo = addZero(m);
    let y = d.getFullYear();
    let output = dt + "" + mo + "" + y;
    return output
}
function ade() {
    let d = new Date()
    let dt = d.getDate();
    let m = d.getMonth() + 1;
    let mo = addZero(m);
    let y = d.getFullYear();
    let output = dt + "" + mo + "" + y;
    console.log(output)
}
const StringTanggal = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();
    let string = y + "-" + m + "-" + d;
    //console.log(string)
    return string
}
const NamaHariIniLengkap = () => {
    let tgl = new Date();
    let m = tgl.getMonth();
    let sm = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let day = tgl.getDay()
    let y = tgl.getFullYear();
    let string = y + "-" + sm + "-" + d;
    let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    //console.log(string)

    let hari = arraynamaHari[day] + ", " + tanggalfull(string)

    return hari
}
const BolehEksekusiJikaDiSemesterIni = (strdate) => {//(strdate)
    let bulannya = cekbulandisemesterberapa(strdate);
    let semesteskarang = SemesterBerapaSekarang()
    if (bulannya == semesteskarang) {
        return true
    } else {
        return false
    }

}
const IndeksBulanDiSemesteTertentu = (strdate) => { /// WAJIB DI KOLABORASI DENGAN SKRIP BolehEkseskusiJikaDiSemesterIni
    let bulannya = cekbulandisemesterberapa(strdate); // 1/2
    let semesteskarang = SemesterBerapaSekarang();// 1/2
    let indekbulan = new Date(strdate).getMonth()

    if (semesteskarang == 2) {
        return indekbulan

    } else {
        return indekbulan - 6

    }

}
function cekbulandisemesterberapa(stringdate) { // untuk mengecek (stringdate) "2021-1-1"
    let tgl = new Date(stringdate);
    let parbln = tgl.getMonth()
    // parbulan dalam bentuk index, sehngga Januari memiliki indeks nol
    // Semester 1 {juli, agustus, september, oktober, nopember, desember}
    // dengan index (6, 7, 8, 9, 10, 11)
    // semester 2 (januari, febr, mar, apr, mei, jun)
    // dengan index (0, 1, 2, 3, 4, 5)
    if (parbln >= 6) {
        return 1
    } else {
        return 2
    }

    //console.log(parbln)
    //return parbln
}
const tglStringZero = () => {
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    return idokmateri
}
function umure(tgllahir) {
    var curday = new Date().getDate();;//document.cir.len11.value;
    var curmon = new Date().getMonth();//.cir.len12.value;
    var curyear = new Date().getFullYear();//.cir.len13.value;

    var calday = new Date(tgllahir).getDate();//document.cir.len21.value;
    var calmon = new Date(tgllahir).getMonth();//document.cir.len22.value;
    var calyear = new Date(tgllahir).getFullYear();//document.cir.len23.value;
    // if(curday == "" || curmon=="" || curyear=="" || calday=="" || calmon=="" || calyear=="")
    // {
    // alert("Mohon Isi semua data -");
    // } 
    // else if(curday == calday &&  curmon==calmon && curyear==calyear)
    // {
    // alert("Sekarang Tanggal Kelahiran Anda & Umur Anda 0 Tahun")
    // }
    // else
    // {
    // var curd = new Date(curyear,curmon-1,curday);
    // var cald = new Date(calyear,calmon-1,calday);
    var curd = new Date(curyear, curmon, curday);
    var cald = new Date(calyear, calmon, calday);

    // var diff = Date.UTC(curyear, curmon, curday, 0, 0, 0)
    //         - Date.UTC(calyear, calmon, calday, 0, 0, 0);

    var dife = datediff(curd, cald);
    let objret = {};
    objret.tahun = dife[0];
    objret.bulan = dife[1];
    objret.hari = dife[2];
    return objret

    //document.cir.val.value=dife[0]+" Tahun, "+dife[1]+" Bulan, Dan "+dife[2]+" hari";

    // var secleft = diff/1000/60;
    // document.cir.val3.value=secleft+" Menit Sejak Anda Lahir";

    // var hrsleft = secleft/60;
    // document.cir.val2.value=hrsleft+" Jam Sejak Anda Lahir";

    // var daysleft = hrsleft/24;
    // document.cir.val1.value=daysleft+" Hari Sejak Anda Lahir"; 

    // //alert(""+parseInt(calyear)+"--"+dife[0]+"--"+1);
    // var as = parseInt(calyear)+dife[0]+1;

    // var diff =  Date.UTC(as,calmon,calday,0,0,0)
    //     - Date.UTC(curyear,curmon,curday,0,0,0);
    // var datee = diff/1000/60/60/24;
    // document.cir.val4.value=datee+" Hari tersisa untuk ulang Tahun Berikutnya"; 


    // }
}
function datediff(date1, date2) {
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
        y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();

    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth2(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}
function DaysInMonth2(Y, M) {
    with (new Date(Y, M, 1, 12)) {
        setDate(0);
        return getDate();
    }
}

/////////////////////// penggabungan UPLOADMATERI milik guru kelas dan guru mapel diputuskan pake punya guru mapel
const kopipaste = (id) => {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
    // alert("Berhasil Ngopi ... ^_^");
    resultuploadpotomateri.innerHTML = "";
}
const pratinjaubuatmateri = () => {
    //prevhp.style.display = "block";
    let idtextarea = document.formuploadmateri.idmateri;

    var copyText = document.formuploadmateri.idmateri; //document.querySelector(id);//document.getElementById(id);
    // copyText.select();
    // copyText.setSelectionRange(0, 999999)
    // // document.execCommand("copy");
    // // alert("Copied the text: " + copyText.value);
    // alert("Berhasil Ngopi ... ^_^");
    // materiimport.innerHTML = brkline(unescape(decodeURIComponent(copyText.value))).teks
    let arrteks = copyText.value.split("\n");

    let tteks = "";
    let kuncipg = "Kunci PG: <br>";
    let kuncienk = "<br>Arti enksripsi: <br>"
    let kuncikd = "Data Sebaran KD :<br>";
    let oo;
    let countpg = 0;
    let countess = 0;
    for (let i = 0; i < arrteks.length; i++) {
        tteks += brkline(arrteks[i]).teks;
        // kuncipg += brkline(arrteks[i]).kunci; //window.atob(brkline(json).kunci).split(",").join("<br>");
        if (arrteks[i].indexOf("_KUNCI-PG_") > -1) {
            kuncipg += brkline(arrteks[i]).kunci; //+"<br>";//.split(",").join("<br>");
            kuncienk += window.atob(brkline(arrteks[i]).kunci)

        }
        if (arrteks[i].indexOf("_KUNCI-KD_") > -1) {
            kuncikd += brkline(arrteks[i]).kd + "<br>";
            oo = objekKD(arrteks[i])
        }
        if (arrteks[i].indexOf("_PG_") > -1) {
            countpg += 1;
        }
        if (arrteks[i].indexOf("_ESSAY-NO_") > -1) {
            countess += 1;
        }



        materiimport.innerHTML = tteks;
        tambahtombolisijawaban()
        loadketkunci.innerHTML = kuncipg;
        loadketkunci.innerHTML += kuncienk;
        loadketKD.innerHTML = kuncikd;
        document.formuploadmateri.kuncikd.value = oo;
        document.formuploadmateri.jumlahpg.value = countpg;
        document.formuploadmateri.jumlahessay.value = countess;
        document.formuploadmateri.idkelas.value = idNamaKelas;
        document.formuploadmateri.idtoken.value = idJenjang;
        document.formuploadmateri.idSekolah.value = idNamaSekolah;
        document.formuploadmateri.dibuatoleh.value = namauser;
        //brkline(json).teks


    }
}
const gabolehaksessekalibuat = () => {
    let akses = document.formuploadmateri.idaksessiswa.value
    let betulbetul = (akses == "sekali") ? false : true;
    if (betulbetul) {
        alert("Anda tidak bisa memilih jenis tagihan, karena jenis pembelajaran(KBM) yang Anda edit hanya untuk latihan/tidak menerima tagihan nilai dari siswa");
        document.formuploadmateri.jenistagihan.value = ""
    }

}
const janganadatagihanbuat = () => {
    let akses = document.formuploadmateri.idaksessiswa.value
    let betulbetul = (akses == "sekali") ? false : true;
    if (betulbetul) {
        document.formuploadmateri.jenistagihan.value = ""

    } else {
        document.formuploadmateri.jenistagihan.value = "PH"
    }
}
const awalbuatwaktu = () => {
    let val = document.formuploadmateri.idtgl.value;
    let d = new Date(val)
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    let yy = d.getFullYear();


    let newval = addZero(dd) + "" + addZero(mm) + "" + yy;
    //console.log(newval)
    document.formuploadmateri.crtToken.value = newval

}
const objekKD = (asal) => {
    if (asal.indexOf("_KUNCI-KD_") > -1) {
        //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
        var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>"); //.split(":");
        let ar = []
        let ob = {};
        for (i = 0; i < tekskunci.length; i++) {

            // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
            ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
            ar.push(ob)
        }
        return JSON.stringify(ob)
        //localStorage.setItem("kuncikd", JSON.stringify(ob)) ;// ---> sudah objek array



    }
}
const daftarGambar = async () => {
    //alert ("bakal dibuat modal");
    koleksigambar.style.display = 'block';
    tempattextarea.innerHTML = "";
    // document.getElementById("tabelkoleksigambarmateri").innerHTML ="";
    document.getElementById("tabelkoleksigambarmateri").innerHTML = "<i class='fa fa-spin fa-refresh w3-xxxlarge'></i>";
    await fetch(linkmateri + "&action=koleksigambar")
        .then(m => m.json())
        .then(j => {
            let html = `<div class="w3-row">`;
            for (let i = j.records.length - 1; i >= 0; i--) {
                html += `<div class="w3-col l2 w3-border  w3-center">
                ${j.records[i].htmlgambar.replace("img src", "img class='up_gam_mat' onclick='klikpotosiswa(this)' src")}
                <br/><sub>${j.records[i].keterangan}</sub><br/>
                <button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambar${i}')">Copy Kode</button>
                </div>`;
                let txtarea = document.createElement("textarea");
                txtarea.setAttribute("id", "kodegambar" + i)
                txtarea.value = j.records[i].htmlgambar;
                txtarea.setAttribute("style", "width:30%");
                // cell.appendChild(txtarea);
                //cell.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambar${i}')">Copy Kode</button>`;

                tempattextarea.appendChild(txtarea)
            }

            html += `</div>`;
            // let tabelmateri = document.createElement("table");
            // tabelmateri.setAttribute("class", "versi-table w3-card-4 w3-center");
            // tabelmateri.setAttribute("id", "tabeltabelkoleksiuploadgambar");
            // let row = tabelmateri.insertRow(0);
            // let cell = row.insertCell(-1);
            // cell.innerHTML = "No";
            // cell = row.insertCell(-1);
            // cell.innerHTML = "Preview";
            // cell = row.insertCell(-1);
            // cell.innerHTML = "Tombol Copy";
            // cell = row.insertCell(-1);
            // cell.innerHTML = "Keterangan";
            // for (let i = j.records.length - 1; i >= 0; i--) {
            //     row = tabelmateri.insertRow(-1);
            //     cell = row.insertCell(-1);
            //     cell.innerHTML = i + 1;
            //     cell = row.insertCell(-1);
            //     cell.innerHTML = j.records[i].htmlgambar;
            //     cell = row.insertCell(-1);


            //     let txtarea = document.createElement("textarea");
            //     txtarea.setAttribute("id", "kodegambar" + i)
            //     txtarea.value = j.records[i].htmlgambar;
            //     txtarea.setAttribute("style", "width:30%");
            //     // cell.appendChild(txtarea);
            //     cell.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambar${i}')">Copy Kode</button>`;

            //     tempattextarea.appendChild(txtarea)
            //     cell = row.insertCell(-1);
            //     cell.innerHTML = j.records[i].keterangan;
            // }
            document.getElementById("tabelkoleksigambarmateri").innerHTML = "";
            document.getElementById("tabelkoleksigambarmateri").innerHTML = html;

        })
    //console.log(linkmateri)
}
const uploadgambarmateri = () => {
    resultuploadpotomateri.innerHTML = "";


    var resize_width = 900; //without px

    //get the image selected
    var item = "";
    item = document.querySelector('#tmbluploadgambarmatei').files[0];

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name; //get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        let mmtpe = event.target.result.match(/^.*(?=;)/)[0];
        var img = new Image(); //create a image
        img.src = event.target.result; //result is base64-encoded Data URI
        img.name = event.target.name; //set name (optional)
        img.size = event.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas'); //create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            // var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            var srcEncoded = ctx.canvas.toDataURL(el.target, mmtpe, 0);


            resultuploadpotomateri.innerHTML = "";

            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("name", "gmbrdata");
            inputbase64.setAttribute("id", "gmbrdata");
            inputbase64.value = srcEncoded.replace(/^.*,/, '');
            inputbase64.setAttribute("style", "display:none");

            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("name", "gmbrfilename");
            inputfilename.setAttribute("id", "gmbrfilename");
            inputfilename.setAttribute("style", "display:none");
            inputfilename.value = new Date().getTime();; // + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

            var inputmimetype = document.createElement("input");
            inputmimetype.setAttribute("name", "gmbrmimeType")
            inputmimetype.setAttribute("id", "gmbrmimeType")
            inputmimetype.setAttribute("style", "display:none")

            inputmimetype.value = srcEncoded.match(/^.*(?=;)/)[0];; //"data:image/jpeg"; 


            resultuploadpotomateri.appendChild(inputbase64);
            resultuploadpotomateri.appendChild(inputfilename);
            resultuploadpotomateri.appendChild(inputmimetype);
            let teks1 = document.createTextNode("Data siap upload. Klik tombol ini ")
            resultuploadpotomateri.appendChild(teks1);
            let tmbl = document.createElement("button",);
            tmbl.setAttribute("class", "w3-black w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
            tmbl.setAttribute("onclick", "uplgmbrmateri()");
            tmbl.innerHTML = "Upload ke Server"

            resultuploadpotomateri.append(tmbl)



        }

    }


    daftarGambar()
}
const uplgmbrmateri = async () => {
    let ketval = document.formuploadmateri.idmapel.value
    let val = (ketval == "") ? "e-lamaso" : ketval;

    let frmdata = new FormData();
    frmdata.append("gmbrdata", gmbrdata.value);
    frmdata.append("gmbrfilename", gmbrfilename.value);
    frmdata.append("gmbrmimeType", gmbrmimeType.value);
    frmdata.append("keterangan", val);

    resultuploadpotomateri.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`

    await fetch(linkmateri + "&action=uplgmbrmateri", {
        method: 'post',
        body: frmdata
    })
        .then(m => m.json())
        .then(k => {
            //console.log(k);

            resultuploadpotomateri.innerHTML = k.result;
            let txtarea = document.createElement("textarea");
            txtarea.setAttribute("id", "kodegambarjson")
            txtarea.textContent = k.result

            resultuploadpotomateri.innerHTML += `<br><button class="w3-button w3-tiny w3-round-xlarge w3-dark-grey" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            //tempattextarea.innerHTML = "";
            tempattextarea.appendChild(txtarea)
            //cell = row.insertCell(-1);
            //cell.innerHTML = j.records[i].keterangan;


            // document.getElementById("tabelkoleksigambarmateri").appendChild(tabelmateri)
            //document.getElementById("tabelkoleksigambarmateri").appendChild()
            daftarGambar()
            // let tb = document.getElementById("tabeltabelkoleksiuploadgambar"); //.appendChild(txtarea)
            // let tr = tb.insertRow(-1);
            // let sel = tr.insertCell(-1);
            // sel.innerHTML = "NEW";
            // sel = tr.insertCell(-1);
            // sel.innerHTML = k.result;
            // sel = tr.insertCell(-1);
            // sel.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            // sel = tr.insertCell(-1);
            // sel.innerHTML = `Terbaru`;







            ///--------------------------------------------          
        })
    //.catch(er => console.log(er))



}
const petunjukuploadmateri = () => {
    document.querySelector(".isipetunjukbuatmateri").innerHTML = `
    <table class="w3-table-all modifgaris" style="margin: 0 auto">
    <tr>
        <th>
            Keterangan
        </th>
        <th>
            Tampilan
        </th>
        <th>
            Parameter
        </th>
        <th>
            Tombol
        </th>
  
    </tr>
    <tr>
        <td>
            Judul
        </td>
        <td class="w3-padding">
            <h4 class="w3-card-4 w3-blue-grey w3-center w3-round-xxlarge">JUDUL</h4>
        </td>
        <td>
            default
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen1')">Copy</button>
        </td>
    </tr>
    <tr>
        <td>
            KUNCI jawaban Pilihan Ganda
        </td>
        <td>
  
            .... tidak ditampilkan di siswa dan teks jawaban akan dienkripsi().
            Cara mengeceknya ada di keterangan atas:
            <hr>
            Contoh penulisan: _KUNCI-PG_1A, 2B, 3C, ...dst...., 40D (diakhir kunci ga boleh ada koma
            lagi)
        </td>
        <td>
            Paramater: 1A &DoubleRightArrow; No. 1 kunci jawabannya A.
            <br>Masing-masing kunci jawaban dipisahkan dengan koma.<br><br>
            Contoh penulisan: _KUNCI-PG_1A, 2B, 3C, ...dst...., 40D (diakhir kunci ga boleh ada koma
            lagi)
  
  
  
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen25')">Copy</button>
        </td>
    </tr>
  
    <tr>
        <td>
            SEBARAN KD
        </td>
        <td>
            .... tidak ditampilkan di siswa dan teks jawaban akan dienkripsi().
            Cara mengeceknya ada di keterangan atas:
            <hr>Contoh penulisan: _KUNCI-KD_ <span class="w3-text-blue">PKN_</span>3.1 <b
                class="w3-text-red">:</b> 1, 2, 3 &lt;||&gt; <span
                class="w3-text-blue">MTK_</span>3.1 <b class="w3-text-red">:</b> 4, 5, 6
            <br><br>Default kode Mata pelajaran
            <table class="w3-table-all modifgaris w3-tiny">
              <tr>
                <th>Nama Mapel</th>
                <th>Kode<br><sub>HURUF KAPITAL SEMUA</sub></th>
              </tr>
              <tr>
                <td>
                  Pendidikan Kewarganegaraan
                </td>
                <td>
                  PKN
                </td>
              </tr>
              <tr>
                <td>
                  Pendidikan Agama Islam dan Budi Pekerti
                </td>
                <td>
                  PAI
                </td>
              </tr>
              <tr>
                <td>
                  Pendidikan Agama Kristen dan Budi Pekerti
                </td>
                <td>
                  PKRIS
                </td>
              </tr>
              <tr>
                <td>
                  Pendidikan Agama Katolik dan Budi Pekerti
                </td>
                <td>
                  PKATO
                </td>
              </tr>
              <tr>
                <td>
                  Pendidikan Agama Hindu dan Budi Pekerti
                </td>
                <td>
                  PHIND
                </td>
              </tr>
               <tr>
                <td>
                  Pendidikan Agama Budha dan Budi Pekerti
                </td>
                <td>
                  PBUDH
                </td>
              </tr>
              <tr>
                <td>
                  Pendidikan Agama Khonghucu dan Budi Pekerti
                </td>
                <td>
                  PKONG
                </td>
              </tr>
              <tr>
                <td>
                  Bahasa Indonesia
                </td>
                <td>
                  BINDO
                </td>
              </tr>
              <tr>
                <td>
                  Matematika
                </td>
                <td>
                  MTK
                </td>
              </tr>
              <tr>
                <td>
                  IPA (Ilmu Pengetahuan Alam)
                </td>
                <td>
                  IPA
                </td>
              </tr>
              <tr>
                <td>
                  IPS (Ilmu Pengetahuan Sosial)
                </td>
                <td>
                  IPS
                </td>
              </tr>
              <tr>
                <td>
                  SBDP (Seni Budaya dan Prakarya)
                </td>
                <td>
                  SBDP
                </td>
              </tr>
              <tr>
                <td>
                  PJOK (Pendidikan Jasmani dan Kesehatan)
                </td>
                <td>
                  PJOK
                </td>
              </tr>
              <tr>
                <td>
                  Bahasa Sunda (Mulok wajib)
                </td>
                <td>
                  BSUND
                </td>
              </tr>
              <tr>
                <td>
                  TIK (Mulok Pilihan)
                </td>
                <td>
                  TIKOM
                </td>
              </tr>
            </table>
  
  
        </td>
        <td>
            Paramater: "PKN_3.1: 1, 2, 3, 4, 5" &DoubleRightArrow; Mapel PKN dangan KD 3.1 untuk
            nomor soal: 1, 2, 3, 4, dan 5;<br>
            Masing-masing parameter dipisahkan kode &lt;||&gt;
            <br>Contoh penulisan: _KUNCI-KD_ PKN_3.1 : 1, 2, 3 &lt;||&gt; MTK_3.1 : 4, 5, 6
            <br>
            Kode | adalah tombol garis tegak lurus yang ada di atas tombol ENTER
  
  
  
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen26')">Copy</button>
        </td>
    </tr>
    <tr>
        <td>
            Video Youtube
        </td>
        <td class="w3-padding">
            <iframe width="300" height="215" src="https://www.youtube.com/embed/GR2jxW4tlkY"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </td>
        <td>
            default:<br>
            copy paste link url, contoh: <br>https://www.youtube.com/watch?v=GR2jxW4tlkY
            <br>
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen2')">Copy</button>
        </td>
    </tr>
    <tr>
        <td>
            Buat Tabel
        </td>
        <td class="w3-padding">
            <table class="versi-table">
                <tbody>
                    <tr>
                        <th> NO </th>
                        <th> NAMA </th>
                        <th> KELAS</th>
                    </tr>
                    <tr>
                        <td> 1 </td>
                        <td> ADZKA </td>
                        <td> 3A</td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> NUHAA </td>
                        <td> 4A</td>
                    </tr>
                </tbody>
            </table>
        </td>
        <td>
            default: <br>kode &lt;|HEADER|&gt; untuk batas garis header<br>
            kode &lt;|&gt; untuk batas garis sel <br>
            Kode | adalah tombol garis tegak lurus yang ada di atas tombol ENTER
  
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen3')">Copy</button>
        </td>
    </tr>
  
    <tr>
        <td>
            Pilihan Ganda (Normal), OPSI sampai D
        </td>
        <td class="w3-padding">
            <div id="contohsoalke-1" class="w3-badge w3-left">1</div>
            <ol style="list-style-type:decimal" start="1" class="w3-padding w3-card-4">
                <li style="list-style-type:none">
                    ASEAN didirikan berdasarkan Deklarasi Bangkok yang ditandatangani pada tanggal….
                    <hr style="border-top:1px solid olive">
  
                    <ol style="list-style-type:upper-alpha;">
                        <li>
                            <input type="radio" style="display:none" name="contohsoal1"
                                id="contoh1A" />
                            <label class="opsi" for="contoh1A">
                                ini teks opsi jawaban A.
                            </label>
                        </li>
                        <li>
                            <input type="radio" style="display:none" name="contohsoal1"
                                id="contoh1B" />
                            <label class="opsi" for="contoh1B">
                                ini teks opsi jawaban B.
                            </label>
                        </li>
                        <li>
                            <input type="radio" style="display:none" name="contohsoal1"
                                id="contoh1C" />
                            <label class="opsi" for="contoh1C">
                                contoh teks Jawaban C
                            </label>
                        </li>
                        <li>
                            <input type="radio" style="display:none" name="contohsoal1"
                                id="contoh1D" />
                            <label class="opsi" for="contoh1D">
                                ini teks opsi jawaban D.
                            </label>
                        </li>
                    </ol>
                </li>
            </ol>
  
        </td>
        <td>
            Masukkan No soal sebelum dicopy: <br>
            No. Soal: <input id="inputnosoalpg" type="number" value="1" min="1" max="40"
                onchange="pgeditnosoal()" />
  
  
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen4')">Copy</button>
        </td>
    </tr>
    <tr>
        <td>
            Pilihan Ganda (Normal), OPSI sampai C
        </td>
        <td class="w3-padding">
            <div id="contohsoalke-1C" class="w3-badge w3-left">1</div>
            <ol style="list-style-type:decimal" start="1" class="w3-padding w3-card-4">
                <li style="list-style-type:none">
                    ASEAN didirikan berdasarkan Deklarasi Bangkok yang ditandatangani pada tanggal….
                    <hr style="border-top:1px solid olive">
  
                    <ol style="list-style-type:upper-alpha;">
                        <li>
                            <input type="radio" style="display:none" name="contohsoal1C"
                                id="contoh1AC" />
                            <label class="opsi" for="contoh1AC">
                                ini teks opsi jawaban A.
                            </label>
                        </li>
                        <li>
                            <input type="radio" style="display:none" name="contohsoal1C"
                                id="contoh1BC" />
                            <label class="opsi" for="contoh1BC">
                                ini teks opsi jawaban B.
                            </label>
                        </li>
                        <li>
                            <input type="radio" style="display:none" name="contohsoal1C"
                                id="contoh1CC" />
                            <label class="opsi" for="contoh1CC">
                                contoh teks Jawaban C
                            </label>
                        </li>
  
                    </ol>
                </li>
            </ol>
  
        </td>
        <td>
            Masukkan No soal sebelum dicopy: <br>
            No. Soal: <input id="inputnosoalpgC" type="number" value="1" min="1" max="40"
                onchange="pgeditnosoalC()" />
  
  
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen27')">Copy</button>
        </td>
    </tr>
  
    <tr>
        <td>
            Pilihan Ganda (Opsi Berupa Tabel)
        </td>
        <td class="w3-padding">
            <div id="contohsoaltabelke1" class="w3-badge w3-left">1</div>
            <ol style="list-style-type:none;padding:0" class="w3-padding w3-white w3-card-4">
                <li style="border-top:1px double blue">
                    Yang termasuk contoh simbiosis dan contohnya yang tepat adalah ...
                    <hr style="border-top:1px solid olive">
                    <div style="overflow-x:auto">
                        <table class="versi-table">
                            <tbody>
                                <tr>
                                    <th> </th>
                                    <th> Simbiosis </th>
                                    <th> contoh </th>
                                </tr>
                                <tr>
                                    <td><input type="radio" style="display:none" name="soalx5"
                                            id="contoh5A	">
                                        <label class="opsi" for="contoh5A	">A</label>
                                    </td>
                                    <td> Mutualisme
                                    </td>
                                    <td> Hubungan bunga dengan lebah
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="radio" style="display:none" name="soalx5"
                                            id="contoh5B	">
                                        <label class="opsi" for="contoh5B	">B</label>
                                    </td>
                                    <td> Parasitisme
                                    </td>
                                    <td> Hubungan bakteri E-Coli pada usus manusia
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="radio" style="display:none" name="soalx5"
                                            id="contoh5C	">
                                        <label class="opsi" for="contoh5C	">C</label>
                                    </td>
                                    <td> Komensialisme
                                    </td>
                                    <td> Benalu pada batang pohon mangga
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="radio" style="display:none" name="soalx5"
                                            id="contoh5D	">
                                        <label class="opsi" for="contoh5D	">D</label>
                                    </td>
                                    <td> Xerofitisme
                                    </td>
                                    <td> Hubungan burung jalak dengan kerbau
                                    </td>
                                </tr>
                            </tbody>
                        </table><br>
                    </div>
                </li>
            </ol>
        </td>
        <td>
            Masukkan No soal sebelum dicopy: <br>
            No. Soal: <input id="inputnosoalpgtabel" type="number" value="1" min="1" max="20"
                onchange="pgeditnosoaltabel()" />
  
  
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen5')">Copy</button>
        </td>
    </tr>
  
    <tr>
        <td>
            ESSAY
        </td>
        <td class="w3-padding">
            <div id="contohsoalessay" class="w3-badge w3-left">1</div>
            <ol style="list-style-type:none" class="w3-padding w3-card-4">
                <li id="essaxy5" class="soalessaxy" style="border-bottom:1px solid blue">
                    <div id="pertanyaanessaxy_5">
                        Patung yang digunakan sebagai sarana untuk beribadah dan memiliki makna yang
                        religius adalah patung ….
                    </div>
                    <div id="tomboljawabaxn5">
                        <hr>
                        <button onclick="alert('hanya bisa diakses siswa')">
                            Ketik Jawaban No 5
                        </button><br><sub>atau</sub><br>
                        <button onclick="alert('hanya bisa diakses siswa')">
                            Upload Jawaban No 5
                        </button><br>
                        <sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>
                    </div><br>
                </li>
            </ol>
        </td>
        <td>
            Masukkan No soal sebelum dicopy: <br>
            No. Soal: <input id="inputnosoalessay" type="number" value="1" min="1" max="40"
                onchange="editnosoalessay()" />
  
  
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen6')">Copy</button>
        </td>
    </tr>
    <tr>
        <td>
            Matematika:<br>PECAHAN BIASA
        </td>
        <td>Contoh:
            <img
                src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cfrac%7Ba%7D%7Bb%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
        </td>
        <td>
            a = Pembilang<br>
            b = penyebut
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen7')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Matematika:<br>PECAHAN BIASA CAMPURAN
        </td>
        <td>Contoh:
            <img
                src="https://chart.apis.google.com/chart?cht=tx&amp;chl=a%5Cfrac%7Bb%7D%7Bc%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
        </td>
        <td>
            a = Satuan<br>
            b = Pembilang<br>
            c = penyebut
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen8')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Matematika:<br>AKAR KUADRAT
        </td>
        <td>Contoh:
            <img
                src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Csqrt%7Ba%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
        </td>
        <td>
            a = angka dalam akar<br>
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen9')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Matematika:<br>AKAR PANGKAT TIGA
        </td>
        <td>Contoh:
            <img
                src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Csqrt[3]%7Bangka%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
        </td>
        <td>
            angka = angka dalam akar<br>
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen10')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Matematika:<br>PANGKAT (Semua angka)
        </td>
        <td>Contoh:
            <img
                src="https://chart.apis.google.com/chart?cht=tx&amp;chl=a^b%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
        </td>
        <td>
            a = angka<br>
            b = eksponen<br><br>
            a dan b berupa angka
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen11')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Matematika:<br>PANGKAT HURUF (boleh huruf)
        </td>
        <td>Contoh:
            <img
                src="https://chart.apis.google.com/chart?cht=tx&amp;chl=a^b%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
        </td>
        <td>
            a = angka<br>
            b = eksponen<br><br>
            a dan b boleh huruf<br><br>
            Misalnya digunakan untuk menulis rumus matematika, contoh:<br><br>
            <!-- Rumus luas lingkaran adalah:<div class="w3-white"> <img
                    src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cpi%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
                x r <sup>2</sup></div> -->
            Rumus luas lingkaran adalah:<div class="w3-white"> &#8508; x r <sup>2</sup></div>
  
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen12')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Matematika:<br>EQUATION EDITOR LAINNYA
        </td>
        <td>Contoh:
            <img
                src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Csqrt%7B325%20%5Cfrac%7B2%7D%7B3%7D%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
        </td>
        <td>
            dibutuhkan kode equation editor di link ini:<br />
            <a href="http://atomurl.net/math/" target="_blank">equation editor
                online</a>;
            <br>
            Contoh di atas adalah dengan menggunakan kode: \sqrt{325\frac{2}{3}} <br>
            kode di atas dihilangkan spasinya;
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen13')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Operator pembagian
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &#247;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk operator matematika
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen14')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Tanda Derajat
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &#176;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk eksponen yang menyatakan suhu:<br>
            Suhu di Kota Depok adalah 35 &#176; Celcius
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen15')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> tanda sudut lancip
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &ang;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis simbol sudut lancip
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen16')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> tanda sudut siku-siku
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &angrtvb;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis simbol sudut siku-siku
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen17')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Plus Minus (Kurang lebih)
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &PlusMinus;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis simbol kurang lebih
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen18')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Checklist
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &checkmark;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis simbol ceklis
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen19')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Phi
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &#8508;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis simbol phi : 22/7
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen20')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Tanda panah ke kiri
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &larr;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis tanda panah
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen21')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Tanda panah ke kanan
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &rarr;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis tanda panah
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen22')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Tanda panah dobel ke kanan
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &DoubleLongRightArrow;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis tanda panah
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen23')">Copy</button>
        </td>
  
    </tr>
    <tr>
        <td>
            Simbol:<br> Tanda panah dobel ke kiri
        </td>
        <td>Contoh:
            <span class="w3-xxlarge">
                &DoubleLongLeftArrow;
            </span>
        </td>
        <td>
            default:
            Digunakan untuk menulis tanda panah
        </td>
        <td>
            <button class="w3-button w3-round-xlarge w3-teal"
                onclick="kopipaste('ketpen24')">Copy</button>
        </td>
  
    </tr>
  </table>
    `
    petunjukcarabuatmateri.style.display = "block"
    txtareapetunjuk.style.display = "block";
}
const publikasikanmateribaru = () => {
    document.getElementById("materiimport").innerHTML = "";
    let tglkosong = document.formuploadmateri.idtgl.value;
    let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
    let mapel = document.formuploadmateri.idmapel.value;
    let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

    let kuncikosong = document.formuploadmateri.kuncikd.value;
    let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
    if (bolmapel && boltgl && bolkd) {
        let dom = document.getElementById("formuploadmateri");
        let data = new FormData(dom);
        pranalamateri.style.display = "block";
        dom.reset();
        dom.idmateri.value = "";
        idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
        let url = linkmateri + "&action=materibaru"
        fetch(url, {
            method: 'post',
            body: data
        })
            .then(m => m.json())
            .then(f => {
                idpracetak.innerHTML = f.result;
                loadketkunci.innerHTML = "";

                loadketKD.innerHTML = "";
                //console.log(f)
                pembelajaran();
                updatematerikan();
                localStorage.removeItem("draftmateri")

            })
            .catch(er => idpracetak.innerHTML = "Maaf, terjadi kesalahan: <br> Error Code" + er)

    }

}
const daftarnilaikronologi = (id) => {

    idtabaktif.innerHTML = id;
    koreksidarimana.innerHTML = id + "_kronologi";
    // let datamaterilocal = JSON.parse(localStorage.getItem(teks))[id];
    let datamaterilocal = kronologijson[id];

    let materi = datamaterilocal.idmapel.toUpperCase();

    let mtri = datamaterilocal.idmapel;
    let tagih = datamaterilocal.jenistagihan;
    let ctok = datamaterilocal.crtToken;

    modaldaftarnilaikronologi.style.display = "block";
    document.querySelector("#modalidmapelkronologi").innerHTML = "<br>" + tagih + " " + materi;
    document.getElementsByClassName("tablinkkronologi")[0].click();

    let paramtambahan = "&idkelas=" + encodeURIComponent(idNamaKelas);

    fetch(constlinknilai + "?action=nilairseponkronologi" + paramtambahan)
        .then(m => m.json())
        .then(f => {
            let res = f.records;
            nilairesponkronologi = res.filter(k => k.idmapel == mtri && k.jenistagihan == tagih & k.crtToken == ctok)
            forModalTabelkronologi(id)
        })
}
function bukaModalTabkronologi(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("citykronologi");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinkkronologi");
    for (i = 0; i < x.length; i++) {
        tablinks[i].classList.remove("w3-light-grey");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add("w3-light-grey");

}
const forModalTabelkronologi = (id) => {
    //tes dulu bekerja di id tablinkKDtabel

    let datamaterilocal = kronologijson[id];
    // console.log(datamaterilocal)
    // // console.log(JSON.parse(datamaterilocal.kuncikd));
    let identitasmapel = datamaterilocal.idmapel;
    let idd = parseInt(id);
    let datakd = JSON.parse(datamaterilocal.kuncikd);
    let punyaessay = (datamaterilocal.jumlahessay == 0) ? false : true;
    // console.log(punyaessay)

    // console.log("datakd:")
    // console.log(datakd)

    let banyakkd = Object.keys(datakd);

    // console.log("banyakkd:")
    // console.log(banyakkd.length);
    // console.log("idKD");
    // console.log(banyakkd)
    // filter untuk dijadikan unik pada key
    let mapelunik = [];
    let koleksikd = []
    let kdpermapel = {};
    for (i = 0; i < banyakkd.length; i++) {
        let mp = banyakkd[i].split("_")[0]
        if (mapelunik.indexOf(mp) == -1) {
            mapelunik.push(mp);
        }
    }
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama)

    let koleksitokensiswa = jsondatasiswa.map(k => k.id)
    // console.log(kdpermapel);
    // console.log(mapelunik)
    //bikin tabel
    let tabel = document.createElement("table")
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabel_rekap_KDkronologi");
    //bikin head;
    //let row = tabel.insertRow(0)
    let rthead = tabel.createTHead();
    let rth = rthead.insertRow(0)
    let rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "No"
    rth.appendChild(rtd);
    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    rtd.innerHTML = "Nama Siswa"
    rth.appendChild(rtd);
    // if (punyaessay) {
    //   rtd = document.createElement("th")
    //   rtd.setAttribute("rowspan", 3)
    //   rtd.innerHTML = "Koreksi"
    //   rth.appendChild(rtd);
    // }

    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "Aksi"
    rth.appendChild(rtd);


    rtd = document.createElement("th")
    rtd.setAttribute("colspan", banyakkd.length)
    rtd.innerHTML = "Mata Pelajaran"
    rth.appendChild(rtd);

    rth = rthead.insertRow(-1);
    rth.setAttribute("colspan", banyakkd.length);
    rth2 = rthead.insertRow(-1)
    for (k = 0; k < mapelunik.length; k++) {
        rtd = document.createElement("th")
        //  rtd.innerHTML = mapelunik[k]
        //  rth.appendChild(rtd);
        let coun = 0;

        for (j = 0; j < banyakkd.length; j++) {

            let st = banyakkd[j]
            if (st.indexOf(mapelunik[k]) > -1) {
                coun++;


                //let tekconsol = "Mapel " + mapelunik[k] +"KD " + banyakkd[j];
                //console.log(tekconsol)
                let rtd1 = document.createElement("th")
                rtd1.innerHTML = banyakkd[j].split("_")[1] + "<br>" + banyakkd[j]
                rth2.appendChild(rtd1);
            }
        }
        rtd.innerHTML = mapelunik[k]
        rtd.setAttribute("colspan", coun)
        rth.appendChild(rtd);
    }
    let tbo = tabel.createTBody();
    for (z = 0; z < koleksinamasiswa.length; z++) {
        let rowisi = tbo.insertRow(-1);
        let sel = rowisi.insertCell(-1)
        sel.innerHTML = (z + 1);

        sel = rowisi.insertCell(-1)
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[z];
        // if (punyaessay) {
        sel = rowisi.insertCell(-1)
        sel.innerHTML = tombolaksikronologi(punyaessay, koleksitokensiswa[z], z, idd);
        // sel.innerHTML = `<button class="w3-button w3-blue">Koreksi</button>`;

        // }
        for (a = 0; a < mapelunik.length; a++) {
            //  rtd.innerHTML = mapelunik[k]
            //  rth.appendChild(rtd);
            let coun = 0;

            for (j = 0; j < banyakkd.length; j++) {

                let st = banyakkd[j];

                if (st.indexOf(mapelunik[a]) > -1) {
                    coun++;


                    let tekconsol = "Mapel " + mapelunik[a] + "KD " + banyakkd[j];
                    //console.log(tekconsol)

                    let sell = rowisi.insertCell(-1)
                    sell.innerHTML = nilaiKDSiswakronologi(koleksitokensiswa[z], banyakkd[j]).replace(".", ","); // banyakkd[j] + "nama = " + koleksinamasiswa[z];

                }
            }
        }

    }



    let idtabel = `tabel_rekap_KDkronologi`;
    let judul1 = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas}  id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkKDkronologitabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalPKD('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModalKD('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkKDkronologitabel.appendChild(tabel);
    let teksket = document.createTextNode("Tombol LJK merah menandakan LJK belum dikoreksi dan belum ada nilai")
    tablinkKDkronologitabel.appendChild(teksket)
    let brr = document.createElement("br")
    tablinkKDkronologitabel.appendChild(brr)
    teksket = document.createTextNode("Tombol LJK biru menandakan LJK sudah dikoreksi dan sudah ada nilai")
    tablinkKDkronologitabel.appendChild(teksket)

}
document.querySelector(".tabpgkronologi").addEventListener("click", function () {
    let a = parseInt(idtabaktif.innerHTML);

    formModalTabelAnalisisPGkronologi(a)
})
document.querySelector(".tabskorkronologi").addEventListener("click", function () {
    let a = parseInt(idtabaktif.innerHTML);
    formModalTabelAnalisisSkorkronologi(a)
})
const formModalTabelAnalisisPGkronologi = (id) => {
    let datamaterilocal = kronologijson[id];

    let jumlahpg = (datamaterilocal.jumlahpg == 0) ? 1 : parseInt(datamaterilocal.jumlahpg);

    let identitasmapel = datamaterilocal.idmapel;
    //console.log(jumlahpg);
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);
    let koleksitokensiswa = jsondatasiswa.map(k => k.id);
    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "table_rekap_pgkronologi");
    let thead = tabel.createTHead();
    let row = thead.insertRow(0);
    let th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.innerHTML = "No";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA SISWA";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("colspan", jumlahpg)
    th.innerHTML = "NOMOR SOAL";
    row.appendChild(th);

    row = thead.insertRow(-1)
    if (datamaterilocal.jumlahpg !== 0) {
        for (b = 0; b < jumlahpg; b++) {
            th = document.createElement("th");
            th.innerHTML = (b + 1);
            row.appendChild(th);
        }
    } else {
        th = document.createElement("th");
        th.innerHTML = "Tidak Ada PG";
        row.appendChild(th);
    }

    let bdy = tabel.createTBody();
    for (c = 0; c < koleksinamasiswa.length; c++) {
        let tr = bdy.insertRow(-1)
        let sel = tr.insertCell(-1)
        sel.innerHTML = (c + 1);

        sel = tr.insertCell(-1);
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[c];
        if (datamaterilocal.jumlahpg !== 0) {
            for (d = 0; d < jumlahpg; d++) {
                sel = tr.insertCell(-1)
                //sel.innerHTML = OpsiSiswakronologi(koleksinamasiswa[c],"PG_" + (d+1));
                if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
                    if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
                        sel.setAttribute("style", "background-color:aqua");
                        sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[1]
                    } else {
                        sel.setAttribute("style", "background-color:red");
                        sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[1]
                    }

                } else {
                    sel.innerHTML = ""
                }


            }

        } else {
            sel = tr.insertCell(-1)
            sel.innerHTML = "Tidak ada Soal PG"

        }

    }


    let idtabel = `table_rekap_pgkronologi`;
    let judul1 = `ANALISIS SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `ANALISIS SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas}  id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkPGkronologitabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkPGkronologitabel.appendChild(tabel);








}
const formModalTabelAnalisisSkorkronologi = (id) => {
    let datamaterilocal = kronologijson[id];
    let jumlahpg = parseInt(datamaterilocal.jumlahpg) + parseInt(datamaterilocal.jumlahessay);

    let identitasmapel = datamaterilocal.idmapel;
    //console.log(jumlahpg);
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);
    let koleksitokensiswa = jsondatasiswa.map(k => k.id);

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "table_rekap_skorkronologi");
    let thead = tabel.createTHead();
    let row = thead.insertRow(0);
    let th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.innerHTML = "No";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA SISWA";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("colspan", jumlahpg)
    th.innerHTML = "NOMOR SOAL";
    row.appendChild(th);

    row = thead.insertRow(-1)
    for (b = 0; b < jumlahpg; b++) {
        th = document.createElement("th");
        th.innerHTML = (b + 1);
        row.appendChild(th);
    }

    let bdy = tabel.createTBody();
    for (c = 0; c < koleksinamasiswa.length; c++) {
        let tr = bdy.insertRow(-1)
        let sel = tr.insertCell(-1)
        sel.innerHTML = (c + 1);

        sel = tr.insertCell(-1);
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[c];

        for (d = 0; d < jumlahpg; d++) {
            sel = tr.insertCell(-1)
            // sel.innerHTML = "-";
            if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
                if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
                    sel.setAttribute("style", "background-color:aqua");
                    sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2]
                } else {
                    sel.setAttribute("style", "background-color:red");
                    sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2]
                }

            } else {
                sel.innerHTML = ""
            }

        }

    }


    let idtabel = `table_rekap_skorkronologi`;
    let judul1 = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas}  id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkSkorkronologitabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkSkorkronologitabel.appendChild(tabel);








}
const tutuploadingljk = () => {
    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    infoloadingljk.innerHTML = "";
    loadingljk.style.display = 'none'
}
const nilaiKDSiswakronologi = (parNama, keyKD) => {
    let FilterRec = nilairesponkronologi.filter(k => k.tokensiswa == parNama);


    let jmlh = FilterRec.length,
        nn;
    if (jmlh > 0) {
        //JSON.parse(nilairespon.filter(k => k.namasiswa == "ABIN NUGRAHA")[0].nilaikd)
        let arry = FilterRec[jmlh - 1].nilaikd
        let obj = JSON.parse(arry)[keyKD];
        //console.log(obj);
        //nn = JSON.parse(FilterRec[jmlh - 1].nilaikd)[keyKD];
        nn = (obj >= 0) ? obj : "0.00";
        //console.log(nn)
    } else {
        nn = ""
    }
    return nn
}
const OpsiSiswakronologi = (parNama, keyKD) => {
    //nilairespon.filter(k=>k.namasiswa == "ABIN NUGRAHA").map(k => [k.PG_1, k.SKOR_1])
    let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
    let cek = nilairesponkronologi.filter(k => k.tokensiswa == parNama).map(d => [d[keyKD], d["SKOR_" + angka]]);

    //nilairespon.filter(k => k.namasiswa == "ABIN NUGRAHA").map(d => d["PG_4"])[0]
    // let cek = nilairespon.filter(k => k.namasiswa == parNama).map(d => d[keyKD]);
    let ada = cek.length;

    // let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
    // let  skoropsi =nilairespon.filter(k => k.namasiswa == parNama).map(d => d["SKOR_" + angka]);
    let opsinya = [];
    if (ada > 0) {
        opsinya = [true, cek[ada - 1][0], cek[ada - 1][1]];
    } else {
        opsinya = [false]
    }

    return opsinya
}
const tombolaksikronologi = (currEssay, parNama, z, idhtmlmateri) => {
    //let currEssay = ;//ada ga essay? false (jika ga ada)
    //anggap aja ada essay dulu!
    let kodehtml = "";
    let cek = nilairesponkronologi.filter(k => k.tokensiswa == parNama);

    if (cek.length == 0) {
        //jika siswa belum mengerjakan, tolong bantu isi!
        kodehtml = `<button class="w3-button w3-khaki w3-card-4" onclick="bantusiswaisiljk('${z + "_" + idhtmlmateri}')">Bantu Isi</button>`

    } else {
        // console.log(cek)
        // console.log(cek[cek.length - 1])
        // console.log(cek[cek.length - 1]['nilaiEssay'])
        let indek = cek.length - 1;
        let indekk = indek + "<|>" + parNama


        if (currEssay) {
            // jika ada essay, cek lagi. Nilai essaynya udah masuk apa belum
            // jika belum masuk, maka tampilkan tombol koreksi
            if (cek[indek].nilaiEssay == "") {
                kodehtml = `<button class="w3-button w3-red" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
          <button class="w3-button w3-green" onclick="gurumengoreksi('${indekk}')">Koreksi</button><br><br>
          <button class="w3-button w3-black" onclick="hapusljk('${cek[indek].idbaris}')">Hapus</button><br>
          `
            } else {
                kodehtml = `<button class="w3-button w3-blue" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
          <button class="w3-button w3-green" onclick="gurumengoreksi('${indekk}')">Koreksi Ulang</button><br><br>
          <button class="w3-button w3-black" onclick="hapusljk('${cek[indek].idbaris}')">Hapus</button><br>
          `
                //<button class="w3-button w3-green" onclick="gurumengoreksi('${indek}')">Koreksi Ulang</button><br></br>
                //
            }

        } else {
            kodehtml = `<button class="w3-button w3-blue" onclick = "lihatljksaya('${cek[indek].html_jawaban}')" > LJK</button ><br> <br> 
        <button class="w3-button w3-black" onclick="hapusljk('${cek[indek].idbaris}')">Hapus</button><br>
        `
        }
    }
    return kodehtml
}
const lihatljksaya = (html_jawaban) => {
    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";



        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`

        infoloadingljk.after(tombol)

    })

}
const gurumengoreksi2 = (bid) => {
    //let nilkdstr = cek.nilaikd;
    //let nilkdobj = JSON.parse(nilkdstr)
    let indek = bid.split("<|>")[0];
    let parnama = bid.split("<|>")[1];
    let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
    let idbaris = cek.idbaris;
    let html_jawaban = cek.html_jawaban;
    let ob = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd);
    let nilaisebelumnya = JSON.parse(cek.nilaikd)
    console.log(nilaisebelumnya)
    // let 



    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;

    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
        var elEssay = document.getElementsByClassName("koleksilj")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("untuklj", "");
                var tempattombol = document.getElementById("untuklj" + inidEl);
                var tombolsatu = document.createElement("input");
                tombolsatu.setAttribute("type", "number");
                tombolsatu.setAttribute("class", "koreksisoal");
                // tombolsatu.setAttribute("min", 0);
                // tombolsatu.setAttribute("max", 100);
                tombolsatu.setAttribute("onchange", "updatenilaikoreksi()");
                tempattombol.innerHTML = "Beri Nilai :";
                tempattombol.appendChild(tombolsatu);


            }
        }


        var tengahdulu = document.createElement("center");
        tengahdulu.setAttribute("style", "background-color:yellow");

        var inputidbaris = document.createElement("input");
        inputidbaris.setAttribute("id", "brs");
        inputidbaris.setAttribute("value", idbaris);
        inputidbaris.setAttribute("disabled", "true");
        inputidbaris.setAttribute("style", "display:block");

        var inputnilaikoreksi = document.createElement("input");
        inputnilaikoreksi.setAttribute("type", "number");
        inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
        inputnilaikoreksi.setAttribute("disabled", "true");

        var tombolkirim = document.createElement("button");
        tombolkirim.setAttribute("onclick", "siapkirimnilai()")
        tombolkirim.innerHTML = "Beri Nilai";


        tengahdulu.appendChild(inputidbaris);

        // let inputt = document.createElement("input");
        // inputt.setAttribute("id",)
        tengahdulu.innerHTML += "Preview Nilai Essay : "
        tengahdulu.appendChild(inputnilaikoreksi);
        tengahdulu.appendChild(tombolkirim);





        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`

        infoloadingljk.after(tengahdulu)
        infoloadingljk.after(tombol)

    })

}
const gurumengoreksi3 = (bid) => {
    let indek = bid.split("<|>")[0];
    let parnama = bid.split("<|>")[1];
    let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
    let idbaris = cek.idbaris;

    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
    let divljk = document.createElement("div");
    divljk.setAttribute("id", "divljkkoreksi");

    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    let html_jawaban = cek.html_jawaban;
    $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        // infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
        infoloadingljk.innerHTML = ""; //brkline(json).teks + "<br><br><br>";
        infoloadingljk.appendChild(divljk)
        divljkkoreksi.innerHTML = brkline(json).teks + "<br><br><br>";
        var elEssay = document.getElementsByClassName("koleksilj")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("untuklj", "");
                var tempattombol = document.getElementById("untuklj" + inidEl);
                var tombolsatu = document.createElement("input");
                tombolsatu.setAttribute("type", "number");
                tombolsatu.setAttribute("id", "koreksisoal_" + inidEl);
                tombolsatu.setAttribute("class", "koreksisoal");
                tombolsatu.setAttribute("onchange", `updatenilaikoreksi('${inidEl}')`);
                tempattombol.innerHTML = `Nilai Koreksi :<span id='nilaiessaykoreksi_${inidEl}'></span>`;
                tempattombol.appendChild(tombolsatu);


            }
        }
        //-----------------------------------------------------

        var tengahdulu = document.createElement("center");
        tengahdulu.setAttribute("style", "background-color:yellow");

        var inputidbaris = document.createElement("input");
        inputidbaris.setAttribute("id", "brs");
        inputidbaris.setAttribute("value", idbaris);
        inputidbaris.setAttribute("disabled", "true");
        inputidbaris.setAttribute("style", "display:block");

        var inputnilaikoreksi = document.createElement("input");
        inputnilaikoreksi.setAttribute("type", "number");
        inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
        inputnilaikoreksi.setAttribute("disabled", "true");

        var tombolkirim = document.createElement("button");
        tombolkirim.setAttribute("onclick", "siapkirimnilai()")
        tombolkirim.innerHTML = "Beri Nilai";

        let inputnilaikd = document.createElement("input")
        inputnilaikd.setAttribute("id", "nilaikdkoreksi")


        tengahdulu.appendChild(inputidbaris);
        tengahdulu.appendChild(inputnilaikd);

        // let inputt = document.createElement("input");
        // inputt.setAttribute("id",)
        tengahdulu.innerHTML += "Preview Nilai Essay : "
        tengahdulu.appendChild(inputnilaikoreksi);
        tengahdulu.appendChild(tombolkirim);





        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('divljkkoreksi,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`




        //---------------------------------------------------------------
        let ob = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd);
        let obnosoal = ubahjsonkuncikd(ob);
        //console.log(obnosoal)
        //console.log(obnosoal.length);
        let dibikin = Object.keys(obnosoal)
        //console.log(dibikin.length)
        for (let i = 0; i < dibikin.length; i++) {
            // console.log(dibikin[i])
            // console.log(])
            //infoloadingljk.innerHTML += `<input value="TES ${i}"/>`
            let lbl = document.createElement("label")
            let tek = document.createTextNode("No " + dibikin[i])
            lbl.appendChild(tek)
            let docinput = document.createElement("input")
            docinput.setAttribute("id", "SKOR_" + dibikin[i]);
            docinput.setAttribute("class", obnosoal[dibikin[i]]);
            docinput.setAttribute("name", "SKOR_" + dibikin[i]);
            docinput.setAttribute("value", cek["SKOR_" + dibikin[i]]);
            infoloadingljk.appendChild(lbl)
            infoloadingljk.appendChild(docinput)
        }

        docinput = document.createElement("textarea");
        //docinput.textContent = json
        docinput.setAttribute("id", "htmlljkkoreksi")
        infoloadingljk.appendChild(docinput)

        // docinput.textcontent
        // var teksarea = document.getElementById("tekshtmlnilai");
        // var isiteks = document.getElementById("borderidhasilakhirnama");
        // var teksbtoa = encodeURIComponent(isiteks.innerHTML);

        // teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));
        infoloadingljk.after(tengahdulu)
        infoloadingljk.after(tombol)

    })



}
function updatenilaikoreksi(id) {
    let inputedit = document.getElementById("koreksisoal_" + id);
    if (inputedit.value > 100) {
        alert("Nilai Maksimum 100, dan minimum 0")
        inputedit.value = 100;
    }
    document.getElementById("SKOR_" + id).value = (inputedit.value / 100).toFixed(2);
    document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;

    var kelasinput = document.getElementsByClassName("koreksisoal");
    var nilai = 0;
    for (i = 0; i < kelasinput.length; i++) {

        nilai += kelasinput[i].value * 1;

    }
    /// ---------------------------------------------------
    var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
    var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
    // document.getElementById("nilaiakhiressay").value = nilai;
    document.getElementById("nilaiakhiressay").value = nilaiakhir;
    /// ---------------------------------------------------

    //document.getElementById("htmlljkkoreksi").textContent = divljkkoreksi.innerHTML;
    document.getElementById("nilaiEssayku").innerHTML = nilaiakhir;

    let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
    let keykd = Object.keys(kd); // MTK_3.1 , PKN_3.5
    let objnilai = {};
    for (let k = 0; k < keykd.length; k++) {
        let nomorsoal = kd[keykd[k]];
        let jumlahnomor = nomorsoal.length;
        let count = 0;
        let inkd = document.getElementsByClassName(keykd[k]);
        for (let j = 0; j < inkd.length; j++) {
            count += inkd[j].value * 1;
            //console.log(inkd[j].value)
        }

        let nilaiakhir = (count / jumlahnomor * 100).toFixed(2)
        objnilai[keykd[k]] = nilaiakhir
    }
    document.getElementById("nilaikdkoreksi").value = JSON.stringify(objnilai)


    document.getElementById("prevprevnilaikoreksi").innerHTML = `<hr> Skor Essay = <br>${nilaiakhir} <hr> Skor KD = <br> ${JSON.stringify(objnilai)}`


}
function updatenilaikoreksi2() {
    var kelasinput = document.getElementsByClassName("koreksisoal");
    var nilai = 0;
    for (i = 0; i < kelasinput.length; i++) {
        if (kelasinput[i].value > 100) {
            alert("Nilai maksimal 100");
            kelasinput[i].value = 100;
        }
        nilai += kelasinput[i].value * 1;


    }
    var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
    var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
    //document.getElementById("nilaiakhiressay").value = nilai;
    //document.getElementById("nilaiakhiressay").value = nilaiakhir;
}
const ubahjsonkuncikd = (ob) => {
    //let ob = JSON.parse(kronologijson[0].kuncikd);
    let key = Object.keys(ob);
    let val = Object.keys(ob).map(m => ob[m]);
    let obnew = {}
    for (i = 0; i < val.length; i++) {
        let kol = val[i]
        for (j = 0; j < kol.length; j++) {
            obnew[kol[j]] = key[i]
        }
    }
    return obnew
}
const gurumengoreksi = (bid) => {
    let indek = bid.split("<|>")[0];
    let parnama = bid.split("<|>")[1];
    let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
    let idbaris = cek.idbaris;
    let prefikkodeunik = cek.matericode + "_" + cek.kodeunik + "_";
    let tagihankoreksi = cek.jenistagihan;
    let namasiswakoreksi = cek.namasiswa;

    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
    let divljk = document.createElement("div");
    divljk.setAttribute("id", "divljkkoreksi");
    let formljk = document.createElement("form");
    formljk.setAttribute("id", "formgurumengoreksi")
    //formljk.setAttribute("id", "formgurumengoreksi")

    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    let html_jawaban = cek.html_jawaban;
    $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        // infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
        infoloadingljk.innerHTML = ""; //brkline(json).teks + "<br><br><br>";
        infoloadingljk.appendChild(divljk)
        divljkkoreksi.innerHTML = brkline(json).teks + "<br><br><br>";
        var elEssay = document.getElementsByClassName("koleksilj")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("untuklj", "");
                var tempattombol = document.getElementById("untuklj" + inidEl);
                var tombolsatu = document.createElement("input");
                tombolsatu.setAttribute("type", "number");
                tombolsatu.setAttribute("id", "koreksisoal_" + inidEl);
                tombolsatu.setAttribute("value", cek["SKOR_" + inidEl] * 100);
                tombolsatu.setAttribute("class", "koreksisoal");
                tombolsatu.setAttribute("onchange", `updatenilaikoreksi('${inidEl}')`);
                tempattombol.innerHTML = `Nilai Koreksi :<span id='nilaiessaykoreksi_${inidEl}'></span>`;
                tempattombol.appendChild(tombolsatu);


            }
        }
        //-----------------------------------------------------
        infoloadingljk.appendChild(formljk);
        //dibikin fildseet
        let fieldsett = document.createElement("fieldset")
        fieldsett.setAttribute("style", "display:none");
        fieldsett.setAttribute("id", "kirimanedit");
        formgurumengoreksi.appendChild(fieldsett)

        let ob = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd);
        let obnosoal = ubahjsonkuncikd(ob);
        //console.log(obnosoal)
        //console.log(obnosoal.length);
        let dibikin = Object.keys(obnosoal)
        //console.log(dibikin.length)
        for (let i = 0; i < dibikin.length; i++) {
            // console.log(dibikin[i])
            // console.log(])
            //infoloadingljk.innerHTML += `<input value="TES ${i}"/>`
            let lbl = document.createElement("label")
            lbl.setAttribute("for", "SKOR_" + dibikin[i]);
            let tek = document.createTextNode("No " + dibikin[i])
            lbl.appendChild(tek)
            let docinput = document.createElement("input")
            docinput.setAttribute("id", "SKOR_" + dibikin[i]);
            docinput.setAttribute("class", obnosoal[dibikin[i]]);
            docinput.setAttribute("name", "SKOR_" + dibikin[i]);
            docinput.setAttribute("value", cek["SKOR_" + dibikin[i]]);
            kirimanedit.appendChild(lbl)
            kirimanedit.appendChild(docinput)
            let gantibaris = document.createElement("br")
            kirimanedit.appendChild(gantibaris)

        }

        var tengahdulu = document.createElement("fieldset");
        tengahdulu.setAttribute("style", "background-color:yellow;display:block");
        tengahdulu.setAttribute("id", "formedittontonin");
        tengahdulu.setAttribute("class", "w3-center");

        var inputidbaris = document.createElement("input");
        inputidbaris.setAttribute("id", "brs");
        inputidbaris.setAttribute("name", "brs");
        inputidbaris.setAttribute("class", "w3-input w3-center");
        inputidbaris.setAttribute("value", idbaris);
        // inputidbaris.setAttribute("disabled", "true");

        inputidbaris.setAttribute("style", "display:block");

        var inputnilaikoreksi = document.createElement("input");
        inputnilaikoreksi.setAttribute("type", "number");
        inputnilaikoreksi.setAttribute("class", "w3-input w3-center");
        inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
        inputnilaikoreksi.setAttribute("name", "nilaiakhiressay");


        var tombolkirim = document.createElement("button");
        tombolkirim.setAttribute("onclick", "siapkirimnilai()");
        tombolkirim.setAttribute("class", "wa");
        tombolkirim.innerHTML = "Beri Nilai";

        let inputnilaikd = document.createElement("input")
        inputnilaikd.setAttribute("id", "nilaikdkoreksi");
        inputnilaikd.setAttribute("name", "nilaikd");
        inputnilaikd.setAttribute("class", "w3-input w3-center");
        // inputnilaikd.setAttribute("disabled", false);

        lbl = document.createElement("label");
        lbl.setAttribute("for", "brs")
        tek = document.createTextNode("ID LJK")
        lbl.appendChild(tek)
        kirimanedit.appendChild(lbl)
        kirimanedit.appendChild(inputidbaris);

        lbl = document.createElement("label");
        lbl.setAttribute("for", "nilaikdkoreksi")
        tek = document.createTextNode("Nilai Per KD");
        lbl.appendChild(tek);
        kirimanedit.appendChild(lbl)

        kirimanedit.appendChild(inputnilaikd);

        // let inputt = document.createElement("input");
        // inputt.setAttribute("id",)
        kirimanedit.innerHTML += "Preview Nilai Essay : "
        kirimanedit.appendChild(inputnilaikoreksi);

        tengahdulu.innerHTML += "Preview Nilai Essay : "
        let sp = document.createElement("span");
        sp.setAttribute("id", "prevprevnilaikoreksi")
        tengahdulu.appendChild(sp)

        docinput = document.createElement("textarea");
        //docinput.textContent = json
        docinput.setAttribute("id", "htmlljkkoreksi")
        docinput.setAttribute("name", "htmlljkkoreksi")
        // formgurumengoreksi.appendChild(docinput)

        //     formgurumengoreksi.appendChild(tengahdulu)
        kirimanedit.appendChild(docinput)

        let inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "prefikkodeunik");
        inputprefik.setAttribute("name", "prefikkodeunik");
        inputprefik.setAttribute("value", prefikkodeunik);

        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "jenistagihankoreksi");
        inputprefik.setAttribute("name", "jenistagihankoreksi");
        inputprefik.setAttribute("value", tagihankoreksi);
        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "jenjangkoreksi");
        inputprefik.setAttribute("name", "jenjangkoreksi");
        inputprefik.setAttribute("value", idJenjang);
        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "kelaskoreksi");
        inputprefik.setAttribute("name", "kelaskoreksi");
        inputprefik.setAttribute("value", idNamaKelas);
        kirimanedit.appendChild(inputprefik)
        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "namasiswakoreksi");
        inputprefik.setAttribute("name", "namasiswakoreksi");
        inputprefik.setAttribute("value", namasiswakoreksi);
        kirimanedit.appendChild(inputprefik)


        formgurumengoreksi.appendChild(tengahdulu)
        formgurumengoreksi.after(tombolkirim);




        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('divljkkoreksi,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`




        //---------------------------------------------------------------


        // docinput.textcontent
        // var teksarea = document.getElementById("tekshtmlnilai");
        // var isiteks = document.getElementById("borderidhasilakhirnama");
        // var teksbtoa = encodeURIComponent(isiteks.innerHTML);

        // teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));

        infoloadingljk.after(tombol)

    })



}
const siapkirimnilai = () => {



    let hapusinput = document.querySelectorAll(".koreksisoal")

    for (let i = 0; i < hapusinput.length; i++) {
        let id = hapusinput[i].getAttribute("id").replace("koreksisoal_", ""); //i + 1;
        let inputedit = document.getElementById("koreksisoal_" + id);
        document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;



        hapusinput[i].remove();
    }
    //jaga-jaga jika ada LJK yang mau dikoreksi ulang
    let ttdkoreksi = document.querySelectorAll(".ttdkoreksi")
    for (let i = 0; i < ttdkoreksi.length; i++) {
        ttdkoreksi[i].remove();
    }


    // console.log(hapusinput.length)
    let isidiv = document.getElementById("divljkkoreksi")
    let htmlisidiv = isidiv.innerHTML;

    let nilaikd = JSON.parse(document.querySelector("#nilaikdkoreksi").value);

    let mapelnya = Object.keys(nilaikd)

    let teks = "";
    teks = `<table class="versi-table ttdkoreksi" style="margin:0 auto">
    <tr>
      <th colspan="2">Data Nilai</th>
      </tr><tr>
      <th>Mapel & KD</th>
      <th>Nilai</th>
    </tr>`
    for (let i = 0; i < mapelnya.length; i++) {
        teks += `<tr>
      <td>
        ${mapelnya[i].split("_")[0]}<br>
        KD ${mapelnya[i].split("_")[1]}
      </td>
      <td>
        ${nilaikd[mapelnya[i]]}
        </td>
      </tr>`
    }
    teks += `</table>`

    htmlisidiv += teks;
    let teksinner = `<div class="ttdkoreksi w3-card-4 w3-aqua w3-center w3-padding">
    Essay telah dikoreksi oleh = <br>${namauser}<br>
    Pada tanggal = <br>${tanggalfulllengkap(new Date())}
    </div>
    `
    htmlisidiv += teksinner;

    // htmlljkkoreksi.textContent = htmlisidiv;
    htmlljkkoreksi.textContent = window.btoa(unescape(encodeURIComponent(htmlisidiv)));
    let akseskoreksi = koreksidarimana.innerHTML;
    let idakseskoreksi = akseskoreksi.split("_")[0];
    let iddarimana = akseskoreksi.split("_")[1]

    let namaform = document.querySelector("#formgurumengoreksi")
    let dataform = new FormData(namaform)
    fetch(constlinknilai + "?action=koreksianguru", {
        method: "post",
        body: dataform
    }).then(m => m.json())
        .then(f => {
            //console.log(f);
            document.querySelector("#infoloadingljk").innerHTML = `<h3 class="w3-center">${f.result}</h3>`;
            if (iddarimana == "hariini") {
                getdaftarnilai(idakseskoreksi)
            } else (
                daftarnilaikronologi(idakseskoreksi)

            )

            //setTimeout(tutuploadingljk(), 5000)


        })
        .catch(er => console.log(er))
    document.querySelector("#infoloadingljk").innerHTML = `<i class="fa fa-spin fa-refresh w3-center w3-xxxlarge"></i>`

}
const bantusiswaisiljklama = (param) => {

    let params = param.split("_");
    let par = params[1]; //indek materi kbm
    parameterbantuisiljk = par;
    let idsw = params[0]; //indek id siswa

    //alert (par);
    let siswabantu = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw];

    loadingljk.style.display = "block";

    //bikin judul h4
    let datamateri = kronologijson;
    kodebarismateriyangdikerjakan = datamateri[par].idbaris;
    let adapg = (datamateri[par].jumlahpg == 0) ? false : true;

    let jumlahsoal = (datamateri[par].jumlahpg * 1) + (datamateri[par].jumlahessay * 1);

    //console.log(datamateri)
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";

    let tes = document.getElementById("infoloadingljk");
    // tes.innerHTML = `<i class="fa fa-spin fa-refresh w3-xxxlarge"></i> On Process ...`
    tes.innerHTML = "";

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Nama Siswa"
    var td = tr.insertCell(-1);
    td.innerHTML = siswabantu.pd_nama;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN<br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "timer");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    cel1.innerHTML = "Timer: ";
    var cdtimer = document.createElement("input")
    cdtimer.setAttribute("id", "cd_seconds");
    cdtimer.setAttribute("disabled", "true");
    cdtimer.setAttribute("value", datamateri[par].iddurasi);
    cdtimer.setAttribute("style", "width:50px")
    cel1.appendChild(cdtimer);
    cel1.innerHTML += " Menit."
    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "tempatdurasi");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    var cdstatus = document.createElement("b");
    cdstatus.setAttribute("id", "cd_status");
    var tekscdstatus = document.createTextNode("Durasi Penyelesaian:");
    cdstatus.appendChild(tekscdstatus);
    var cdjam = document.createElement("span");
    cdjam.setAttribute("id", "cd_h");
    var tekscdjam = document.createTextNode("00:");
    cdjam.appendChild(tekscdjam);
    var cdmenit = document.createElement("span");
    cdmenit.setAttribute("id", "cd_m");
    var tekscdmenit = document.createTextNode("00:");
    cdmenit.appendChild(tekscdmenit);
    var cddetik = document.createElement("span");
    cddetik.setAttribute("id", "cd_s");
    var tekscddetik = document.createTextNode("00");
    cddetik.appendChild(tekscddetik);
    var cdpause = document.createElement("input")
    cdpause.setAttribute("type", "button");
    cdpause.setAttribute("id", "cd_pause");
    cdpause.setAttribute("value", "Jeda");
    var cdpstop = document.createElement("input")
    cdpstop.setAttribute("type", "button");
    cdpstop.setAttribute("id", "cd_stop");
    cdpstop.setAttribute("value", "Selesai");
    var gntibaris = document.createElement("br");
    var controltimer = document.createElement("b")
    var tekscontroltimer = document.createTextNode("Control Timer:");
    controltimer.appendChild(tekscontroltimer);
    var controlstart = document.createElement("input");
    controlstart.setAttribute("type", "button");
    controlstart.setAttribute("id", "cd_start");
    controlstart.setAttribute("value", "Mulai Mengerjakan");
    var controlreset = document.createElement("input");
    controlreset.setAttribute("type", "button");
    controlreset.setAttribute("id", "cd_reset");
    controlreset.setAttribute("value", "Reset Timer");
    var titikdua = document.createElement("b");
    var tekstitikdua = document.createTextNode(":");
    titikdua.appendChild(tekstitikdua);
    cel1.appendChild(controltimer);
    cel1.innerHTML += "<br/>";
    cel1.appendChild(controlstart);
    //cel1.appendChild(controlreset);
    //cel1.appendChild(cdpause);
    cel1.appendChild(cdpstop);
    cel1.appendChild(gntibaris);
    cel1.appendChild(cdstatus);
    cel1.innerHTML += ":<br/>";
    cel1.appendChild(cdjam);
    cel1.innerHTML += ":";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);

    tes.appendChild(tabelidentitas);



    let formljkbantu = document.createElement("form")
    formljkbantu.setAttribute("id", "ljkbantu")
    formljkbantu.setAttribute("name", "ljkbantu")
    formljkbantu.setAttribute("class", "w3-hide")






    $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {

        document.querySelector("#infoloadingljk").innerHTML += brkline(json).teks;


        //console.log(kuncijawabanku)
        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban2('" + inidEl + "_" + idsw + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban2('" + inidEl + "_" + idsw + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }
        //})
        //idkelas	idmapel	namasiswa crtToken	jenistagihan	kodeunik		nilaikd	html_jawaban	emailguru
        document.querySelector("#infoloadingljk").appendChild(formljkbantu);
        let identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "idkelas")
        identitasljkbantu.setAttribute("name", "idkelas")
        identitasljkbantu.setAttribute("value", idNamaKelas);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("tokensiswa", "tokensiswa")
        identitasljkbantu.setAttribute("name", "tokensiswa")
        identitasljkbantu.setAttribute("value", siswabantu.id);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "idmapel")
        identitasljkbantu.setAttribute("name", "idmapel")
        identitasljkbantu.setAttribute("value", datamateri[par].idmapel);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "crtToken")
        identitasljkbantu.setAttribute("name", "crtToken")
        identitasljkbantu.setAttribute("value", datamateri[par].crtToken);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "jenistagihan")
        identitasljkbantu.setAttribute("name", "jenistagihan")
        identitasljkbantu.setAttribute("value", datamateri[par].jenistagihan);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "kodeunik")
        identitasljkbantu.setAttribute("name", "kodeunik")
        identitasljkbantu.setAttribute("value", datamateri[par].jenistagihan + "_" + datamateri[par].crtToken);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("textarea")
        identitasljkbantu.setAttribute("id", "buathtmlbantu")
        identitasljkbantu.setAttribute("name", "tekshtmlnilai")
        identitasljkbantu.setAttribute("value", "buathtmlbantu");
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "nilaikd")
        identitasljkbantu.setAttribute("name", "nilaikd")
        identitasljkbantu.setAttribute("value", "Nilai KD Otomatis");
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        //idtoken	idsekolah	nilaiPG	idbaris	nilaiEssay	matericode
        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "idtoken")
        identitasljkbantu.setAttribute("name", "idtoken")
        identitasljkbantu.setAttribute("value", datamateri[par].idtoken);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "idsekolah")
        identitasljkbantu.setAttribute("name", "idsekolah")
        identitasljkbantu.setAttribute("value", idNamaSekolah);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "nilaiPG")
        identitasljkbantu.setAttribute("name", "nilaiPG")
        // identitasljkbantu.setAttribute("value", "Nilai PG ");
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);


        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "nilaiEssay")
        identitasljkbantu.setAttribute("name", "nilaiEssay")
        // identitasljkbantu.setAttribute("value", "nilaiEssay");
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "matericode")
        identitasljkbantu.setAttribute("name", "matericode")
        identitasljkbantu.setAttribute("value", datamateri[par].idbaris);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);


        identitasljkbantu = document.createElement("input")
        identitasljkbantu.setAttribute("id", "namasiswa")
        identitasljkbantu.setAttribute("name", "namasiswa")
        identitasljkbantu.setAttribute("value", siswabantu.pd_nama);
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        identitasljkbantu = document.createElement("div")
        identitasljkbantu.setAttribute("id", "inputpgdanskor")
        identitasljkbantu.innerHTML = "tempat PG dan Skor:<hr>"
        document.getElementById("ljkbantu").appendChild(identitasljkbantu);

        //---nosoalpada skor, dan PG_1
        let obnosoal = JSON.parse(datamateri[par].kuncikd)
        let ob = ubahjsonkuncikd(obnosoal)
        let dibikin = Object.keys(ob);
        for (let i = 0; i < dibikin.length; i++) {
            let lbl = document.createElement("label")
            lbl.setAttribute("for", "SKOR_" + dibikin[i]);
            let tek = document.createTextNode("No " + dibikin[i])
            lbl.appendChild(tek)
            let docinput = document.createElement("input")
            docinput.setAttribute("id", "SKOR_" + dibikin[i]);
            docinput.setAttribute("class", "hitungskor");
            docinput.setAttribute("name", "SKOR_" + dibikin[i]);
            docinput.setAttribute("value", "");
            inputpgdanskor.appendChild(lbl);
            let br = document.createElement("br")
            inputpgdanskor.appendChild(br)
            inputpgdanskor.appendChild(docinput);
            br = document.createElement("br")
            inputpgdanskor.appendChild(br)
        }

        let nopg = datamateri[par].jumlahpg;
        for (let j = 0; j < nopg; j++) {
            lbl = document.createElement("label")
            lbl.setAttribute("for", "PG_" + (j + 1));
            let tek = document.createTextNode("No PG " + (j + 1))
            lbl.appendChild(tek)
            docinput = document.createElement("input")
            docinput.setAttribute("id", "PG_" + (j + 1));
            docinput.setAttribute("class", "hitungpg");
            docinput.setAttribute("name", "PG_" + (j + 1));
            docinput.setAttribute("value", "");
            inputpgdanskor.appendChild(lbl);
            let br = document.createElement("br")
            inputpgdanskor.appendChild(br)
            inputpgdanskor.appendChild(docinput);
            br = document.createElement("br")
            inputpgdanskor.appendChild(br)
        }


        identitasljkbantu = document.createElement("div")
        identitasljkbantu.setAttribute("id", "previewljkbantu")
        identitasljkbantu.setAttribute("class", "w3-card-4 w3-padding")
        identitasljkbantu.setAttribute("style", "display:none")
        identitasljkbantu.innerHTML = "previewljkbantu"
        document.getElementById("ljkbantu").after(identitasljkbantu);

        // identitasljkbantu = document.createElement("button")
        // identitasljkbantu.setAttribute("onclick", "cekljk()")
        // identitasljkbantu.setAttribute("class", "w3-button w3-card-4 w3-blue")
        // identitasljkbantu.innerHTML = "Preview LJK"
        // document.getElementById("ljkbantu").after(identitasljkbantu);

        previewljkbantu.innerHTML = buathtmlljk(adapg);
        selwaktumulai.innerHTML = tanggalfulllengkap(new Date());

        hasilakhirnamasiswa.innerHTML = siswabantu.pd_nama;
        hasilakhirmapeltema.innerHTML = datamateri[par].idmapel.toUpperCase();

        // let kuncijawabanku = "";
        // if (adapg) {
        //     kuncijawabanku = brkline(json).kunci;
        //     document.querySelector("#infoloadingljk").innerHTML += `<button class="wa" onclick="hasilakhirelamasopg('${kuncijawabanku}')">Selesai</button>`

        // } else {
        //     document.querySelector("#infoloadingljk").innerHTML += `<button class="wa" onclick="hasilakhirelamaso('${par}')">Selesai</button>`

        // }
        document.querySelector("#infoloadingljk").innerHTML += `<button class="wa" onclick="hasilakhirelamaso('${param}')">Selesai</button>`


    })


}
const bantusiswaisiljk = (param) => {

    let params = param.split("_");
    let par = params[1]; //indek materi kbm
    parameterbantuisiljk = par;
    let idsw = params[0]; //indek id siswa

    //alert (par);
    let siswabantu = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw];

    loadingljk.style.display = "block";

    //bikin judul h4
    let datamateri = kronologijson;
    kodebarismateriyangdikerjakan = datamateri[par].idbaris;
    let adapg = (datamateri[par].jumlahpg == 0) ? false : true;

    let jumlahsoal = (datamateri[par].jumlahpg * 1) + (datamateri[par].jumlahessay * 1);

    //console.log(datamateri)
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";

    let tes = document.getElementById("infoloadingljk");
    // tes.innerHTML = `<i class="fa fa-spin fa-refresh w3-xxxlarge"></i> On Process ...`
    tes.innerHTML = "";

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Nama Siswa"
    var td = tr.insertCell(-1);
    td.innerHTML = siswabantu.pd_nama;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN<br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "timer");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    cel1.innerHTML = "Timer: ";
    var cdtimer = document.createElement("input")
    cdtimer.setAttribute("id", "cd_seconds");
    cdtimer.setAttribute("disabled", "true");
    cdtimer.setAttribute("value", datamateri[par].iddurasi);
    cdtimer.setAttribute("style", "width:50px")
    cel1.appendChild(cdtimer);
    cel1.innerHTML += " Menit."
    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "tempatdurasi");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    var cdstatus = document.createElement("b");
    cdstatus.setAttribute("id", "cd_status");
    var tekscdstatus = document.createTextNode("Durasi Penyelesaian:");
    cdstatus.appendChild(tekscdstatus);
    var cdjam = document.createElement("span");
    cdjam.setAttribute("id", "cd_h");
    var tekscdjam = document.createTextNode("00:");
    cdjam.appendChild(tekscdjam);
    var cdmenit = document.createElement("span");
    cdmenit.setAttribute("id", "cd_m");
    var tekscdmenit = document.createTextNode("00:");
    cdmenit.appendChild(tekscdmenit);
    var cddetik = document.createElement("span");
    cddetik.setAttribute("id", "cd_s");
    var tekscddetik = document.createTextNode("00");
    cddetik.appendChild(tekscddetik);
    var cdpause = document.createElement("input")
    cdpause.setAttribute("type", "button");
    cdpause.setAttribute("id", "cd_pause");
    cdpause.setAttribute("value", "Jeda");
    var cdpstop = document.createElement("input")
    cdpstop.setAttribute("type", "button");
    cdpstop.setAttribute("id", "cd_stop");
    cdpstop.setAttribute("value", "Selesai");
    var gntibaris = document.createElement("br");
    var controltimer = document.createElement("b")
    var tekscontroltimer = document.createTextNode("Control Timer:");
    controltimer.appendChild(tekscontroltimer);
    var controlstart = document.createElement("input");
    controlstart.setAttribute("type", "button");
    controlstart.setAttribute("id", "cd_start");
    controlstart.setAttribute("value", "Mulai Mengerjakan");
    var controlreset = document.createElement("input");
    controlreset.setAttribute("type", "button");
    controlreset.setAttribute("id", "cd_reset");
    controlreset.setAttribute("value", "Reset Timer");
    var titikdua = document.createElement("b");
    var tekstitikdua = document.createTextNode(":");
    titikdua.appendChild(tekstitikdua);
    cel1.appendChild(controltimer);
    cel1.innerHTML += "<br/>";
    cel1.appendChild(controlstart);
    //cel1.appendChild(controlreset);
    //cel1.appendChild(cdpause);
    cel1.appendChild(cdpstop);
    cel1.appendChild(gntibaris);
    cel1.appendChild(cdstatus);
    cel1.innerHTML += ":<br/>";
    cel1.appendChild(cdjam);
    cel1.innerHTML += ":";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);

    tes.appendChild(tabelidentitas);



    let formljkbantu = document.createElement("form")
    formljkbantu.setAttribute("id", "ljkbantu")
    formljkbantu.setAttribute("name", "ljkbantu")
    formljkbantu.setAttribute("class", "w3-hide")






    $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {

        document.querySelector("#infoloadingljk").innerHTML += brkline(json).teks;


        //console.log(kuncijawabanku)
        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban2('" + inidEl + "_" + idsw + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban2('" + inidEl + "_" + idsw + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }
        //})
        //idkelas	idmapel	namasiswa crtToken	jenistagihan	kodeunik		nilaikd	html_jawaban	emailguru
        document.querySelector("#infoloadingljk").appendChild(formljkbantu);
        let uhtml = `<input name="tokensiswa" id="n_tokensiswa" />
        <input id="matericode" name="matericode" />
        <div id="tempatinputidentitashasilbelajar">tempatinputidentitashasilbelajar</div>
        <div id="tempatinputpilihanganda">Tempat Input Pilihan Ganda</div>
        <div id="tempatinputjawabanessay">Tempat Input Essay</div>
        <textarea id="tekshtmlnilai" name="tekshtmlnilai"></textarea>`
        document.getElementById("ljkbantu").innerHTML = uhtml;


        let identitasljkbantu = document.createElement("div")
        identitasljkbantu.setAttribute("id", "previewljkbantu")
        identitasljkbantu.setAttribute("class", "w3-card-4 w3-padding")
        identitasljkbantu.setAttribute("style", "display:none")
        identitasljkbantu.innerHTML = "previewljkbantu"
        document.getElementById("ljkbantu").after(identitasljkbantu);



        previewljkbantu.innerHTML = buathtmlljk(adapg);
        selwaktumulai.innerHTML = tanggalfulllengkap(new Date());

        hasilakhirnamasiswa.innerHTML = siswabantu.pd_nama;
        hasilakhirmapeltema.innerHTML = datamateri[par].idmapel.toUpperCase();
        let kc;
        if (adapg) {
            kc = brkline(json).kunci;
        } else {
            kc = 0;
        }
        document.querySelector("#infoloadingljk").innerHTML += `<button class="wa" onclick="hasilakhirelamaso('${par}_${datamateri[par].idbaris}_${kc}')">Selesai</button>`


    })


}
const cekljk = () => {
    var x = document.getElementById("previewljkbantu");
    if (x.style.display === "none") {
        x.style.display = "block";

    } else {
        x.style.display = "none";
    }
}
function PGBenar(opsi, kuncijawaban) { // kebalik, hahahaha
    var benarsalah;
    let benar = opsi.filter(f => f == kuncijawaban);
    if (benar.length == 1) {
        benarsalah = "Benar"
    } else {
        benarsalah = "Salah"
    }
    // if (opsi.indexOf(kuncijawaban) > -1) {
    //     benarsalah = "Benar"
    // } else {
    //     benarsalah = "Salah"
    // }
    // return benarsalah
    return benarsalah
}
function pgskor(opsik, kuncijawaban) { // kebalik, hahahaha
    var benarsalah;
    let opsi = opsik.split(",");
    let benar = opsi.filter(f => f == kuncijawaban);
    // let benar = kuncijawaban.filter(f => f == opsi);
    if (benar.length == 1) {
        benarsalah = 1;
    } else {
        benarsalah = 0;
    }
    // if (opsi.indexOf(kuncijawaban) > -1) {
    //     benarsalah = "Benar"
    // } else {
    //     benarsalah = "Salah"
    // }
    // return benarsalah
    return benarsalah
}
const hasilakhirelamasolamayangpggadipakelagi = (par) => {
    hasilakhirwaktu.innerHTML = tanggalfulllengkap(new Date());
    let koleksiceklis = []
    let datakuncikd = JSON.parse(kronologijson[parameterbantuisiljk].kuncikd); //JSON.parse(localStorage.getItem("kuncikd"))
    let keyarray = Object.keys(datakuncikd);
    let obj = {};
    for (l = 0; l < keyarray.length; l++) {
        let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
        let valulengt = valu.length; // [banyaknya array di atas]
        let coun = 0;
        for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
            for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B

                var skor = (PGBenar(arrkunci, koleksiceklis[m]) == "Benar") ? 1 : 0;
                if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
                    coun += skor
                }

            }
        }
        let nilaikd = (coun / valulengt * 100).toFixed(2);

        obj[keyarray[l]] = nilaikd


    }

    nilaikd.value = JSON.stringify(obj)
    // tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



    // var resulthasilessay = "JAWABAN ESSAY:<br/>";;
    var resulthasilessay = (kronologijson[parameterbantuisiljk].jumlahessay == 0) ? "" : "JAWABAN ESSAY:<br/>";;

    //resulthasilessay += "<!-- ADD_PAGE -->";
    var elFilejawaban = document.getElementsByClassName("filejawaban");
    if (elFilejawaban.length > 0) { //mengantisipasi jika tidak ada filejawaban kosong ga perlu dieksekusi
        for (var c = 0; c < elFilejawaban.length; c++) {
            var innernya = elFilejawaban[c].tagName;
            var noessay = elFilejawaban[c].getAttribute("id").replace("filejawaban", "");
            //console.log(innernya)
            if (innernya == "TEXTAREA") {
                resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
                resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";
                resulthasilessay += elFilejawaban[c].value.split("\n").join("<br/>");
                resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                resulthasilessay += "</li></ol>";
            } else {
                resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
                resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";

                resulthasilessay += elFilejawaban[c].outerHTML;
                resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                resulthasilessay += "</li></ol>";

            }
        }

    }
    resumenilaiskhir.innerHTML = resulthasilessay;


    buathtmlbantu.textContent = window.btoa(unescape(encodeURIComponent(previewljkbantu.innerHTML)));
    let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
    let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
    let namaform = document.getElementById("ljkbantu")
    let dataform = new FormData(namaform);
    fetch(constlinknilai + "?action=gurukirimnilai", {
        method: 'post',
        body: dataform
    })
        .then(u => u.json())
        .then(q => {
            document.getElementById("infoloadingljk").innerHTML = q.result;
            if (iddarimana == "hariini") {
                getdaftarnilai(idakseskoreksi)
            } else (
                daftarnilaikronologi(idakseskoreksi)

            )

        })
        .catch(er => console.log(er))
    document.getElementById("infoloadingljk").innerHTML = `<i class="fa fa-spin fa-refresh w3-xxlarge" style="margin:0 auto"></i> proses kirim ....`;
}

function hasilakhirelamaso(id) {
    // let dlo = JSON.parse(localStorage.getItem("materi"))[id];
    // let sw = JSON.parse(localStorage.getItem("typeuser"))
    let x = id.split("_")[0];
    let y = id.split("_")[1];
    let kc = id.split("_")[2]
    let dlo = kronologijson.filter(s => s.idbaris == y)[0];
    console.log(dlo)
    let sw = jsondatasiswa[y]

    let keytokenakses = dlo.idaksessiswa;

    let jumlahpg = parseInt(dlo.jumlahpg);
    let jumlahessay = parseInt(dlo.jumlahessay);
    //sembunyikan dulu konten materinya;

    //document.querySelector(".tombol_hasilakhirelamaso").className = document.querySelector(".tombol_hasilakhirelamaso").className.replace("w3-show", "w3-hide");
    //kita buat identitasnya dulu;
    document.getElementById("hasilakhirnamasekolah").innerHTML = idNamaSekolah.toUpperCase();
    document.getElementById("hasilakhirsemestertapel").innerHTML = "Semester " + semester_bar + " Tahun Pelajaran " + tapel_bar;
    document.getElementById("hasilakhirtokensiswa").innerHTML = sw.id;
    document.getElementById("hasilakhirnamasiswa").innerHTML = sw.pd_nama;
    document.getElementById("hasilakhirkelas").innerHTML = sw.nama_rombel;
    document.getElementById("hasilakhirmapeltema").innerHTML = dlo.idmapel;
    document.getElementById("hasilakhirjenistagihan").innerHTML = (dlo.jenistagihan == "") ? "Latihan/Rangkuman" : dlo.jenistagihan;
    document.getElementById("hasilakhirjumlahpg").innerHTML = jumlahpg;
    document.getElementById("hasilakhirjumlahessay").innerHTML = jumlahessay;
    //untuk muatan kompetensi, stringnya dibuat dulu dari objek
    let mkd = (dlo.kuncikd == "undefined" || dlo.kuncikd == "") ? [] : Object.keys(JSON.parse(dlo.kuncikd));
    let str = "";
    mkd.forEach(s => str += s.split("_")[0] + " KD " + s.split("_")[1] + "<br/>");
    document.getElementById("hasilakhirmuatankompetensi").innerHTML = str;
    document.getElementById("hasilakhirwaktu").innerHTML = tanggalfulllengkap(new Date());

    //cek dulu soal pg dan essay lalu elemennya ditaruh di tempatLJBaru 
    let tempatljpgbaru = document.querySelector(".ljksiswa_pg");
    let tempatljessaybaru = document.querySelector(".ljksiswa_essay");
    let tempatskorpgbaru = document.querySelector(".ljksiswa_nilaipg");
    let tempatskoressaybaru = document.querySelector(".ljksiswa_nilaiessay");
    //deteksi semua elemen terkait konten, seperti SOAL PG, KUNCI, yang telah dipilih siswa;
    let elSoal = document.getElementsByClassName("calcnosoal");
    let elPG = document.getElementsByClassName("calc");

    //periksa apakah opsi pg ada sampai D atau tidak (perbedaan kelas tinggi dan rendah)
    let datapg = [];
    for (i = 0; i < elPG.length; i++) {
        datapg.push(elPG[i].getAttribute("id"));
    }
    let jenisopsi = datapg.map(s => s.match(/[A-D]/g)[0]);
    let tipeopsi = jenisopsi.filter((x, i, a) => a.indexOf(x) == i);

    //siapkan elemen html untuk Lembar Jawaban PG dan skornya
    let htmlljpg = "";
    let htmlpgskor = "";
    //cek dulu ada berapa soal PG dan Essay
    if (jumlahpg == 0) {
        htmlljpg = "";
        htmlpgskor = `<div class="w3-large w3-border w3-center w3-hide" id="nilaiPGku" style="height:100px"></div>`
        if (tempatskorpgbaru.className.indexOf("w3-hide") == -1) {
            tempatskorpgbaru.className += " w3-hide"
        }
        if (tempatljpgbaru.className.indexOf("w3-hide") == -1) {
            tempatljpgbaru.className += " w3-hide"
        }
    } else {
        tempatskorpgbaru.className = tempatskorpgbaru.className.replace("w3-hide", "");
        tempatljpgbaru.className = tempatljpgbaru.className.replace("w3-hide", "");
        htmlpgskor = `<h5 class="w3-center w3-card-4 warnaeka">NILAI PG</h5>
        <div class="w3-large w3-border w3-center" id="nilaiPGku" style="height:100px"></div>
        `;
        htmlljpg = `<h5 class="w3-center w3-card-4 warnaeka">PILIHAN GANDA</h5>
        <table class="w3-table-all garis w3-centered tblljkpg w3-small">
        <caption>Tabel Jawaban Pilihan Ganda</caption>
        <tr>
        <th>No</th>
        <th colspan="${tipeopsi.length}">PG yang dipilih</th>
        </tr>`;
        for (i = 0; i < jumlahpg; i++) {
            htmlljpg += `<tr><td>${i + 1}</td>`;
            for (j = 0; j < tipeopsi.length; j++) {
                htmlljpg += `<td class="tdtblljkpg_${i + 1}${tipeopsi[j]}">${tipeopsi[j]}</td>`
            }
            htmlljpg += `</tr>`;

        }
        htmlljpg += `<table class="w3-table-all"><sub>Ket: yang berwana kuning adalah pilihan opsi yang dipilih.</sub>`;
    }
    tempatljpgbaru.innerHTML = htmlljpg;
    tempatskorpgbaru.innerHTML = htmlpgskor;
    //sekarang tandai td dan buat elemen input untuk dikirim
    let tabelpg, ABCD, skor;
    let arrskor = [];
    let koleksiceklis = []
    let kuncijawaban = (kc == 0) ? [] : window.atob(kc).split(",");

    tempatinputpilihanganda.innerHTML = "Input Pilihan Ganda:<br/>"
    for (k = 0; k < elPG.length; k++) {
        if (elPG[k].checked) {
            ABCD = elPG[k].getAttribute("id").replace(/\s+/g, "");
            koleksiceklis.push(ABCD);
            tabelpg = document.querySelector(".tdtblljkpg_" + ABCD);
            // tabelpg.setAttribute("style", "background-color:rgb(250, 234, 8)");
            tabelpg.className += " warnaeka";
            tempatinputpilihanganda.innerHTML += "No. " + ABCD.match(/\d+/)[0] + " <input type='text' name='PG_" + ABCD.match(/\d+/)[0] + "' value='" + ABCD.match(/[A-D]/g)[0] + "'/><br/>"
            skor = (PGBenar(kuncijawaban, ABCD) == "Benar") ? 1 : 0;
            arrskor.push(skor)
            //cektagihan.innerHTML += koleksiceklis[j] +" = " + PGBenar(kuncijawaban, koleksiceklis[j]) +"<br/>"
            tempatinputpilihanganda.innerHTML += "Skor No. " + ABCD.match(/\d+/)[0] + " <input type='text' name='SKOR_" + ABCD.match(/\d+/)[0] + "' value='" + skor + "'/><br/>"

        }
    }

    if (jumlahpg !== 0) {

        let nilaiskorarray = (arrskor.length == 0) ? 0 : arrskor.reduce((a, b) => a + b);
        console.log(nilaiskorarray);
        let skorakhirpg = (nilaiskorarray / elSoal.length * 100).toFixed(2)
        let tekskorpg = ((isNaN(skorakhirpg)) ? "" : skorakhirpg);
        document.getElementById("nilaiPGku").innerHTML = tekskorpg;
    };



    //siapkan elemen html untuk lembar jawaban essay
    let htmlljessay = "";
    if (jumlahessay == 0 || jumlahessay == "") {

        if (tempatskoressaybaru.className.indexOf("w3-hide") == -1) {
            tempatskoressaybaru.className += " w3-hide"
        }
        if (tempatljessaybaru.className.indexOf("w3-hide") == -1) {
            tempatljessaybaru.className += " w3-hide"
        }
        tempatskoressaybaru.innerHTML = "";

    } else {
        tempatskoressaybaru.className = tempatskoressaybaru.className.replace("w3-hide", "");
        tempatljessaybaru.className = tempatljessaybaru.className.replace("w3-hide", "");
        tempatskoressaybaru.innerHTML = `<h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>
        <div class="w3-border w3-center" id="nilaiEssayku" style="height:100px">Menunggu Dikoreksi</div>
        `
        var resulthasilessay = "";
        var elFilejawaban = document.getElementsByClassName("filejawaban");
        if (elFilejawaban.length > 0) { //mengantisipasi jika tidak ada filejawaban kosong ga perlu dieksekusi
            for (var c = 0; c < elFilejawaban.length; c++) {
                var innernya = elFilejawaban[c].tagName;
                var noessay = elFilejawaban[c].getAttribute("id").replace("filejawaban", "");
                if (innernya == "TEXTAREA") {
                    resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b><br/>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";
                    resulthasilessay += elFilejawaban[c].value.split("\n").join("<br/>");
                    resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                    resulthasilessay += "</li></ol>";
                } else {
                    resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b><br/>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";
                    resulthasilessay += elFilejawaban[c].outerHTML;
                    resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                    resulthasilessay += "</li></ol>";
                }
            }
        }
        tempatljessaybaru.innerHTML = resulthasilessay;
    }

    // INI KODE UNTUK YANG DIKIRIMKAN
    // identitas utamanya: idbaris materi yang dikerjakan, dengan token siswa
    document.ljkbantu.matericode.value = dlo.idbaris;
    document.ljkbantu.tokensiswa.value = sw.id;
    let constidok = dlo.crtToken;
    tempatinputidentitashasilbelajar.innerHTML = "Nama Sekolah: <input name='idsekolah' id='kirimidsekolah' type='text' value='" + dlo.idSekolah + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "emailguru: <input name='emailguru' id='emailguru' type='text' value='" + jlo.surel + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Nama Kelas : <input name='idkelas' id='kirimidkelas' type='text' value='" + idNamaKelas + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Mapel : <input name='idmapel' id='kirimidmapel' type='text' value='" + dlo.idmapel + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Token : <input name='idtoken' id='kirimidtoken' type='text' value='" + dlo.idtoken + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "jenistagihan : <input name='jenistagihan' id='kirimjenistagihan' type='text' value='" + dlo.jenistagihan + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "kodeunik : <input name='kodeunik' id='kirimkodeunik' type='text' value='" + dlo.jenistagihan + "_" + constidok + "'/><br/>";

    tempatinputidentitashasilbelajar.innerHTML += "crtToken : <input name='crtToken' id='kirimcrtToken' type='text' value='" + constidok + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Nama : <input name='namasiswa' id='kirimnamasiswa' type='text' value='" + sw.pd_nama + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "NIlai PG : <input name='nilaiPG' id='kirimnilaiPG' type='text' value='" + nilaiPGku.innerHTML + "'/><br/>";


    // masukkan nilai tiap-tiap KD dalam bentuk objek
    let datakuncikd = JSON.parse(dlo.kuncikd)
    let keyarray = Object.keys(datakuncikd);
    let obj = {};
    for (l = 0; l < keyarray.length; l++) {
        let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
        let valulengt = valu.length; // [banyaknya array di atas]
        let coun = 0;
        for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
            for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B
                skor = (PGBenar(kuncijawaban, koleksiceklis[m]) == "Benar") ? 1 : 0;
                if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
                    coun += skor
                }
            }
        }
        let nilaikd = (coun / valulengt * 100).toFixed(2);
        obj[keyarray[l]] = nilaikd
    }

    tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



    //semua elemen ini akan ditaroh di elemen ini tempatLJ;
    //let tempatLJ = document.getElementById("resumenilai");
    // tempatLJ tadi berada di parent elemen borderidhasilakhirnama (isiteks);
    let isiteks = document.getElementById("borderidhasilakhirnama");
    // setelah terbuat, 'isiteks'akan akan dimasukkan ke tekshtmlnilai (parentnya di dalam form id 'kirimnilaielamaso' )
    let teksarea = document.getElementById("tekshtmlnilai");
    // teksarea.textContent = isiteks.innerHTML;
    teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));
    let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
    let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
    let namaform = document.getElementById("ljkbantu")
    let dataform = new FormData(namaform);
    document.getElementById("infoloadingljk").innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`
    fetch(constlinknilai + "?action=gurukirimnilai", {
        method: 'post',
        body: dataform
    })
        .then(u => u.json())
        .then(q => {
            document.getElementById("infoloadingljk").innerHTML = q.result;
            if (iddarimana == "hariini") {
                getdaftarnilai(idakseskoreksi)
            } else (
                daftarnilaikronologi(idakseskoreksi)

            )

        })
        .catch(er => {
            console.log(er);
            document.getElementById("infoloadingljk").innerHTML = "Maaf, terjadi kesalahan."
        })


}
const hasilakhirelamasopg = (par) => {
    hasilakhirwaktu.innerHTML = tanggalfulllengkap(new Date());

    let kuncijawaban = window.atob(par);

    let arrkunci = kuncijawaban.split(",")

    tabelpgbantu.innerHTML = ""
    let tr = tabelpgbantu.insertRow(0);
    let th = document.createElement("th");
    th.innerHTML = "Jawaban";
    tr.appendChild(th);
    th = document.createElement("th")
    th.innerHTML = "Kunci"
    tr.appendChild(th)
    th = document.createElement("th")
    th.innerHTML = "Nilai"
    tr.appendChild(th)

    let benarsalah = "";
    let skorpg = 0;
    let opsipg = document.getElementsByClassName("calc");
    let koleksiceklis = []
    for (let i = 0; i < opsipg.length; i++) {
        if (opsipg[i].checked) {
            let idpg = opsipg[i].getAttribute("id");
            let nosoalinput = idpg.match(/(\d+)/)[0] // mengembalikan angkanya aja
            benarsalah = PGBenar(arrkunci, idpg);
            document.getElementById("PG_" + nosoalinput).value = idpg.replace(nosoalinput, "");
            document.getElementById("SKOR_" + nosoalinput).value = pgskor(kuncijawaban, idpg);
            tr = tabelpgbantu.insertRow(-1)
            let sel = tr.insertCell(-1);
            sel.innerHTML = idpg;
            sel = tr.insertCell(-1);
            sel.innerHTML = arrkunci[nosoalinput - 1];
            sel = tr.insertCell(-1);
            sel.innerHTML = benarsalah;

            if (benarsalah == "Benar") {
                skorpg++
            }
            koleksiceklis.push(idpg)
        }
    }

    let jumlahpg = kronologijson[parameterbantuisiljk].jumlahpg;
    nilaiPG.value = ((skorpg / jumlahpg) * 100).toFixed(2)

    tr = tabelpgbantu.insertRow(-1);
    sel = tr.insertCell(-1);
    sel.setAttribute("colspan", 2)
    sel.innerHTML = "SKOR PG";
    sel = tr.insertCell(-1);
    sel.innerHTML = ((skorpg / jumlahpg) * 100).toFixed(2);

    let inputskor = document.querySelectorAll(".hitungskor");
    // let datakuncikd = JSON.parse(kronologijson[parameterbantuisiljk].kuncikd)
    // let keyarray = Object.keys(datakuncikd);
    // let obj = {}
    // for (let m = 0; m < keyarray.length; m++) {

    //   for (let k = 0; k < inputskor.length; k++) {

    //   }
    // }

    let datakuncikd = JSON.parse(kronologijson[parameterbantuisiljk].kuncikd); //JSON.parse(localStorage.getItem("kuncikd"))
    let keyarray = Object.keys(datakuncikd);
    let obj = {};
    for (l = 0; l < keyarray.length; l++) {
        let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
        let valulengt = valu.length; // [banyaknya array di atas]
        let coun = 0;
        for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
            for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B

                var skor = (PGBenar(arrkunci, koleksiceklis[m]) == "Benar") ? 1 : 0;
                if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
                    coun += skor
                }

            }
        }
        let nilaikd = (coun / valulengt * 100).toFixed(2);

        obj[keyarray[l]] = nilaikd


    }

    nilaikd.value = JSON.stringify(obj)
    // tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



    // var resulthasilessay = "JAWABAN ESSAY:<br/>";;
    var resulthasilessay = (kronologijson[parameterbantuisiljk].jumlahessay == 0) ? "" : "JAWABAN ESSAY:<br/>";;

    //resulthasilessay += "<!-- ADD_PAGE -->";
    var elFilejawaban = document.getElementsByClassName("filejawaban");
    if (elFilejawaban.length > 0) { //mengantisipasi jika tidak ada filejawaban kosong ga perlu dieksekusi
        for (var c = 0; c < elFilejawaban.length; c++) {
            var innernya = elFilejawaban[c].tagName;
            var noessay = elFilejawaban[c].getAttribute("id").replace("filejawaban", "");
            //console.log(innernya)
            if (innernya == "TEXTAREA") {
                resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
                resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";
                resulthasilessay += elFilejawaban[c].value.split("\n").join("<br/>");
                resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                resulthasilessay += "</li></ol>";
            } else {
                resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
                resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";

                resulthasilessay += elFilejawaban[c].outerHTML;
                resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                resulthasilessay += "</li></ol>";

            }
        }

    }
    resumenilaiskhir.innerHTML = resulthasilessay;

    buathtmlbantu.textContent = window.btoa(unescape(encodeURIComponent(previewljkbantu.innerHTML)));
    let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
    let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
    let namaform = document.getElementById("ljkbantu")
    let dataform = new FormData(namaform);
    loadingljk.style.display = "block";
    document.getElementById("infoloadingljk").innerHTML = `<i class="fa fa-spin fa-refresh w3-xxlarge" style="margin:0 auto"></i> proses kirim ....`;
    fetch(constlinknilai + "?action=gurukirimnilai", {
        method: 'post',
        body: dataform
    })
        .then(u => u.json())
        .then(q => {
            document.getElementById("infoloadingljk").innerHTML = q.result;
            if (iddarimana == "hariini") {
                getdaftarnilai(idakseskoreksi)
            } else (
                daftarnilaikronologi(idakseskoreksi)

            )

        })
        .catch(er => {
            console.log(er);
            document.getElementById("infoloadingljk").innerHTML = "terjadi kesalahan " + er;
        })
}
const hapusljk = (idbaris) => {
    let konfirmasihapus = confirm("Anda yakin ingin menghapusnya? \n \n Klik Ok untuk menghapus. \n \n Klik CANCEL untuk membatalkan");
    if (!konfirmasihapus) {
        return
    }

    let cekcrtToken = kronologijson.filter(k => k.idbaris = idbaris)
    alert("pengen hapus data baris ke-" + idbaris + " di SS jenjang kelas " + idJenjang + " dan ini crtTokennya " + cekcrtToken[0].crtToken)
    let idok = cekcrtToken[0].crtToken;
    let dataform = new FormData();
    dataform.append("idbaris", idbaris);
    dataform.append("idok", idok);
    fetch(constlinknilai + "?action=hapusljk", {
        method: 'post',
        body: dataform
    }).then(m => m.json())
        .then(f => {
            alert(f.result);
            refreshdatakdkd();
        })
        .catch(er => alert(er))

}
const refreshdatakdkd = () => {
    let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
    let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
    if (iddarimana == "hariini") {
        getdaftarnilai(idakseskoreksi)
    } else (
        daftarnilaikronologi(idakseskoreksi)

    )
}
const buathtmlljklama = (adapg) => {
    let tekshtml = "";
    if (adapg) {
        tekshtml = `<center>
      <img src="https://1.bp.blogspot.com/-6sOgNpeDql8/X_3gwIOMYOI/AAAAAAAAUOk/nKeuB6Z-X7siR2bJfMrOEca38zx0PWmXQCLcBGAsYHQ/s0/lamaso.png" class="w3-circle" style="width:145px;border:2px dotted red">
      <h3>Nilai Belajar</h3>
  
      <table class="versi-table" id="tabelku">
          <tbody><tr>
              <td>Sekolah </td>
              <td id="hasilakhirnamasekolah">${idNamaSekolah}</td>
          </tr>
          <tr>
              <td>Nama </td>
              <td id="hasilakhirnamasiswa"><i class="fa fa-spin fa-refresh"></i></td>
          </tr>
          <tr>
              <td>Kelas </td>
              <td id="hasilakhirkelas">${idNamaKelas}</td>
          </tr>
          <tr>
              <td>Mapel/Tema </td>
              <td id="hasilakhirmapeltema"><i class="fa fa-spin fa-refresh"></i></td>
          </tr>
          <tr><td>Waktu Mulai <br><sub class='w3-text-red'>oleh Guru</sub></td><td id="selwaktumulai"><i class="fa fa-spin fa-refresh"></i></td></tr><tr>
              <td>Waktu Selesai <br><sub class='w3-text-red'>oleh Guru</sub></td>
              <td id="hasilakhirwaktu"><i class="fa fa-spin fa-refresh"></i></td>
          </tr>
      </tbody></table>
    </center>
    <div id="resumenilai" style="display:block">
      PILIHAN GANDA:
        <table class="versi-table" id="tabelpgbantu">
          <tbody>
            <tr>
              <td>Jawaban</td>
              <td>Kunci:</td>
              <td>Nilai</td>
            </tr>
           
          </tbody>
        </table>
      </div>
      <div id="resumenilaiskhir"></div>
    `;

    } else {
        tekshtml = `<center>
      <img src="https://1.bp.blogspot.com/-6sOgNpeDql8/X_3gwIOMYOI/AAAAAAAAUOk/nKeuB6Z-X7siR2bJfMrOEca38zx0PWmXQCLcBGAsYHQ/s0/lamaso.png" class="w3-circle" style="width:145px;border:2px dotted red">
      <h3>Nilai Belajar</h3>
  
      <table class="versi-table" id="tabelku">
          <tbody><tr>
              <td>Sekolah </td>
              <td id="hasilakhirnamasekolah">${idNamaSekolah}</td>
          </tr>
          <tr>
              <td>Nama </td>
              <td id="hasilakhirnamasiswa"><i class="fa fa-spin fa-refresh"></i></td>
          </tr>
          <tr>
              <td>Kelas </td>
              <td id="hasilakhirkelas">${idNamaKelas}</td>
          </tr>
          <tr>
              <td>Mapel/Tema </td>
              <td id="hasilakhirmapeltema"><i class="fa fa-spin fa-refresh"></i></td>
          </tr>
          <tr><td>Waktu Mulai <br><sub class='w3-text-red'>oleh Guru</sub></td><td id="selwaktumulai"><i class="fa fa-spin fa-refresh"></i></td></tr><tr>
              <td>Waktu Selesai <br><sub class='w3-text-red'>oleh Guru</sub></td>
              <td id="hasilakhirwaktu"><i class="fa fa-spin fa-refresh"></i></td>
          </tr>
      </tbody></table>
    </center>
    <div id="resumenilai" style="display:block">
    </div>
      <div id="resumenilaiskhir"></div>
    `;
    }

    return tekshtml
};
const buathtmlljk = (adapg) => {
    let html = `<div id="borderidhasilakhirnama">
    <div class="w3-row-padding ">
        <div class="w3-col l8 s12 ">
            <img src="/img/L_vT86_100px.png" class=" w3-left" style="width:45px;" />
            <h3 class="w3-xlarge w3-lobster"> Hasil Belajar E-Lamaso</h3>
            <div class='w3-center warnaeka w3-card-4 w3-round-large w3-border-bottom w3-border-black'>
                <h3 id="hasilakhirnamasekolah">${idNamaSekolah}</h3>
                <h5 id="hasilakhirsemestertapel"></h5>
            </div>
            <table class="w3-table-all small">
                <caption>Identitas Siswa</caption>
                <tr>
                    <td>ID Lamaso (Token)</td>
                    <td>:</td>
                    <td id="hasilakhirtokensiswa"> Token Siswa</td>
                </tr>
                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td><b id="hasilakhirnamasiswa">Nama Siswa</b></td>
                </tr>
                <tr>
                    <td>Kelas</td>
                    <td>:</td>
                    <td id="hasilakhirkelas">${idNamaKelas}</td>
                </tr>

            </table>

        </div>
        <div class="w3-col l4 s12  w3-right">
            <div class="w3-small w3-center">Identitas Materi:</div>

            <h5 class="w3-center w3-card-4 warnaeka" id="hasilakhirmapeltema">Mapel/Tema</h5>

            <table class="w3-table-all w3-small">


                <tr>
                    <td>Jenis Tagihan</td>
                    <td>:</td>
                    <td id="hasilakhirjenistagihan">PH/ PTS/ PAS/ PAK</td>
                </tr>
                <tr>
                    <td>Jumlah Pilihan Ganda</td>
                    <td>:</td>
                    <td id="hasilakhirjumlahpg">0</td>
                </tr>
                <tr>
                    <td>Jumlah Soal Isian</td>
                    <td>:</td>
                    <td id="hasilakhirjumlahessay">0</td>
                </tr>
                <tr>
                    <td>Muatan Kompetensi</td>
                    <td>:</td>
                    <td id="hasilakhirmuatankompetensi">##</td>
                </tr>
                <tr>
                    <td>Waktu Mulai<br/><sub class="w3-text-red">Dibantu Guru</sub></td>
                    <td>:</td>
                    <td id="selwaktumulai">: Waktu/</td>
                </tr>

                <tr>
                    <td>Waktu Selesai<br/><sub class="w3-text-red">Dibantu Guru</sub></td>
                    <td>:</td>
                    <td id="hasilakhirwaktu">: Waktu/</td>
                </tr>
            </table>
        </div>
        <div class="w3-clear w3-border"></div>
        <div class="w3-col l3 s12 w3-border w3-hide ljksiswa_pg"></div>
        <div class="w3-col l9 s12 w3-border w3-hide ljksiswa_essay"></div>
        <div class="w3-col l3 s6 w3-border w3-hide ljksiswa_nilaipg"></div>
        <div class="w3-col l3 s6 w3-border w3-hide ljksiswa_nilaiessay"></div>
        <div class="w3-clear"></div>
        <div class="w3-col l4 s12 w3-right">
            <div class="w3-card-4 w3-container w3-left w3-center "
                style="width:45%;margin:5px;height:120px">
                Paraf Orangtua
            </div>
            <div class="w3-card-4 w3-container w3-left w3-center "
                style="width:45%;margin:5px;height:120px">
                Paraf Guru
            </div>
        </div>
    </div>
    </div>`;
    return html
}
function tombolketikjawaban2(idpar) {
    let id = idpar.split("_")[0];
    //alert("Tombol ketik Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id)
    tempatnya.innerHTML = "";
    var teksarea = document.createElement("textarea");
    teksarea.setAttribute("class", "filejawaban");
    teksarea.setAttribute("id", "filejawaban" + id);
    teksarea.setAttribute("cols", "30");
    teksarea.setAttribute("rows", "10");
    teksarea.setAttribute("placeholder", "Silakan ketik jawaban essay untuk No. Soal " + id);
    tempatnya.appendChild(teksarea);
    tempatnya.innerHTML += "<br/>Ganti dengan mengupload media:";
    var tombollain = document.createElement("button")
    tombollain.setAttribute("onclick", "tomboluploadjawaban2('" + idpar + "')");
    tombollain.innerHTML = "Upload Jawaban No " + id
    tempatnya.appendChild(tombollain);
    tempatnya.innerHTML += "<sub> dengan memilih cara lain, jawaban yang sudah diketik akan hilang dan diganti dengan jawaban berupa gambar/media yang diunggah</sub>"


}
function tomboluploadjawaban2(idpar) {
    //alert("Tombol Upload Jawbaan No " + id)
    //console.log(idpar)
    let id = idpar.split("_")[0]
    var tempatnya = document.getElementById("tomboljawaban" + id);
    var katajadi = "";
    tempatnya.innerHTML = "";
    //	var divbackground = document.createElement("div");
    //		divbackground.setAttribute("style","background-color:#ffcdc9;padding:10px");
    //		divbackground.innerHTML = "Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No " + id + " dengan menguploadnya di sini: <br/><br/>";
    //			var labelupload = document.createElement("label");
    //				labelupload.setAttribute("style", "border:1px solid black;background-color:#eee;padding:5px;border-radius:5px");
    //				labelupload.setAttribute("for",

    katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No";
    katajadi += " " + id + " dengan menguploadnya di sini: <br/><br/>";
    katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpotoessay" + id + "' id='label" + id + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
    katajadi += "<div id='filejawaban" + id + "' class='filejawaban' style='overflow-x:auto'>";
    katajadi += "<img src='https://1.bp.blogspot.com/-q57d59JTX8g/Xa-kAy6T0XI/AAAAAAAAOSo/seM01RU3Q_Q7BvLm73wC09BBsQMs05pYACLcBGAsYHQ/s320/LOGO%2BLAMASO.png'  style='width:145px;margin:auto;border:1px solid blue'/>";
    katajadi += "</div>";

    katajadi += `<input type='file' id='iduploadpotoessay${id}' onchange='uploadpotoessay("${idpar}")' style='display:none'/>"`
    katajadi += "</div>";
    //-----------------------------
    katajadi += "<br/>Ganti dengan mengetik jawaban:";
    katajadi += `<button onclick='tombolketikjawaban2("${idpar}")'>Ketik Jawaban No. ${id}</button>`; //"<button onclick='tombolketikjawaban(" + id + ")'>Ketik Jawaban No. " + id + "</button>";

    // katajadi += "<button onclick='tombolketikjawaban2(" + idpar + ")'>Ketik Jawaban No. " + id + "</button>";
    katajadi += "<sub> dengan memilih cara lain, jawaban yang sudah  diupload akan hilang dan diganti dengan jawaban berupa ketikan/tulisan</sub>"
    //-----------------------------
    tempatnya.innerHTML = katajadi;
}
const simpancatatansementara = () => {
    let isiteks = document.formuploadmateri.idmateri.value
    if (isiteks == "") {
        alert("Maaf, Draft Anda kosong .... :(");
        return
    }
    let idmapel = document.formuploadmateri.idmapel.value;
    let iddurasi = document.formuploadmateri.iddurasi.value;
    let idaksessiswa = document.formuploadmateri.idaksessiswa.value;
    let jenistagihan = document.formuploadmateri.jenistagihan.value;
    let idtgl = document.formuploadmateri.idtgl.value;
    let idtglend = document.formuploadmateri.idtglend.value;
    let botakin = window.btoa(unescape(encodeURIComponent(isiteks)));
    let obj = {};
    obj.idmapel = idmapel;
    obj.iddurasi = iddurasi;
    obj.jenistagihan = jenistagihan;
    obj.idaksessiswa = idaksessiswa;
    obj.idtgl = idtgl;
    obj.idtglend = idtglend;
    obj.botakin = botakin;



    window.localStorage.setItem("drafmateri", JSON.stringify(obj));
    let ingindownload = confirm("Apakah Anda ingin mendownload materi ini juga?");
    if (ingindownload) {
        downloadfiledraft(isiteks, idmapel);

        alert("Draf, berhasil disimpan dan File telah Anda unduh");
    } else {
        alert("Draf, berhasil disimpan dan File tidak Anda unduh");

    }
}
const taruhcatatansementara = () => {
    let idmapel = document.formuploadmateri.idmapel;
    let iddurasi = document.formuploadmateri.iddurasi;
    let idaksessiswa = document.formuploadmateri.idaksessiswa;
    let jenistagihan = document.formuploadmateri.jenistagihan;
    let idtgl = document.formuploadmateri.idtgl;
    let idtglend = document.formuploadmateri.idtglend;

    let isiteks = document.formuploadmateri.idmateri

    if (localStorage.hasOwnProperty("drafmateri")) {
        let teks = JSON.parse(localStorage.getItem("drafmateri"))
        idmapel.value = teks.idmapel;
        iddurasi.value = teks.iddurasi;
        idaksessiswa.value = teks.idaksessiswa;
        jenistagihan.value = teks.jenistagihan;
        idtgl.value = teks.idtgl;
        idtglend.value = teks.idtglend;
        let botakin = teks.botakin;
        //console.log(botakin);
        isiteks.value = window.atob(unescape(encodeURIComponent(botakin)));
        //isiteks.textContent = window.atob(botakin);
        alert("Anda mempunyai Draft")
    } else {
        alert("Maaf, Anda tidak memiliki Draft.")



    }
    return true
}
const editfilemateri = (id) => {
    let file = kronologijson[id]; //.idmateri;
    let idbaris = file.idbaris;
    let time = new Date(file.idtgl).getTime()
    let now = new Date().getTime()
    if (now > time) {
        alert("Perhatian! Materi ini sedang/Sudah/Telah lewat dipublikasikan saat ini. Mungkin saja siswa Anda sudah mengirimkan pekejaannya dari materi ini. Jika mengedit alokasi waktu awal Anda akan kehilangan data REKAP PENILAIAN yang berlangsung, dan Materi akan diganti dengan materi yang Anda Edit (overwrite). Hindari mengubah Alokasi Waktu Awal jika Alokasi awal sudah berlangsung karena Rekap Penilaian Anda tidak sinkron.");
        // return
    }
    // document.getElementsByClassName("tablinks")[2].click();
    //openCity(event, 'upload_materi')
    // lainnya tutup
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("upload_materi").style.display = "block";

    let idmapel = document.formuploadmateri.idmapel;
    let iddurasi = document.formuploadmateri.iddurasi;
    let idaksessiswa = document.formuploadmateri.idaksessiswa;
    let jenistagihan = document.formuploadmateri.jenistagihan;
    let idtgl = document.formuploadmateri.idtgl;
    let idtglend = document.formuploadmateri.idtglend;

    let isiteks = document.formuploadmateri.idmateri;

    idmapel.value = file.idmapel;
    iddurasi.value = file.iddurasi;
    idaksessiswa.value = file.idaksessiswa;
    jenistagihan.value = file.jenistagihan;
    idtgl.value = file.idtgl;
    idtglend.value = file.idtglend;
    let botakin = file.idmateri;
    let idm = encodeURIComponent(botakin)




    tombolpublikasikan.setAttribute("onclick", `editfilematerikeserver('${idbaris}')`)
    tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
    tombolpublikasikan.setAttribute("class", "wa w3-red w3-hover-aqua");
    tombolpublikasikan.innerHTML = "EDIT KONTEN MATERI"

    // $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) { })
    fetch(linkmateri + "&action=previewriwayat&idmateri=" + idm).then(m => m.json())
        .then(k => {

            //isiteks.textContent = k;
            isiteks.value = k;

            let ingindownload = confirm("Apakah Anda ingin mendownload materi ini juga?");
            if (ingindownload) {
                downloadfiledraft(k, idmapel.value);
            }
        }).catch(er => {
            isiteks.textContent = er
        })
    //alert("Anda membuka link upload materi")




}
const editfilematerikeserver = (id) => {
    document.getElementById("materiimport").innerHTML = "";
    let tglkosong = document.formuploadmateri.idtgl.value;
    let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
    let mapel = document.formuploadmateri.idmapel.value;
    let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

    let kuncikosong = document.formuploadmateri.kuncikd.value;
    let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
    if (bolmapel && boltgl && bolkd) {
        let dom = document.getElementById("formuploadmateri");
        let data = new FormData(dom);
        data.append("idbaris", id)
        pranalamateri.style.display = "block";
        dom.reset();
        dom.idmateri.value = "";
        idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
        let url = linkmateri + "&action=materiedit"
        fetch(url, {
            method: 'post',
            body: data
        })
            .then(m => m.json())
            .then(f => {
                idpracetak.innerHTML = f.result;
                loadketkunci.innerHTML = "";

                loadketKD.innerHTML = "";
                //console.log(f)
                pembelajaran();
                updatematerikan();
                localStorage.removeItem("draftmateri");
                tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
                tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
                tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
                tombolpublikasikan.innerHTML = "PUBLIKASIKAN";




            })
            .catch(er => idpracetak.innerHTML = "Maaf, terjadi kesalahan: <br> Error Code" + er)

    }
    // localStorage.removeItem("draftmateri")
    // tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
    // tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
    // tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
    // tombolpublikasikan.innerHTML = "PUBLIKASIKAN";
}
function uploadpotoessay(idpar) {
    //console.log(idpar)
    let id = idpar.split("_")[0];
    let idsw = idpar.split("_")[1];
    var item = document.getElementById("iduploadpotoessay" + id).files[0];
    var tempat = document.getElementById("filejawaban" + id);
    let total = (1048576 / item.size).toFixed(2);
    tempat.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxlarge"></i> Sedang proses, mohon tunggu ...`;



    let ekstensi = item.name.substring(item.name.lastIndexOf('.') + 1);


    var filename;
    // format nama file = kodetokensiswa_kelas_nomateri_nosoal
    let tokensiswa = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw].id;
    filename = idNamaKelas + "_" + tokensiswa + "_MateriKoreksi_" + kodebarismateriyangdikerjakan + "_essayno_" + id;

    let dataaa = ""
    var ofReader = new FileReader();
    ofReader.readAsDataURL(item);
    ofReader.onload = async function (e) {

        let base64 = e.target.result.replace(/^.*,/, '');
        let mmtype = e.target.result.match(/^.*(?=;)/)[0];
        dataaa = e.target.result
        let datafom = new FormData()
        datafom.append("base64", base64);
        datafom.append("mmtype", mmtype);
        datafom.append("kelas", idNamaKelas);
        datafom.append("filename", filename);
        datafom.append("ekstensi", ekstensi);
        await fetch(constlinknilai + "?action=siswauploadmedia", {
            method: 'post',
            body: datafom
        }).then(m => m.json())
            .then(k => {
                tempat.innerHTML = k.result

            })
            .catch(er => {
                tempat.innerHTML = "Ups, Maaf. Media gagal diunggah ke server. <br><br>Kode Error: " + er;

            })



    }



};

const infoupdate = () => {
    loadingljk.style.display = "block";
    fetch("/statis/update.json").then(m => m.json())
        .then(k => {
            // console.log(k.data);

            let html = "<h3 class='w3-center'>Perbaikan beberapa versi </h3><ul class='w3-ul'>";
            for (let i = 0; i < k.length; k++) {
                html = `<li>Nama Versi ${k[i].namaversi} (Update ${k[i].tanggal})
                <br/><ul style="type-list-style:decimal">`;
                let ket = k[i].ket;
                for (j = 0; j < ket.length; j++) {
                    html += `<li>${ket[j]}</li>`
                }

                html += `</ul></li>`
            };
            html += "</ul>"
            infoloadingljk.innerHTML = html;
        })
        .catch(er => {
            console.log(er);

        })
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}