export function getContext(context) {
  return {
    type: 'GET_CONTEXT',
    context
  }
}

export function launch() {
  return {
    type: 'LAUNCH'
  }
}

export function move(obj) {
  return {
    type: 'MOVE',
    obj
  }
}

export function handleCollision(obj, result) {
  return {
    type: 'HANDLE_COLLISION',
    obj,
    result // array with result as index [0] and objB as index [1]
  }
}

export function display(obj) {
  return {
    type: 'DISPLAY',
    obj
  }
}

export function handleKeyPress(keyCode) {
  return {
    type: 'HANDLE_KEY_PRESS',
    keyCode
  }
}
