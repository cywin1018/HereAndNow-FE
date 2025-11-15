import PlaceCard from '@pages/home/components/PlaceCard';
import TabNavigation from '@pages/home/components/TabNavigation';

const ArchiveSavePage = () => {
  return (
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveSavePage;
