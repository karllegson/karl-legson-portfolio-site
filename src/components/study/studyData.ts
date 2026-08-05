import { groundSchoolMcQuestions, groundSchoolSaQuestions } from './groundSchoolData';

export type FigureId =
  | 'altimeters-12000'
  | 'panel-climbing-right'
  | 'panel-level-right'
  | 'runway-fixed-distance'
  | 'radar-summary'
  | 'winds-aloft-fd'
  | 'holding-350'
  | 'holding-140'
  | 'holding-entries'
  | 'vor-service-volume'
  | 'msa-circle'
  | 'class-g-day';

export type DiagramId = 'station-model' | 'station-model-simple';

export interface StudyQuestion {
  id: string;
  number: number;
  question: string;
  answer: string;
  category?: string;
  /** Interactive fill-in-the-blank station model diagrams */
  diagrams?: DiagramId[];
  /** Static recreated test figure */
  figure?: FigureId;
  /** Where the figure belongs: with the question (default) or with the answer */
  figurePlacement?: 'question' | 'answer';
  /** Multiple-choice options (includes the correct one) */
  options?: string[];
  correctIndex?: number;
  /** Extra explanation shown after answering */
  note?: string;
}

export interface StudyDeck {
  id: 'ifr-phase-3' | 'ground-school-mc' | 'ground-school-sa';
  title: string;
  subtitle: string;
  description: string;
  accent: 'sky' | 'amber' | 'emerald';
  kind: 'written' | 'mc';
  questions: StudyQuestion[];
}

