

export const setNewRoot = (data) => {
    return {
        type: "ADD_ROOT",
        payload: data,
    }
}
export const setNewChildRoot = (data) => {
    return {
        type: "ADD_CHILD_ROOT",
        payload: data,
    }
}

export const setOpenModal = (visible) => {
    return {
        type: "Visible_Modal",
        payload: visible,
    }
}

export const deleteRoot = (id) => {
    return {
        type: "DELETE_ROOT",
        payload: id,
    }
}


// export const removeRoot = (data) => {
//     return async (dispatch) => {
//         //let new_items = data.filter(item => action.id !== item.id)
//         try {
//             dispatch({
//                 type: "Root",
//                 payload: new_items
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     }
// } 
