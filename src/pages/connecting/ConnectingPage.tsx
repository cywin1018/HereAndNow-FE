import LoveIcon from '@assets/icons/love.svg';
import DotsIcon from '@assets/icons/dots.svg';
import KimHereIcon from '@assets/icons/kim_here.svg';
import ChoiNowIcon from '@assets/icons/choi_now.svg';
import { useNavigate } from 'react-router-dom';
import CardSlider from './components/CardSlider';
import ConnectingCard from './components/ConnectingCard';
import ConnectingBottomNavigation from './components/ConnectingBottomNavigation';
import BottomNavigation from '@common/layout/BottomNavigation';
import useGetCoupleInfo from '@apis/connecting/useGetCoupleInfo';
import useGetCoupleBanner from '@apis/connecting/useGetCoupleBanner';

const ConnectingPage = () => {
  const navigate = useNavigate();
  const handleDotsClick = () => {
    navigate('/connecting/profile-modify');
  };

  // 디버깅용: 잠금 화면 테스트
  // const { data: coupleInfo } = useGetCoupleInfo(); // 실제 API 호출
  const coupleInfo: any = { data: {} }; // 빈 데이터 (잠금 상태)
  // const coupleInfo: any = null; // null (잠금 상태)

  // TODO: coupleBanner 데이터 사용 예정
  useGetCoupleBanner({ page: 0, size: 10 });

  const handleHomeClick = () => {
    navigate('/');
  };

  // 커플 정보가 없거나 비어있으면 잠금 상태
  const isLocked = !coupleInfo?.data || Object.keys(coupleInfo.data).length === 0;

  return (
    <>
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
            <span className="text-b5 text-neutral-8">
              {coupleInfo?.data?.datingDate !== undefined ? coupleInfo.data.datingDate : '???'}일
            </span>
          </div>

          <div className="absolute top-5 right-5 z-10 flex items-center gap-0">
            <div className="text-b4 flex flex-col items-end text-right text-white">
              <span>우리가 함께한</span>
              <span>
                {coupleInfo?.data?.placeWithCount ?? 0}개의 장소, {coupleInfo?.data?.courseWithCount ?? 0}개의 코스
              </span>
            </div>
            <button type="button" className="flex items-center justify-start" aria-label="옵션">
              <img src={DotsIcon} alt="더보기" className="h-5 w-5 cursor-pointer" onClick={handleDotsClick} />
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
              <img
                src={coupleInfo?.data?.member1ImageUrl || KimHereIcon}
                alt={coupleInfo?.data?.member1Name || '사용자 1'}
                className="relative z-10 h-[72px] w-[72px] rounded-full object-cover"
              />
            </div>
            <span className="text-s4 text-neutral-6 font-semibold">{coupleInfo?.data?.member1Name || '???'}</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative h-[72px] w-[72px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-lg" />
              <img
                src={coupleInfo?.data?.member2ImageUrl || ChoiNowIcon}
                alt={coupleInfo?.data?.member2Name || '사용자 2'}
                className="relative z-10 h-[72px] w-[72px] rounded-full object-cover"
              />
            </div>
            <span className="text-s4 text-neutral-6 font-semibold">{coupleInfo?.data?.member2Name || '???'}</span>
          </div>
        </div>

        {/* 카드 슬라이더 영역 */}
        <CardSlider
          isLocked={isLocked}
          cards={[
            <ConnectingCard
              key="card-1"
              date="2025.11.05"
              placeCount={4}
              title="우리의 첫 도쿄"
              description="엔화 미리 환전할 걸 까먹고 공항에서 했는데 미리..."
              backgroundClassName="bg-gradient-to-br from-blue-400 to-purple-500"
            />,
            <ConnectingCard
              key="card-2"
              date="2025.11.03"
              placeCount={3}
              title="서울 한강 나들이"
              description="날씨가 좋아서 한강에서 피크닉을 즐겼어요"
              backgroundClassName="bg-gradient-to-br from-pink-400 to-orange-500"
            />,
            <ConnectingCard
              key="card-3"
              date="2025.11.01"
              placeCount={5}
              title="부산 여행"
              description="해운대에서 일출을 보며 시작한 하루"
              backgroundClassName="bg-gradient-to-br from-cyan-400 to-blue-500"
            />,
          ]}
        />
      </div>

      {/* 잠금 상태일 때는 일반 BottomNavigation, 아니면 ConnectingBottomNavigation */}
      {isLocked ? <BottomNavigation /> : <ConnectingBottomNavigation onHomeClick={handleHomeClick} />}
    </>
  );
};

export default ConnectingPage;
