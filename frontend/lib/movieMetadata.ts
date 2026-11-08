// lib/movieMetadata.ts — Comprehensive movie metadata, posters, genres, ratings & cinema directory

export interface MovieMeta {
  poster: string;
  backdrop: string;
  genre: string;
  rating: string;
  votes: string;
}

// Curated movie metadata for Top 25 Hot blockbusters & featured titles
export const MOVIE_POSTERS: Record<string, MovieMeta> = {
  'Kalki 2898 AD': {
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genre: 'Sci-Fi / Action / Mythological Epic',
    rating: '8.9',
    votes: '240K',
  },
  'Pushpa 2': {
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Crime Thriller / Mass',
    rating: '8.7',
    votes: '190K',
  },
  'Animal': {
    poster: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    genre: 'Crime / Drama / Action Thriller',
    rating: '8.3',
    votes: '150K',
  },
  'Dunki': {
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop',
    genre: 'Comedy / Drama / Social Odyssey',
    rating: '7.9',
    votes: '95K',
  },
  'Salaar': {
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Crime / War Drama',
    rating: '8.1',
    votes: '110K',
  },
  'Oppenheimer': {
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1600&auto=format&fit=crop',
    genre: 'Historical Drama / Thriller',
    rating: '8.9',
    votes: '320K',
  },
  'Dune: Part Two': {
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    genre: 'Sci-Fi / Space Epic / Adventure',
    rating: '8.8',
    votes: '260K',
  },
  'Stree 2': {
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1600&auto=format&fit=crop',
    genre: 'Comedy / Horror / Supernatural',
    rating: '8.4',
    votes: '140K',
  },
  'Deadpool & Wolverine': {
    poster: 'https://images.unsplash.com/photo-1568876694728-451bbf694b83?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1568876694728-451bbf694b83?q=80&w=1600&auto=format&fit=crop',
    genre: 'Superhero / Comedy / Action',
    rating: '8.6',
    votes: '280K',
  },
  'Jawan': {
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Vigilante Thriller',
    rating: '8.2',
    votes: '175K',
  },
  'Interstellar': {
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    genre: 'Sci-Fi / Space Odyssey / Drama',
    rating: '9.0',
    votes: '450K',
  },
  'Fighter': {
    poster: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?q=80&w=1600&auto=format&fit=crop',
    genre: 'Aerial Action / Patriotic Drama',
    rating: '8.0',
    votes: '90K',
  },
  'Manjummel Boys': {
    poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    genre: 'Survival Thriller / Friendship',
    rating: '8.7',
    votes: '115K',
  },
  'Kantara': {
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genre: 'Folklore / Action / Mystical Drama',
    rating: '8.6',
    votes: '130K',
  },
  'KGF Chapter 2': {
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Period Mass Drama',
    rating: '8.5',
    votes: '220K',
  },
  'Aavesham': {
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Comedy / Gangster',
    rating: '8.4',
    votes: '95K',
  },
  'Shaitaan': {
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1600&auto=format&fit=crop',
    genre: 'Psychological Horror / Thriller',
    rating: '7.8',
    votes: '80K',
  },
  'Leo': {
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Crime / Blood Thriller',
    rating: '8.1',
    votes: '140K',
  },
  'Bramayugam': {
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    genre: 'Period Mystery / Horror',
    rating: '8.3',
    votes: '75K',
  },
  'Vettaiyan': {
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Cop Investigation',
    rating: '8.0',
    votes: '80K',
  },
  'Carry on Jatta 3': {
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop',
    genre: 'Comedy / Punjabi Family Drama',
    rating: '8.2',
    votes: '65K',
  },
  'Warning 2': {
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Punjabi Gangster Drama',
    rating: '7.9',
    votes: '45K',
  },
  'Chandu Champion': {
    poster: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop',
    genre: 'Biographical Sports Drama',
    rating: '8.3',
    votes: '60K',
  },
  'Article 370': {
    poster: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?q=80&w=1600&auto=format&fit=crop',
    genre: 'Political Thriller / Drama',
    rating: '8.1',
    votes: '70K',
  },
  'Spider-Man: Across the Spider-Verse': {
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    genre: 'Animation / Action / Multiverse',
    rating: '8.8',
    votes: '310K',
  },
};

