//Firebase confguartion

const firebaseConfig = {
  apiKey: "AIzaSyAE4GfH3B4PlTMdNhOmVpzLRZK3lEuHjp0",
  authDomain: "belloi.firebaseapp.com",
  databaseURL: "https://belloi-default-rtdb.firebaseio.com",
  projectId: "belloi",
  storageBucket: "belloi.appspot.com",
  messagingSenderId: "1087926114054",
  appId: "1:1087926114054:web:b5ba5e9606a78476f3b087",
  measurementId: "G-P3W4GQRSVS",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Get user realtime data from firebase

// Note we cannot use direct let usercredintion = firebase.auth().cuurentuser beacuse  When your app first loads, Firebase may still be initializing and checking if a user is signed in. During this brief period, firebase.auth().currentUser can return null, even if a user is signed in. This happens because Firebase hasn't yet finished its background work to check the user's authentication state ---------------So use this ->.

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    if (emailVerified != true) {
      document.querySelector(".verf_email_alert").innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Please verify your email to access the website, or refresh if you've already done so.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;


    }
  } else {
    window.location.href="../index.html"
  }
});

//Dom selector
let btn_logout = document.querySelector(".btn_logout");
let btn_send = document.querySelector(".btn_send");


//Logout user
function logout() {
  (function confitmation() { // confirm(boolenas) is an function ()
    let text = ("Are you sure you want to logout :(");
    if(confirm(text)==true){

      firebase
        .auth()
        .signOut()
        .then(() => {
          window.location.href = "../index.html";
          // checkbox empty 
          localStorage.setItem("userstatus", "logout");
        })
        .catch((error) => {
          alert(error);
        });
    }
  })()
}

//Send verfication email again and check if is verired or not
function sendverifemailagain() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const emailVerified = user.emailVerified;
      console.log(emailVerified)
      if(emailVerified===true){
        alert("You have already verified your email")
      }else{
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              alert("Verfication email has been send please verify first");
            });
      }
  
    }
  });
}

// Nav Bar
const navBar = document.querySelector("nav");
menuBtns = document.querySelectorAll(".menu-icon");
overlay = document.querySelector(".overlay");

menuBtns.forEach(menuBtns => {
  menuBtns.addEventListener("click", () => {
      navBar.classList.toggle("open");
  });
});

overlay.addEventListener("click", () => {
  navBar.classList.toggle("remove");
})

// Card serach

document.getElementById('search').addEventListener('input', function() {
  const searchValue = this.value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
      const title = card.querySelector('.card-header h3').textContent.toLowerCase();
      const location = card.querySelector('.card-header p').textContent.toLowerCase();

      if (title.includes(searchValue) || location.includes(searchValue)) {
          card.style.display = '';
      } else {
          card.style.display = 'none';
      }
  });
});