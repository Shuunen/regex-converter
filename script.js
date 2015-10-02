(function () {


    var els = document.getElementsByClassName('code');

    for (var i = 0; i < els.length; i++) {
        CodeMirror.fromTextArea(els[i], {
            mode: "text/html",
            lineNumbers: true
        });
    }


    var saveInputs = $('textarea');

    console.info('inputs to save', saveInputs);

    saveInputs.phoenix();

    saveInputs.bind('phnx.loaded', function (e) {
        console.log('Data loaded... ')
    });
    
    saveInputs.bind('phnx.saved', function(e) {
        console.log("Data saved");
    });

    saveInputs.bind('phnx.removed', function(e) {
        console.log("Data removed");
    });

    saveInputs.bind('phnx.stopped', function(e) {
        console.log("Save timer stopped");
    });

    saveInputs.bind('phnx.started', function(e) {
        console.log("Save timer started");
    });

}).call(this);
