import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@components/ui';
import { useToastStore } from '@/stores';

const Home = () => {
  const { t } = useTranslation();
  const { showToast } = useToastStore();
  const counterRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowToast = () => {
    counterRef.current += 1;
    showToast({
      type: 'success',
      message: t('welcome_home', { count: counterRef.current }),
    });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
      <div className="space-x-2">
        <Button onClick={handleShowToast}>{t('show_toast')}</Button>
        <Button onClick={handleOpenModal}>{t('show_modal')}</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="md">
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is a modal body</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
