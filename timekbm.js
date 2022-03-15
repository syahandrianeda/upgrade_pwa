let linkyangsedangaktif = window.location.href;

const yyyyxmmxdd = (tgl) => {
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();
    let string = y + "-" + nolxx(m) + "-" + nolxx(d);
    return string
}
const nolxx = (i) => {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
};

if (linkyangsedangaktif.indexOf("guru.html") > -1) {
    document.getElementById("pilihbulanrekap").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek10" value="2022-01-01">Januari 2022</option>
    <option id="indek11" value="2022-02-01">Februari 2022</option>
    <option id="indek12" value="2022-03-01">Maret 2022</option>
    <option id="indek13" value="2022-04-01">April 2022</option>
    <option id="indek14" value="2022-05-01">Mei 2022</option>
    <option id="indek15" value="2022-06-01">Juni 2022</option>`;

    let kodebarismateriyangdikerjakan = "belumdisi";
    let parameterbantuisiljk = "belumdisi";
    sumber_repository.innerHTML = `
        <option id="repo0" value="0" selected>Silakan Pilih Repository</option>
        <option id="repo1" value="1">Repository dari Sekolah Lain</option>
        <option id="repo2" value="2">Cara Membuat Konten Materi</option>
        <option id="repo3" value="3">Download File KKM dan KD</option>
        `;

    // let teksalamat = "JL. SMP Ratujaya No. 41 RT.005/003 Kel. Ratujaya Kec. Cipayung";
    document.getElementById("editalamatkopsurat").innerHTML = teksalamat;
    if (idJenjang == 6) {
        document.querySelector(".tabolahijazah").style.display = "block";
        document.querySelector(".tabpengumumankelulusan").style.display = "block";
    } else {
        document.querySelector(".tabolahijazah").style.display = "none";
        document.querySelector(".tabpengumumankelulusan").style.display = "none";
    }


} else if (linkyangsedangaktif.indexOf("siswa.html") > -1) {

    if (jlo.id !== pelanggan_id) {
        alert("Maaf, sedang terjadi pembaruan. Silakan login kembali ...." + jlo.id);
        window.localStorage.clear();
        window.location.replace("/index.html")

    }
    if (jenjang == 6) {
        document.querySelector(".menukelulusan").style.display = "block";
        document.querySelector(".barkelulusanku").style.display = "block";
    } else {
        document.querySelector(".menukelulusan").style.display = "none";
        document.querySelector(".barkelulusanku").style.display = "none";

    }

    document.getElementById("siswapilihbulan").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;


} else if (linkyangsedangaktif.indexOf("gmp.html") > -1) {
    document.getElementById("pilihbulanrekap").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek10" value="2022-01-01">Januari 2022</option>
    <option id="indek11" value="2022-02-01">Februari 2022</option>
    <option id="indek12" value="2022-03-01">Maret 2022</option>
    <option id="indek13" value="2022-04-01">April 2022</option>
    <option id="indek14" value="2022-05-01">Mei 2022</option>
    <option id="indek15" value="2022-06-01">Juni 2022</option>`;

    let kodebarismateriyangdikerjakan = "belumdisi";
    let parameterbantuisiljk = "belumdisi";
    sumber_repository.innerHTML = `
    <option id="repo0" value="0" selected>Silakan Pilih Repository</option>
    <option id="repo1" value="1">Repository dari Sekolah Lain</option>
    <option id="repo2" value="2">Cara Membuat Konten Materi</option>
    <option id="repo3" value="3">Download File KKM dan KD</option>`;


} else if (linkyangsedangaktif.indexOf("kepsek.html") > -1) {

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;

} else if (linkyangsedangaktif.indexOf("staff.html") > -1) {

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;
    
    document.getElementById("daftarpilihbulankehadirangurupribadi").innerHTML = `
    <option id="indekab" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek10" value="2022-01-01">Januari 2022</option>
    <option id="indek11" value="2022-02-01">Februari 2022</option>
    <option id="indek21" value="2022-03-01">Maret 2022</option>
    <option id="indek31" value="2022-04-01">April 2022</option>
    <option id="indek41" value="2022-05-01">Mei 2022</option>
    <option id="indek51" value="2022-06-01">Juni 2022</option>`;

}

