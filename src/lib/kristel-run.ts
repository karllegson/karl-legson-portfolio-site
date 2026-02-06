import { supabase } from './supabase';

// Local storage keys scoped to Kristel flow
const DEVICE_ID_KEY = 'kristel_device_id';
const RUN_COMPLETED_KEY = 'kristel_run_completed';

function getOrCreateDeviceId(): string {
  const existing = localStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  localStorage.setItem(DEVICE_ID_KEY, id);
  return id;
}

export function markKristelCompleted() {
  localStorage.setItem(RUN_COMPLETED_KEY, 'true');
}

export function hasKristelCompleted(): boolean {
  return localStorage.getItem(RUN_COMPLETED_KEY) === 'true';
}

interface KristelRunPayload {
  score: number;
  total: number;
  answers: number[]; // selected option indices per question
  foodChoice?: string; // What she picked for the food question
}

export async function saveKristelRun(payload: KristelRunPayload) {
  if (!supabase) return; // Supabase not configured; skip silently

  const deviceId = getOrCreateDeviceId();

  const { error } = await supabase.from('kristel_runs').insert({
    device_id: deviceId,
    score: payload.score,
    total: payload.total,
    answers: payload.answers,
    food_choice: payload.foodChoice || null,
  });

  if (error) {
    console.error('Failed to save Kristel run:', error);
  }
}
