import {obj as ajax } from 'utilities/xhr/ajax';
import { commonService } from "utilities/common/commonService";
import { Injector } from "utilities/common/injector";
// import 'main/main.css';
// import 'css/font-awesome.css';

window.onload=function(){
    var loginButton=document.querySelector("#login");
    if(loginButton){
        loginButton.addEventListener("click",(e)=>{
            e.preventDefault();
            login();
        });
    }

    var registerButton=document.querySelector("#registerButton");
    if(registerButton){
        registerButton.addEventListener("click",(e)=>{
            e.preventDefault();
            register();
        });
    }
    
}

function login(){
    let mobileNumber=document.querySelector("#mobileNumber").value;
    if(!commonService.validatePhoneNumber(mobileNumber)){
        return;
    }
    let passWord=document.querySelector("#passWord").value;
    if(!commonService.validatePassword(passWord)){
        return;
    }
    ajax.loginUser(mobileNumber,passWord).then((res)=>{
            res=JSON.parse(res);
            if(res.validUser){
                document.cookie="token="+res.token;
                localStorage.setItem("userId",mobileNumber);
                location.replace("/src/main/main.html");
            }else{
                alert("invalid user");
            }  
    },(err)=>{
        console.log(err);	
    })
}

function register(){
    let userName=document.querySelector("#userName").value;
    let mobileNumber=document.querySelector("#mobileNumber").value;
    if(!commonService.validatePhoneNumber(mobileNumber)){
        return;
    }
    let passWord=document.querySelector("#passWord").value;
    if(!commonService.validatePassword(passWord)){
        return;
    }
    ajax.registerUser(userName,mobileNumber,passWord).then((res)=>{
        console.log(res);
        if(res=="success"){
            alert("registration success")	
        }else{
            alert("registration failed");
        }
        
    });
}