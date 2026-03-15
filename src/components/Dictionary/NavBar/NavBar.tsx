import navbarClass from './NavBar.module.scss';

interface NavBarProps {
  navLetters: string[];
}

const NavBar = ({ navLetters }: NavBarProps) => {
  return (
    <nav aria-label="Alphabet navigation" className={navbarClass.navbar}>
      {navLetters.map((letter) => (
        <a key={letter} href={`#${letter}`}>
          {letter}
        </a>
      ))}
    </nav>
  );
};

export default NavBar;