// Fallback high-quality poster pools for the remaining catalog
export const CATALOG_POSTERS: string[] = [
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop',
];

/**
 * Intelligent metadata resolver:
 * Returns custom metadata if explicitly listed in MOVIE_POSTERS,
 * otherwise deterministically generates a high-res poster, rating and genre.
 */
export function getMovieMetadata(title: string): MovieMeta {
  if (MOVIE_POSTERS[title]) return MOVIE_POSTERS[title];

  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % CATALOG_POSTERS.length;
  const rating = (7.5 + (Math.abs(hash) % 15) / 10).toFixed(1);
  const votes = `${40 + (Math.abs(hash) % 120)}K`;

  return {
    poster: CATALOG_POSTERS[index]!,
    backdrop: CATALOG_POSTERS[(index + 1) % CATALOG_POSTERS.length]!,
    genre: 'Cinema / Drama / Feature',
    rating,
    votes,
  };
}

export const CINEMA_NAMES: Record<string, string> = {
  cn1: 'PVR Juhu, Mumbai',
  cn2: 'INOX Nariman Point, Mumbai',
  cn3: 'PVR Select Citywalk, Delhi',
  cn4: 'Cinepolis Ambience Mall, Delhi',
  cn5: 'PVR Orion Mall, Bengaluru',
  cn6: 'INOX Garuda Mall, Bengaluru',
  cn7: 'PVR Seasons Mall, Pune',
  cn8: 'Cinepolis Westend Mall, Pune',
  cn9: 'Sathyam Cinemas, Chennai',
  cn10: 'PVR VR Mall, Chennai',
  cn11: 'Prasads IMAX, Hyderabad',
  cn12: 'PVR Inorbit Mall, Hyderabad',
  cn13: 'INOX Quest Mall, Kolkata',
  cn14: 'PVR Mani Square, Kolkata',
  cn15: 'PVR Acropolis Mall, Ahmedabad',
  cn_knl_1: 'MovieMax Kessel Mall, Karnal',
  cn_knl_2: 'Superplex Cinemas, Karnal',
  cn_ggn_1: 'PVR Ambience Mall, Gurugram',
  cn_ggn_2: 'Cinepolis DLF Mega Mall, Gurugram',
  cn_fbd_1: 'INOX Crown Interiorz, Faridabad',
  cn_fbd_2: 'PVR SRS Cinemas, Faridabad',
  cn_pnp_1: 'Cinepolis Mittal Mega Mall, Panipat',
  cn_amb_1: 'PVR Galaxy Mall, Ambala',
  cn_rtk_1: 'PVR Sheetal Mall, Rohtak',
  cn_snp_1: 'Miraj Cinemas, Sonipat',
  cn_pkl_1: 'PVR Shalimar Mega Mall, Panchkula',
  cn_chd_1: 'PVR Elante Mall, Chandigarh',
  cn_chd_2: 'Cinepolis Jagat Mall, Chandigarh',
  cn_jpr_1: 'Raj Mandir Cinema, Jaipur',
  cn_lko_1: 'PVR Phoenix Palassio, Lucknow',
  cn_pat_1: 'Cinepolis P&M Mall, Patna',
  cn_bpl_1: 'Cinepolis DB City Mall, Bhopal',
  cn_koc_1: 'PVR Lulu Mall, Kochi',
  cn_ind_1: 'INOX Treasure Island, Indore',
  cn_noi_1: 'PVR Superplex Mall of India, Noida',
  cn_ldh_1: 'PVR Pavilion Mall, Ludhiana',
  cn_asr_1: 'Cinepolis Mall of Amritsar',
};

