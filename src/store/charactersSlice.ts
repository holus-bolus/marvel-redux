import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from '../services/marvelApi.ts';
import { Character } from '../interfaces/Character.ts';
import { AppDispatch, RootState } from '../store.ts';

export const getCharacterById = createAsyncThunk<
  Character,
  number,
  { dispatch: AppDispatch; state: RootState }
>(
  'characters/generateCharacterById',
  async (characterId: any, { rejectWithValue }) => {
    try {
      const response = await fetchCharacters(characterId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async (offset: number) => {
    const response = await fetchCharacters(offset);
    return response;
  },
);

interface CharactersState {
  characters: Character[];
  selectedCharacter: Character | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  selectedCharacter: null,
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
    builder.addCase(getCharacterById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCharacterById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.characters = state.characters.concat(action.payload);
    });
    builder.addCase(getCharacterById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? null;
    });
  },
});

export default charactersSlice.reducer;
