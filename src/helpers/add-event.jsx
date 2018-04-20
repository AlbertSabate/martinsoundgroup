const addEvent = (object, type, callback) => {
  const el = object
  if (el === null || typeof el === 'undefined') {
    return;
  }

  if (el.addEventListener) {
    el.addEventListener(type, callback, false)
  } else if (el.attachEvent) {
    el.attachEvent(`on${type}`, callback)
  } else {
    el[`on${type}`] = callback
  }
}

export default addEvent
