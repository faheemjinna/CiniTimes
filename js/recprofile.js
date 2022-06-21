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
        try {
          Object.values(user_data.images).forEach(function (val) {
            $("#post-section").append(
              `<div class="col-md-4">
                  <div class="grid-post-item  bold_gpi  fl-wrap">
                      <div class="grid-post-media">
                          <a class="gpm_link">
                              <div class="bg-wrap">
                                  <img src="${val}"></img>
                              </div>
                          </a>
                          <span class="post-media_title">&copy; Cinitimes</span>
                      </div>
                  </div>
                </div>`
            );
          });
        } catch (e) {
          $("#post-section").append(
            `<h2 style="text-align: center"> User doesn't have any posts.</h2>`
          );
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  dbRef
    .child("events")
    .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.val();
        if (data.ownerUid == userId) {
          $("#card-section").append(
            `<div class="card-flex friend-card col-md-4">
            <div class="star-friend is-active">
                <i data-feather="star"></i>
            </div>
            <div class="img-container">
                <img class="avatar" src="${data.ownerImageUrl}"
                    data-demo-src="images/cinitimes.png" alt="">
                <img class="country" src="images/all/india.png" alt="">
            </div>
            <div class="friend-info">
                <h2 style="font-weight: bold;">${data.title}</h2>
                <p style=" text-align: justify;"><a style="color: black;">Posted by:
                    </a>${data.ownerName}</p>
                <p style="margin-top: -15px; text-align: justify;"><a href="show-reg-form"
                        style="color: black;">Duration: </a>${data.duration}</p>
                <p style="margin-top: -15px; text-align: justify;"><a href="show-reg-form"
                        style="color: black;">Posted on: </a>${data.postedOn}</p>
                <p style="margin-top: -15px; text-align: justify;"><a
                        style="color: black;">Expiry on: </a>${data.expiryOn}</p>
                <p style="margin-top: -15px; text-align: justify; height: 150px; overflow: scroll;"><a
                        style="color: black;">Project Description: </a>${data.description}</p>
                <div class="subcribe-form fl-wrap textcenter">
                    <button type="submit" id="contact-button" onclick="openRecruiter('${data.ownerUid}')"
                        class="subscribe-button color-bg" style="width: 110px;">Contact
                    </button>
                </div>
            </div>
        </div>`
          );
        }
      });
    })
    .then(() => {
      window.hideLoading();
    });
});

`<div class="col-md-4">
  <div class="grid-post-item  bold_gpi  fl-wrap">
      <div class="grid-post-media">
          <a href="post-single.html" class="gpm_link">
              <div class="bg-wrap">
                  <div class="bg" data-bg="images/all/16.jpg"></div>
              </div>
          </a>
          <span class="post-media_title">&copy; Cinitimes</span>
      </div>
  </div>
</div>`;
