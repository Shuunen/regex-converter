import { fireEvent, render } from '@testing-library/react'
import { invariant } from 'es-toolkit'
import { RuleLine, Rules } from './rules'
import type { Rule } from './types'

const sampleRule: Rule = { enabled: true, id: '1', pattern: 'foo', replacement: 'bar' }

describe(RuleLine, () => {
  it('RuleLine A should render rule fields and call onChange/onRemove', () => {
    const onChange = vi.fn<() => void>()
    const onRemove = vi.fn<() => void>()
    const { getByTestId, getAllByTestId } = render(<RuleLine onChange={onChange} onRemove={onRemove} rule={sampleRule} />)
    fireEvent.change(getByTestId('input-rule-1-pattern'), { target: { value: 'baz' } })
    expect(onChange).toHaveBeenCalledWith('pattern', 'baz')
    fireEvent.change(getByTestId('input-rule-1-replacement'), { target: { value: 'qux' } })
    expect(onChange).toHaveBeenCalledWith('replacement', 'qux')
    const [deleteButton] = getAllByTestId('button-delete')
    invariant(deleteButton, 'Delete button not found')
    fireEvent.click(deleteButton)
    expect(onRemove).toHaveBeenCalledWith(expect.any(Object))
  })

  it('RuleLine B should call onChange for enabled switch', () => {
    const onChange = vi.fn<() => void>()
    const onRemove = vi.fn<() => void>()
    const { getByTestId } = render(<RuleLine onChange={onChange} onRemove={onRemove} rule={sampleRule} />)
    fireEvent.click(getByTestId('switch-rule-1'))
    expect(onChange).toHaveBeenCalledWith('enabled', false)
  })
})

describe(Rules, () => {
  it('Rules A should render rules and allow add/remove/update', () => {
    let rules: Rule[] = [sampleRule]
    const setRules = vi.fn<(updated: typeof rules) => void>(updated => {
      rules = updated
    })
    const { getByTestId, getAllByTestId } = render(<Rules rules={rules} setRules={setRules} />)
    fireEvent.click(getByTestId('button-add'))
    expect(setRules).toHaveBeenCalledWith(expect.any(Array))
    const [removeButton] = getAllByTestId('button-delete')
    invariant(removeButton, 'Remove button not found')
    fireEvent.click(removeButton)
    expect(setRules).toHaveBeenCalledWith(expect.any(Array))
    fireEvent.change(getByTestId('input-rule-1-pattern'), { target: { value: 'new' } })
    expect(setRules).toHaveBeenCalledWith(expect.any(Array))
  })

  it('Rules B should handle empty rules array and add rule', () => {
    let rules: Rule[] = []
    const setRules = vi.fn<(updated: typeof rules) => void>(updated => {
      rules = updated
    })
    const { getByTestId } = render(<Rules rules={rules} setRules={setRules} />)
    fireEvent.click(getByTestId('button-add'))
    expect(setRules).toHaveBeenCalledWith(expect.any(Array))
  })

  it('Rules C should remove last rule and leave empty', () => {
    let rules: Rule[] = [sampleRule]
    const setRules = vi.fn<(updated: typeof rules) => void>(updated => {
      rules = updated
    })
    const { getAllByTestId } = render(<Rules rules={rules} setRules={setRules} />)
    const [removeButton] = getAllByTestId('button-delete')
    invariant(removeButton, 'Remove button not found')
    fireEvent.click(removeButton)
    expect(setRules).toHaveBeenCalledWith([])
  })

  it('Rules D should not update any rule if id does not match', () => {
    let rules: Rule[] = [sampleRule]
    const setRules = vi.fn<(updated: typeof rules) => void>(updated => {
      rules = updated
    })
    render(<Rules rules={rules} setRules={setRules} />)
    const prevRules = [...rules]
    setRules(prevRules.map(rule => (rule.id === 'not-found' ? { ...rule, pattern: 'x' } : rule)))
    expect(rules).toStrictEqual([sampleRule])
  })
})
