$(document).ready(function () {
  window.showLoading();
  const ref = firebase.database().ref("events");
  ref
    .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.val();
        console.log("Hi");
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
      });
    })
    .then(() => {
      window.hideLoading();
    });
});

function openRecruiter(id) {
  window.location.href = "rectemplate.html?id=" + id;
}
