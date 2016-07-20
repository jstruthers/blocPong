export default function rootReducer (state = [], action) {
  
  let newState = {}
  
  switch(action.type){
    case "GET_CONTEXT":

      newState.context = action.context

      return {...state, ...newState}
    case "DISPLAY":

      state[action.obj].display(state.context)

      return state
    case "HANDLE_EDGE":
      
      state[action.obj].handleEdge(state.courtSize)
      
      return state
    case "HANDLE_KEY_PRESS":
      
      newState.paddleLeft = state.paddleLeft
      newState.paddleLeft.speed = state.paddleLeft.speed
      
      switch(action.event.keyCode) {
        case 87: newState.paddleLeft.speed.vel -= state.paddleLeft.speed.acc; break
        case 83: newState.paddleLeft.speed.vel += state.paddleLeft.speed.acc; break
      }
      
      return {...state, ...newState}
    default:
      return state
  }
}
