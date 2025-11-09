import StarRatingFilter from '@common/components/StarRatingFilter';
import PhotoUploader from '@common/components/PhotoUploader';
import TagSelector from '@common/components/TagSelector';
import LabeledTextarea from '@common/components/LabeledTextarea';
import PageHeader from '@common/layout/PageHeader';
import PlaceCard from '@pages/home/components/PlaceCard';
import BottomActionButton from '@common/button/BottomActionButton';

const PlaceDetail = () => {
  return (
    <div className="flex w-full flex-col gap-[32px] pb-16">
      <PageHeader title="장소 세부설명" />
      <PlaceCard
        imageUrl="/dummy_placecard.png"
        name="갓덴스시 강남점"
        category="디저트 카페"
        address="서울 강남구 강남대로102길 30 1-3층"
        addressDetail="(지번) 역삼동 822-4"
        rating={4.1}
        reviewCount={252}
      />
      <div className="flex flex-col gap-[8px]">
        <label className="text-d1 text-iceblue-8">
          다녀오신 곳의 사진을 올려주세요
          <span className="text-red-6 ml-1">•</span>
        </label>
        <PhotoUploader />
      </div>
      <div className="flex flex-col gap-[8px]">
        <label className="text-d1 text-iceblue-8">
          별점을 매겨본다면?
          <span className="text-red-6 ml-1">•</span>
        </label>
        <StarRatingFilter rating={4.1} onRatingChange={() => {}} title="별점을 매겨본다면?" />
      </div>
      <div className="flex flex-col gap-[8px]">
        <label className="text-d1 text-iceblue-8">
          분위기는 어땠나요?
          <span className="text-red-6 ml-1">•</span>
        </label>
        <TagSelector
          options={[
            '사진 찍기 좋아요',
            '분위기 맛집',
            '뷰가 좋아요',
            '특별한 날 오기 좋아요',
            '야경이 예뻐요',
            '이색 데이트',
            '건물이 멋져요',
            '로맨틱해요',
            '기념일에 오기 좋아요',
            '감성 숙소',
          ]}
          maxSelected={5}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <label className="text-d1 text-iceblue-8">
          시설은 어떠셨나요?
          <span className="text-red-6 ml-1">•</span>
        </label>
        <TagSelector
          options={[
            '시설이 깨끗해요',
            '분위기 맛집',
            '뷰가 좋아요',
            '특별한 날 오기 좋아요',
            '야경이 예뻐요',
            '이색 데이트',
            '건물이 멋져요',
            '로맨틱해요',
            '기념일에 오기 좋아요',
            '감성 숙소',
          ]}
          maxSelected={5}
          selectedOptionClassName="bg-blue-6 text-white"
          optionContainerBgClassName="bg-blue-1"
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <label className="text-d1 text-iceblue-8">
          기타 사항
          <span className="text-red-6 ml-1">•</span>
        </label>
        <TagSelector
          options={[
            '친절해요',
            '분위기 맛집',
            '뷰가 좋아요',
            '특별한 날 오기 좋아요',
            '야경이 예뻐요',
            '이색 데이트',
            '건물이 멋져요',
            '로맨틱해요',
            '기념일에 오기 좋아요',
            '감성 숙소',
          ]}
          maxSelected={5}
          selectedOptionClassName="bg-green-6 text-white"
          optionContainerBgClassName="bg-green-1"
        />
      </div>
      <LabeledTextarea label="어떤 점이 좋았나요?" required maxLength={100} />
      <LabeledTextarea label="어떤 점이 아쉬웠나요?" required maxLength={100} />
      <BottomActionButton className="mt-[80px]" type="button" onClick={() => {}}>
        세부설명 저장
      </BottomActionButton>
    </div>
  );
};

export default PlaceDetail;
