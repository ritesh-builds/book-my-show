// seeds/shows.seed.ts — Complete 100 Shows Catalog (Top 25 Hot Tier in Redis + 75 DB Catalog)

import type { Show } from '../src/modules/shows/shows.types.ts';

export const showsSeed: Omit<Show, 'createdAt'>[] = [
  // ==========================================
  // TOP 25 HOT TIER (CACHED IN REDIS RAM) - 25 DISTINCT MOVIES
  // ==========================================

  // 1. Kalki 2898 AD (Karnal)
  { id: 's_knl_1', movie: 'Kalki 2898 AD', cinemaId: 'cn_knl_1', screenNo: 1, startTime: '11:00', endTime: '14:15', date: '2024-12-20', language: 'Hindi', format: '3D', price: 320, availableSeats: 150, totalSeats: 180, isActive: true, isHot: true },

  // 2. Pushpa 2: The Rule (Karnal)
  { id: 's_knl_2', movie: 'Pushpa 2', cinemaId: 'cn_knl_1', screenNo: 2, startTime: '15:30', endTime: '18:30', date: '2024-12-20', language: 'Hindi', format: '2D', price: 260, availableSeats: 140, totalSeats: 160, isActive: true, isHot: true },

  // 3. Animal (Karnal)
  { id: 's_knl_3', movie: 'Animal', cinemaId: 'cn_knl_1', screenNo: 3, startTime: '19:45', endTime: '23:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 280, availableSeats: 160, totalSeats: 180, isActive: true, isHot: true },

  // 4. Dunki (Karnal)
  { id: 's_knl_4', movie: 'Dunki', cinemaId: 'cn_knl_2', screenNo: 1, startTime: '13:15', endTime: '16:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 240, availableSeats: 120, totalSeats: 140, isActive: true, isHot: true },

  // 5. Salaar (Karnal)
  { id: 's_knl_5', movie: 'Salaar', cinemaId: 'cn_knl_2', screenNo: 2, startTime: '18:00', endTime: '21:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 250, availableSeats: 130, totalSeats: 150, isActive: true, isHot: true },

  // 6. Stree 2 (Karnal)
  { id: 's_knl_6', movie: 'Stree 2', cinemaId: 'cn_knl_1', screenNo: 4, startTime: '21:15', endTime: '23:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 290, availableSeats: 170, totalSeats: 180, isActive: true, isHot: true },

  // 7. Shaitaan (Karnal)
  { id: 's_knl_7', movie: 'Shaitaan', cinemaId: 'cn_knl_2', screenNo: 3, startTime: '21:00', endTime: '23:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 260, availableSeats: 110, totalSeats: 140, isActive: true, isHot: true },

  // 8. Carry on Jatta 3 (Karnal)
  { id: 's_knl_8', movie: 'Carry on Jatta 3', cinemaId: 'cn_knl_1', screenNo: 1, startTime: '17:30', endTime: '20:00', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 250, availableSeats: 140, totalSeats: 160, isActive: true, isHot: true },

  // 9. Oppenheimer (Delhi)
  { id: 's1', movie: 'Oppenheimer', cinemaId: 'cn1', screenNo: 2, startTime: '17:00', endTime: '20:00', date: '2024-12-20', language: 'English', format: 'IMAX', price: 550, availableSeats: 190, totalSeats: 220, isActive: true, isHot: true },

  // 10. Dune: Part Two (Bengaluru)
  { id: 's2', movie: 'Dune: Part Two', cinemaId: 'cn5', screenNo: 1, startTime: '14:30', endTime: '17:15', date: '2024-12-20', language: 'English', format: 'IMAX', price: 500, availableSeats: 210, totalSeats: 240, isActive: true, isHot: true },

  // 11. Deadpool & Wolverine (Gurugram)
  { id: 's3', movie: 'Deadpool & Wolverine', cinemaId: 'cn_ggn_2', screenNo: 1, startTime: '18:15', endTime: '20:30', date: '2024-12-20', language: 'English', format: '3D IMAX', price: 520, availableSeats: 160, totalSeats: 180, isActive: true, isHot: true },

  // 12. Jawan (Mumbai)
  { id: 's4', movie: 'Jawan', cinemaId: 'cn2', screenNo: 3, startTime: '20:15', endTime: '23:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 340, availableSeats: 180, totalSeats: 200, isActive: true, isHot: true },

  // 13. Interstellar (Delhi)
  { id: 's5', movie: 'Interstellar', cinemaId: 'cn1', screenNo: 1, startTime: '21:30', endTime: '00:30', date: '2024-12-20', language: 'English', format: 'IMAX', price: 650, availableSeats: 180, totalSeats: 200, isActive: true, isHot: true },

  // 14. Fighter (Faridabad)
  { id: 's6', movie: 'Fighter', cinemaId: 'cn_fbd_1', screenNo: 3, startTime: '19:00', endTime: '21:45', date: '2024-12-20', language: 'Hindi', format: '3D', price: 320, availableSeats: 140, totalSeats: 160, isActive: true, isHot: true },

  // 15. Manjummel Boys (Kochi)
  { id: 's7', movie: 'Manjummel Boys', cinemaId: 'cn_koc_1', screenNo: 1, startTime: '11:15', endTime: '13:45', date: '2024-12-20', language: 'Malayalam', format: '2D', price: 220, availableSeats: 190, totalSeats: 200, isActive: true, isHot: true },

  // 16. Kantara (Bengaluru)
  { id: 's8', movie: 'Kantara', cinemaId: 'cn5', screenNo: 3, startTime: '17:45', endTime: '20:15', date: '2024-12-20', language: 'Kannada', format: '2D', price: 300, availableSeats: 160, totalSeats: 180, isActive: true, isHot: true },

  // 17. K.G.F: Chapter 2 (Bengaluru)
  { id: 's9', movie: 'K.G.F: Chapter 2', cinemaId: 'cn6', screenNo: 2, startTime: '19:30', endTime: '22:30', date: '2024-12-20', language: 'Kannada', format: 'IMAX', price: 450, availableSeats: 220, totalSeats: 250, isActive: true, isHot: true },

  // 18. Aavesham (Kochi)
  { id: 's10', movie: 'Aavesham', cinemaId: 'cn_koc_1', screenNo: 2, startTime: '15:00', endTime: '17:30', date: '2024-12-20', language: 'Malayalam', format: '2D', price: 240, availableSeats: 150, totalSeats: 180, isActive: true, isHot: true },

  // 19. Leo (Chennai)
  { id: 's11', movie: 'Leo', cinemaId: 'cn9', screenNo: 2, startTime: '18:45', endTime: '21:45', date: '2024-12-20', language: 'Tamil', format: 'IMAX', price: 420, availableSeats: 260, totalSeats: 300, isActive: true, isHot: true },

  // 20. Bramayugam (Kochi)
  { id: 's12', movie: 'Bramayugam', cinemaId: 'cn_koc_1', screenNo: 3, startTime: '20:30', endTime: '22:45', date: '2024-12-20', language: 'Malayalam', format: '2D', price: 200, availableSeats: 130, totalSeats: 160, isActive: true, isHot: true },

  // 21. Vettaiyan (Chennai)
  { id: 's13', movie: 'Vettaiyan', cinemaId: 'cn9', screenNo: 1, startTime: '10:30', endTime: '13:30', date: '2024-12-20', language: 'Tamil', format: '2D', price: 220, availableSeats: 250, totalSeats: 300, isActive: true, isHot: true },

  // 22. Warning 2 (Ludhiana)
  { id: 's14', movie: 'Warning 2', cinemaId: 'cn_ldh_1', screenNo: 1, startTime: '16:00', endTime: '18:30', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 240, availableSeats: 150, totalSeats: 180, isActive: true, isHot: true },

  // 23. Chandu Champion (Jaipur)
  { id: 's15', movie: 'Chandu Champion', cinemaId: 'cn_jpr_1', screenNo: 1, startTime: '15:15', endTime: '17:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 250, availableSeats: 120, totalSeats: 150, isActive: true, isHot: true },

  // 24. Article 370 (Delhi)
  { id: 's16', movie: 'Article 370', cinemaId: 'cn3', screenNo: 3, startTime: '13:00', endTime: '15:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 300, availableSeats: 190, totalSeats: 220, isActive: true, isHot: true },

  // 25. Spider-Man: Across the Spider-Verse (Hyderabad)
  { id: 's17', movie: 'Spider-Man: Across the Spider-Verse', cinemaId: 'cn11', screenNo: 3, startTime: '17:15', endTime: '19:45', date: '2024-12-20', language: 'English', format: '3D IMAX', price: 460, availableSeats: 210, totalSeats: 250, isActive: true, isHot: true },

  // ==========================================
  // 75 DATABASE CATALOG MOVIES (COLD TIER) - 75 DISTINCT MOVIES
  // ==========================================

  { id: 's26', movie: 'RRR',                      cinemaId: 'cn11', screenNo: 1, startTime: '21:00', endTime: '00:15', date: '2024-12-20', language: 'Telugu', format: 'IMAX', price: 450, availableSeats: 280, totalSeats: 300, isActive: true },
  { id: 's27', movie: 'Baahubali 2',             cinemaId: 'cn12', screenNo: 1, startTime: '12:00', endTime: '15:15', date: '2024-12-20', language: 'Telugu', format: '2D', price: 300, availableSeats: 180, totalSeats: 200, isActive: true },
  { id: 's28', movie: 'Dangal',                  cinemaId: 'cn_chd_2', screenNo: 1, startTime: '13:30', endTime: '16:30', date: '2024-12-20', language: 'Hindi', format: '2D', price: 240, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's29', movie: 'Pathaan',                 cinemaId: 'cn_noi_1', screenNo: 1, startTime: '18:00', endTime: '20:45', date: '2024-12-20', language: 'Hindi', format: 'IMAX', price: 480, availableSeats: 230, totalSeats: 260, isActive: true },
  { id: 's30', movie: 'Gadar 2',                 cinemaId: 'cn_pnp_1', screenNo: 1, startTime: '15:00', endTime: '17:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 220, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's31', movie: 'Vikram',                  cinemaId: 'cn10', screenNo: 1, startTime: '19:30', endTime: '22:30', date: '2024-12-20', language: 'Tamil', format: '2D', price: 260, availableSeats: 190, totalSeats: 220, isActive: true },
  { id: 's32', movie: 'Jailer',                  cinemaId: 'cn9', screenNo: 3, startTime: '14:00', endTime: '16:45', date: '2024-12-20', language: 'Tamil', format: '2D', price: 250, availableSeats: 220, totalSeats: 250, isActive: true },
  { id: 's33', movie: 'The Dark Knight',         cinemaId: 'cn4', screenNo: 1, startTime: '21:00', endTime: '23:45', date: '2024-12-20', language: 'English', format: 'IMAX', price: 500, availableSeats: 200, totalSeats: 220, isActive: true },
  { id: 's34', movie: 'Inception',               cinemaId: 'cn7', screenNo: 1, startTime: '16:15', endTime: '19:00', date: '2024-12-20', language: 'English', format: 'IMAX', price: 480, availableSeats: 170, totalSeats: 200, isActive: true },
  { id: 's35', movie: 'Avatar: The Way of Water',cinemaId: 'cn15', screenNo: 1, startTime: '11:00', endTime: '14:30', date: '2024-12-20', language: 'English', format: '3D IMAX', price: 520, availableSeats: 220, totalSeats: 250, isActive: true },
  { id: 's36', movie: 'Top Gun: Maverick',       cinemaId: 'cn_ind_1', screenNo: 1, startTime: '17:30', endTime: '19:45', date: '2024-12-20', language: 'English', format: '4DX', price: 420, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's37', movie: 'The Batman',              cinemaId: 'cn13', screenNo: 1, startTime: '19:00', endTime: '22:00', date: '2024-12-20', language: 'English', format: 'IMAX', price: 460, availableSeats: 190, totalSeats: 220, isActive: true },
  { id: 's38', movie: 'Avengers: Endgame',       cinemaId: 'cn2', screenNo: 2, startTime: '12:30', endTime: '15:45', date: '2024-12-20', language: 'English', format: '3D', price: 380, availableSeats: 180, totalSeats: 200, isActive: true },
  { id: 's39', movie: 'Avengers: Infinity War',  cinemaId: 'cn8', screenNo: 1, startTime: '18:15', endTime: '21:00', date: '2024-12-20', language: 'English', format: '2D', price: 320, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's40', movie: 'John Wick: Chapter 4',    cinemaId: 'cn_amb_1', screenNo: 1, startTime: '19:15', endTime: '22:15', date: '2024-12-20', language: 'English', format: '2D', price: 260, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's41', movie: 'Mission: Impossible 7',   cinemaId: 'cn_lko_1', screenNo: 1, startTime: '16:45', endTime: '19:45', date: '2024-12-20', language: 'English', format: 'IMAX', price: 440, availableSeats: 240, totalSeats: 260, isActive: true },
  { id: 's42', movie: 'Fast X',                  cinemaId: 'cn_pat_1', screenNo: 1, startTime: '14:00', endTime: '16:30', date: '2024-12-20', language: 'English', format: '3D', price: 300, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's43', movie: 'Gladiator',               cinemaId: 'cn_bpl_1', screenNo: 1, startTime: '17:00', endTime: '19:45', date: '2024-12-20', language: 'English', format: '2D', price: 240, availableSeats: 120, totalSeats: 150, isActive: true },
  { id: 's44', movie: 'The Matrix',              cinemaId: 'cn1', screenNo: 3, startTime: '14:00', endTime: '16:30', date: '2024-12-20', language: 'English', format: '2D', price: 320, availableSeats: 150, totalSeats: 180, isActive: true },
  { id: 's45', movie: 'Pulp Fiction',            cinemaId: 'cn3', screenNo: 2, startTime: '21:45', endTime: '00:30', date: '2024-12-20', language: 'English', format: '2D', price: 350, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's46', movie: 'Fight Club',              cinemaId: 'cn5', screenNo: 4, startTime: '20:15', endTime: '22:45', date: '2024-12-20', language: 'English', format: '2D', price: 300, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's47', movie: 'The Shawshank Redemption',cinemaId: 'cn4', screenNo: 2, startTime: '16:00', endTime: '18:45', date: '2024-12-20', language: 'English', format: '2D', price: 280, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's48', movie: 'Sholay (3D)',             cinemaId: 'cn_rtk_1', screenNo: 1, startTime: '12:30', endTime: '16:00', date: '2024-12-20', language: 'Hindi', format: '3D', price: 220, availableSeats: 120, totalSeats: 140, isActive: true },
  { id: 's49', movie: 'DDLJ',                    cinemaId: 'cn1', screenNo: 4, startTime: '11:30', endTime: '14:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 250, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's50', movie: '3 Idiots',                cinemaId: 'cn_chd_1', screenNo: 4, startTime: '18:15', endTime: '21:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 280, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's51', movie: 'Lagaan',                  cinemaId: 'cn_snp_1', screenNo: 1, startTime: '13:00', endTime: '16:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 200, availableSeats: 110, totalSeats: 130, isActive: true },
  { id: 's52', movie: 'Zindagi Na Milegi Dobara',cinemaId: 'cn_pkl_1', screenNo: 1, startTime: '17:45', endTime: '20:30', date: '2024-12-20', language: 'Hindi', format: '2D', price: 260, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's53', movie: 'Yeh Jawaani Hai Deewani', cinemaId: 'cn_kkr_1', screenNo: 1, startTime: '14:15', endTime: '17:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 230, availableSeats: 120, totalSeats: 140, isActive: true },
  { id: 's54', movie: 'Barfi!',                  cinemaId: 'cn14', screenNo: 1, startTime: '15:30', endTime: '18:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 280, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's55', movie: 'Queen',                   cinemaId: 'cn7', screenNo: 2, startTime: '13:45', endTime: '16:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 270, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's56', movie: 'Bajrangi Bhaijaan',       cinemaId: 'cn_ymn_1', screenNo: 1, startTime: '12:00', endTime: '15:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 210, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's57', movie: 'PK',                      cinemaId: 'cn_hsr_1', screenNo: 1, startTime: '16:30', endTime: '19:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 220, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's58', movie: 'Sultan',                  cinemaId: 'cn_rew_1', screenNo: 1, startTime: '14:45', endTime: '17:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 200, availableSeats: 110, totalSeats: 130, isActive: true },
  { id: 's59', movie: 'War',                     cinemaId: 'cn_asr_1', screenNo: 1, startTime: '18:30', endTime: '21:15', date: '2024-12-20', language: 'Hindi', format: '4DX', price: 350, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's60', movie: 'Kabir Singh',             cinemaId: 'cn_ldh_1', screenNo: 2, startTime: '20:00', endTime: '23:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 260, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's61', movie: 'Tanhaji',                 cinemaId: 'cn_ind_1', screenNo: 2, startTime: '14:15', endTime: '16:45', date: '2024-12-20', language: 'Hindi', format: '3D', price: 280, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's62', movie: 'Drishyam 2',              cinemaId: 'cn_noi_1', screenNo: 2, startTime: '15:45', endTime: '18:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 320, availableSeats: 170, totalSeats: 200, isActive: true },
  { id: 's63', movie: 'Andhadhun',               cinemaId: 'cn_jpr_2', screenNo: 1, startTime: '19:15', endTime: '21:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 260, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's64', movie: 'Munjya',                  cinemaId: 'cn_fbd_2', screenNo: 1, startTime: '13:45', endTime: '16:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 230, availableSeats: 120, totalSeats: 140, isActive: true },
  { id: 's65', movie: 'Bad Newz',                cinemaId: 'cn_ggn_2', screenNo: 2, startTime: '15:30', endTime: '18:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 360, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's66', movie: 'Khel Khel Mein',          cinemaId: 'cn_noi_1', screenNo: 3, startTime: '12:15', endTime: '14:45', date: '2024-12-20', language: 'Hindi', format: '2D', price: 290, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's67', movie: 'Vedaa',                   cinemaId: 'cn_jpr_1', screenNo: 1, startTime: '18:30', endTime: '21:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 240, availableSeats: 120, totalSeats: 150, isActive: true },
  { id: 's68', movie: 'Sarfira',                 cinemaId: 'cn_lko_1', screenNo: 2, startTime: '13:15', endTime: '16:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 280, availableSeats: 150, totalSeats: 180, isActive: true },
  { id: 's69', movie: 'Maidaan',                 cinemaId: 'cn13', screenNo: 2, startTime: '15:15', endTime: '18:30', date: '2024-12-20', language: 'Hindi', format: '2D', price: 290, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's70', movie: 'Crew',                    cinemaId: 'cn15', screenNo: 2, startTime: '16:45', endTime: '19:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 310, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's71', movie: 'Srikanth',                cinemaId: 'cn8', screenNo: 2, startTime: '14:30', endTime: '17:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 250, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's72', movie: 'Kill',                    cinemaId: 'cn3', screenNo: 4, startTime: '22:15', endTime: '00:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 340, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's73', movie: 'Maharaja',                cinemaId: 'cn9', screenNo: 4, startTime: '21:15', endTime: '23:45', date: '2024-12-20', language: 'Tamil', format: '2D', price: 280, availableSeats: 220, totalSeats: 250, isActive: true },
  { id: 's74', movie: 'Indian 2',                cinemaId: 'cn10', screenNo: 2, startTime: '14:30', endTime: '17:45', date: '2024-12-20', language: 'Tamil', format: '3D', price: 320, availableSeats: 190, totalSeats: 220, isActive: true },
  { id: 's75', movie: 'Raayan',                  cinemaId: 'cn10', screenNo: 3, startTime: '18:15', endTime: '21:00', date: '2024-12-20', language: 'Tamil', format: '2D', price: 270, availableSeats: 170, totalSeats: 200, isActive: true },
  { id: 's76', movie: 'Thangalaan',              cinemaId: 'cn9', screenNo: 1, startTime: '16:00', endTime: '18:45', date: '2024-12-20', language: 'Tamil', format: '2D', price: 260, availableSeats: 190, totalSeats: 220, isActive: true },
  { id: 's77', movie: 'GOAT',                    cinemaId: 'cn10', screenNo: 1, startTime: '20:30', endTime: '23:30', date: '2024-12-20', language: 'Tamil', format: 'IMAX', price: 420, availableSeats: 230, totalSeats: 260, isActive: true },
  { id: 's78', movie: 'Devara: Part 1',          cinemaId: 'cn11', screenNo: 2, startTime: '18:00', endTime: '21:00', date: '2024-12-20', language: 'Telugu', format: 'IMAX', price: 480, availableSeats: 270, totalSeats: 300, isActive: true },
  { id: 's79', movie: 'Hanu-Man',                cinemaId: 'cn12', screenNo: 2, startTime: '15:30', endTime: '18:15', date: '2024-12-20', language: 'Telugu', format: '3D', price: 320, availableSeats: 180, totalSeats: 200, isActive: true },
  { id: 's80', movie: 'Tillu Square',            cinemaId: 'cn12', screenNo: 3, startTime: '19:15', endTime: '21:45', date: '2024-12-20', language: 'Telugu', format: '2D', price: 280, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's81', movie: 'Jatt & Juliet 3',         cinemaId: 'cn_chd_1', screenNo: 3, startTime: '20:45', endTime: '23:15', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 300, availableSeats: 170, totalSeats: 190, isActive: true },
  { id: 's82', movie: 'Ardaas Sarbat De Bhale Di',cinemaId: 'cn_ldh_1', screenNo: 3, startTime: '13:00', endTime: '15:30', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 240, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's83', movie: 'Qismat 2',               cinemaId: 'cn_asr_1', screenNo: 2, startTime: '14:45', endTime: '17:30', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 230, availableSeats: 120, totalSeats: 140, isActive: true },
  { id: 's84', movie: 'Saunkan Saunkne',         cinemaId: 'cn_chd_2', screenNo: 2, startTime: '17:15', endTime: '19:45', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 260, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's85', movie: 'Honsla Rakh',             cinemaId: 'cn_ldh_1', screenNo: 4, startTime: '19:00', endTime: '21:30', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 270, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's86', movie: 'Chal Mera Putt',          cinemaId: 'cn_asr_1', screenNo: 3, startTime: '16:30', endTime: '19:00', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 250, availableSeats: 130, totalSeats: 150, isActive: true },
  { id: 's87', movie: 'Shadaa',                  cinemaId: 'cn_chd_1', screenNo: 2, startTime: '13:45', endTime: '16:15', date: '2024-12-20', language: 'Punjabi', format: '2D', price: 260, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's88', movie: 'Lucifer',                 cinemaId: 'cn_koc_1', screenNo: 4, startTime: '18:30', endTime: '21:30', date: '2024-12-20', language: 'Malayalam', format: '2D', price: 230, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's89', movie: 'Premalu',                 cinemaId: 'cn_koc_1', screenNo: 1, startTime: '14:00', endTime: '16:30', date: '2024-12-20', language: 'Malayalam', format: '2D', price: 210, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's90', movie: 'Ponniyin Selvan: Part 1', cinemaId: 'cn9', screenNo: 3, startTime: '17:30', endTime: '20:30', date: '2024-12-20', language: 'Tamil', format: 'IMAX', price: 380, availableSeats: 210, totalSeats: 240, isActive: true },
  { id: 's91', movie: 'Master',                  cinemaId: 'cn10', screenNo: 4, startTime: '21:45', endTime: '00:45', date: '2024-12-20', language: 'Tamil', format: '2D', price: 280, availableSeats: 190, totalSeats: 220, isActive: true },
  { id: 's92', movie: 'Vikram Vedha',            cinemaId: 'cn3', screenNo: 1, startTime: '16:15', endTime: '19:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 310, availableSeats: 170, totalSeats: 200, isActive: true },
  { id: 's93', movie: 'Kantara: Chapter 1',      cinemaId: 'cn6', screenNo: 1, startTime: '15:45', endTime: '18:15', date: '2024-12-20', language: 'Kannada', format: 'IMAX', price: 420, availableSeats: 200, totalSeats: 230, isActive: true },
  { id: 's94', movie: 'Charlie 777',             cinemaId: 'cn5', screenNo: 2, startTime: '11:30', endTime: '14:15', date: '2024-12-20', language: 'Kannada', format: '2D', price: 260, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's95', movie: 'Sita Ramam',              cinemaId: 'cn12', screenNo: 4, startTime: '16:00', endTime: '18:45', date: '2024-12-20', language: 'Telugu', format: '2D', price: 270, availableSeats: 150, totalSeats: 170, isActive: true },
  { id: 's96', movie: 'Tenet',                   cinemaId: 'cn1', screenNo: 2, startTime: '20:30', endTime: '23:15', date: '2024-12-20', language: 'English', format: 'IMAX', price: 540, availableSeats: 180, totalSeats: 210, isActive: true },
  { id: 's97', movie: 'Mad Max: Fury Road',      cinemaId: 'cn7', screenNo: 3, startTime: '19:15', endTime: '21:30', date: '2024-12-20', language: 'English', format: '4DX', price: 450, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's98', movie: 'Joker',                   cinemaId: 'cn4', screenNo: 3, startTime: '18:45', endTime: '21:00', date: '2024-12-20', language: 'English', format: 'IMAX', price: 480, availableSeats: 170, totalSeats: 190, isActive: true },
  { id: 's99', movie: 'Barbie',                  cinemaId: 'cn8', screenNo: 3, startTime: '16:00', endTime: '18:15', date: '2024-12-20', language: 'English', format: '2D', price: 340, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's100', movie: 'Bhaag Milkha Bhaag',     cinemaId: 'cn_chd_1', screenNo: 1, startTime: '11:00', endTime: '14:15', date: '2024-12-20', language: 'Hindi', format: '2D', price: 250, availableSeats: 130, totalSeats: 150, isActive: true },
];
