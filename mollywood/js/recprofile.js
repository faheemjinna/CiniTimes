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
          for (val in user_data.images) {
            $("#post-section").append(
              `<div class="col-md-4">
                  <div class="grid-post-item  bold_gpi  fl-wrap">
                      <div class="grid-post-media">
                          <a class="gpm_link" onclick="onImageDelete('${val}')">
                              <div class="bg-wrap">
                                  <img src="${user_data.images[val]}"></img>
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
            `<div class="card-flex friend-card" style="width: 100%;padding: 0; ">
          <div style="width: 100%; height: 100%; padding: 0; width: 100%;">
          <div style="">
              <div class="subcribe-form fl-wrap textcenter" style="position: relative; padding: 0;">
                  <button type="submit" id="contact-button" class="subscribe-button color-bg" style="width: 100px; height:50px; padding: 0; float: left; border-radius: 5px;">
                      <h7 style="margin-top: -35px;">Premium</h7>
                  </button>
              </div>
              <div style="background-color: transparent; width: 70%; height: 100%; float: left;  border-radius: 20px;position: relative; margin-top: -50px; height: auto;">
                  <h3 style=" margin-top: 60px; padding: 10px; text-align: left; font-size: 17px; font-weight: bolder;">${data.title}</h3><br>
                  <h2 style="float: left;padding-left: 10px;margin-right: 10px; font-size: 13px; font-weight: bold; margin-top: -15px;">Project Description</h2>
                  <h2 style="float: left;padding-left: 10px;margin-right: 10px;font-weight: 500; font-size: 13px; margin-top: 0px;text-align: justify; line-height: 150%; margin-bottom: 20px; min-height: 100px;">${data.description}</h2>
                  <div style="padding: 10px; float: right; margin-top: -20px;">
                      <p style=" text-align: left; font-size: 14px; font-weight: bold; margin-bottom: 1px;"><a style="color: black;">Posted by:
                      </a></p>
                      <p style=" font-size: 12px; font-weight: bold; color: black;"><img onclick="openRecruiter('${data.ownerUid}')" src="${data.ownerImageUrl}" alt="Logo" style="width:30px;height:30px;margin-right:5px; border-radius: 100%; font-size: 14px; font-weight: bold;">
                          ${data.ownerName} </div>
              </div>
          </div>
              <div style="background-color:#f2f2f2; width: 30%;height: 100%; float: left;border-radius: 5px; left: 70%;margin-top: -50px; overflow: hidden;">
                <div class="friend-info" style="padding: 10px;">
                  <p style=" text-align: center;"><a style="color: black;">Posted on:
                      </a>${data.postedOn}</p> 
                      <p style="margin-top: -15px; text-align: center; "><a
                          style="color: black;">Expiry on: </a>${data.expiryOn}</p>
                  <p style="margin-top: -15px; text-align: center;"><a
                          style="color: black;">Duration: </a>${data.duration}</p>
                          <p style="margin-top: -5px; text-align: center; color: black; font-size: 16px; font-style: bold;font-weight: bolder; padding-left: 10px; padding-right: 10px;"><a 
                              style="color: black;"></a>${data.title}</p>
                          <p style="margin-top: -5px; text-align: center; color: black;"><a 
                                  ></a>${data.req}</p>
                          <p style="margin-top: -15px; text-align: center; color: black;"><a 
                                          style="color: black;"></a>${data.role}</p>
                                          
              </div>
              <div class="subcribe-form fl-wrap" style="display: flex;
              justify-content: center;
              align-items: center;">
              <button id="${childSnapshot.key}" onclick="onEventDelete('${childSnapshot.key}')"
              class="subscribe-button color-bg event-button" style="width: 110px;">Contact
          </button>
              </div>
              </div>
          </div>
      </div>`
          );
        }
      });
    })
    .then(() => {
      eventButtonFunction();
      window.hideLoading();
    });
});

`<div class="col-md-4">
  <div class="grid-post-item  bold_gpi  fl-wrap">
      <div class="grid-post-media">
          <a href="post-single.html" class="gpm_link">
              <div class="bg-wrap">
                  <div class="bg" data-bg="images/all/kollywood/pathu-thala-movie-will-resume.jpg"></div>
              </div>
          </a>
          <span class="post-media_title">&copy; Cinitimes</span>
      </div>
  </div>
</div>`;
