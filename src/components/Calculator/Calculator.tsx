'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import calculatorClass from './Calculator.module.scss';

const CM_TO_INCH = 0.393701;
const KG_TO_LB = 2.20462;

const cmToInch = (cm: string): string => {
  const val = parseFloat(cm);
  return isNaN(val) ? '' : (val * CM_TO_INCH).toFixed(4);
};

const inchToCm = (inch: string): string => {
  const val = parseFloat(inch);
  return isNaN(val) ? '' : (val / CM_TO_INCH).toFixed(4);
};

const kgToLb = (kg: string): string => {
  const val = parseFloat(kg);
  return isNaN(val) ? '' : (val * KG_TO_LB).toFixed(5);
};

const lbToKg = (lb: string): string => {
  const val = parseFloat(lb);
  return isNaN(val) ? '' : (val / KG_TO_LB).toFixed(5);
};

const blockInvalidChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
};

const Calculator = () => {
  const t = useTranslations('Calculator');
  const [pieces, setPieces] = useState('1');
  const [lengthCm, setLengthCm] = useState('1');
  const [lengthInch, setLengthInch] = useState(cmToInch('1'));
  const [widthCm, setWidthCm] = useState('1');
  const [widthInch, setWidthInch] = useState(cmToInch('1'));
  const [heightCm, setHeightCm] = useState('1');
  const [heightInch, setHeightInch] = useState(cmToInch('1'));
  const [weightKg, setWeightKg] = useState('1');
  const [weightLb, setWeightLb] = useState(kgToLb('1'));
  const [results, setResults] = useState<{ cft: number; cbm: number } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(pieces) || 0;
    const l = parseFloat(lengthCm) || 0;
    const w = parseFloat(widthCm) || 0;
    const h = parseFloat(heightCm) || 0;
    const cbm = (l * w * h * p) / 1_000_000;
    const cft = cbm * 35.3147;
    setResults({ cbm, cft });
  };

  const handleReset = () => {
    setPieces('1');
    setLengthCm('1'); setLengthInch(cmToInch('1'));
    setWidthCm('1');  setWidthInch(cmToInch('1'));
    setHeightCm('1'); setHeightInch(cmToInch('1'));
    setWeightKg('1'); setWeightLb(kgToLb('1'));
    setResults(null);
  };

  return (
    <div className={calculatorClass['page-view']}>
      <form onSubmit={handleCalculate}>
        <div className={calculatorClass['item-box']}>
          <div className={calculatorClass['left-subject']}>{t('input_dimension')}</div>
          <div className={calculatorClass['right-main']}>

            {/* Pieces */}
            <div className={calculatorClass['full']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>{t('pieces')}
                </div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="piece"
                    type="number"
                    min="0"
                    step="any"
                    value={pieces}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => setPieces(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Length */}
            <div className={calculatorClass['col-left']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>{t('length_cm')}
                </div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Length-cm"
                    type="number"
                    min="0"
                    step="any"
                    value={lengthCm}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setLengthCm(e.target.value); setLengthInch(cmToInch(e.target.value)); }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['col-right']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>{t('length_inch')}</div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Length-inch"
                    type="number"
                    min="0"
                    step="any"
                    value={lengthInch}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setLengthInch(e.target.value); setLengthCm(inchToCm(e.target.value)); }}
                  />
                </div>
              </div>
            </div>

            {/* Width */}
            <div className={calculatorClass['col-left']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>{t('width_cm')}
                </div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Width-cm"
                    type="number"
                    min="0"
                    step="any"
                    value={widthCm}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setWidthCm(e.target.value); setWidthInch(cmToInch(e.target.value)); }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['col-right']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>{t('width_inch')}</div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Width-inch"
                    type="number"
                    min="0"
                    step="any"
                    value={widthInch}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setWidthInch(e.target.value); setWidthCm(inchToCm(e.target.value)); }}
                  />
                </div>
              </div>
            </div>

            {/* Height */}
            <div className={calculatorClass['col-left']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>{t('height_cm')}
                </div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Height-cm"
                    type="number"
                    min="0"
                    step="any"
                    value={heightCm}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setHeightCm(e.target.value); setHeightInch(cmToInch(e.target.value)); }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['col-right']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>{t('height_inch')}</div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Height-inch"
                    type="number"
                    min="0"
                    step="any"
                    value={heightInch}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setHeightInch(e.target.value); setHeightCm(inchToCm(e.target.value)); }}
                  />
                </div>
              </div>
            </div>

            {/* Gross Weight */}
            <div className={calculatorClass['col-left']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>{t('gross_weight_kg')}
                </div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Gross Weight-kg"
                    type="number"
                    min="0"
                    step="any"
                    value={weightKg}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setWeightKg(e.target.value); setWeightLb(kgToLb(e.target.value)); }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['col-right']}>
              <div className={calculatorClass['group-box']}>
                <div className={calculatorClass['label']}>{t('gross_weight_lb')}</div>
                <div className={calculatorClass['input-wrap']}>
                  <input
                    aria-label="Gross Weight-lb"
                    type="number"
                    min="0"
                    step="any"
                    value={weightLb}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => { setWeightLb(e.target.value); setWeightKg(lbToKg(e.target.value)); }}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className={calculatorClass['submit-box']}>
              <button type="button" name="reset" onClick={handleReset} className={calculatorClass['btn']}>
                {t('reset')}
              </button>
              <button
                type="submit"
                name="calculate"
                className={`${calculatorClass['btn']} ${calculatorClass['btn-primary']}`}
              >
                {t('calculate')}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Results */}
      <div className={calculatorClass['result-wrap']}>
        <div className={calculatorClass['result-subject']}>{t('results_title')}</div>
        <div className={calculatorClass['result-grid']}>
          <div className={calculatorClass['result-box']}>
            <div className={calculatorClass['result-title']}>{t('cft_label')}</div>
            <div className={calculatorClass['result-value']}>
              {results !== null ? results.cft.toFixed(5) : '—'}
            </div>
          </div>
          <div className={calculatorClass['result-box']}>
            <div className={calculatorClass['result-title']}>{t('cbm_label')}</div>
            <div className={calculatorClass['result-value']}>
              {results !== null ? results.cbm.toFixed(5) : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;