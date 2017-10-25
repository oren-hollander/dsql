import DocumentServices from './documentServices'
import Component from './component'

describe('document services', () => {
  let ds 

  beforeEach(() => {
    ds = DocumentServices()
  })
  
  test('add', () => {
    ds.addComponent(Component('comp-1', 'layout'))  
    const component = ds.getComponent('comp-1')

    expect(component).toEqual(Component('comp-1', 'layout'))
  })

  test('remove', () => {
    ds.addComponent(Component('comp-1', 'layout'))  
    ds.addComponent(Component('comp-2', 'layout'))  
    ds.removeComponent('comp-1')

    expect(ds.getComponent('comp-2')).toEqual(Component('comp-2', 'layout'))
    expect(ds.getComponent('comp-1')).toBeUndefined()
  })
})
