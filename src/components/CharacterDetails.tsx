import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../store.ts';
import { getCharacterById } from '../store/charactersSlice.ts';
import { Character } from '../interfaces/Character.ts';
import ErrorComponent from './ErrorComponent.tsx';
import LoadingComponent from './LoadingComponent.tsx';
import { useParams } from 'react-router-dom';

const CharacterDetails = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const dispatch = useDispatch();
  const character = useSelector(
    (state: RootState) => state.characters.selectedCharacter as Character,
  );
  const status = useSelector((state: RootState) => state.characters.status);
  const error = useSelector((state: RootState) => state.characters.error);

  useEffect(() => {
    if (characterId) {
      // @ts-ignore
      dispatch(getCharacterById(Number(characterId)));
    }
  }, [dispatch, characterId]);

  if (status === 'loading') {
    return <LoadingComponent />;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  if (error) {
    return <ErrorComponent message={error} />;
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
