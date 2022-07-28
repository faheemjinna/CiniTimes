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
$("#add-auditon-button").hide();
//Track Auth Status
auth.onAuthStateChanged((user) => {
  var lastPath = window.location.pathname.split("/").pop();
  if (user == null) {
    $(".login-button").show();
    $(".logout-button").hide();
    if (
      lastPath == "TalentSearch.html" ||
      lastPath == "usertemplate.html" ||
      lastPath == "rectemplate.html" ||
      lastPath == "EventList.html"
    ) {
      window.location.href = "pricing.html";
    }
    window.hideLoading();
  } else {
    window.showLoading();
    currentUser = user;
    $(".login-button").hide();
    $(".logout-button").show();
    database
      .ref()
      .child("users")
      .child(user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          currentUser = snapshot.val();
          currentUser["uid"] = user.uid;
          var days = Math.round(
            (Date.now() - currentUser.paymentDate) / (1000 * 3600 * 24)
          );
          if (currentUser.registrationStatus != "Free" && days >= 365) {
            if (
              confirm("Your Subscription Has Ended! Do you want to Renew?") ==
              true
            )
              paymentRenewProcess();
            else {
              paymentDenied();
            }
          }
          if (currentUser.registrationStatus === "Talent") {
            if (lastPath == "login.html") window.location.href = "index.html";
            if (lastPath == "TalentSearch.html")
              window.location.href = "pricing.html";
            $("#free-button").parent().css("background-color", "grey");
            $("#free-button").css("background-color", "grey");
            $("#talent-button").css("background-color", "grey");
            $("#talent-button").parent().css("background-color", "grey");
            $("#talent-button").text("Registered");
            $("#profile-icon").attr("src", "images/talent.png");
          } else if (currentUser.registrationStatus === "Recruiter") {
            if (lastPath == "login.html") window.location.href = "index.html";
            if (lastPath == "EventList.html")
              window.location.href = "pricing.html";
            $("#add-auditon-button").show();
            $("#profile-icon").attr("src", "images/recruit.png");
            $("#recruit-button").css("background-color", "grey");
            $("#recruit-button").parent().css("background-color", "grey");
            $("#recruit-button").text("Registered");
            $("#free-button").parent().css("background-color", "grey");
            $("#free-button").css("background-color", "grey");
          } else {
            $("#sub-icon").attr("src", "images/sub.png");
            $("#free-button").parent().css("background-color", "grey");
            $("#free-button").css("background-color", "grey");
            $("#free-button").text("Registered");
            if (
              lastPath == "TalentSearch.html" ||
              lastPath == "usertemplate.html" ||
              lastPath == "rectemplate.html" ||
              lastPath == "EventList.html"
            ) {
              window.location.href = "pricing.html";
            }
          }
        }
        if (lastPath == "talenteditprofile.html") {
          document.getElementById("talentfname").value = currentUser.fname;
          document.getElementById("talentlname").value = currentUser.lname;
          document.getElementById("talentphone").value = currentUser.phone;
          document.getElementById("talentprofilename").value =
            currentUser.profileName;
          document.getElementById("talentemail").value = currentUser.email;
          document.getElementById("talentcountry").value = currentUser.country;
          document.getElementById("talentstate").value = currentUser.state;
          document.getElementById("talentcity").value = currentUser.city;
          document.getElementById("talentdepartment").value =
            currentUser.department;
          document.getElementById("talentgender").value = currentUser.gender;
          document.getElementById("talentdob").value = currentUser.dob;
          document.getElementById("talentage").value = currentUser.age;
          document.getElementById("talentheight").value = currentUser.height;
          document.getElementById("talentweight").value = currentUser.weight;
          document.getElementById("talenteyecolor").value =
            currentUser.eyecolor;
          document.getElementById("talenthaircolor").value =
            currentUser.haircolor;
          document.getElementById("talenthairtype").value =
            currentUser.hairtype;
          document.getElementById("talentbust").value = currentUser.bust;
          document.getElementById("talenthip").value = currentUser.hip;
          document.getElementById("talentbiceps").value = currentUser.biceps;
          document.getElementById("talentchest").value = currentUser.chest;
          document.getElementById("talentedu").value = currentUser.edu;
          document.getElementById("talentinst").value = currentUser.inst;
          document.getElementById("talentexpertise").value =
            currentUser.expertise;
          document.getElementById("talentavailability").value =
            currentUser.availability;
          document.getElementById("talentlang").value =
            currentUser.languagesKnown;
          document.getElementById("talentabout").value = currentUser.aboutMe;
          document.getElementById("talentcontacttype").value =
            currentUser.contactType;
          if (currentUser.facebook != "NA") {
            document.getElementById("talentfacebook").value =
              currentUser.facebook;
          }
          if (currentUser.instagram != "NA") {
            document.getElementById("talentinstagram").value =
              currentUser.instagram;
          }
        }
        window.hideLoading();
      });
  }
  if (lastPath == "rectemplate.html" || lastPath == "usertemplate.html") {
    let searchParams = new URLSearchParams(window.location.search);
    let userId = searchParams.get("id");
    if (currentUser.uid != userId) {
      $("#add-event-form").hide();
      $("#image-upload").hide();
      $("#contact-button").text("Contact");
    }
  }
});

