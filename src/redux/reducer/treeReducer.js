
const initialState = {
    visible: [],
    Root: [],
    ChildRoot: []
}

//REDUCER
// Set up reducer and switch               ADD_CHILD_ROOT
export const treeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Visible_Modal":
            const findModalID = state.Root.find(todo => todo.id !== action.payload)
            return {
                ...state,
                visible: false
            }
        case "DELETE_ROOT":
            const filteredTodos = state.Root.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                Root: filteredTodos
            }
        case "DELETE_CHILD_ROOT":
            const todos = state.ChildRoot.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                ChildRoot: todos
            }
        case "ADD_CHILD_ROOT":
            return {
                ...state,
                ChildRoot: [action.payload, ...state.ChildRoot]
            }
        case "ADD_ROOT":
            return {
                ...state,
                Root: [action.payload, ...state.Root]
            }
        default:
            return state;
    }
};
