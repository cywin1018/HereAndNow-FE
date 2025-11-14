import KakaoMap from '@common/KakaoMap';
import exploreSearchIcon from '@assets/icons/explore_search.svg';
import exploreFlagIcon from '@assets/icons/explore_flag.svg';
import PlaceCard from '@pages/home/components/PlaceCard';
import { useNavigate } from 'react-router-dom';

const ExplorePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full">
      {/* 지도 */}
      <div className="absolute inset-0 z-0">
        <KakaoMap latitude={37.566826} longitude={126.9786567} showHeartButton={false} className="h-full w-full" />
      </div>

      {/* 검색 바 */}
      <div className="absolute top-[54px] left-1/2 z-20 flex h-12 max-h-12 min-h-12 w-[362px] -translate-x-1/2 items-center gap-4">
        <div
          className="flex h-full flex-1 items-center justify-between rounded-[44px] bg-white px-4"
          style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}
        >
          <input
            type="text"
            placeholder="찾고 싶은 장소가 있나요?"
            className="text-b4 placeholder:text-neutral-4 h-full w-full focus:outline-none"
          />
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center">
            <img src={exploreSearchIcon} alt="검색" className="h-7 w-7" />
          </button>
        </div>

        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white"
          style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}
          onClick={() => navigate('/explore/course')}
        >
          <img src={exploreFlagIcon} alt="플래그" className="h-6 w-6" />
        </button>
      </div>

      {/* 장소 리스트 */}
      <div className="absolute right-0 bottom-[127px] left-[20px] z-20 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-4 pr-[20px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="border-neutral-3 w-[312px] max-w-[312px] min-w-[312px] overflow-hidden rounded-[8px] border whitespace-nowrap"
            >
              <PlaceCard
                imageUrl="/dummy_placecard.png"
                name="갓덴스시 강남점"
                category="디저트 카페"
                address="서울 강남구 강남대로102길 30 1-3층"
                addressDetail="(지번) 역삼동 822-4"
                rating={4.1}
                reviewCount={252}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
