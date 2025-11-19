import { useState } from 'react';
import ReviewSection from './ReviewSection';
import CoupleComment from './CoupleComment';
import type { CourseDetailResponse } from '@apis/course/types';

const RightArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// 별점 렌더링 함수
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {hasHalfStar && <span className="opacity-50">★</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={i} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
};

interface DetailSectionProps {
  pins?: CourseDetailResponse['data']['pins'];
}

// 임시 댓글 데이터
const commentList = [
  {
    id: 1,
    user: '홍**',
    img: 'https://placehold.co/32x32/E8A0BF/333?text=홍',
    comment: '우와! 성수동에서 북한산까지 가셨군요? 좋아요 누르고 갑니당!!',
  },
  { id: 2, user: '문**', img: 'https://placehold.co/32x32/A0E8D5/333?text=문', comment: '리뷰 넘 귀여워용 💕' },
  {
    id: 3,
    user: '마**',
    img: 'https://placehold.co/32x32/D5A0E8/333?text=마',
    comment: '저도 성수동 잘 안 가봤는데 코스 참고할게요 ㅎㅎ 감사합니당~!',
  },
  { id: 4, user: '김**', img: 'https://placehold.co/32x32/E8D5A0/333?text=김', comment: '좋아요 눌러요~^^' },
];

const DetailSection = ({ pins = [] }: DetailSectionProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleDelete = () => {
    // 삭제 로직 구현
    console.log('삭제하기');
    setIsDeleteModalOpen(false);
  };

  const handleShare = () => {
    // 공유 로직 구현
    console.log('공유하기');
    setIsShareModalOpen(false);
  };

  if (pins.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="text-iceblue-8">장소 정보가 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {pins.map((pin, index) => {
        const place = pin.placeDetails;
        const mainImage = pin.pinImages && pin.pinImages.length > 0 ? pin.pinImages[0] : '/dummy_course_detail.png';

        return (
          <div key={pin.pinIndex} className="flex flex-col gap-4">
            {/* --- 헤더 --- */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-d2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-pink-500 text-white">
                {pin.pinIndex}
              </span>
              <span className="text-d1 text-neutral-8 font-bold">{place.placeName}</span>
            </div>

            <div className="flex flex-row gap-[12px]">
              {/* --- 1. 메인 이미지 --- */}
              <div className="border-iceblue-4 h-[173px] w-[173px] flex-shrink-0 rounded-[8px] border-2">
                <img src={mainImage} alt={place.placeName} className="h-full w-full rounded-[6px] object-cover" />
              </div>

              {/* --- 2. 정보 --- */}
              <div className="flex flex-1 flex-col">
                <div className="flex flex-col gap-1">
                  <span className="text-b3 text-neutral-10">{place.placeName}</span>
                  <span className="text-d2 text-iceblue-8">{place.placeCategory}</span>
                  <span className="text-d1 text-iceblue-8">{place.placeStreetNameAddress}</span>

                  {/* 평점 및 리뷰 */}
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-b5 font-bold text-yellow-500">{place.placeRating.toFixed(1)}</span>
                    {renderStars(place.placeRating)}
                    <span className="text-b5 text-iceblue-8">리뷰 {place.reviewCount}건</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
                  >
                    <span className="font-medium text-gray-800">자세히</span>
                    <RightArrowIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* --- 포토 슬라이드 영역 --- */}
            {pin.pinImages && pin.pinImages.length > 0 && (
              <div
                className="hide-scrollbar mt-3 mb-3 overflow-x-auto whitespace-nowrap"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                <div className="flex flex-row gap-2">
                  {pin.pinImages.map((src, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={src}
                      alt={`${place.placeName} 이미지 ${imgIndex + 1}`}
                      className="border-iceblue-4 h-[80px] w-[80px] flex-shrink-0 rounded-lg border-2 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* --- 리뷰 섹션 --- */}
            <div className="flex flex-col gap-[20px]">
              {pin.pinPositive && <ReviewSection title="좋았던 점" content={pin.pinPositive} />}
              {pin.pinNegative && <ReviewSection title="아쉬웠던 점" content={pin.pinNegative} />}
            </div>

            {/* 마지막 pin이 아니면 구분선 추가 */}
            {index < pins.length - 1 && <div className="border-t border-gray-200 pt-6"></div>}
          </div>
        );
      })}

      {/* 댓글 섹션 (마지막에 한 번만 표시) */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        {/* 댓글 헤더 */}
        <h3 className="text-lg font-semibold text-gray-900">댓글 {commentList.length}개</h3>

        {/* 댓글 입력창 */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="댓글을 남겨보세요!"
            className="w-full rounded-lg border border-gray-300 p-4 text-base placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* 댓글 목록 */}
        <div className="mt-6 flex flex-col gap-4">
          {commentList.map(item => (
            <div key={item.id} className="flex flex-row items-start gap-3">
              <img
                src={item.img}
                alt={`${item.user} profile`}
                className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">{item.user}</span>
                <p className="text-base text-gray-700">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CoupleComment />
    </div>
  );
};

export default DetailSection;