$("#talent-button").on("click", function () {
  if (currentUser == null) window.location.href = "login.html";
  else if (currentUser.registrationStatus == "Recruiter") {
    if (
      confirm(
        "You can only be a Recruiter or a Talent! Do you want to become a Recuriter Now? (Charges apply)"
      ) == true
    )
      window.location.href = "talentreg.html";
  } else window.location.href = "talentreg.html";
});

$("#recruit-button").on("click", function () {
  if (currentUser == null) window.location.href = "login.html";
  else if (currentUser.registrationStatus == "Talent") {
    if (
      confirm(
        "You can only be a Recruiter or a Talent! Do you want to become a Recuriter Now? (Charges apply)"
      ) == true
    )
      window.location.href = "recruiterreg.html";
  } else window.location.href = "recruiterreg.html";
});

$("#free-button").on("click", function () {
  if (currentUser == null) window.location = "login.html";
  else if (currentUser.registrationStatus != "Free")
    window.location = "index.html";
});

$("#user-profile").on("click", function () {
  if (currentUser == null) showModal();
  if (currentUser.registrationStatus == "Talent")
    window.location.href = "usertemplate.html?id=" + currentUser.uid;
  else window.location.href = "rectemplate.html?id=" + currentUser.uid;
});

$("#contact-button").on("click", function (e) {
  let searchParams = new URLSearchParams(window.location.search);
  let userId = searchParams.get("id");
  if (currentUser.uid == userId) {
    e.preventDefault();
    window.location.href = "talenteditprofile.html";
  }
});

$("#add-auditon-button").on("click", function () {
  window.location.href =
    "rectemplate.html?id=" + currentUser.uid + "#add-event-form";
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
      database_ref.child("users/" + user.uid).set(user_data, (error) => {
        if (error) console.log(error);
        else {
          window.location.href = "pricing.html";
          window.hideLoading();
        }
      });
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
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;
      // Add this user to Firebase Database
      var database_ref = database.ref();
      database
        .ref()
        .child("users")
        .child(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            currentUser = snapshot.val();
            currentUser["uid"] = user.uid;
            var days = Math.round(
              (Date.now() - currentUser.paymentDate) / (1000 * 3600 * 24)
            );
            if (days >= 365) {
              alert(
                "Your Subscription Has Ended! Please Register Again to Continue your Subscription."
              );
            }
            var user_data = {
              last_login: Date.now(),
              registrationStatus:
                days >= 365 ? "Free" : currentUser.registrationStatus,
              paymentId: days >= 365 ? "NA" : currentUser.paymentId,
              paymentDate: days >= 365 ? "0" : currentUser.paymentDate,
            };

            database_ref
              .child("users/" + user.uid)
              .update(user_data)
              .then(() => {
                //window.location.href = "index.html";
              });
          }
        });
    })
    .catch(function (error) {
      var error_message = error.message;

      alert(error_message);
    });
});

// Set up Log out Fuction
function logOut() {
  auth.signOut();
  window.location.reload();
}

