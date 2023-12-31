import React from 'react';
import { Character } from '../interfaces/Character.ts';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className={'character-card'}>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <h3>{character.name}</h3>
    </div>
  );
};

export default CharacterCard;
