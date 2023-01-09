export type Config = {
  method?: 'GET' | 'POST';
  headers?: { [key: string]: string };
  body?: null | {};
};

const sendRequest = async (config: Config): Promise<Response> => {
  const { method = 'GET', headers = {}, body = null } = config;
  const response = await fetch(import.meta.env.VITE_FIREBASE_BD, {
    method,
    headers,
    body: body ? JSON.stringify(config.body) : null,
  });
  if (!response.ok) {
    throw new Error('Something went wrong... Try again later');
  }
  return response;
};

export default sendRequest;