$("#talent-reg-form").on("submit", function (e) {
  e.preventDefault();
  window.showLoading();
  talentPaymentProcess();
});
$("#recruiter-reg-form").on("submit", function (e) {
  e.preventDefault();
  recruitPaymentProcess();
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

function talentPaymentProcess() {
  var options = {
    key: "rzp_live_UnQglSdwH20LwF",
    amount: 999 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
    currency: "INR",
    name: "Talent Registeration",
    description:
      "Become a Talent in CiniTimes and Get Hired for your favorite part!",
    image: "images/logo.png",
    handler: function (response) {
      talentSaveToDB(response);
      //$('#myModal').modal(); Can be used to say a success message
    },
    prefill: {
      name:
        document.getElementById("talentfname").value +
        " " +
        document.getElementById("talentlname").value,
      email: document.getElementById("talentemail").value,
      contact: document.getElementById("talentphone").value,
    },
    theme: {
      color: "#ff0000",
    },
  };
  var propay = new Razorpay(options);
  propay.open();
}

function talentSaveToDB(response) {
  var database_ref = database.ref();
  var userImageUrl;

  const formData = new FormData();
  formData.append(
    "file",
    document.getElementById("talentprofileimage").files[0]
  );
  formData.append("upload_preset", "fienawq5");

  fetch("https://api.cloudinary.com/v1_1/dsodqyejz/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      userImageUrl = JSON.parse(data).url;
      var user_data = {
        fname: document.getElementById("talentfname").value,
        lname: document.getElementById("talentlname").value,
        phone: document.getElementById("talentphone").value,
        profileName: document.getElementById("talentprofilename").value,
        country: document.getElementById("talentcountry").value,
        state: document.getElementById("talentstate").value,
        city: document.getElementById("talentcity").value,
        department: document.getElementById("talentdepartment").value,
        gender: document.getElementById("talentgender").value,
        dob: document.getElementById("talentdob").value,
        age: document.getElementById("talentage").value,
        height: document.getElementById("talentheight").value,
        weight: document.getElementById("talentweight").value,
        eyecolor: document.getElementById("talenteyecolor").value,
        haircolor: document.getElementById("talenthaircolor").value,
        hairtype: document.getElementById("talenthairtype").value,
        bust: document.getElementById("talentbust").value,
        hip: document.getElementById("talenthip").value,
        biceps: document.getElementById("talentbiceps").value,
        chest: document.getElementById("talentchest").value,
        edu: document.getElementById("talentedu").value,
        inst: document.getElementById("talentinst").value,
        expertise: document.getElementById("talentexpertise").value,
        availability: document.getElementById("talentavailability").value,
        languagesKnown: document.getElementById("talentlang").value,
        imageUrl: userImageUrl,
        aboutMe: document.getElementById("talentabout").value,
        contactType: document.getElementById("talentcontacttype").value,
        facebook:
          document.getElementById("talentfacebook").value == ""
            ? "NA"
            : document.getElementById("talentfacebook").value,
        instagram:
          document.getElementById("talentinstagram").value == ""
            ? "NA"
            : document.getElementById("talentinstagram").value,
        registrationStatus: "Talent",
        paymentId: response.razorpay_payment_id,
        paymentDate: new Date().getTime(),
      };

      // Push to Firebase Database
      try {
        database_ref
          .child("users/" + currentUser.uid)
          .update(user_data, (error) => {
            if (error) console.log(error);
            else {
              alert(
                "Congratulations! Your now a Talent in CiniTimes Studios. Have a Great Journey Ahead."
              );
              window.location.href = "usertemplate.html?id=" + currentUser.uid;
            }
          });
      } catch (error) {
        alert("Something went Wrong! Try Again.");
        window.location.href = "index.html";
      }
    });

  // Create User data
}

function recruitPaymentProcess() {
  var options = {
    key: "rzp_live_UnQglSdwH20LwF",
    amount: 999 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
    currency: "INR",
    name: "Recruiter Registeration",
    description: "Become a Talent Recruiter and Get your talent needs filled!",
    image: "images/logo.png",
    handler: function (response) {
      recruitSaveToDB(response);
      //$('#myModal').modal(); Can be used to say a success message
    },
    prefill: {
      name:
        document.getElementById("recfname").value +
        " " +
        document.getElementById("reclname").value,
      email: document.getElementById("recmail").value,
      contact: document.getElementById("recphone").value,
    },
    theme: {
      color: "#ff0000",
    },
  };
  var propay = new Razorpay(options);
  propay.open();
}

function recruitSaveToDB(response) {
  var database_ref = database.ref();
  var userImageUrl;

  const formData = new FormData();
  formData.append("file", document.getElementById("recprofileimage").files[0]);
  formData.append("upload_preset", "fienawq5");

  fetch("https://api.cloudinary.com/v1_1/dsodqyejz/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      recImageUrl = JSON.parse(data).url;
      var user_data = {
        fname: document.getElementById("recfname").value,
        lname: document.getElementById("reclname").value,
        phone: document.getElementById("recphone").value,
        country: document.getElementById("reccountry").value,
        state: document.getElementById("recstate").value,
        city: document.getElementById("reccity").value,
        gender: document.getElementById("recgender").value,
        organization: document.getElementById("recorg").value,
        project: document.getElementById("recproject").value,
        talent: document.getElementById("rectalent").value,
        about: document.getElementById("recabout").value,
        imageUrl: recImageUrl,
        registrationStatus: "Recruiter",
        paymentId: response.razorpay_payment_id,
        paymentDate: new Date().getTime(),
      };

      // Push to Firebase Database
      database_ref
        .child("users/" + currentUser.uid)
        .update(user_data, (error) => {
          if (error) console.log(error);
          else {
            alert(
              "Congratulations! Your now a Recruiter in CiniTimes Studios. Have a Great Journey Ahead."
            );
            window.location.href = "usertemplate.html?id=" + currentUser.uid;
          }
        });
    });
}

