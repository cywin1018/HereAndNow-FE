import { useState } from 'react';
import ReviewSection from './ReviewSection';
import CoupleComment from './CoupleComment';

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
// 임시 사진 데이터 (이 부분은 실제 데이터로 대체하셔야 합니다)
const photoList = [
  'https://placehold.co/80x80/a9d1a0/333?text=Seoul+1',
  'https://placehold.co/80x80/d4a0a0/333?text=Deer',
  'https://placehold.co/80x80/a0c0d4/333?text=Statue',
  'https://placehold.co/80x80/d4c7a0/333?text=City',
  'https://placehold.co/80x80/d4a0c5/333?text=Flower',
  'https://placehold.co/80x80/a0d4c7/333?text=More',
];

const DetailSection = () => {
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

  return (
    <div className="">
      {/* --- 새로 추가된 헤더 (이미지 참고) --- */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-d2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-pink-500 text-white">
          1
        </span>
        {/* 커스텀 텍스트 클래스 대신 표준 Tailwind 클래스를 사용합니다. */}
        <span className="text-d1 text-neutral-8 font-bold">서울숲</span>
      </div>
      <div className="flex flex-row gap-[12px]">
        {/* --- 1. 메인 이미지 --- */}
        {/* 'border-iceblue-4'는 tailwind.config.js에 정의되어 있어야 합니다. */}
        <div className="border-iceblue-4 h-[173px] w-[173px] flex-shrink-0 rounded-[8px] border-2">
          <img
            src="/public/dummy_course_detail.png"
            alt="코스 상세"
            className="h-full w-full rounded-[6px] object-cover" //
          />
        </div>

        {/* --- 2. 정보 (레이아웃 수정을 위해 flex-1 flex-col 추가) --- */}

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-1">
            {/* text-b3, text-d2, text-d1 등은 tailwind.config.js에 정의되어 있어야 합니다. */}
            <span className="text-b3 text-neutral-10">서울숲</span>
            <span className="text-d2 text-iceblue-8">도시근린공원</span>
            <span className="text-d1 text-iceblue-8">서울 성동구 성수동1가 678-1</span>

            {/* 평점 및 리뷰 */}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-b5 font-bold text-yellow-500">4.7</span>
              {/* 별 아이콘 (임시) */}
              <div className="flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>
              <span className="text-b5 text-iceblue-8">리뷰 531건</span>
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

      {/* --- 포토 슬라이드 영역 (수정됨) --- */}
      <div
        className="hide-scrollbar mt-3 mb-3 overflow-x-auto whitespace-nowrap"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        <div className="flex flex-row gap-2">
          {photoList.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Photo slide ${index + 1}`}
              className="border-iceblue-4 h-[80px] w-[80px] flex-shrink-0 rounded-lg border-2 object-cover"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <ReviewSection
          title="좋았던 점"
          content="입장료가 무료라서 좋다. 그리고 내부 꽃사슴도 볼 수 있고, 멋있는 조형물도 보는 재미가 있다. 평야에서 사람들이 돗자리 깔고 여유를 즐기는 모습을 바라보는 풍경도 평화로워!"
        />
        <ReviewSection title="아쉬웠던 점" content="무료라서 막 엄청 보고 즐길 건 없는 듯?" />
      </div>
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
