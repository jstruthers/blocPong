import { testPolygonCircle } from './helper_functions/vectors'

export default function rootReducer (state = [], action) {

  let newState = {}
  
  switch(action.type){
    case "GET_CONTEXT":

      newState.context = action.context

      return {...state, ...newState}
    case "LAUNCH":
      
      state.ball.launch(state.courtSize)
      
      return state
    case "MOVE":
      
      state[action.obj].move()
      
      return state
    case "HANDLE_EDGE":
      
      state[action.obj].handleEdge(state.courtSize)
      
      return state
    case "RECALC":
      
      state[action.obj].recalc()
      
      return state
    case "HANDLE_COLLISION":
      
      let collision = testPolygonCircle(action.paddle, action.ball)

      state.ball.handleCollision(collision, -action.paddle.speed.vel)
      
      return state
    case "DISPLAY":

      state[action.obj].display(state.context)

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
