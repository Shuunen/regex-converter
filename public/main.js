/* global debounce */

class App {
  constructor () {
    console.log('app init')
    this.nbRules = 0
    this.applyRules = debounce(() => this._applyRules(), 500)
  }

  onDocumentLoad () {
    this.setupElements()
    this.insertSample()
    this.addRule(true, '\\.', ' 😸')
    this.addRule(true, 'right\\s', '')
    this.addRule(false, '([A-Z])', '- $1')
  }

  setupElements () {
    this.textareaIn = document.querySelector('textarea[name="in"]')
    this.textareaOut = document.querySelector('textarea[name="out"]')
  }

  onRuleClick (event) {
    if (event.target.matches('[type="checkbox"]')) return this.toggleRule(event.target.parentElement, event.target.checked)
  }

  toggleRule (ruleEl, isActive, dontApply) {
    console.log(isActive ? 'activate' : 'disable', 'rule')
    ruleEl.querySelector('input[type="checkbox"]').checked = isActive
    ruleEl.setAttribute('data-rule-active', isActive)
    if (dontApply) return
    this.applyRules()
  }

  getElementFromTemplate (name) {
    var templateEl = document.querySelector(`template[name="${name}"]`)
    if (!templateEl) throw new Error('failed to find template with name : ' + name)
    return templateEl.content.cloneNode(true)
  }

  addRule (isActive = true, replaceIn, replaceOut) {
    this.nbRules++
    console.log('add rule', this.nbRules)
    const ruleEl = this.getElementFromTemplate('rule')
    ruleEl.querySelector('.rule').setAttribute('data-rule-id', this.nbRules)
    this.toggleRule(ruleEl.querySelector('.rule'), isActive, true)
    if (replaceIn) ruleEl.querySelector('input[name="replace-in"]').value = replaceIn
    if (replaceOut) ruleEl.querySelector('input[name="replace-out"]').value = replaceOut
    document.querySelector('.rules').appendChild(ruleEl)
    this.applyRules()
  }

  _applyRules () {
    let text = this.textareaIn.value
    document.querySelectorAll('.rule[data-rule-active="true"]').forEach(ruleEl => {
      console.log('apply rule', ruleEl)
      const replaceIn = ruleEl.querySelector('input[name="replace-in"]').value
      const replaceOut = ruleEl.querySelector('input[name="replace-out"]').value
      text = text.replace(new RegExp(replaceIn, 'gm'), replaceOut)
    })
    this.textareaOut.value = text
  }

  insertSample () {
    this.textareaIn.value = [
      'This text will be processed & converted to the one on the right side.',
      'The rules below will be used to successively replace regular expressions.',
      'For example, the default rule 01 replace dots with cats !',
      'The second rule delete the word "right" by replacing him with nothing.',
      "The last sample rule prefix each lines with dashes :) but you'll have to enable it.",
      '',
      'Pretty neat right ?',
      '',
      'Tutorial is over, paste your own text, customize the rules, you can have more rules by adding them with the (+) button below :)`',
    ].join('\n')
  }
}
const app = new App()
window.onload = app.onDocumentLoad.bind(app)
window.app = app
