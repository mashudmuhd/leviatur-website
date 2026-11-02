import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';

function prepareImage(path) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = import.meta.env.BASE_URL + path;
  });
}

export default function LogoIntro({loadHome, onComplete}) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let completed = 0;
    const resources = [
      loadHome(),
      document.fonts.ready,
      prepareImage('images/leviatur-logo.webp'),
      prepareImage('images/leviatur-cinematic-800.webp'),
      prepareImage('images/rose-lavi-cinematic-800.webp')
    ];
    const finish = () => {
      if (!cancelled) setVisible(false);
    };
    const timeout = setTimeout(finish, 3500);
    Promise.allSettled(resources.map(resource => Promise.resolve(resource).finally(() => {
      completed += 1;
      if (!cancelled) setProgress(completed / resources.length);
    }))).then(finish);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [loadHome]);

  return <AnimatePresence onExitComplete={onComplete}>
    {visible && <motion.div className="logo-intro" key="intro"
      initial={{opacity: 1}} exit={{opacity: 0, y: reduced ? 0 : -16}}
      transition={{duration: reduced ? 0 : .45, ease: [.22, 1, .36, 1]}}>
      <div className="intro-identity">
        <div className="intro-seal">
          <svg className="intro-ring" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="94" fill="none" stroke="#d6bc8920" strokeWidth="1"/>
            <circle className="intro-ring-progress" cx="100" cy="100" r="94" fill="none" stroke="#d6bc89" strokeWidth="1.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress} strokeLinecap="round"/>
          </svg>
          <motion.img src={import.meta.env.BASE_URL + 'images/leviatur-logo.webp'}
          alt="Leviatur" width="320" height="271"
          initial={{opacity: reduced ? 1 : 0, y: reduced ? 0 : 12, scale: reduced ? 1 : .97}}
          animate={{opacity: 1, y: 0, scale: 1}}
          transition={{duration: reduced ? 0 : .6, ease: [.22, 1, .36, 1]}}/>
        </div>
        <p className="intro-motto">THE ART OF PRESENCE</p>
        <p className="intro-status" role="status">Preparing the atelier</p>
      </div>
      <button className="intro-skip" onClick={() => setVisible(false)}>Enter the atelier</button>
    </motion.div>}
  </AnimatePresence>;
}
