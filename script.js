const obj = {
    "params": [
        {
            "initVal": "initKey",
            "action": "login",
            "token": "letMeIn",
            "dataObj": {"name":"Kil",
                        "email":"Roy",
                        "message":"WasHere!",
                    "subject":"Vibes n Inshallah!"}
        }
    ]
  };
  const localVar={};
  localVar["homeCounter"]=0;
  const prevHTML = document.querySelectorAll(".carsgohere")[0];
  const newHTML = document.querySelectorAll(".ltn__shop-details-area")[0];
  const mom = document.querySelectorAll(".ltn__shop-details-large-img")[0];
  const kids = document.querySelectorAll(".single-large-img");
  const carsLoading = document.querySelectorAll(".carsloading")[0];

  const serverURL = window.location.origin.includes("127.0.0.1")?"http://127.0.0.1:8080/":"https://expressongoogle-jzam6yvx3q-ez.a.run.app/";
  

window.onload = async()=>{
    if(window.location.pathname.includes("appointment")){
        const form = document.getElementById("submit");
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }
    }else if(window.location.pathname.includes("sell")){
        const form = document.getElementById("submit");
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }

    }else if(window.location.href.includes("buy/?car=")){
      const searchTerm = window.location.href.split("=")[1];
      localVar["0"] = await getMyCars("tflcarsforsell");
      const tempArr = [[[]]];

      if(searchTerm==="bikes"){
        for(let i=0;i<localVar[0][0].length;i++){
          if(localVar[0][0][i].Type1==="bikemoto"){
            tempArr[0][0].push(localVar[0][0][i])
          }
        }
        fillCars(tempArr)
      }else if(searchTerm==="hunter"){
        for(let i=0;i<localVar[0][0].length;i++){
          if(localVar[0][0][i].Name1.includes("hunter")||localVar[0][0][i].Name1.includes("Hunter")){
            tempArr[0][0].push(localVar[0][0][i])
          }
        }
        fillCars(tempArr)
      }else if(searchTerm==="xpulse"){
        for(let i=0;i<localVar[0][0].length;i++){
          if(localVar[0][0][i].Name1.includes("xpulse")||localVar[0][0][i].Name1.includes("Xpulse")||localVar[0][0][i].Name1.includes("pulse")||localVar[0][0][i].Name1.includes("Pulse")){
            tempArr[0][0].push(localVar[0][0][i])
          }
        }
        fillCars(tempArr)
      }
      
      console.log(localVar);
      //fillCars(localVar);
    }else if(window.location.href.includes("?car=")!==true&&window.location.pathname.includes("buy")){
      console.log(window.location.href);
      console.log(window.location.href.includes("car="));
      localVar["0"] = await getMyCars("tflcarsforsell");
      fillCars(localVar);
    }else{
      console.log("me")
      localVar["0"] = await getMyCars("tflcarsforsell");
      homePageFunc(localVar);
    }
};

function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    if(window.location.pathname.includes("appointment")){
    const name =e.target["0"].value;
    const email =e.target["1"].value;
    const number =e.target["2"].value;
    const category =e.target["3"].value;
    const message =e.target["4"].value;


    

    obj.params[0].dataObj = {name,email,number,category,message}

    }else if(window.location.pathname.includes("sell")){

    

        const name =e.target["0"].value+e.target["1"].value;
        const number =e.target["2"].value;
        const email =e.target["3"].value;
        const reg =e.target["4"].value;
        const year =e.target["5"].value;
        const make =e.target["6"].value+" : "+e.target["7"].value;
        const mileage =e.target["8"].value;
        const color = e.target["9"].value;
        const transmission = e.target["10"].value;
        const price = e.target["11"].value;
        const description = e.target["12"].value;
        const details = e.target["13"].value;
        const category ="Sell A Vehicle";
        const message =`Details<br>
        Reg Number : ${reg}
        <br>      
        Year of Reg : ${year}
        <br>      
        Make : ${make}
        <br>      
        Mileage : ${mileage}
        <br>      
        Color : ${color}
        <br>      
        Transmission : ${transmission}
        <br>      
        Price : ${price}
        <br>      
        Description : ${description}
        <br>
        Details : ${details}`;

        obj.params[0].dataObj = {name,email,number,category,message}



    }
    sendEmails(obj,"tflappoint");
    return false;
}



