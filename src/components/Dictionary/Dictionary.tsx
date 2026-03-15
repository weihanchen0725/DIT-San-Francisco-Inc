import { getTranslations } from 'next-intl/server';
import React from 'react';
import dictionaryKeys from './dictionary.data.json';
import dictionaryClass from './Dictionary.module.scss';
import NavBar from './NavBar/NavBar';

const { keyList } = dictionaryKeys;

const filteredKeys = keyList.filter((key) => /^[a-zA-Z]/.test(key));

const navLetters = [...new Set(filteredKeys.map((key) => key.charAt(0).toUpperCase()))].sort();

const isNewLetter = (index: number) => {
  if (index === 0) return true;
  return (
    filteredKeys[index].charAt(0).toUpperCase() !== filteredKeys[index - 1].charAt(0).toUpperCase()
  );
};

const Dictionary = async () => {
  const translateDictionary = await getTranslations('dictionary');
  return (
    <React.Fragment>
      {/* <nav aria-label="Alphabet navigation">
                {navLetters.map(letter => (
                    <a key={letter} href={`#${letter}`}>{letter}</a>
                ))}
            </nav> */}
      <NavBar navLetters={navLetters} />
      <ul className={dictionaryClass['dictionary-list']}>
        {filteredKeys.map((key, index) => (
          <React.Fragment key={key}>
            {isNewLetter(index) && (
              <h2 id={key.charAt(0).toUpperCase()}>{key.charAt(0).toUpperCase()}</h2>
            )}
            <li className={dictionaryClass['dictionary-item']}>
                <h3>{translateDictionary(`${key}.term`)}</h3>
                <span className={dictionaryClass['dictionary-category']}>{translateDictionary(`${key}.category`)}</span>
                <p className={dictionaryClass['dictionary-definition']}>{translateDictionary(`${key}.definition`)}</p>
                <ul className={dictionaryClass['dictionary-related-terms']}>
                  {(translateDictionary.raw(`${key}.relatedTerms`) as string[]).map((term) => (
                    <li key={term}>#{term.trim().replace(' ', '_')}</li>
                  ))}
                </ul>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Dictionary;
