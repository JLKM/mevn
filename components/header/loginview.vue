<template>
    <div class='row'>
        <br /><br /><br />
        <div class="loginview">
            <div class='radio' v-if='$store.state.usersControl.allowReg'>
                <label><input type='radio' v-model='selectedForm' value='login'/>Login</label>&nbsp;
                <label><input type='radio' v-model='selectedForm' value='signup'>Signup</label>
            </div>
            <form id="login">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-sign-in fa-fw" aria-hidden="true"></i></span>
                        <input type="text" v-model="username" placeholder="Username" required class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                        <input type="password" v-model='password' placeholder="Password" required class="form-control">
                    </div>
                </div>
                <div class="form-group" v-if='selectedForm == "signup"'>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-user fa-fw" aria-hidden="true"></i></span>
                        <input type="email" v-model='fullname' placeholder="Fullname - visible in posts" required class="form-control">
                    </div>
                </div>
                <div class="form-group" v-if='selectedForm == "signup"'>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-envelope fa-fw" aria-hidden="true"></i></span>
                        <input type="email" v-model='email' placeholder="Email - hidden from posts" required class="form-control">
                    </div>
                </div>
                <button @click="selectedForm == 'login' ? login():signup()" type="button" class="btn login-btn">{{ selectedForm == "login" ? 'Login':'Signup'}}</button>
            </form>
            <br><b style='color:white'>Demo Account: ID:1 Pw:1</b>
            <p class="alert alert-danger" v-if='hasError' role="alert">
                <i class="fa  fa-exclamation fa-fw"></i>
            {{ result }}</p>
            <p class="alert alert-success" v-if='hasMsg' role="alert">
                <i class="fa  fa-check fa-fw"></i>
            {{ result }}</p>
        </div>
        <br /><br />
    </div>
</template>

