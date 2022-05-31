$(document).ready(function () {
  window.showLoading();
  let searchParams = new URLSearchParams(window.location.search);
  let userId = searchParams.get("id");
  const dbRef = firebase.database().ref();
  dbRef
    .child("users")
    .child(userId)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        var user_data = snapshot.val();
        $("#recname").text(user_data.fname + " " + user_data.lname);
        $("#recabout").text(user_data.about);
        $("#recimage").attr("src", user_data.imageUrl);
        window.hideLoading();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
