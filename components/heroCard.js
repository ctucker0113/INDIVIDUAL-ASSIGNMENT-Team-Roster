import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamMember } from '../API_Calls/heroData';

// This function creates the template for each hero card and sends it out to the rest of the program.
function HeroCard({ heroObj, onUpdate }) {
  const deleteThisHero = () => {
    if (window.confirm(`Delete ${heroObj.superhero_name}?`)) {
      deleteTeamMember(heroObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={heroObj?.image} alt={heroObj?.superhero_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{heroObj.superhero_name}</Card.Title>
        <p className="card-text bold"><span>{heroObj?.first_name} {heroObj.last_name}<br /></span></p>
        <p className="card-text bold"><span>Special Ability: {heroObj.special_ability}<br /></span></p>
        <Link href={`/heroesPage/edit/${heroObj?.firebaseKey}`} passHref>
          <Button variant="info">Edit Hero</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisHero} className="m-2">
          Delete Hero
        </Button>
      </Card.Body>
    </Card>
  );
}

HeroCard.propTypes = {
  heroObj: PropTypes.shape({
    image: PropTypes.string,
    superhero_name: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    special_ability: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default HeroCard;
