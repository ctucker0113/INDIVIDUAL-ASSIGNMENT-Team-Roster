import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { addTeamMember, updateTeamMember } from '../API_Calls/heroData';

const initialState = {
  first_name: '',
  last_name: '',
  image: '',
  superhero_name: '',
  special_ability: '',
  uid: '',
};

function HeroForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();

  const { user, userLoading } = useAuth();
  // This code solves a render bug by
  // making the page wait a beat for Firebase to retrieve
  // the data before it loads the page.
  if (userLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    // If the object already exists (i.e. - has a FB key), then fill the form with the values from the object.
    // Else, leave the values in the form blank.
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    // Declares 2 variables, 'name,' and 'value' to be added to info later
    const { name, value } = e.target;
    // "Refreshes" the page with a taco(?) called prevState
    setFormInput((prevState) => ({
      // "Spreads" the prevState so that new values can be added to it.
      ...prevState,
      // Combines [name]: value with prevState, either adding the values or updating them depending on the state of the form (update or create)
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If the item already exists in the database...
    if (obj.firebaseKey) {
      // Make the Update API call and then route the user to the Heroes page.
      console.warn(`The values for formInput are: ${formInput}`);
      updateTeamMember(formInput).then(() => router.push('/heroes'));
      // Else start running the Add Author function
    } else {
      const payload = { ...formInput, uid: user.uid };
      addTeamMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeamMember(patchPayload).then(() => {
          router.push('/heroes');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Hero</h2>

      {/* SUPERHERO NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Superhero Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Superhero Name"
          name="superhero_name"
          value={formInput.superhero_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author's First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SPECIAL ABILITY INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Special Ability" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the super ability"
          name="special_ability"
          value={formInput.special_ability}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Hero </Button>
    </Form>
  );
}

HeroForm.propTypes = {
  obj: PropTypes.shape({
    superhero_name: PropTypes.string,
    special_ability: PropTypes.string,
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
  }),
};

HeroForm.defaultProps = {
  obj: initialState,
};

export default HeroForm;
