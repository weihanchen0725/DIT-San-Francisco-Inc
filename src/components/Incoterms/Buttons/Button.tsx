import Image from 'next/image';

import buttonClass from './Button.module.scss';

interface ButtonProps {
  Title: string;
  Description: string;
  Button_Text: string;
  Button_Icon?: string | null;
  isLight?: boolean;
  onClick?: () => void | undefined;
}

const Button = ({
  Title,
  Description,
  Button_Text,
  Button_Icon,
  isLight,
  onClick,
}: ButtonProps) => {
  return (
    <div className={buttonClass.container + ' ' + (isLight ? buttonClass.light : buttonClass.dark)}>
      <h2 className={buttonClass.title}>{Title}</h2>
      <p className={buttonClass.description}>{Description}</p>
      <button
        onClick={onClick}
        className={
          buttonClass.button + ' ' + (isLight ? buttonClass.darkButton : buttonClass.lightButton)
        }
      >
        {Button_Text}
        {Button_Icon && <Image src={Button_Icon} alt="" width={16} height={16} />}
      </button>
    </div>
  );
};

export default Button;
