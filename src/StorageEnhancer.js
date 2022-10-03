export default function StorageEnhancer(createStore) {
  return (reducer, preloadedState, enhancer) => {
    const enhancedReducer = (state, action) => {
      const newState = reducer(state, action);
      window.localStorage.setItem("goals", JSON.stringify(newState));
      return newState;
    };
    return createStore(enhancedReducer, preloadedState, enhancer);
  };
}