async function sendEmails (data,para){
    const reqString = "https://script.google.com/macros/s/AKfycbw39czh1LjMDSNlVJjUueIwwLMSfzfyBMrzmEPaPeqXfs3UzCDdKSDqtFds7fhA_IPQ/exec?paraOne="+para;
    
    data = JSON.stringify(data);
        
    
      var myRequest = new Request(reqString);
      
    
           
      const returnVal = await fetch(myRequest, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
          //'Content-Type': 'text/txt'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
      })
            .then(function(response) {
              if (!response.ok) {
                
                throw new Error("HTTP error, status = " + response.status);
                
              }
              
              return response.text();
            })
            .then(function(myBlob) {
              
              var cloudObject = JSON.parse(myBlob);
              window.location.href = "./";
              return cloudObject;
              
            })
            .catch(function(error) {
              console.log(error.message);
            });
    
            
           // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
            return returnVal; 
    
        // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;  
    }

    
async function getMyCars(para=""){
    
      var myRequest = new Request(serverURL+para);
      
    
           
      const returnVal = await fetch(myRequest, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
          //'Content-Type': 'text/txt'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
            .then(function(response) {
              if (!response.ok) {
                
                throw new Error("HTTP error, status = " + response.status);
                
              }
              
              return response.text();
            })
            .then(function(myBlob) {
              
              var cloudObject = JSON.parse(myBlob);
              //window.location.href = "./";
              return cloudObject;
              
            })
            .catch(function(error) {
              console.log(error.message);
            });
    
            
           // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
            return returnVal; 
    
        // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;  
    }




    async function getMyCarPics(para=""){
        var myRequest = new Request(serverURL+"tflcarspics?paraOne="+para);
        
      
             
        const returnVal = await fetch(myRequest, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'omit', // include, *same-origin, omit
          headers: {
            //'Content-Type': 'text/txt'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
              .then(function(response) {
                if (!response.ok) {
                  
                  throw new Error("HTTP error, status = " + response.status);
                  
                }
                
                return response.text();
              })
              .then(function(myBlob) {
                
                var cloudObject = JSON.parse(myBlob);
                //window.location.href = "./";
                return cloudObject;
                
              })
              .catch(function(error) {
                console.log(error.message);
              });
      
              
             // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
              return returnVal; 
      
          // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;  
      }


async function  fillCars (cars){
  const carContainer = document.querySelectorAll(".carmain")[0];
  carsLoading.remove();
  carContainer.remove();
  const carContainerMom = document.querySelectorAll(".carsgohere")[0];
  
  cars["0"]["0"].forEach(car=>{
    if(car.Type1!=="promo"){
      const tempEle = carContainer.cloneNode(true);
      tempEle.style.display = "block";
      tempEle.querySelectorAll(".product-title")[0].innerText = car.BrandType1+" "+car.Name1+"";
      tempEle.querySelectorAll(".product-title")[0].id = car.tagsArray;
      tempEle.querySelectorAll(".fa-car")[0].parentNode.querySelectorAll("span")[0].innerText = car.YearOfMake+"";
      tempEle.querySelectorAll(".fa-cog")[0].parentNode.querySelectorAll("span")[0].innerText = car.TransmissionType+"";
      tempEle.querySelectorAll(".fa-road")[0].parentNode.querySelectorAll("span")[0].innerText = commaSep(car.Mileage)+" km";
      tempEle.querySelectorAll(".product-price")[0].querySelectorAll("span")[0].innerText = "TZS "+commaSep(car.PriceTZS);
      tempEle.addEventListener("click",showDetailedCar);
      getPicture(car.tagsArray);
      carContainerMom.appendChild(tempEle);
    }
  });
}




function showDetailedCar(e){

  var path = e.path || (e.composedPath && e.composedPath());
  newHTML.classList.add("dispme");
  //prevHTML.replaceWith(newHTML);
  prevHTML.querySelectorAll(".carmain").forEach(ele=>{ele.style.display = "none";}); 

  path.forEach(p=>{
    //console.log(p);
    if(p.classList && p.classList.contains("carmain")){
      carID = p.querySelectorAll(".product-title")[0].id;
      for(let i=0;i<localVar["0"]["0"].length;i++){
        if (localVar["0"]["0"][i].tagsArray===carID){
          console.log(localVar["0"]["0"][i]);
          getPictures(localVar["0"]["0"][i].tagsArray);
          document.querySelectorAll(".carfeat")[0].innerText = localVar["0"]["0"][i].AmenetiesArray;
          document.querySelectorAll(".cartit")[0].innerText = localVar["0"]["0"][i].BrandType1+" "+localVar["0"]["0"][i].Name1;
          document.querySelectorAll(".carprice")[0].innerText = "TZS "+commaSep(localVar["0"]["0"][i].PriceTZS);
          break;
        }
      }
    }else{
    }
  })
  window.scrollTo(0,369);

  

  document.querySelectorAll(".backbutttoo")[0].addEventListener("click",()=>{
    //newHTML.replaceWith(prevHTML);
    prevHTML.querySelectorAll(".carmain").forEach(ele=>{ele.style.display = "block";});
    newHTML.classList.remove("dispme")
    mom.innerHTML = "";
  })
}

function commaSep (n="1000000"){
  n = n.toString();
  n = reverse(n);
  var newStr = "";
  for(let i=n.length-1;i>=0;i--){
    if((i+1)%3===0&&i!==n.length-1){
      newStr = newStr+","+n[i];
    }else{
      newStr = newStr+n[i];
    }
  }
  //newStr = reverse(newStr);
  //console.log(newStr);
  return newStr;
}

function reverse(s){
  return s.split("").reverse().join("");
}

//one or all
async function getPicture(id="def"){
   await getMyCarPics(id).then((res)=>{
    const keys = Object.keys(res[0][0]["f0_"]);
    var counter = 1;
    keys.forEach(key=>{
      if(res[0][0]["f0_"][key]!==null&&res[0][0]["f0_"][key]!=="null"&&res[0][0]["f0_"][key].length>1){
        localVar[0][0].forEach(v=>{
          if(v.tagsArray===id){
            v["Picture"+counter] = res[0][0]["f0_"][key];
            counter++;
          }
        })
        res[0][0]["f0_"][key] = res[0][0]["f0_"][key].length>1? JSON.parse(res[0][0]["f0_"][key]):"";
        const disimg = document.getElementById(id).parentNode.parentNode.querySelectorAll(".product-img")[0].querySelectorAll("img")[0];
        disimg.src= `data:${res[0][0]["f0_"][key].fileInfo.meme};base64,${res[0][0]["f0_"][key].fileData}`;
      }
    })
    counter = 1;
   })
}

async function getPictures(id="def"){
  localVar[0][0].forEach(v=>{
    const pics =[];
    
    if(v.tagsArray===id){
      var keyz = Object.keys(v);
      keyz.forEach(key=>{
        if(key.includes("Picture")){
          pics.push(key);
        }
      })


        const kid = kids[0].cloneNode(true);
        
        kids.forEach(ele=>{ele.remove()});
      for(let i =0;i<pics.length;i++){
        const imgclone = kid.cloneNode(true);
        //console.log(v);
        var disv=JSON.parse(v["Picture"+(i+1)]);
        imgclone.querySelectorAll("img")[0].src = `data:${disv.fileInfo.meme};base64,${disv.fileData}`;
        imgclone.querySelectorAll("img")[0].parentNode.target = "_blank";
        imgclone.querySelectorAll("img")[0].parentNode.href =`data:${disv.fileInfo.meme};base64,${disv.fileData}`;// fullImgTab(imgclone.querySelectorAll("img")[0]);
        imgclone.querySelectorAll("img")[0].addEventListener("click",(e)=>{
         e.preventDefault();
          e.stopPropagation();
          fullImgTab(e.target.src);
        })


        //const disimg = document.getElementById(id).parentNode.parentNode.querySelectorAll(".product-img")[0].querySelectorAll("img")[0];
        //disimg.src= `data:${res[0][0]["f0_"][key].fileInfo.meme};base64,${res[0][0]["f0_"][key].fileData}`;
        mom.appendChild(imgclone);

      }
    }
  })
}



function fullImgTab(imgsrc) {
  var newTab = window.open();
  newTab.document.body.innerHTML = `<img src="${imgsrc}" width="69%" height="auto" style="display:block; margin:0 auto;">`;

  return "ifrm.location.href";
}


async function homePageFunc(disVar){
  try{
    const left = document.querySelectorAll(".leftarrowcust")[0];
    const right = document.querySelectorAll(".rightarrowcust")[0];
    const dot1= document.querySelectorAll(".dot1cust")[0];
    const dot2= document.querySelectorAll(".dot2cust")[0];
    const dot3= document.querySelectorAll(".dot3cust")[0];

    const arrObj = [{left},{right},{dot1},{dot2},{dot3}];

    arrObj.forEach(obj=>{

      const ele = Object.entries(obj)[0][1];
      const nameKey = Object.entries(obj)[0][0];

      ele.addEventListener("click",(e)=>{

        e.preventDefault();
        e.stopPropagation();

        if(nameKey==="dot1"){
          dot1function();
        }else if(nameKey==="dot2"){
        dot2function();

        }else if(nameKey==="dot3"){
         dot3function();

        }else if(nameKey==="right"){
          if(localVar.homeCounter==0){
            dot2function();
            localVar.homeCounter++;
          }else if(localVar.homeCounter==1){
            dot3function();
            localVar.homeCounter++;
          }else if(localVar.homeCounter==2){
            dot1function();
            localVar.homeCounter=0;
          }
        }else if(nameKey==="left"){
          if(localVar.homeCounter==0){
            dot3function();
            localVar.homeCounter++;
          }else if(localVar.homeCounter==1){
            dot2function();
            localVar.homeCounter++;
          }else if(localVar.homeCounter==2){
            dot1function();
            localVar.homeCounter=0;
          }
        }else{
          dot1function();
        }
        //console.log({ele,nameKey});
      })
      
    })


          
const getPromoPicture=async()=>{
  //console.log(car);   
  await fetchingPromoPic().then((res)=>{
    for(let i=0;i<localVar[0][0].length;i++){
      if(localVar[0][0][i].Type1==="promo"){
        console.log(localVar[0][0][i]);
        document.querySelectorAll(".promosubtit")[0].innerText =`//${localVar[0][0][i].Name1}//`;
        document.querySelectorAll(".promotit")[0].innerText =`${localVar[0][0][i].BrandType1}`;
        console.log(res);
        const img = JSON.parse(res[0][0].Picture1);
        document.querySelectorAll(".call-to-img img")[0].src=`data:${img.fileInfo.meme};base64,${img.fileData}`;
        break;
      }
    }
   })}


   await getPromoPicture();







    console.log(disVar);
    
    
  }
  catch{e=>{
    console.log(e)
  }}
};


function dot1function (){
  document.querySelectorAll(".dot1cust")[0].style.backgroundColor ="#e2bf14";
  document.querySelectorAll(".dot2cust")[0].style.backgroundColor ="#c0c0c0";
  document.querySelectorAll(".dot3cust")[0].style.backgroundColor ="#c0c0c0";
  const mom = document.querySelectorAll(".dotmom1")[0];
  const textChildren = Array.from(document.querySelectorAll(".maintextytext")[0].children);
  const mom2 = document.querySelectorAll(".dotmom2")[0];
  const textChildren2 = Array.from(document.querySelectorAll(".maintextytext")[1].children);
  const mom3 = document.querySelectorAll(".dotmom3")[0];
  const textChildren3 = Array.from(document.querySelectorAll(".maintextytext")[2].children);
  mom.style.opacity = "1";
  mom.style.zIndex = "999";
  textChildren.forEach(ele=>{ele.style.opacity="1"})
  mom2.style.opacity = "0";
  mom2.style.zIndex = "998";
  textChildren2.forEach(ele=>{ele.style.opacity="0"})
  mom3.style.opacity = "0";
  mom3.style.zIndex = "998";
  textChildren.forEach(ele=>{ele.style.opacity="0"})
}



function dot3function () {
  document.querySelectorAll(".dot1cust")[0].style.backgroundColor ="#c0c0c0";
  document.querySelectorAll(".dot2cust")[0].style.backgroundColor ="#c0c0c0";
  document.querySelectorAll(".dot3cust")[0].style.backgroundColor ="#e2bf14";
  const mom = document.querySelectorAll(".dotmom1")[0];
  const textChildren = Array.from(document.querySelectorAll(".maintextytext")[0].children);
  const mom2 = document.querySelectorAll(".dotmom2")[0];
  const textChildren2 = Array.from(document.querySelectorAll(".maintextytext")[1].children);
  const mom3 = document.querySelectorAll(".dotmom3")[0];
  const textChildren3 = Array.from(document.querySelectorAll(".maintextytext")[2].children);
  mom.style.opacity = "0";
  mom.style.zIndex = "998";
  textChildren.forEach(ele=>{ele.style.opacity="0"})
  mom2.style.opacity = "0";
  mom2.style.zIndex = "998";
  textChildren2.forEach(ele=>{ele.style.opacity="0"})
  mom3.style.opacity = "1";
  mom3.style.zIndex = "999";
  textChildren3.forEach(ele=>{ele.style.opacity="1"})
}


function dot2function () {
  document.querySelectorAll(".dot1cust")[0].style.backgroundColor ="#c0c0c0";
  document.querySelectorAll(".dot2cust")[0].style.backgroundColor ="#e2bf14";
  document.querySelectorAll(".dot3cust")[0].style.backgroundColor ="#c0c0c0";
  const mom = document.querySelectorAll(".dotmom1")[0];
  const textChildren = Array.from(document.querySelectorAll(".maintextytext")[0].children);
  const mom2 = document.querySelectorAll(".dotmom2")[0];
  const textChildren2 = Array.from(document.querySelectorAll(".maintextytext")[1].children);
  const mom3 = document.querySelectorAll(".dotmom3")[0];
  const textChildren3 = Array.from(document.querySelectorAll(".maintextytext")[2].children);
  mom.style.opacity = "0";
  mom.style.zIndex = "998";
  textChildren.forEach(ele=>{ele.style.opacity="0"})
  mom2.style.opacity = "1";
  mom2.style.zIndex = "999";
  textChildren2.forEach(ele=>{ele.style.opacity="1"})
  mom3.style.opacity = "0";
  mom3.style.zIndex = "998";
  textChildren3.forEach(ele=>{ele.style.opacity="0"})
}

async function fetchingPromoPic(){

  
    var myRequest = new Request(serverURL+"tflpromopic");
    
  
         
    const returnVal = await fetch(myRequest, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        //'Content-Type': 'text/txt'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
          .then(function(response) {
            if (!response.ok) {
              
              throw new Error("HTTP error, status = " + response.status);
              
            }
            
            return response.text();
          })
          .then(function(myBlob) {
            
            var cloudObject = JSON.parse(myBlob);
            //window.location.href = "./";
            return cloudObject;
            
          })
          .catch(function(error) {
            console.log(error.message);
          });
  
          
         // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
          return returnVal; 
  
      // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;  
  }
