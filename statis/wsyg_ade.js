let urladm = jlo.ss_datanilai;

const arrTagAdm = ["0","prota","prosem","silabus","rpp","kisi-kisi","sebarankd","soal","ph","pts","pak","pat","perbaikan","pengayaan","kkm","notularapat"];
const arrVersi = ["0","Mata Pelajaran","Tematik","Subtema","Pembelajaran"]


let editore = document.querySelector("#editor_ade");
const doc = editore.contentDocument || editore.contentWindow.document;
        doc.body.designMode = "on";
        doc.body.setAttribute("spellcheck","false");
        doc.body.setAttribute("contenteditable","true");
        doc.body.setAttribute("id","edt");
        // let divbayangan = doc.createElement("div");
        // doc.body.appendChild(divbayangan);
        
    // tambahkan style edurasa;
    var root = window.location.origin;
    doc.head.innerHTML = `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <link rel="stylesheet" href="${root}/css/cssiframe_stylegurukelas.css">`;
    
doc.addEventListener("input",(e)=>{
    
    let v = e.target;//.innerHTML;
    // let sel = doc.getSelection();
    // let selrange = sel.getRangeAt(0);
    // let selectiondom = selrange.cloneContents();
    let dom = v.querySelectorAll(".calcnosoal");
    //console.log(dom)
    let div = document.querySelector(".tekeditorpg");
    let divradiopg = document.getElementById("divbantu_kuncijawaban");
    let html = "Belum Terdeteksi adanya Pilihan Ganda/Essay";
    let el_input = "";
    let cekkunci = deteksikuncipg();
    if(dom.length>0){
        let datapg = [];
        for(i = 0 ; i < dom.length ; i ++){
            let pg = {};
            let cekno = dom[i].getAttribute("id");
            let no = cekno.match(/(\d+)/)[0];
            pg["no"] = no;
            let opsipg = [];
            let cekabcd = []
            let sibling = dom[i].querySelectorAll(".calc")

            for(j = 0 ; j < sibling.length; j++){
                let inpgg = sibling[j].getAttribute("id");
                let inpg = inpgg.match(/[ABCD]/)[0];
                let tck = inpgg.match(/[ABCD]/)["input"];
                opsipg.push(inpg)
                cekabcd.push(tck);
            }
            pg["datapg"] = opsipg;
            pg["abcd"] = cekabcd;
            datapg.push(pg);
        }
        //console.log(datapg);
        html = `<table class="w3-table-all w3-tiny garis w3-centered"><tr><th>No Soal</th><th colspan="4">Opsi Jawaban<br/><sub>(Klik hurufny, huruf yang menyala adalah kunci jawaban pilihan Anda</sub></th></tr>`;
        for(k = 0 ; k <datapg.length ; k++){
            html +=`<tr><td class="warnaeka">${datapg[k].no}</td>`;
            let arrayabcd = datapg[k].datapg;
            let arrayopsi = datapg[k].abcd;
            for(l = 0 ; l <arrayopsi.length ; l++){
                let kelastambahan = " ";
                if(cekkunci.indexOf(arrayopsi[l])>-1){
kelastambahan = "w3-light-blue"
                }
                html += `<td class="tdpg_pgeditor_${arrayopsi[l]} tdnosoal_editor_${datapg[k].no} td_ke${l} ${kelastambahan}" style="cursor:pointer">
                <label for="tomboleditor_bantuopsi${arrayopsi[l]}" class="lbl_pgeditor_${arrayopsi[l]}">${arrayabcd[l]}</label>
                </td>`;
                el_input += `<br/><input type="radio" id="tomboleditor_bantuopsi${arrayopsi[l]}" name="rdsoal_${datapg[k].no}" class="pg_buatkuncikd" value="${arrayopsi[l]}" onchange="checked_buatkunci(this)"/>${arrayopsi[l]}`;

            }
            html+=`</tr>`
        }
        html +=`</table>`;

    }

    div.innerHTML = html;
    divradiopg.innerHTML = el_input;
    //jika sudah membuat ceklis jawaban, ketika ada PG baru jangan dihapus lagi
    for(n = 0 ; n < cekkunci.length ; n++){
        let mm = document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]);
        if(mm !== null ||mm !== undefined){
            document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]).checked = true;
        }
    }
    //MENDETEKSI SOAL PG
    let arrsoalpg = deteksinomorsoalpg()
    document.formuploadmateri.jumlahpg.value = arrsoalpg.length;
    
    let arrsoalessay = deteksinomorsoalessay()
    document.formuploadmateri.jumlahessay.value = arrsoalessay.length;

    // //ketika menekan enter pada template soal, maka
    
    // doc.addEventListener("keyup",(ev)=>{
    //     //
    //     if(ev.keyCode === 13) {
    //        //let d = document.querySelectorAll("refuseenter")
    //        let ee = e.target.lastChild;;
    //        let eed = e.target.lastChild.parentNode;;
    //        console.log(ee)
    //        console.log(eee)
    //     }else{
    //         console.log("tidak terdeteksi enter")
    //     }
    // })
    deteksiAllsoal();
    

 })
 

const deteksikuncipg = () =>{
      //cari teks yang ada _KUNCI-PG_
        let cekpg = doc.body.querySelectorAll("div");
        let bol = false;
        let tekscek;
        let arraykunci = [];
        for(m = 0 ; m < cekpg.length ; m++){
            tekscek = cekpg[m].innerHTML;
            if(tekscek.indexOf("_KUNCI-PG_")>-1){
                bol = true;
                let s_to_array = tekscek.replace("_KUNCI-PG_","");//
                arraykunci = s_to_array.split(",");
                break;
            }
        };
        return arraykunci
        // console.log(bol);
        // console.log(arraykunci);
        // if(bol){
        //     for(a = 0 ; a < arraykunci.length ; a++){
        //         console.log(arraykunci[a]);
        //         let tdjwb = document.querySelector(".tdpg_pgeditor_" + arraykunci[a]);//
        //         let tdjwbd = tdjwb.className;
        //         console.log(tdjwbd)
        //         if(tdjwbd.indexOf("w3-light-blue")>-1){
        //             tdjwb.className = tdjwbd + " w3-light-blue";
        //         } 
        //     }
        // }
}
const objeksebarankd = () =>{

}
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

    // let textarea = document.getElementById("idmateri");
    // let val = textarea.value;
    // let n = val.length;
    // let awal = val.indexOf("_KUNCI-PG_");
    // let batasawal = val.substring(awal, n)

    // let str_pg_kunci = batasawal.split("\n")[0];

    let ceklis = document.querySelectorAll(".pg_buatkuncikd");
    let arrceklis = []
    for (j = 0; j < ceklis.length; j++) {
        let n = ceklis[j].value;
        if (ceklis[j].checked) {
            arrceklis.push(n)

        }

    }
     //console.log(arrceklis)
    // let teksnya = "_KUNCI-PG_" + arrceklis.join(",")
    // // console.log(str_pg_kunci)
    // // console.log(teksnya);
    // // textarea.value = textarea.value.substring(0, awal) + teksnya + textarea.value.substring(end, len);
    // let teksganti = str_pg_kunci;
    // // console.log(awal)
    // if (awal == -1) {
    //     textarea.value = textarea.value + "\n\n" + teksnya; //+ textarea.value.substring(end, len);
    // } else {
    //     textarea.value = textarea.value.replace(str_pg_kunci, teksnya);

    // }
    //let selection = doc.getSelection();
    let divs = doc.getElementsByTagName('div');
    let cek = divs.length;
    let bol = false;
    for(a = 0 ; a < divs.length ; a++){
        let teks = divs[a].innerHTML;
        if(teks.indexOf("_KUNCI-PG_")>-1){
           // console.log(a +" = "+ teks);
            bol = true;
            cek = a;
            break;
        }else{
           // console.log("none");
        }
    }
   
    
    if(bol){
        divs[cek].innerHTML = "_KUNCI-PG_" + arrceklis.join(",");
    }else{
        let creatediv = doc.createElement("div");
        creatediv.innerHTML = "_KUNCI-PG_" + arrceklis.join(",")
        doc.body.appendChild(creatediv);
        
    }
    

    // if (selection.rangeCount > 0) {
    // selection.removeAllRanges();
    // }

    // for (let i = 0; i < strongs.length; i++) {
    //     let range = doc.createRange();
    //     range.selectNode(strongs[i]);
    //     selection.addRange(range);
    //     range.selectNode(strongs[i]);
    // }
    




};
const btn = document.querySelectorAll(".btn_edt");//
const allowhtml = document.querySelector("#html_edt");

let show = false;
allowhtml.addEventListener("change", ()=>{
    if(!allowhtml.checked){
        //asli
        doc.body.innerHTML = doc.body.textContent;
        
        show = false;
         
         
        }else{
            // asli
            doc.body.textContent =doc.body.innerHTML;
            //modifikasi untuk mengantisipasi pengeditan saol
           
            show =true;
         

    }
})
for (let i = 0 ; i < btn.length ; i++){
    let cmd = btn[i].getAttribute("data-keycmd");
    let owngrup = btn[i].hasAttribute("data-grup");
    
    btn[i].addEventListener("click",()=>{
        if(show){
            alert("Hilangkan dulu Ceklisnya")
        }else{
           
            if(cmd === "fontname"){
                let val = btn[i].innerHTML;
                document.querySelector(".dropdown_jenishuruf").innerHTML = val;
                doc.execCommand(cmd,false,val);

            }else if(cmd==="removeFormat"){ 
                doc.execCommand(cmd, false, null);
                document.querySelector(".dropdown_jenishuruf").innerHTML = "Pilih Jenis Huruf"
            }else if(cmd == "createLink"){
                let prom = prompt("Masukkan link","");
                if(!prom){return};
                doc.execCommand(cmd, false, prom);
                console.log(doc.body.designMode)
                const linkifram = doc.querySelectorAll("a");
linkifram.forEach(el =>{
    el.target = "_blank";
    console.log(el);
    el.addEventListener("mouseover", () =>{
        doc.body.designMode = "Off";
    });
    el.addEventListener("mouseout", () =>{
        doc.body.designMode = "On";
    })
    console.log(doc.body.designMode)
})   
            }else if(owngrup){
                let grup = btn[i].getAttribute("data-grup");
                if(grup == "Paragraf"){
//paragraf:
let dom = document.querySelector(".dropdown_jenisparagraf");
if(cmd =="justifyLeft"){
    dom.innerHTML = `<i class="fa fa-align-left"></i> `;
}else if(cmd == "justifyRight"){
    dom.innerHTML = `<i class="fa fa-align-right"></i> `;
}else if(cmd == "justifyCenter"){
    dom.innerHTML = `<i class="fa fa-align-center"></i> `;
}else if(cmd == "justifyFull"){
    dom.innerHTML = `<i class="fa fa-align-justify"></i> `;
}else{
    dom.innerHTML = "Tak dikenal";
}
doc.execCommand(cmd, false, null)
                }else if (grup == "ukuranfont") {
let val = btn[i].getAttribute("data-keyval");
document.querySelector(".grup_ukuranfont").innerHTML = btn[i].innerHTML;
doc.execCommand(cmd, false, val);


                }else if(grup == "heading"){
let val = btn[i].getAttribute("data-keyval");
document.querySelector(".grup_heading").innerHTML = btn[i].innerHTML;
doc.execCommand(cmd, false, val);

                }
                else{
let teks = btn[i].innerHTML;
doc.execCommand(cmd,false,teks)
// doc.execCommand("insertText",false,"&nbsp;")
                }
            } else{
                doc.execCommand(cmd, false, null)
                // doc.execCommand("insertText",false,"&nbsp;")
                btn[i].classList.toggle("active");
                
            }



            
        }
      
    })
        

        
    // btn[i].classList.remove("active");
    // btn[i].addEventListener("click",()=>{
    //     if(cmd ==="showCode"){
    //         if(show){
    //             document.innerHTML = document.textContent;
    //             show = false;
    //         }else{
    //             document.textContent =document.innerHTML;
    //             show =true;
    //         }
    //     }else{
    //         document.execCommand(cmd, false, null)
    //     }   
    //     btn[i].classList.toggle("active");
    // });
    

};

