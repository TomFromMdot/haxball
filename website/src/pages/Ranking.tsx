import { useEffect, useState } from 'react';
import Header from '../components/ranking/Header.tsx';
import ScrollablePlayers from '../components/ranking/ScrollablePlayers.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export const RankingContext = React.createContext(null);

const categories = {
  RS: ['points', 'wins', 'defeats', 'games'],
  F_V3: ['points', 'wins', 'defeats', 'games'],
};

export let rankingCategories = [];

export default () => {
  const { room } = useParams();
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    rankingCategories = categories[room] || ['points', 'wins', 'defeats', 'games'];
  }, [room]);

  useEffect(() => {
    if (!rankingCategories.includes(category)) navigate('/ranking/RS/points');
  }, [category]);

  return (
    <div className="wrapper ld flex flex-col h-screen">
      <RankingContext.Provider value={{ players, setPlayers, name, setName }}>
        <Header />
        <ScrollablePlayers />
      </RankingContext.Provider>
    </div>
  );
};
