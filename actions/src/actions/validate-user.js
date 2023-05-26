import axios from 'axios';

export default async (event, api) => {
  const endpoint =
    'https://22b0-2804-14d-72c9-866d-cd63-5dbf-7ec-444a.ngrok-free.app/graphql';
  const headers = {
    'content-type': 'application/json',
  };
  try {
    const res = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: {
        query: `mutation create_user {create_user(input: { email: "${event.user.email}", name: "${event.user.email}" }) {id}}`,
      },
    });
    if (res.data.errors) {
      api.access.deny(`Access to ${event.client.name} is not allowed.`);
    }
  } catch (error) {
    api.access.deny(
      'INTERNAL_SERVER_ERROR',
      'Ocorrreu um erro interno ao registrar o usuário. Por favor, tente novamente.',
    );
  }
};
