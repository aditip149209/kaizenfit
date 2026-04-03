export type ServingUnit = 'grams' | 'katori' | 'bowl' | 'glass' | 'spoon' | 'piece' | 'pieces';

export const UNIT_TO_GRAMS: Record<ServingUnit, number> = {
  grams: 1,
  katori: 150,
  bowl: 240,
  glass: 250,
  spoon: 15,
  piece: 50,
  pieces: 50,
};

export const normalizeServingUnit = (unit?: string): ServingUnit => {
  const normalized = String(unit ?? 'grams').toLowerCase() as ServingUnit;
  return UNIT_TO_GRAMS[normalized] ? normalized : 'grams';
};

export const convertToGrams = (amount: number, unit?: string) => {
  const normalizedUnit = normalizeServingUnit(unit);
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
  return safeAmount * UNIT_TO_GRAMS[normalizedUnit];
};

export const deriveMealQuantity = ({
  enteredAmount,
  enteredUnit,
  baseAmount,
  baseUnit,
}: {
  enteredAmount: number;
  enteredUnit?: string;
  baseAmount?: number | null;
  baseUnit?: string | null;
}) => {
  const safeEntered = Number.isFinite(enteredAmount) && enteredAmount > 0 ? enteredAmount : 1;
  const safeBase = Number.isFinite(Number(baseAmount)) && Number(baseAmount) > 0 ? Number(baseAmount) : null;

  if (!safeBase) {
    return safeEntered;
  }

  const enteredGrams = convertToGrams(safeEntered, enteredUnit);
  const baseGrams = convertToGrams(safeBase, baseUnit ?? undefined);

  if (enteredGrams <= 0 || baseGrams <= 0) {
    return safeEntered;
  }

  return Math.max(0.01, Number((enteredGrams / baseGrams).toFixed(4)));
};
