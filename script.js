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
window.onload = ()=>{
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

    }else if("buy"){
        console.log("Buy Page");
        console.log(get("tflcarsforsell"))
    }else{
        console.log("default");
    }
};

function processForm(e) {
    if (e.preventDefault) e.preventDefault();


    if(window.location.pathname.includes("appointment")){
    const name =e.explicitOriginalTarget["0"].value;
    const email =e.explicitOriginalTarget["1"].value;
    const number =e.explicitOriginalTarget["2"].value;
    const category =e.explicitOriginalTarget["3"].value;
    const message =e.explicitOriginalTarget["4"].value;


    

    obj.params[0].dataObj = {name,email,number,category,message}

    }else if(window.location.pathname.includes("sell")){

    

        const name =e.explicitOriginalTarget["0"].value+e.explicitOriginalTarget["1"].value;
        const number =e.explicitOriginalTarget["2"].value;
        const email =e.explicitOriginalTarget["3"].value;
        const reg =e.explicitOriginalTarget["4"].value;
        const year =e.explicitOriginalTarget["5"].value;
        const make =e.explicitOriginalTarget["6"].value+" : "+e.explicitOriginalTarget["7"].value;
        const mileage =e.explicitOriginalTarget["8"].value;
        const color = e.explicitOriginalTarget["9"].value;
        const transmission = e.explicitOriginalTarget["10"].value;
        const price = e.explicitOriginalTarget["11"].value;
        const description = e.explicitOriginalTarget["12"].value;
        const details = e.explicitOriginalTarget["13"].value;
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

    
async function get (para=""){
    //Sconst reqString = "http://127.0.0.1:8080/"+para;
    const reqString = "https://expressongoogle-jzam6yvx3q-ey.a.run.app/"+para;

        
    
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