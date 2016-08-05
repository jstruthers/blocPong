import Vector from './game_objects/Vector'

export default function rootReducer (state = [], action) {

  let newState = {}
  
  switch(action.type){
    case "GET_CONTEXT":

      newState.context = action.context

      return {...state, ...newState}
    case "LAUNCH":
      
      state.ball.launch(state.court.size)
      
      return state
    case "MOVE":

      state[action.obj].move()
      
      return state
    case "HANDLE_COLLISION":
      
      // action hasProps { obj, result }
      // result is array with result obj as index [0] and objB as index [1]

      if (action.result[0].isIntersecting) {
        console.log(action)
        if (action.obj === 'ball' && (action.result[1] === 1 || action.result[1] === 3)) {
          let givePoints = action.result[1] === 1 ? 'left' : 'right'
          newState.score = state.score
          newState.score[givePoints] += 1
          state.ball.toCenter(state.court.pos)
        } else {
          state[action.obj].handleCollision(action.result)
        }
      }
      return {...state, ...newState}
    case "DISPLAY":

      state[action.obj].display(state.context)

      return state
    case "HANDLE_KEY_PRESS":

      state.paddleLeft.handleKeyPress(action.keyCode)

      return state
    default:
      return state
  }
}
