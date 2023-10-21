import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTeamMember } from '../../../API_Calls/heroData';
import HeroForm from '../../../components/heroForm';

export default function EditHero() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getTeamMember(firebaseKey).then(response => {
        setEditItem(response);
    });
}, [firebaseKey]);

  // TODO: pass object to form
  return (<HeroForm obj={editItem} />);
}
