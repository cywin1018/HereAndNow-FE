import { useState } from 'react';
import StarRatingFilter from '@common/components/StarRatingFilter';
import Modal from '@common/components/Modal';

const ArchiveSearchPage = () => {
  const [rating, setRating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-neutral-1 flex min-h-screen flex-col">
      <span className="text-h4 text-neutral-10 py-8">찾고 싶은 추억이 있나요?</span>

      {/* 검색 필터 리스트 */}
      <div className="flex w-full flex-col gap-8">
        <StarRatingFilter rating={rating} onRatingChange={setRating} title="별점으로 찾아볼까요?" />
      </div>

      <button onClick={() => setIsOpen(true)}>연인을 초대해주세요</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mainMessage="연인을 초대해주세요"
        subMessage="커넥팅 화면에서 연인을 초대 후 이용 가능해요"
        leftButtonText="홈으로"
        rightButtonText="연인 초대하기"
      />
    </div>
  );
};

export default ArchiveSearchPage;
