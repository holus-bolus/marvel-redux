import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from '../services/marvelApi.ts';

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async (offset: number) => {
    const response = await fetchCharacters(offset);
    return response;
  },
);

interface CharactersState {
  characters: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  status: 'idle',
  error: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacters.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.characters = state.characters.concat(action.payload);
    });
    builder.addCase(getCharacters.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? null;
    });
  },
});

export default charactersSlice.reducer;
