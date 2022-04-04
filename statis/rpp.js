
const chg_rppsampai = ()=>{
    let ck = document.querySelector("#rpp_tglsampai")
    let dv = document.querySelector("#dv_tglsampai")
    if(ck.checked){
        //dicek ada ga
        dv.classList.remove("w3-hide")
    }else{
        dv.classList.add("w3-hide")
    }
}
const admguru = async()=>{
    tampilinsublamangurukelas("administrasiguru");
    cekApiSebaranKD()
    await kurikulumdiamdiam()
    document.querySelector(".tabrpp").click();
}
// const previewrpp = () =>{
//     document.getElementById("prev_rpp").style.display = "block";
//     let dataisian = obj_isianrpp();
//     let datarpp =dataisian.objek[0];
//     //console.log(datarpp)
//     document.querySelector("#prt_mapel").innerHTML = datarpp.rpp_jenistematik + ": "+ JSON.stringify(datarpp.mapel_dipilih).replace(/["']/g, " ") ;

//     document.querySelector("#prt_kelas").innerHTML = idNamaKelas + " / "+ datarpp.rpp_semester;
//     document.querySelector("#prt_judul").innerHTML = datarpp.rpp_judul;
//     document.querySelector("#prt_tema").innerHTML = datarpp.rpp_tema;
//     document.querySelector("#prt_tgl").innerHTML = (datarpp.rpp_adabatastanggal == "true" ? tanggalfull(datarpp.rpp_tglawal) +" s/d " + tanggalfull(datarpp.rpp_tglakhir): tanggalfull(datarpp.rpp_tglawal));
//     document.querySelector("#prt_tujuanpembelajaran").innerHTML = datarpp.rpp_tujuanpembelajaran;// (datarpp.rpp_tujuanpembelajaran).search('ql-formula') == -1? datarpp.rpp_tujuanpembelajaran : (datarpp.rpp_tujuanpembelajaran).replace(/([\n])/g, '<br/>') ;;;
//     //datarpp.rpp_tujuanpembelajaran;//(datarpp.rpp_tujuanpembelajaran).replace(/[\n]/g, "<br>") ; 
//     document.querySelector("#prt_langkahpembelajaran").innerHTML = datarpp.rpp_langkahpembelajaran;// (datarpp.rpp_langkahpembelajaran).replace(/([\n])/g, '<br/>'); ; 
//     document.querySelector("#prt_penilaian").innerHTML = datarpp.rpp_penilaian; 
    

// }

// var toolbarOptions = [
//       ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//       ['blockquote', 'code-block','formula'],
//       [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//       [{ 'font': [] }],
//       [{ 'align': [] }],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//       ['link', 'image','video'],
//       [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//       [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//       [{ 'direction': 'rtl' }],                         // text direction
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
    
//       ['clean']                                         // remove formatting button
// ];

//     const options = {};
  
//   var opsimath = document.querySelector("#optionmath")
//     options["operators"] = JSON.parse(opsimath.getAttribute("data-value"));
// var quill = new Quill('#editor', {
//         modules: {
//         toolbar: {
//                 container: toolbarOptions,
//                 handlers: { "image": quill_img_handler },
//         },
//         imageResize: {
//                 displaySize: true
//             },
//         formula: true,
//         },
//         theme: 'snow'
//       });
// var quill1 = new Quill('#editor1', {
//     modules: {
//         toolbar: {
//                 container: toolbarOptions,
//                 handlers: { "image": quill_img_handler1 },
//         },
//         imageResize: {
//                 displaySize: true
//             },
//         formula: true,
//         },
//         theme: 'snow'
//     });
//     const enableMathQuillFormulaAuthoring = window.mathquill4quill();      
//     enableMathQuillFormulaAuthoring(quill, options);
//     enableMathQuillFormulaAuthoring(quill1, options);


// function quill_img_handler() {
//     let fileInput = this.container.querySelector('input.ql-image[type=file]');
//     console.log(this);
// if (fileInput == null) {
//             fileInput = document.createElement('input');
//             fileInput.setAttribute('type', 'file');
//             fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
//             fileInput.classList.add('ql-image');
//     fileInput.addEventListener('change', () => {
//             const files = fileInput.files;
//             const range = this.quill.getSelection(true);
            
//             if (!files || !files.length) {
//             //          console.log('No files selected');
//             return;
//             }
//                 let ketval = document.formuploadmateri.idmapel.value
//                 let val = (ketval == "") ? "e-lamaso" : ketval;
//                 let reader = new FileReader();
//                 var item = files[0];
//                 let url ="";
//                 this.quill.enable(false);
//         loadingtopbarin("loadingtopbar");
//         reader.readAsDataURL(item);
//         reader.onload = async function (e) {

