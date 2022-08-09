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
  const prevHTML = document.querySelectorAll(".carsgohere")[0];
  const newHTML = document.querySelectorAll(".ltn__shop-details-area")[0];
  const mom = document.querySelectorAll(".ltn__shop-details-large-img")[0];
  const kids = document.querySelectorAll(".single-large-img");
  

window.onload = async()=>{
    console.log(window.location.pathname);
    if(window.location.pathname.includes("appointment")){
        //console.log("Appointment Page");
        const form = document.getElementById("submit");
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }
    }else if(window.location.pathname.includes("sell")){
        //console.log("Appointment Page");
        const form = document.getElementById("submit");
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }

    }else if(window.location.pathname.includes("buy")){
      localVar["0"] = await getMyCars("tflcarsforsell");
      fillCars(localVar);
      //console.log(localVar);
    }else{
        console.log("default");
    }
};

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
  console.log(e)

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

    console.log(obj);
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
    const reqString = "http://127.0.0.1:8080/"+para;
    //const reqString = "https://expressongoogle-jzam6yvx3q-ey.a.run.app/"+para;

        
    
      var myRequest = new Request(reqString);
      
    
           
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
             // console.log(myBlob)
              
            })
            .catch(function(error) {
              console.log(error.message);
            });
    
            
           // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
            return returnVal; 
    
        // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;  
    }




    async function getMyCarPics(para=""){
      const reqString = "http://127.0.0.1:8080/tflcarspics?paraOne="+para;
      //const reqString = "https://expressongoogle-jzam6yvx3q-ey.a.run.app/tflcarspics?paraOne="+para;
  
          
      
        var myRequest = new Request(reqString);
        
      
             
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
               // console.log(myBlob)
                
              })
              .catch(function(error) {
                console.log(error.message);
              });
      
              
             // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
              return returnVal; 
      
          // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;  
      }


async function  fillCars (cars){
  const carContainer = document.querySelectorAll(".carmain");
  const carContainerMom = document.querySelectorAll(".carsgohere")[0];
  carContainer.forEach(ele=>ele.remove());
  //console.log(carContainer[0]);
  //console.log(cars["0"]["0"]);
  cars["0"]["0"].forEach(car=>{
    if(car.Type1!=="promo"){
      const tempEle = carContainer[0].cloneNode(true)
      tempEle.querySelectorAll(".product-title")[0].innerText = car.BrandType1+" "+car.Name1+"";
      tempEle.querySelectorAll(".product-title")[0].id = car.tagsArray;
      tempEle.querySelectorAll(".fa-car")[0].parentNode.innerText = car.YearOfMake+"";
      tempEle.querySelectorAll(".fa-cog")[0].parentNode.innerText = car.TransmissionType+"";
      tempEle.querySelectorAll(".fa-road")[0].parentNode.innerText = car.Mileage+"";
      tempEle.querySelectorAll(".product-price")[0].querySelectorAll("span")[0].innerText = "TZS "+commaSep(car.PriceTZS);
      tempEle.addEventListener("click",showDetailedCar);
      getPicture(car.tagsArray);
      carContainerMom.appendChild(tempEle);
    }
  });
}




function showDetailedCar(e){
  //e.stopPropagation();
  //console.log(e.path);
  newHTML.classList.add("dispme");
  prevHTML.replaceWith(newHTML);

  e.path.forEach(p=>{
    //console.log(p);
    if(p.classList && p.classList.contains("carmain")){
      carID = p.querySelectorAll(".product-title")[0].id;
      for(let i=0;i<localVar["0"]["0"].length;i++){
        if (localVar["0"]["0"][i].tagsArray===carID){
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

  

  document.querySelectorAll(".backbutttoo")[0].addEventListener("click",()=>{
    newHTML.replaceWith(prevHTML);
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
    console.log("_______________");
    console.log(id);
    console.log(" ");
    const keys = Object.keys(res[0][0]["f0_"]);
    var counter = 1;
    keys.forEach(key=>{
      if(res[0][0]["f0_"][key]!==null&&res[0][0]["f0_"][key]!=="null"){
        localVar[0][0].forEach(v=>{
          if(v.tagsArray===id){
            v["Picture"+counter] = res[0][0]["f0_"][key];
            counter++;
          }
        })
        //console.log(localVar[0][0]);
        //console.log("localVar");
        res[0][0]["f0_"][key] = JSON.parse(res[0][0]["f0_"][key]);
        const disimg = document.getElementById(id).parentNode.parentNode.querySelectorAll(".product-img")[0].querySelectorAll("img")[0];
        disimg.src= `data:${res[0][0]["f0_"][key].fileInfo.meme};base64,${res[0][0]["f0_"][key].fileData}`;
        //console.log(res[0][0]["f0_"][key]);
      }
    })
    counter = 1;
    console.log();
    console.log("---------------");
    console.log("  ");
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


        const kid = kids[0];
        
        kids.forEach(ele=>{ele.remove()});
      for(let i =0;i<pics.length;i++){
        const imgclone = kid.cloneNode(true);
        console.log(v);
        var disv=JSON.parse(v["Picture"+(i+1)]);
        console.log(disv);
        imgclone.querySelectorAll("img")[0].src = `data:${disv.fileInfo.meme};base64,${disv.fileData}`;
        imgclone.querySelectorAll("img")[0].parentNode.target = "_blank";
        imgclone.querySelectorAll("img")[0].parentNode.href = prepareFrame(imgclone.querySelectorAll("img")[0]);

        //const disimg = document.getElementById(id).parentNode.parentNode.querySelectorAll(".product-img")[0].querySelectorAll("img")[0];
        //disimg.src= `data:${res[0][0]["f0_"][key].fileInfo.meme};base64,${res[0][0]["f0_"][key].fileData}`;
        mom.appendChild(imgclone);

      }
    }
  })
}



function prepareFrame(src) {
  var ifrm = document.createElement("iframe");
  ifrm.innerHTML = src.outerHTML;
  //ifrm.setAttribute("src", "_blank");
  ifrm.style.width = "640px";
  ifrm.style.height = "480px";
  document.body.appendChild(ifrm);
  console.log(ifrm);
  return ifrm.location.href;
}