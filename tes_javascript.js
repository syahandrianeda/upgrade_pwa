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

///kurang efektif untuk pengisian pemetaan KD mata pelajaran

///
petakd_mapelormulok.addEventListener("change",()=>{
    //cek semester
    let dom = document.querySelectorAll("input[name=petakd_rd_semester]");
    let yy
    for(z = 0 ; z < dom.length ; z++){
        if(dom[z].checked){
            yy = dom[z].value;
        }
    }
    
    
    let dbkd = gabungdataserverkd();
    let op = petakd_mapelormulok.options;
    let sel = op.selectedIndex;
    let v = op[sel].value
    let t = op[sel].text;
    let j = idJenjang;
    let x = document.querySelector("#switchpetakd_mapel").checked;
    let tbl = document.getElementById("dist_replacekd")
    let tbdy = tbl.getElementsByTagName("tbody")[0];
    if(v === "default"){
        return
    }
    if(j > 3){
        
    }else{
        if(v == "MTK"){
            alert("Mata pelajaran Matematika sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }else if(v == "PJOK"){
            alert("Mata pelajaran PJOK sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }
    }
    let dbMP = dbkd.filter(s=> s.mapel == v && s["semester"].indexOf(yy)>-1);
    //console.log(dbMP);
    let dbLM = LingkupMateri[v];
    let html="";
    let LM;
    if(x){ /// fokus KD-3 dulu
        document.querySelector(".h_petakd1").innerHTML = "DISTRIBUSI KOMPETENSI PENGETAHUAN (KD-3)<br>MATA PELAJARAN " + t.toUpperCase();

        for(a = 0  ; a < dbLM.length; a++){
            LM = dbLM[a];
            
            
            let dbKT = dbMP.filter(s => s.koleksitema.indexOf(LM)>-1)
            if(dbKT.length > 0){
                
                let brs = dbKT.map(m => JSON.parse(m.indikator3)).reduce((a,b)=>a.concat(b));//
                
                
                let brsTotal = brs.length;//integer
                let brsperKD = dbKT.map(m => JSON.parse(m.indikator3).length);//array [1,2]
                let indik = dbKT.map(m => JSON.parse(m.indikator3));
                let jp = dbKT.map(m=>JSON.parse(m.jp3))
               
                for(b = 0 ; b < dbKT.length ; b++){
                    
                    if(b == 0 && brsperKD[b]==1){
                        html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td>`;
                    }else if(b == 0 && brsperKD[b]>1){
                        html +=`<tr><td rowspan="${brsTotal}" data-col="${a}" data-fokus="0">${LM}</td>`;
                    }
                    if(brsperKD[b]==1){
                        
                        html +=`<td  data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi3}</td>`;//materi
                        html +=`<td data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd3} ${dbKT[b].indikatorkd3}</td>`;//kd
                        
                        html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;//materi
                        html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;//materi
                        
                        
                        
                    }else{
                        html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi3}</td>`;//materi
                        html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd3} ${dbKT[b].indikatorkd3}</td>`;//kd
                        for(c=0 ; c < indik[b].length ; c++){
                            if(c==0){
                                html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;
                                html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;
                            }else{
                                
                                html +=`<tr><td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="${c}">${indik[b][c]}</td>`;
                                html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="${c}">${jp[b][c]}</td></tr>`;
                            }
                        }
                    }
                    //
                }
            }else{
                html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td><td data-col="${a}" data-fokus="1" data-baris="0"></td><td data-col="${a}" data-fokus="2" data-baris="0"></td><td data-col="${a}" data-fokus="3" data-baris="0" data-indek="0"></td><td data-col="${a}" data-fokus="4" data-baris="0" data-indek="0"></td></tr>`;
            }
        }
        //selesai untuk kasus KD-3 
        }else{
            document.querySelector(".h_petakd1").innerHTML = "DISTRIBUSI KOMPETENSI PENGETAHUAN (KD-3)<br>MATA PELAJARAN " + t.toUpperCase();

            for(a = 0  ; a < dbLM.length; a++){
                LM = dbLM[a];
                
                
                let dbKT = dbMP.filter(s => s.koleksitema.indexOf(LM)>-1)
                if(dbKT.length > 0){
                    
                    let brs = dbKT.map(m => JSON.parse(m.indikator4)).reduce((a,b)=>a.concat(b));//
                    
                    
                    let brsTotal = brs.length;//integer
                    let brsperKD = dbKT.map(m => JSON.parse(m.indikator4).length);//array [1,2]
                    let indik = dbKT.map(m => JSON.parse(m.indikator4));
                    let jp = dbKT.map(m=>JSON.parse(m.jp4))
                  
                    for(b = 0 ; b < dbKT.length ; b++){
                        
                        if(b == 0 && brsperKD[b]==1){
                            html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td>`;
                        }else if(b == 0 && brsperKD[b]>1){
                            html +=`<tr><td rowspan="${brsTotal}" data-col="${a}" data-fokus="0" data-baris="${b}">${LM}</td>`;
                        }
                        if(brsperKD[b]==1){
                            
                            html +=`<td  data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi4}</td>`;//materi
                            html +=`<td data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd4} ${dbKT[b].indikatorkd4}</td>`;//kd
                            
                            html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;//materi
                            html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;//materi
                            
                            
                            
                        }else{
                            html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi4}</td>`;//materi
                            html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd4} ${dbKT[b].indikatorkd4}</td>`;//kd
                            for(c=0 ; c < indik[b].length ; c++){
                                if(c==0){
                                    html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;
                                    html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;
                                }else{
                                    
                                    html +=`<tr><td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="${c}">${indik[b][c]}</td>`;
                                    html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="${c}">${jp[b][c]}</td></tr>`;
                                }
                            }
                        }
                        //
                    }
                }else{
                    html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td><td data-col="${a}" data-fokus="1" data-baris="0"></td><td data-col="${a}" data-fokus="2" data-baris="0"></td><td data-col="${a}" data-fokus="3" data-baris="0" data-indek="0"></td><td data-col="${a}" data-fokus="4" data-baris="0" data-indek="0"></td></tr>`;
                }
            }
            //selesai untuk kasus KD-3 
    }


  
    tbdy.innerHTML = html ;
    tooltip_petakdmapel("tbl_distribusi_kd", v,x);
    dragElement(document.getElementById("tooltipkdmapel"))
});
const switchpetakd_mapel = (el) =>{
    let dom = document.querySelectorAll("input[name=petakd_rd_semester]");
    let yy
    for(z = 0 ; z < dom.length ; z++){
        if(dom[z].checked){
            yy = dom[z].value;
        }
    }
    
    
    let x = el.checked;
    let dbkd = gabungdataserverkd();
    let op = petakd_mapelormulok.options;
    let sel = op.selectedIndex;
    let v = op[sel].value
    let t = op[sel].text;
    let j = idJenjang;
    let tbl = document.getElementById("dist_replacekd")
    let tbdy = tbl.getElementsByTagName("tbody")[0];
    if(v === "default"){
        return
    }
    if(j > 3){
        
    }else{
        if(v == "MTK"){
            alert("Mata pelajaran Matematika sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }else if(v == "PJOK"){
            alert("Mata pelajaran PJOK sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }
    }
    let dbMP = dbkd.filter(s=> s.mapel == v && s["semester"].indexOf(yy)>-1);
    //console.log(dbMP);
    let dbLM = LingkupMateri[v];
    let html="";
    let LM;
    if(x){ /// fokus KD-3 dulu
        document.querySelector(".h_petakd1").innerHTML = "DISTRIBUSI KOMPETENSI PENGETAHUAN (KD-3)<br>MATA PELAJARAN " + t.toUpperCase();
        document.querySelector("#ketswitchpetakd_mapel").innerHTML = "Kompetensi Pengetahuan (KD-3)";

        for(a = 0  ; a < dbLM.length; a++){
            LM = dbLM[a];
            
            
            let dbKT = dbMP.filter(s => s.koleksitema.indexOf(LM)>-1)
            if(dbKT.length > 0){
                
                let brs = dbKT.map(m => JSON.parse(m.indikator3)).reduce((a,b)=>a.concat(b));//
                
                
                let brsTotal = brs.length;//integer
                let brsperKD = dbKT.map(m => JSON.parse(m.indikator3).length);//array [1,2]
                let indik = dbKT.map(m => JSON.parse(m.indikator3));
                let jp = dbKT.map(m=>JSON.parse(m.jp3))
               
                for(b = 0 ; b < dbKT.length ; b++){
                    
                    if(b == 0 && brsperKD[b]==1){
                        html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td>`;
                    }else if(b == 0 && brsperKD[b]>1){
                        html +=`<tr><td rowspan="${brsTotal}" data-col="${a}" data-fokus="0">${LM}</td>`;
                    }
                    if(brsperKD[b]==1){
                        
                        html +=`<td  data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi3}</td>`;//materi
                        html +=`<td data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd3} ${dbKT[b].indikatorkd3}</td>`;//kd
                        
                        html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;//materi
                        html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;//materi
                        
                        
                        
                    }else{
                        html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi3}</td>`;//materi
                        html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd3} ${dbKT[b].indikatorkd3}</td>`;//kd
                        for(c=0 ; c < indik[b].length ; c++){
                            if(c==0){
                                html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;
                                html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;
                            }else{
                                
                                html +=`<tr><td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="${c}">${indik[b][c]}</td>`;
                                html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="${c}">${jp[b][c]}</td></tr>`;
                            }
                        }
                    }
                    //
                }
            }else{
                html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td><td data-col="${a}" data-fokus="1" data-baris="0"></td><td data-col="${a}" data-fokus="2" data-baris="0"></td><td data-col="${a}" data-fokus="3" data-baris="0" data-indek="0"></td><td data-col="${a}" data-fokus="4" data-baris="0" data-indek="0"></td></tr>`;
            }
        }
        //selesai untuk kasus KD-3 
    }else{
            document.querySelector(".h_petakd1").innerHTML = "DISTRIBUSI KOMPETENSI KETERAMPILAN (KD-4)<br>MATA PELAJARAN " + t.toUpperCase();
            document.querySelector("#ketswitchpetakd_mapel").innerHTML = "Kompetensi Keterampilan (KD-4)";
            for(a = 0  ; a < dbLM.length; a++){
                LM = dbLM[a];
                
                
                let dbKT = dbMP.filter(s => s.koleksitema.indexOf(LM)>-1)
                if(dbKT.length > 0){
                    
                    let brs = dbKT.map(m => JSON.parse(m.indikator4)).reduce((a,b)=>a.concat(b));//
                    
                    
                    let brsTotal = brs.length;//integer
                    let brsperKD = dbKT.map(m => JSON.parse(m.indikator4).length);//array [1,2]
                    let indik = dbKT.map(m => JSON.parse(m.indikator4));
                    let jp = dbKT.map(m=>JSON.parse(m.jp4))
                  
                    for(b = 0 ; b < dbKT.length ; b++){
                        
                        if(b == 0 && brsperKD[b]==1){
                            html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td>`;
                        }else if(b == 0 && brsperKD[b]>1){
                            html +=`<tr><td rowspan="${brsTotal}" data-col="${a}" data-fokus="0" data-baris="${b}">${LM}</td>`;
                        }
                        if(brsperKD[b]==1){
                            
                            html +=`<td  data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi4}</td>`;//materi
                            html +=`<td data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd4} ${dbKT[b].indikatorkd4}</td>`;//kd
                            
                            html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;//materi
                            html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;//materi
                            
                            
                            
                        }else{
                            html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b].materi4}</td>`;//materi
                            html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b].kd4} ${dbKT[b].indikatorkd4}</td>`;//kd
                            for(c=0 ; c < indik[b].length ; c++){
                                if(c==0){
                                    html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;
                                    html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${jp[b][0]}</td></tr>`;
                                }else{
                                    
                                    html +=`<tr><td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="${c}">${indik[b][c]}</td>`;
                                    html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="${c}">${jp[b][c]}</td></tr>`;
                                }
                            }
                        }
                        //
                    }
                }else{
                    html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td><td data-col="${a}" data-fokus="1" data-baris="0"></td><td data-col="${a}" data-fokus="2" data-baris="0"></td><td data-col="${a}" data-fokus="3" data-baris="0" data-indek="0"></td><td data-col="${a}" data-fokus="4" data-baris="0" data-indek="0"></td></tr>`;
                }
            }
            //selesai untuk kasus KD-4 
    }
    tbdy.innerHTML = html ;
    tooltip_petakdmapel("tbl_distribusi_kd", v,x);
    dragElement(document.getElementById("tooltipkdmapel"))
}


const tooltip_petakdmapel = (cl, mapel,bol) =>{
    let brs,kolo;
    let tabler = document.querySelector("."+ cl);
    let sumberdata = gabungdataserverkd();
    let key_nokd = bol?"kd3":"kd4";
    let key_tekskd = bol?"indikatorkd3":"indikatorkd4";
    let key_materi = bol?"materi3":"materi4";
    let key_indikator = bol?"indikator3":"indikator4";
    let key_jp = bol?"jp3":"jp4"
    // let key_materikd= bol?
    let tooltipspin = document.getElementById("loadingtooltipmapel")
    tooltipspin.style.display = "none";
    
    for(var i = 1; i < tabler.rows.length; i++){
        // row cells
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            let tmbl_kd = document.querySelector(".tempattooltipbtnkd");
            let tmbl_editor = document.querySelector(".tempattooltipeditor")
            let tmbl_jp = document.querySelector(".tempattooltipjp");
            
            
            tabler.rows[i].cells[j].onmouseover = function(){
            //let baris = this.parentElement.nodeName;
            brs = this.parentElement.rowIndex - 1;
            kolo = this.cellIndex +1;
            let tekstitle = "Klik baris " + brs +" kolom "+ kolo;
            this.setAttribute("title",tekstitle);
            };
            
            tabler.rows[i].cells[j].onmouseout = function(){
            this.removeAttribute("title")
            //console.log("onmouseout")
            // document.querySelector("#tooltiptabel").style.display="none"
            };
            tabler.rows[i].cells[j].onclick = function(){
                let tdfokus = this;
                let diklik = tdfokus.getAttribute("data-fokus");
                let ttop ;
                let lleft ;
                let llright;
                
                if(diklik == 0 ){
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "none";
                    tmbl_jp.style.display = "none";
                    
                    ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkanan").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "block";
                }else if(diklik == 1){
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "block";
                    tmbl_jp.style.display = "none";

                    ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkanan").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "block";
                }else if(diklik == 2){
                    tmbl_kd.style.display = "block";
                    tmbl_editor.style.display = "none";
                    tmbl_jp.style.display = "none";
                    ttop = (tabler.offsetTop + this.offsetTop+ 30) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft + 10) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;
                    document.querySelector(".tooltiparahatas").style.display = "block";
                    document.querySelector(".tooltiparahkanan").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "none";
                }else if(diklik == 3){
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "block";
                    tmbl_jp.style.display = "none";
                    ttop = (tabler.offsetTop + this.offsetTop) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft - 360) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;

                    document.querySelector(".tooltiparahkanan").style.display = "block";
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "none";
                }else{
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "none";
                    tmbl_jp.style.display = "block";
                    ttop = (tabler.offsetTop + this.offsetTop) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft - 360) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left =lleft;
                    document.querySelector(".tooltiparahkanan").style.display = "block";
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "none";    
                }
                let rIndex = this.parentElement.rowIndex;
                let cIndex = this.cellIndex;//+1;
                let arrKDmapel = sumberdata.filter(s=>s.mapel == mapel && s[key_tekskd] !== "");//tagkdserver.filter(s => s.mapel==mapel);
                //tampilkan tooltip
                document.querySelector("#tooltipkdmapel").style.display="block";
                let fokuskolom = tdfokus.getAttribute("data-fokus")
                let fokuslm = tdfokus.getAttribute("data-col");
                let teksKolomLM = document.querySelectorAll("[data-col='"+ fokuslm +"']");
                let fokusbaris;
                let tooltiphapuskolom =document.querySelector(".tooltiphapuskolom");
                let tooltiptambahkolom =document.querySelector(".tooltiptambahkolom");
                let kirimtooltipeditor = document.querySelector(".kirimtooltipeditor");
                let kirimtooltipjam = document.querySelector(".kirimtooltipjam");
                let inputjp = document.querySelector("#inputjp");
                let inputmateri = document.querySelector("#tooltipeditor");
                let val;
                let btn = document.querySelectorAll(".badge_mapel");
                //console.log(tagkd34);
                
                let barisserver;
                for(a = 0 ; a < btn.length ; a++){
                    //console.log(arrKDmapel)
                    let btnklik = btn[a];
                    btnklik.style.display ="none";
                    let info; let dataconsole
                    if(a < arrKDmapel.length){
                        btnklik.style.display ="inline-block";
                        if(arrKDmapel[a].koleksitema !== ""){
                            btnklik.className = btnklik.className.replace("w3-sand","w3-red")
                            info = "Sudah dikelompokkan ke Lingkup Materi " + JSON.parse(arrKDmapel[a].koleksitema)[0];
                            btnklik.innerHTML = "<s>" + arrKDmapel[a][key_nokd]+"</s>";
                            btnklik.disabled = true;
                        }else{
                            btnklik.innerHTML =arrKDmapel[a][key_nokd];
                            info = arrKDmapel[a][key_tekskd];
                        }
                        //barisserver = arrKDmapel[a].row;
                        dataconsole = arrKDmapel[a];
                    }
                    btnklik.onmouseover = function(){
                            this.setAttribute("title",info);
                    }
                    btnklik.onmouseout = function(){
                        this.removeAttribute("title")
                    }
                    btnklik.onclick = function(){
                        //let fokuskolom = tdfokus.getAttribute("data-fokus")
                        if(fokuskolom==2){
                            if(tdfokus.innerHTML!==""){
                                alert("Fitur ini hanya berfungsi ketika Kolom Kompetensi Dasar belum terisi (kosong). Jika Anda tidak membutuhkan KD ini, sebaiknya Anda hapus kolom.\n\n Tambah kolom untuk membuat KD baru di Lingkup Materi ini.");
                                return
                            }
                            tdfokus.innerHTML = dataconsole[key_nokd]+" "+dataconsole[key_tekskd];
                            val = teksKolomLM[0].innerHTML;
                            barisserver = dataconsole.row;
                            update_dataserverpetakdmapel(cl, mapel,bol, barisserver, val,fokuskolom,0)
                        }else{
                            alert("KD hanya untuk kolom KD");
                        }
                    }

                }
                tooltiphapuskolom.onclick = function (){
                    if(fokuskolom==0){
                        alert("Maaf, untuk menghapus Lingkup Materi, gunakan tombol Lingkup Materi.")
                    }else{
                        let konf;// = confirm("Anda yakin ingin menghapus kolom ini?");
                        let datayangdihapus = tdfokus.innerHTML;
                        let brshpss = tdfokus.getAttribute("data-baris")
                        let brshps =`[data-baris="${brshpss}"]`;
                        if(fokuskolom == 1 || fokuskolom == 2){
                            konf = confirm("Anda yakin ingin menghapus kolom ini?");
                            if(!konf){
                                return
                            }
                            let param = `[data-col="${fokuslm}"]${brshps}`
                            let tds = document.querySelectorAll(param);
                            let tekscek,tdindek
                            for(e = 0 ; e < tds.length; e++){
                                tekscek = tds[e].getAttribute("data-baris")
                                if(tds[e].hasAttribute("data-indek")){
                                    tdindek = tds[e].getAttribute("data-indek")
                                }else{
                                    tdindek = ""
                                }
                                if(tekscek == 0 && tdindek == 0){
                                    tds[e].innerHTML ="";
                                }else{
                                    let inde = tds[e].cellIndex;
                                    tds[e].parentElement.deleteCell(0);
                                }
                            }
                        }else if(fokuskolom == 3 || fokuskolom == 4){
                            konf = confirm("Anda yakin ingin menghapus kolom ini? Kolom isian ini masih dapat Anda ubah dengan nilai isian yang berbeda.");
                            if(!konf){
                                return
                            }
                            //let tdg = tdfokus.parentNode.parentNode.rowIndex
                            let ybrs = tdfokus.getAttribute("data-indek");
                            if(ybrs == 0){
                                return
                            }
                            let xbrs = tdfokus.getAttribute("data-baris");
                            let tdLM = document.querySelectorAll(`[data-col="${fokuslm}"]`);
                            let rsLM 
                            if(tdLM[0].hasAttribute("rowspan")){
                                rsLM = tdLM[0].getAttribute("rowspan");
                                if(rsLM == 2){
                                    tdLM[0].removeAttribute("rowspan");
                                }else{
                                    rsLM = rsLM  - 1
                                    tdLM[0].setAttribute("rowspan", rsLM)
                                }
                            };
                            let tdIndik = document.querySelectorAll(`[data-col="${fokuslm}"][data-baris="${xbrs}"]`);
                            if(tdIndik[0].hasAttribute("rowspan")){
                                let rtind = tdIndik[0].getAttribute("rowspan");
                                if(rtind == 2){
                                    tdIndik[0].removeAttribute("rowspan")
                                    tdIndik[1].removeAttribute("rowspan")
                                }else{
                                    rtind = rtind - 1;
                                    tdIndik[0].setAttribute("rowspan", rtind);
                                    tdIndik[1].setAttribute("rowspan", rtind);
                                }
                            }
                            tabler.deleteRow(rIndex);
                        }
                        tooltip_petakdmapel(cl, mapel,bol);
                    }
                    document.getElementById('tooltipkdmapel').style.display='none';
                }
                tooltiptambahkolom.onclick = function (){
                    if(fokuskolom == 0){ // ketika mengeklik kolom Lingkup Materi
                        alert("Maaf, Anda tidak bisa menambahkan satu baris lagi. Anda hanya bisa menghapusnya satu baris ini.")
                    }else if(fokuskolom == 1 || fokuskolom ==2 ){//KD atau materi
                        //menentukan indexRow berdasarkan rIndex dan jumlah Span;
                        let fbrs = new Date().getSeconds()+1;//tdfokus.getAttribute("data-baris")
                        let rws,x
                        if(tdfokus.hasAttribute("rowspan")){
                            rws = tdfokus.getAttribute("rowspan")
                        }else{
                            rws = 1
                        }
                        x = (parseInt(rws) + parseInt(rIndex));//
                        //kedua, carikan element dengan data-col=fokuslm yang index-nya pertama
                        let tdrowspan = document.querySelectorAll(`[data-col="${fokuslm}"]`);
                        let llm = tdrowspan[0].innerHTML;
                        let rwsBefore 
                        if(tdrowspan[0].hasAttribute("rowspan")){
                            rwsBefore = tdrowspan[0].getAttribute("rowspan");
                        }else{
                            rwsBefore = 1
                        }
                        let z = (parseInt(rwsBefore) + 1)
                        tdrowspan[0].setAttribute("rowspan",z);
                        let findex = new Date().getSeconds()+2;
                        let g = tabler.insertRow(x);//rIndex
                        let h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","1");
                        h.setAttribute("data-baris",fbrs);
                        h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","2");
                        h.setAttribute("data-baris",fbrs);
                        h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","3");
                        h.setAttribute("data-baris",fbrs);
                        h.setAttribute("data-indek",findex);
                        h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","4");
                        h.setAttribute("data-baris",fbrs);
                        h.setAttribute("data-indek",findex);
                    }else if(fokuskolom == 3 || fokuskolom == 4){
                        let tdrowspan = document.querySelectorAll(`[data-col="${fokuslm}"]`);
                        let llm = tdrowspan[0].innerHTML;
                        let rwsBefore 
                        if(tdrowspan[0].hasAttribute("rowspan")){
                            rwsBefore = tdrowspan[0].getAttribute("rowspan");
                        }else{
                            rwsBefore = 1
                        }
                        let z = (parseInt(rwsBefore) + 1)
                        tdrowspan[0].setAttribute("rowspan",z);
                        //
                        let rowspankdmateri;
                        let eldomtd=[]; 
                        let kodebaris = tdfokus.getAttribute("data-baris");
                        let param = `[data-baris="${kodebaris}"]`;
                        tdrowspan = document.querySelectorAll(`[data-col="${fokuslm}"]${param}`);
                        for(l = 0 ; l < tdrowspan.length; l++){
                            if(tdrowspan[l].hasAttribute("rowspan")){
                                    rowspankdmateri = tdrowspan[l].getAttribute("rowspan");
                                    let c = parseInt(rowspankdmateri)+1
                                    if(!tdrowspan[l].hasAttribute("data-indek")){
                                        tdrowspan[l].setAttribute("rowspan",c)
                                    }else{
                                        let d = l-1;
                                        eldomtd.push(d);
                                    }
                            }else{
                                    if(!tdrowspan[l].hasAttribute("data-indek")){
                                        tdrowspan[l].setAttribute("rowspan",2)
                                    }else{
                                        let d = l-1;
                                        eldomtd.push(d);
                                    }   
                                    
                            }
                        }
                        let tx = eldomtd.length/2
                        let xyz = parseInt(rIndex)+1
                        let g = tabler.insertRow(xyz);//rIndex
                        let h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","3");
                        h.setAttribute("data-baris","0");
                        h.setAttribute("data-indek",tx);
                        h = g.insertCell(-1);
                        
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","4");
                        h.setAttribute("data-baris","0");
                        h.setAttribute("data-indek",tx);
                    }
                    tooltip_petakdmapel(cl, mapel,bol);
                    document.getElementById('tooltipkdmapel').style.display='none';
                }
                kirimtooltipeditor.onclick = function (){
                    let cekcol = tdfokus.getAttribute("data-col");
                    let cekbaris = tdfokus.getAttribute("data-baris")
                    let cekparam =  `[data-col="${cekcol}"][data-fokus="2"][data-baris="${cekbaris}"]`;
                    let cektunggal = document.querySelector(cekparam);
                    let prs = cektunggal.innerHTML;
                    if(prs == ""){
                        alert("Isikan terlebih dahulu KD-nya");
                        return
                    }
                    let mprs = prs.match(/^([34]\.\d+)/g);
                    let barisserver = arrKDmapel.filter(s=> s[key_nokd] == mprs)[0].row;
                    let idx;
                    tdfokus.innerHTML = inputmateri.innerHTML;
                    if(fokuskolom == 1){
                        idx = 0
                        val = inputmateri.innerHTML;
                    } else{
                        idx= tdfokus.getAttribute("data-index");
                        let ps = [];
                        let elcari = document.querySelectorAll(`[data-col="${cekcol}"][data-fokus="3"][data-baris="${cekbaris}"][data-indek]`);
                        for(r = 0 ; r < elcari.length ; r++){
                            ps.push(elcari[r].innerHTML)
                        }
                        val = JSON.stringify(ps);
                    }
                    
                    update_dataserverpetakdmapel(cl, mapel,bol, barisserver, val,fokuskolom,idx)

                }
                kirimtooltipjam.onclick = function (){
                    tdfokus.innerHTML = inputjp.value +" JP.";
                    
                    let cekcol = tdfokus.getAttribute("data-col");
                    let cekbaris = tdfokus.getAttribute("data-baris")
                    let cekparam =  `[data-col="${cekcol}"][data-fokus="2"][data-baris="${cekbaris}"]`;
                    let cektunggal = document.querySelector(cekparam);
                    let prs = cektunggal.innerHTML;
                    if(prs == ""){
                        alert("Isikan terlebih dahulu KD-nya");
                        return
                    }
                    let mprs = prs.match(/^([34]\.\d+)/g);
                    let barisserver = arrKDmapel.filter(s=> s[key_nokd] == mprs)[0].row;
                    let ps = [];
                        let elcari = document.querySelectorAll(`[data-col="${cekcol}"][data-fokus="4"][data-baris="${cekbaris}"][data-indek]`);
                        for(r = 0 ; r < elcari.length ; r++){
                            ps.push(elcari[r].innerHTML.replace(" JP.",""))
                        }
                        val = JSON.stringify(ps);
                        update_dataserverpetakdmapel(cl, mapel,bol, barisserver, val,fokuskolom,0);
                       
                }
            }
        }
    }
    // document.getElementById('tooltipkdmapel').style.display='none';
};
const update_dataserverpetakdmapel = (cl, mapel,bol,row, val,fokus,indek)=>{
    let dbAsal = tagkdserver.filter(s=>s.mapel == mapel && s.row == row)[0];//object
    let key_fokus=[0,1,2,3,4];
    let key_keyHeader = bol?["koleksitema","indikator3","materi3","jp3"]:["koleksitema","indikator4","materi4","jp4"];

    let objKirim = {};
    let pushkoleksitema=[];
    let pushindikator = [];
    let pushmateri = [];
    let pushjp = [];
    /* 
    0 => fokus untuk Lingkup Materi, biasanya gigunakan untuk menghapus seluruh info KD yang diisi di baris server ini
    1 => fokus untuk mengisi/mengedit Materi
    2 => fokus untuk mengisi KD
    3 => fokus untuk mengisi array indikator
    4 => fokus untuk mengisi array Jam tayang
    */
    // console.log(cl)
    // console.log(mapel)
    // console.log(bol)
    // console.log(row)
    // console.log(val)
    // console.log(fokus)
    // console.log("dbAsal:")
    
    
    
    // console.log(dbAsal)
    if(fokus == 2){
        /// jika ingin mengisi/mengubah KD, maka pada baris ini akan hilang!
        pushkoleksitema.push(val);
        objKirim.koleksitema = JSON.stringify(pushkoleksitema);
        objKirim.indikator3 = JSON.stringify([""]);
        objKirim.indikator4 = JSON.stringify([""]);
        objKirim.jp3 = JSON.stringify([""]);
        objKirim.jp4 = JSON.stringify([""]);
    }
    console.log(objKirim);
    // let objekjadikirim = Object.assign(objekserverkdsebelumnya,{"koleksitema":JSON.stringify(arrBaru),"semester":JSON.stringify(smsBaru)});
    // let keyy = JSON.stringify(Object.keys(objekjadikirim));
    // ///idbaris = row;
    // let tabel= JSON.stringify(Object.values(objekjadikirim))
    
    // let datakirim = new FormData();
    // datakirim.append("key",keyy);
    // datakirim.append("idbaris",row);
    // datakirim.append("tab","serverkd");
    // datakirim.append("tabel",tabel);
    // //datakirim.append("tipe",tipe);
    // fetch(urladm+"?action=simpanbarisketabidbaris",{
    //     method:"post",
    //     body:datakirim
    // }).then(m=>m.json())
    // .then(r => {
    //     let result = r.data;
    //     tagkdserver = result.filter(s => s.kelas == idJenjang);
    //     console.log("distribusi  kd berhasil tersimpan")
    //      tooltip_petakdmapel(cl, mapel,bol,row)
    // })
    // .catch(er => console.log(r))

}
///

const htmlpetakd_sebaranpertema = (T,bol)=>{
    let tabel = document.querySelector(".tabelsebaran_sebarankdpertema");
    let no_t = T.match(/(\d+)/)[0];
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let tfoot = tabel.getElementsByTagName("tfoot")[0];
    let dBS = gabungdataserverkd();
    let dB = dBS.filter(s => s["koleksitema"].indexOf(T)>-1);
    let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
    let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
    let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
    let arrHeaderRendah = ["PKN","Bahasa Indonesia","Matematika","SBDP","PJOK"];
    let krt_tekskd = bol?"indikatorkd3":"indikatorkd4";
    let krt_nokd = bol?"kd3":"kd4";

    let koleksiCodeMP, koleksiHeader, ltd
    if(idJenjang > 3){
        koleksiCodeMP = arrCodeMapelTinggi;
        koleksiHeader = arrHeaderTinggi;
        ltd = 3;
    }else{
        koleksiCodeMP = arrCodeMapelRendah;
        koleksiHeader = arrHeaderRendah;
        ltd = 4;
    }
    let html = "";
    let arrResult = [];
    let countKol; 
    let idkd;
    let arrJumlahperkolom = [];
    let c_perbaris = 0;
    let tc_perbaris = "";
    for(a = 0 ; a < koleksiCodeMP.length ; a++){
        let MP = koleksiCodeMP[a];
        let dt = dB.filter(s => s.mapel == MP);
        let objekKolom = {}, keyOK ;
        
            if(dt.length == 1){
                html += `<tr><td>${(a+1)}</td><td>${koleksiHeader[a]}</td><td>${dt[0][krt_nokd]} ${dt[0][krt_tekskd]}</td>`;
                for(c = 1 ; c <= ltd ; c++){
                    for(d = 1 ; d <= 6 ; d++){
                        let key_v = `t${no_t}_st${c}_pb${d}`;
                        let ceklis = dt[0][key_v];
                        keyOk = "kolom_" + no_t + "_" + c + "_" + d;
                        objekKolom[keyOk] = ceklis;
                        if(ceklis == ""){
                            html +=`<td data-skrow="${dt[0].row}" data-keyskrow="t${no_t}_st${c}_pb${d}">${ceklis}</td>`
                        }else{
                            c_perbaris++
                            html +=`<td data-skrow="${dt[0].row}" data-keyskrow="t${no_t}_st${c}_pb${d}" class="w3-light-green w3-large w3-cell-middle">${ceklis}</td>`
                        }
                    }
                }
                idkd = dt[0].kd;
                
                countKol = dt.filter(s=> s.kd == idkd).map(m => Object.entries(m).filter(([a,b])=> b == "&checkmark;" || b == "✓")).reduce((a,b)=>a.concat(b))
                // html += `<td data-filter="${MP}_${dt[0].kd}">${countKol.length==0?"":countKol.length}</td></tr>`;
                tc_perbaris = c_perbaris == 0?"":c_perbaris;
                html += `<td data-filter="${MP}_${dt[0].kd}">${tc_perbaris}</td></tr>`;
                c_perbaris = 0;
            }else{
                let lr = dt.length;
                for(e=0 ; e < lr ; e++){
                    if(e == 0){
                        html +=`<tr><td rowspan="${lr}">${(a+1)}</td>`;
                        html +=`<td rowspan="${lr}">${koleksiHeader[a]}</td>`;
                        html +=`<td>${dt[e][krt_nokd]} ${dt[e][krt_tekskd]}</td>`;
                        for(c = 1 ; c <= ltd ; c++){
                            for(d = 1 ; d <= 6 ; d++){
                                let key_v = `t${no_t}_st${c}_pb${d}`;
                                let ceklis = dt[e][key_v];
                                keyOk = "kolom_" + no_t + "_" + c + "_" + d;
                                objekKolom[keyOk] = ceklis;
                                if(ceklis == ""){
                                    
                                    html +=`<td data-skrow="${dt[e].row}" data-keyskrow="t${no_t}_st${c}_pb${d}">${ceklis}</td>`
                                }else{
                                    c_perbaris++
                                    html +=`<td data-skrow="${dt[e].row}" data-keyskrow="t${no_t}_st${c}_pb${d}" class="w3-light-green w3-large w3-cell-middle">${ceklis}</td>`
                                    
                                }
                            }
                        }
                        idkd = dt[e].kd;
                        countKol = dt.filter(s=> s.kd == idkd).map(m => Object.entries(m).filter(([a,b])=> b == "&checkmark;" || b == "✓")).reduce((a,b)=>a.concat(b))
                
                        // html += `<td data-filter="${MP}_${dt[e].kd}">${countKol.length==0?"":countKol.length}</td></tr>`;
                        tc_perbaris = c_perbaris == 0?"":c_perbaris;
                        html += `<td data-filter="${MP}_${dt[e].kd}">${tc_perbaris}</td></tr>`;
                    }else{
                        html +=`<tr><td>${dt[e][krt_nokd]} ${dt[e][krt_tekskd]}</td>`;
                        for(c = 1 ; c <= ltd ; c++){
                            for(d = 1 ; d <= 6 ; d++){
                                let key_v = `t${no_t}_st${c}_pb${d}`;
                                let ceklis = dt[e][key_v];
                                keyOk = "kolom_" + no_t + "_" + c + "_" + d;
                                objekKolom[keyOk] = ceklis;
                                if(ceklis == ""){
                                    
                                    html +=`<td data-skrow="${dt[e].row}" data-keyskrow="t${no_t}_st${c}_pb${d}">${ceklis}</td>`
                                }else{
                                    c_perbaris++
                                    html +=`<td data-skrow="${dt[e].row}" data-keyskrow="t${no_t}_st${c}_pb${d}" class="w3-light-green w3-large w3-cell-middle">${ceklis}</td>`
                                    
                                }
                            }
                        }
                        idkd = dt[e].kd;
                        countKol = dt.filter(s=> s.kd == idkd).map(m => Object.entries(m).filter(([a,b])=> b == "&checkmark;" || b == "✓")).reduce((a,b)=>a.concat(b))
                        
                        // html += `<td data-filter="${MP}_${dt[e].kd}">${countKol.length==0?"":countKol.length}</td></tr>`;
                        tc_perbaris = c_perbaris == 0?"":c_perbaris;
                        html += `<td data-filter="${MP}_${dt[e].kd}">${tc_perbaris}</td></tr>`;

                    }
                }
                c_perbaris = 0;
            }
        c_perbaris = 0;
        arrJumlahperkolom.push(objekKolom);

    }
    
    tbody.innerHTML = html;
    let countBottomH = document.querySelector(".jumlahkdditemaini_sebarankdpertema");
    countBottomH.innerHTML ="Jumlah KD di " + T + " ini ada " + dB.length;
    
   

    let tdf = tfoot.rows[0].cells[2];
    let lasttdf = tfoot.rows[0].cells.length
    let tdff = tfoot.rows[1].cells[1];
    let lasttdft = tfoot.rows[1].cells.length;
    let m = 0;
    let total = 0;
    for(f = 1 ; f <= ltd ; f++){
        for(g = 1 ; g <= 6 ; g++){
            let namakey =  "kolom_" + no_t + "_" + f + "_" + g;
            let key_nama = "t"+no_t +"_st"+f+"_pb"+g;
            // let con = arrJumlahperkolom.filter(s => s[namakey] == "&checkmark;"|| s[namakey] == "✓");
            let con = dB.filter(s => s[key_nama] == "&checkmark;"|| s[key_nama] == "✓")
            let teks = con.length == 0?"": con.length;
            m += con.length;
            tdf.innerHTML = teks;
            tdf = tdf.nextSibling;


            let conTotal = dB.filter(s => s[key_nama] == "&checkmark;"|| s[key_nama] == "✓");
            total += conTotal.length;
        }
        tdff.innerHTML = m==0?"":m;
        tdff = tdff.nextSibling;
        m=0;
    }
    tfoot.rows[0].cells[lasttdf-1].innerHTML = total;
    tfoot.rows[1].cells[lasttdft-1].innerHTML = total;
    klikconfigceklis(T,bol);



}
