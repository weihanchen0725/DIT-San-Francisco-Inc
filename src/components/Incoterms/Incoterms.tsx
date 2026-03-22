'use client';
import incotermsClass from './Incoterms.module.scss';
import incotermsData from './Incoterms.data.json';
import Button from './Buttons/Button';
import ICC_Logo from '../../assets/images/icc_logo_light.svg';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const IncoTerms = () => {
  const router = useRouter();

  const handleRouting = (index: number) => {
    switch (index) {
      case 1:
        router.push('/tools/incoterms/reference-guide');
        break;
      case 2:
        router.push('/tools/incoterms/advisor');
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
            <h1>{incotermsData.Hero_Title}</h1>
            <p>{incotermsData.Hero_Description}</p>
            <div className={incotermsClass['buttons']}>
              <Button
                Title={incotermsData.Button1.Title}
                Description={incotermsData.Button1.Description}
                Button_Text={incotermsData.Button1.Name}
                Button_Icon={null}
                onClick={() => handleRouting(1)}
                isLight={incotermsData.Button1.IsLight}
              />
              <Button
                Title={incotermsData.Button2.Title}
                Description={incotermsData.Button2.Description}
                Button_Text={incotermsData.Button2.Name}
                Button_Icon={null}
                onClick={() => handleRouting(2)}
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
            <span>{incotermsData.Hero_Button.Title}</span>
            <span>{incotermsData.Hero_Button.Description}</span>
          </Link>
        </div>
      </section>
    </React.Fragment>
  );
};

export default IncoTerms;
