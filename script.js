var regexTemplate = `
<div class="regex">
    {{ num }} <input type="checkbox" name="regex-{{ num }}-enabled" class="check" checked>
    <input type="text" name="regex-{{ num }}-in" class="in" value="in">
    <input type="text" name="regex-{{ num }}-out" class="out" value="out">
</div>
`;
var regexNumber = 12;
var replaceChar = ['=C3=A9', '=C3=A8', '=C3=AA', '=C3=A0', '=C3=B4', '=C3=BB', '=C3=A7', '=C3=AE', '=E2=80=99']
var replaceWith = ['é', 'è', 'ê', 'à', 'ô', 'û', 'ç', 'î', '\'']

function insertRegexFields() {
    var html = ''
    while (regexNumber) {
        html = regexTemplate.replace(/{{ num }}/gi, regexNumber) + html
        regexNumber--
    }
    $('.bar.bottom').html(html)
}

function setCodeEditorSize() {
    var panelHeight = $('.panel').first().height();
    var panelWidth = Math.round(document.body.clientWidth / 2);
    $('.CodeMirror').height(panelHeight + 'px');
    $('.CodeMirror').width(panelWidth + 'px');
}

function handleDataChanges() {
    $('input').on('change', regexConvert);
}

function regexConvert() {
    var str = editorCodeIn.getValue();
    $('.check:checked').each(function(i, check) {
        var regexIn = check.nextElementSibling.value;
        var regexOut = check.nextElementSibling.nextElementSibling.value;
        str = str.replace(new RegExp(regexIn, 'gmi'), regexOut);
        // console.log(str);
    });
    replaceChar.forEach((char, index) => {
        str = str.replace(new RegExp(char, 'gmi'), replaceWith[index]);
    })
    editorCodeOut.setValue(str);
}

function saveRestoreDataInLocalStorage() {
    var saveInputs = $('input, textarea[name="code-in"]');
    // console.info('inputs to save', saveInputs);
    saveInputs.phoenix();
    $('.reset').click(function() {
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
    editorCodeIn.on('change', function(e) {
        e.save();
    });
    // OUT
    window.textareaCodeOut = document.getElementsByName('code-out')[0];
    window.editorCodeOut = CodeMirror.fromTextArea(textareaCodeOut, {
        mode: "text/html",
        lineNumbers: true,
        pollInterval: 300
    });
    setCodeEditorSize();
}

function init() {
    insertRegexFields()
    saveRestoreDataInLocalStorage();
    // this timeout allow phoenix to restore textarea code before CodeMirror init
    setTimeout(initCodeEditors, 200);
    setTimeout(regexConvert, 400);
    handleDataChanges();
}

init()