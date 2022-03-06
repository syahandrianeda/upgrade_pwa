

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
const admguru = ()=>{
    tampilinsublamangurukelas("administrasiguru");
    document.querySelector(".tabrpp").click();
}
const previewrpp = () =>{
    document.getElementById("prev_rpp").style.display = "block";
    let dataisian = obj_isianrpp();
    let datarpp =dataisian.objek[0];
    //console.log(datarpp)
    document.querySelector("#prt_mapel").innerHTML = datarpp.rpp_jenistematik + ": "+ JSON.stringify(datarpp.mapel_dipilih).replace(/["']/g, " ") ;

    document.querySelector("#prt_kelas").innerHTML = idNamaKelas + " / "+ datarpp.rpp_semester;
    document.querySelector("#prt_judul").innerHTML = datarpp.rpp_judul;
    document.querySelector("#prt_tema").innerHTML = datarpp.rpp_tema;
    document.querySelector("#prt_tgl").innerHTML = (datarpp.rpp_adabatastanggal == "true" ? tanggalfull(datarpp.rpp_tglawal) +" s/d " + tanggalfull(datarpp.rpp_tglakhir): tanggalfull(datarpp.rpp_tglawal));
    document.querySelector("#prt_tujuanpembelajaran").innerHTML = datarpp.rpp_tujuanpembelajaran;// (datarpp.rpp_tujuanpembelajaran).search('ql-formula') == -1? datarpp.rpp_tujuanpembelajaran : (datarpp.rpp_tujuanpembelajaran).replace(/([\n])/g, '<br/>') ;;;
    //datarpp.rpp_tujuanpembelajaran;//(datarpp.rpp_tujuanpembelajaran).replace(/[\n]/g, "<br>") ; 
    document.querySelector("#prt_langkahpembelajaran").innerHTML = datarpp.rpp_langkahpembelajaran;// (datarpp.rpp_langkahpembelajaran).replace(/([\n])/g, '<br/>'); ; 
    document.querySelector("#prt_penilaian").innerHTML = datarpp.rpp_penilaian; 
    

}

var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block','formula'],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      ['link', 'image','video'],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
    
      ['clean']                                         // remove formatting button
];

    const options = {};
  
  var opsimath = document.querySelector("#optionmath")
    options["operators"] = JSON.parse(opsimath.getAttribute("data-value"));
var quill = new Quill('#editor', {
        modules: {
        toolbar: {
                container: toolbarOptions,
                handlers: { "image": quill_img_handler },
        },
        imageResize: {
                displaySize: true
            },
        formula: true,
        },
        theme: 'snow'
      });
var quill1 = new Quill('#editor1', {
    modules: {
        toolbar: {
                container: toolbarOptions,
                handlers: { "image": quill_img_handler1 },
        },
        imageResize: {
                displaySize: true
            },
        formula: true,
        },
        theme: 'snow'
    });
    const enableMathQuillFormulaAuthoring = window.mathquill4quill();      
    enableMathQuillFormulaAuthoring(quill, options);
    enableMathQuillFormulaAuthoring(quill1, options);


function quill_img_handler() {
    let fileInput = this.container.querySelector('input.ql-image[type=file]');
    console.log(this);
if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            const range = this.quill.getSelection(true);
            
            if (!files || !files.length) {
            //          console.log('No files selected');
            return;
            }
                let ketval = document.formuploadmateri.idmapel.value
                let val = (ketval == "") ? "e-lamaso" : ketval;
                let reader = new FileReader();
                var item = files[0];
                let url ="";
                this.quill.enable(false);
        loadingtopbarin("loadingtopbar");
        reader.readAsDataURL(item);
        reader.onload = async function (e) {

            let bs64 = e.target.result.replace(/^.*,/, '');
            let mmtpe = e.target.result.match(/^.*(?=;)/)[0];
            let namafile = "edurasa_" + new Date().getTime()
            let frmdata = new FormData();
                frmdata.append("gmbrdata", bs64);
                frmdata.append("gmbrfilename", namafile);
                frmdata.append("gmbrmimeType", mmtpe);
                frmdata.append("keterangan", val);

        await fetch(linkmateri + "&action=uplgmbrmateri", {
                    method: 'post',
                    body: frmdata
            })
            .then(m => m.json())
            .then(k => {
                let link = k.url
                url = "https://drive.google.com/uc?export=view&id=" + link;
                //matikan animasi
                clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";

                }, 3000);

                quill.enable(true);
                quill.insertEmbed(range.index, 'image', url);
                quill.setSelection(range.index + 1, Quill.sources.SILENT);
            })
            .catch(er => {
            console.log(er);
                quill.enable(true);
            })

        }

    });
          this.container.appendChild(fileInput);
}
fileInput.click();
}   
function quill_img_handler1() {
    let fileInput = this.container.querySelector('input.ql-image[type=file]');
    console.log(this);
if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            const range = quill1.getSelection(true);
            
            if (!files || !files.length) {
            //          console.log('No files selected');
            return;
            }
                let ketval = document.formuploadmateri.idmapel.value
                let val = (ketval == "") ? "e-lamaso" : ketval;
                let reader = new FileReader();
                var item = files[0];
                let url ="";
                quill1.enable(false);
        loadingtopbarin("loadingtopbar");
        reader.readAsDataURL(item);
        reader.onload = async function (e) {

            let bs64 = e.target.result.replace(/^.*,/, '');
            let mmtpe = e.target.result.match(/^.*(?=;)/)[0];
            let namafile = "edurasa_" + new Date().getTime()
            let frmdata = new FormData();
                frmdata.append("gmbrdata", bs64);
                frmdata.append("gmbrfilename", namafile);
                frmdata.append("gmbrmimeType", mmtpe);
                frmdata.append("keterangan", val);

        await fetch(linkmateri + "&action=uplgmbrmateri", {
                    method: 'post',
                    body: frmdata
            })
            .then(m => m.json())
            .then(k => {
                let link = k.url
                url = "https://drive.google.com/uc?export=view&id=" + link;
                //matikan animasi
                clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";

                }, 3000);

                quill1.enable(true);
                quill1.insertEmbed(range.index, 'image', url);
                quill1.setSelection(range.index + 1, Quill.sources.SILENT);
            })
            .catch(er => {
            console.log(er);
                quill1.enable(true);
            })

        }

    });
          this.container.appendChild(fileInput);
}
fileInput.click();
}   

