import { useSelector, useDispatch } from 'react-redux';
import { 
    decrement, 
    increment, 
    reset,
    selectCount,
    canUndo,
    canRedo,
    decrementAsync, 
    incrementAsync
} from './counterSlice';
import styles from './Counter.module.css';
import {useState } from 'react';
import { ActionCreators } from 'redux-undo';

export function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(1);
    const enableUndo = useSelector(canUndo);
    const enableRedo = useSelector(canRedo);

    return (
        <div>
            <div className={styles.row}>
                <span className={styles.value}>{count}</span>
            </div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    style={{ width: '50px', height: '50px', marginRight: '10px'}}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement(incrementAmount))}
                >
                    -
                </button>
                <input 
                    type='number'
                    min='1'
                    step='1'
                    className={styles.numinput}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(Number(e.target.value))}
                />
                <button
                    className={styles.button}
                    style={{ width: '50px', height: '50px'}}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment(incrementAmount))}
                >
                    +
                </button>
            </div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    style={{ height: '50px'}}
                    aria-label='Undo'
                    onClick={() => { dispatch(ActionCreators.undo()); }}
                    disabled={!enableUndo}
                >
                    Undo
                </button>
                <button
                    className={styles.button}
                    style={{ height: '50px', margin: '0 10px' }}
                    aria-label='Redo'
                    onClick={() => { dispatch(ActionCreators.redo()); }}
                    disabled={!enableRedo}
                >
                    Redo
                </button>
                <button
                    className={styles.button}
                    style={{height: '50px'}}
                    aria-label="Reset"
                    onClick={() => {
                        setIncrementAmount(1);
                        dispatch(reset());
                    }}
                >
                    Reset
                </button>
            </div>
            <div className={styles.row}>
                <button
                    className={styles.asyncButton}
                    style={{ height: "50px", marginRight: "5px" }}
                    aria-label="Async Decrement"
                    onClick={() => {
                        dispatch(decrementAsync(incrementAmount));
                    }}
                >
                    - Async
                </button>
                <button
                    className={styles.asyncButton}
                    style={{ height: "50px"}}
                    aria-label="Async Increment"
                    onClick={() => {
                        dispatch(incrementAsync(incrementAmount));
                    }}
                >
                    + Async
                </button>
            </div>
        </div>
    )
}