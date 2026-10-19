/** Deterministic 4x4 inner bit pattern for an ArUco-style fiducial, seeded by a string. */
export function arucoBits(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Array.from({ length: 16 }, (_, i) => ((h >>> i) & 1) === 1 || i === 0);
}
