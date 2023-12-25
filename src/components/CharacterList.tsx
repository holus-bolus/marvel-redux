import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCharacters } from '../store/charactersSlice.ts';
import { RootState } from '../store.ts';
import CharacterCard from './CharacterCard.tsx';
import { AppDispatch } from '../store.ts';
import { v4 as uuidv4 } from 'uuid';
import { Character } from '../interfaces/Character.ts';

const CharacterList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const characters = useSelector(
    (state: RootState) => state.characters.characters,
  );
  const status = useSelector((state: RootState) => state.characters.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCharacters(0));
    }
  }, [dispatch, status]);
  return (
    <div className={'characters-list'}>
      {characters.map((character: Character) => (
        <CharacterCard key={uuidv4()} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
