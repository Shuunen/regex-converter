(function () {

    saveRestoreDataInLocalStorage();

    // this timeout allow phoenix to restore textarea code before CodeMirror init
    setTimeout(initCodeEditors, 200);

}).call(this);


function saveRestoreDataInLocalStorage() {

    var saveInputs = $('input, textarea[name="code-in"]');

    // console.info('inputs to save', saveInputs);

    saveInputs.phoenix();

    /*
    saveInputs.bind('phnx.loaded', function (e) {
        console.log('Data loaded... ')
    });

    saveInputs.bind('phnx.removed', function (e) {
        console.log("Data removed");
    });

    saveInputs.bind('phnx.stopped', function (e) {
        console.log("Save timer stopped");
    });

    saveInputs.bind('phnx.started', function (e) {
        console.log("Save timer started");
    });
    */
}

function initCodeEditors() {

    var els = document.getElementsByClassName('code');

    for (var i = 0; i < els.length; i++) {
        var textarea = els[i];
        var editor = CodeMirror.fromTextArea(textarea, {
            mode: "text/html",
            lineNumbers: true
        });
        editor.on('change', function (e) {
            console.log('editor change...', e);
            e.save();
        });
    }
}