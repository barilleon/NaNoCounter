var wordCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var toggled = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var wordGoal = 50000;

/* function loadCookies() {
  if (getCookie("wordCount"))
  {
    console.log("We have a cookie!");
    wordCount = getCookie("wordCount".split(','));
    toggled = getCookie("toggled".split(','));
    wordGoal = getCookie("wordCount");
  }

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
}*/

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
  /* console.log("Setting cookies: ");
  setCookie("wordCount", wordCount.toString(), 30);
  console.log(wordCount.toString());
  setCookie("toggled", toggled.toString(), 30);
  console.log(toggled.toString());
  setCookie("wordGoal", wordGoal);*/
}

function resetToZero() {
  wordCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  toggled = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  $("th").removeClass("changed");
  adjustCount();
}




$(document).ready(function() {

  // loadCookies();

  for (var i = 0; i < wordCount.length; i++) {
    console.log(wordCount[i]);
    $("#" + (i + 1).toString() + " div").text(i + 1);
    $("#" + (i + 1).toString() + " input").val(wordCount[i + 1]);
  }

  $('.change').on('change', function() {
      // alert( this.value );
      $(this).parent().addClass("changed");
      var day = $(this).parent().attr("id");

      wordCount[Number(day) - 1] = Number($(this).val());
      toggled[Number(day) - 1] = 1;
    })
    // When you click on a column you should lock/unlock it
  $('th').on('click', function() {
    $(this).toggleClass("changed");
    var day = $(this).attr("id");
    toggled[Number(day) - 1] = (toggled[Number(day)] - 1) % 2;
  })

  $('#recalculate').click(adjustCount);
  $('#reset').click(resetToZero);


  adjustCount();

});
