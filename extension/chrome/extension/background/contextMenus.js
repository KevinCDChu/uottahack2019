let timer = null;
let time = 0;

var startTimer = () => {
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

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  var url = tabs[0].url;
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab){
        var pattern = /(http\:\/\/|https\:\/\/)?(www.)?(facebook|twitter|reddit|youtube|netflix).*/;
        if (pattern.test(tab.url)){
            startTimer();
        } else {
          stopTimer();
        }
    });
  }); 
});


