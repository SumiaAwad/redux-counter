import { createSlice } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action) => {
            // state.value += 1;
            state.value += action.payload;
        }, 
        decrement: (state, action) => {
            // state.value -= 1;
            state.value -= action.payload;
        },
        reset: (state) => {
            state.value=0;
        }
    }
});

export const { increment, decrement, reset } = counterSlice.actions;
export const selectCount = (state) => state.counter.present.value;
export const canUndo = (state) => state.counter.past.length > 0;
export const canRedo = (state) => state.counter.future.length > 0;

// Here we are adding a thunk for handling asynchronous
// incrementing and decrementing of the counter
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(increment(amount));
    }, 2000);
};

export const decrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(decrement(amount));
    }, 2000);
}

export default undoable(counterSlice.reducer);