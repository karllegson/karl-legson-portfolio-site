import type { StudyQuestion } from './studyData';

/*
 * Ground School Final — MC 50
 * Correct answers come from Karl's review sheet; the wrong choices are
 * generated distractors for training. Numbering matches the sheet
 * (a few questions repeat on the real test: 31=20, 35=18, 36=16, 40=14).
 */
export const groundSchoolMcQuestions: StudyQuestion[] = [
  {
    id: 'mc-1',
    number: 1,
    category: 'Instruments',
    question: 'Rate of turn is dependent upon what?',
    options: [
      'The horizontal lift component (bank angle) and true airspeed',
      'The vertical lift component and pitch attitude',
      'Aircraft weight and load factor',
    ],
    correctIndex: 0,
    answer: 'The horizontal lift component (bank angle) and true airspeed',
  },
  {
    id: 'mc-2',
    number: 2,
    category: 'Instruments',
    question: 'The magnetic compass northerly turning error is caused by:',
    options: [
      'Acceleration on east or west headings',
      'Deviation from aircraft electrical equipment',
      'Magnetic dip',
    ],
    correctIndex: 2,
    answer: 'Magnetic dip',
  },
  {
    id: 'mc-3',
    number: 3,
    category: 'Instruments',
    figure: 'altimeters-12000',
    question: '(Figure) Which altimeter indicates 12,000 ft?',
    options: ['1', '3', '4'],
    correctIndex: 2,
    answer: '4',
    note: 'Read the three hands: thin 10,000-ft marker just past 1, wide 1,000-ft hand on 2, long 100-ft hand on 0 → 12,000 ft.',
  },
  {
    id: 'mc-4',
    number: 4,
    category: 'Instruments',
    question: '(Figure) Depressing the clockwise manual heading drive button on the slaved compass rotates the compass card to the:',
    options: [
      'Right, to eliminate left compass card error',
      'Left, to eliminate left compass card error',
      'Right, to eliminate right compass card error',
    ],
    correctIndex: 0,
    answer: 'Right, to eliminate left compass card error',
  },
  {
    id: 'mc-5',
    number: 5,
    category: 'Instruments',
    question: 'The local altimeter setting should be used by all pilots in a particular area primarily to provide for:',
    options: [
      'More accurate terrain clearance in mountainous areas',
      'Better vertical separation of aircraft',
      'Correction for nonstandard temperature',
    ],
    correctIndex: 1,
    answer: 'Better vertical separation of aircraft',
  },
  {
    id: 'mc-6',
    number: 6,
    category: 'Instruments',
    question: 'You are at 6,500 ft MSL with an altimeter setting of 30.42" Hg. What is the pressure altitude?',
    options: ['7,000 ft', '6,000 ft', '6,500 ft'],
    correctIndex: 1,
    answer: '6,000 ft',
    note: '30.42 − 29.92 = 0.50" → 500 ft. Setting is HIGHER than standard, so pressure altitude is LOWER: 6,500 − 500 = 6,000 ft.',
  },
  {
    id: 'mc-7',
    number: 7,
    category: 'Instruments',
    question: 'Which instruments should be used to make a pitch correction when you have deviated from your assigned altitude?',
    options: [
      'Attitude indicator, turn coordinator, and airspeed indicator',
      'Altimeter, heading indicator, and VSI',
      'Attitude indicator, altimeter, and VSI',
    ],
    correctIndex: 2,
    answer: 'Attitude indicator, altimeter, and VSI',
  },
  {
    id: 'mc-8',
    number: 8,
    category: 'Instruments',
    question: 'For maintaining a standard rate turn, the primary instrument for bank is the:',
    options: [
      'Attitude indicator',
      'Turn & slip indicator or turn coordinator',
      'Heading indicator',
    ],
    correctIndex: 1,
    answer: 'Turn & slip indicator or turn coordinator',
  },
  {
    id: 'mc-9',
    number: 9,
    category: 'Instruments',
    figure: 'panel-climbing-right',
    question: '(Figure) What is the flight attitude? One instrument system has malfunctioned.',
    options: [
      'Climbing turn to the left',
      'Climbing turn to the right',
      'Level turn to the right',
    ],
    correctIndex: 1,
    answer: 'Climbing turn to the right',
    note: 'Altimeter increasing + VSI climbing + turn coordinator right turn agree → the attitude indicator (level) is the failed instrument.',
  },
  {
    id: 'mc-10',
    number: 10,
    category: 'Instruments',
    figure: 'panel-level-right',
    question: '(Figure) What is the flight attitude? One instrument system has malfunctioned.',
    options: [
      'Climbing turn to the right',
      'Level turn to the right',
      'Descending turn to the right',
    ],
    correctIndex: 1,
    answer: 'Level turn to the right',
    note: 'Altimeter steady + VSI zero + turn coordinator right turn agree → the attitude indicator (showing a climb) is the failed instrument.',
  },
  {
    id: 'mc-11',
    number: 11,
    category: 'Regulations',
    question: 'The pilot in command must hold an instrument rating when operating:',
    options: [
      'In Class B airspace at night',
      'Under IFR and in Class A airspace',
      'Whenever flight visibility is less than 3 SM',
    ],
    correctIndex: 1,
    answer: 'Under IFR and in Class A airspace',
  },
  {
    id: 'mc-12',
    number: 12,
    category: 'Regulations',
    question: "A pilot's recent IFR experience expires on July 1. What is the latest date the pilot can meet the recent IFR experience requirement (without an instrument proficiency check)?",
    options: ['December 31', 'July 31', 'October 1'],
    correctIndex: 0,
    answer: 'December 31',
    note: 'After currency lapses you have 6 more calendar months to regain it on your own (with a safety pilot) — after Dec 31 an IPC is required.',
  },
  {
    id: 'mc-13',
    number: 13,
    category: 'Regulations',
    question: 'Before beginning any IFR flight, the PIC must become familiar with:',
    options: [
      'All NOTAMs within 100 NM of the route of flight',
      "Runway lengths at airports of intended use, and the aircraft's takeoff and landing distance data",
      'The ATC preferred routing between all airports along the route',
    ],
    correctIndex: 1,
    answer: "Runway lengths at airports of intended use, and the aircraft's takeoff and landing distance data",
  },
  {
    id: 'mc-14',
    number: 14,
    category: 'Airspace',
    figure: 'class-g-day',
    question: '(Figure) What minimum in-flight visibility and distance from clouds is required at 8,500 ft MSL (above 1,200 ft AGL) in Class G airspace during day VFR?',
    options: [
      '1 mile; 1,000 ft above, 2,000 ft horizontal, 500 ft below',
      '3 miles; 1,000 ft above, 2,000 ft horizontal, 500 ft below',
      '1 mile; clear of clouds',
    ],
    correctIndex: 0,
    answer: '1 mile; 1,000 ft above, 2,000 ft horizontal, 500 ft below',
  },
  {
    id: 'mc-15',
    number: 15,
    category: 'Regulations',
    question: 'When a pilot elects to proceed to the selected alternate airport, which landing minimums should be used on arrival?',
    options: [
      'The minimums specified for the approach procedure selected',
      'Standard alternate minimums: 600-2 (precision) or 800-2 (nonprecision)',
      'The alternate minimums published for that airport',
    ],
    correctIndex: 0,
    answer: 'The minimums specified for the approach procedure selected',
    note: 'The 600-2 / 800-2 numbers are only for FILING the alternate — once you actually fly there, use the published approach minimums.',
  },
  {
    id: 'mc-16',
    number: 16,
    category: 'Airport',
    figure: 'runway-fixed-distance',
    question: '(Figure) What is distance A from the beginning of the runway (threshold) to the fixed distance (aiming point) marker?',
    options: ['500 ft', '1,000 ft', '1,500 ft'],
    correctIndex: 1,
    answer: '1,000 ft',
  },
  {
    id: 'mc-17',
    number: 17,
    category: 'Procedures',
    question: 'What wind condition prolongs the hazards of wake turbulence on a landing runway for the longest period of time?',
    options: [
      'Strong direct headwind',
      'Direct tailwind',
      'Light quartering tailwind',
    ],
    correctIndex: 2,
    answer: 'Light quartering tailwind',
  },
  {
    id: 'mc-18',
    number: 18,
    category: 'Procedures',
    question: 'What action should you take if your DME fails at FL240?',
    options: [
      'Descend below FL240 and continue to the destination',
      'Advise ATC and land at the nearest suitable airport',
      'Notify ATC and continue to the next airport of intended landing where repairs can be made',
    ],
    correctIndex: 2,
    answer: 'Notify ATC and continue to the next airport of intended landing where repairs can be made',
  },
  {
    id: 'mc-19',
    number: 19,
    category: 'Procedures',
    question: 'How wide is the SDF course?',
    options: ['3° or 6°', '6° or 12°', '5°, fixed width'],
    correctIndex: 1,
    answer: '6° or 12°',
  },
  {
    id: 'mc-20',
    number: 20,
    category: 'Procedures',
    figure: 'holding-350',
    question: '(Figure) While heading 350°, you receive this ATC clearance: "…HOLD NORTH OF THE VOR ON THE 360° RADIAL…" Which holding pattern and entry should you use?',
    options: ['1; direct', '2; teardrop', '1; parallel'],
    correctIndex: 0,
    answer: '1; direct',
  },
  {
    id: 'mc-21',
    number: 21,
    category: 'Aeromedical',
    question: 'Which is the most appropriate action when experiencing hyperventilation?',
    options: [
      'Breathe supplemental oxygen at a faster than normal rate',
      'Consciously breathe at a slower rate than normal',
      'Descend immediately and increase your breathing rate',
    ],
    correctIndex: 1,
    answer: 'Consciously breathe at a slower rate than normal',
  },
  {
    id: 'mc-22',
    number: 22,
    category: 'Aeromedical',
    question: 'What effect does haze have on judging traffic or terrain during flight?',
    options: [
      'Creates the illusion of being closer than actual, causing pilots to fly higher approaches',
      'Has no effect on distance perception during daylight',
      'Creates the illusion of being at a greater distance than actual, causing pilots to fly lower approaches',
    ],
    correctIndex: 2,
    answer: 'Creates the illusion of being at a greater distance than actual, causing pilots to fly lower approaches',
  },
  {
    id: 'mc-23',
    number: 23,
    category: 'Weather',
    question: 'Where do squall lines most often develop?',
    options: [
      'Behind a warm front',
      'Ahead of a cold front',
      'Along a stationary front',
    ],
    correctIndex: 1,
    answer: 'Ahead of a cold front',
  },
  {
    id: 'mc-24',
    number: 24,
    category: 'Weather',
    question: 'Unsaturated air flowing up a slope will cool at the rate of approximately (dry adiabatic lapse rate):',
    options: ['3 °C per 1,000 ft', '2 °C per 1,000 ft', '4.4 °C per 1,000 ft'],
    correctIndex: 0,
    answer: '3 °C per 1,000 ft',
  },
  {
    id: 'mc-25',
    number: 25,
    category: 'Weather',
    question: 'What is the most frequent type of ground- or surface-based temperature inversion?',
    options: [
      'Radiation inversion, produced on a clear, still night',
      'Advection inversion from warm air moving over a cold surface',
      'Frontal inversion produced by a fast-moving cold front',
    ],
    correctIndex: 0,
    answer: 'Radiation inversion, produced on a clear, still night',
  },
  {
    id: 'mc-26',
    number: 26,
    category: 'Weather',
    question: 'An individual microburst seldom lasts longer than:',
    options: ['1–2 minutes', '15 minutes', 'One hour'],
    correctIndex: 1,
    answer: '15 minutes',
  },
  {
    id: 'mc-27',
    number: 27,
    category: 'Weather',
    question: 'Which significant sky condition is reported by the METAR entry "VV008"?',
    options: [
      'Overcast ceiling at 800 ft',
      'Sky is obscured with vertical visibility of 800 ft',
      'Variable ceiling at 800 ft',
    ],
    correctIndex: 1,
    answer: 'Sky is obscured with vertical visibility of 800 ft',
  },
  {
    id: 'mc-28',
    number: 28,
    category: 'Weather',
    figure: 'radar-summary',
    question: '(Figure) What weather condition is indicated by arrow B on the radar summary chart?',
    options: [
      'Strong echoes, thunderstorms decreasing',
      'Weak to moderate echoes, rain showers increasing',
      'Heavy echoes, freezing rain',
    ],
    correctIndex: 1,
    answer: 'Weak to moderate echoes, rain showers increasing',
    note: 'Single contour = weak to moderate. "RW" = rain showers; "+" = increasing intensity.',
  },
  {
    id: 'mc-29',
    number: 29,
    category: 'Weather',
    figure: 'winds-aloft-fd',
    question: '(Figure) What is the approximate wind direction, speed, and temperature at FL270?',
    options: [
      '250° magnetic at 93 kt, ISA −6 °C',
      '260° true at 39 kt, ISA +9 °C',
      '255° true at 93 kt, ISA +6 °C',
    ],
    correctIndex: 2,
    answer: '255° true at 93 kt, ISA +6 °C',
    note: 'Interpolate between 24,000 (250°/90 kt/−27) and 30,000 (260°/96 kt/−38): 255°, 93 kt, ≈ −33 °C. ISA at FL270 ≈ −38.5 °C → about ISA +6.',
  },
  {
    id: 'mc-30',
    number: 30,
    category: 'Weather',
    figure: 'radar-summary',
    question: '(Figure) What weather condition is indicated by arrow D?',
    options: [
      'Line of severe thunderstorms, tops 4,300 ft MSL',
      'Isolated embedded cumulonimbus clouds, tops 43,000 ft MSL, less than 1/8 coverage',
      'Scattered rain showers, tops 43,000 ft AGL, 3/8 coverage',
    ],
    correctIndex: 1,
    answer: 'Isolated embedded cumulonimbus clouds, tops 43,000 ft MSL, less than 1/8 coverage',
    note: '"430" with the bar = echo top 43,000 ft MSL. A single small cell = isolated (< 1/8 coverage).',
  },
  {
    id: 'mc-31',
    number: 31,
    category: 'Procedures',
    figure: 'holding-350',
    question: '(Figure) While heading 350°, you receive this ATC clearance: "…HOLD NORTH OF THE VOR ON THE 360° RADIAL…" Which holding pattern and entry should you use? (Repeat — this appears twice on the test)',
    options: ['1; direct', '2; teardrop', '1; parallel'],
    correctIndex: 0,
    answer: '1; direct',
  },
  {
    id: 'mc-32',
    number: 32,
    category: 'Procedures',
    figure: 'holding-140',
    question: '(Figure) ATC clears you to hold on the one four zero degree bearing. Which holding entry is appropriate?',
    options: ['Direct', 'Parallel', 'Teardrop'],
    correctIndex: 1,
    answer: 'Parallel',
  },
  {
    id: 'mc-33',
    number: 33,
    category: 'Procedures',
    question: 'If an early missed approach is initiated before reaching the MAP, you should:',
    options: [
      'Proceed to the MAP at or above the MDA/DA before executing any turns',
      'Begin the turning portion of the missed approach immediately',
      'Climb straight ahead to the missed approach altitude, then turn direct to the holding fix',
    ],
    correctIndex: 0,
    answer: 'Proceed to the MAP at or above the MDA/DA before executing any turns',
  },
  {
    id: 'mc-34',
    number: 34,
    category: 'Procedures',
    question: 'When the RVR is not reported, what meteorological value should you substitute for 2,400 RVR?',
    options: [
      'Ground visibility of 1/4 SM',
      'Ground visibility of 1/2 SM',
      'Ground visibility of 3/4 SM',
    ],
    correctIndex: 1,
    answer: 'Ground visibility of 1/2 SM',
    note: 'RVR → visibility: 1,600 = 1/4 SM · 2,400 = 1/2 · 3,200 = 5/8 · 4,000 = 3/4 · 4,500 = 7/8 · 5,000 = 1 · 6,000 = 1-1/4 SM.',
  },
  {
    id: 'mc-35',
    number: 35,
    category: 'Procedures',
    question: 'What action should you take if your DME fails at FL240? (Repeat — this appears twice on the test)',
    options: [
      'Descend below FL240 and continue to the destination',
      'Advise ATC and land at the nearest suitable airport',
      'Notify ATC and continue to the next airport of intended landing where repairs can be made',
    ],
    correctIndex: 2,
    answer: 'Notify ATC and continue to the next airport of intended landing where repairs can be made',
  },
  {
    id: 'mc-36',
    number: 36,
    category: 'Airport',
    figure: 'runway-fixed-distance',
    question: '(Figure) What is distance A from the beginning of the runway (threshold) to the fixed distance (aiming point) marker? (Repeat — this appears twice on the test)',
    options: ['500 ft', '1,000 ft', '1,500 ft'],
    correctIndex: 1,
    answer: '1,000 ft',
  },
  {
    id: 'mc-37',
    number: 37,
    category: 'Regulations',
    question: 'To list an airport with a precision approach procedure as an alternate, the forecast weather at your ETA must be at least:',
    options: [
      '600-ft ceiling and 2 SM visibility',
      '800-ft ceiling and 2 SM visibility',
      '2,000-ft ceiling and 3 SM visibility',
    ],
    correctIndex: 0,
    answer: '600-ft ceiling and 2 SM visibility',
  },
  {
    id: 'mc-38',
    number: 38,
    category: 'Regulations',
    question: 'The altimeter system and static pressure system must have been inspected within the preceding:',
    options: ['12 calendar months', '24 calendar months', '36 calendar months'],
    correctIndex: 1,
    answer: '24 calendar months',
  },
  {
    id: 'mc-39',
    number: 39,
    category: 'Regulations',
    question: 'When is an IFR clearance required during VFR weather conditions?',
    options: [
      'In Class A airspace',
      'In Class B airspace',
      'Above 10,000 ft MSL in Class E airspace',
    ],
    correctIndex: 0,
    answer: 'In Class A airspace',
  },
  {
    id: 'mc-40',
    number: 40,
    category: 'Airspace',
    figure: 'class-g-day',
    question: '(Figure) What minimum in-flight visibility and distance from clouds is required at 8,500 ft MSL (above 1,200 ft AGL) in Class G airspace during day VFR? (Repeat — this appears twice on the test)',
    options: [
      '1 mile; 1,000 ft above, 2,000 ft horizontal, 500 ft below',
      '3 miles; 1,000 ft above, 2,000 ft horizontal, 500 ft below',
      '1 mile; clear of clouds',
    ],
    correctIndex: 0,
    answer: '1 mile; 1,000 ft above, 2,000 ft horizontal, 500 ft below',
  },
];