$("#event-submit").on("click", function () {
  var event_data = {
    title: document.getElementById("event_title").value,
    postedOn: new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
      new Date()
    ),
    expiryOn: new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    ),
    duration: document.getElementById("event_duration").value,
    description: document.getElementById("event-desp").value,
    role: document.getElementById("event_role").value,
    req: document.getElementById("event_req").value,
    ownerUid: currentUser.uid,
    ownerName: currentUser.fname + " " + currentUser.lname,
    ownerImageUrl: currentUser.imageUrl,
    ownerEmail: currentUser.email,
  };
  // Create a new post reference with an auto-generated id
  var eventListRef = database.ref("events");
  var newEventRef = eventListRef.push();
  newEventRef.set(event_data).then(function () {
    alert("Event Sucessfully Posted!");
    window.location.reload();
  });
});

function onImageUpload() {
  var userImageUrl;
  const formData = new FormData();
  formData.append("file", document.getElementById("image-input").files[0]);
  formData.append("upload_preset", "fienawq5");
  try {
    window.showLoading();
    fetch("https://api.cloudinary.com/v1_1/dsodqyejz/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        userImageUrl = JSON.parse(data).url;
        var imageListRef = database.ref("users/" + currentUser.uid + "/images");
        var newImageRef = imageListRef.push();
        newImageRef
          .set([userImageUrl, document.getElementById("youtube-link").value])
          .then(function () {
            alert("Image Sucessfully Posted!");
            window.location.reload();
          });
      });
  } catch (error) {
    alert("Image cannot be uploaded! Try using a different image.");
  }
}

function onImageDelete(imageId) {
  let searchParams = new URLSearchParams(window.location.search);
  let userId = searchParams.get("id");
  if (currentUser.uid == userId) {
    if (confirm("Do you want to Delete that Post?") == true) {
      try {
        window.showLoading();
        var imageListRef = database.ref("users/" + currentUser.uid + "/images");
        imageListRef
          .child(imageId)
          .remove()
          .then(function () {
            alert("Image Sucessfully Deleted!");
            window.location.reload();
          });
      } catch (e) {
        alert("Cannot Delete Image! Please Try again later.");
      }
    }
  }
}

function eventButtonFunction() {
  let searchParams = new URLSearchParams(window.location.search);
  let userId = searchParams.get("id");
  if (currentUser.uid == userId) {
    $(".event-button").text("Delete");
  } else {
    $(".event-button").hide();
  }
}