function uye(){
    let fileInput = this.container.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', () => {
        if (fileInput.files != null && fileInput.files[0] != null) {
          let reader = new FileReader();
          reader.onload = (e) => {
            let range = this.quill.getSelection(true);
            this.quill.updateContents(new Delta()
              .retain(range.index)
              .delete(range.length)
              .insert({ image: e.target.result })
            , Emitter.sources.USER);
            fileInput.value = "";
          }
          reader.readAsDataURL(fileInput.files[0]);
        }
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  }
  
function imageHandler() {
  try{
    const range = quill.getSelection();
    const teks = quill.getText(range.index, range.length);
    const sources = teks.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
    const link = sources[0];
    quill.deleteText(range.index, range.length+1);
    quill.insertEmbed(range.index, 'image', link); 
  }catch (err) {
        console.log(err)
        alert("Format HTML Gambar salah");
    }     
}  
   

const obj_isianrpp = () =>{
    quill.update();
    let setdata = document.querySelectorAll("[data-keyrpp]");
    let atsetdata ;
    let obj = {};
    let arrobj = [];
    let key = [];
    let val = [];
    let mapeldiceklis = [];
    let type ;
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-keyrpp");
        type = setdata[i].hasAttribute("type");
        
        v = setdata[i].value;
        if(type){
            let tp = setdata[i].type
            if(tp == "checkbox" && atsetdata !== "rpp_semester" && atsetdata !== "rpp_adabatastanggal"){
                if(setdata[i].checked){
                    mapeldiceklis.push(v)
                  
                }
            }else if(tp == "checkbox" && atsetdata == "rpp_adabatastanggal"){
                if(setdata[i].checked){
                    obj[atsetdata]="true"
                }else{
                    obj[atsetdata]="false"
                }
            }else{
                obj[atsetdata]=v
            }


        }else if(atsetdata == "rpp_tujuanpembelajaran"){
            let dom = setdata[i].firstChild;//.innerHTML;
            let ada = dom.childNodes;//.classList;//.contains(".ql-formula");//dom.classList.contains('ql-formula')
             

            //"https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B%7B2%7D%5D%20%7B3%7D%7D"
            // obj[atsetdata] =  setdata[i].firstChild.innerHTML;//quill.getText(0 , 10000000);//;quill.getContents();
            obj[atsetdata] =  setdata[i].innerHTML;//quill.getText(0 , 10000000);//;quill.getContents();
            
        }else if (atsetdata == "rpp_langkahpembelajaran"){
            obj[atsetdata] = setdata[i].firstChild.innerHTML;//quill1.getText(0 , 10000000);//quill.getContents();//;
        }else{
            obj[atsetdata]=v;
            // pake Quill js
            // obj[atsetdata] = atsetdata.innerText;
        }
       
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
    obj["mapel_dipilih"] = mapeldiceklis;
    arrobj.push(obj)
    let ret = {}
    ret.objek = arrobj;
    ret.key = key;
    ret.val = val;
    ret.nol = nol;
    return ret;
}
const obj_isianrpp2 = () =>{
    let setdata = document.querySelectorAll("[data-keyrpp]");
    let atsetdata ;
    let key = [];
    let val = [];
    let type = [3];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-keyrpp");
        v = setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
    let ret = {}
    ret.key = key;
    ret.val = val;
    ret.nol = nol;
    return ret;
}

