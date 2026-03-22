'use client';
import referenceClass from './ReferenceGuide.module.scss';
import referencePageData from './ReferenceGuide.PageData.json';
import { useRouter } from 'next/navigation';

const ReferenceGuide = () => {
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
    <section className={referenceClass['container']}>
      <div className={referenceClass['header']}>
        <div className={referenceClass['title']}>
          <h1>{referencePageData.Title}</h1>
          <p>{referencePageData.Description}</p>
        </div>
        <div className={referenceClass['buttons']}>
          <button className={referenceClass['button'] + ' ' + referenceClass['darkButton']}>
            {referencePageData.ActionButton1.Title}
          </button>
          <button className={referenceClass['button'] + ' ' + referenceClass['secondary']}>
            {referencePageData.ActionButton2.Title}
          </button>
          <button
            className={referenceClass['button'] + ' ' + referenceClass['lightButton']}
            onClick={() => handleRouting(2)}
          >
            {referencePageData.ActionButton3.Title}
          </button>
        </div>
      </div>
      <div className={referenceClass['content']}></div>
    </section>
  );
};

export default ReferenceGuide;
