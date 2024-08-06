import { rankingCategories } from '../../pages/Ranking';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

import { useParams } from 'react-router-dom';

export default function Navbar({}) {
  const { room } = useParams();

  return (
    <div>
      <nav className="flex w-full justify-between mt-4 mb-2 flex-wrap gap-[3%] gap-y-3">
        {rankingCategories.map((field, index) => {
          const resolved = useResolvedPath(`/ranking/${room}/${field}`);
          const match = useMatch({ path: resolved.pathname, end: true });

          return (
            <NavLink
              className={`font-semibold bg-secondary py-2 px-7 hover:scale-105 transition-transform rounded-[5px] h-full flex-1 text-center ${
                match ? 'text-primary-400' : ''
              }`}
              key={index}
              to={`/ranking/${room}/${field}`}
            >
              <button>{field.toUpperCase()}</button>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
