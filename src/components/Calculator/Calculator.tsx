'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateVolume, cmToInch, inchToCm, kgToLb, lbToKg } from '@/lib/calculator';
import calculatorClass from './Calculator.module.scss';

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
    setResults(calculateVolume({ pieces, lengthCm, widthCm, heightCm }));
  };

  const handleReset = () => {
    setPieces('1');
    setLengthCm('1');
    setLengthInch(cmToInch('1'));
    setWidthCm('1');
    setWidthInch(cmToInch('1'));
    setHeightCm('1');
    setHeightInch(cmToInch('1'));
    setWeightKg('1');
    setWeightLb(kgToLb('1'));
    setResults(null);
  };

  return (
    <div className={calculatorClass['pageView']}>
      <form onSubmit={handleCalculate}>
        <div className={calculatorClass['itemBox']}>
          <h1 className={calculatorClass['leftSubject']}>{t('input_dimension')}</h1>
          <div className={calculatorClass['rightMain']}>
            {/* Pieces */}
            <div className={calculatorClass['full']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>
                  {t('pieces')}
                </div>
                <div className={calculatorClass['inputWrap']}>
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
            <div className={calculatorClass['colLeft']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>
                  {t('length_cm')}
                </div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Length-cm"
                    type="number"
                    min="0"
                    step="any"
                    value={lengthCm}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setLengthCm(e.target.value);
                      setLengthInch(cmToInch(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['colRight']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>{t('length_inch')}</div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Length-inch"
                    type="number"
                    min="0"
                    step="any"
                    value={lengthInch}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setLengthInch(e.target.value);
                      setLengthCm(inchToCm(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Width */}
            <div className={calculatorClass['colLeft']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>
                  {t('width_cm')}
                </div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Width-cm"
                    type="number"
                    min="0"
                    step="any"
                    value={widthCm}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setWidthCm(e.target.value);
                      setWidthInch(cmToInch(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['colRight']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>{t('width_inch')}</div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Width-inch"
                    type="number"
                    min="0"
                    step="any"
                    value={widthInch}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setWidthInch(e.target.value);
                      setWidthCm(inchToCm(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Height */}
            <div className={calculatorClass['colLeft']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>
                  {t('height_cm')}
                </div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Height-cm"
                    type="number"
                    min="0"
                    step="any"
                    value={heightCm}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setHeightCm(e.target.value);
                      setHeightInch(cmToInch(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['colRight']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>{t('height_inch')}</div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Height-inch"
                    type="number"
                    min="0"
                    step="any"
                    value={heightInch}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setHeightInch(e.target.value);
                      setHeightCm(inchToCm(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Gross Weight */}
            <div className={calculatorClass['colLeft']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>
                  <span className={calculatorClass['required']}>*</span>
                  {t('gross_weight_kg')}
                </div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Gross Weight-kg"
                    type="number"
                    min="0"
                    step="any"
                    value={weightKg}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setWeightKg(e.target.value);
                      setWeightLb(kgToLb(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={calculatorClass['colRight']}>
              <div className={calculatorClass['groupBox']}>
                <div className={calculatorClass['label']}>{t('gross_weight_lb')}</div>
                <div className={calculatorClass['inputWrap']}>
                  <input
                    aria-label="Gross Weight-lb"
                    type="number"
                    min="0"
                    step="any"
                    value={weightLb}
                    onKeyDown={blockInvalidChars}
                    onChange={(e) => {
                      setWeightLb(e.target.value);
                      setWeightKg(lbToKg(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className={calculatorClass['submitBox']}>
              <button
                type="button"
                name="reset"
                onClick={handleReset}
                className={calculatorClass['btn']}
              >
                {t('reset')}
              </button>
              <button
                type="submit"
                name="calculate"
                className={`${calculatorClass['btn']} ${calculatorClass['btnPrimary']}`}
              >
                {t('calculate')}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Results */}
      <div className={calculatorClass['resultWrap']}>
        <div className={calculatorClass['resultSubject']}>{t('results_title')}</div>
        <div className={calculatorClass['resultGrid']}>
          <div className={calculatorClass['resultBox']}>
            <div className={calculatorClass['resultTitle']}>{t('cft_label')}</div>
            <div className={calculatorClass['resultValue']}>
              {results !== null ? results.cft.toFixed(5) : '—'}
            </div>
          </div>
          <div className={calculatorClass['resultBox']}>
            <div className={calculatorClass['resultTitle']}>{t('cbm_label')}</div>
            <div className={calculatorClass['resultValue']}>
              {results !== null ? results.cbm.toFixed(5) : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
