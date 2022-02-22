async function absenharianptmt() {
    var tgl = new Date();
    var tglabsen = tgl.getDate();
    var blnabsenx = tgl.getMonth() + 1;
    var blnabsen = addZero(blnabsenx);

    var thnabsen = tgl.getFullYear();
    let idok = tglabsen + "" + blnabsen + "" + thnabsen;

    var tabel = document.createElement("table");
    tabel.setAttribute("class", "w3-table-all garis");
    tabel.setAttribute("id", "tabelloadinghariini")
    var tr = tabel.insertRow(0);

    var thno = document.createElement("th");
    thno.innerHTML = "No."
    tr.appendChild(thno);
    var thnama = document.createElement("th");
    thnama.innerHTML = "Nama"
    tr.appendChild(thnama);

    var thkehadiran = document.createElement("th");
    thkehadiran.innerHTML = "Kehadiran"
    tr.appendChild(thkehadiran);

    var thaksi = document.createElement("th");
    thaksi.innerHTML = "Aksi"
    tr.appendChild(thaksi);

    for (var i = 0; i < jsondatasiswa.length; i++) {
        var trs = tabel.insertRow(-1);
        var selno = trs.insertCell(-1);
        selno.innerHTML = (i * 1) + 1;
        var selnama = trs.insertCell(-1);
        selnama.innerHTML = jsondatasiswa[i].pd_nama;
        var selkehadiran = trs.insertCell(-1);
        selkehadiran.setAttribute("style", "vertical-align:center;text-align:center");
        selkehadiran.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";;
        var selaksi = trs.insertCell(-1);

        var tombolwa = document.createElement("button");
        tombolwa.setAttribute("onclick", "kirimwauntukabsen('wa" + "_" + jsondatasiswa[i].id + "')");
        tombolwa.setAttribute("class", "w3-button w3-yellow w3-round-large w3-card-4 w3-margin-left w3-margin-top ");
        tombolwa.innerHTML = "<i class='fa fa-whatsapp'></i> Siswa";
        selaksi.appendChild(tombolwa);


        var pisahin = document.createElement("br");
        //selaksi.appendChild(pisahin);
        var tombolbantusiswa = document.createElement("button");

        tombolbantusiswa.setAttribute("onclick", "bantuabsen('" + jsondatasiswa[i].id + "_" + idok + "')");
        tombolbantusiswa.setAttribute("class", "w3-button w3-yellow w3-round-large w3-margin-left w3-margin-top w3-card-4");
        tombolbantusiswa.innerHTML = "<i class='fa fa-child'></i> Bantu"
        selaksi.appendChild(tombolbantusiswa);


    }
    tabelabsenhariini.innerHTML = "";
    tabelabsenhariini.appendChild(tabel);

    var tglcari = new Date();

    var thn = tglcari.getFullYear();
    var bln = tglcari.getMonth();
    var tgl = tglcari.getDate();

    spinspin.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";

    var jsonabsenkelasperbulan = [];
    let kelas = ruangankelas;

    if (localStorage.hasOwnProperty('absenHariIni')) {
        jsonabsenkelasperbulan = JSON.parse(localStorage.getItem('absenHariIni'));
    } else {
        jsonabsenkelasperbulan = await fecjsonabsen();
        // console.log(jsonabsenkelasperbulan);
        localStorage.setItem('absenHariIni', JSON.stringify(jsonabsenkelasperbulan));

        setTimeout(function () {
            localStorage.removeItem('absenHariIni');
        }, 60000); //1 menit dihapus
    }


    spinspin.innerHTML = "";

    var datatabel = tabelloadinghariini;

    for (var u = 0; u < datatabel.rows.length; u++) {
        if (u !== 0) {
            if (jsonabsenkelasperbulan.length > 0) {
                for (var v = 0; v < jsonabsenkelasperbulan.length; v++) {
                    // if (datatabel.rows[u].cells[1].innerHTML == jsonabsenkelasperbulan[v].name) {
                    if (jsondatasiswa[u - 1].id == jsonabsenkelasperbulan[v].tokensiswa) {
                        var link = jsonabsenkelasperbulan[v].fileContent;
                        if (link !== "") {
                            var linksplit = link.replace("https://drive.google.com/file/d/", "");
                            var idpoto = linksplit.replace("/view?usp=drivesdk", "");

                        } else {
                            var idpoto = idlogo;
                        }

                        let hdr = jsondatasiswa[u - 1].kehadiran;

                        datatabel.rows[u].cells[2].innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${idpoto}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>${hdr}`;
                        datatabel.rows[u].cells[3].innerHTML = "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getSeconds());
                        if (jsonabsenkelasperbulan[v].idbaris !== "") {
                            datatabel.rows[u].cells[3].innerHTML += `<br/> <button onclick="hapusabsensiswaini('${jsonabsenkelasperbulan[v].idbaris}')">Ganti/Hapus</button>`;
                        }
                        break;
                    } else {
                        // versi PTM, hadir
                        datatabel.rows[u].cells[2].innerHTML = "Belum Absen";

                    }
                }
            } else {
                datatabel.rows[u].cells[2].innerHTML = "Belum Absen"
            }
        }
    }




}

///////

const lihatrekapkelas = async (datee) => {
    let kelas = ruangankelas;
    document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML = "";
    document.getElementById("spinspin").innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'></i>"
    var kodeid;
    var kodetd
    var hadir;
    let ind = new Date(datee).getMonth();
    let namabulansekarang = NamaBulandariIndex(new Date().getMonth())
    let bulanapi = NamaBulandariIndex(ind)
    var jsonabsenkelasperbulan = [];
    jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
    await fetch(url_absensiswa + "?action=rekapbulan&kelas=" + ruangankelas + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            jsonabsenkelasperbulan = k[bulanapi];

            localStorage.setItem(bulanapi, JSON.stringify(k[bulanapi]))
        }).catch(er => { console.log(er) })

    spinspin.innerHTML = "";

    for (var i = 0; i < jsonabsenkelasperbulan.length; i++) {
        kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + jsonabsenkelasperbulan[i].tokensiswa;
        kodetd = "td_" + jsonabsenkelasperbulan[i].tokensiswa + "_" + jsonabsenkelasperbulan[i].id;
        var isikehadiran = document.getElementById(kodeid)

        if (isikehadiran == null) {
            // document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
        } else {
            var link = jsonabsenkelasperbulan[i].fileContent;
            if (link !== "") {
                var linksplit = link.replace("https://drive.google.com/file/d/", "");
                var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

            } else {

                var linksplitt = "1BZwicOBix4eILY0IQrJs4H825w2k4g-3";
            }


            var cekdiv = document.getElementById(kodetd);
            if (cekdiv != null) {
                document.getElementById(kodetd).removeAttribute("onclick");

                isikehadiran.innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>${jsonabsenkelasperbulan[i].kehadiran}`;

            }
        }

    }

    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "</ol>"

    if (BolehEksekusiJikaDiSemesterIni(datee)) {
        let namatabel = document.getElementById("tabelxx"); //.rows.length; ;
        let datanama = Object.keys(jsondatasiswa).map(k => jsondatasiswa[k].pd_nama);

        let arrayy = [];
        let indektabelrekapsemester = [2, 7, 12, 17, 22, 27];
        let indeksbulanini = IndeksBulanDiSemesteTertentu(datee);
        let iStart = indektabelrekapsemester[indeksbulanini];
        let tabelnya = document.getElementById("idtabelrekapsemester")
        for (let k = 0; k < datanama.length; k++) {
            let objdata = {}
            objdata.namasiswa = datanama[k];


            let countHadir = 0,
                countIjin = 0,
                countSakit = 0;

            let countHE = namatabel.rows[2].cells.length - 1;

            for (let l = 1; l < namatabel.rows[k + 2].cells.length; l++) {
                let el = namatabel.rows[k + 2].cells[l].outerHTML;
                if (el.indexOf("red") > -1) {
                    countHE -= 1
                }

                let tes = namatabel.rows[k + 2].cells[l].innerHTML;
                if (tes.indexOf("Hadir") > -1) {
                    countHadir++
                } else if (tes.indexOf("Ijin") > -1) {
                    countIjin++
                } else if (tes.indexOf("Sakit") > -1) {
                    countSakit++
                }
            }
            objdata.Hadir = countHadir;
            objdata.Ijin = countIjin;
            objdata.Sakit = countSakit;
            objdata.Alpa = countHE - (countHadir + countIjin + countSakit);
            objdata.HariEfektif = countHE;

            arrayy.push(objdata)

            tabelnya.rows[k + 3].cells[iStart].innerHTML = countHE; // HE
            tabelnya.rows[k + 3].cells[iStart * 1 + 1].innerHTML = countHadir; //Hadir
            tabelnya.rows[k + 3].cells[iStart * 1 + 2].innerHTML = countSakit; //Sakit
            tabelnya.rows[k + 3].cells[iStart * 1 + 3].innerHTML = countIjin; //Ijin
            tabelnya.rows[k + 3].cells[iStart * 1 + 4].innerHTML = countHE - (countHadir + countIjin + countSakit); //alpa

        }
        REKAPAbsen[bulanapi] = arrayy;

    }
   
}