var tapel_bulan_ini = new Date().getMonth();
var tapel_bar, semester_bar;
if (tapel_bulan_ini >= 6) {
    tapel_bar = new Date().getFullYear() + "/" + (new Date().getFullYear() + 1);
    semester_bar = 1
} else {
    tapel_bar = (new Date().getFullYear() - 1) + "/" + new Date().getFullYear();
    semester_bar = 2;
}
document.getElementById("tapel").innerHTML = tapel_bar
document.querySelectorAll(".bar_tapel").forEach(k => k.innerHTML = tapel_bar);
document.querySelectorAll(".bar_semester").forEach(k => k.innerHTML = semester_bar);

const timekbm_arraybulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const pilihrepository = () => {
    //alert("Maaf, fitur belum tersedia dipindah");
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;

    let objsekolah = [
        { "id": 12, "namasekolah": "SDN Ratujaya 1", "url": "https://script.google.com/macros/s/AKfycbxPqrolHWfCdSnRNlNtHIEohGZYejuMrMlvkk5LgrjCoRVlZjH3WQYa39opZGYyZelL/exec?idss=1eRhnBwhHM-WHB3IqnHVjgXrIv5uy2uYOUlZtsGLBClg" },
        { "id": 13, "namasekolah": "SDN Ratujaya 2", "url": "https://script.google.com/macros/s/AKfycby8f-hgB2_EPKSMY0TfOLdnoDbtFIu-G6F7DgKjswA7LgNmZFYGnX1rJMnRRjID27aj/exec?idss=1qtpr5TP2MddbXQWNqRaC33NRVCFc5aeKq419t25UUOU" },
        { "id": 14, "namasekolah": "SDN Pondok Terong 1", "url": "https://script.google.com/macros/s/AKfycbxuUPFfPucrnNqyudaV2yeiNZwVzvVPtMyPBJu83FwXqSMlEEycMBEOy7siSuP0sjZT/exec?idss=1DrveZQ1sVkRj0xzLj40rPyV5MgVi-tHg57RluVWGXk8" },
        { "id": 15, "namasekolah": "SDN Utan Jaya", "url": "https://script.google.com/macros/s/AKfycbx0FVQWA4B7XyVHZcOKRN8vDdnS8cSYcO9m3Ou0eojphUZGqaWNG___7GC2GVw5yE4W/exec?idss=1AlIrI8UAKeJ6v0S4m1F7nHOOZ_B78xSWi054IQOpteA" },
        { "id": 17, "namasekolah": "SDN Cyber Lamaso", "url": "https://script.google.com/macros/s/AKfycbxC3oJhUqUysBZOhg0raOv3EfIlQsMP1yBMBe3g3RTtMnXUQEw-m9Bm1akt6n6gJzSPBQ/exec?idss=1bU1CfElaMKlJkolKphX4JuyDycMHhASwgwjXQIegRik" }
    ];
    let arrsekolah = objsekolah.filter(k => k.id !== idskrip).map(m => m.namasekolah);

    let htmlopt = "";
    for (i = 0; i < arrsekolah.length; i++) {
        htmlopt += `<option id="sekolah${i + 1}" value="${i}">${arrsekolah[i]}</option>`
    };
    urlmaterisekolahlain = objsekolah.filter(s => s.id !== idskrip).map(m => m.url);


    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistory()' id='pilihanrepositorysekolahlain' class='w3-select w3-yellow w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
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
        `;
    }

};
const pilihrepositorymapel = () => {
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;

    let objsekolah = [
        { "id": 12, "namasekolah": "SDN Ratujaya 1", "url": "https://script.google.com/macros/s/AKfycbxPqrolHWfCdSnRNlNtHIEohGZYejuMrMlvkk5LgrjCoRVlZjH3WQYa39opZGYyZelL/exec?idss=1eRhnBwhHM-WHB3IqnHVjgXrIv5uy2uYOUlZtsGLBClg" },
        { "id": 13, "namasekolah": "SDN Ratujaya 2", "url": "https://script.google.com/macros/s/AKfycby8f-hgB2_EPKSMY0TfOLdnoDbtFIu-G6F7DgKjswA7LgNmZFYGnX1rJMnRRjID27aj/exec?idss=1qtpr5TP2MddbXQWNqRaC33NRVCFc5aeKq419t25UUOU" },
        { "id": 14, "namasekolah": "SDN Pondok Terong 1", "url": "https://script.google.com/macros/s/AKfycbxuUPFfPucrnNqyudaV2yeiNZwVzvVPtMyPBJu83FwXqSMlEEycMBEOy7siSuP0sjZT/exec?idss=1DrveZQ1sVkRj0xzLj40rPyV5MgVi-tHg57RluVWGXk8" },
        { "id": 15, "namasekolah": "SDN Utan Jaya", "url": "https://script.google.com/macros/s/AKfycbx0FVQWA4B7XyVHZcOKRN8vDdnS8cSYcO9m3Ou0eojphUZGqaWNG___7GC2GVw5yE4W/exec?idss=1AlIrI8UAKeJ6v0S4m1F7nHOOZ_B78xSWi054IQOpteA" },
        { "id": 17, "namasekolah": "SDN Cyber Lamaso", "url": "https://script.google.com/macros/s/AKfycbxC3oJhUqUysBZOhg0raOv3EfIlQsMP1yBMBe3g3RTtMnXUQEw-m9Bm1akt6n6gJzSPBQ/exec?idss=1bU1CfElaMKlJkolKphX4JuyDycMHhASwgwjXQIegRik" }
    ];
    let arrsekolah = objsekolah.filter(k => k.id !== idskrip).map(m => m.namasekolah);

    let htmlopt = "";
    for (i = 0; i < arrsekolah.length; i++) {
        htmlopt += `<option id="sekolah${i + 1}" value="${i}">${arrsekolah[i]}</option>`
    };
    urlmaterisekolahlain = objsekolah.filter(s => s.id !== idskrip).map(m => m.url);


    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistorymapel()' id='pilihanrepositorysekolahlain' class='w3-select w3-blue w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `;
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
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
        `;
    }

};
function hariefektif(indekbulan, y) {

    let holiday = JSON.parse(localStorage.getItem("TglLibur"));
    let arrLibur = holiday.map(s => Object.keys(s)[0])// result ["2021-5-7","2021-5-8", dst]
        .filter(d => new Date(d).getMonth() == indekbulan && new Date(d).getFullYear() == y && new Date(d).getDay() !== 0 && new Date(d).getDay() !== 6);
    let arrKalender = [];
    let bulanke = (indekbulan + 1);

    let jmlHariKalender = daysInMonth(bulanke, y);
    let weekend;
    for (let i = 1; i <= jmlHariKalender; i++) {
        weekend = new Date(y, indekbulan, i).getDay();
       if(weekend == 0 || weekend == 6){

       }else{
           arrKalender.push(weekend)
       }
    }
    let kal = arrKalender.length;
    let lib = arrLibur.length
    return kal - lib;


};
const arrObjek = (dataHead, datanya) => {
    let arr = []
    for (let i = 0 ; i < datanya.length ; i++){
        let valu = datanya[i];
        let obj ={};
        for( x in dataHead){
          obj[dataHead[x]] =valu[x]
        }
      arr.push(obj)
    }
    return arr
  }

  
const infoupdate = () => {
    loadingljk.style.display = "block";
    fetch("/statis/update.json").then(m => m.json())
        .then(k => {

            // console.log(k.data);

            let html = "<h3 class='w3-center'>Perbaikan beberapa versi </h3><ul class='w3-ul'>";
            for (let i = k.length - 1; i >= 0; i--) {
                html += `<li>Nama Versi ${k[i].namaversi} (Update ${k[i].tanggal})
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

const DataKDKurtilas ={
    "kelas6" : [
        {"Tema 1": "Selamatkan Makhluk Hidup","Subtema 1":"Tumbuhan Sahabatku","Subtema 2":"Hewan Sahabatku","Subtema 3":"Ayo, Selamatkan Hewan dan Tumbuhan"},
        {"Tema 2": "Persatuan dan Perbedaan","Subtema 1":"Rukun dalam Perbedaan","Subtema 2":"Bekerja Sama Mencapai Tujuan","Subtema 3":"Bersatu Kita Teguh"},
        {"Tema 3": "Tokoh dan Penemuan","Subtema 1":"Penemu Yang Mengubah Dunia","Subtema 2":"Penemuan dan Manfaatnya","Subtema 3":"Ayo, Menjadi Penemu"},
        {"Tema 4": "Globalisasi","Subtema 1":"Globalisasi di Sekitarku","Subtema 2":"Globalisasi dan Manfaatnya","Subtema 3":"Globalisasi dan Cinta Tanah Air"},
        {"Tema 5": "Wirausaha","Subtema 1":"Kerja Keras Berbuah Kesuksesan","Subtema 2":"Usaha di Sekitarku","Subtema 3":"Ayo, Belajar Berwirausaha"},
        {"Tema 6": "Menuju Masyarakat Sejahtera","Subtema 1":"Masyarakat Peduli Lingkungan","Subtema 2":"Membangun Masyarakat Sejahtera","Subtema 3":"Masyarakat Sejahtera, Negara Kuat"},
        {"Tema 7": "Kepemimpinan","Subtema 1":"Pemimpin di Sekitarku","Subtema 2":"Pemimpin Idolaku","Subtema 3":"Ayo Memimpin"},
        {"Tema 8": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"hhhh"},
        {"Tema 9": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"iiii"},
    ],"kelas5" : [
        {"Tema 1": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 2": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 3": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 4": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 5": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 6": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 7": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 8": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 9": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
    ],"kelas4" : [
        {"Tema 1": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 2": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 3": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 4": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 5": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 6": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 7": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 8": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 9": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
    ],"kelas3" : [
        {"Tema 1": "Lorem ipsum dolor sit amet kelas 3 tema 1 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 2": "Lorem ipsum dolor sit amet kelas 3 tema 2 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 3": "Lorem ipsum dolor sit amet kelas 3 tema 3 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 4": "Lorem ipsum dolor sit amet kelas 3 tema 4 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 5": "Lorem ipsum dolor sit amet kelas 3 tema 5 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 6": "Lorem ipsum dolor sit amet kelas 3 tema 6 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 7": "Lorem ipsum dolor sit amet kelas 3 tema 7 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 8": "Lorem ipsum dolor sit amet kelas 3 tema 8 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"}
    ],"kelas2" : [
        {"Tema 1": "Lorem ipsum dolor sit amet  kelas 2 tema 1 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 2": "Lorem ipsum dolor sit amet kelas 2 tema 2 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 3": "Lorem ipsum dolor sit amet kelas 2 tema 3 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 4": "Lorem ipsum dolor sit amet kelas 2 tema 4 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 5": "Lorem ipsum dolor sit amet kelas 2 tema 5 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 6": "Lorem ipsum dolor sit amet kelas 2 tema 6 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 7": "Lorem ipsum dolor sit amet kelas 2 tema 7 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 8": "Lorem ipsum dolor sit amet kelas 2 tema 8 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"}
    ],"kelas1" : [
        {"Tema 1": "Lorem ipsum dolor sit amet kelas 1 tema 1 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 2": "Lorem ipsum dolor sit amet kelas 1 tema 2 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 3": "Lorem ipsum dolor sit amet  kelas 1 tema 3 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 4": "Lorem ipsum dolor sit amet  kelas 1 tema 4 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 5": "Lorem ipsum dolor sit amet  kelas 1 tema 5 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 6": "Lorem ipsum dolor sit amet  kelas 1 tema 6 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 7": "Lorem ipsum dolor sit amet  kelas 1 tema 7 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"},
        {"Tema 8": "Lorem ipsum dolor sit amet  kelas 1 tema 8 consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 1":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 2":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 3":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!","Subtema 4":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur odio modi voluptas porro!"}
    ]

}
const LingkupMateri = {
    "PAI":["Al-Quran dan Hadits","Akidah","Akhlak","Fiqih","Sejarah peradaban Islam"],
    "PKRIS":["Allah tritunggal dan karyanya","Nilai-nilai Kristiani"],
    "PKATO":["Pribadi Siswa","Yesus Kristus","Gereja","Masyarakat"],
    "PKN":["Persatuan","HAM","Pancasila"],
    "BINDO":["Membaca nonsastra", "Membaca Sastra","Menulis terbatas","Menyunting kata/istilah, frase, kalimat, paragraf, ejaan, dan tanda baca"],
    "MTK":["Bilangan","Geometri dan Pengukuran","Statistika Penyajian Data"],
    "IPA":["Makhluk hidup dan lingkungannya","Struktur dan fungsi makhluk hidup","Benda dan sifatnya","Energi dan Perubahannya","Bumi dan Alam Semesta"],
    "IPS":["Geografi","Ekonomi","Sosiologi","Sejarah"],
    "SBDP":["Seni rupa","Seni musik","Seni Tari","Seni Drama", "Keterampilan"],
    "PJOK":["Aktivitas permainan bola besar dan bola kecil","Aktivitas Atletik","Aktivitas Beladiri","Aktivitas Pengembangan Kebugaran Jasmani","Aktivitas Senam","Aktivitas gerak berirama","Aktivitas Air dan Keselamatan Diri","Keshetan"],
    "BSUND":["Membaca nonsastra", "Membaca Sastra","Menulis terbatas","Menyunting kata/istilah, frase, kalimat, paragraf, ejaan, dan tanda baca"]

}

