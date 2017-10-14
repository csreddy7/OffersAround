module.exports={
	encryptPassword(password){
		console.log("encrypting password....")
		var passcode="";
		console.log(password)
		var length=password.length;
		for(var i=0;i<length;i++){
			passcode=passcode+((password.charCodeAt(i)*77));
		}
		console.log(passcode)
		return passcode;
	},
	getSecureToken(){
		var t=new Date().getTime();
		return t*214;
	},
	validateToken(token){
		var t1=token/214;
		var t2= new Date().getTime();
		if(t2-t1>60000){
			return false;
		}else{
			return true;
		}

	}
}
