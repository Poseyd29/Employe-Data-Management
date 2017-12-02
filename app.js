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

//click the button
$('#add-button').on('click', function(event){
  event.preventDefault();

  //find all of the values
  var name =  $('#employee-name').val().trim();
  var role = $('#role').val().trim();
  var start = $('#start-date').val().trim()
  //converts the javascript date format into a unix code  
  var unixStart = moment(start, 'YYYY/MM/DD').format('X');
  var rate =  $('#monthly-rate').val().trim();
  
  

  //push them to firebase
  database.ref().push({
    name: name,
    role: role,
    start: unixStart,
    rate: rate,
    // dateAdded: firebase.ServerValue.TIMESTAMP
  });

  //clear fields
  $('#employee-name').val('');
  $('#role').val('');
  $('#start-date').val('');
  $('#monthly-rate').val('');

});

database.ref().on("child_added", function(childSnapshot) {

  //takes the unix code date and converts it back to mm/dd/yy
  var startDateFormat = moment.unix(childSnapshot.val().start).format('MM/DD/YY');
  //calculates the difference between today and the start date and return the number of months
  var months = moment().diff(moment.unix(childSnapshot.val().start, 'X'), 'months');
  var billed = months * childSnapshot.val().rate;

  $('.table').append('<tr><td>' + childSnapshot.val().name + '</td><td>' + childSnapshot.val().role + '</td><td>' + startDateFormat + '</td><td>' + months + '</td><td>' + childSnapshot.val().rate + '</td><td>' + billed + '</td></tr>');
});
