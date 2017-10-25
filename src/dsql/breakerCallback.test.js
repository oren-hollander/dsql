import BreakerCallback from './breakerCallback'

describe('breaker callback', () => {
  let callback 
  let breakerCallback

  beforeEach(() => {
    callback = jest.fn()
    breakerCallback = BreakerCallback(callback)
  })

  test('should call the callback when turned on', () => {
    breakerCallback(1)
    expect(callback).toHaveBeenCalledWith(1)
  })

  test('should not call the callback when turned off', () => {
    breakerCallback.turnOff()
    breakerCallback(1)
    expect(callback).not.toHaveBeenCalled()
  })

  test('should call the callback when turned on and not call the callback when turned off', () => {
    breakerCallback.turnOff()
    breakerCallback(1)
    breakerCallback.turnOn()
    breakerCallback(2)
    expect(callback).toHaveBeenCalledWith(2)
    expect(callback.mock.calls.length).toBe(1);
  })
})