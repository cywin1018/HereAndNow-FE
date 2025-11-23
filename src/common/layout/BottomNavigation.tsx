import { useEffect, useState, useRef } from 'react';
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

  // [개선 1] 렌더링을 유발하지 않는 값은 useRef로 관리
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollDirectionRef = useRef<'up' | 'down' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollY.current;

      // [개선 3] 과도한 연산 방지 (이미 맨 위거나, 스크롤 변화가 적으면 무시)
      // 모바일에서는 5px로 더 작게 설정하여 민감도 향상
      if (Math.abs(currentScrollY - prevScrollY) < 5) {
        return;
      }

      // 스크롤 방향 결정 (더 정확한 판단을 위해)
      const isScrollingDown = currentScrollY > prevScrollY;
      const isScrollingUp = currentScrollY < prevScrollY;

      // 스크롤 방향이 명확할 때만 방향 저장
      if (isScrollingDown) {
        scrollDirectionRef.current = 'down';
      } else if (isScrollingUp) {
        scrollDirectionRef.current = 'up';
      }

      // 기존 타이머가 있으면 취소 (스크롤이 계속 진행 중)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 스크롤이 끝난 후 상태 변경 (모바일 momentum scrolling 대응)
      scrollTimeoutRef.current = setTimeout(() => {
        const direction = scrollDirectionRef.current;
        const scrollY = window.scrollY;

        // 스크롤을 내리는 중 && 현재 위치가 어느정도 아래임
        if (direction === 'down' && scrollY > 50) {
          setIsVisible(prev => (prev ? false : prev));
        }
        // 스크롤을 올리는 중 || 맨 위에 가까움
        else if (direction === 'up' || scrollY < 50) {
          setIsVisible(prev => (!prev ? true : prev));
        }

        scrollDirectionRef.current = null;
      }, 150); // 모바일 스크롤이 완전히 끝날 때까지 대기

      // 현재 스크롤 위치 업데이트
      lastScrollY.current = currentScrollY;
    };

    // [성능 팁] passive: true 옵션으로 스크롤 성능 향상
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // [중요] 의존성 배열을 비워서 마운트 시 1회만 바인딩

  return (
    <div
      className={`pointer-events-none fixed right-0 bottom-0 left-0 z-[500000] flex h-[110px] items-end justify-center bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] pb-8 backdrop-blur-[2px] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* [UX 개선] pointer-events-none을 부모에 주고, 자식(네비)에 auto를 줌.
         이렇게 하면 네비게이션 옆의 투명한 공간은 클릭이 뚫고 지나가서
         뒤에 있는 컨텐츠를 클릭할 수 있게 됨.
      */}
      <div className="border-neutral-4 pointer-events-auto flex w-auto items-center gap-x-6 rounded-[8px] border bg-white px-[8px] py-[6px] shadow-lg">
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
