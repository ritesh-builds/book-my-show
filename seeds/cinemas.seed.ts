// seeds/cinemas.seed.ts — Cinema multiplexes mapped to Indian cities

import type { Cinema } from '../src/modules/cinemas/cinemas.types.ts';

export const cinemasSeed: Omit<Cinema, 'createdAt'>[] = [
  // Mumbai
  { id: 'cn1',  name: 'PVR Juhu',                        cityId: 'c1', address: 'Juhu, Mumbai', screens: 8, isActive: true },
  { id: 'cn2',  name: 'INOX Nariman Point',               cityId: 'c1', address: 'Nariman Point, Mumbai', screens: 6, isActive: true },

  // Delhi NCR
  { id: 'cn3',  name: 'PVR Select Citywalk',              cityId: 'c2', address: 'Saket, Delhi', screens: 10, isActive: true },
  { id: 'cn4',  name: 'Cinepolis Ambience Mall',          cityId: 'c2', address: 'Vasant Kunj, Delhi', screens: 7, isActive: true },

  // Bengaluru
  { id: 'cn5',  name: 'PVR Orion Mall',                   cityId: 'c3', address: 'Rajajinagar, Bengaluru', screens: 9, isActive: true },
  { id: 'cn6',  name: 'INOX Garuda Mall',                 cityId: 'c3', address: 'Magrath Road, Bengaluru', screens: 5, isActive: true },

  // Pune
  { id: 'cn7',  name: 'PVR Seasons Mall',                 cityId: 'c4', address: 'Magarpatta, Pune', screens: 7, isActive: true },
  { id: 'cn8',  name: 'Cinepolis Westend Mall',           cityId: 'c4', address: 'Aundh, Pune', screens: 5, isActive: true },

  // Chennai
  { id: 'cn9',  name: 'Sathyam Cinemas',                  cityId: 'c5', address: 'Royapettah, Chennai', screens: 10, isActive: true },
  { id: 'cn10', name: 'PVR VR Mall',                      cityId: 'c5', address: 'Anna Nagar, Chennai', screens: 6, isActive: true },

  // Hyderabad
  { id: 'cn11', name: 'Prasads IMAX',                     cityId: 'c6', address: 'Necklace Road, Hyderabad', screens: 7, isActive: true },
  { id: 'cn12', name: 'PVR Inorbit Mall',                 cityId: 'c6', address: 'HITEC City, Hyderabad', screens: 8, isActive: true },

  // Kolkata
  { id: 'cn13', name: 'INOX Quest Mall',                  cityId: 'c7', address: 'Park Circus, Kolkata', screens: 6, isActive: true },
  { id: 'cn14', name: 'PVR Mani Square',                  cityId: 'c7', address: 'EM Bypass, Kolkata', screens: 7, isActive: true },

  // Ahmedabad
  { id: 'cn15', name: 'PVR Acropolis Mall',               cityId: 'c8', address: 'Thaltej, Ahmedabad', screens: 6, isActive: true },

  // Haryana — Gurugram
  { id: 'cn_ggn_1', name: 'PVR Ambience Mall',            cityId: 'c_hr_gurugram', address: 'NH-8, Gurugram', screens: 11, isActive: true },
  { id: 'cn_ggn_2', name: 'Cinepolis DLF Mega Mall',      cityId: 'c_hr_gurugram', address: 'Golf Course Road, Gurugram', screens: 7, isActive: true },

  // Haryana — Faridabad
  { id: 'cn_fbd_1', name: 'INOX Crown Interiorz',         cityId: 'c_hr_faridabad', address: 'Sector 35, Faridabad', screens: 5, isActive: true },
  { id: 'cn_fbd_2', name: 'PVR SRS Cinemas',              cityId: 'c_hr_faridabad', address: 'Sector 12, Faridabad', screens: 4, isActive: true },

  // Haryana — Panipat & Ambala
  { id: 'cn_pnp_1', name: 'Cinepolis Mittal Mega Mall',   cityId: 'c_hr_panipat', address: 'Sector 25, Panipat', screens: 4, isActive: true },
  { id: 'cn_amb_1', name: 'PVR Galaxy Mall',              cityId: 'c_hr_ambala', address: 'Sector 7, Ambala', screens: 4, isActive: true },

  // Haryana — Rohtak, Karnal, Sonipat, Panchkula
  { id: 'cn_rtk_1', name: 'PVR Sheetal Mall',             cityId: 'c_hr_rohtak', address: 'Delhi Road, Rohtak', screens: 3, isActive: true },
  { id: 'cn_knl_1', name: 'MovieMax Kessel Mall',         cityId: 'c_hr_karnal', address: 'Sector 12, Karnal', screens: 4, isActive: true },
  { id: 'cn_snp_1', name: 'Miraj Cinemas',                cityId: 'c_hr_sonipat', address: 'Subhash Chowk, Sonipat', screens: 3, isActive: true },
  { id: 'cn_pkl_1', name: 'PVR Shalimar Mega Mall',       cityId: 'c_hr_panchkula', address: 'Sector 5, Panchkula', screens: 4, isActive: true },

  // Chandigarh (UT & Capital)
  { id: 'cn_chd_1', name: 'PVR Elante Mall',              cityId: 'c_ut_ch', address: 'Industrial Area Phase 1, Chandigarh', screens: 8, isActive: true },
  { id: 'cn_chd_2', name: 'Cinepolis Jagat Mall',         cityId: 'c_ut_ch', address: 'Sector 17, Chandigarh', screens: 4, isActive: true },

  // Jaipur
  { id: 'cn_jpr_1', name: 'Raj Mandir Cinema',            cityId: 'c_cap_rj', address: 'Bhagwan Das Road, Jaipur', screens: 1, isActive: true },
  { id: 'cn_jpr_2', name: 'INOX Crystal Palm',            cityId: 'c_cap_rj', address: 'Bais Godam, Jaipur', screens: 5, isActive: true },

  // Lucknow
  { id: 'cn_lko_1', name: 'PVR Phoenix Palassio',         cityId: 'c_cap_up', address: 'Amar Shaheed Path, Lucknow', screens: 10, isActive: true },

  // Patna & Bhopal
  { id: 'cn_pat_1', name: 'Cinepolis P&M Mall',           cityId: 'c_cap_br', address: 'Patliputra Colony, Patna', screens: 5, isActive: true },
  { id: 'cn_bpl_1', name: 'Cinepolis DB City Mall',       cityId: 'c_cap_mp', address: 'Arera Hills, Bhopal', screens: 6, isActive: true },

  // Kochi & Indore
  { id: 'cn_koc_1', name: 'PVR Lulu Mall',                cityId: 'c_hub_kochi', address: 'Edappally, Kochi', screens: 9, isActive: true },
  { id: 'cn_ind_1', name: 'INOX Treasure Island',         cityId: 'c_hub_indore', address: 'MG Road, Indore', screens: 5, isActive: true },

  // Noida
  { id: 'cn_noi_1', name: 'PVR Superplex Mall of India',   cityId: 'c_hub_noida', address: 'Sector 18, Noida', screens: 12, isActive: true },

  // Ludhiana & Amritsar
  { id: 'cn_ldh_1', name: 'PVR Pavilion Mall',            cityId: 'c_hub_ludhiana', address: 'Fountain Chowk, Ludhiana', screens: 6, isActive: true },
  { id: 'cn_asr_1', name: 'Cinepolis Mall of Amritsar',   cityId: 'c_hub_amritsar', address: 'GT Road, Amritsar', screens: 5, isActive: true },
];
