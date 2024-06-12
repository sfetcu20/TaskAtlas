import { createSlice } from '@reduxjs/toolkit';

const jwtSlice = createSlice({
  name: 'jwt',
  initialState: null,
  reducers: {
    setJwt: (_state, action) => action.payload,
    removeJwt: () => null,
  },
});

export const { setJwt, removeJwt } = jwtSlice.actions;
export default jwtSlice.reducer;
