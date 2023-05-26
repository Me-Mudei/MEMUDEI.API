import axios from 'axios';

export default async (event) => {
  const endpoint =
    'https://22b0-2804-14d-72c9-866d-cd63-5dbf-7ec-444a.ngrok-free.app/graphql';
  const headers = {
    'content-type': 'application/json',
  };

  await axios({
    url: endpoint,
    method: 'post',
    headers: headers,
    data: {
      query: `mutation create_user {create_user(input: { email: "${event.user.email}", name: "${event.user.email}" }) {id}}`,
    },
  });
};
