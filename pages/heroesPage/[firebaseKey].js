import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getTeamMember } from '../../API_Calls/heroData';
import HeroCard from '../../components/heroCard';

export default function ViewHero() {
  const [heroDetails, setHeroDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getHeroDetails = () => {
    getTeamMember(firebaseKey).then(setHeroDetails);
  };

  useEffect(() => {
    getHeroDetails();
  }, [firebaseKey]);

  return (
    <div>{heroDetails.map((hero) => (
      <HeroCard key={hero.firebaseKey} HeroObj={book} onUpdate={getHeroDetails} />
    ))}
    </div>
  );
}