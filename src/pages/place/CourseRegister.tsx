import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@common/layout/PageHeader';
import PlaceCard from '@pages/home/components/PlaceCard';
import PencilIcon from '@assets/icons/bxs_pencil.svg';
import MinusCircleIcon from '@assets/icons/bx_minus-circle.svg';
import PlusCircleIcon from '@assets/icons/bx_plus-circle.svg';
import BottomActionButton from '@common/button/BottomActionButton';

interface CoursePlace {
  id: number;
  imageUrl: string;
  name: string;
  category: string;
  address: string;
  addressDetail: string;
  rating: number;
  reviewCount: number;
}

const MAX_COURSE_PLACES = 7;

const CourseRegister = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<CoursePlace[]>([
    {
      id: 1,
      imageUrl: '/dummy_placecard.png',
      name: '갓덴스시 강남점',
      category: '디저트 카페',
      address: '서울 강남구 강남대로102길 30 1-3층',
      addressDetail: '(지번) 역삼동 822-4',
      rating: 4.1,
      reviewCount: 252,
    },
  ]);

  const handleRemovePlace = (placeId: number) => {
    setPlaces(prev => prev.filter(place => place.id !== placeId));
  };

  const handleEditPlace = (placeId: number) => {
    navigate(`/place/${placeId}/edit`);
  };

  const handleAddPlace = () => {
    navigate('/place/add-place');
  };

  return (
    <div className="flex w-full flex-col gap-[24px] pb-24">
      <PageHeader title="장소 세부설명" />

      <main className="flex flex-col gap-[24px] px-4">
        <section className="flex flex-col gap-[16px]">
          {places.map(place => (
            <div key={place.id} className="flex flex-col gap-3">
              <PlaceCard
                imageUrl={place.imageUrl}
                name={place.name}
                category={place.category}
                address={place.address}
                addressDetail={place.addressDetail}
                rating={place.rating}
                reviewCount={place.reviewCount}
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRemovePlace(place.id)}
                  className="text-d1 border-iceblue-4 bg-iceblue-1 text-iceblue-8 hover:bg-iceblue-2 flex-1 rounded-[16px] border py-3 transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <img src={MinusCircleIcon} alt="" className="h-5 w-5" />
                    장소 삭제
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleEditPlace(place.id)}
                  className="text-d1 border-pink-4 bg-pink-1 text-pink-6 hover:bg-pink-2 flex-1 rounded-[16px] border py-3 transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <img src={PencilIcon} alt="" className="h-5 w-5" />
                    세부설명 수정
                  </span>
                </button>
              </div>
            </div>
          ))}
        </section>

        {places.length < MAX_COURSE_PLACES && (
          <button
            type="button"
            onClick={handleAddPlace}
            className="border-iceblue-4 hover:bg-iceblue-1/40 flex flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed bg-white p-[10px] transition-colors"
          >
            <img src={PlusCircleIcon} alt="" className="h-12 w-12" />
            <span className="text-d1 text-iceblue-7">새로운 장소 추가하기</span>
            <span className="text-b4 text-iceblue-6">
              {places.length}/{MAX_COURSE_PLACES}
            </span>
          </button>
        )}
      </main>

      <BottomActionButton type="button" onClick={() => navigate('/place/course/submit')} disabled={places.length === 0}>
        다음
      </BottomActionButton>
    </div>
  );
};

export default CourseRegister;
