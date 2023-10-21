import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import HeroCard from '../components/heroCard';
import { getTeam } from '../API_Calls/heroData';

function showHeroes() {
  const [heroes, setHeroes] = useState([]);

  const { user } = useAuth();

  const getAllHeroes = () => {
    getTeam(user.uid).then(setHeroes);
  };

  useEffect(() => {
    getAllHeroes();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {heroes.map((hero) => (
          <HeroCard key={hero.firebaseKey} heroObj={hero} onUpdate={getAllHeroes} />
        ))}
      </div>
    </div>
  );
}

export default showHeroes;
