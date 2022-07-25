$(document).ready(function () {
  window.showLoading();
  const ref = firebase.database().ref("events");
  var events = [];
  ref
    .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        events.push(childSnapshot.val());
      });
    })
    .then(() => {
      events.reverse();
      events.forEach((data) => {
        $("#card-section").append(
          `<div class="card-flex friend-card" style="width: 100%; height: 100%; padding: 0;">
                                          
            <div class="subcribe-form fl-wrap textcenter" style="position: relative; padding: 0;">
                <button type="submit" id="contact-button" class="subscribe-button color-bg" style="width: 100px; height:50px; padding: 0; float: left; border-radius: 5px;">
                    <h7 style="margin-top: -35px;">Premium</h7>
                </button>
            </div>
            <div style="background-color: transparent; width: 70%; float: left;  border-radius: 20px;position: relative; margin-top: -50px; height: auto;">
                <h3 style=" margin-top: 60px; padding: 10px; text-align: left;">${data.title}</h3><br>
                <h2 style="float: left;padding-left: 10px;margin-right: 10px; font-size: 15px; margin-top: -30px;">Project Description</h2>
                <h2 style="float: left;padding-left: 10px;margin-right: 10px;font-weight: 500; font-size: 13px; margin-top: 0px;text-align: justify; line-height: 150%; margin-bottom: 20px; min-height: 100px;">${data.description}</h2>
                <div style="padding: 10px; float: right; margin-top: -20px;">
                    <p style=" text-align: left; font-size: 14px; font-weight: bold; margin-bottom: 1px;"><a style="color: black;">Posted by:
                    </a></p>
                    <p style=" font-size: 12px; font-weight: bold; color: black;"><img src="${data.ownerImageUrl}" alt="Logo" style="width:30px;height:30px;margin-right:5px; border-radius: 100%; font-size: 14px; font-weight: bold;">
                        ${data.ownerName} </div>
              
              
            </div>
            <div style="background-color:#f2f2f2;width: 30%; float: left;border-radius: 5px; position: absolute; left: 70%;">
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
                <button type="submit" id="contact-button" onclick="openRecruiter('${data.ownerUid}')"
                    class="subscribe-button color-bg" style="width: 100px; height: 50px; margin-bottom: 10px;">Contact
                </button>
            </div>
            </div>
          
    
    </div>`
        );
      });
      window.hideLoading();
    });
});

function openRecruiter(id) {
  window.location.href = "rectemplate.html?id=" + id;
}