//             let bs64 = e.target.result.replace(/^.*,/, '');
//             let mmtpe = e.target.result.match(/^.*(?=;)/)[0];
//             let namafile = "edurasa_" + new Date().getTime()
//             let frmdata = new FormData();
//                 frmdata.append("gmbrdata", bs64);
//                 frmdata.append("gmbrfilename", namafile);
//                 frmdata.append("gmbrmimeType", mmtpe);
//                 frmdata.append("keterangan", val);

//         await fetch(linkmateri + "&action=uplgmbrmateri", {
//                     method: 'post',
//                     body: frmdata
//             })
//             .then(m => m.json())
//             .then(k => {
//                 let link = k.url
//                 url = "https://drive.google.com/uc?export=view&id=" + link;
//                 //matikan animasi
//                 clearInterval(stoploadingtopbar);
//                 let divlod = document.querySelector(".loadingtopbar");
//                 divlod.style.width = "100%";
//                 setTimeout(() => {
//                     divlod.style.width = "1px"
//                     divlod.className += " w3-hide";

//                 }, 3000);

//                 quill.enable(true);
//                 quill.insertEmbed(range.index, 'image', url);
//                 quill.setSelection(range.index + 1, Quill.sources.SILENT);
//             })
//             .catch(er => {
//             console.log(er);
//                 quill.enable(true);
//             })

//         }

//     });
//           this.container.appendChild(fileInput);
// }
// fileInput.click();
// }   
// function quill_img_handler1() {
//     let fileInput = this.container.querySelector('input.ql-image[type=file]');
//     console.log(this);
// if (fileInput == null) {
//             fileInput = document.createElement('input');
//             fileInput.setAttribute('type', 'file');
//             fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
//             fileInput.classList.add('ql-image');
//             fileInput.addEventListener('change', () => {
//             const files = fileInput.files;
//             const range = quill1.getSelection(true);
            
//             if (!files || !files.length) {
//             //          console.log('No files selected');
//             return;
//             }
//                 let ketval = document.formuploadmateri.idmapel.value
//                 let val = (ketval == "") ? "e-lamaso" : ketval;
//                 let reader = new FileReader();
//                 var item = files[0];
//                 let url ="";
//                 quill1.enable(false);
//         loadingtopbarin("loadingtopbar");
//         reader.readAsDataURL(item);
//         reader.onload = async function (e) {

//             let bs64 = e.target.result.replace(/^.*,/, '');
//             let mmtpe = e.target.result.match(/^.*(?=;)/)[0];
//             let namafile = "edurasa_" + new Date().getTime()
//             let frmdata = new FormData();
//                 frmdata.append("gmbrdata", bs64);
//                 frmdata.append("gmbrfilename", namafile);
//                 frmdata.append("gmbrmimeType", mmtpe);
//                 frmdata.append("keterangan", val);

//         await fetch(linkmateri + "&action=uplgmbrmateri", {
//                     method: 'post',
//                     body: frmdata
//             })
//             .then(m => m.json())
//             .then(k => {
//                 let link = k.url
//                 url = "https://drive.google.com/uc?export=view&id=" + link;
//                 //matikan animasi
//                 clearInterval(stoploadingtopbar);
//                 let divlod = document.querySelector(".loadingtopbar");
//                 divlod.style.width = "100%";
//                 setTimeout(() => {
//                     divlod.style.width = "1px"
//                     divlod.className += " w3-hide";

//                 }, 3000);

//                 quill1.enable(true);
//                 quill1.insertEmbed(range.index, 'image', url);
//                 quill1.setSelection(range.index + 1, Quill.sources.SILENT);
//             })
//             .catch(er => {
//             console.log(er);
//                 quill1.enable(true);
//             })

//         }

//     });
//           this.container.appendChild(fileInput);
// }
// fileInput.click();
// }   

// function uye(){
//     let fileInput = this.container.querySelector('input.ql-image[type=file]');
//     if (fileInput == null) {
//       fileInput = document.createElement('input');
//       fileInput.setAttribute('type', 'file');
//       fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
//       fileInput.classList.add('ql-image');
//       fileInput.addEventListener('change', () => {
//         if (fileInput.files != null && fileInput.files[0] != null) {
//           let reader = new FileReader();
//           reader.onload = (e) => {
//             let range = this.quill.getSelection(true);
//             this.quill.updateContents(new Delta()
//               .retain(range.index)
//               .delete(range.length)
//               .insert({ image: e.target.result })
//             , Emitter.sources.USER);
//             fileInput.value = "";
//           }
//           reader.readAsDataURL(fileInput.files[0]);
//         }
//       });
//       this.container.appendChild(fileInput);
//     }
//     fileInput.click();
//   }
  
