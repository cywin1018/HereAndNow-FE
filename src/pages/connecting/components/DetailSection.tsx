import React from 'react';

// '@assets/icons/right-arrow.svg' import 오류를 해결하기 위해
// 아이콘을 인라인 SVG 컴포넌트로 정의합니다.
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
  return (
    // p-4 max-w-md mx-auto 등은 레이아웃 확인을 위한 래퍼입니다.
    // 실제 환경에 맞게 조정하세요.
    <div className="">
      {/* --- 새로 추가된 헤더 (이미지 참고) --- */}
      <div className="mb-4 flex items-center gap-2">
        {/* 이미지의 '1' 스타일을 적용합니다. 
          커스텀 클래스 대신 표준 Tailwind 클래스로 유사하게 만듭니다.
        */}
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

          {/* 자세히 버튼 (flex-col 안에서 mt-auto로 맨 아래로) */}
          <div className="mt-auto">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
            >
              <span className="font-medium text-gray-800">자세히</span>
              {/* 오류를 수정하기 위해 import 대신 인라인 SVG 컴포넌트를 사용합니다.
               */}
              <RightArrowIcon />
            </button>
          </div>
        </div>
      </div>

      {/* --- 포토 슬라이드 영역 (수정됨) --- */}
      {/* 'scrollbar-hide' 유틸리티 클래스가 tailwind에 추가되어 있다고 가정합니다. */}
      <div className="scrollbar-hide mt-4 overflow-x-auto whitespace-nowrap">
        <div className="flex flex-row gap-2">
          {' '}
          {/* 8px gap */}
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

      {/* 이 div는 DetailSection과 그 다음 섹션 사이의 
        간격을 조절하는 용도로 보입니다. 
        상위 컴포넌트에서 gap으로 관리될 수 있으므로, 
        필요 없다면 제거하셔도 됩니다.
      */}
      <div className="flex flex-col gap-[20px]"></div>
    </div>
  );
};

export default DetailSection;
