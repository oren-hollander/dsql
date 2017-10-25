const BreakerCallback = callback => {
  let isTurnedOn = true

  const breakerCallback = (...args) => isTurnedOn ? callback(...args) : undefined
  
  breakerCallback.turnOn = () => {
    isTurnedOn = true
  }

  breakerCallback.turnOff = () => {
    isTurnedOn = false
  }

  return breakerCallback
}

export default BreakerCallback