/*
 * Ground School Final — *SA (short answer)
 * Written like the real test. Numbered sequentially in sheet order.
 */
export const groundSchoolSaQuestions: StudyQuestion[] = [
  {
    id: 'sa-1',
    number: 1,
    category: 'Navigation',
    figure: 'vor-service-volume',
    figurePlacement: 'answer',
    question: 'VORs are classified as (T), (L) or (H). Explain the significance of these classifications.',
    answer: `T (Terminal): 25 NM, from 1,000 to 12,000 ft
L (Low altitude): 40 NM, from 1,000 to 18,000 ft
H (High altitude):
• 40 NM, from 1,000 to 14,500 ft
• 100 NM, from 14,500 to 18,000 ft
• 130 NM, from 18,000 to 45,000 ft
• 100 NM, from 45,000 to 60,000 ft`,
  },
  {
    id: 'sa-2',
    number: 2,
    category: 'Navigation',
    question: 'How do you find an ADF magnetic bearing?',
    answer: `Magnetic Heading (MH) + Relative Bearing (RB) = Magnetic Bearing (MB)`,
  },
  {
    id: 'sa-3',
    number: 3,
    category: 'Procedures',
    question: 'What does "Clearance void time" mean?',
    answer: `If a pilot doesn't take off by the void time, the departure clearance is automatically canceled — the pilot must then obtain a new clearance or cancel the IFR flight plan.`,
  },
  {
    id: 'sa-4',
    number: 4,
    category: 'Regulations',
    question: 'What are the alternate airport requirements?',
    answer: `1-2-3 rule: if from 1 hour before to 1 hour after your planned ETA at the destination airport, the forecast weather is at least 2,000-ft ceilings and 3-mile visibility, no alternate is required.

If less than 2,000 and 3 miles, an alternate must be filed:
• Precision approach procedure: ceiling 600 feet and visibility 2 SM
• Nonprecision approaches: ceiling 800 feet and visibility 2 SM`,
  },
  {
    id: 'sa-5',
    number: 5,
    category: 'Regulations',
    question: 'What aircraft instruments/equipment are required for IFR operations?',
    answer: `GRABCARD:
G = Generator
R = Radios
A = Altimeter
B = Ball of turn coordinator
C = Clock
A = Attitude indicator
R = Rate of turn indicator (turn coordinator)
D = Directional gyro

Plus DME above FL240 when using VORs for navigation.`,
  },
  {
    id: 'sa-6',
    number: 6,
    category: 'Regulations',
    question: 'What information must a PIC be familiar with before a flight? (Preflight action)',
    answer: `NFATWRK:
N = NOTAMs
F = Fuel requirements
A = Alternatives if flight cannot be completed as planned
T = Takeoff and landing distance data in the approved aircraft flight manual
W = Weather reports and forecasts
R = Runway lengths of intended use
K = Known traffic delays as advised by ATC`,
  },
  {
    id: 'sa-7',
    number: 7,
    category: 'Instruments',
    question: 'What are the limitations of an attitude indicator?',
    answer: `The AI will tumble at 60° to 70° of pitch, and 100° to 110° of bank.`,
  },
  {
    id: 'sa-8',
    number: 8,
    category: 'Instruments',
    question: 'What instruments are affected when the pitot tube ram air inlet AND drain hole freeze?',
    answer: `The airspeed indicator (ASI) — it will act like an altimeter.`,
  },
  {
    id: 'sa-9',
    number: 9,
    category: 'Instruments',
    question: 'Define the following altitudes: indicated, true, absolute, pressure, density.',
    answer: `Indicated altitude: value read from the altimeter
True altitude: actual height above mean sea level (MSL)
Absolute altitude: height above ground level (AGL)
Pressure altitude: height above the altitude where the pressure is 29.92" (standard pressure)
Density altitude: a measure of airplane performance — pressure altitude corrected for non-standard temperature`,
  },
  {
    id: 'sa-10',
    number: 10,
    category: 'Instruments',
    question: 'The three fundamental skills in instrument flying are (CIA):',
    answer: `Instrument Cross-check (scan)
Instrument Interpretation
Airplane control`,
  },
  {
    id: 'sa-11',
    number: 11,
    category: 'Instruments',
    question: 'Name three gyroscopic flight instruments.',
    answer: `Attitude indicator, Turn indicator, Heading indicator`,
  },
  {
    id: 'sa-12',
    number: 12,
    category: 'Approaches',
    question: 'Define a precision approach.',
    answer: `Provides vertical and horizontal guidance.
Examples: ILS, PAR`,
  },
  {
    id: 'sa-13',
    number: 13,
    category: 'Approaches',
    question: 'What is a no-gyro approach & what rate of turn is recommended?',
    answer: `Used when the heading indicator has failed and partial panel instrument flying is required.
Standard rate turns (until on final).`,
  },
  {
    id: 'sa-14',
    number: 14,
    category: 'Approaches',
    question: 'How can a pilot determine the approach category minimums applicable to a particular aircraft?',
    answer: `Based on approach speed = 1.3 × Vso:
A — up to 90 kts
B — 91 to 120 kts
C — 121 to 140 kts
D — 141 to 165 kts
E — above 165 kts`,
  },
  {
    id: 'sa-15',
    number: 15,
    category: 'Approaches',
    question: 'Where is the MAP on a precision approach?',
    answer: `For the ILS, the MAP is at the decision altitude / decision height (DA/DH).`,
  },
  {
    id: 'sa-16',
    number: 16,
    category: 'Approaches',
    figure: 'msa-circle',
    figurePlacement: 'answer',
    question: '(See the approach chart) What are the MSAs for this approach?',
    answer: `MSAs (Minimum Safe Altitudes) are shown in the MSA circle on the approach chart plan view. They provide at least 1,000 ft of obstacle clearance within 25 NM of the facility, for emergency use (navigation signal coverage is not guaranteed).

Your handout refers to a specific chart — read the sector altitudes from the MSA circle on that plate.`,
  },
  {
    id: 'sa-17',
    number: 17,
    category: 'Approaches',
    question: "What is a 5-A?",
    answer: `ATIS / Altimeter / Approach set-up / Approach brief / Aircraft set-up`,
  },
  {
    id: 'sa-18',
    number: 18,
    category: 'Approaches',
    question: 'Describe the 12 steps.',
    answer: `1. LOC Alive — Hdg for 15° intercept
2. LOC one dot — Hdg for 5° intercept
3. LOC center — FAC or WCH
4. G/S Alive — Ldg gear down, check 3 greens
5. G/S one dot — Flaps 10 degrees
6. G/S Center — Pwr 15~16" MP, Attitude (−2), VSI (−500), set trim, IAS (100 +5/0)
7. At FAF — Check altitude, 5T, GUMPS check, prepare missed approach
8. At 1,000 ft AFE — Check no flag, check 3 greens, (turn on airport light)
9. At 300 ft DH/MDA — Establish on approach, mixture/prop full forward, check 3 greens
10. At 100 ft DH/MDA — Call out "Approaching Minimum"
11. DH/MDA — Call out "Minimum", determine if you should proceed with approach or not (descend only with RWY environment in sight)
12. Missed approach`,
  },
  {
    id: 'sa-19',
    number: 19,
    category: 'Weather',
    diagrams: ['station-model-simple', 'station-model'],
    question: 'Fill in the blanks: label each part of the station models.',
    answer: `Simple model: Wind (kts) · Temperature (°F) · Weather · Dew point (°F) · Sky cover · Sea-level pressure (mb) · Pressure trend (mb)

Full model: Wind speed · Wind direction · Temperature · Present weather · Dew point · Low cloud type · Middle cloud type · Sky cover · Sea level pressure · Pressure change in past 3 hours · Pressure change/tendency · 6-hour precipitation`,
  },
  {
    id: 'sa-20',
    number: 20,
    category: 'Weather',
    question: 'What type of weather phenomena is associated with a Convective SIGMET?',
    answer: `Issued for severe convective activity, which implies severe turbulence and icing with thunderstorms and low-level wind shear.
Released regularly at H+55 and is valid for two hours.`,
  },
  {
    id: 'sa-21',
    number: 21,
    category: 'Icing',
    question: 'What are the categories of icing?',
    answer: `Induction icing (impact, fuel, throttle icing)
Structural icing (clear, rime, mixed icing)
Instrument icing (pitot heat, antenna)`,
  },
  {
    id: 'sa-22',
    number: 22,
    category: 'Weather',
    question: 'Decode: SFO UUA/OV SFO 020030/TM 2100/FL100/TP C130/IC MDT-SVR/RM HAIL',
    answer: `San Francisco airport urgent PIREP
30 NM on the 020 degree radial from San Francisco VOR
Time 2100
Flight level 10,000 ft
Aircraft Cessna 130
Icing moderate–severe
Remark: hail`,
  },
  {
    id: 'sa-23',
    number: 23,
    category: 'Weather',
    question: 'What is wind shear?',
    answer: `Any change in wind velocity (speed and direction).`,
  },
  {
    id: 'sa-24',
    number: 24,
    category: 'Icing',
    question: 'How does frost affect the lifting surfaces of an airplane on take-off?',
    answer: `Increases stall speed 5–10%
Lift reduction of 30%
Drag increase of 40%`,
  },
  {
    id: 'sa-25',
    number: 25,
    category: 'Weather',
    question: 'What type of weather is associated with wind shear?',
    answer: `Frontal system
Thunderstorm
Temperature inversion
Clear Air Turbulence`,
  },
  {
    id: 'sa-26',
    number: 26,
    category: 'Departures',
    question: 'Does use of a SID require that you have both the textual and graphic form of the SID?',
    answer: `In order to legally fly a SID, a pilot must possess at least the current version of the SID's textual description.`,
  },
  {
    id: 'sa-27',
    number: 27,
    category: 'Icing',
    question: 'What conditions are necessary for structural icing to occur?',
    answer: `Flight through visible moisture.
The temperature at freezing or below.`,
  },
  {
    id: 'sa-28',
    number: 28,
    category: 'Departures',
    question: 'Obstacle clearance during departure is based on the aircraft climbing at what minimum climb gradient?',
    answer: `200 ft/NM`,
  },
  {
    id: 'sa-29',
    number: 29,
    category: 'Departures',
    question: 'Departure procedures are used for… (6 types)',
    answer: `1. Ensure obstacle clearance
2. Simplify clearance delivery procedures
3. Reduce frequency congestion
4. Control traffic around an airport
5. Help reduce fuel consumption
6. May include noise abatement procedures`,
  },
  {
    id: 'sa-30',
    number: 30,
    category: 'Departures',
    question: 'Types of departure procedures (3 types)',
    answer: `1. ODP (Obstacle Departure Procedure)
2. Radar vector SID
3. Pilot Nav SID`,
  },
  {
    id: 'sa-31',
    number: 31,
    category: 'En Route',
    question: 'Define the following: MEA, MOCA, MRA, MAA, MCA.',
    answer: `MEA (Minimum En-route Altitude): guarantees navigational signal & obstacle clearance

MOCA (Minimum Obstruction Clearance Altitude): guarantees obstacle clearance, but only guarantees navigation signal within 22 NM of the navaid

MRA (Minimum Reception Altitude): the lowest altitude on an airway where an aircraft can be assured of receiving signals from navigation aids

MAA (Maximum Authorized Altitude): the highest altitude you can be at

MCA (Minimum Crossing Altitude): the lowest altitude at which a navigational fix can be crossed when entering an airway`,
  },
  {
    id: 'sa-32',
    number: 32,
    category: 'En Route',
    question: 'Two-way radio communication failure in VFR and IFR conditions — what is the procedure for altitude and route?',
    answer: `In VMC → land as soon as practical (maintain VFR).

In IMC:
<1> Route (AVEF)
1. Assigned — last assigned route by ATC
2. Vectored — fix, route or airway which radar vectored
3. Expected — expect in a further clearance by ATC
4. Filed — route filed in the flight plan

<2> Altitude (highest of MEA)
1. Minimum — the minimum altitude (MEA) for IFR
2. Expected — expect in a further clearance by ATC
3. Assigned — altitude or FL assigned by ATC`,
  },
  {
    id: 'sa-33',
    number: 33,
    category: 'Holding',
    question: 'What are the maximum airspeeds permitted for aircraft while holding?',
    answer: `1. MHA ~ 6,000 MSL: 200 KIAS
2. 6,001 ~ 14,000 MSL: 230 KIAS
3. 14,001 MSL ~ : 265 KIAS`,
  },
  {
    id: 'sa-34',
    number: 34,
    category: 'Holding',
    figure: 'holding-entries',
    figurePlacement: 'answer',
    question: 'Determine the holding entry: "Hold on the 090 radial of ECA VOR at 3,000 ft", aircraft heading is 050° to the VOR.',
    answer: `Teardrop entry.`,
  },
  {
    id: 'sa-35',
    number: 35,
    category: 'Holding',
    figure: 'holding-entries',
    figurePlacement: 'answer',
    question: 'Determine the holding entry: "Hold northwest of SAC VOR on the 300 radial, left turns, maintain 3,000 ft", aircraft heading is 220° to the VOR.',
    answer: `Parallel entry.`,
  },
  {
    id: 'sa-36',
    number: 36,
    category: 'Arrivals',
    question: 'What is a STAR?',
    answer: `Standard Terminal Arrival Route.
Preferred method of transitioning from the en-route structure to the approach.`,
  },
  {
    id: 'sa-37',
    number: 37,
    category: 'Arrivals',
    question: 'Calculate time & distance for descent: cruise altitude 12,000 ft / approach gate 3,000 ft / descent rate 500 fpm / GS 100 kn.',
    answer: `12,000 − 3,000 = 9,000 ft to lose.
9,000 ÷ 500 fpm = 18 minutes.
100 kt ÷ 60 × 18 min = 30 NM.

→ Start descent 30 miles out; time 18 min.`,
  },
];
