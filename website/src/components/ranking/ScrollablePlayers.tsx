import { useContext, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

const apiUrl = import.meta.env.VITE_API_URL;

import { RankingContext } from '../../pages/Ranking';

import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const GET_PLAYERS = gql`
  query GetPlayers($input: GetPlayersInput!) {
    players: getPlayers(input: $input) {
      player {
        name
        auth
        country
      }
      statistics {
        points
        wins
        defeats
        goals
        games
        rank
      }
    }
  }
`;

export default function Ranking({}) {
  const { category, room } = useParams();

  const { loading, error, data, fetchMore } = useQuery(GET_PLAYERS, {
    variables: { input: { page: 0, room, sortBy: category } },
  });

  const { players, setPlayers, name } = useContext(RankingContext);

  const debouncedName = useDebounce(name, 500);

  const [scrollKey, setScrollKey] = useState(Date.now());

  const [hasMore, setHasMore] = useState(true);

  const loadPlayers = (page: number) => {
    fetchMorePlayers(page);
  };

  const fetchMorePlayers = async (page: number) => {
    const fetchedMore = await fetchMore({
      variables: { input: { page, sortBy: category, room, ...(name && { name: name }) } },
    });

    const { players } = fetchedMore.data;

    const hasMorePlayers = players.length != 0 ? true : false;

    setHasMore(hasMorePlayers);

    if (hasMorePlayers == false) {
      setScrollKey(Date.now());

      return;
    }

    setPlayers(curr => [...curr, ...players]);
  };

  // const getQueryParams = (page) => ({sort: category, limit: 50, page, ...(name && {username: name})});

  // const getPlayers = ({page, name}) => axios.get(`${apiUrl}/stats/`, {params: getQueryParams(page)});

  // const loadPlayers = (page: number) => getPlayers({page, name}).then(({data: {data}}) => loadPlayersHandler({players: data}))

  const getFlagUrl = countryCode => `https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`;

  // const loadPlayersHandler = ({players}) =>{
  //  const hasMorePlayers = players.length != 0 ? true : false

  //   console.log(players)

  // setHasMore(hasMorePlayers);

  // if(hasMorePlayers == false){
  //   setScrollKey(Date.now());

  //   return;
  // }

  //   setPlayers((curr) => [...curr, ...players]);
  // }

  useEffect(() => {
    return () => {
      setScrollKey(Date.now());

      setHasMore(true);

      setPlayers([]);
    };
  }, [debouncedName, category, room]);

  return (
    <div className="ranking overflow-y-scroll" key={scrollKey}>
      <InfiniteScroll
        pageStart={-1}
        loadMore={loadPlayers}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        className="flex flex-col gap-[0.65rem]"
        useWindow={false}
      >
        {players.map(({ player, statistics }, index: number) => (
          <div
            className=" bg-gradient-to-r from-block from-60% flex py-3 gap-[2px] sm:gap-[16px] justify-around items-center rounded-md border-l-[5px] border-primary-400 overflow-hidden mr-2"
            key={index}
          >
            <p className="pl-[16px] font-bold w-[50px] sm:block hidden">{index + 1}</p>
            <p className="w-[30%] sm:w-[25%] text-ellipsis overflow-hidden whitespace-nowrap pl-2 sm:pl-0">{player.name}</p>
            <p className=" sm:w-[35%] w-[35%] text-center text-ellipsis overflow-hidden whitespace-nowrap">{statistics.rank}</p>
            <p className="sm:w-[15%] w-[15%] mr-7 sm:mr-0 text-center text-ellipsis overflow-hidden whitespace-nowrap font-semibold">
              {Math.floor(statistics[category])}
            </p>
            <div className="h-[24px] w-[15%] hidden sm:flex relative items-center justify-center">
              <img className="absolute right-[-10%] opacity-30" src={getFlagUrl(player.country)} width="60" />
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
