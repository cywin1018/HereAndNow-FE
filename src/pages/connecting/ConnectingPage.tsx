import LoveIcon from '@assets/icons/love.svg';
import DotsIcon from '@assets/icons/dots.svg';

const ConnectingPage = () => {
  return (
    <div className="relative h-[120px] w-full overflow-hidden rounded-[20px]">
      <img src="/connecting_sample.png" alt="커플 사진" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <main className="relative z-10 flex h-full w-full items-start justify-between px-5 py-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-[10px] py-2 shadow-lg">
            <div className="bg-neutral-1 flex h-8 w-8 items-center justify-center rounded-lg">
              <img src={LoveIcon} alt="커플 사랑 지수" className="h-5 w-5" />
            </div>
            <span className="text-b5 text-neutral-8">???일</span>
          </div>
        </div>
        <div className="flex items-center gap-0">
          <div className="text-b4 flex flex-col items-end text-right text-white">
            <span className="">우리가 함께한</span>
            <span className="">0개의 장소, 0개의 코스</span>
          </div>
          <button type="button" className="flex h-10 w-10 items-center justify-center" aria-label="옵션">
            <img src={DotsIcon} alt="더보기" className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConnectingPage;
