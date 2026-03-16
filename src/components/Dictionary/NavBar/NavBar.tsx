import React from 'react';
import navbarClass from './NavBar.module.scss';

interface NavBarProps {
  navLetters: string[];
}

const NavBar = ({ navLetters }: NavBarProps) => {
  return (
    <nav aria-label="Alphabet navigation" className={navbarClass['navbar']}>
      {navLetters.map((letter, index) => (
        <React.Fragment key={`${letter}-${index}`}>
          <a href={`#${letter}`}>
          {letter}
          </a>
          {index < navLetters.length - 1 && <div className={navbarClass['divider']}></div>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default NavBar;
