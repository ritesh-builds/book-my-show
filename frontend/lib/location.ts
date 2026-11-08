// lib/location.ts — Hybrid Browser GPS & IP Geolocation Service

export interface DetectedLocation {
  cityName: string;
  stateName?: string;
  latitude?: number;
  longitude?: number;
  source: 'GPS' | 'IP';
}

// Common city aliases in India (e.g., historical vs official names)
const CITY_ALIASES: Record<string, string> = {
  gurgaon: 'c_hr_gurugram',
  gurugram: 'c_hr_gurugram',
  bangalore: 'c3',
  bengaluru: 'c3',
  bombay: 'c1',
  mumbai: 'c1',
  'new delhi': 'c2',
  delhi: 'c2',
  'delhi ncr': 'c2',
  madras: 'c5',
  chennai: 'c5',
  calcutta: 'c7',
  kolkata: 'c7',
  poona: 'c4',
  pune: 'c4',
  secunderabad: 'c6',
  hyderabad: 'c6',
  chandigarh: 'c_ut_ch',
  faridabad: 'c_hr_faridabad',
  panipat: 'c_hr_panipat',
  ambala: 'c_hr_ambala',
  rohtak: 'c_hr_rohtak',
  hisar: 'c_hr_hisar',
  karnal: 'c_hr_karnal',
  sonipat: 'c_hr_sonipat',
  panchkula: 'c_hr_panchkula',
  lucknow: 'c_cap_up',
  jaipur: 'c_cap_rj',
  patna: 'c_cap_br',
  bhopal: 'c_cap_mp',
  noida: 'c_hub_noida',
  indore: 'c_hub_indore',
  kochi: 'c_hub_kochi',
  amritsar: 'c_hub_amritsar',
  ludhiana: 'c_hub_ludhiana',
};

/**
 * 1. Passive / Silent IP Geolocation (No user prompt)
 * Used on first-time visit when no city is cached in localStorage.
 */
export async function detectCityByIP(): Promise<DetectedLocation | null> {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();

    if (data.city) {
      return {
        cityName: data.city,
        stateName: data.region,
        latitude: data.latitude,
        longitude: data.longitude,
        source: 'IP',
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 2. Active High-Accuracy HTML5 Browser GPS
 * Triggered explicitly when the user clicks "Detect My Location".
 */
export function detectExactGPSLocation(): Promise<DetectedLocation> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Free, high-accuracy client-side reverse geocoding
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            { cache: 'no-store' },
          );
          const data = await res.json();

          const detectedCity = data.city || data.locality || data.principalSubdivision;

          resolve({
            cityName: detectedCity,
            stateName: data.principalSubdivision,
            latitude,
            longitude,
            source: 'GPS',
          });
        } catch {
          // Fallback if reverse geocode fails
          resolve({
            cityName: 'Delhi NCR',
            latitude,
            longitude,
            source: 'GPS',
          });
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location access was denied. Please select your city manually.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred while detecting location.'));
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  });
}

/**
 * 3. Match detected city name against our 60+ seeded Indian cities.
 */
export function findBestMatchingCity(
  detectedName: string,
  citiesList: Array<{ id: string; name: string; state: string }>,
): string | null {
  if (!detectedName) return null;

  const normalized = detectedName.trim().toLowerCase();

  // 1. Direct alias dictionary lookup
  if (CITY_ALIASES[normalized]) {
    const aliasId = CITY_ALIASES[normalized];
    const match = citiesList.find((c) => c.id === aliasId);
    if (match) return match.id;
  }

  // 2. Exact match in cities list
  const exact = citiesList.find(
    (c) => c.name.toLowerCase() === normalized,
  );
  if (exact) return exact.id;

  // 3. Substring / partial match (e.g. "Gurgaon Rural" -> "Gurugram", "South Delhi" -> "Delhi NCR")
  const partial = citiesList.find(
    (c) =>
      c.name.toLowerCase().includes(normalized) ||
      normalized.includes(c.name.toLowerCase()),
  );
  if (partial) return partial.id;

  return null;
}