<script>

    export default {
        data(){
            return {
                username:"",
                fullname:"",
                fullnameslug:"",
                useruniqintern:"",
                useruniqextern:"",
                password:"",
                email:"",
                result:"",
                hasError:false,
                hasMsg:false,
                selectedForm:"login"
            }
        },
        computed: {
            toUniq() {
                let tempnow = new Date();
                let se = tempnow.getSeconds();
                let mi = tempnow.getMinutes();
                let ho = tempnow.getHours();
                let dd = tempnow.getDate();
                let mm = tempnow.getMonth()+1; //January is 0!  
                let yyyy = tempnow.getFullYear();
                let datenumber = Math.abs((dd * mm) - yyyy);
                let timenumber = Math.abs((mi * ho) - (se * 12));
                var datetimestring = (datenumber + timenumber).toString();
                let alphaposition = this.email.trim().indexOf('@');
                let alphaend = Math.abs(this.email.trim().length - alphaposition);
                let usernamelength = (this.username.trim().length-1);
                let fullnametrim = this.fullname.trim().toLowerCase();
                let spaceposition0 = fullnametrim.indexOf(' ');
                let spaceposition = ((spaceposition0-1)*3)+1;
                let usernamerandom = usernamelength.toString() + this.email.trim().length.toString().replace(/\1/, '');
                let passwordnumbersstring0 = this.password.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\W/g,'') + spaceposition.toString().replace(/\1/, '');
                let passwordnumbersstring1 = (alphaposition * alphaend * usernamelength).toString();
                let passwordrandom = passwordnumbersstring0 + (Number(passwordnumbersstring1)).toString();
                let tempUniq0 = passwordrandom + usernamerandom + this.email.substring(alphaposition+1) + alphaend.toString() + this.username + alphaposition.toString() + this.email.substring(0, alphaposition) + datetimestring;
                let tempUniq1 = tempUniq0.toLowerCase()
                .replace(/\[.*?\]/g, '0')        // Remove all square brackets incl. content with regex
                .replace(/\s+/g, 1)           // Remove multiple spaces
                .replace(/\s/g, '2')           // Remove single spaces
                .replace(/\ß/g, '3')
                .replace(/\ü/g, '4')
                .replace(/\ä/g, '5')
                .replace(/\æ/g, '6')
                .replace(/\ö/g, '7')
                .replace(/\ø/g, '8')
                .replace(/\å/g, '9') // Must execute before diacritics-strip, which also strips æ, ø and å
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Strips accents and diacritics
                .replace(/\W/g,'');
                return this.firstnameReplace(tempUniq1.substring(tempUniq1.length - 24), fullnametrim.substring(0, spaceposition0))
            },
            toUniqScramble() {
                var a = this.toUniq.split("");
                for(var b = a.length-1;0<b;b--) {
                    var c = Math.floor(Math.random()*(b+1));
                    var d = a[b];a[b]=a[c];a[c]=d
                    }
                    return a.join("")
            },
            toUniqSort() {
                var a = this.toUniq.substring(0, 16);
                var b = a.split("");
                return b.sort().join("")
            }
        },
        methods: {
            firstnameReplace(tempString, firstname) {
                var alphabet = Array (  Array( 'a', 'u' ), Array( 'b', 'm' ), Array( 'c', 'x' ), Array( 'd', 'n' ), Array( 'e', 'o' ), Array( 'f', 'p' ), Array( 'g', 'r' ), Array( 'h', 's' ), Array( 'i', 'y' ), Array( 'j', 't' ), Array( 'k', 'v' ), Array( 'l', 'w' ), Array( 'm', 'l' ), Array( 'n', 'k' ), Array( 'o', 'a' ), Array( 'p', 'j' ), Array( 'q', 'c' ), Array( 'r', 'h' ), Array( 's', 'g' ), Array( 't', 'f' ), Array( 'u', 'i' ), Array( 'v', 'd' ), Array( 'w', 'b' ), Array( 'x', 'n' ), Array( 'y', 'e' ), Array( 'z', 'q' ) );                    
                var tempString_split = tempString.split("");
                for (var i = 0; i < tempString_split.length; i++)
                    {
                        if (tempString_split[i].match(/[a-z]/i) != null) {
                            if (firstname.indexOf(alphabet[i][0]) > 0) {        
                                tempString = tempString.replace(alphabet[i][0], alphabet[i][1]);
                            }
                        }
                    };
                    return tempString
            },
            toSlug(tempString) {
                let tempSlug = tempString.toLowerCase()
                .replace(/\[.*?\]/g, '')        // Remove all square brackets incl. content with regex
                .replace(/\s+/g, ' ')           // Replace multiple spaces with single spaces
                .replace(/\ß/g, 'ss')
                .replace(/\ü/g, 'ue')
                .replace(/\ä/g, 'ae')
                .replace(/\æ/g, 'ae')
                .replace(/\ö/g, 'oe')
                .replace(/\ø/g, 'oe')
                .replace(/\å/g, 'aa') // Must execute before diacritics-strip, which also strips æ, ø and å
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Strips accents and diacritics
                return tempSlug
            },
            login(){
                if (this.username == ""){
                    this.hasError = true;
                    this.result = "Please enter your user name";
                }else if (this.password == ""){
                    this.hasError = true;
                    this.result = "Please enter your password";
                }else{
                    this.hasError = false;
                    this.result = "";
                    const loginData = {
                        username:this.username,
                        password:this.password
                    };
                    $.ajax({
                        url: `/user/login`,
                        type:'POST',
                        contentType: "application/json",
                        data: JSON.stringify(loginData),
                        success: result => {
                            $("#settingField").modal("toggle");
                            this.$store.commit('login',result.result);
                        },
                        error:err => {
                            this.hasError = true;
                            this.result = err.responseJSON.content;                           
                        }
                    });
                }
            },
            signup(){
                let mailRegex = /^(\w[-._\w]*\w)@(\w[-._\w]*\w)\.(\w{2,4})$/;
                if (this.username == ""){
                    this.hasError = true;
                    this.result = "Please enter the user name, that you prefer";
                }else if (this.username.length < 3){
                    this.hasError = true;
                    this.result = "Username has to be at least 4 characters long for security reasons";
                }else if (this.username.replace(/[a-zA-Z0-9]+/gi, '') != ''){
                    this.hasError = true;
                    this.result = "A username can only contain letters a-z (capitals included) and numbers";
                }else if (this.password.length < 8){
                    this.hasError = true;
                    this.result = "Password has to be at least 8 characters long for security reasons";
                }else if (this.password.replace(/[a-zA-Z0-9]+/gi, '') != ''){
                    this.hasError = true;
                    this.result = "Only letters a-z (capitals included) and numbers are allowed in your password";
                }else if (this.fullname == "" || this.fullname.indexOf(' ') == -1){
                    this.hasError = true;
                    this.result = "Please enter your correct fullname";
                }else if (this.email === ""){
                    this.hasError = true;
                    this.result = "Please enter your email address";
                }else if (this.email.indexOf(',')!== -1) {
                    this.hasError = true;
                    this.result = "Comma is not allowed in a mail address";
                }else if (this.email.indexOf(';')!== -1) {
                    this.hasError = true;
                    this.result = "Semikolon is not allowed in a mail address";
                }else if (this.email.indexOf(':')!== -1) {
                    this.hasError = true;
                    this.result = "Colon is not allowed in a mail address";
                }else if (this.email.indexOf(' ')!== -1) {
                    this.hasError = true;
                    this.result = "Space is not allowed in a mail address";
                }else if (this.email.substring(this.email.indexOf('@')+1).indexOf('@')!== -1) {
                    this.hasError = true;
                    this.result = "A mail address can only contain one @";
                }else if (this.email.match(mailRegex) == null) {
                    this.hasError = true;
                    this.result = "Please enter correct mail address";
                }else{
                    this.hasError = false;
                    this.result = "";
                    const data = {
                        username:this.username.trim(),
                        password:this.password.trim(),
                        fullname:this.fullname.trim(),
                        fullnameslug: this.toSlug(this.fullname.trim().toLowerCase()).replace(/\s+/g, '-'),
                        email:this.email.trim().toLowerCase(),
                        lg:'da',
                        useruniqintern: this.toUniqScramble,
                        useruniqextern: this.toUniqSort,
                        userdescription: '',
                        userlink: '',
                        usertype:2
                    };
                    $.ajax({
                        url: `/user/signup`,
                        type:'POST',
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: result => {
                            $("#settingField").modal("toggle");
                            this.$store.commit('login',data);
                        },
                        error:err =>{
                            this.hasError = true;
                            this.result = err.responseJSON.content;                           
                        }
                    });
                }
            }
        },
    }
</script>
