const buildRequestHeaders = (authenticityToken: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-Token': authenticityToken,
});

export default buildRequestHeaders;