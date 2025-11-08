import { useState } from 'react';
import StarRatingFilter from '@common/components/StarRatingFilter';

const ArchiveSearchPage = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="bg-neutral-1 flex min-h-screen flex-col">
      <span className="text-h4 text-neutral-10 py-8">찾고 싶은 추억이 있나요?</span>

      {/* 검색 필터 리스트 */}
      <div className="flex w-full flex-col gap-8">
        <StarRatingFilter rating={rating} onRatingChange={setRating} title="별점으로 찾아볼까요?" />
      </div>
    </div>
  );
};

export default ArchiveSearchPage;
