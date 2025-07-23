export default async function handler(req, res) {
  const response = await fetch('https://scanditest.fwh.is/graphql', {
    method: req.method,
    headers: req.headers,
    body: req.method === 'POST' ? req.body : undefined,
  });
  const data = await response.text();
  res.status(response.status).send(data);
} 