import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Actions {
    add = 'add',
    delete = 'delete',
}
interface IInitState {
    playersComparison: number[];
}

const initialState: IInitState = {
    playersComparison: [],
};

const slicePlayerInfo = createSlice({
    name: 'accountInfo',
    initialState,
    reducers: {
        setPlayersComparison: (state: IInitState, action: PayloadAction<{ playerId: number, rule: Actions }>) => {
            switch (action.payload.rule) {
                case Actions.add:
                    state.playersComparison = [ ...state.playersComparison, action.payload.playerId ];
                    break;
                case Actions.delete:
                    state.playersComparison = state.playersComparison.filter(id => id !== action.payload.playerId);
                    break;
            }
        },
    },
});

export const { setPlayersComparison } = slicePlayerInfo.actions;

export default slicePlayerInfo.reducer;