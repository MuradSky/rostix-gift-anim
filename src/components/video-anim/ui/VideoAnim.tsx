import { memo, SyntheticEvent, useEffect, useRef, useState } from 'react';
import s from './VideoAnim.module.scss';
import clsx from 'clsx';

interface VideoAnimProps {
  isReset: boolean;
  toggleModal: ()=> void;
}

const VideoAnim = memo(({
  isReset,
  toggleModal
}: VideoAnimProps)=> {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isRestartLoop, setIsRestartLoop] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [isContinues, setContinues] = useState(false);
  const [timeLine, setTimeLine] = useState(0);

  useEffect(()=> {
    if (isReset) {
      setIsComplete(false);
      setIsShake(false);
      setContinues(false);
      setTimeLine(0);
    }
  }, [isReset])

  useEffect(()=> {
    const timeId = setTimeout(()=> {
      if (!isShake && !isComplete) {
        videoRef.current?.play();
      }
    }, 300);

    return () => {
      clearTimeout(timeId);
    }
  }, [isShake, isComplete])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isComplete])
  
  useEffect(()=> {
    const timeId = setTimeout(()=> {
      if (isShake) return

      if (isRestartLoop) {
        videoRef.current?.play();
        setIsRestartLoop(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timeId);
    }
  }, [isRestartLoop, isShake])

  useEffect(()=> {
    if (videoRef.current) {
      videoRef.current.loop = !isShake
      if ((timeLine === 0 || timeLine > 170 || timeLine > 300) && !isContinues && isShake && !isComplete) {
        videoRef.current.currentTime = Math.floor(390 / 100);
        videoRef.current.play();
        setContinues(true)
      }
    }
  }, [isShake, timeLine, isComplete, isContinues])

  useEffect(() => {
    if (videoRef.current && timeLine > Math.floor(videoRef.current.duration * 100) - 50) {
      toggleModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLine])

  const onShake = () => {
    setIsShake(true);
  }

  const onTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const time = Math.floor(e.currentTarget.currentTime * 100)

    console.log(time);

    if (time > 300 && videoRef.current && !isShake) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsRestartLoop(true);
    }

    setTimeLine(time);
  }

  const onEnd = () => {
    setIsComplete(true);
  }

  return (
    <div>
      <div className={s.block}>
        <video 
          muted
          ref={videoRef}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnd}
        >
          <source src="/media/Rostics5_2.mp4" type="video/mp4" />
        </video>

        <div className={clsx(s.game, isShake && s.is_hidden)}>
          <button onClick={onShake} className="button" disabled={isShake}>
            Потряси баскет
          </button>
        </div>
      </div>
    </div>
  )
});

export default VideoAnim;