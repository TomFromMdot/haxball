import { useContext } from 'react';
import { RankingContext } from '../../pages/Ranking';

export default function SearchBar() {
  const { setName } = useContext(RankingContext);

  return (
    <input
      type="text"
      onChange={e => setName(e.target.value)}
      placeholder="Search player"
      className="p-6 py-2 mt-1 bg-dark border-2 border-secondary rounded-md mb-3 w-full focus:outline-none focus:outline-primary-500 focus:outline-offset-[-1px]"
    />
  );
}
