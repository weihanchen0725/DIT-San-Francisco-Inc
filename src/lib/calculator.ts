const CM_TO_INCH = 0.393701;
const KG_TO_LB = 2.20462;
const CBM_TO_CFT = 35.3147;

const convert = (value: string, factor: number, decimals: number): string => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? '' : (parsed * factor).toFixed(decimals);
};

export const cmToInch = (cm: string): string => convert(cm, CM_TO_INCH, 4);
export const inchToCm = (inch: string): string => convert(inch, 1 / CM_TO_INCH, 4);
export const kgToLb = (kg: string): string => convert(kg, KG_TO_LB, 5);
export const lbToKg = (lb: string): string => convert(lb, 1 / KG_TO_LB, 5);

export const calculateVolume = ({
  pieces,
  lengthCm,
  widthCm,
  heightCm,
}: {
  pieces: string;
  lengthCm: string;
  widthCm: string;
  heightCm: string;
}): { cbm: number; cft: number } => {
  const p = parseFloat(pieces) || 0;
  const l = parseFloat(lengthCm) || 0;
  const w = parseFloat(widthCm) || 0;
  const h = parseFloat(heightCm) || 0;
  const cbm = (l * w * h * p) / 1_000_000;
  return { cbm, cft: cbm * CBM_TO_CFT };
};
