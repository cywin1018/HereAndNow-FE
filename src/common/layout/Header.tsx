import AlertIcon from '@assets/icons/alert.svg';
import MypageICon from '@assets/icons/mypage.svg';

const Header = () => {
  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <img src="/LogoIcon.svg" alt="Here&Now 로고" className="h-7 w-auto" />

        <div className="flex items-center gap-x-[8px]">
          <button type="button" className="p-2">
            <img src={AlertIcon} alt="알림" className="h-[28px] w-[28px]" />
          </button>
          <button type="button" className="p-2">
            <img src={MypageICon} alt="마이페이지" className="h-[28px] w-[28px]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