function onEventDelete(eventId) {
  let searchParams = new URLSearchParams(window.location.search);
  let userId = searchParams.get("id");
  if (currentUser.uid == userId) {
    if (confirm("Do you want to Delete that Event?") == true) {
      try {
        window.showLoading();
        var eventListRef = database.ref("events");
        eventListRef
          .child(eventId)
          .remove()
          .then(function () {
            alert("Event Sucessfully Deleted!");
            window.location.reload();
          });
      } catch (e) {
        alert("Cannot Delete Event! Please Try again later.");
      }
    }
  }
}

$("#talent-edit-submit").on("click", function (e) {
  e.preventDefault();
  window.showLoading();
  var database_ref = database.ref();
  var user_data = {
    fname: document.getElementById("talentfname").value,
    lname: document.getElementById("talentlname").value,
    phone: document.getElementById("talentphone").value,
    profileName: document.getElementById("talentprofilename").value,
    email: document.getElementById("talentemail").value,
    country: document.getElementById("talentcountry").value,
    state: document.getElementById("talentstate").value,
    city: document.getElementById("talentcity").value,
    department: document.getElementById("talentdepartment").value,
    gender: document.getElementById("talentgender").value,
    dob: document.getElementById("talentdob").value,
    age: document.getElementById("talentage").value,
    height: document.getElementById("talentheight").value,
    weight: document.getElementById("talentweight").value,
    eyecolor: document.getElementById("talenteyecolor").value,
    haircolor: document.getElementById("talenthaircolor").value,
    hairtype: document.getElementById("talenthairtype").value,
    bust: document.getElementById("talentbust").value,
    hip: document.getElementById("talenthip").value,
    biceps: document.getElementById("talentbiceps").value,
    chest: document.getElementById("talentchest").value,
    edu: document.getElementById("talentedu").value,
    inst: document.getElementById("talentinst").value,
    expertise: document.getElementById("talentexpertise").value,
    availability: document.getElementById("talentavailability").value,
    languagesKnown: document.getElementById("talentlang").value,
    aboutMe: document.getElementById("talentabout").value,
    contactType: document.getElementById("talentcontacttype").value,
    facebook:
      document.getElementById("talentfacebook").value == ""
        ? "NA"
        : document.getElementById("talentfacebook").value,
    instagram:
      document.getElementById("talentinstagram").value == ""
        ? "NA"
        : document.getElementById("talentinstagram").value,
  };

  // Push to Firebase Database
  try {
    database_ref
      .child("users/" + currentUser.uid)
      .update(user_data, (error) => {
        if (error) console.log(error);
        else {
          alert("Your Profile has been updated!");
          window.location.href = "usertemplate.html?id=" + currentUser.uid;
        }
      });
  } catch (error) {
    alert("Something went Wrong! Try Again.");
    window.location.href = "index.html";
  }
});

function paymentRenewProcess() {
  var options = {
    key: "rzp_live_UnQglSdwH20LwF",
    amount: 999 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
    currency: "INR",
    name: "Renew Subscription",
    description: "Best Choice you have made this year!",
    image: "images/logo.png",
    handler: function (response) {
      renewUpdateDB(response);
      //$('#myModal').modal(); Can be used to say a success message
    },
    modal: {
      ondismiss: paymentDenied,
    },
    prefill: {
      name: currentUser.fname + " " + currentUser.lname,
      email: currentUser.email,
      contact: currentUser.phone,
    },
    theme: {
      color: "#ff0000",
    },
  };
  var propay = new Razorpay(options);
  propay.open();
}

function renewUpdateDB(response) {
  console.log(response);
  var database_ref = database.ref();
  var user_data = {
    paymentId: response.razorpay_payment_id,
    paymentDate: new Date().getTime(),
  };

  // Push to Firebase Database
  database_ref.child("users/" + currentUser.uid).update(user_data, (error) => {
    if (error) console.log(error);
    else {
      alert("Congratulations! Your Subscription is Sucessfully Renewed!");
      window.location.href = "index.html";
    }
  });
}

function paymentDenied() {
  var user_data = {
    registrationStatus: "Free",
    paymentId: "NA",
    paymentDate: "0",
  };
  database_ref = database.ref();
  database_ref
    .child("users/" + currentUser.uid)
    .update(user_data)
    .then(() => {
      window.location.href = "index.html";
    });
}
