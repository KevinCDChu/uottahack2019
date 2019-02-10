// import solace from './solclient-full';
// //  "content_security_policy": "default-src 'self'; script-src 'self' http://localhost:3000 https://localhost:3000 'unsafe-eval'; connect-src http://localhost:3000 https://localhost:3000; style-src * 'unsafe-inline' 'self' blob:; img-src 'self' data:;"

// const messaging = {
//     title: "LazyTax",
//     broker: {
//         url: "ws://mr4b11zr9sp.messaging.mymaas.net:80",
//         vpnName: "msgvpn-4b11zr9rv",
//         userName: "solace-cloud-client",
//         password: "8mhhl688k859m6ugn9dvnjva97"
//     }
// };
// var factoryProps = new solace.SolclientFactoryProperties();
// factoryProps.profile = solace.SolclientFactoryProfiles.version10;
// solace.SolclientFactory.init(factoryProps);

// function subscribe(topic) {
//     this.client.subscribe(solace.SolclientFactory.createTopicDestination(topic),
//         //true, // request confirmation
//         false,
//         topic, // correlation key so we know which subscription suceedes
//         1000 // subscribe timeout
//     );
// }

// var client = solace.SolclientFactory.createSession(messaging.broker);
// client.on(solace.SessionEventCode.UP_NOTICE, function () {
//     console.log('connected');
// });
// client.connect();
// client.on(solace.SessionEventCode.UP_NOTICE, function () {
//     console.log('connected');
//     subscribe("try-me");
// });

// client.on(solace.SessionEventCode.MESSAGE, message => {
//     console.log(message);  
// });
// window.client = client;

 //
let timer = null;
let time = 0;
var currentURL = "";  
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