// function imageHandler() {
//   try{
//     const range = quill.getSelection();
//     const teks = quill.getText(range.index, range.length);
//     const sources = teks.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
//     const link = sources[0];
//     quill.deleteText(range.index, range.length+1);
//     quill.insertEmbed(range.index, 'image', link); 
//   }catch (err) {
//         console.log(err)
//         alert("Format HTML Gambar salah");
//     }     
// }  
   

// const obj_isianrpp = () =>{
//     quill.update();
//     let setdata = document.querySelectorAll("[data-keyrpp]");
//     let atsetdata ;
//     let obj = {};
//     let arrobj = [];
//     let key = [];
//     let val = [];
//     let mapeldiceklis = [];
//     let type ;
//     let v;
//     let nol=[]
//     for(i = 0 ; i < setdata.length; i++){
//         atsetdata = setdata[i].getAttribute("data-keyrpp");
//         type = setdata[i].hasAttribute("type");
        
//         v = setdata[i].value;
//         if(type){
//             let tp = setdata[i].type
//             if(tp == "checkbox" && atsetdata !== "rpp_semester" && atsetdata !== "rpp_adabatastanggal"){
//                 if(setdata[i].checked){
//                     mapeldiceklis.push(v)
                  
//                 }
//             }else if(tp == "checkbox" && atsetdata == "rpp_adabatastanggal"){
//                 if(setdata[i].checked){
//                     obj[atsetdata]="true"
//                 }else{
//                     obj[atsetdata]="false"
//                 }
//             }else{
//                 obj[atsetdata]=v
//             }


//         }else if(atsetdata == "rpp_tujuanpembelajaran"){
//             let dom = setdata[i].firstChild;//.innerHTML;
//             let ada = dom.childNodes;//.classList;//.contains(".ql-formula");//dom.classList.contains('ql-formula')
             

//             //"https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B%7B2%7D%5D%20%7B3%7D%7D"
//             // obj[atsetdata] =  setdata[i].firstChild.innerHTML;//quill.getText(0 , 10000000);//;quill.getContents();
//             obj[atsetdata] =  setdata[i].innerHTML;//quill.getText(0 , 10000000);//;quill.getContents();
            
//         }else if (atsetdata == "rpp_langkahpembelajaran"){
//             obj[atsetdata] = setdata[i].firstChild.innerHTML;//quill1.getText(0 , 10000000);//quill.getContents();//;
//         }else{
//             obj[atsetdata]=v;
//             // pake Quill js
//             // obj[atsetdata] = atsetdata.innerText;
//         }
       
//         key.push(atsetdata);
//         val.push(v);
//         if(v ==""){
//             nol.push(i)
//         }
//     };
//     obj["mapel_dipilih"] = mapeldiceklis;
//     arrobj.push(obj)
//     let ret = {}
//     ret.objek = arrobj;
//     ret.key = key;
//     ret.val = val;
//     ret.nol = nol;
//     return ret;
// }
// const obj_isianrpp2 = () =>{
//     let setdata = document.querySelectorAll("[data-keyrpp]");
//     let atsetdata ;
//     let key = [];
//     let val = [];
//     let type = [3];
//     let v;
//     let nol=[]
//     for(i = 0 ; i < setdata.length; i++){
//         atsetdata = setdata[i].getAttribute("data-keyrpp");
//         v = setdata[i].value;
//         key.push(atsetdata);
//         val.push(v);
//         if(v ==""){
//             nol.push(i)
//         }
//     };
//     let ret = {}
//     ret.key = key;
//     ret.val = val;
//     ret.nol = nol;
//     return ret;
// }

// const changehtml = (id) =>{
//     //let quil = document.querySelector('#'+id);
//     let quil
//     if(id == "editor1"){
//         console.log("editor1")
//         quil = quill
//     }else{
//         console.log("editor")
//         quil = quill1
//     }
//     let range = quill.getSelection();
//     console.log(range)
//     let teks = quill.getText(range.index, range.length);
//     console.log(teks);

    
//     // var tes = quill.addContainer('ql-custom');    
//     var tes = quill.addContainer('ql-editor');    
//     var p = document.createElement("p")
//     p.innerHTML = teks;
//     tes.appendChild(p);
//     // let delta = quill.clipboard.convert(teks)
//     // quill.setContents(delta, 'silent')
//     // quill.enable(false)
//     // var pitem2 = document.querySelector('.ql-editor p:last-child');
//     // var pitem = document.querySelector('.ql-editor p:last-child');
//     // var i = pitem.length
//     // var neitem = document.createElement("div")
//     // neitem.innerHTML = teks;
//     // pitem.parentNode.replaceChild(neitem, pitem);
//     // ;;//[0].firstChild.appendChild(teks);
//     // quill.enable(true)
    
