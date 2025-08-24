import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui';
import { useToastStore } from '@/stores';

const Home = () => {
  const { t } = useTranslation();
  const { showToast } = useToastStore();

  const handleShowToast = () => {
    showToast({ type: 'success', message: 'Welcome home!' });
  };

  return (
    <>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
      <Button onClick={handleShowToast}>Show Toast</Button>
    </>
  );
};

export default Home;
