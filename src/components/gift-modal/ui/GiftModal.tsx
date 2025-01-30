import { memo, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import s from './GiftModal.module.scss';
import clsx from 'clsx';

interface GiftModalProps {
  isOpen: boolean
  customClass: string
  onClose: () => void
}

const GiftModal = memo(({
  isOpen,
  customClass,
  onClose
}: GiftModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      return setModalOpen(true);
    }

    const timeId = setTimeout(() => {
      setModalOpen(false);
    }, 300);

    return () => clearTimeout(timeId);
  }, [isOpen]);

  useEffect(()=> {
    const timeId = setTimeout(() => {
      setGiftOpen(true);
    }, 1000);

    return () => clearTimeout(timeId);
  }, [modalOpen])

  if (!modalOpen) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: !modalOpen ? 1 : !isOpen ? 1 : 0 }}
      animate={{ opacity: !modalOpen ? 0 : !isOpen ? 0 : 1 }}
      className={clsx(s.modal, customClass)}
    >
      <div className={s.box}>
        <motion.div
          initial={{ scale: !giftOpen ? 1 : .9 }}
          animate={{ scale: !giftOpen ? .9 : 1 }}
          className={s.box_wrap}
        >
          <div className={s.name}>Вкусный приз</div>
          <div className={s.txt}>
            Гарантированный приз «Промокод ROSTIC’S на Шефбургер оригинальный за 1 рубль»
          </div>

          <div className={s.gift}>
            <img src="/public/gift.jpg" alt="" width={276} height={192} />
          </div>  

          <div className={s.promo}>
            <span>CYT39WPFT6</span>
            <img src="/copy.svg" width={24} height={24} />
          </div>

          <div className={s.info}>
            <div className={s.info_title}>Как воспользоваться промокодом</div>
            <div className={s.info_txt}>
              Введи код, указанный в письме, при оформлении подписки на сайте kion.ru
            </div>
          </div>
        </motion.div >

        <button onClick={onClose} className={s.close}>
          <img src="/close.svg" width={56} height={56} />
        </button>
      </div>
    </motion.div>
  );
});

export default GiftModal;
