class App {
  constructor () {
    console.log('constructor')
    this.debug = false
    this.nbRules = 0
  }

  onDocumentLoad () {
    this.addRule(true, '\\.', ' 😸')
    this.addRule(true, 'right\\s', '')
    this.addRule(false, '([A-Z])', '- $1')
  }

  onRuleClick (event) {
    if (event.target.matches('[type="checkbox"]')) {
      return this.toggleRule(event.target.parentElement, event.target.checked)
    }
    console.log('on rule click not handled', event.target)
  }

  toggleRule (ruleEl, isActive, dontApply) {
    console.log(isActive ? 'activate' : 'disable', 'rule', event.target)
    ruleEl.querySelector('input[type="checkbox"]').checked = isActive
    ruleEl.setAttribute('data-rule-active', isActive)
    if (dontApply) {
      return
    }
    this.applyRules()
  }

  getElementFromTemplate (name) {
    var templateEl = document.querySelector(`template[name="${name}"]`)
    if (!templateEl) {
      throw new Error('failed to find template with name : ' + name)
    }
    return templateEl.content.cloneNode(true)
  }

  addRule (isActive = true, replaceIn, replaceOut) {
    this.nbRules++
    console.log('add rule', this.nbRules)
    const ruleEl = this.getElementFromTemplate('rule')
    ruleEl.querySelector('.rule').setAttribute('data-rule-id', this.nbRules)
    this.toggleRule(ruleEl.querySelector('.rule'), isActive, true)
    if (replaceIn) {
      ruleEl.querySelector('input[name="replace-in"]').value = replaceIn
    }
    if (replaceOut) {
      ruleEl.querySelector('input[name="replace-out"]').value = replaceOut
    }
    document.querySelector('.rules').appendChild(ruleEl)
    this.applyRules()
  }

  applyRules () {
    let text = document.querySelector('textarea[name="in"]').value
    document.querySelectorAll('.rule[data-rule-active="true"]').forEach(ruleEl => {
      console.log('apply rule', ruleEl)
      const replaceIn = ruleEl.querySelector('input[name="replace-in"]').value
      const replaceOut = ruleEl.querySelector('input[name="replace-out"]').value
      text = text.replace(new RegExp(replaceIn, 'gm'), replaceOut)
    })
    document.querySelector('textarea[name="out"]').value = text
  }
}
const app = new App()
window.onload = app.onDocumentLoad.bind(app)
window.app = app
