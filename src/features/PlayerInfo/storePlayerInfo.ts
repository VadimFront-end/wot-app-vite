import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Actions {
    add = 'add',
    delete = 'delete',
}
interface IInitState {
    playersComparison: number[];
    nickname: string;
    selectedTankName: string;
}

const initialState: IInitState = {
    playersComparison: [],
    nickname: '',
    selectedTankName: '',
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
        getAccountName: (state: IInitState, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
        setSelectedTankName: (state: IInitState, action: PayloadAction<string>) => {
            state.selectedTankName = action.payload;
        },
    },
});

export const { getAccountName, setSelectedTankName, setPlayersComparison } = slicePlayerInfo.actions;

export default slicePlayerInfo.reducer;