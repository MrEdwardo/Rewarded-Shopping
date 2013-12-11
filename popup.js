var bgPage = null;

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#modeOff').addEventListener('click', modeOffClick);
  document.querySelector('#modeOn').addEventListener('click', modeOnClick);

  bgPage = chrome.extension.getBackgroundPage();
  console.log("bgPage mode is set to " + bgPage.mode);

  if(bgPage.mode === "off") {
    $('#modeOff').addClass('active');
    $('#modeOn').removeClass('active');
  } else if(bgPage.mode === "on") {
    $('#modeOn').addClass('active');
    $('#modeOff').removeClass('active');
  }
});

// EVENT HANDLERS__________________
function modeOffClick() {
  bgPage.mode = 'off';
  chrome.storage.sync.set({'mode': 'off'}, function() {
    console.log('Settings saved as OFF');
    $('#modeOff').addClass('active');
    $('#modeOn').removeClass('active');
  });
}

function modeOnClick() {
  bgPage.mode = 'on';
  chrome.storage.sync.set({'mode': 'on'}, function() {
    console.log('Settings saved as ON');
    $('#modeOn').addClass('active');
    $('#modeOff').removeClass('active');
  });
}