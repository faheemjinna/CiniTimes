$(document).ready(function () {
  const ref = firebase.database().ref("users");
  ref.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().registrationStatus == "Talent") {
        var data = childSnapshot.val();
        $("#card-section").append(
          "<div class='card-flex friend-card' id = '"+ 
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
        console.log(childSnapshot);
      }
    });
  });
});

$('div').on("click","div.friend-card",function(e){
    console.log("Hi")
    var id = $(this).attr('id');
    window.location.href = "usertemplate.html?id="+id;
});

{
  /*                                 <div class="card-flex friend-card">
                                        <div class="img-container">
                                            <img class="avatar" src="../via.placeholder.com/300x300.png"
                                                data-demo-src="images/cinitimes.png" alt="">
                                            <img class="country" src="images/all/india.png" alt="">
                                        </div>
                                        <div class="friend-info">
                                            <h3>Faheem Jinna</h3>
                                            <p style="text-align: center;">Actor/Comdeian</p>
                                        </div>
                                    </div> */
}
