var config = {
  apiKey: "AIzaSyDgTWPsx9ISlBmI7XL7GB2Sn4pBS_N2eEs",
  authDomain: "employee-data-management-f4a27.firebaseapp.com",
  databaseURL: "https://employee-data-management-f4a27.firebaseio.com",
  projectId: "employee-data-management-f4a27",
  storageBucket: "employee-data-management-f4a27.appspot.com",
  messagingSenderId: "236542683419"
};
firebase.initializeApp(config);

var database = firebase.database();

// database.ref().on("value", function(snapshot) {


//click the button
$('#add-button').on('click', function(event){
  event.preventDefault();
  //find all of the values
  var name =  $('#employee-name').val().trim();
  var role = $('#role').val().trim();
  var start = $('#start-date').val().trim();
  var rate =  $('#monthly-rate').val().trim();
  console.log(name)
  //push them to firebase
  database.ref().push({
    name: name,
    role: role,
    start: start,
    rate: rate
  });
});

//append row to table

//loop over the firebase array
//var something = snapshop.val().objectName;
//$('').append('<tr><td>' + name + '</td><td>' + role + '</td><td>' + date + '</td><td>' + rate + '</tr>');