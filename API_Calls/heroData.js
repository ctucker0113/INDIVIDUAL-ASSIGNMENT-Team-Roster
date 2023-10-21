import { clientCredentials } from "../utils/client";

const endpoint = clientCredentials.databaseURL;

const getTeam = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heroes.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headedrs: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});


const getTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heroes/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeamMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heroes/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});


const deleteTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heroes/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const addTeamMember = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/heroes.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export {
    getTeam,
    getTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTeamMember
}