const changehtml = (id) =>{
    //let quil = document.querySelector('#'+id);
    let quil
    if(id == "editor1"){
        console.log("editor1")
        quil = quill
    }else{
        console.log("editor")
        quil = quill1
    }
    let range = quill.getSelection();
    console.log(range)
    let teks = quill.getText(range.index, range.length);
    console.log(teks);

    
    // var tes = quill.addContainer('ql-custom');    
    var tes = quill.addContainer('ql-editor');    
    var p = document.createElement("p")
    p.innerHTML = teks;
    tes.appendChild(p);
    // let delta = quill.clipboard.convert(teks)
    // quill.setContents(delta, 'silent')
    // quill.enable(false)
    // var pitem2 = document.querySelector('.ql-editor p:last-child');
    // var pitem = document.querySelector('.ql-editor p:last-child');
    // var i = pitem.length
    // var neitem = document.createElement("div")
    // neitem.innerHTML = teks;
    // pitem.parentNode.replaceChild(neitem, pitem);
    // ;;//[0].firstChild.appendChild(teks);
    // quill.enable(true)
    
    // document.getElementsByClassName('ql-editor')[0].innerHTML += teks  
    // document.getElementsByClassName('ql-editor')[0].parentNode.insertBefore(teks);
    // var tesnode = document.getElementsByClassName('ql-editor');//[0].childNodes.appendChild(teks);
    // console.log(tesnode.childNodes)
    
   
//     quill.updateContents(new Delta()
//   .retain(range.index)                  // Keep 'Hello '
//   .delete(0)                  // 'World' is deleted
//   .insert(teks)
//   .retain(1, { bold: true })  // Apply bold to exclamation mark

// );

    //quill.clipboard.dangerouslyPasteHTML(teks);
}

function tabA(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("isiadm");//("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btnadm");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-green", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-green";
}
