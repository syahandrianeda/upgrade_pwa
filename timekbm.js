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
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

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
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;


} else if (linkyangsedangaktif.indexOf("gmp.html") > -1) {
    document.getElementById("pilihbulanrekap").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

    let kodebarismateriyangdikerjakan = "belumdisi";
    let parameterbantuisiljk = "belumdisi";
    sumber_repository.innerHTML = `
    <option id="repo0" value="0" selected>Silakan Pilih Repository</option>
    <option id="repo1" value="1">Repository dari Sekolah Lain</option>
    <option id="repo2" value="2">Cara Membuat Konten Materi</option>
    <option id="repo3" value="3">Download File KKM dan KD</option>`;


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