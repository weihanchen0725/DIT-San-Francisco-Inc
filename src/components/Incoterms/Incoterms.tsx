'use client';
import incotermsClass from './Incoterms.module.scss';
import incotermsData from './Incoterms.data.json';
import Button from './Buttons/Button';
import ICC_Logo from '../../assets/images/icc_logo_light.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const IncoTerms = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Incoterms');

  const handleRouting = (index: number) => {
    switch (index) {
      case 1:
        router.push(`/${locale}/tools/incoterms/reference-guide`);
        break;
      case 2:
        router.push(`/${locale}/tools/incoterms/advisor`);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <section className={incotermsClass['container']}>
        <div className={incotermsClass['hero']}>
          <div className={incotermsClass['hero-text']}>
            <h1>{t('hero_title')}</h1>
            <p>{t('hero_description')}</p>
            <div className={incotermsClass['buttons']}>
              <Button
                Title={t('btn1_title')}
                Description={t('btn1_description')}
                Button_Text={t('btn1_name')}
                Button_Icon={null}
                onClick={() => handleRouting(2)}
                isLight={incotermsData.Button1.IsLight}
              />
              <Button
                Title={t('btn2_title')}
                Description={t('btn2_description')}
                Button_Text={t('btn2_name')}
                Button_Icon={null}
                onClick={() => handleRouting(1)}
                isLight={incotermsData.Button2.IsLight}
              />
            </div>
          </div>
          <Link
            href={incotermsData.Hero_Button.Link}
            className={incotermsClass['hero-button']}
            target="_blank"
          >
            <div className={incotermsClass['hero-button-logo-container']}>
              <Image src={ICC_Logo} alt="ICC Logo" className={incotermsClass['hero-button-logo']} />
            </div>
            <span>{t('hero_button_title')}</span>
            <span>{t('hero_button_description')}</span>
          </Link>
        </div>
      </section>
    </React.Fragment>
  );
};

export default IncoTerms;