let fcolor = document.querySelector("#fontcolor");
let bcolor = document.querySelector("#backcolor");
let edtbl = document.querySelector("#edt_table");
let sPchBiasa = document.querySelector("#simpan_pecahanbiasa");
let sPchCamp = document.querySelector("#simpan_pecahancampuran");
let sAkarKdrat = document.querySelector("#simpan_akarkuadrat");
let sAkartiga = document.querySelector("#simpan_akarpangkattiga");
fcolor.addEventListener("input", () =>{
    let v =  fcolor.value
        doc.execCommand("forecolor", false, v);
       
});
bcolor.addEventListener("input", () =>{
    let bv = bcolor.value;
    doc.execCommand("hiliteColor",false, bv);
   
})
edtbl.addEventListener("click", () => {
    try{
    let promp = prompt("Masukkan jumlah baris, contoh 3 x 4 (3 baris, 4 kolom) tanpa spasi","3x4");
    if(!promp){return }
    let teks = promp.replace(/\s+/g,"");
    let ang = teks.toLowerCase().split("x");
    let brs = parseInt(ang[0]);
    let cols = parseInt(ang[0]);
    let html = `&nbsp;<table class="w3-table garis">`
    for(i = 0 ; i < brs ; i++){
        html +=`<tr>`
        for (j = 0 ; j <cols; j++){
            html +=`<td>teks</td>`
        }
        html +=`</tr>`
    }
    html +=`</table>&nbsp;`;
    doc.execCommand("insertHTML",null, html);
    }
    catch(er){
        console.log(er);    
    }
});
sPchBiasa.addEventListener("click", () =>{
    let a = document.querySelector("#inpecbiasa_pembilang").innerHTML;
    let b = document.querySelector("#inpecbiasa_penyebut").innerHTML;
    let teks = htmlpecahanbiasa(a,b);
    doc.execCommand("insertHTML",null, teks);
})
sPchCamp.addEventListener("click",()=>{
    let a = document.querySelector("#inpecCamp_satuan").innerHTML;
    let b = document.querySelector("#inpecCamp_pembilang").innerHTML;
    let c = document.querySelector("#inpecCamp_penyebut").innerHTML;
    let teks = htmlpecahancampuran(a,b,c);
    doc.execCommand("insertHTML",null, teks);
})
sAkarKdrat.addEventListener("click",()=>{
    let a = "";
    let b = document.querySelector("#inakar_kuadrat").innerHTML;
    let teks = htmlakarpangkatn(a,b);
    doc.execCommand("insertHTML",null, teks);

})
sAkartiga.addEventListener("click",()=>{
    let a = "3";
    let b = document.querySelector("#inakar_tiga").innerHTML;
    let teks = htmlakarpangkatn(a,b);
    doc.execCommand("insertHTML",null, teks);
});
let fileInput = document.querySelector("#uploadgambar_edt");
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (!files || !files.length) {
    //          console.log('No files selected');
    return;
    }
        let ketval = document.formuploadmateri.idmapel.value
        let val = (ketval == "") ? "e-lamaso" : ketval;
        let reader = new FileReader();
        var item = files[0];
        let url ="";
       
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
        doc.execCommand("insertImage",false, url);
        let imgs = doc.querySelectorAll("img");
        imgs.forEach(item => {
            item.style.maxWidth ="300px";
        })
        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";

        }, 3000);

    })
    .catch(er => {
    console.log(er);
       
    })
}
});


const btn_edtyt = document.querySelector("#btn_edtyt");
btn_edtyt.addEventListener("click", () => {
    let prom = prompt("Masukkan link youtube","");
    if(!prom){return};
    let reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    let url = prom.match(reg)
    let html=`<iframe style="resize: both;" src='https://www.youtube.com/embed/${url[1]}'  frameborder='1' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br/><br/>`;
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }
})


function enableImageResizeInDiv(id) {
    if (!(/chrome/i.test(navigator.userAgent) && /google/i.test(window.navigator.vendor))) {
        return;
    }
    var editor = doc.getElementById(id);
    
    var resizing = false;
    var currentImage;
    var createDOM = function (elementType, className, styles) {
        let ele = document.createElement(elementType);
        ele.className = className;
        setStyle(ele, styles);
        return ele;
    };
    var setStyle = function (ele, styles) {
        for (key in styles) {
            ele.style[key] = styles[key];
           
        }
        return ele;
    };
    var removeResizeFrame = function () {
        doc.querySelectorAll(".resize-frame,.resizer").forEach((item) => item.parentNode.removeChild(item));
    };
    var offset = function offset(el) {
         const rect = el.getBoundingClientRect();
        // scrollLeft = window.pageXOffset ||doc.documentElement.scrollLeft,
        // scrollTop = window.pageYOffset || doc.documentElement.scrollTop;
        // console.log(scrollLeft);
        // return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        var currentFramePosition = currentFrameAbsolutePosition()
        var elemTop = rect.top + currentFramePosition.y;
        var elemBottom = rect.bottom + currentFramePosition.y;
    

        // var currentFramePosition = getCurrentFrameAbsolutePosition();
        // var elemTop = rect.top + currentFramePosition.y;
        // var elemBottom = rect.bottom + currentFramePosition.y;
         return { top: elemTop, left: elemBottom }
    };
    var clickImage = function (img) {
        removeResizeFrame();
        currentImage = img;
        const imgHeight = img.offsetHeight;
        const imgWidth = img.offsetWidth;
        const imgPosition = { top: img.offsetTop, left: img.offsetLeft };
        const editorScrollTop = editor.scrollTop;
        const editorScrollLeft = editor.scrollLeft;
        const top = imgPosition.top - editorScrollTop - 1;
        const left = imgPosition.left - editorScrollLeft - 1;

        editor.append(createDOM('span', 'resize-frame', {
            margin: '10px',
            position: 'absolute',
            top: (top + imgHeight - 10) + 'px',
            left: (left + imgWidth - 10) + 'px',
            border: 'solid 3px blue',
            width: '6px',
            height: '6px',
            cursor: 'se-resize',
            zIndex: 1
        }));

        editor.append(createDOM('span', 'resizer top-border', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));

        editor.append(createDOM('span', 'resizer left-border', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: '0px',
            height: imgHeight + 'px'
        }));

        editor.append(createDOM('span', 'resizer right-border', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left + imgWidth) + 'px',
            border: 'dashed 1px grey',
            width: '0px',
            height: imgHeight + 'px'
        }));

        editor.append(createDOM('span', 'resizer bottom-border', {
            position: 'absolute',
            top: (top + imgHeight) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));

        doc.querySelector('.resize-frame').onmousedown = () => {
            resizing = true;
            return false;
        };

        editor.onmouseup = () => {
            if (resizing) {
                currentImage.style.width = doc.querySelector('.top-border').offsetWidth + 'px';
                currentImage.style.height = doc.querySelector('.left-border').offsetHeight + 'px';
                refresh();
                currentImage.click();
                resizing = false;
            }
        };

        editor.onmousemove = (e) => {
            if (currentImage && resizing) {
                let height = e.pageY - offset(currentImage).top;
                let width = e.pageX - offset(currentImage).left;
                height = height < 1 ? 1 : height;
                width = width < 1 ? 1 : width;
                const top = imgPosition.top - editorScrollTop - 1;
                const left = imgPosition.left - editorScrollLeft - 1;
                setStyle(doc.querySelector('.resize-frame'), {
top: (top + height - 10) + 'px',
left: (left + width - 10) + "px"
                });
               
                setStyle(doc.querySelector('.top-border'), { width: width + "px" });
                setStyle(doc.querySelector('.left-border'), { height: height + "px" });
                setStyle(doc.querySelector('.right-border'), {
left: (left + width) + 'px',
height: height + "px"
                });
                setStyle(doc.querySelector('.bottom-border'), {
top: (top + height) + 'px',
width: width + "px"
                });
            }
            return false;
        };
    };
    var bindClickListener = function () {
        editor.querySelectorAll('img').forEach((img, i) => {
            img.onclick = (e) => {
                if (e.target === img) {
clickImage(img);
                }
            };
        });
    };
    var currentFramePosition = function(){
        let currentWindow = window;
    let currentParentWindow;
    let positions = [];
    let rect;
  
    while (currentWindow !== window.top) {
      currentParentWindow = currentWindow.parent;
      for (let idx = 0; idx < currentParentWindow.frames.length; idx++)
        if (currentParentWindow.frames[idx] === currentWindow) {
          for (let frameElement of currentParentWindow.document.getElementsByTagName('iframe')) {
            if (frameElement.contentWindow === currentWindow) {
              rect = frameElement.getBoundingClientRect();
              positions.push({x: rect.x, y: rect.y});
            }
          }
          currentWindow = currentParentWindow;
          break;
        }
    }
    return positions.reduce((accumulator, currentValue) => {
      return {
        x: accumulator.x + currentValue.x,
        y: accumulator.y + currentValue.y
      };
    }, { x: 0, y: 0 });
    };
    var refresh = function () {
        bindClickListener();
        removeResizeFrame();
        if (!currentImage) {
            return;
        }
        var img = currentImage;
        var imgHeight = img.offsetHeight;
        var imgWidth = img.offsetWidth;
        var imgPosition = { top: img.offsetTop, left: img.offsetLeft };
        var editorScrollTop = editor.scrollTop;
        var editorScrollLeft = editor.scrollLeft;
        const top = imgPosition.top - editorScrollTop - 1;
        const left = imgPosition.left - editorScrollLeft - 1;

        editor.append(createDOM('span', 'resize-frame', {
            position: 'absolute',
            top: (top + imgHeight) + 'px',
            left: (left + imgWidth) + 'px',
            border: 'solid 2px red',
            width: '6px',
            height: '6px',
            cursor: 'se-resize',
            zIndex: 1
        }));

        editor.append(createDOM('span', 'resizer', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));

        editor.append(createDOM('span', 'resizer', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left + imgWidth) + 'px',
            border: 'dashed 1px grey',
            width: '0px',
            height: imgHeight + 'px'
        }));

        editor.append(createDOM('span', 'resizer', {
            position: 'absolute',
            top: (top + imgHeight) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));
    };
    var reset = function () {
        if (currentImage != null) {
            currentImage = null;
            resizing = false;
            removeResizeFrame();
        }
        bindClickListener();
    };
    editor.addEventListener('scroll', function () {
        reset();
    }, false);
    editor.addEventListener('mouseup', function (e) {
        if (!resizing) {
            const x = (e.x) ? e.x : e.clientX;
            const y = (e.y) ? e.y : e.clientY;
            let mouseUpElement = doc.elementFromPoint(x, y);
            if (mouseUpElement) {
                let matchingElement = null;
                if (mouseUpElement.tagName === 'IMG') {
matchingElement = mouseUpElement;
                }
                if (!matchingElement) {
reset();
                } else {
clickImage(matchingElement);
                }
            }
        }
    });
   

}
enableImageResizeInDiv("edt");
function bubbleIframeMouseMove(iframe){
    // Save any previous onmousemove handler
    var existingOnMouseMove = iframe.contentWindow.onmousemove;

    // Attach a new onmousemove listener
    iframe.contentWindow.onmousemove = function(e){
        // Fire any existing onmousemove listener 
        if(existingOnMouseMove) existingOnMouseMove(e);

        // Create a new event for the this window
        var evt = document.createEvent("MouseEvents");

        // We'll need this to offset the mouse move appropriately
        var boundingClientRect = iframe.getBoundingClientRect();

        // Initialize the event, copying exiting event values
        // for the most part
        evt.initMouseEvent( 
            "mousemove", 
            true, // bubbles
            false, // not cancelable 
            window,
            e.detail,
            e.screenX,
            e.screenY, 
            e.clientX + boundingClientRect.left, 
            e.clientY + boundingClientRect.top, 
            e.ctrlKey, 
            e.altKey,
            e.shiftKey, 
            e.metaKey,
            e.button, 
            null // no related element
        );

        // Dispatch the mousemove event on the iframe element
        iframe.dispatchEvent(evt);
    };
}
bubbleIframeMouseMove(editore);
function currentFrameAbsolutePosition() {
    let currentWindow = window;
    let currentParentWindow;
    let positions = [];
    let rect;
  
    while (currentWindow !== window.top) {
      currentParentWindow = currentWindow.parent;
      for (let idx = 0; idx < currentParentWindow.frames.length; idx++)
        if (currentParentWindow.frames[idx] === currentWindow) {
          for (let frameElement of currentParentWindow.document.getElementsByTagName('iframe')) {
            if (frameElement.contentWindow === currentWindow) {
              rect = frameElement.getBoundingClientRect();
              positions.push({x: rect.x, y: rect.y});
            }
          }
          currentWindow = currentParentWindow;
          break;
        }
    }
    return positions.reduce((accumulator, currentValue) => {
      return {
        x: accumulator.x + currentValue.x,
        y: accumulator.y + currentValue.y
      };
    }, { x: 0, y: 0 });
  }

