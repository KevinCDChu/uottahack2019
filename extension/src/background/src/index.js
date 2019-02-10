/* eslint-disable import/no-extraneous-dependencies */
/*global chrome*/

import { createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import devToolsEnhancer from 'remote-redux-devtools';

import reducers from './reducers';

const store = createStore(reducers, devToolsEnhancer({ realtime: true }));

wrapStore(store, {
  portName: 'MY_APP',
});


let timer = null;
let time = 0;
var currentURL = "";
var current = "";
var pattern = /(http\:\/\/|https\:\/\/)?(www.)?(facebook|twitter|reddit|youtube|netflix).*/;
var facebookPattern = /(http\:\/\/|https\:\/\/)?(www.)?(facebook).*/;
var twitterPattern = /(http\:\/\/|https\:\/\/)?(www.)?(twitter).*/;
var redditPattern = /(http\:\/\/|https\:\/\/)?(www.)?(reddit).*/;
var youtubePattern = /(http\:\/\/|https\:\/\/)?(www.)?(youtube).*/;
var netflixPattern = /(http\:\/\/|https\:\/\/)?(www.)?(netflix).*/;

var startTimer = () => {
  time = 0;
    timer= setInterval(incrementTime, 1000)
}

var stopTimer = () => {
  if(timer != null){
    clearInterval(timer);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        console.log(this.responseText);
    };
    xhr.send('platform='+current+'&seconds='+time);
    current="";
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
        if (facebookPattern.test(url)){
          current="facebook"
        } else if (twitterPattern.test(url)){
          current="twitter"
        } else if (redditPattern.test(url)){
          current="reddit"
        } else if(youtubePattern.test(url)){
          current="youtube"
        } else if(netflixPattern.test(url)){
          current="netflix"
        }
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



