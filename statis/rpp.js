
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
    tampilinsublamangurukelas("administrasiguru")
}
const previewrpp = () =>{
    document.getElementById("prev_rpp").style.display = "block";
    let dataisian = obj_isianrpp();
    let datarpp =dataisian.objek[0];
    console.log(datarpp)
    document.querySelector("#prt_mapel").innerHTML = datarpp.rpp_jenistematik + ": "+ JSON.stringify(datarpp.mapel_dipilih).replace(/["']/g, " ") ;

    document.querySelector("#prt_kelas").innerHTML = idNamaKelas + " / "+ datarpp.rpp_semester;
    document.querySelector("#prt_judul").innerHTML = datarpp.rpp_judul;
    document.querySelector("#prt_tema").innerHTML = datarpp.rpp_tema;
    document.querySelector("#prt_tgl").innerHTML = (datarpp.rpp_adabatastanggal == "true" ? tanggalfull(datarpp.rpp_tglawal) +" s/d " + tanggalfull(datarpp.rpp_tglakhir): tanggalfull(datarpp.rpp_tglawal));
    document.querySelector("#prt_tujuanpembelajaran").innerHTML = datarpp.rpp_tujuanpembelajaran; 
    document.querySelector("#prt_langkahpembelajaran").innerHTML = datarpp.rpp_langkahpembelajaran; 
    document.querySelector("#prt_penilaian").innerHTML = datarpp.rpp_penilaian; 
    

}

const obj_isianrpp = () =>{
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


        }else{
            obj[atsetdata]=v
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