const htmlpecahanbiasa = (a,b)=>{
   // return `&nbsp;<div style="position:relative;display:inline-block;margin:2px 5px;height:35px;font-size:12px;vertical-align:middle;text-align:center;font-family:'Times New Roman', times, serif; ">&nbsp;${a}&nbsp;<div style="border-bottom:1px solid black"></div>&nbsp;${b}&nbsp;</div>&nbsp;`
   return `<img src="https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Cfrac%20%7B${a}%7D%20%7B${b}%7D%7D" alt="pecahan ${a} per ${b} per"/>`
} 
const htmlpecahancampuran = (a, b, c) =>{
    //return `&nbsp;<div style="display:inline-block;margin:2px 3px;height:35px;position:relative;font-size:12px;font-family:'Times New Roman', times, serif;vertical-align:middle;text-align:center;"><div style="float:left;padding-top:7px">&nbsp;${a}</div><div style="top:-3px;position:relative;float:left;">&nbsp;${b}&nbsp;<div style="border-bottom:1px solid black"></div>&nbsp;${c}&nbsp;</div></div>&nbsp;`
    return `<img src="https://chart.apis.google.com/chart?cht=tx&chl=${a}%7B%5Cfrac%20%7B${b}%7D%20%7B${c}%7D%7D" alt="pecahan ${a} ${b} per ${c}"/>`

}
const htmlakarpangkatn = (a=3,b) =>{
   
    //return `&nbsp;<div style="position:relative;display:inline-block;vertical-align:middle;"><div style="position:relative;float:left;top:-4px;font-size:18px"><sup style="font-size:10px;left:5px;top:-10px;position:relative">${a}</sup>√</div><div style="border-top:1px solid black;position:relative;float:left;font-size:12px;left:-1px;font-family:'Times New Roman',times,serif;">&nbsp;${b}&nbsp;</div></div>&nbsp;`
    return `<img src="https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B%7B${a}%7D%5D%20%7B${b}%7D%7D" alt="akar pangkat ${a} dari ${b}">`;
}
const nodeselection = () =>{
    let sel = doc.getSelection();
    console.log(sel.rangeCount);
    let selrange = sel.getRangeAt(0);
   
    
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let ar = [];
    dom.forEach(el =>{
        ar.push(el.innerHTML)
    })
    console.log(ar)
    //console.log(selectiondom.querySelectorAll("div"));
    // let arraydom = selectiondom.split("<div>");
    // console.log(arraydom);
    let string = sel.toString();
    let removetab = string.replace(/\t+/g," ")
    let arraystring = removetab.split(/[\n|\r|\r\n]/);
    let objsoal = {};
    let pertanyaan = [];
    let opsiA = [];
    let opsiB = [];
    let opsiC = [];
    let opsiD = [];
    let tag = true;
    let tagA = false;
    let tagB = false;
    let tagC = false;
    let tagD = false;
    let tekstanpaA
    let tekstanpaB
    let tekstanpaC
    let tekstanpaD

let no;
let nosoal;
    for(i=0 ; i < arraystring.length ; i++){
        let teks = arraystring[i];
        let nno = teks.match(/\d+/);
        no = nno;
        if(teks.indexOf(no)==0){
            if(tag){
                if(i==0){
let tekstanpano = teks.replace(no+". ","");
nosoal = no[0];
objsoal.no = nosoal
pertanyaan.push(tekstanpano);
                }else{
pertanyaan.push(teks);
                }
            } ///else untukm opsi
            
        }else{
            if(tagA){
                //tag =false;
                
                //tekstanpaA = teks.replace(/^[A]. /,"")
                if(teks.indexOf("B. ")==0){
tagA = false;
tagB = true;
tekstanpaB = teks.replace("B. ","");
opsiB.push(tekstanpaB);

                }else{
opsiA.push(teks);
                }

            }else{
                if(teks.indexOf("A. ")==0){
tagA = true;
tag =false;
tekstanpaA = teks.replace("A. ","")
opsiA.push(tekstanpaA);
                }else{
if(tag){
    pertanyaan.push(teks) ;//1,
}

if(tagB){
    if(teks.indexOf("C. ")==0){
        tagB = false;
        tagC = true;
        tekstanpaC = teks.replace("C. ","");
        opsiC.push(tekstanpaC);
        
    }else{
        opsiB.push(teks);
    }
}else if(tagC){
    if(teks.indexOf("D. ")==0){
        tagD = true;
        tagC = false;
        tekstanpaD = teks.replace("D. ","");
        opsiD.push(tekstanpaD);
    }else{
        opsiC.push(teks)

    }
}else{
    if(tagD){
        opsiD.push(teks);
    }
}

                }
            }
        }


    }; 
    if(nosoal !== undefined && opsiA.length !== 0 && opsiB.length !== 0 && opsiC.length !== 0 && opsiD.length !== 0){
        if(nosoal == null){
            alert("Mohon berikan enter di konten yang akan dipilih");
            return
        }else{

            objsoal.valid = true;
        }
    }else{
        objsoal.valid = false;
    }
    objsoal.pertanyaan = pertanyaan.join("<br>");
    objsoal.opsiA = opsiA.join("<br>");
    objsoal.opsiB = opsiB.join("<br>");
    objsoal.opsiC = opsiC.join("<br>");
    objsoal.opsiD = opsiD.join("<br>");
    console.log(objsoal);
}
const select_pg_abcd = document.querySelector(".edt_soal2") 
select_pg_abcd.addEventListener("click",()=>{
    let ceksoal = deteksiAllsoal();
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);

    let sel = doc.getSelection();
    let selrange = sel.getRangeAt(0);
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let teks, nosoal ;
    let objeksoal = {};
    let pertanyaan = [];
    let opsiA = [];
    let opsiB = [];
    let opsiC = [];
    let opsiD = [];
    let tag = true;
    let tagA = false;
    let tagB = false;
    let tagC = false;
    let tagD = false;
    let txt_nono, txt_noA, txt_noB, txt_noC, txt_noD;
    for(i=0;i < dom.length ; i++){
        teks = dom[i].innerHTML;
        if(i == 0){
            nosoal = teks.match(/\d+/)[0];
            let patt_nosoal = nosoal + ". ";
            txt_nono = teks.replace(patt_nosoal,"")
            console.log(teks);
            console.log(nosoal);
            objeksoal.no = nosoal;
            pertanyaan.push(txt_nono);
        }

        if(tag){
            if(teks.indexOf("A. ")== 0 ){
                tag = false;
                tagA = true;
                txt_noA = teks.replace("A. ","");
                opsiA.push(txt_noA);
            }else{
                if(i !== 0){
pertanyaan.push(teks);
                }
            }
        }else{
            if(tagA){
                if(teks.indexOf("B. ")==0){
tagA = false;
tagB = true;
txt_noB = teks.replace("B. ","")
opsiB.push(txt_noB)
                }else{
opsiA.push(teks);
                }
            }else{
                if(tagB){
if(teks.indexOf("C. ")==0){
    tagB = false;
    tagC = true;
    txt_noC = teks.replace("C. ","");
    opsiC.push(txt_noC);
}else{
    opsiB.push(teks)
}
                }else{
if(tagC){
    if(teks.indexOf("D. ")==0){
        tagC = false;
        tagD = true;
        txt_noD = teks.replace("D. ","");
        opsiD.push(txt_noD);

    }else{
        opsiC.push(teks)
    }
}else{
    if(tagD){
        opsiD.push(teks)
    }
}
                }
            }

        }
    }
    
    if(nosoal !== null && opsiA.length !== 0 && opsiB.length !== 0 && opsiC.length !== 0 && opsiD.length !== 0){
        if(nosoal == null){
            alert("Mohon berikan enter di konten yang akan dipilih");
            return
        }
    }else{
        alert("Ada yang salah dengan format yang dipilih. \n\n Opsi berformat abjad-titik-spasi (A.<spasi>) \n Pastikan opsi terletak di paling kanan (tanpa spasi)")
        return
    }
    // objeksoal.valid = valid;
    let tsoal = pertanyaan.join("<br>");
    let topsiA = opsiA.join("<br>");
    let topsiB = opsiB.join("<br>");
    let topsiC = opsiC.join("<br>");
    let topsiD = opsiD.join("<br>");
    //console.log(objeksoal);
    if(ceknosoal.indexOf(nosoal)==-1){
        let html = `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${topsiD}</label></li></ol></li></ol><br><br>`;
        
        let ch = document.querySelector("#html_edt");
        if(!ch.checked){
            ch.checked = true;
            doc.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            doc.execCommand("insertText",false,html);
        }
    }else{
        alert("Nomor soal " + nosoal + " sudah Anda buat!")
    }
});
const select_pg_abc = document.querySelector(".edt_soal");
select_pg_abc.addEventListener("click",()=>{
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);

    let sel = doc.getSelection();
    let selrange = sel.getRangeAt(0);
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let teks, nosoal ;
    let objeksoal = {};
    let pertanyaan = [];
    let opsiA = [];
    let opsiB = [];
    let opsiC = [];
    // let opsiD = [];
    let tag = true;
    let tagA = false;
    let tagB = false;
    let tagC = false;
    // let tagD = false;
    let txt_nono, txt_noA, txt_noB, txt_noC;//, txt_noD;
    for(i=0;i < dom.length ; i++){
        teks = dom[i].innerHTML;
        if(i == 0){
            nosoal = teks.match(/(\d+)/)[0];//(\d+)/
            let patt_nosoal = nosoal + ". ";
            txt_nono = teks.replace(patt_nosoal,"")
            console.log(nosoal);
            objeksoal.no = nosoal;
            pertanyaan.push(txt_nono);
        }

        if(tag){
            if(teks.indexOf("A. ")== 0 ){
                tag = false;
                tagA = true;
                txt_noA = teks.replace("A. ","");
                opsiA.push(txt_noA);
            }else{
                if(i !== 0){
pertanyaan.push(teks);
                }
            }
        }else{
            if(tagA){
                if(teks.indexOf("B. ")==0){
tagA = false;
tagB = true;
txt_noB = teks.replace("B. ","")
opsiB.push(txt_noB)
                }else{
opsiA.push(teks);
                }
            }else{
                if(tagB){
if(teks.indexOf("C. ")==0){
    tagB = false;
    tagC = true;
    txt_noC = teks.replace("C. ","");
    opsiC.push(txt_noC);
}else{
    opsiB.push(teks)
}
                }else{
if(tagC){
    opsiC.push(teks)
}
                }
            }

        }
    }
    if(nosoal !== undefined && opsiA.length !== 0 && opsiB.length !== 0 && opsiC.length !== 0 ){
        if(nosoal == null){
            alert("Mohon berikan enter di konten yang akan dipilih");
            return
        }
    }else{
        
        alert("Ada yang salah dengan format yang dipilih. \n\n Opsi berformat abjad-titik-spasi (A.<spasi>) \n Pastikan opsi terletak di paling kanan (tanpa spasi)")
        return
    }
    // objeksoal.valid = valid;
    let tsoal = pertanyaan.join("<br>");
    let topsiA = opsiA.join("<br>");
    let topsiB = opsiB.join("<br>");
    let topsiC = opsiC.join("<br>");
    //console.log(objeksoal);
    if(ceknosoal.indexOf(nosoal)== -1){
            let html = `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li></ol></li></ol>&nbsp;&nbsp;`;
          
            
            let ch = document.querySelector("#html_edt");
            if(!ch.checked){
                ch.checked = true;
                doc.execCommand("insertHTML",false,html);
                ch.checked = false
            }else{
                doc.execCommand("insertText",false,html);
            }
        }else{
            alert("Nomor soal " + nosoal + " Sudah Anda buat!")    
        }        

});

