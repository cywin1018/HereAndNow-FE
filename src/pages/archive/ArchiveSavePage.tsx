import Modal from '@common/components/Modal';
import PlaceCard from '@pages/home/components/PlaceCard';
import TabNavigation from '@pages/home/components/TabNavigation';
import { useState } from 'react';

const ArchiveSavePage = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen">
        <div className="flex w-full flex-col items-center gap-6">
          <TabNavigation />
          <div className="flex w-full flex-col gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <PlaceCard
                key={index}
                imageUrl="/dummy_placecard.png"
                name="갓덴스시 강남점"
                category="디저트 카페"
                address="서울 강남구 강남대로102길 30 1-3층"
                addressDetail="(지번) 역삼동 822-4"
                rating={4.1}
                reviewCount={252}
                hasSaveButton
                onSaveButtonClick={() => setIsSaveModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 저장 삭제 모달 */}
      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        mainMessage="저장을 삭제하시겠어요?"
        subMessage="한 번 삭제하면 다시 되돌릴 수 없어요"
        leftButtonText="아니요"
        leftButtonOnClick={() => setIsSaveModalOpen(false)}
        rightButtonText="네, 삭제할게요"
        rightButtonOnClick={() => setIsSaveModalOpen(false)}
      />
    </>
  );
};

export default ArchiveSavePage;
