export default function recycleToken(token) {
  return fetch(`${process.env.API_BASE_URL}/auth/recycle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authorization: token }),
  })
    .then((response) => response.ok && response.json())
    .then((body) => body?.authorization)
    .catch(() => null);
}