const templatemulti_pg_abc = document.querySelector(".multi_soal");
templatemulti_pg_abc.addEventListener("click", () =>{
   let prom = prompt("Masukan no soal dari -  sampai no soal","");
    if(!prom){
        return
    }
    //alert("Anda memasukan " + prom);
    let nosoal, topsiA, topsiB, topsiC, topsiD;
    let buangspasi = prom.replace(/\s+/g,"");
    let array = buangspasi.split("-");
    let tunggal = buangspasi.indexOf("-")<0?true:false;
    let awal, akhir;
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);

    if(tunggal){
        awal = array[0];
        akhir = array[0];
    }else{
        awal = array[0];
        akhir = array[array.length - 1]
    }
    let html ="";
    let tsoal = "Pertanyaan Pilihan Ganda ...."
    topsiA =`A          `;
    topsiB =`B          `;
    topsiC =`C          `;
   
    for(i = awal ; i <= akhir ; i++){
        nosoal = i;
        if(ceknosoal.indexOf(nosoal)==-1){
        html += `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li></ol></li></ol><br>`;
        }else{
            alert("Nomor soal " + nosoal + " sudah Anda buat!");
        }
    }
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }

})
const templatemulti_pg_abcd = document.querySelector(".multi_soal2");
templatemulti_pg_abcd.addEventListener("click", () =>{
    let prom = prompt("Masukan no soal dari -  sampai no soal","");
    if(!prom){
        return
    }
    //alert("Anda memasukan " + prom);
    let nosoal, topsiA, topsiB, topsiC, topsiD;
    let buangspasi = prom.replace(/\s+/g,"");
    let array = buangspasi.split("-");
    let tunggal = buangspasi.indexOf("-")<0?true:false;
    let awal, akhir;
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);
    if(tunggal){
        awal = array[0]
        akhir = awal;
    }else{
        awal = array[0];
        akhir = array[array.length - 1]
    }
    let html ="";
    let tsoal = "Pertanyaan Pilihan Ganda ...."
    topsiA =`A          `;
    topsiB =`B          `;
    topsiC =`C          `;
       topsiD =`D          `;
    for(i = awal ; i <= akhir ; i++){
        nosoal = i;
        if(ceknosoal.indexOf(nosoal)==-1){
            html += `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${topsiD}</label></li></ol></li></ol><br><br>`;
        }else{
            alert("Nomor soal " + nosoal + " sudah Anda buat!");
        }
    }
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }

    //
    
})
const templatemulti_essay = document.querySelector(".multi_essay");
templatemulti_essay.addEventListener("click", () =>{
    let prom = prompt("Masukan no soal dari -  sampai no soal","");
    if(!prom){
        return
    }
    //alert("Anda memasukan " + prom);
    let nosoal, topsiA, topsiB, topsiC, topsiD;
    
    let buangspasi = prom.replace(/\s+/g,"");
    let array = buangspasi.split("-");
    let tunggal = buangspasi.indexOf("-")<0?true:false;
    let awal, akhir;
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);
    if(tunggal){
        awal = array[0]
        akhir = awal;
    }else{
        awal = array[0];
        akhir = array[array.length - 1]
    }

    let html = "";
    for(i = awal ; i <= akhir ; i++){
        nosoal = i;
        let soaljoin = "Pertanyaan Soal Essay No. " + nosoal;
        if(ceknosoal.indexOf(nosoal)==-1){
             html += `<div class="w3-badge w3-aqua w3-left">${nosoal}</div><ol style="list-style-type:none" start="${nosoal}" class="w3-padding w3-card-4"><li id="essay${nosoal}" class="soalessay" style="border-bottom:1px solid blue"><div id="pertanyaanessay_${nosoal}">${soaljoin}</div><div id="tomboljawaban${nosoal}"><hr><button onclick="tombolketikjawaban('${nosoal}')">Ketik Jawaban No ${nosoal}</button><br><br><sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${nosoal}')">Upload Media No ${nosoal}</button><br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div><br></li></ol><br><br><div><br></div>`;
        }else{
            alert("No soal "+ nosoal +" Sudah Anda buat!")
        }
    }
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }

})

const daftarGambar_edt = document.querySelector("#daftarGambar_edt");
daftarGambar_edt.addEventListener("click", () =>{
    daftarGambar();
})

const deteksinomorsoalpg = () =>{
    let arr = [];
    let ceknosoal = doc.body.querySelectorAll(".calcnosoal");
    for(i = 0 ; i < ceknosoal.length ; i++){
        let html = ceknosoal[i].getAttribute("id");
        let no = html.match(/\d+/)[0];
        arr.push(no)
    }
    
    return arr
}

const deteksinomorsoalessay = () =>{
    let arr = [];
    let ceknosoal = doc.body.querySelectorAll(".soalessay");
    for(i = 0 ; i < ceknosoal.length ; i++){
        let html = ceknosoal[i].getAttribute("id");
        let no = html.match(/\d+/)[0];
        arr.push(no)
    }
    
    return arr
}


function fn_mbs_simpansebarankd() {
    let divs = doc.getElementsByTagName('div');
    let cek = divs.length;
    let bol = false;
    for(a = 0 ; a < divs.length ; a++){
        let teks = divs[a].innerHTML;
        if(teks.indexOf("_KUNCI-KD_")>-1){
           // console.log(a +" = "+ teks);
            bol = true;
            cek = a;
            break;
        }else{
            //console.log("none");
        }
    }
    
    // let teksarea = document.getElementById("idmateri");
    // let val = teksarea.value;
    // let n = val.length;
    // let awal = val.indexOf("_KUNCI-KD_");
    // let batasawal = val.substring(awal, n)
    // let cari = batasawal.split("\n")[0];
    let arr = "_KUNCI-KD_";


    let elkd = document.querySelectorAll(".mbs_selectkd");
    //brsnosoal_${r}
    let inputobjekkd = {};
    let ar = [];
    let armpkd = {};
    for (i = 0; i < elkd.length; i++) {
        
        
        let elinput = elkd[i].value + ":";
        let attr = elkd[i].className; //.indexOf("brsmapel_");
        let baris = attr.match(/(\d+)/gm)[1];
        let nomorinput = document.querySelector(".brsnosoal_" + baris);
        let valno = nomorinput.value
        elinput += valno;
        ar.push(elinput);
        var indekno = valno.replace(/\s+/g,"").split(",");
        armpkd[elkd[i].value] = indekno;
    }

    // console.log(armpkd);
    // console.log(JSON.stringify(armpkd));
    document.formuploadmateri.kuncikd.value = JSON.stringify(armpkd)    
    arr += ar.join("<||>")



    // if (awal == -1) {
    //     teksarea.value += "\n\n" + arr;
    // } else {
    //     teksarea.value = teksarea.value.replace(cari, arr);
    // }

    //console.log(divs)
    //let kuncinya =  "_KUNCI-PG_" ;//+ arrceklis.join(",");
    //console.log(cek);
    if(bol){
        divs[cek].innerHTML = arr;//"_KUNCI-PD_" + arrceklis.join(",");
    }else{
        let creatediv = doc.createElement("div");
        creatediv.innerHTML = arr;//"_KUNCI-PG_" + arrceklis.join(",")
        doc.body.appendChild(creatediv);
        
    }
    


    alert("Sebaran KD Berhasil Tersimpan.")
    // pratinjaubuatmateri();
    // barufindkuncipgkd(val);
};

