const PREFIX = 'study_deck_';

export interface DeckRecord {
  missedIds: string[];
  lastScore: { correct: number; total: number } | null;
  updatedAt: string;
}

export const saveDeckRecord = (deckId: string, record: DeckRecord) => {
  try {
    localStorage.setItem(`${PREFIX}${deckId}`, JSON.stringify(record));
  } catch { /* silent */ }
};

export const loadDeckRecord = (deckId: string): DeckRecord | null => {
  try {
    const raw = localStorage.getItem(`${PREFIX}${deckId}`);
    return raw ? (JSON.parse(raw) as DeckRecord) : null;
  } catch {
    return null;
  }
};

export const clearDeckRecord = (deckId: string) => {
  localStorage.removeItem(`${PREFIX}${deckId}`);
};

const FLAG_PREFIX = 'study_flags_';

export const loadFlagged = (deckId: string): string[] => {
  try {
    const raw = localStorage.getItem(`${FLAG_PREFIX}${deckId}`);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

export const saveFlagged = (deckId: string, ids: string[]) => {
  try {
    localStorage.setItem(`${FLAG_PREFIX}${deckId}`, JSON.stringify(ids));
  } catch { /* silent */ }
};