const ifrPhase3Questions: StudyQuestion[] = [
  {
    id: 'p3-1',
    number: 1,
    category: 'Approaches',
    question: 'Define a precision approach.',
    answer: `Provides vertical AND horizontal guidance.
Examples: ILS, PAR`,
  },
  {
    id: 'p3-2',
    number: 2,
    category: 'Approaches',
    question: 'What are the basic components of a standard ILS?',
    answer: `Localizer: provides horizontal (left/right) guidance
Glide slope: provides vertical (up/down) guidance
Marker beacons: provide range information
Approach lights: assist to transition to visual flight

Sub components → compass locator & DME

Guidance information → localizer, glide slope
Range information → marker beacons, DME
Visual information → approach lights, touchdown and centerline lights, runway lights`,
  },
  {
    id: 'p3-3',
    number: 3,
    category: 'Approaches',
    question: 'What is a "no-gyro" approach and what rate of turn is recommended during a "no-gyro" approach procedure?',
    answer: `A pilot should use a no-gyro approach when the heading indicator has failed and partial panel instrument flying is required.

On a no-gyro approach, all turns should be standard rate until on final.`,
  },
  {
    id: 'p3-4',
    number: 4,
    category: 'Approaches',
    question: 'When flying an instrument approach procedure, when can the pilot descend below the MDA or DH? (Explain all requirements & RWY environment)',
    answer: `<1> Runway environment in sight (12 items):
1. Approach light system (ALS)
2. Threshold
3. Threshold markings
4. Threshold lights
5. Runway end identifier lights (REIL)
6. Visual approach slope indicator (VASI)
7. Touchdown zone
8. Touchdown zone markings
9. Touchdown zone lights
10. Runway
11. Runway markings
12. Runway lights

<2> A/C position (normal maneuvers):
The aircraft is continuously in a position from which a descent to a landing on the intended runway can be made at a normal rate of descent using normal maneuvers.

<3> Legal & illegal (visibility):
The flight visibility is not less than the visibility prescribed in the standard instrument approach procedure being used.`,
  },
  {
    id: 'p3-5',
    number: 5,
    category: 'Approaches',
    question: 'What is a non-precision approach?',
    answer: `Provides horizontal guidance and step-down information.
Examples: LOC, VOR`,
  },
  {
    id: 'p3-6',
    number: 6,
    category: 'Approaches',
    question: 'Define the VDP.',
    answer: `Visual Descent Point.

VDP: the point from which you can make a normal descent to a landing, assuming you have the runway in sight from the MDA.`,
  },
  {
    id: 'p3-7',
    number: 7,
    category: 'Approaches',
    question: 'Why do certain airports have only circling minimums published? (Explain all cases)',
    answer: `When either the normal rate of descent or the runway alignment factor of 30 degrees is exceeded, a straight-in minimum is not published and a circling minimum applies.`,
  },
  {
    id: 'p3-8',
    number: 8,
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
    id: 'p3-9',
    number: 9,
    category: 'Approaches',
    question: 'When must a pilot execute a missed approach? (List all cases)',
    answer: `a. Arrival at the missed approach point and the runway environment is not yet in sight
b. Arrival at DA on the glide slope with the runway not yet in sight
c. Anytime a pilot determines a safe landing is not possible
d. When circling to land, visual contact is lost
e. When instructed by ATC`,
  },
  {
    id: 'p3-10',
    number: 10,
    category: 'Approaches',
    question: 'Where is the MAP on a precision approach?',
    answer: `For the ILS, the MAP is at the decision altitude / decision height (DA/DH).`,
  },
  {
    id: 'p3-11',
    number: 11,
    category: 'Approaches',
    question: 'If a particular approach name has a letter "A" attached as a suffix (such as VOR DME A), what does this indicate?',
    answer: `The type of approach followed by a letter identifies approaches that do NOT have straight-in landing minimums and only have circling minimums.

The first approach of this type created at the airport is labeled with the letter A, and the lettering continues in alphabetical order (e.g. "VOR-A, LDA-B").`,
  },
  {
    id: 'p3-12',
    number: 12,
    category: 'Approaches',
    question: "What is a 5 'A'?",
    answer: `ATIS / Altimeter / Approach set-up / Approach brief / Aircraft set-up`,
  },
  {
    id: 'p3-13',
    number: 13,
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
    id: 'p3-14',
    number: 14,
    category: 'Weather',
    question: 'The FSS has several types of weather briefings available: standard, outlook, abbreviated. What type of information is included in each of these briefings? When would you request the various briefings?',
    answer: `Standard briefing — request when planning a trip and you have not obtained preliminary weather or a previous briefing. Includes:
1. Adverse conditions
2. VFR flight NOT RECOMMENDED
3. Synopsis
4. Current conditions
5. En route forecast
6. Destination forecast
7. Winds and temperatures aloft
8. NOTAMs
9. ATC delays
10. Other information

Abbreviated briefing — a shortened version of the standard briefing. Request when a departure has been delayed or when specific weather information is needed to update the previous briefing.

Outlook briefing — provided when the proposed departure is 6 hours or more from the time of the briefing. Limited to applicable forecast data needed for the proposed flight. Good source of flight planning information (route, altitude, go/no-go decision). A follow-up briefing is advised.`,
  },
  {
    id: 'p3-15',
    number: 15,
    category: 'Weather',
    question: 'What areas are divided for AIRMET and SIGMET? (6 areas)',
    answer: `SFO (San Francisco)
SLC (Salt Lake City)
CHI (Chicago)
DFW (Dallas/Ft. Worth)
BOS (Boston)
MIA (Miami)`,
  },
  {
    id: 'p3-16',
    number: 16,
    category: 'Weather',
    question: 'What information is included in a PIREP?',
    answer: `Ceilings at or below 5,000 ft; visibility at or below 5 miles; thunderstorms; light icing; moderate turbulence; wind shear; volcanic ash clouds.`,
  },
  {
    id: 'p3-17',
    number: 17,
    category: 'Weather',
    question: 'What weather conditions are considered LIFR, IFR, and MVFR on the weather depiction chart? How are they depicted?',
    answer: `LIFR (Low IFR): ceiling less than 500 feet and/or visibility less than 1 mile
IFR: ceiling 500 to less than 1,000 feet and/or visibility 1 to less than 3 miles
MVFR (Marginal VFR): ceiling 1,000 to 3,000 feet and/or visibility 3 to 5 miles inclusive`,
  },
  {
    id: 'p3-18',
    number: 18,
    category: 'Weather',
    diagrams: ['station-model'],
    question: 'Fill in the blanks: label each part of the station model.',
    answer: `1. Wind speed
2. Wind direction
3. Temperature
4. Present weather
5. Dew point
6. Low cloud type
7. Middle cloud type
8. Sky cover
9. Sea level pressure
10. Pressure change in past 3 hours
11. Pressure change / tendency
12. 6-hour precipitation`,
  },
  {
    id: 'p3-19',
    number: 19,
    category: 'Weather',
    question: 'What is the purpose of the Radar Summary Chart?',
    answer: `Shows areas of precipitation and information about type, intensity, configuration, coverage, echo top, and cell movement of precipitation.`,
  },
  {
    id: 'p3-20',
    number: 20,
    category: 'Weather',
    question: 'Explain the information that is on each of the 4 panels of the significant prog chart.',
    answer: `The two upper panels forecast significant weather from the surface up to 24,000 ft.
The two lower panels forecast surface conditions; one for 12 hr and the other for 24 hr.

The top panels show ceilings (IFR, MVFR), moderate or greater turbulence, freezing levels.
The bottom panels show location of highs, lows, fronts, and other areas of significant weather.`,
  },
  {
    id: 'p3-21',
    number: 21,
    category: 'Weather',
    question: 'When are SIGMET and AIRMET issued? (Explain detail information)',
    answer: `AIRMET — (S) IFR, (T) Turbulence, (Z) Icing. Released every 6 hrs and valid for 6 hrs.

SIGMET — severe icing, turbulence not associated with thunderstorms, dust storms / sandstorms lowering visibility to less than three miles, volcanic ash. Issued at any time, maximum forecast period of 4 hours (6 hours for hurricanes).`,
  },
  {
    id: 'p3-22',
    number: 22,
    category: 'Weather',
    question: 'What type of weather phenomena is associated with a Convective SIGMET?',
    answer: `Issued for severe convective activity, which implies severe turbulence and icing with thunderstorms and low-level wind shear.

Released regularly at H+55 and is valid for two hours.`,
  },
  {
    id: 'p3-23',
    number: 23,
    category: 'Weather',
    question: 'What is wind shear?',
    answer: `Any change in wind velocity (speed and direction).`,
  },
  {
    id: 'p3-24',
    number: 24,
    category: 'Weather',
    question: 'What type of weather is associated with wind shear?',
    answer: `Frontal system / Thunderstorm / Turbulence (temperature inversion) / Clear Air Turbulence`,
  },
  {
    id: 'p3-25',
    number: 25,
    category: 'Icing',
    question: 'What are the categories of icing?',
    answer: `Induction icing (impact, fuel, throttle icing)
Structural icing (clear, rime, mixed icing)
Instrument icing (pitot heat, antenna)`,
  },
  {
    id: 'p3-26',
    number: 26,
    category: 'Icing',
    question: 'How does frost affect the lifting surfaces of an airplane on take-off?',
    answer: `Increases stall speed 5–10%
Lift decrease of 30%
Drag increase of 40%`,
  },
  {
    id: 'p3-27',
    number: 27,
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
    id: 'p3-28',
    number: 28,
    category: 'Icing',
    question: 'What conditions are necessary for structural icing to occur?',
    answer: `Flight through visible moisture.
The temperature at freezing or below.`,
  },
  {
    id: 'p3-29',
    number: 29,
    category: 'Approaches',
    question: 'When do we have reverse sensing during a LOC approach?',
    answer: `Reverse sensing will occur on the back course when using standard VOR equipment.`,
  },
  {
    id: 'p3-30',
    number: 30,
    category: 'Approaches',
    question: 'What stands for "SOIA"?',
    answer: `SOIA (Simultaneous Offset Instrument Approaches) allow airports with parallel runways that are 750 to 3,000 feet apart to conduct (almost) simultaneous approaches to the two runways.`,
  },
  {
    id: 'p3-31',
    number: 31,
    category: 'Approaches',
    question: 'Explain all cases of side step.',
    answer: `When a pilot executes an approach procedure to two or more parallel runways that are separated by 1,200 ft or less. The pilot diverts to the other parallel runway using a straight-in approach.

An aircraft is cleared for an approach to one runway, but cleared to land on a parallel runway.`,
  },
  {
    id: 'p3-32',
    number: 32,
    category: 'GPS',
    question: 'What are the 3 segments of the GPS system?',
    answer: `Space segment, Control segment, User segment`,
  },
  {
    id: 'p3-33',
    number: 33,
    category: 'Icing',
    question: 'What are the 3 types of induction icing?',
    answer: `Impact icing, Fuel icing, Throttle icing`,
  },
  {
    id: 'p3-34',
    number: 34,
    category: 'Approaches',
    question: 'What stands for "PRM approach"?',
    answer: `Precision Runway Monitoring is a RADAR system that has a high update rate and is able to monitor approaches to closely spaced parallel runways.`,
  },
  {
    id: 'p3-35',
    number: 35,
    category: 'Icing',
    question: 'What are the 3 types of structural icing and the temperature of each type?',
    answer: `Clear icing (0 ~ −5°)
Mixed icing (−5° ~ −15°)
Rime icing (−15° ~ colder)`,
  },
  {
    id: 'p3-36',
    number: 36,
    category: 'Icing',
    question: 'How can we recognize the tail stall?',
    answer: `1. Elevator control vibrations
2. Abnormal nose-down trim change
3. Any other unusual or abnormal pitch anomalies
4. Reduction or loss of elevator effectiveness
5. Sudden change in elevator force
6. Sudden uncommanded nose-down pitch`,
  },
];

export const studyDecks: StudyDeck[] = [
  {
    id: 'ifr-phase-3',
    title: 'IFR Phase 3',
    subtitle: 'Instrument Rating — Written/Oral Prep',
    description: 'All 36 questions from your Phase 3 review. Practice writing the answers like the real test, then self-grade.',
    accent: 'sky',
    kind: 'written',
    questions: ifrPhase3Questions,
  },
  {
    id: 'ground-school-mc',
    title: 'Ground School Final — MC',
    subtitle: 'Multiple Choice (Final MC 50)',
    description: 'Your correct answers with generated wrong choices to train against, plus recreated test figures.',
    accent: 'emerald',
    kind: 'mc',
    questions: groundSchoolMcQuestions,
  },
  {
    id: 'ground-school-sa',
    title: 'Ground School Final — SA',
    subtitle: 'Short Answer (*SA)',
    description: 'Write out the answers like the real test, with figures for VOR volumes, holding entries, and station models.',
    accent: 'amber',
    kind: 'written',
    questions: groundSchoolSaQuestions,
  },
];

export const getDeckById = (id: StudyDeck['id']) =>
  studyDecks.find((d) => d.id === id);
