$(document).ready(function () {
  let searchParams = new URLSearchParams(window.location.search);
  let userId = searchParams.get("id");
  const dbRef = firebase.database().ref();
  window.showLoading();
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
        $("#talentlang").text(user_data.languagesKnown);
        $("#talentlocation").text(
          user_data.city + ", " + user_data.state + ", " + user_data.country
        );
        $("#talentavailability").text(user_data.availability);
        $("#talentabout").text(user_data.aboutMe);
        $("#talentprofileimage").attr("src", user_data.imageUrl);
        var contactType = user_data.contactType;
        if (contactType == "whatsapp")
          $("#contact-button").attr("href", "https://wa.me/" + user_data.phone);
        else if (contactType == "phone")
          $("#contact-button").attr("href", "tel:" + user_data.phone);
        else $("#contact-button").attr("href", "mailto:" + user_data.email);
        if (user_data.facebook == "NA") $("#talentfacebook").hide();
        else $("#talentfacebook").children().attr("href", user_data.facebook);
        if (user_data.instagram == "NA") $("#talentinstagram").hide();
        else $("#talentinstagram").children().attr("href", user_data.instagram);
        try {
          for (val in user_data.images) {
            $("#post-section").append(
              `<div class="col-md-4">
                <div class="grid-post-item  bold_gpi  fl-wrap">
                    <div class="grid-post-media">
                        <a class="gpm_link" onclick="onImageDelete('${val}')">
                            <div class="bg-wrap">
                                <img style="width: 100%" src="${user_data.images[val]}"></img>
                            </div>
                        </a>
                        <span class="post-media_title">&copy; Cinitimes</span>
                    </div>
                </div>
              </div>`
            );
          }
        } catch (e) {
          $("#post-section").append(
            `<h1 style="text-align: center; font-weight: 600; font-size: 1rem; color: #999999; padding: 2rem;">User doesn't have any posts.</h1>`
          );
        }
        window.hideLoading();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
