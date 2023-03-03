const redux = require("redux");
const reduxLogger = require("redux-logger")

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

//actions names
// cakes
const BUY_CAKE = "BUY_CAKE";
const ADD_NEW_CAKE = "ADD_NEW_CAKE";
// ice cream
const BUY_ICE_CREAM = "BUY_ICE_CREAM";
const ADD_NEW_ICE_CREAM = "ADD_NEW_ICE_CREAM";

//actions
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "decrease number of cakes by 1"
    }
}
function addNewCake() {
    return {
        type: ADD_NEW_CAKE,
        info: "increase number of cakes by 1"
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: "decrease number of ice cream by 1"
    }
}
function addNewIceCream() {
    return {
        type: ADD_NEW_ICE_CREAM,
        info: "increase number of ice cream by 1"
    }
}

// (prevState, action) => new state

// const initialState = {
//     cakeCount: 10
// };

const initialCakeState = {
    cakeCount: 10
};
const initialIceCreamState = {
    iceCreamCount: 10
};

//reducer
// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             cakeCount: --state.cakeCount
//         };
//         case ADD_NEW_CAKE: return {
//             ...state,
//             cakeCount: ++state.cakeCount
//         };
//
//         default: return state;
//     }
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            cakeCount: state.cakeCount - 1
        };
        case ADD_NEW_CAKE: return {
            ...state,
            cakeCount: state.cakeCount + 1
        };

        default: return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICE_CREAM: return {
            ...state,
            iceCreamCount: state.iceCreamCount - 1
        };
        case ADD_NEW_ICE_CREAM: return {
            ...state,
            iceCreamCount: state.iceCreamCount + 1
        };

        default: return state;
    }
}

const mainReducer = combineReducers({cake: cakeReducer, iceCream: iceCreamReducer})

const store = createStore(mainReducer, applyMiddleware(logger));

console.log("state: ", store.getState().cake, store.getState().iceCream);

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());

// not correct action example

store.dispatch(function() {
    return {
        type: "some other type that not match existing ones",
        info: "incorrect type"
    }}())

store.dispatch(buyCake());
store.dispatch(addNewCake());
store.dispatch(addNewCake());
store.dispatch(addNewCake());
store.dispatch(addNewIceCream());
store.dispatch(addNewIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();