import { flow } from 'lodash/fp'
import { Document, emptyDocument, addComponent, removeComponent, getComponent } from './document'
import Component from './component'

describe('document', () => {

  test('add', () => {
    const doc = addComponent(Component('comp-1', 'layout'))(emptyDocument())
    expect(doc).toEqual(Document([Component('comp-1', 'layout')], []))
  })

  test('remove', () => {
    const doc = flow(
      addComponent(Component('comp-1', 'layout')),
      addComponent(Component('comp-2', 'layout')),
      removeComponent('comp-1')
    )(emptyDocument())

    expect(doc).toEqual(Document([Component('comp-2', 'layout')], []))
  })

  test('get', () => {
    const doc = flow(
      addComponent(Component('comp-1', 'layout')),
      addComponent(Component('comp-2', 'layout'))
    )(emptyDocument())

    expect(getComponent('comp-2')(doc)).toEqual(Component('comp-2', 'layout'))
  })
})