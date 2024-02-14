import Categories from './Categories';
import SearchPlayer from './SearchPlayer';

import { useParams } from 'react-router-dom';

export default () => {
  const { category } = useParams<{ category: string }>();

  return (
    <div>
      <Categories />

      <SearchPlayer />

      <div className="bg-secondary flex justify-around items-center rounded-t-md mb-2 py-[12px]">
        <p className="ml-[5px] font-bold  w-[50px] sm:block hidden"></p>
        <p className="text-md font-semibold w-[30%] sm:w-[25%] pl-3 sm:pl-0">NICK</p>
        <p className="text-md font-semibold sm:w-[35%] w-[35%] text-center">RANK</p>
        <p className="text-md font-semibold sm:w-[15%] w-[15%] mr-7 sm:mr-0 text-center">{category.toUpperCase()}</p>
        <p className="text-md font-semibold w-[15%] hidden sm:block"></p>
      </div>
    </div>
  );
};
