import { Typography } from 'antd';
import {useEffect, useState} from 'react';
import './Home.css';

function Home(){
  const [scrolled, setScrolled] = useState(1  );

  useEffect(() => {
    window.addEventListener("scroll", scrollProgress);
    return () => window.removeEventListener("scroll", scrollProgress);
  }, []);

  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.ceil((scrollPx / winHeightPx) * 210)+1;
    setScrolled(scrolled);
  }

  return (

    <div className='Home'>
      <header className={scrolled >= 211 ? 'Home-header-not-sticky' : 'Home-header'}>
          <img src={`/assets/wardobe/${scrolled.toString().padStart(5,'0')}.jpg`}/>
      </header>
    </div>
  );
};

export default Home;
