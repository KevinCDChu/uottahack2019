let timer = null;
let time = 0;
var currentURL = "";
var current = false;
var pattern = /(http\:\/\/|https\:\/\/)?(www.)?(facebook|twitter|reddit|youtube|netflix).*/;

var startTimer = () => {
  time = 0;
    timer= setInterval(incrementTime, 1000)
}

var stopTimer = () => {
  if(timer != null){
    clearInterval(timer);
    time = 0;
  }
  
}
var incrementTime = () => {
  time++;
  console.log(time);
}
var checkURL = () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    if(tabs.length > 0){
      var tab = tabs[0];
      var url = tab.url;
      if(url != currentURL){
        if (pattern.test(url)){
          stopTimer();
          startTimer();
        } else {
          stopTimer();
        }
        currentURL = url; 
      }
    }
  });
  
}

setInterval(checkURL, 500);