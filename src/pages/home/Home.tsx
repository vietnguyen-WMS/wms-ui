import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui';
import { useToastStore } from '@/stores';

const Home = () => {
  const { t } = useTranslation();
  const { showToast } = useToastStore();
  const counterRef = useRef(0);

  const handleShowToast = () => {
    counterRef.current += 1;
    showToast({
      type: 'success',
      message: t('welcome_home', { count: counterRef.current }),
    });
  };

  return (
    <>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
      <Button onClick={handleShowToast}>{t('show_toast')}</Button>
    </>
  );
};

export default Home;
