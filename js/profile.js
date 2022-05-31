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
        $("#talentname").text(user_data.fname + " " + user_data.lname);
        $("#talentdepartment").text(user_data.department);
        $("#talentgender").text(user_data.gender);
        $("#talentage").text(user_data.age);
        $("#talentedu").text(user_data.edu);
        $("#talentinst").text(user_data.inst);
        $("#talentheight").text(user_data.height + " cms");
        $("#talentweight").text(user_data.weight + " Kg");
        $("#talentbust").text(user_data.bust + " inches");
        $("#talenthips").text(user_data.hip + " inches");
        $("#talentchest").text(user_data.chest + " inches");
        $("#talentbiceps").text(user_data.biceps + " inches");
        $("#talenthairtype").text(user_data.hairtype);
        $("#talentexpertise").text(user_data.expertise);
        $("#talentlocation").text(
          user_data.city + ", " + user_data.state + ", " + user_data.country
        );
        $("#talentavailability").text(user_data.availability);
        $("#talentabout").text(user_data.aboutMe);
        $("#talentprofileimage").attr("src", user_data.imageUrl);
        window.hideLoading();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
