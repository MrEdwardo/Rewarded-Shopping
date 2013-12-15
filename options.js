// Saves options to local storage.
function save_options() {
  if($("#onOffState").is(':checked')){
    chrome.storage.sync.set({'onOffState': 'on'}, function() {
      console.log('Settings saved as ON');
    });
  } else {
    chrome.storage.sync.set({'onOffState': 'off'}, function() {
      console.log('Settings saved as OFF');
    });
  }
}

// Restores select box state to saved value from local storage.
function restore_options() {
  chrome.storage.sync.get('onOffState', function(items) {
      if(items != null && items['onOffState'] != null) {
        if(items['onOffState'] === 'on'){
          console.log("got onOffState from storage: ON");
          $("#onOffState").prop("checked", true);
        } else if(items['onOffState'] === 'off') {
          console.log("got onOffState from storage: OFF");
          $("#onOffState").prop("checked", false);
        }
      } else {        
      }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);