// lib/api.ts — Fastify backend API client with type safety

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export async function fetchCities() {
  const res = await fetch(`${API_BASE_URL}/cities`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch cities: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

export async function fetchCinemasByCity(cityId: string) {
  const res = await fetch(`${API_BASE_URL}/cities/${cityId}/cinemas`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch cinemas: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

export async function fetchShows(trending?: boolean) {
  const url = trending ? `${API_BASE_URL}/shows?trending=true` : `${API_BASE_URL}/shows`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch shows: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

export async function fetchTrendingShows() {
  const res = await fetch(`${API_BASE_URL}/shows/trending`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch trending shows: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

export async function fetchShowDetails(showId: string) {
  const res = await fetch(`${API_BASE_URL}/shows/${showId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch show details: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

export async function fetchSeatMap(showId: string) {
  const res = await fetch(`${API_BASE_URL}/shows/${showId}/seats`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch seats: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

export async function lockSeatsApi(showId: string, seatNumbers: string[], userId: string) {
  const res = await fetch(`${API_BASE_URL}/shows/${showId}/lock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seatNumbers, userId }),
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      error: json.error || 'Failed to lock seat',
    };
  }

  return {
    success: true,
    status: res.status,
    data: json.data,
  };
}

export async function unlockSeatsApi(showId: string, seatNumbers: string[], userId: string) {
  const res = await fetch(`${API_BASE_URL}/shows/${showId}/unlock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seatNumbers, userId }),
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      error: json.error || 'Failed to release seat locks',
    };
  }

  return {
    success: true,
    status: res.status,
    data: json.data,
  };
}

export async function confirmBookingApi(input: {
  showId: string;
  seatNumbers: string[];
  userId: string;
  paymentId: string;
  orderId: string;
  signature: string;
  customerEmail?: string;
  customerPhone?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/bookings/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      error: json.error || 'Failed to confirm booking',
    };
  }

  return {
    success: true,
    status: res.status,
    data: json.data,
  };
}

export async function registerUserApi(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to register');
  }
  return json.data;
}

export async function loginUserApi(input: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to sign in');
  }
  return json.data;
}

export async function fetchUserProfileApi(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to fetch user profile');
  }
  return json.data;
}
