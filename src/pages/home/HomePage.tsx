import { useState } from 'react';
import KakaoMap from '@common/KakaoMap';
import AddCourse from './components/AddCourse';
import TabNavigation from './components/TabNavigation';
import PlaceCard from './components/PlaceCard';

type TabType = 'course' | 'place';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('course');

  return (
    <div className="bg-neutral-1 min-h-screen">
      <div className="flex flex-col gap-[28px]">
        <AddCourse />

        <KakaoMap latitude={37.566826} longitude={126.9786567} className="h-[292px]" />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'course' && (
          <div className="flex flex-col gap-4">
            {
              <PlaceCard
                imageUrl="/dummy_placecard.png"
                name="갓덴스시 강남점_코스탭"
                category="디저트 카페2"
                address="서울 강남구 강남대로102길 30 1-3층2"
                addressDetail="(지번) 역삼동 822-4"
                rating={3.5}
                reviewCount={120}
              />
            }
          </div>
        )}

        {activeTab === 'place' && (
          <div className="flex flex-col gap-4">
            <PlaceCard
              imageUrl="/dummy_placecard.png"
              name="갓덴스시 강남점"
              category="디저트 카페"
              address="서울 강남구 강남대로102길 30 1-3층"
              addressDetail="(지번) 역삼동 822-4"
              rating={4.1}
              reviewCount={252}
            />
            <PlaceCard
              imageUrl="/dummy_placecard.png"
              name="갓덴스시 강남점2"
              category="디저트 카페2"
              address="서울 강남구 강남대로102길 30 1-3층2"
              addressDetail="(지번) 역삼동 822-4"
              rating={4.5}
              reviewCount={120}
            />
            {/* 추가 장소 카드들 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
