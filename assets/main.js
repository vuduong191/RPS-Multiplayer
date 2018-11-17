$(document).ready(function() {
var config = {
    apiKey: "AIzaSyDnSKcK450cM1SRo6doE2oCQVOkigTa6Ow",
    authDomain: "testproject-ccb91.firebaseapp.com",
    databaseURL: "https://testproject-ccb91.firebaseio.com",
    projectId: "testproject-ccb91",
    storageBucket: "testproject-ccb91.appspot.com",
    messagingSenderId: "561234705065"
};

firebase.initializeApp(config);
var database = firebase.database();

// Generate the stored result
database.ref().on("value", function(snapshot) {
  if (snapshot.child("playerAScore").exists() && snapshot.child("playerBScore").exists()) {
    var playerAScore = parseInt(snapshot.val().playerAScore);
    var playerBScore = parseInt(snapshot.val().playerBScore);
  }
  console.log(playerAScore);
  console.log(playerBScore);
  $("#player_a_score").text(playerAScore);
  $("#player_a_score").attr('score',playerAScore);
  $("#player_b_score").text(playerBScore);
  $("#player_b_score").attr('score',playerBScore);
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
var Afinal;
var Bfinal;
var playerAChosen = false;
var playerBChosen = false;
$("#resetscore").on("click",function(){
  $("#pop")[0].play();
  database.ref().update({
    playerAScore : 0,
    playerBScore : 0
  }); 
})
$(".badge").on("click", function(event) {
  $("#pop")[0].play();
  event.preventDefault();
    $("#image1").empty();
    $("#image2").empty();
    $('#console').empty();  
  var chosen = $(this).attr("value");
  var whichPlayer = $(this).attr("player")
  console.log(chosen);
  console.log("----------------");
  console.log(whichPlayer);
  if (whichPlayer==1){
    playerAChosen = true;
    $("#status1").text("Player 1 has selected");
    Afinal = chosen;
  };
  if(whichPlayer==2){
    playerBChosen = true;
    Bfinal = chosen;
    $("#status2").text("Player 2 has selected")    ;
  };
  if(playerAChosen && playerBChosen){
    $('#console').text("computing...");
    setTimeout(function(){ compare(Afinal, Bfinal); }, 2000);        
    
  }

});
function compare(x,y){
  $("#rightsound")[0].play();
  $("#status1").empty();
  $("#status2").empty();
  $("#image1").html(
    "<img src='assets/images/"+x+".png'>"+
    "<div class =circle></div>"
  );
  $("#image2").html(
    "<img src='assets/images/"+y+".png'>"+
    "<div class =circle></div>"
  );    
  switch (x+"|"+y){
    case "rock1|rock2":
    case "paper1|paper2":
    case "scissors1|scissors2":
      $('#console').text("Draw");
      break;
    case "rock1|scissors2":
    case "scissors1|paper2":
    case "paper1|rock2":
      $('#console').text("A wins");
      database.ref().update({
        playerAScore : parseInt($("#player_a_score").attr('score')) +1
      });      
      break;
    case "rock1|paper2":
    case "paper1|scissors2":
    case "scissors1|rock2":
      $('#console').text("B wins");
      database.ref().update({
        playerBScore : parseInt($("#player_b_score").attr('score')) +1
      });      
      break;
    default:
      console.log("Default was reached")    
  };
  playerBChosen = false;
  playerAChosen = false;
}

// Create a switch to disable adding new choice
// Store  the data on firebase
// $("#submit-bid").on("click", function(event) {
//   event.preventDefault();
//   // Get the input values
//   var bidderName = $("#bidder-name").val().trim();
//   var bidderPrice = parseInt($("#bidder-price").val().trim());

//   // Log the Bidder and Price (Even if not the highest)
//   console.log(bidderName);
//   console.log(bidderPrice);

//   if (bidderPrice > highPrice) {

//     // Alert
//     alert("You are now the highest bidder.");

//     // Save the new price in Firebase. This will cause our "value" callback above to fire and update
//     // the UI.
//     database.ref().set({
//       highBidder: bidderName,
//       highPrice: bidderPrice
//     });

//     // Log the new High Price
//     console.log("New High Price!");
//     console.log(bidderName);
//     console.log(bidderPrice);
//   }

//   else {

//     // Alert
//     alert("Sorry that bid is too low. Try again.");
//   }
// })


});