const publikasikanmateribarut = () =>{
    let isi = doc.body.children;//("div")
    let div = "";
    for(i = 0 ; i < isi.length ; i ++){
        
        //console.log(i)
        let teks = isi[i].outerHTML;
        //console.log(teks);
        let m = teks.match(/<div>(.*)<\/div>/)[1];
        //console.log(m);
        let tekmatch = m;//teks.replace("<div>","").replace("</div>","") ;//
        div += tekmatch +"\r\n";
    }
    tes = div;
  
   console.log(tes)
}
const publikasikanmateribaru = () => {
  
   // document.formuploadmateri.kuncikd.value = oo;
        // document.formuploadmateri.jumlahpg.value = countpg;
        // document.formuploadmateri.jumlahessay.value = countess;
        document.formuploadmateri.idkelas.value = idNamaKelas;
        document.formuploadmateri.idtoken.value = idJenjang;
        document.formuploadmateri.idSekolah.value = idNamaSekolah;
        document.formuploadmateri.dibuatoleh.value = namauser;
        document.formuploadmateri.versi.value = "baru";

    document.getElementById("materiimport").innerHTML = "";
    let tglkosong = document.formuploadmateri.idtgl.value;
    let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
    let mapel = document.formuploadmateri.idmapel.value;
    let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

    let kuncikosong = document.formuploadmateri.kuncikd.value;
    let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
    let dom = document.getElementById("formuploadmateri");
    //buatkan dalam baris lain untuk _KUNCI-PG_ dan _KUNCI-KD_

   
    // console.log(data);
    // console.log(data);
    if (bolmapel && boltgl && bolkd) {
        let data = new FormData(dom);
        let t = sebelumkirimmateri();
        data.append("idmateri",t)
        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        pranalamateri.style.display = "block";
        dom.reset();
        //dom.idmateri.value = "";
        doc.body.innerHTML="";
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
    let datamapelaktiff = [];

    if (window.location.href.indexOf("gmp.html") > -1) {
        msb_obje["datamapel"] = idgurumapelmapel;
        datamapelaktiff = [idgurumapelmapel];

    } else {
        datamapelaktiff = datakdaktif.map(s => s["mapel"]).filter((x, i, a) => a.indexOf(x) == i);
        msb_obje["datamapel"] = datamapelaktiff;

    };
    //mengkoleksi KD yang terceklis untuk setiap mapel
    datamapelaktiff.forEach(s => {
        msb_obje[s] = datakdaktif.filter(d => d["mapel"] == s).map(m => m[colkd]);
    })
    let datamapelaktif = datamapelaktiff;
    //console.log(datamapelaktif)
    //console.log(msb_obje) //
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let isihtml = "";
    let opsihtmlmapel = `<option value="" selected>PILIH MAPEL</option>`;
    let opsihtmlkd = "";
    //deteksi sebaranKD di textarea

    // let teksarea = document.getElementById("idmateri");
    // let val = teksarea.value;
    // let n = val.length;
    let ada = -1;//val.indexOf("_KUNCI-KD_");
    //let batasawal = val.substring(ada, n);

    let divs = doc.getElementsByTagName('div');
    let cek = divs.length;
    let bol = false;
    for(a = 0 ; a < divs.length ; a++){
        let teks = divs[a].innerHTML;
        if(teks.indexOf("_KUNCI-KD_")>-1){
           // console.log(a +" = "+ teks);
            bol = true;
            cek = a;
            ada = a;
            break;
        }else{
           // console.log("none");
            
        }
    }
    let str_pg_d="";
    if(bol){
        str_pg_d = divs[cek].textContent;
        //console.log(str_pg_d)

    }

    if (ada == -1) {
        for (let i = 0; i < datamapelaktif.length; i++) {
            if (i == 0) {
                opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
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
        //console.log(mgrup);
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

        tabel.innerHTML = htmlrow;

        //ambil data sebaran kd dari teks area
        for (g = 0; g < mgrup.length; g++) {
            let grup = mgrup[g].split(":");
            opsihtmlmapel = `<option value="" selected>PILIH MAPEL</option>`;
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
    opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
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

const sebelumkirimmateri = () =>{
    let isi = doc.body.children;//("div")
    let div = "";
    for(i = 0 ; i < isi.length ; i ++){
        
        //console.log(i)
        let teks = isi[i].outerHTML;
        //console.log(teks);
        let m = teks.match(/<div>(.*)<\/div>/)[1];
        //console.log(m);
        let tekmatch = m;//teks.replace("<div>","").replace("</div>","") ;//
        div += tekmatch +"\r\n";
    }
    tes = div;
  
    return tes
    
}
const edt_esay = document.querySelector(".edt_esay");
edt_esay.addEventListener("click",()=>{
    select_essay();
});
const select_essay = () =>{
    let sel = doc.getSelection();
    let selrange = sel.getRangeAt(0);
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let teks, nosoal, soalExNo;
    let pertanyaan = [];
    for(i = 0 ; i < dom.length ; i++){
        teks = dom[i].innerHTML;
        if(i == 0){
            nosoal = teks.match(/(\d+)/)[0]
            soalExNo = teks.replace(nosoal+". ","");
            pertanyaan.push(soalExNo);
        }else{
            pertanyaan.push(teks);
        }
    }

    let soaljoin = pertanyaan.join("<br>")
    let html = `<div class="w3-badge w3-aqua w3-left">${nosoal}</div><ol style="list-style-type:none" start="${nosoal}" class="w3-padding w3-card-4"><li id="essay${nosoal}" class="soalessay" style="border-bottom:1px solid blue"><div id="pertanyaanessay_${nosoal}">${soaljoin}</div><div id="tomboljawaban${nosoal}"><hr><button onclick="tombolketikjawaban('${nosoal}')">Ketik Jawaban No ${nosoal}</button><br><br><sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${nosoal}')">Upload Media No ${nosoal}</button><br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div><br></li></ol>`
    let ceksoal = deteksiAllsoal();//;
    if(ceksoal.indexOf(nosoal) == -1){
        let ch = document.querySelector("#html_edt");
                if(!ch.checked){
ch.checked = true;
doc.execCommand("insertHTML",false,html);
ch.checked = false
                }else{
doc.execCommand("insertText",false,html);
                }
    }else{
        alert("Nomor soal " + nosoal + " sudah dibuat, nomor soal essay sebaiknya berurutan dari nomor sebelumnya")
    }
    
}

const deteksiAllsoal = () =>{
    let array1 = deteksinomorsoalpg();
    let array2 = deteksinomorsoalessay();
    let all = array1.concat(array2);
   // console.log(all);
    return all
  
    
}

function tanpasebarankd() {
    //let teksarea = document.getElementById("idmateri");
    let divs = doc.getElementsByTagName('div');
    let cek = divs.length;
    let bol = false;
    for(a = 0 ; a < divs.length ; a++){
        let teks = divs[a].innerHTML;
        if(teks.indexOf("_KUNCI-KD_")>-1){
           // console.log(a +" = "+ teks);
            bol = true;
            cek = a;
            break;
        }else{
            console.log("none");
        }
    }

    let arr;
    let jsS = {};
    if (window.location.href.indexOf("gmp.html") > -1) {
        arr = `_KUNCI-KD_${idgurumapelmapel}_5.1:1`;
        let gmp = `${idgurumapelmapel}_5.1`
        jsS[gmp] = ["1"];
    } else {
        arr = "_KUNCI-KD_NONKD_5.1:1";
        let Ngmp = `NONKD_5.1`
        jsS[Ngmp] =  ["1"];;

    }

    if(bol){
        divs[cek].innerHTML = arr;//"_KUNCI-PD_" + arrceklis.join(",");
    }else{
        let creatediv = doc.createElement("div");
        creatediv.innerHTML = arr;//"_KUNCI-PG_" + arrceklis.join(",")
        doc.body.appendChild(creatediv);
        
    }
    document.formuploadmateri.kuncikd.value = JSON.stringify(jsS)   ;
    
    alert("Non Sebaran KD sudah disimpan")
};


const editfilemateri = (id) => {

    let file = kronologijson[id]; //.idmateri;
    let versi = file.versi
    //console.log(versi);
    let idbaris = file.idbaris;
    let validmapel = file.idmapel
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

    // let isiteks = document.formuploadmateri.idmateri;
    let isiteks = doc.body;;

    idmapel.value = file.idmapel;
    iddurasi.value = file.iddurasi;
    idaksessiswa.value = file.idaksessiswa;
    jenistagihan.value = file.jenistagihan;
    idtgl.value = stringForDateTimeLocal(file.idtgl);//file.idtgl;
    idtglend.value = stringForDateTimeLocal(file.idtglend);//file.idtglend;
    let botakin = file.idmateri;
    let idm = encodeURIComponent(botakin)

    //generatetoken datamateri[par].crtToken
    document.formuploadmateri.crtToken.value = file.crtToken;




    tombolpublikasikan.setAttribute("onclick", `editfilematerikeserver('${idbaris}')`)
    tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
    tombolpublikasikan.setAttribute("class", "wa w3-red w3-hover-aqua");
    tombolpublikasikan.innerHTML = "EDIT KONTEN MATERI"

    // $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) { })
    fetch(linkmateri + "&action=previewriwayat&idmateri=" + idm).then(m => m.json())
        .then(k => {

            //isiteks.textContent = k;
            //console.log(k);
            let katob = versi == "baru"?brkline(k).kunci:brkline2(k).kunci;
            let kunci =window.atob(katob)
            let kd = versi == "baru"? brkline(k).kd:brkline2(k).kd;
            // isiteks.innerHTML = brkline(k).teks + "" + kunci +  kd
            //doc.focus();
            let crd = doc.createElement("div");
            crd.innerHTML =  versi == "baru"?brkline(k).teks:brkline2(k).teks;
            doc.body.appendChild(crd);
            crd = doc.createElement("div");
            crd.innerHTML = "_KUNCI-PG_" + kunci;
            doc.body.appendChild(crd);
            crd = doc.createElement("div");
            crd.innerHTML = "_KUNCI-KD_" +kd;
            doc.body.appendChild(crd);
            
            // doc.execCommand("insertText",false,brkline(k).teks)
            //doc.execCommand("insertText",false,kunci)
            //doc.execCommand("insertText",false,kd)


            let ingindownload = confirm("Apakah Anda ingin mendownload materi ini juga?");
            if (ingindownload) {
                downloadfiledraft(k, validmapel);
            }
            //pratinjaubuatmateri();
        }).catch(er => {
            isiteks.textContent = er
        })
    //alert("Anda membuka link upload materi")
}


const editfilematerikeserver = (id) => {
    document.getElementById("materiimport").innerHTML = "";
    document.formuploadmateri.idkelas.value = idNamaKelas;
    document.formuploadmateri.idtoken.value = idJenjang;
    document.formuploadmateri.idSekolah.value = idNamaSekolah;
    document.formuploadmateri.dibuatoleh.value = namauser;
    document.formuploadmateri.versi.value = "baru";
    let tglkosong = document.formuploadmateri.idtgl.value;
    let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
    let mapel = document.formuploadmateri.idmapel.value;
    let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

    let kuncikosong = document.formuploadmateri.kuncikd.value;
    let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
    if (bolmapel && boltgl && bolkd) {
        let dom = document.getElementById("formuploadmateri");

        let data = new FormData(dom);
        let t = sebelumkirimmateri();
        data.append("idmateri",t)
        data.append("idbaris", id)

        pranalamateri.style.display = "block";
        dom.reset();
        // dom.idmateri.value = "";
        doc.body.innerHTML = "";
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
            .catch(er => idpracetak.innerHTML = "Maaf, terjadi kesalahan: <br> Error Code" + er);



    }
    // localStorage.removeItem("draftmateri")
    // tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
    // tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
    // tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
    // tombolpublikasikan.innerHTML = "PUBLIKASIKAN";
}

const tombolketikjawaban = (p) =>{
    alert("Siswa mencoba menjawab essay no " + p + " dengan cara mengetik")
}
const tomboluploadjawaban = (p) =>{
    alert("Siswa mencoba menjawab essay no " + p + " dengan cara mengunggah dokumen")
}

function brkline2(teks) { //coba
    var tek = teks.split("\r\n"); //cari sKetiap ganti baris;
    var inn = "";
    var indexpotojawaban = 0;
    var kodeganti = ["_JUDUL_", "_PECAHAN BIASA_"];

    //   var keypg = document.getElementById("keypg");
    //   if (keypg == null) {
    //       var scrippg = document.createElement("script");
    //       scrippg.setAttribute("id", "keypg");
    //       scrippg.innerHTML = "var keybase=''";
    //       tttkeybase.innerHTML = "";

    //       document.body.appendChild(scrippg);

    //   } else {
    //       keypg.innerHTML = "var keybase=''";
    //       tttkeybase.innerHTML = "";
    //   }
    //////////////////////////////////////////////////////////////
    if (localStorage.hasOwnProperty("keybase")) {
        localStorage.removeItem("keybase")
    }
    if (localStorage.hasOwnProperty("kuncikd")) {
        localStorage.removeItem("kuncikd")
    }

    for (x = 0; x < tek.length; x++) {
        var asal = tek[x]; // dalam satu baris ini, misal baris pertama:
        var cJudul = jumlahdobel(asal, "_JUDUL_");
        var cGambar = jumlahdobel(asal, "_GAMBAR_");
        var cPecBiasa = jumlahdobel(asal, "_PECAHAN-BIASA_");
        var cPecCamp = jumlahdobel(asal, "_PECAHAN-CAMPURAN_");


        //inn += "ke-"+ x +" = " + asal + "<hr style='border-bottom:1px solid red'/>";
        //inn += "ke-"+ x + " = JUDUL = " + cJudul +", GAMBAR = " + cGambar +", Pecahan Biasa = " + cPecBiasa +", Pecahan Campuran = " + cPecCamp + "<hr style='border-bottom:1px solid blue'/>";
        var katajadi = "";

        if (asal.indexOf("_JUDUL_") > -1) {
            var hJudul;
            var arjud = asal.split("_JUDUL_");
            var katakonversi;
            for (jd in arjud) {
                if (jd > 0) {
katakonversi = katajadireplace(arjud[jd]);
//hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
//hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + katakonversi + "</h4>";
hJudul = "<h4 class='w3-card-4 w3-blue-grey w3-center w3-round-xxlarge'>" + katakonversi + "</h4>";
//katajadi += hJudul ;
katajadi += hJudul + "<br/>";
                }
            }
        } else if (asal.indexOf("_ESSAY-NO_") > -1) {
            var esayno = asal.split("_ESSAY-NO_")[0];
            var tekspisah = asal.replace("_ESSAY-NO_", "").split(" ");
            katajadi += "<div class='w3-badge w3-aqua w3-left'>" + tekspisah[0] + "</div><ol style='list-style-type:none' start='" + tekspisah[0] + "'  class='w3-padding w3-card-4'><li id='essay" + tekspisah[0] + "' class='soalessay' style='border-bottom:1px solid blue'><div id='pertanyaanessay_" + tekspisah[0] + "'>";
            for (es in tekspisah) {
                if (es > 0) {
katajadi += katajadireplace(tekspisah[es]);
                }
            }


            katajadi += "</div><div id='tomboljawaban" + tekspisah[0] + "'><hr/>";//</div>";
            katajadi +=`<button onclick="tombolketikjawaban('${tekspisah[0]}')">Ketik Jawaban No ${tekspisah[0]}</button><br><br><sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${tekspisah[0]}')">Upload Media No ${tekspisah[0]}</button><br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`
            katajadi += "<br/></li></ol>"
        } else if (asal.indexOf("_START-TABEL_") > -1) {
            katajadi += asal.replace("_START-TABEL_", "<div style='overflow-x:auto'><table class='versi-table'>");
            //katajadi += asal.replace("_START-TABEL_","<table class='versi-table'>");
        } else if (asal.indexOf("_START-TABEL-OPSI_") > -1) {
            katajadi += asal.replace("_START-TABEL-OPSI_", "<hr style='border-top:1px solid olive'/><div style='overflow-x:auto'><table class='versi-table'>");
            //katajadi += asal.replace("_START-TABEL_","<table class='versi-table'>");
        } else if (asal.indexOf("<|HEADER|>") > -1) {
            katajadi += "<tr>";
            var tekarray = asal.split("<|HEADER|>");
            var katakonversi;
            for (th in tekarray) {
                katakonversi = katajadireplace(tekarray[th]);
                //katajadi +="<th>" + tekarray[th] +"</th>";
                katajadi += "<th>" + katakonversi + "</th>";
            }
            katajadi += "</tr>"
        } else if (asal.indexOf("<|>") > -1) {
            katajadi += "<tr>";
            var tekarray = asal.split("<|>");
            var katakonversi;
            for (td in tekarray) {
                katakonversi = katajadireplace(tekarray[td]);
                katajadi += "<td>" + katakonversi + "</td>"
            }
            katajadi += "</tr>"
            //inn +=  "<table class='versi-table'>";
        } else if (asal.indexOf("_SELESAI-TABEL_") > -1) {
            katajadi += "</table></div><br/>";
            //katajadi +=  "</table><br/>";

        } else if (asal.indexOf("_SELESAI-TABEL-OPSI_") > -1) {
            //katajadi +=  "</table></div><br/>";
            katajadi += "</table><br/></li></ol>";

        } else if (asal.indexOf("_PG_") > -1) {
            var Q_PG = "";
            var teks = asal.replace("_PG_", ""); // return = 1 teks pertanyaaan bla bla bla
            var arrTeks = teks.split(" ");
            nosoal = arrTeks[0];
            Q_PG += "<div class='w3-badge w3-left'>" + nosoal + "</div><ol style='list-style-type:decimal' start='" + nosoal + "' class='w3-padding w3-card-4'><li id='soalke-" + nosoal + "' class='calcnosoal' style='list-style-type:none'>";
            var katakonversi;
            for (ss in arrTeks) {
                if (ss > 0) {
katakonversi = katajadireplace(arrTeks[ss]);
Q_PG += katakonversi;
                }
            }
            //katajadi = Q_PG + "<hr style='border-top:1px solid olive'/>";
            katajadi = Q_PG;//+ "<hr style='border-top:1px solid olive'/>";

        } else if (asal.indexOf("_OPSI-PG_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
            }
            var katakonversi;
            for (tt in arpg) { //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
                if (tt > 0) { // hindari array 0=1A
katakonversi = katajadireplace(arpg[tt]);
//hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
opsipg += katakonversi
                }
            }
            if (abjad === "D") {
                opsipg += "</label></li></ol></li></ol>";
            } else {
                opsipg += "</label></li>";
            }


            katajadi += opsipg;



        } else if (asal.indexOf("_OPSI-PG-C_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG-C_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
            }
            var katakonversi;
            for (tt in arpg) { //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
                if (tt > 0) { // hindari array 0=1A
katakonversi = katajadireplace(arpg[tt]);
//hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
opsipg += katakonversi
                }
            }
            if (abjad === "C") {
                opsipg += "</label></li></ol></li></ol>";
            } else {
                opsipg += "</label></li>";
            }


            katajadi += opsipg;

        } else if (asal.indexOf("_POTO-JAWABAN-TUGAS_") > -1) {
            var tekssplit = asal.replace("_POTO-JAWABAN-TUGAS_", "").split(" ")[0]; // return: 1/2/3
            var mediaessay = "";
            var bnyk = tekssplit.split("/");
            for (de in bnyk) {
                mediaessay += bnyk[de] + ", ";
            }
            katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban Tugas No";
            katajadi += " " + mediaessay + " dengan menguploadnya di sini: <br/><br/>";
            katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpototugas" + indexpotojawaban + "' id='label" + indexpotojawaban + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
            katajadi += "<div class='potoessay' id='" + tekssplit + "' style='overflow-x:auto'><div id='mediapreview" + indexpotojawaban + "'>";
            katajadi += "<img src='https://1.bp.blogspot.com/-q57d59JTX8g/Xa-kAy6T0XI/AAAAAAAAOSo/seM01RU3Q_Q7BvLm73wC09BBsQMs05pYACLcBGAsYHQ/s320/LOGO%2BLAMASO.png'  style='width:145px;margin:auto;border:1px solid blue'/>";
            katajadi += "</div></div>";

            katajadi += "<input type='file' id='iduploadpototugas" + indexpotojawaban + "' onchange='uploadpototugas(" + indexpotojawaban + ")' style='display:none'/><div  id='filejawaban" + indexpotojawaban + "' class='jawabanfile' style='display:none' ></div>"


            katajadi += "</div>";

            indexpotojawaban += 1;


        } else if (asal.indexOf("_KUNCI-PG_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-PG_", "").replace(/\s+/g, "").split(","); // hasilnya: 1A,2B,3C
            var arrkunci = [];
            for (o = 0; o < tekskunci.length; o++) {
                arrkunci.push(tekskunci[o])
            }
            basekunci = window.btoa(arrkunci);
            var kunci = basekunci;
            //basekunci = arrkunci;//window.btoa(arrkunci);
            //localStorage.setItem("keybase", basekunci)
            //localStorage.setItem("artikeybase", window.atob(basekunci))

            //   var keypg = document.getElementById("keypg");
            //     keypg.setAttribute("style", "display:none")

            //   //var teksscript = document.createTextNode("var keybase='"+basekunci+"'");
            //   //	keypg.appendChild(teksscript);
            //   keypg.innerHTML = "var keybase='" + basekunci + "'";
            //   tttkeybase.innerHTML = basekunci;

        } else if (asal.indexOf("_KUNCI-KD_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>");//.split(":");
            let ar = []
            let ob = {};
            for (i = 0; i < tekskunci.length; i++) {

                // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
                ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
                ar.push(ob)
            }
            var kdkd = tekskunci.join("<br>");//.join("<br>");
            //   localStorage.setItem("kuncikd", JSON.stringify(ob)) ;// ---> sudah objek array



        } else {
            var katakonversi = katajadireplace(asal);
            katajadi += katakonversi + "<br/>";

        }
        inn += katajadi; //+ "&lt;br/&gt;" ;
    }
    let data = {};
    data.teks = inn;
    data.kunci = kunci;
    data.kd = kdkd;

    // return inn
    return data
}


function openCityy(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        
    }
    let tutupsemuaisiadmdulu = document.querySelectorAll(".isiadm");
    tutupsemuaisiadmdulu.forEach(t=>{t.style.display="none"});

    let frst = document.querySelectorAll(".first_isiadm");
    let tab = document.querySelectorAll(".btnadm");
    let btn;// = frst.getAttribute("id"); //
    for(a = 0 ; a < frst.length ; a++){
        btn = frst[a].getAttribute("id");
        frst[a].style.display = "block";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

    tab.forEach(el => {el.classList.remove("w3-green")})
    //if(cityName == "buat_prota"){
        tab[0].classList.add("w3-green")
        tab[4].classList.add("w3-green")
    
}

const select_prota  = document.querySelector(".select_prota");
select_prota.addEventListener("change",async()=>{
    let opsi = select_prota.options;
    let select = opsi.selectedIndex;
    let val_opsi = opsi[select].value;
    let teks_opsi = opsi[select].text;
    //alert(val_opsi);
    //hapus dulu elementduplikat
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");
    // isikan identitas dulu;
    document.querySelector(".tdprota_sekolah").innerHTML = idNamaSekolah;
    document.querySelector(".tdprota_mapel").innerHTML = teks_opsi;
    document.querySelector(".tdprota_tapel").innerHTML = idTeksTapel;
    document.querySelector(".spanprota_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".spanprota_namakepsek").innerHTML = idNamaKepsek;
    document.querySelector(".spanprota_nipkepsek").innerHTML = "NIP. " + idNipKepsek;
    document.querySelector(".spanprota_titimangsa").innerHTML = "14 Juli 2021";
    document.querySelector(".spanprota_gmpkelas").innerHTML = idJenisGuru +" " + idgurumapelmapel;
    document.querySelector(".spanprota_namaguru").innerHTML = namauser;
    document.querySelector(".spanprota_nipguru").innerHTML = "NIP. " + idNipGuruKelas;
    /// Untuk parameter Tombol Simpan Server ;
    //onclick="serveradm('prt_prota_mapel',1,2)" class="btnserver_protatematik
    let btnserver = document.querySelector(".btnserver_protamapel");
    let judulserver = "PROGRAM TAHUNAN MAPEL "+ teks_opsi;
    btnserver.setAttribute("onclick",`serveradm('prt_prota_mapel','${judulserver}',1,1)`);
    
    /// INI MENGAMBIL DATA YANG BELUM PERNAH DIBUAT
    //sumber data KD;
    if(buateditorkdaktif.length === 0){
        loadingtopbarin("loadingtopbar");
        await kurikulumdiamdiam();
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    };
    //konfig data:
    let dataKD3 = buateditorkdaktif.filter(s => s["indikatorkd3"] !== "" && s["mapel"] === val_opsi);
    //let dataKD4 = buateditorkdaktif.filter(s => s["mapel"] === val_opsi);
    //tolak untuk default;
    let tabel = document.querySelector(".tabel_prota");//
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let crtd = "";
    let no = 1;
    if(val_opsi !=="default"){
        for(i=0 ; i < dataKD3.length ; i++){
            crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}</td><td contenteditable="true" class="w3-center"></td></tr><tr><td>${(no + 1)}</td><td>${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td contenteditable="true" class="w3-center"></td></tr>`;
            no = no + 2;
        }
        tbody.innerHTML = crtd;
    }
})



const select_prosem  = document.querySelector(".select_prosem");
select_prosem.addEventListener("change",async()=>{
    let opsi = select_prosem.options;
    let select = opsi.selectedIndex;
    let val_opsi = opsi[select].value;
    let teks_opsi = opsi[select].text;
    //alert(val_opsi);
    // isikan identitas dulu;
    //jaga-jaga jika udah buka simpan server adm
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");

    document.querySelector(".tdprosem_sekolah").innerHTML = idNamaSekolah;
    document.querySelector(".tdprosem_mapel").innerHTML = teks_opsi;
    document.querySelector(".tdprosem_semester").innerHTML = idSemester + (idSemester==1?" (Ganjil)":" (Genap)");
    document.querySelector(".h_tapel").innerHTML = "TAHUN PELAJARAN "+ idTeksTapel;
    document.querySelector(".spanprosemmapel_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".spanprosemmapel_namakepsek").innerHTML = idNamaKepsek;
    document.querySelector(".spanprosemmapel_nipkepsek").innerHTML = "NIP. " + idNipKepsek;
    document.querySelector(".spanprosemmapel_titimangsa").innerHTML = "14 Juli 2021";
    document.querySelector(".spanprosemmapel_gmpkelas").innerHTML = idJenisGuru +" " + idgurumapelmapel;
    document.querySelector(".spanprosemmapel_namaguru").innerHTML = namauser;
    document.querySelector(".spanprosemmapel_nipguru").innerHTML = "NIP. " + idNipGuruKelas;
    
    /// INI MENGAMBIL DATA YANG BELUM PERNAH DIBUAT
    let btnserver = document.querySelector(".btnserver_prosemmapel");
    let judulserver = "PROGRAM SEMESTER MAPEL "+ teks_opsi;
    btnserver.setAttribute("onclick",`serveradm('prt_prosem_mapel','${judulserver}',2,1)`);

    //sumber data KD;
    if(buateditorkdaktif.length === 0){
        loadingtopbarin("loadingtopbar");
        await kurikulumdiamdiam();
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    };
    //konfig data:
    let dataKD3 = buateditorkdaktif.filter(s => s["indikatorkd3"] !== "" && s["mapel"] === val_opsi);
    //let dataKD4 = buateditorkdaktif.filter(s => s["mapel"] === val_opsi);
    //tolak untuk default;
    let tabel = document.querySelector(".tabel_prosem_mapel");//
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let crtd = "";
    let no = 1;
    if(val_opsi !=="default"){
        for(i=0 ; i < dataKD3.length ; i++){
            //crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}</td><td contenteditable="true" class="w3-center"></td></tr><tr><td>${(no + 1)}</td><td>${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td contenteditable="true" class="w3-center"></td></tr>`;
            crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}<hr class="w3-border-bottom">${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td>Materi Pokok ${no}</td><td>...JP</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`
            no = no + 1;
        }
        tbody.innerHTML = crtd;
    };

    configTooltip()

})

const configTooltip = () =>{
    let tabler = document.querySelector(".tabel_prosem_mapel");//.getElementsByTagName("tbody")[0];
    let tbody = tabler.getElementsByTagName("tbody")[0]
    let rIndex; 
    let cIndex,parenta,kolo,brs
            // table rows
    for(var i = 1; i < tabler.rows.length; i++){
        // row cells
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            
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
                parenta = this.parentElement.nodeName;
                rIndex = this.parentElement.rowIndex;
                cIndex = this.cellIndex;//+1;
    
                //tampilkan tooltip
                let tdfokus = this;
    
                let tagclass = this.hasAttribute("class");
                let ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                let lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                document.querySelector("#tooltiptabel").style.top=ttop;
                document.querySelector("#tooltiptabel").style.left=lleft;
                document.querySelector("#tooltiptabel").style.display="block";
                
                let tomboltd1 = document.querySelector(".btntooltip1")
                let tomboltd2 = document.querySelector(".btntooltip2");
                let tdtombol3 = document.querySelector(".btntooltip3");
                let tdtombol4 = document.querySelector(".btntooltip4");
                let tdtombol5 = document.querySelector(".btntooltip5");
                let cekHijau = false; /// anggap semuanya tidak punya class hijau
                let cekMerah = false;
                let dataclassname = this.className;
                if(this.hasAttribute("class")){
                    let dataclassnamee = this.className;
                    if(dataclassnamee.indexOf("w3-green")== -1){
                        cekHijau = true;
                    }else{
                        cekHijau = false;
                    }
                    
                    if(dataclassnamee.indexOf("w3-red")== -1){
                        cekMerah = true;
                    }else{
                        cekMerah = false
                    }
                }else{
                    cekHijau = true;
                    cekMerah = true
                }

                if(cekHijau){
                    document.querySelector(".btntooltip1").innerHTML = "Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-light-gray","w3-green");
                }else{
                    document.querySelector(".btntooltip1").innerHTML = "Hapus Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-green","w3-light-gray");
                }
                
                tomboltd1.onclick=function(){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.setAttribute("class","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")== -1){
                        tdfokus.className = tdfokus.className.replace("w3-red","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-green");
                    }
                }


                if(cekMerah){
                    tomboltd2.innerHTML = "Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-light-gray","w3-red");
                }else{
                    tomboltd2.innerHTML = "Hapus Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-red","w3-light-gray");
                }

                tomboltd2.onclick = function (){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.setAttribute("class","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-red")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")> -1){
                        tdfokus.className = tdfokus.className.replace("w3-green","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-red");
                    }
                }

                if(kolo > 4){

                
                        if(this.innerHTML == ""){
                            tdtombol3.innerHTML = "&checkmark;"
                        }else{
                            tdtombol3.innerHTML = "Hapus &checkmark;";
                        }

                        tdtombol3.onclick = function(){
                            if(tdfokus.innerHTML ==""){
                                tdfokus.innerHTML = "&checkmark;"
                                tdtombol3.innerHTML = "Hapus &checkmark;";
                            }else{
                                tdfokus.innerHTML = "";
                                tdtombol3.innerHTML = "&checkmark;";
                                
                            }
                        }
                }else{
                    if(this.hasAttribute("contenteditable")){
                        tdtombol3.innerHTML ="Kunci Edit";
                    }else{
                        tdtombol3.innerHTML ="Buka Edit";
                    }
                    tdtombol3.onclick= function (){
                        //console.log(tdfokus);
                        if(tdfokus.hasAttribute("contenteditable")){
                            tdfokus.removeAttribute("contenteditable");
                            tdtombol3.innerHTML ="Buka Edit";
                        }else{
                            
                            tdfokus.setAttribute("contenteditable","true");
                            tdtombol3.innerHTML ="Kunci Edit";
                        }
                    }
                }
                tbody = tabler.getElementsByTagName("tbody")[0];
                let nlr;
                tdtombol4.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan menghapus baris ke-" + brs +"?")
                    if(conf){
                        tbody.deleteRow(indekbaris);//
                        //perbaiki nourut
                        tabler = document.querySelector(".tabel_prosem_mapel")
                        tbody = tabler.getElementsByTagName("tbody")[0];
                        
                        for(a=0;a<tbody.rows.length;a++){
                            tbody.rows[a].cells[0].innerHTML = (a+1);
                        }
                       
                    } 
                    
                }
                tdtombol5.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan ingin menambahkan baris lagi setelah bari ini?")
                    let nlr;
                    if(conf){
                         nlr = tbody.insertRow(brs);
                    

                        let ntable = document.querySelector(".tabel_prosem_mapel")
                        let ntbody = ntable.getElementsByTagName("tbody")[0];
                        for(a=0;a<ntbody.rows[0].cells.length;a++){
                            let tdd = nlr.insertCell(a);
                            tdd.innerHTML="";
                        }
                        for(b = 0 ; b < ntbody.rows.length ; b++){
                            tbody.rows[b].cells[0].innerHTML = (b+1);
                        }
                        configTooltip();
                    }
                }
                //tabler = document.querySelector(".tabel_prosem_mapel")
            };
        }
    }
}


const dataadmsimpananguru = async (tag,output) =>{
    loadingtopbarin("loadingtopbar");
    //alert("tag = " +tag +"\r\n output class= "+output);
    let div = document.querySelector("."+output);
    let hps = document.querySelectorAll(".result_hapus");
    hps.forEach(el=>el.innerHTML="")
    //let divv = document.querySelector(".ket_"+output);
    div.innerHTML = "<i class='fa fa-spin fa-spinner w3-large'></i>";
    let tab = "simpanAdm"
        let tabel = [[["barisini"],["tag"],["html"],["oleh"],["judul"],["idguru"],["versi"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
        // //sekarang ujicoba untuk post
        // let isii = ["prota","taghtmltes",namauser,"judul tes",idguru,"mapel tes"];
        // let isi = JSON.stringify(isii);
        // datakirim.append("tabel",isi);
        // //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
        // fetch(urladm+"?action=simpanbarisketaburut",{
        //     method:"post",
        //     body:datakirim
        // }).then(m => m.json())
        // .then(r => {
        //    console.log(r);
        // })
        // .catch(er => console.log(er))


        //dibawah ini get udah fix
        await fetch(urladm+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           // console.log(r);
            let dt = r.data;
            let filter = dt.filter(s => s.tag == tag && s.idguru == idguru && s.status !== "hapus");
            if(filter.length>0){
                let tt = "result"+tag+"simpananguru" ;//resultprotasimpanangur
                div.innerHTML  = `<a href="javascript:firstPage()" Title="Halaman Awal" class="w3-btn w3-border w3-green firstpagination">Awal</a><a href="javascript:prevPage()" class="previewpagination w3-btn w3-border warnaeka"> &lt;&lt; Sebelumnya </a> Halaman <span class="allpagepagination"></span> <a href="javascript:nextPage()" class="nextpagination w3-btn w3-border warnaeka">Berikutnya &gt;&gt;</a> <a href="javascript:lastPage()" Title="Halaman Awal" class="w3-btn w3-border w3-green lastpagination">Akhir</a> | <a href="javascript:deletePage('kliklihatsimpan${tag}')" class="w3-red w3-btn w3-border warnaeka" title="Hapus Administrasi ini"><i class="fa fa-trash"></i> </a>`;
                tespagination ("nextpagination", "previewpagination",tt,"allpagepagination",filter);
                changePage(1);
            }else{
                div.innerHTML ="Tidak ada data administrasi ini yang tersimpan di server."
            }
            //div.innerHTML = html;
            //console.log(filter);
            clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
        }).catch(er=>console.log(er));

}


const printadm = (c,portr=true) =>{
        //jaga-jaga untuk element class yang duplikat?
        let dom = document.querySelector("."+c);
        let indom = dom.innerHTML;//.textContent;
        
        let noSpace =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/       /g,"");
        
        var root = window.location.origin;
        
        let el = document.getElementById("iframeprint");
        let doc = el.contentDocument;
        let head = doc.head;
        let body = doc.body;
       
        //isikan HEAD dengan title, style, link, dll.
        head.innerHTML = "<title>E-DURASA ADMINISTRASI</title>";
        head.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    
        //head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
        head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">';
    
        head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';
        head.innerHTML += '<link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'
    
        head.innerHTML +='<link rel="stylesheet" href="https://syahandrianeda.github.io/syahandrianeda/css/stylegurukelas.css">'
        //head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;
    
        if(portr){
            head.innerHTML += `<style type="text/css" media="print">
            @media print {
                html,body{height:100%;width:100%;margin:0;padding:0}
                
                 @page {
                    size: A4 portrait;
                   
                    
                    }
            }
            </style>`;
        }else{
            head.innerHTML += `<style type="text/css" media="print">
            @media print {
                html,body{margin:0;padding:0}
                
                 @page {
                    size: A4 landscape;
                    
                    
                    }
            }
            </style>`;
        }
        
        
    
        body.innerHTML = indom;//noSpace;
    
        window.frames["iframeprint"].focus();
        window.frames["iframeprint"].print();
}
const serveradm = (c,judul, indek_tag=0, indek_versi=0) =>{
        loadingtopbarin("loadingtopbar");
        let dom = document.querySelector("."+c);
        let teksTag =arrTagAdm[indek_tag];
        let teksVersi = arrVersi[indek_versi];    
        let indom = dom.innerHTML;
        let nospaceE =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s/gm,"");
        let noSpace = nospaceE.replace(/contenteditable="true"|contenteditable='true'/gm, "")
        //console.log(noSpace);
        //console.log(teksTag);
        //console.log(teksVersi);
        let tab = "simpanAdm";//[[["barisini"],["tag"],["html"],["oleh"],["judul"],["idguru"],["versi"]]];
        let tabel = [[["barisini"],["tag"],["html"],["oleh"],["judul"],["idguru"],["versi"],["tanggal"],["status"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
        //sekarang ujicoba untuk post
        let isii = [teksTag,noSpace,namauser,judul,idguru,teksVersi,new Date()];
        let isi = JSON.stringify(isii);
        datakirim.append("tabel",isi);
        //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
        fetch(urladm+"?action=simpanbarisketaburut",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           //console.log(r);
           clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
           alert("Data berhasil disimpan!")
        })
        .catch(er => console.log(er))
    
    
}
//////////////////script test pagination
///https://stackoverflow.com/questions/25434813/simple-pagination-in-javascript
var btn_next;// = document.querySelector("."+next);
    var btn_prev;// = document.querySelector("."+prev);
    var listing_table;// = document.querySelector("."+output)
    var ket_listing_table;
    var page_span;// = document.querySelector("."+spanpage);
    var current_page ;//= 1;
    var records_per_page;// = 1;
    var lastpagination;
    var firstpagination;
    
    var objJson;// = obj;// another source, such as your objJson variable

const tespagination = (next, prev,output,spanpage,obj)=>{
current_page = 1;
records_per_page = 1;

objJson = obj;// another source, such as your objJson variable

btn_next = document.querySelector("."+next);
btn_prev = document.querySelector("."+prev);
lastpagination = document.querySelector(".lastpagination");
firstpagination = document.querySelector(".firstpagination");
listing_table = document.querySelector("."+output);
ket_listing_table = document.querySelector(".ket_"+output);
page_span = document.querySelector("."+spanpage);
}
function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
   
}
function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
    
}
function deletePage(fokus){
    let kon = confirm("Anda yakin akan menghapus Administrasi ini?")
    if(!kon){
        return;
    }
    loadingtopbarin("loadingtopbar");
    let ind = current_page - 1;
    let cekob = objJson[ind].barisini;
    let tag = objJson[ind].tag;
    let html =  objJson[ind].html;
    let oleh = namauser;
    let judul = objJson[ind].judul;
    let guru = objJson[ind].idguru;
    let vers = objJson[ind].versi;
    let tanggal = new Date();

    // console.log(cekob)
    // console.log(current_page);
    let key = ["barisini","tag","html","oleh","judul","idguru","versi","tanggal","status"];
    let val = [cekob,tag,html,oleh,judul,guru,vers,tanggal,"hapus"];
    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    //let tipe = JSON.stringify(type);
    
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("idbaris",cekob);
    datakirim.append("tab","simpanAdm");
    datakirim.append("tabel",tabel);
    //datakirim.append("tipe",tipe);
    fetch(urladm+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        //console.log(r);
        clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
        alert("Data Berhasil dihapus, Anda akan diarahkan untuk merefresh data tersimpan Anda.");
        document.querySelector("."+fokus).click();
    }).catch(er=>{console.log(er)})
}    
function changePage(page)
{
    // var btn_next = document.querySelector("."+next);
    // var btn_prev = document.querySelector("."+prev);
    // var listing_table = document.querySelector("."+output)
    // var page_span = document.querySelector("."+spanpage);
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    let teks =`<table class="w3-small w3-table-all ">`;

    // for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        //   for(i = dt.length-1 ;  i>=0;i--){
        //  for(i = 0 ; i < dt.length ; i++)
     for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        listing_table.innerHTML += objJson[i].html + "<br>";
        teks += `<tr><td>Jenis Administrasi</td><td>:</td><td>${(objJson[i].tag).toUpperCase()}</td></tr>
        <tr><td>Versi</td><td>:</td><td>${objJson[i].versi}</td></tr>
        <tr><td>Keterangan</td><td>:</td><td>${objJson[i].judul}</td></tr>
        <tr><td>Dibuat pada</td><td>:</td><td>${tanggalfulllengkap(objJson[i].tanggal)}</td></tr>
        `;
    }
    teks +="</table>";
    ket_listing_table.innerHTML = teks;

    page_span.innerHTML = page + " dari " + numPages();

    if (page == 1) {
        btn_prev.style.display = "none";
        firstpagination.style.display = "none";
        // btn_prev.style.visibility = "hidden";
        // lastpagination.style.visibility = "visible";
        // firstpagination.style.visibility = "hidden";
    } else {
        // lastpagination.style.visibility = "visible";
        // firstpagination.style.visibility = "visible";
        // btn_prev.style.visibility = "visible";
        firstpagination.style.display = "inline-block"
        btn_prev.style.display = "inline-block";
    }

    if (page == numPages()) {
        btn_next.style.display = "none";
        lastpagination.style.display = "none";
        // btn_next.style.visibility = "hidden";
        // lastpagination.style.visibility = "hidden";
        //firstpagination.style.visibility = "visible";
    } else {
        lastpagination.style.display = "inline-block";
        btn_next.style.display = "inline-block";
        // lastpagination.style.visibility = "visible";
        //firstpagination.style.visibility = "hidden";
        // btn_next.style.visibility = "visible";
    }

    // console.log(page)
    // console.log(numPages())
}
function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

function lastPage(){
    let hal = numPages();
    current_page = hal;
    changePage(hal);

}
function firstPage(){
    current_page = 1;
    changePage(1);
     // Validate page
    //  if (page < 1) page = 1;
    //  if (page > numPages()) page = numPages();

}
/// Bantuan tooltip semua jenis kelas tabel

const configTooltipAlltable = (classN,batas,hapus=true ) =>{
    let tabler = document.querySelector("."+ classN);//.getElementsByTagName("tbody")[0];
    let tbody = tabler.getElementsByTagName("tbody")[0]
    let rIndex; 
    let cIndex,parenta,kolo, brs
            // table rows
    for(var i = 1; i < tabler.rows.length; i++){
        // row cells
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            
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
                parenta = this.parentElement.nodeName;
                rIndex = this.parentElement.rowIndex;
                cIndex = this.cellIndex;//+1;
    
                //tampilkan tooltip
                let tdfokus = this;
    
                let tagclass = this.hasAttribute("class");
                let ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                let lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                document.querySelector("#tooltiptabel").style.top=ttop;
                document.querySelector("#tooltiptabel").style.left=lleft;
                document.querySelector("#tooltiptabel").style.display="block";
                
                let tomboltd1 = document.querySelector(".btntooltip1")
                let tomboltd2 = document.querySelector(".btntooltip2");
                let tdtombol3 = document.querySelector(".btntooltip3");
                let tdtombol4 = document.querySelector(".btntooltip4");
                let tdtombol5 = document.querySelector(".btntooltip5");
                if(hapus){
                    tdtombol4.style.display = "block";
                    tdtombol5.style.display = "block";
                }else{
                    tdtombol4.style.display = "none";
                    tdtombol5.style.display = "none";
                }
                let cekHijau = false; /// anggap semuanya tidak punya class hijau
                let cekMerah = false;
                let dataclassname = this.className;
                if(this.hasAttribute("class")){
                    let dataclassnamee = this.className;
                    if(dataclassnamee.indexOf("w3-green")== -1){
                        cekHijau = true;
                    }else{
                        cekHijau = false;
                    }
                    
                    if(dataclassnamee.indexOf("w3-red")== -1){
                        cekMerah = true;
                    }else{
                        cekMerah = false
                    }
                }else{
                    cekHijau = true;
                    cekMerah = true
                }

                if(cekHijau){
                    document.querySelector(".btntooltip1").innerHTML = "Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-light-gray","w3-green");
                }else{
                    document.querySelector(".btntooltip1").innerHTML = "Hapus Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-green","w3-light-gray");
                }
                
                tomboltd1.onclick=function(){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.setAttribute("class","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")== -1){
                        tdfokus.className = tdfokus.className.replace("w3-red","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-green");
                    }
                }


                if(cekMerah){
                    tomboltd2.innerHTML = "Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-light-gray","w3-red");
                }else{
                    tomboltd2.innerHTML = "Hapus Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-red","w3-light-gray");
                }

                tomboltd2.onclick = function (){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.setAttribute("class","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-red")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")> -1){
                        tdfokus.className = tdfokus.className.replace("w3-green","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-red");
                    }
                }

                if(kolo > batas){

                
                        if(this.innerHTML == ""){
                            tdtombol3.innerHTML = "&checkmark;"
                        }else{
                            tdtombol3.innerHTML = "Hapus &checkmark;";
                        }

                        tdtombol3.onclick = function(){
                            if(tdfokus.innerHTML ==""){
                                tdfokus.innerHTML = "&checkmark;"
                                tdtombol3.innerHTML = "Hapus &checkmark;";
                            }else{
                                tdfokus.innerHTML = "";
                                tdtombol3.innerHTML = "&checkmark;";
                                
                            }
                        }
                }else{
                    if(this.hasAttribute("contenteditable")){
                        tdtombol3.innerHTML ="Kunci Edit";
                    }else{
                        tdtombol3.innerHTML ="Buka Edit";
                    }
                    tdtombol3.onclick= function (){
                        //console.log(tdfokus);
                        if(tdfokus.hasAttribute("contenteditable")){
                            tdfokus.removeAttribute("contenteditable");
                            tdtombol3.innerHTML ="Buka Edit";
                        }else{
                            
                            tdfokus.setAttribute("contenteditable","true");
                            tdtombol3.innerHTML ="Kunci Edit";
                        }
                    }
                }
                tbody = tabler.getElementsByTagName("tbody")[0];
                let nlr;
                tdtombol4.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan menghapus baris ke-" + brs +"?")
                    if(conf){
                        tbody.deleteRow(indekbaris);//
                        //perbaiki nourut
                        tabler = document.querySelector("."+ classN)
                        tbody = tabler.getElementsByTagName("tbody")[0];
                        
                        for(a=0;a<tbody.rows.length;a++){
                            tbody.rows[a].cells[0].innerHTML = (a+1);
                        }
                       
                    } 
                    
                }
                tdtombol5.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan ingin menambahkan baris lagi setelah bari ini?")
                    let nlr;
                    if(conf){
                         nlr = tbody.insertRow(brs);
                    

                        let ntable = document.querySelector("."+ classN)
                        let ntbody = ntable.getElementsByTagName("tbody")[0];
                        for(a=0;a<ntbody.rows[0].cells.length;a++){
                            let tdd = nlr.insertCell(a);
                            tdd.innerHTML="";
                        }
                        for(b = 0 ; b < ntbody.rows.length ; b++){
                            tbody.rows[b].cells[0].innerHTML = (b+1);
                        }
                        configTooltipAlltable(classN,kolo,hapus);
                    }
                }
                //tabler = document.querySelector("."+ classN))
            };
        }
    }
}

const select_protatematik = document.querySelector(".selectprotaversi_tematik");
select_protatematik.addEventListener("change",()=>{
    //.tabel_prota_tematik;
    let opsi = select_protatematik.options;
    let select = opsi.selectedIndex;
    let val_opsi = opsi[select].value;
    let teks_opsi = opsi[select].text;
    //alert(val_opsi);
    // isikan identitas dulu;
    //jaga-jaga jika udah buka simpan server adm
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");
    document.querySelector(".tdversitematik_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".tdversitematik_kelassemester").innerHTML = idJenjang +" / " + detectSemesterBerdasarkan("tema",teks_opsi);
    document.querySelector(".tdversitematik_tapel").innerHTML = idTeksTapel;

   

    document.querySelector(".spanprotatematik_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".spanprotatematik_namakepsek").innerHTML = idNamaKepsek;
    document.querySelector(".spanprotatematik_nipkepsek").innerHTML = "NIP. " + idNipKepsek;
    document.querySelector(".spanprotatematik_titimangsa").innerHTML = "14 Juli 2021";
    document.querySelector(".spanprotatematik_gmpkelas").innerHTML = idJenisGuru +" " + idgurumapelmapel;
    document.querySelector(".spanprotatematik_namaguru").innerHTML = namauser;
    document.querySelector(".spanprotatematik_nipguru").innerHTML = "NIP. " + idNipGuruKelas;
    configTooltipAlltable('tabel_prota_tematik',8,false);
    /// Untuk parameter Tombol Simpan Server ;
    //onclick="serveradm('prt_prota_mapel',1,2)" class="btnserver_protatematik
    let btnserver = document.querySelector(".btnserver_protatematik");
    let judulserver = "PROGRAM TAHUNAN "+ teks_opsi;
    btnserver.setAttribute("onclick",`serveradm('prt_prota_tematik','${judulserver.toUpperCase()}',1,2)`);
    let data = DataKDKurtilas["kelas"+idJenjang];
    //console.log(data);
    let tabelnya = document.querySelector(".tabel_prota_tematik");//.getElementsByClassName("tbody")[0];
    if(val_opsi !== "default"){
        let teks = data.filter(s => s[val_opsi])[0];
        tabelnya.rows[1].cells[0].innerHTML= val_opsi +"<br>" + teks[val_opsi];
        tabelnya.rows[1].cells[1].innerHTML= "Subtema 1 <br>" + teks["Subtema 1"];
        tabelnya.rows[7].cells[0].innerHTML= "Subtema 2 <br>" + teks["Subtema 2"];
        tabelnya.rows[13].cells[0].innerHTML= "Subtema 3 <br>" + teks["Subtema 3"];
        if(idJenjang>3){
            tabelnya.rows[19].cells[0].innerHTML= "Pembiasaan / Literasi / Proyek" ;//+ teks["Subtema 4"];
            
        }else{
            tabelnya.rows[19].cells[0].innerHTML= "Subtema 4 <br>" + teks["Subtema 4"]; ;//+ teks["Subtema 4"];

        }
    }

})
//selectprotaversi_tematik;
const detectSemesterBerdasarkan = (kriteria, namatema)=>{
    let teks ="";
    let notema = namatema.replace("Tema ","");
    let indekstema = parseInt(notema);
    let jenjang = idJenjang;
    if(jenjang >= 4 && indekstema >= 6){
        teks = "2 (Genap)"
    }else if(jenjang <= 3 && indekstema >= 5){
        teks = "2 (Genap)"
    }else{
        teks = "1 (Ganjil)"
    }
    return teks

}