// Confidential need to be hidden
const firebaseConfig = {
  apiKey: "AIzaSyBS9IvmDCESVIWLU9n-uFYugyoLHUPMUXg",
  authDomain: "cinistudios.firebaseapp.com",
  databaseURL:
    "https://cinistudios-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "cinistudios",
  storageBucket: "cinistudios.appspot.com",
  messagingSenderId: "960973097549",
  appId: "1:960973097549:web:246b9fb0e546d7f2b3ea04",
  measurementId: "G-V55KT54YKW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
var currentUser;

//Track Auth Status
auth.onAuthStateChanged((user) => {
  if (user == null) {
    $("#show-reg-form").show();
    $("#log-out").hide();
    $("#talent").hide();
  } else {
    $("#show-reg-form").hide();
    $("#log-out").show();
    $("#talent").show();
    currentUser = user;
  }
});

//Set up Register function
$("#main-register-form").on("submit", function (e) {
  e.preventDefault();
  var name =
    document.getElementById("main-register-form").elements["name"].value;
  var email =
    document.getElementById("main-register-form").elements["email"].value;
  var password =
    document.getElementById("main-register-form").elements["password"].value;
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }
  if (validate_field(name) == false) {
    alert("One or More Extra Fields is Outta Line!!");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();
      // Create User data
      var user_data = {
        email: email,
        name: name,
        last_login: Date.now(),
        registrationStatus: "Free",
      };

      // Push to Firebase Database
      console.log(
        database_ref.child("users/" + user.uid).set(user_data, (error) => {
          if (error) console.log(error);
          else window.location.href = "pricing.html";
        })
      );
      hideModal();
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
});

// Set up our login function
$("#main-login-form").on("submit", function (e) {
  e.preventDefault();
  // Get all our input fields
  email = document.getElementById("main-login-form").elements["email"].value;
  password =
    document.getElementById("main-login-form").elements["password"].value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Outta Line!!");
    return;
    // Don't continue running the code
  }
  console.log(email, password);
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;
      console.log(user);
      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);
      hideModal();
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
});

// Set up Log out Fuction
$("#log-out").on("click", function () {
  auth.signOut();
});

$("#pay-now").on("click", function (e) {
  e.preventDefault();
  paymentProcess();
});

function hideModal() {
  $(".main-register-container").fadeOut(1);
  $(".main-register-wrap").removeClass("vis_mr");
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

function paymentProcess() {
  var options = {
    key: "rzp_test_hYEX3Uek3f2Wwn",
    amount: 999 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
    currency: "INR",
    name: "Talent Registeration",
    description:
      "Become a Talent in CiniTimes and Get Hired for your favorite part!",
    image: "images/logo.png",
    handler: function (response) {
      savetoDB(response);
      //$('#myModal').modal(); Can be used to say a success message
    },
    prefill: {
      name: "Akshay Bhatia",
      email: "akshay.bhatia@gmail.com",
      contact: "8248698383",
    },
    theme: {
      color: "#e93314",
    },
  };
  var propay = new Razorpay(options);
  propay.open();
}

function savetoDB(response) {
  console.log(response);
  var database_ref = database.ref();

  // Create User data
  var user_data = {
    registrationStatus: "Talent",
    paymentId: response.razorpay_payment_id,
  };

  // Push to Firebase Database
  database_ref.child("users/" + currentUser.uid).update(user_data, (error) => {
    if (error) console.log(error);
    else {
      alert(
        "Congratulations! Your now a Talent in CiniTimes Studios. Have a Great Journey Ahead."
      );
      window.location.href = "usertemplate.html";
    }
  });
}
