import layoutClass from './styles.module.scss';

const DictionaryLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className={layoutClass['dictionaryLayout']}>{children}</section>;
};

export default DictionaryLayout;