//     // document.getElementsByClassName('ql-editor')[0].innerHTML += teks  
//     // document.getElementsByClassName('ql-editor')[0].parentNode.insertBefore(teks);
//     // var tesnode = document.getElementsByClassName('ql-editor');//[0].childNodes.appendChild(teks);
//     // console.log(tesnode.childNodes)
    
   
// //     quill.updateContents(new Delta()
// //   .retain(range.index)                  // Keep 'Hello '
// //   .delete(0)                  // 'World' is deleted
// //   .insert(teks)
// //   .retain(1, { bold: true })  // Apply bold to exclamation mark

// // );

//     //quill.clipboard.dangerouslyPasteHTML(teks);
// }

const boolean_gmp = () =>{
    let bol = false;
    if(window.location.href.indexOf("gmp.html")>-1){
        bol = true
    }
    return bol
}


let halaman_dbrpp = 1; // Halaman ini (current_page)
let perhalaman_dbrpp = 1; // halaman yang tampil di layout (records_per_page)
let arrayObjek_dbrpp; //arrayObjek yang akan diolah;
let pagerpp_awal = document.querySelector(".pagerpp_awal");
let pagerpp_sebelum = document.querySelector(".pagerpp_sebelum");
let span_pagerpp_halaman = document.querySelector(".pagerpp_halaman");
let pagerpp_selanjutnya = document.querySelector(".pagerpp_selanjutnya");
let pagerpp_akhir = document.querySelector(".pagerpp_akhir");
let area_dbrpp = document.querySelector(".printarea_rpp");
let obdBRpp_dbrpp;
let cekliktematiknontematik = document.getElementById("rpp_tematiknontematik");
let ceklik_dilampirin = document.querySelector(".lampiran_rpptematiknontematik");
let pagination_rpp = document.querySelector(".pagination_rpp");

