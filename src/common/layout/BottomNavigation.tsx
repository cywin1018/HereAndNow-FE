import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@assets/icons/home.svg';
import ArchiveIcon from '@assets/icons/archive.svg';
import ConnectingIcon from '@assets/icons/conecting.svg';
import PlaceIcon from '@assets/icons/place.svg';

const navItems = [
  { path: '/', icon: HomeIcon, alt: '홈' },
  { path: '/explore', icon: PlaceIcon, alt: '둘러보기' },
  { path: '/archive', icon: ArchiveIcon, alt: '아카이브' },
  { path: '/connecting', icon: ConnectingIcon, alt: '연결' },
];

const BottomNavigation = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤이 맨 위에 있거나 위로 스크롤할 때는 보이기
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // 아래로 스크롤할 때는 숨기기
      else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-[500000] flex h-[110px] items-end justify-center bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] pb-8 backdrop-blur-[2px] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="border-neutral-4 flex w-auto items-center gap-x-6 rounded-[8px] border bg-white px-[8px] py-[6px] shadow-lg">
        {navItems.map(item => (
          <Link
            to={item.path}
            key={item.path}
            className={`rounded-lg p-[16px] transition-colors ${
              location.pathname === item.path ? 'bg-pink-1' : 'bg-transparent'
            }`}
          >
            <img src={item.icon} alt={item.alt} className="h-7 w-7" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
