import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
    </>
  );
};

export default Home;
