export default function rootReducer (state = [], action) {
  
  let newState = {};
  
  switch(action.type){
    case "SAY_HELLO":
      
      newState.greeting = "Hello World";
      
      return [...state, ...newState];
    default:
      return state;
  }
}
