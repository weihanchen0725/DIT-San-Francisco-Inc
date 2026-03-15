import layoutClass from './styles.module.scss'

const DictionaryLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className={layoutClass['dictionary-layout']}>{children}</section>;
};

export default DictionaryLayout;
