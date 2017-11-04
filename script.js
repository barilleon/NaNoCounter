var wordCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var toggled = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var wordGoal = 50000;


/* This loads the state from the last cookies saved */
function loadCookies() {
  if (getCookie("wordCount"))
  {
    // console.log("We have a cookie!");
    // console.log(getCookie("wordCount"));
    wordCount = getCookie("wordCount").split(',').map(Number);
    toggled = getCookie("toggled").split(',').map(Number);
    wordGoal = Number(getCookie("wordCount"));

    // Set Word Goal: 
    $("#wordGoal").val(wordGoal);

    // Make sure all locked cells stay locked.
    for (var i = 0; i < toggled.length; i++) {
      if (toggled[i] == 1) {
        var selector = "#" + (i+ 1).toString();
        $(selector).addClass("changed");
      }
    }
  }

}

function setCookies() {
  setCookie("wordCount", wordCount.toString(), 30);
  setCookie("toggled", toggled.toString(), 30);
  setCookie("wordGoal", wordGoal.toString(), 30);
}


/* These two functions were taken from w3schools 
   Because, well, they work */

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(getCookie(cname));
}

function updateWords(n) {
  for (var i = 0; i < toggled.length; i++) {
    // console.log(toggled[i]);
    if (toggled[i] == 0) {
      // change it! 
      wordCount[i] = n;
      $("#" + (i + 1).toString() + " input").val(n);
    }
  }
  // console.log(wordCount);
  // console.log(toggled);
}

function adjustCount() {
  wordGoal = $("#goal").val();
  var unlocked = 31;
  var wordTotal = 0;
  // Iterate through toggled array - count the zeroes
  for (var i = 0; i < toggled.length; i++) {
    if (toggled[i] == 1) {
      // Add it to the total
      wordTotal += wordCount[i];
      unlocked -= 1;
    }
  }
  // Get the number of words we need
  var wordsLeft = wordGoal - wordTotal;
  if (wordsLeft > 0) {
    wordSplit = Math.ceil(wordsLeft / unlocked);
  } else {
    wordSplit = 0;
  }

  updateWords(wordSplit);
  setCookies();
}

function resetToZero() {
  wordCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  toggled = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  setCookies();
  $("th").removeClass("changed");
  adjustCount();
}


$(document).ready(function() {

  loadCookies();

  for (var i = 0; i < wordCount.length; i++) {

    // Set the number of the date
    $("#" + (i + 1).toString() + " div").text(i + 1);

    // Set the saved word count.
    $("#" + (i + 1).toString() + " input").val(wordCount[i]);
  }

  // On changing the value of a word count...
  $('.change').on('change', function() {

      // alert( this.value );
      $(this).parent().addClass("changed");
      var day = $(this).parent().attr("id");

      wordCount[Number(day) - 1] = Number($(this).val());
      toggled[Number(day) - 1] = 1;
      setCookies();
    })


  // When you click on a column you should lock/unlock it
  $('.clickable').on('click', function() {
    $(this).toggleClass("changed");
    var day = $(this).attr("id");
    toggled[Number(day) - 1] = (toggled[Number(day)] + 1) % 2;
    setCookies();
  })

  // Setting Recalculate and Reset buttons
  $('#recalculate').click(adjustCount);
  $('#reset').click(resetToZero);


  // adjustCount();

});