async function tabA(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("isiadm");//("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btnadm");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-green", "");
    }
    // document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-green";
    if(evt.currentTarget.innerHTML == "Database RPP"){
        //console.log("Anda fokus ke TAB Database RPP");
        if(!localStorage.hasOwnProperty("jadwaltematik_1")){
            alert("Anda sebaiknya melihat Jadwal Pembelajaran Tentatif di menu tab Kalender pendidikan terlebih dahulu untuk menggenerate pelaksanaan RPP database RPP. Cek tiap semester!");
            area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Belum Siap menampilkan Database RPP karena tidak ada data lokal Jadwal Pembelajaran Tentif di semester 1</h3>`;
            if(pagination_rpp.className.indexOf("w3-hide")==-1){
                pagination_rpp.classList.add("w3-hide")
            }
            return
        }
        if(!localStorage.hasOwnProperty("jadwaltematik_2")){
            alert("Anda sebaiknya melihat Jadwal Pembelajaran Tentatif di menu tab Kalender pendidikan terlebih dahulu untuk menggenerate pelaksanaan RPP database RPP. Cek tiap semester!");
            area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Belum Siap menampilkan Database RPP karena tidak ada data lokal Jadwal Pembelajaran Tentif di semester 1</h3>`;
            if(pagination_rpp.className.indexOf("w3-hide")==-1){
                pagination_rpp.classList.add("w3-hide")
            }
            return
        }
        if(tagrppserver == undefined || tagrppserver.length == 0){
            area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Tidak ada database RPP di jenjang kelas ini</h3>`;
            if(pagination_rpp.className.indexOf("w3-hide")==-1){
                pagination_rpp.classList.add("w3-hide")
            }
        }else{
            let cekdulu 
            if(cekliktematiknontematik.checked){ /// tematik
                //tematik;
                area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Tidak ada database RPP Tematik di jenjang kelas ini</h3>`;
                cekdulu = tagrppserver.filter(s=> s.tematik_nontematik == "tematik")
                if(cekdulu.length == 0){
                    if(pagination_rpp.className.indexOf("w3-hide")==-1){
                        pagination_rpp.classList.add("w3-hide")
                    }
                }else{
                    if(pagination_rpp.className.indexOf("w3-hide")>-1){
                        pagination_rpp.classList.remove("w3-hide")
                    }
                    obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "tematik");
                    dbrpp_ubahHalaman(1);
                }
            }else{
                area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Tidak ada database RPP Nontematik di jenjang kelas ini</h3>`;
                cekdulu = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik")
                if(cekdulu.length == 0){
                    if(pagination_rpp.className.indexOf("w3-hide")==-1){
                        pagination_rpp.classList.add("w3-hide")
                    }
                }else{
                    if(pagination_rpp.className.indexOf("w3-hide")>-1){
                        pagination_rpp.classList.remove("w3-hide")
                    }
                    if(boolean_gmp){
                        obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik" && s.tema_mapel == idgurumapelmapel);
                    }else{
                        obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik");
                    }
                    dbrpp_ubahHalaman(1);
                }

            }
        }
    }
    document.getElementById(cityName).style.display = "block";
}


const dbrpp_ubahHalaman = (paramhalaman)=>{
    /** Alur kerja
     * saat fungsi ini bekerja, tentukan 
     */
    let tekstematiknontematik = cekliktematiknontematik.checked?"TEMATIK":"NONTEMATIK";
    let booleanlampiran = ceklik_dilampirin.checked;
    if(paramhalaman < 1) paramhalaman = 1
    if(paramhalaman>halamantotal_dbrpp()) paramhalaman = halamantotal_dbrpp();
    let html="";
    let html2="";
    let html3 = "";//rubrik
    let html4 = "";//sikap
    for(let i = (paramhalaman-1) * perhalaman_dbrpp; i < (paramhalaman * perhalaman_dbrpp) && i <obdBRpp_dbrpp.length; i++){
        //halamanrpp
        let ds = htmlrpp_dbrpp(i);
        html +=`${ds}`;
        //halaman lampiransikap
        //halaman rubrik
        if(booleanlampiran){
            html2+=`<div style="break-after: page;clear:both"></div><div class="w3-row">`;
            html4+=htmlsikap_dbrpp(i);
            let objekrubrik = Object.fromEntries(Object.entries(obdBRpp_dbrpp[i]).filter(([k,v])=> k.indexOf("rubrik_")>-1 && v !== ""));
            html3 +=`<div style="break-after: page;clear:both"></div><div class="w3-col l2 s2 w3-sand w3-padding"><div class="flag w3-blue">Lampiran Rubrik</div><h6>Rubrik</h6><div style="height:500px"></div></div><div class="w3-col l10 s10 w3-padding"><h4 class="w3-center" style="font-weight: bold;">Daftar Rubrik</h4>`;
            let arrObjekrubrik = Object.keys(objekrubrik);
            for(j = 0 ; j <arrObjekrubrik.length ; j++){
                let ke = arrObjekrubrik[j];
                let t_ke = ke.replace("rubrik","rubriktipe")
                let isidbke = obdBRpp_dbrpp[i][ke];
                html3+=`<div class="w3-border w3-round-large w3-padding w3-margin-bottom">${isidbke}</div>`;
                let jt = obdBRpp_dbrpp[i][t_ke]
                html2 += htmllampiran2_rubrik(jt,j);
            }
            html2 +=`</div>`;
            html3 +=`</div><div class="w3-hide-small w3-clear  w3-border-bottom"><div class="w3-center w3-border-top ">Halaman Pengaturan Rubrik RPP</div></div><div style="break-after: page;clear:both"></div>`;

        }
    }
    area_dbrpp.innerHTML = html;
    area_dbrpp.innerHTML += html3;
    area_dbrpp.innerHTML += html4;
    area_dbrpp.innerHTML += html2;
    span_pagerpp_halaman.innerHTML = "Halaman " + paramhalaman + " dari " + halamantotal_dbrpp();

    if(paramhalaman == 1){
        pagerpp_sebelum.style.display = "none";
        pagerpp_awal.style.display = "none"
    }else{
        pagerpp_sebelum.style.display = "inline-block";
        pagerpp_awal.style.display = "inline-block"
    }
    if(paramhalaman == halamantotal_dbrpp()){
        pagerpp_selanjutnya.style.display = "none";
        pagerpp_akhir.style.display = "none";
    }else{
        pagerpp_selanjutnya.style.display = "inline-block";
        pagerpp_akhir.style.display = "inline-block";
    }
}
const halamantotal_dbrpp = () =>{
    return Math.ceil(obdBRpp_dbrpp.length/perhalaman_dbrpp)
}
pagerpp_selanjutnya.addEventListener("click",()=>{
    if(halaman_dbrpp < halamantotal_dbrpp()){
        halaman_dbrpp++
        dbrpp_ubahHalaman(halaman_dbrpp)
    }
    //console.log("sedang klik btn selanjutnya");
})

pagerpp_sebelum.addEventListener("click",()=>{
    if(halaman_dbrpp > 1){
        halaman_dbrpp--;
        dbrpp_ubahHalaman(halaman_dbrpp)
    }
    //console.log("sedang klik btn sebelumnya");
});
pagerpp_awal.addEventListener("click",()=>{
    halaman_dbrpp = 1;
    dbrpp_ubahHalaman(halaman_dbrpp)
});
pagerpp_akhir.addEventListener("click",()=>{
    let h = halamantotal_dbrpp();
    halaman_dbrpp = h;
    dbrpp_ubahHalaman(halaman_dbrpp);
})
cekliktematiknontematik.addEventListener("change",()=>{
    if(tagrppserver == undefined || tagrppserver.length == 0){
        return
    }

    if(cekliktematiknontematik.checked){
        document.querySelector(".ket_rrptematiknontematik").innerHTML = "Tematik";
        obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "tematik");
    }else{
        document.querySelector(".ket_rrptematiknontematik").innerHTML = "Nontematik";
        if(boolean_gmp){
            obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik" &&  s.tema_mapel == idgurumapelmapel);;
        }else{
            obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik");
        }
    }
    dbrpp_ubahHalaman(halaman_dbrpp)
})
ceklik_dilampirin.addEventListener("change",()=>{
    if(tagrppserver == undefined || tagrppserver.length == 0){
        return
    }
    dbrpp_ubahHalaman(halaman_dbrpp)
})
const htmlrpp_dbrpp = (indek) =>{
    
    let db = obdBRpp_dbrpp[indek];
    //console.log(db)
    let KDJson = DataKDKurtilas["kelas"+idJenjang]; // KD dari JSON
    let kurikulum = gabungdataserverkd();//KD dari Spreadhseet gabungan, termasuk data ceklis
    let TorMP = db.tematik_nontematik; // tematik atau nontematik
    let tema_mapel = db.tema_mapel; // t1_st1_pb1 atau MTK, PJOK, BSUND ....
    let semester = db.semester; // pengganti tagrpp_semester;
    // angka-angka tema!
    let partTema = TorMP=="tematik"?tema_mapel.split("_")[0].match(/(\d+)/)[0]:"";
    let partSubtema = TorMP=="tematik"?tema_mapel.split("_")[1].match(/(\d+)/)[0]:"";
    let partPb = TorMP=="tematik"?tema_mapel.split("_")[2].match(/(\d+)/)[0]:"";
    
    let cektanggalpelaksanaan  = TorMP =="tematik"?JSON.parse(localStorage.getItem("jadwaltematik_"+semester)):db;
    let tglKetemutematik = TorMP=="tematik"?cektanggalpelaksanaan[tema_mapel]:new Date(db.muatan_terpadu);
    let tanggalpelaksanaan = db.muatan_terpadu == ""&& TorMP=="nontematik"?"Belum diisi":Tanggaldenganhari(tglKetemutematik);
    let tanggalTTD = db.muatan_terpadu == ""&& TorMP=="nontematik"?"Belum diisi":tanggalfull(tglKetemutematik);

    
    let JudulKapital = TorMP=="tematik"?"TEMA "+tema_mapel.split("_")[0].match(/(\d+)/)[0]+" SUBTEMA "+tema_mapel.split("_")[1].match(/(\d+)/)[0]+" PEMBELAJARAN "+tema_mapel.split("_")[2].match(/(\d+)/)[0]:convertcodemapelkemapel(tema_mapel);
    let html = "";
    html +=`<div class="w3-row"><div class="w3-col l4 s4 w3-sand w3-center"><div class="w3-blue flag">Identitas RPP</div><h6>Satuan Pendidikan</h6><div>${idNamaSekolah}</div><hr><h6>Kelas/ Semester</h6><div><span>${idNamaKelas}</span>/<span>${db.semester}</span></div><hr>`;
    if(TorMP == "tematik"){
        let k0 = "Tema "+partTema;
        let k1 = "Subtema "+partSubtema;
        let tekk0 = KDJson.filter(s=>s[k0])[0][k0];
        let tekk1 = KDJson.filter(s=>s[k1])[0][k1];
        html+=`<div>Tema ${partTema}<br>${tekk0}</div><hr><div>SubTema ${partSubtema}<br>${tekk1}</div><hr><div>Pembelajaran ${partPb}</div><hr><h6>Muatan Terpadu:</h6>`;
            
        let dataCeklis = kurikulum.filter(s => s.semester.indexOf(semester)>-1 && s[tema_mapel] !=="");
        let objekData_this = dataCeklis.filter(s => s[tema_mapel] !=="").map(m => Object.fromEntries(Object.entries(m).filter(([k,v])=>k == "mapel" || k == "kd" ||  k =="kd4")));
        
        for(i = 0 ; i < objekData_this.length ; i++){
            html += `<div>${convertcodemapelkemapel(objekData_this[i].mapel)} (${objekData_this[i].kd}/${objekData_this[i].kd4})</div>`;
        }
    }else{
        //untuk nontematik
        html+=`<h6>Mata Pelajaran</h6><div>${convertcodemapelkemapel(tema_mapel)}</div><hr><h6>Materi Pokok</h6><div>${db.subtema_materipokok}</div>`;
    }
    html+=`<hr><h6>Alokasi Waktu</h6><div>${db.alokasi_waktu}</div><hr><h6>Pelaksanaan</h6><div>${tanggalpelaksanaan}</div>`;
    html +=`</div>`; //penutup class"w3-col l4 s4 .....""
    html+=`<div class="w3-col l8 s8 w3-padding"><h4 class="w3-center" style="font-weight: bold;">RENCANA PELAKSANAAN PEMBELAJARAN</h4><h5 class="w3-center" style="font-weight: bold;">${JudulKapital}</h5><hr><h5 style="font-weight: bold;">TUJUAN PEMBELAJARAN</h5><div class="w3-justify w3-margin-top">${db.tujuan_pembelajaran==""?"BELUM DIISI":db.tujuan_pembelajaran}</div><hr><h5 style="font-weight: bold;">LANGKAH PEMBELAJARAN</h5><div class="w3-justify w3-margin-top"><div class="w3-pale-green"><span style="font-weight: bold;">Pendahuluan</span><span class="w3-right">${db.aw_awal==""?"...":db.aw_awal} Menit</span><div class="w3-round-large w3-border w3-padding">${db.kegiatan_pendahuluan==""?"TIDAK DIISI":db.kegiatan_pendahuluan}</div></div><div class="w3-pale-blue w3-margin-top"><span style="font-weight: bold;">Kegiatan Inti</span><span class="w3-right">${db.aw_inti==""?"...":db.aw_inti} Menit</span><div class="w3-round-large w3-border w3-padding">${db.kegiatan_inti==""?"TIDAK DIISI":db.kegiatan_inti}</div></div><div class="w3-pale-red w3-margin-top"><span style="font-weight: bold;">Kegiatan Penutup</span><span class="w3-right">${db.aw_penutup==""?"...":db.aw_inti} Menit</span><div class="w3-round-large w3-border w3-padding">${db.kegiatan_penutup==""?"TIDAK DIISI":db.kegiatan_penutup}</div></div></div></div>`;
    html +=`<div class="w3-clear"></div><div class="w3-col l6 s6 m6 w3-center">Mengetahui,<br>Kepala <span>${idNamaSekolah}</span><br><br><br><br><br><u><b>${idNamaKepsek}</b></u><br><span>NIP. ${idNipKepsek}</span></div><div class="w3-col l6 s6 m6 w3-center"><span>Depok</span>, <span>${tanggalTTD}</span><br><span>${idJenisGuru}</span> <span>${idgurumapelmapel}</span><br><br><br><br><br><u><b>${namauser}</b></u><br><span>${idNipGuruKelas == ""?"-":"NIP. "+idNipGuruKelas}</span></div><div class="w3-hide-small w3-clear w3-border-bottom"><div class="w3-center  w3-border-top">Halaman Utama RPP (Halaman 1)</div></div>`;
    html +=`</div>`; // penutup class"w3-row"
    return html
}
const htmlsikap_dbrpp = (indek) =>{
    let db = obdBRpp_dbrpp[indek];
    let TorMP = db.tematik_nontematik; // tematik atau nontematik
    let tema_mapel = db.tema_mapel; // t1_st1_pb1 atau MTK, PJOK, BSUND ....
    let semester = db.semester;
    let cektanggalpelaksanaan  = TorMP =="tematik"?JSON.parse(localStorage.getItem("jadwaltematik_"+semester)):db;
    let tglKetemutematik = TorMP=="tematik"?cektanggalpelaksanaan[tema_mapel]:new Date(db.muatan_terpadu);
    let tanggalTTD = db.muatan_terpadu == ""&& TorMP=="nontematik"?"Belum diisi":tanggalfull(tglKetemutematik);
    let judul = TorMP=="tematik"?"TEMA "+tema_mapel.split("_")[0].match(/(\d+)/)[0]+" SUBTEMA "+tema_mapel.split("_")[1].match(/(\d+)/)[0]+" PEMBELAJARAN "+tema_mapel.split("_")[2].match(/(\d+)/)[0]:convertcodemapelkemapel(tema_mapel);
    
    let html =`<div style="break-after:page;clear:both;"></div><div class="w3-col l2 s3 w3-sandw3-padding"><div class="flag w3-blue">Lampiran 2</div><h6>Penilaian Sikap</h6><div class="kriteriasikap_rpptematiknontematik">Kriteria:<br>K = Kurang (1)<br>B = Baik (2)<br>C = Cukup (3)<br>SB = sangat Baik (4)</div><div style="height:500px"></div></div><div class="w3-col l10 s9 w3-padding"><h4 class="w3-center"  style="font-weight: bold;">Penilaian Sikap</h4><h5 class="w3-center">${judul}</h5><div style="overflow-x: auto;"><table class="w3-table garis w3-tiny"><thead><tr class="w3-light-gray"><th rowspan="3" valign="center" class="w3-center">No</th><th rowspan="3" valign="center" class="w3-center">Nama Siswa</th><th colspan="12" class="w3-center">Perubahan Tingkah Laku</th></tr><tr class="w3-light-gray"><th colspan="4" class="w3-center">Teliti</th><th colspan="4" class="w3-center">Cermat</th><th colspan="4" class="w3-center">Percaya Diri</th></tr><tr class="w3-light-gray"><th>SB</th><th>B</th><th>C</th><th>K</th><th>SB</th><th>B</th><th>C</th><th>K</th><th>SB</th><th>B</th><th>C</th><th>K</th></tr></thead><tbody>`;
    for(i=0 ; i < jsondatasiswa.length ; i++){
        html +=`<tr><td>${(i+1)}</td><td>${jsondatasiswa[i].pd_nama}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
    }
    html +=`</tbody></table></div></div><div class="w3-col l6 s6 m6 w3-center" style="visibility: hidden;">Mengetahui,</div><div class="w3-col l6 s6 m6 w3-center"><span>Depok</span>, <span>${tanggalTTD}</span><br><span>${idJenisGuru}</span> <span>${idgurumapelmapel}</span><br><br><br><br><br><u><b>${namauser}</b></u><br><span>${idNipGuruKelas == ""?"-":"NIP. "+idNipGuruKelas}</span></div><div class="w3-hide-small w3-clear w3-border-bottom"><div class="w3-center  w3-border-top">Halaman Lampiran Daftar Nilai Sikap </div></div>`;
    return html
}

