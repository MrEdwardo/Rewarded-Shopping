
// gets number of user purchases and displays them
function restore_user_purchases() {
  chrome.storage.sync.get('transactions', function(items) {
    if(items != null) {
      var splitItems = items.split(";");
      $("#purchasesValue").text(splitItems.length());
    }
  });
}

function add_debug_transaction() {

}

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

// Restores check box state to saved value from local storage.
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
document.querySelector('#addTransaction').addEventListener('click', add_debug_transaction);