import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dummyPlaceCardImage from '/dummy_placecard.png';
import Star from '@pages/home/components/Star';
import KakaoMap from '@common/KakaoMap';
import CourseCard from '@pages/home/components/CourseCard';

const PHOTOS = Array.from({ length: 6 }).map(() => '/dummy_placecard.png');

const ArchivePlacePage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState<'good' | 'bad'>('good');

  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const starRating = rating - i;
      let fillPercentage = 0;

      if (starRating >= 1) {
        fillPercentage = 100;
      } else if (starRating > 0) {
        fillPercentage = starRating * 100;
      }

      stars.push(
        <div key={i} className="flex h-[14px] w-[14px] items-center justify-center">
          <Star fillPercentage={fillPercentage} starId={i} />
        </div>,
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen">
      <div className="flex w-full flex-col">
        {/* 사진 영역 */}
        <div className="flex w-full gap-[10px]">
          <div className="flex h-60 max-h-60 min-h-60 w-60 max-w-60 min-w-60 items-center justify-center overflow-hidden rounded-[9.41px]">
            <img src={dummyPlaceCardImage} alt="사진" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex h-[116px] max-h-[116px] min-h-[116px] w-[116px] max-w-[116px] min-w-[116px] items-center justify-center overflow-hidden rounded-[4px]">
              <img src={dummyPlaceCardImage} alt="사진" className="h-full w-full object-cover" />
            </div>
            <div className="flex h-[116px] max-h-[116px] min-h-[116px] w-[116px] max-w-[116px] min-w-[116px] items-center justify-center overflow-hidden rounded-[4px]">
              <img src={dummyPlaceCardImage} alt="사진" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* 장소 정보 */}
        <div className="mt-6 flex w-full flex-col">
          <div className="flex items-center gap-2">
            <span className="text-s1 text-neutral-8">어니언 성수</span>
            <span className="text-d2 text-neutral-5">카페</span>
          </div>

          <span className="text-b2 text-neutral-5 mt-4">서울 성동구 아차산로9길 8 1-2층</span>
          <span className="text-b4 text-neutral-4 mt-[2px]">(지번) 성수동2가 277-135</span>

          {/* 별점 */}
          <div className="mt-3 flex h-[22px] items-center gap-1">
            <span className="text-b5 text-yellow-5">{4.7}</span>
            <div className="flex items-center">{renderStars(4.7)}</div>
            <div className="bg-neutral-3 h-2 w-[0.75px] rounded-full"></div>
            <span className="text-b5 text-neutral-5 whitespace-nowrap">리뷰 {531}건</span>
          </div>
        </div>

        {/* 태그 */}
        {/* TODO: 컴포넌트로 분리 */}
        <div className="mt-6 flex items-center gap-3 overflow-x-visible">
          <div
            className="bg-purple-2 text-purple-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            사진 찍기 좋아요
          </div>
          <div
            className="bg-orange-2 text-orange-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            음식이 맛있어요
          </div>
          <div
            className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            시설이 깨끗해요
          </div>
          <div
            className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            시설이 깨끗해요
          </div>
          <div
            className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            시설이 깨끗해요
          </div>
        </div>

        {/* 지도 */}
        <div className="mt-6 h-60 max-h-60 min-h-60 w-[362px]">
          <KakaoMap
            latitude={37.566826}
            longitude={126.9786567}
            showMarker
            showHeartButton={false}
            className="h-full w-full"
          />
        </div>

        {/* 사진 리스트 */}
        <div className="-mx-5 mt-6 w-[calc(100%+2.5rem)] overflow-x-visible">
          <div className="flex w-full gap-2 overflow-x-scroll px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PHOTOS.map((photo, index) => (
              <div
                key={index}
                className="border-iceblue-4 flex h-20 min-h-20 w-20 min-w-20 items-center justify-center overflow-hidden rounded-[8px] border"
              >
                <img src={photo} alt="사진" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* 좋았던 점 / 아쉬웠던 점 */}
        <div className="mt-10 flex w-full flex-col gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTab('good')}
              className={`flex h-7 w-16 items-start justify-center ${
                selectedTab === 'good' ? 'border-iceblue-10 border-b-2' : ''
              }`}
            >
              <span className={`text-d1 ${selectedTab === 'good' ? 'text-iceblue-10' : 'text-iceblue-8'}`}>
                좋았던 점
              </span>
            </button>
            <button
              onClick={() => setSelectedTab('bad')}
              className={`flex h-7 w-[75px] items-start justify-center ${
                selectedTab === 'bad' ? 'border-iceblue-10 border-b-2' : ''
              }`}
            >
              <span className={`text-d1 ${selectedTab === 'bad' ? 'text-iceblue-10' : 'text-iceblue-8'}`}>
                아쉬웠던 점
              </span>
            </button>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="border-iceblue-2 h-fit w-full rounded-[8px] border px-5 py-3">
              <span className="text-b4 text-iceblue-8 block truncate overflow-hidden text-ellipsis whitespace-nowrap">
                입장료가 무료라서 좋다. 그리고 내부 꽃사슴도 볼 수 있고, 멋있는 조형물도 보는 재미가 있다. 평야에서
                사람들이 돗자리 깔고 여유를 즐기는 모습을 바라보는 풍경도 평화로워!
              </span>
            </div>
            <div className="border-iceblue-2 h-fit w-full rounded-[8px] border px-5 py-3">
              <span className="text-b4 text-iceblue-8 block truncate overflow-hidden text-ellipsis whitespace-nowrap">
                입장료가 무료라서 좋다. 그리고 내부 꽃사슴도 볼 수 있고, 멋있는 조형물도 보는 재미가 있다. 평야에서
                사람들이 돗자리 깔고 여유를 즐기는 모습을 바라보는 풍경도 평화로워!
              </span>
            </div>
            <div className="border-iceblue-2 h-fit w-full rounded-[8px] border px-5 py-3">
              <span className="text-b4 text-iceblue-8 block truncate overflow-hidden text-ellipsis whitespace-nowrap">
                입장료가 무료라서 좋다. 그리고 내부 꽃사슴도 볼 수 있고, 멋있는 조형물도 보는 재미가 있다. 평야에서
                사람들이 돗자리 깔고 여유를 즐기는 모습을 바라보는 풍경도 평화로워!
              </span>
            </div>
          </div>
        </div>

        {/* 이 장소가 포함된 코스를 추천해요 */}
        <div className="mt-8 flex w-full flex-col gap-4">
          <span className="text-s2 text-neutral-6">이 장소가 포함된 코스를 추천해요</span>
          <div className="-mx-5 mt-6 w-[calc(100%+2.5rem)] overflow-x-visible">
            <div className="flex w-full gap-[10px] overflow-x-scroll px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="w-[362px] max-w-[362px] min-w-[362px]">
                  <CourseCard
                    key={index}
                    courseId={index}
                    profileImageUrl="/dummy_profile.png"
                    authorName="홍**"
                    title="아직 어색한 사이인 커플을 위한 감성 충만 코스"
                    location="강남"
                    placeCount={5}
                    tags={['음식이 맛있어요', '사진 찍기 좋아요']}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 저장 / 지도에서 보기 */}
        <div className="mt-8 flex w-full gap-3 py-5">
          <button
            type="button"
            className="bg-iceblue-2 text-s5 text-iceblue-7 flex h-13.5 w-full flex-1 cursor-pointer items-center justify-center rounded-[12px]"
          >
            저장
          </button>
          <button
            type="button"
            className="bg-iceblue-8 text-s5 flex h-13.5 w-full flex-1 cursor-pointer items-center justify-center rounded-[12px] text-white"
          >
            지도에서 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchivePlacePage;
