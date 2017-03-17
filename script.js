(function () {
    saveRestoreDataInLocalStorage();
    // this timeout allow phoenix to restore textarea code before CodeMirror init
    setTimeout(initCodeEditors, 200);
    setTimeout(regexConvert, 400);
    handleDataChanges();
}).call(this);

function setCodeEditorHeight() {
    var panelHeight = $('.panel').first().height();
    $('.CodeMirror').height(panelHeight + 'px');
}

function handleDataChanges() {
    $('input').on('change', regexConvert);
}

function regexConvert() {
    var str = editorCodeIn.getValue();
    $('.check:checked').each(function (i, check) {
        var regexIn = check.nextElementSibling.value;
        var regexOut = check.nextElementSibling.nextElementSibling.value;
        str = str.replace(new RegExp(regexIn, 'gmi'), regexOut);
        // console.log(str);
    });
    editorCodeOut.setValue(str);
}

function saveRestoreDataInLocalStorage() {
    var saveInputs = $('input, textarea[name="code-in"]');
    // console.info('inputs to save', saveInputs);
    saveInputs.phoenix();
    $('.reset').click(function () {
        saveInputs.phoenix('remove');
        window.location.reload();
    });
}

function initCodeEditors() {
    // IN
    window.textareaCodeIn = document.getElementsByName('code-in')[0];
    window.editorCodeIn = CodeMirror.fromTextArea(textareaCodeIn, {
        mode: "text/html",
        lineNumbers: true
    });
    editorCodeIn.on('change', function (e) {
        e.save();
    });
    // OUT
    window.textareaCodeOut = document.getElementsByName('code-out')[0];
    window.editorCodeOut = CodeMirror.fromTextArea(textareaCodeOut, {
        mode: "text/html",
        lineNumbers: true,
        pollInterval: 300
    });
    setCodeEditorHeight();
}