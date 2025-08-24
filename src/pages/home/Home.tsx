import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Toast } from '@components/ui';

const Home = () => {
  const { t } = useTranslation();
  const [toastKey, setToastKey] = useState(0);

  const handleShowToast = () => {
    setToastKey((prev) => prev + 1);
  };

  return (
    <>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
      <Button onClick={handleShowToast}>Show Toast</Button>
      {toastKey > 0 && <Toast key={toastKey} message="Welcome home!" />}
    </>
  );
};

export default Home;
