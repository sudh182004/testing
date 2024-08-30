// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAE4GfH3B4PlTMdNhOmVpzLRZK3lEuHjp0",
  authDomain: "belloi.firebaseapp.com",
  databaseURL: "https://belloi-default-rtdb.firebaseio.com",
  projectId: "belloi",
  storageBucket: "belloi.appspot.com",
  messagingSenderId: "1087926114054",
  appId: "1:1087926114054:web:b5ba5e9606a78476f3b087",
  measurementId: "G-P3W4GQRSVS"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Dom Selector 

let useremail = document.querySelector(".input_user");
let userpassord = document.querySelector(".input_password");
let btn_signup = document.querySelector(".btn_signup");
let btn_signin = document.querySelector(".btn_signin");
let rember_checkbox = document.querySelector(".rember_checkbox");


//When page load check user is signin or not for send him to main page

if (localStorage.getItem("userstatus") === "signin") {
  window.location.href = "main/main.html";
}else{
  useremail.value = localStorage.getItem("useremail")
  userpassord.value = localStorage.getItem("userpassword")
}


// Create account for a new user

function signup() {
    const email = useremail.value;
    const password = userpassord.value;

    //check if any feild is empty?

    if (email === "" || password === "") {
      alert("Enter Email And Password");
    } else if (password.length < 6) {
      alert("Password must contain atleast 6 digits");
    } else {
      btn_signup.innerHTML="Signing Up......"
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Your account is sucessfully created")
          localStorage.setItem("userstatus","signin")
          
          // Sending the verification email
          
          firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            alert("Verfication email has been send please verify first")
            window.location.href="main/main.html"
            });
     
        })
        .catch((error) => {
          btn_signup.innerHTML="Sign Up"
          alert(error.message);
        });
    }
  }
btn_signup.addEventListener("click", signup);

//Login/ Signin

function signin() {
  const email = useremail.value;
  const password = userpassord.value;

  if (email === "" || password === "") {
    alert("Enter Email And Password");
  } else {
    btn_signin.innerHTML="Signing In......"
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //store user eamil and password for checkbox sign in
        if(rember_checkbox.checked){
          localStorage.setItem("useremail",email)
          localStorage.setItem("userpassword",password)
        }
        window.location.href = "main/main.html";
        localStorage.setItem("userstatus", "signin");
              
      })
      .catch((error) => {
        btn_signin.innerHTML="Sign In"
        alert(error.message);

      });
  }
}
btn_signin.addEventListener("click", signin);

//Forgot password 

function forgetpassword(){
  const email = useremail.value;

  if (email === "" ){
    alert("Enter Email");
  }else{

  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    alert("Please check your email for password reset")
  })
  .catch((error) => {
    alert(error.message)
    btn_signup.innerHTML="Sign In"
  });
 }
}
