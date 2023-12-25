import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { RootState } from '../store.ts';
import { getCharacterById } from '../store/charactersSlice.ts';
import { Character } from '../interfaces/Character.ts';

interface CharacterDetailsProps {
  characterId: number;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterId }) => {
  const dispatch = useDispatch();
  const character = useSelector(
    (state: RootState) => state.characters.selectedCharacter as Character,
  );
  const status = useSelector((state: RootState) => state.characters.status);

  useEffect(() => {
    // @ts-ignore
    dispatch(getCharacterById(characterId));
  }, [dispatch, characterId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className={'character-details'}>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <h3>{character.name}</h3>
      <p>{character.description}</p>
    </div>
  );
};

export default CharacterDetails;
