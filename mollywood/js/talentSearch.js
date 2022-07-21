$(document).ready(function () {
  window.showLoading();
  const ref = firebase.database().ref("users");
  ref
    .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().registrationStatus == "Talent") {
          var data = childSnapshot.val();
          $("#card-section").append(
            "<div class='card-flex friend-card' id = '" +
              childSnapshot.key +
              "'> <div class='img-container'> <img class='avatar' src='" +
              data.imageUrl +
              "' data-demo-src='images/cinitimes.png' alt=''></div><div class='friend-info'><h3>" +
              data.fname +
              " " +
              data.lname +
              "</h3><p style='text-align: center;'>" +
              data.department +
              "</p></div></div>"
          );
        }
      });
    })
    .then(() => {
      window.hideLoading();
    });
});

$("div").on("click", "div.friend-card", function (e) {
  var id = $(this).attr("id");
  window.location.href = "usertemplate.html?id=" + id;
});
