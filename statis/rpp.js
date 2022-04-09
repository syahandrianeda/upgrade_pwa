
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

const trialScanLJK = (param) =>{
    //(z_idhtmlmateri)
    
    let params = param.split("_");
    let par = params[1]; //indek materi kbm
    parameterbantuisiljk = par;
    let idsw = params[0]; //indek id siswa

    //alert (par);
    let siswabantu = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw];
    let tk_siswa = siswabantu.id


    loadingljk.style.display = "block";

    //bikin judul h4
    let datamateri = kronologijson;
    kodebarismateriyangdikerjakan = datamateri[par].idbaris;
    
    console.log(datamateri);

    let versi = datamateri[par].versi;
    let adapg = (datamateri[par].jumlahpg == 0) ? false : true;

    let jumlahsoal = (datamateri[par].jumlahpg * 1) + (datamateri[par].jumlahessay * 1);

    //console.log(datamateri)
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "TRIAL SCANNER LJK E-DURASA";

    let tes = document.getElementById("infoloadingljk");
    // tes.innerHTML = `<i class="fa fa-spin fa-refresh w3-xxxlarge"></i> On Process ...`
    tes.innerHTML = "";
    tes.appendChild(judul);
    tes.innerHTML +="Disini akan muncul Canvas"
    let cv = document.createElement("canvas");
    cv.setAttribute("style","width:355px;height:630px");
    cv.setAttribute("id","canvasScannerLJK")
    tes.appendChild(cv);
    //tambahkan tombol
    let inputImg =document.createElement("input")
    inputImg.setAttribute("type","file");
    inputImg.setAttribute("id","inputCanvasfile");
    inputImg.setAttribute("onchange","fn_inputCanvasFile()");
    tes.appendChild(inputImg)

    //-- Bikin Tabel identitas:
   




    $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {
         console.log(json)
        // document.getElementById("loadi").remove();
        let teks = (versi == "baru"?brkline(json).teks : brkline2(json).teks); 
        let kkc, kc;
        if (adapg) {
            kc = brkline(json).kunci;
            kkc = window.atob(kc).split(",").join("<br>");


        } else {
            kc = 0;
            kkc ="blank"
        }
        //document.querySelector("#infoloadingljk").innerHTML += teks;//brkline(json).teks;
        document.querySelector("#infoloadingljk").innerHTML += "<hr>";//brkline(json).teks;
        document.querySelector("#infoloadingljk").innerHTML += kkc;//brkline(json).teks;
        document.querySelector("#infoloadingljk").innerHTML += JSON.stringify(brkline(json).kd);//brkline(json).teks;


    })

}
const fn_inputCanvasFile = () =>{
    let elemenInput = document.getElementById("inputCanvasfile");
    var reader = new FileReader();
    let item = elemenInput.files[0]

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
            var elem = document.getElementById("canvasScannerLJK")

            //scale the image to 600 (width) and keep aspect ratio
            // var scaleFactor = resize_width / el.target.width;
            // elem.width = resize_width;
            // elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0);

            //get the base64-encoded Data URI from the resize image
            // var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            var srcEncoded = ctx.canvas.toDataURL(el.target, mmtpe, 0);





        }

    }


}
let strimingljk = ""
const tutupmodalljk = ()=>{
    let modalL = document.getElementById("modal_scannerLJK");
    modalL.style.display = "none";
    // nantinya akan ada fungsi untuk menghentinkan proses kamera.
    if (strimingljk == "") {
        alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    strimingljk.getTracks().forEach(k => k.stop());
}
const posisikamera = document.getElementById("tampilankameraLJK");
const posisiScreenshot  = document.getElementById("tampilanScreenshotLJK");
const btn_tapscanpertama = document.getElementById("tapscan_pertama");
const btn_tapscankedua = document.getElementById("tapscan_kedua");
const btn_tapscanfinish = document.getElementById("tapscan_finish");
const tabel_patokankameraPG = document.querySelector(".source_tabelkamera");
const bukaKameraScanner = () =>{
    let modalL = document.getElementById("modal_scannerLJK");
    modalL.style.display = "block";
    let tabelresult = document.querySelector(".tabeldeteksiwarna1");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
        for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
            let rRow = tblR_body.rows[i];
            for(j = 1 ; j < rRow.cells.length ; j++){
                let kl = rRow.cells[j];
                if(kl.hasAttribute("style")){
                    kl.removeAttribute("style")
                }
            }
        }
   
    let tabelresult2 = document.querySelector(".tabeldeteksiwarna2");
        let tblR_body2 = tabelresult2.getElementsByTagName("tbody")[0];
            for(i = 0 ; i <tblR_body2.rows.length && i < 20 ; i++){
                let rRow2 = tblR_body2.rows[i];
                for(j = 1 ; j < rRow2.cells.length ; j++){
                    let kl2 = rRow2.cells[j];
                    if(kl2.hasAttribute("style")){
                        kl2.removeAttribute("style")
                    }
                }
            }
    
    // document.querySelector(".patokan_PG").classList.remove("w3-hide");
    
    btn_tapscanpertama.innerHTML = "Ambil Gambar Part 1";
    btn_tapscanpertama.setAttribute("onclick","ambilscreenshotljk(1)");
    btn_tapscankedua.innerHTML = "Ambil Gambar Part 2";
    btn_tapscankedua.setAttribute("onclick","ambilscreenshotljk(2)");
    // document.querySelector(".patokan_tabelPG").style.width="90%";
    // nouruttabelpatokanPG(1);
    // saat klik:
    start_kameraLJK(1)
}
let mediaRecorderR;
const start_kameraLJK = (part) =>{
    document.querySelector(".patokan_tabelPG").style.width="90%";
    nouruttabelpatokanPG(part);
    let patokan = document.querySelector(".patokan_PG");
    let elemenvideo = document.querySelectorAll(".canvas_ljk");
    
    elemenvideo.forEach(el =>{
        if(el.className.indexOf("w3-hide")==-1){
            el.classList.add("w3-hide")
        }
    });
    posisikamera.classList.remove("w3-hide");
    let lTop = posisikamera.offsetTop;
    let lLeft = posisikamera.offsetLeft;
    
    
    patokan.style.top =  lTop + "px";
    patokan.style.left =  lLeft +"px";
    
    let constraintObj = {};
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    
    constraintObj = {
        audio: false,
        video: {
            facingMode: "environment",
            width: { min: 978, max: 978 },
            height: { min: 550, max: 550}
        }
    };
    }else{
        constraintObj = {
            audio: false,
            video: {
                facingMode: "environment",
                width:350,
                height:622
            }
        };
    }
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
            let video = document.getElementById("tampilankameraLJK");
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

            strimingljk = mediaStreamObj;
            //add listeners for saving video/audio

            mediaRecorderR = new MediaRecorder(mediaStreamObj);
            let chunks = [];
            video.play();
           
            mediaRecorderR.ondataavailable = function (ev) {

                chunks.push(ev.data);
            }
            
            //ambilscreenshotljk(part)
        })
        .catch(function (err) {
            //console.log(err.name, err.message);
            alert(err.name + "\n" + err.message);
        });
        
        if(part == 1){
            btn_tapscanpertama.innerHTML = "Ambil Gambar Part 1";
            btn_tapscanpertama.setAttribute("onclick",`ambilscreenshotljk(1)`);
    
        }else{
            btn_tapscankedua.innerHTML = "Ambil Gambar Part 2";
            btn_tapscankedua.setAttribute("onclick",`ambilscreenshotljk(2)`);
        }

}
const ambilscreenshotljk = (part)=>{
    let kameranyaaktif = strimingljk.active;
    
    if(!kameranyaaktif){
        start_kameraLJK(part);
        return
    }
    posisiScreenshot.getContext('2d').drawImage(posisikamera, 0, 0,posisiScreenshot.width, posisiScreenshot.height);
    // posisiScreenshot.getContext('2d').drawImage(posisikamera, 0, 0,350, 550);
    
    
    document.querySelector(".patokan_tabelPG").style.width="100%"
    
    let elemenvideo = document.querySelectorAll(".canvas_ljk");
    
    elemenvideo.forEach(el =>{
        if(el.className.indexOf("w3-hide")==-1){
            el.classList.add("w3-hide")
        }
    });
    // document.querySelector(".patokan_PG").classList.add("w3-hide");
    posisiScreenshot.classList.remove("w3-hide");
    if (strimingljk == "") {
        alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    
    strimingljk.getTracks().forEach(k => k.stop());
    // setTimeout(()=>{
        
    // },1000)
    cekPosisiLJSiswa(part);
}
const cekPosisiLJSiswa = (part)=>{
    let tabelsource = document.querySelector(".source_tabelkamera");
    let ts_body = tabelsource.getElementsByTagName("tbody")[0];
    
    let tabelresult = part == 1? document.querySelector(".tabeldeteksiwarna1"): document.querySelector(".tabeldeteksiwarna2");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
    
    // hapus dulu canvasnya
    // let canvashapus = document.getElementById("tampilanScreenshotLJK");
    // let ctxh = canvashapus.getContext('2d');
    //     ctxh.clearRect(0, 0, canvashapus.width, canvashapus.height);

    for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
        let rRow = tblR_body.rows[i];
        
        for(j = 1 ; j < rRow.cells.length ; j++){
            //dimulai dari j = 1 sebab kita menghindari kolom pertama yang berindeks 0;
            let el_td = ts_body.rows[i].cells[j]
            let w_eltd = (el_td.offsetWidth/2);
            
            let corX = (el_td.offsetLeft + w_eltd-3);
            let corY = (el_td.offsetTop + 5);
            let x_baru = ((corX/2)+1.796)*1.696;//1.69;
            let y_baru =  ((corY/4)+0.9)*1.09;
            
            let hex = warnahex(x_baru,y_baru);
            if(hex.r < 100 && hex.g < 100 & hex.b < 100){
                let coloR = warnaScrenshot(x_baru,y_baru);
                rRow.cells[j].setAttribute("style","background-color:"+coloR);
                // rRow.cells[j].innerHTML = "r:"+hex.r +", g:"+hex.g+", b:"+hex.b;
                let ccanvas = document.querySelector(".patokan_PG");//
                let tanda = document.createElement("span");
                tanda.setAttribute("style","position:absolute;top:"+corY+"px;left:"+corX+"px;width:15px;height:15px;background-color:green;z-index:9");
                tanda.innerHTML="&nbsp;";                
                ccanvas.appendChild(tanda);

                var canvas = document.getElementById("tampilanScreenshotLJK");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "rgb(255, 0, 0)";//"rgb(6, 14, 246)";//+(w_eltd-3)
                ctx.fillRect(x_baru,y_baru, 9, 3);
            }
            
        }
    }
    if(part == 1){
        btn_tapscanpertama.innerHTML = "Ulangi Ambil Gambar Part 1";
        btn_tapscanpertama.setAttribute("onclick","start_kameraLJK(1)");

    }else{
        btn_tapscankedua.innerHTML = "Ulangi Ambil Gambar Part 2";
        btn_tapscankedua.setAttribute("onclick","start_kameraLJK(2)");
    }
    
    

    
}
const cekPosisiKunci = (part)=>{
    let tabelsource = document.querySelector(".source_tabelkamera");
    let ts_body = tabelsource.getElementsByTagName("tbody")[0];
    // Tes Kunci jawabannya:
    let kuncijawaban = ["1B","2A","3D","4C","5D","6A","7D","8A","9A","10B","11A","12C","13D","14A","15C","16C","17B","18D","19B","20D","21A","22B","23C","24D","25A"];
    // console.log(JSON.stringify(kuncijawaban));
    let tabelresult = document.querySelector(".tabeldeteksiwarna");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
    // pertama, warnai tabelresult berdasarkan kunci dengan warna class!
    for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
        let rRow = tblR_body.rows[i];
        let angkaKuncijawaban = kuncijawaban[i].match(/(\d+)/)[0];
        let HurufKuncijawaban = kuncijawaban[i].match(/[ABCD]/)[0];
        //console.log(angkaKuncijawaban+"="+HurufKuncijawaban)
        
        for(j = 1 ; j < rRow.cells.length ; j++){
            //dimulai dari j = 1 sebab kita menghindari kolom pertama yang berindeks 0;
            let kolomHuruf = ekstactKuncijawaban(HurufKuncijawaban);
            if(kolomHuruf == j){
                // kita cek posisi kunci di titik ini di tabel sumber (tabelsource);
                let el_td = ts_body.rows[i].cells[j]
                //console.log(el_td.innerHTML);
                let w_eltd = (el_td.offsetWidth/2);
                let l_eltd = (tabelsource.offsetLeft + el_td.offsetLeft + w_eltd-5);//dikurangi 5 sebab hurufnya berukuran 10px, setengahnya
                let t_eltd = (tabelsource.offsetTop + el_td.offsetTop + 5);//ditambah 5, sebab paddingnya 4px, jadi tambahkan 1 pixel
               // console.log("left=" + tabelsource.offsetLeft +", top="+tabelsource.offsetTop);
               console.log(kuncijawaban[i])
                console.log("left=" + l_eltd +", top="+t_eltd);
                // let tanda = document.createElement("span");
                // tanda.setAttribute("style","position:absolute;top:"+t_eltd+"px;left:"+l_eltd+"px;width:15px;background-color:red");
                // tanda.innerHTML="&nbsp;";
                // //el_td.appendChild(tanda);
                let ccanvas = document.querySelector(".patokan_PG");//
                
                let xCanvas = document.getElementById("tampilanScreenshotLJK").offsetLeft;
                let yCanvas = document.getElementById("tampilanScreenshotLJK").offsetTop;
                
                var canvast = document.getElementById("tampilanScreenshotLJK");
                
                let corX = (el_td.offsetLeft + w_eltd-3);
                let corY = (el_td.offsetTop + 5);

                let x_baru = ((corX/2)+1.796)*1.696;//1.69;
                let y_baru =  ((corY/4)+0.9)*1.09;
                    
                console.log("left=" + corX+", top="+corY);
                let coloR = warnaScrenshot(x_baru,y_baru);
                let hex = warnahex(x_baru,y_baru);
                console.log(coloR);
                rRow.cells[j].setAttribute("style","background-color:"+coloR);
                rRow.cells[j].innerHTML = "r:"+hex.r +", g:"+hex.g+", b:"+hex.b;
                let tanda = document.createElement("span");
                // tanda.setAttribute("style","position:absolute;top:"+t_eltd+"px;left:"+l_eltd+"px;width:15px;height:15px;background-color:blue;z-index:9");
                tanda.setAttribute("style","position:absolute;top:"+corY+"px;left:"+corX+"px;width:15px;height:15px;background-color:green;z-index:9");
                tanda.innerHTML="&nbsp;";                
                ccanvas.appendChild(tanda);

                var canvas = document.getElementById("tampilanScreenshotLJK");
                var ctx = canvas.getContext("2d");
                let w_ctx = ctx.canvas.width;
                let h_ctx = ctx.canvas.height;
                
                let x_lama = ((corX/2)+2)*1.675;
                let y_lama = ((corY/4)+0.8)*1.12;

                
                
                console.log("lebar canvas="+w_ctx +", tinggi canvas="+ h_ctx);
                console.log("posisiX="+x_lama+", posisiY="+ y_lama);
                console.log("NposisiX="+x_baru+", NposisiY="+ y_baru);
                ctx.fillStyle = "rgb(255, 0, 0)";//"rgb(6, 14, 246)";//+(w_eltd-3)
                ctx.fillRect(x_baru,y_baru, 9, 3);
                
                // let cctx = canvas.getContext("2d");
                // cctx.fillStyle = "rgb(255, 0, 0)";//+(w_eltd-3)
                // cctx.fillRect(x_lama,y_lama, 15, 5);
                // ctx.fillRect(((corX/2)+2)*1.675, ((corY/4)+0.8)*1.12, 15, 5);
                
                // rRow.cells[j].setAttribute("style","background-color:"+coloR);

            }
        }
    }
    
    
    

    
}
const ekstactKuncijawaban = (teks)=>{
    let ret = 0;
    switch(teks){
        case "A":
            ret = 1
        break;
        case "B":
            ret = 2
        break;
        case "C":
            ret = 3
        break;
        case "D":
            ret = 4
        break;

    }
    return ret
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

const warnaScrenshot = (x,y) =>{
    var canvas = document.getElementById("tampilanScreenshotLJK");
    var coord = "x=" + x + ", y=" + y;
    var context = canvas.getContext('2d');
    var pixelData = context.getImageData(x, y, 1, 1).data; 
    //console.log("left=" + x +", top="+y);
    // context.putImageData(pixelData, x, y);
    // console.log(pixelData);

    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
 				coord += " (Transparent color detected, cannot be converted to HEX)";
    }
    var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    
   // document.getElementById("status").innerHTML = coord;
    //document.getElementById("color").style.backgroundColor = hex;
    // Draw the color and coordinates.
    // document.getElementById("status").innerHTML = coord;
    // document.getElementById("color").style.backgroundColor = hex;
    return hex
}
const warnahex = (x,y) =>{
    var canvas = document.getElementById("tampilanScreenshotLJK");
    var coord = "x=" + x + ", y=" + y;
    var context = canvas.getContext('2d');
    var pixelData = context.getImageData(x, y, 1, 1).data; 
    //console.log("left=" + x +", top="+y);
    // context.putImageData(pixelData, x, y);
    // console.log(pixelData);

    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
 				coord += " (Transparent color detected, cannot be converted to HEX)";
    }
    var hex = {"r":pixelData[0],"g": pixelData[1], "b":pixelData[2]};
    
   // document.getElementById("status").innerHTML = coord;
    //document.getElementById("color").style.backgroundColor = hex;
    // Draw the color and coordinates.
    // document.getElementById("status").innerHTML = coord;
    // document.getElementById("color").style.backgroundColor = hex;
    return hex
}

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}

const selesaiambilscreenshot = ()=>{
}
const nouruttabelpatokanPG = (part) =>{
    let start = part == 1? 1 : 21 ;
    let tbody = tabel_patokankameraPG.getElementsByTagName("tbody")[0];
    let R = tbody.rows;
    for(r=0;r<R.length ; r++){
        let col = R[r].cells;
        col[0].innerHTML= (start+r);
        
    }
    let ccanvas = document.querySelectorAll(".patokan_PG > span");
    ccanvas.forEach(el => el.remove())
    //bersihkan atribute style
    let tabelresult = part == 1? document.querySelector(".tabeldeteksiwarna1"): document.querySelector(".tabeldeteksiwarna2");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
    for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
        let rRow = tblR_body.rows[i];
        for(j = 1 ; j < rRow.cells.length ; j++){
            let kl = rRow.cells[j];
            if(kl.hasAttribute("style")){
                kl.removeAttribute("style")
            }
        }
    }


}