const htmllampiran2_rubrik = (rubrikkode,indekrubrik) =>{
    
    let html = `<div class="w3-col l2 s2 w3-sand w3-padding"><div class="flag w3-blue">Lampiran ${(indekrubrik+3)}</div><h6>Daftar Nilai Rubrik ke-${(indekrubrik+1)}</h6><div class="w3-border w3-round-large w3-margin-bottom w3-tiny w3-padding">Kriteria rubrik ada di Lampiran Rubrik RPP ini</div></div><div class="w3-col l10 s10 w3-padding"><h4 class="w3-center">Daftar Nilai Rubrik ke-${(indekrubrik+1)}</h4><div style="overflow-x:auto">`;

    let dbsiswa = jsondatasiswa.map(m => m.pd_nama)
    if(rubrikkode == "tipe1"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="4" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th>Sangat Baik (4)</th><th>Baik (3)</th><th>Cukup(2)</th><th>Perlu Bimbingan(1)</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }else if(rubrikkode == "tipe2"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="3" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th>Baik</th><th>Cukup</th><th>Kurang</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;

    }else if(rubrikkode == "tipe3"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="4" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th>4</th><th>3</th><th>2</th><th>1</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }else if(rubrikkode == "tipe4"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="2" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th valign="center" class="w3-center">Ada <br>(Tampak)<br>(Muncul)</th><th valign="center" class="w3-center">Tidak Ada <br>(Tidak Tampak)<br>(Tidak Muncul)</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }else if(rubrikkode == "tipe5"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="2" class="w3-center">Kriteria Rubrik (isian angka)</th></tr><tr class="w3-light-gray"><th valign="center" class="w3-center">Aspek Pengetahuan</th><th valign="center" class="w3-center">Aspek Keterampilan</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }

    html +=`</div></div><div class="w3-col l6 s6 m6 w3-center" style="visibility: hidden;">Mengetahui</div><div class="w3-col l6 s6 m6 w3-center"><span class="dsgnrpp_kota">Depok</span>, <span class="dsgnrpp_tgl">RUBAH GA?</span><br><span class="jenisguru">Guru Kelas</span> <span class="dsgnrpp_kelasini">6A</span><br><br><br><br><br><u><b class="dsgnrpp_namaguru">Ade Andriansyah</b></u><br>NIP. <span class="dsgnrpp_nipguru">19870710 201403 1 002</span></div><div class="w3-hide-small w3-clear  w3-border-bottom"><div class="w3-center w3-border-top ">Lampiran Daftar Nilai Rubrik</div></div>`;
    return html
}


