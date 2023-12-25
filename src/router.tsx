import { createBrowserRouter } from 'react-router-dom';
import CharacterList from './components/CharacterList.tsx';
import CharacterDetails from './components/CharacterDetails.tsx';

export const router = createBrowserRouter([
  { path: '/', element: <CharacterList /> },
  { path: '/character/:characterId', element: <CharacterDetails /> },
]);
