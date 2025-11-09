import LoveIcon from '@assets/icons/love.svg';
import DotsIcon from '@assets/icons/dots.svg';
import KimHereIcon from '@assets/icons/kim_here.svg';
import ChoiNowIcon from '@assets/icons/choi_now.svg';

const ConnectingPage = () => {
  return (
    <div className="relative w-full pb-[150px]">
      <div className="relative h-[120px] w-full">
        <div className="absolute inset-0 overflow-hidden rounded-[34px]">
          <img src="/connecting_sample.png" alt="커플 사진" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute top-5 left-5 z-10 flex h-[36px] items-center rounded-full bg-white py-2 pr-[10px] pl-2.5 shadow-lg">
          <div className="bg-neutral-1 flex h-8 w-8 items-center justify-center rounded-lg">
            <img src={LoveIcon} alt="커플 사랑 지수" className="h-5 w-5" />
          </div>
          <span className="text-b5 text-neutral-8">???일</span>
        </div>

        <div className="absolute top-5 right-5 z-10 flex items-center gap-0">
          <div className="text-b4 flex flex-col items-end text-right text-white">
            <span>우리가 함께한</span>
            <span>0개의 장소, 0개의 코스</span>
          </div>
          <button type="button" className="flex items-center justify-start" aria-label="옵션">
            <img src={DotsIcon} alt="더보기" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="absolute top-[120px] left-1/2 z-20 flex h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-[0_6px_24px_rgba(0,0,0,0.18)] backdrop-blur">
        <img src={LoveIcon} alt="연결 아이콘" className="h-7 w-7" />
      </div>

      <div className="absolute top-[85px] left-1/2 z-10 flex w-[360px] -translate-x-1/2 items-start justify-center gap-16 px-5">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-[72px] w-[72px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-lg" />
            <img src={KimHereIcon} alt="김히어" className="relative z-10 h-[72px] w-[72px]" />
          </div>
          <span className="text-s4 text-neutral-6 font-semibold">김히어</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative h-[72px] w-[72px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-lg" />
            <img src={ChoiNowIcon} alt="??? 사용자" className="relative z-10 h-[72px] w-[72px]" />
          </div>
          <span className="text-s4 text-neutral-6 font-semibold">???</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectingPage;
