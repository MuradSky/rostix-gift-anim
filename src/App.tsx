import { useState } from 'react';
import GiftModal from './components/gift-modal';
import VideoAnim from './components/video-anim';
import  s from './App.module.scss';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className={s.app}>
      <div className={s.box}>
        <VideoAnim isReset={!isOpen} toggleModal={openModal} />
        <GiftModal 
          isOpen={isOpen} 
          customClass={s.giftModal}
          onClose={closeModal}
        />
      </div>
    </div>
  )
}

export default App
