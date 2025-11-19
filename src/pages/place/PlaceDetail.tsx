import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StarRatingFilter from '@common/components/StarRatingFilter';
import PhotoUploader from '@common/components/PhotoUploader';
import TagSelector from '@common/components/TagSelector';
import LabeledTextarea from '@common/components/LabeledTextarea';
import PageHeader from '@common/layout/PageHeader';
import PlaceCard from '@pages/home/components/PlaceCard';
import BottomActionButton from '@common/button/BottomActionButton';
import { useCourseSaveStore } from '@stores/course-save';

const PlaceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPinFiles, pinFiles, courseData, updatePin } = useCourseSaveStore();

  // location.state에서 pinIndex 가져오기 (없으면 새 핀 추가 시 -1)
  console.log('[PlaceDetail] location.state 확인:', {
    state: location.state,
    pinIndex: (location.state as { pinIndex?: number })?.pinIndex,
    hasState: !!location.state,
  });
  const pinIndex = (location.state as { pinIndex?: number })?.pinIndex ?? -1;
  console.log('[PlaceDetail] 최종 pinIndex:', pinIndex);

  // store에서 현재 pin 정보 가져오기
  const currentPin = pinIndex >= 0 && courseData?.pinList?.[pinIndex] ? courseData.pinList[pinIndex] : null;
  const currentPlace = currentPin?.place;

  // 별점 상태 관리 (store의 pinRating 또는 기본값 0)
  const [rating, setRating] = useState<number>(currentPin?.pinRating || 0);

  // pin 정보가 변경되면 별점 업데이트
  useEffect(() => {
    if (currentPin?.pinRating !== undefined) {
      setRating(currentPin.pinRating);
    }
  }, [currentPin?.pinRating]);

  // 현재 핀의 파일 목록 관리
  const [currentFiles, setCurrentFiles] = useState<File[]>(() => {
    if (pinIndex >= 0) {
      return pinFiles[pinIndex] || [];
    }
    return [];
  });

  // 파일이 변경되면 스토어에 저장
  useEffect(() => {
    if (pinIndex >= 0) {
      console.log(`[PlaceDetail] 파일 변경 감지 - 핀 ${pinIndex}:`, {
        fileCount: currentFiles.length,
        fileNames: currentFiles.map(f => f.name),
        pinIndex,
      });
      setPinFiles(pinIndex, currentFiles);
      console.log(`[PlaceDetail] 스토어에 저장 완료 - 핀 ${pinIndex}`);
    } else {
      console.warn('[PlaceDetail] pinIndex가 유효하지 않음:', pinIndex);
    }
  }, [currentFiles, pinIndex, setPinFiles]);

  // 별점 변경 핸들러
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (pinIndex >= 0) {
      updatePin(pinIndex, { pinRating: newRating });
      console.log(`[PlaceDetail] 별점 업데이트 - 핀 ${pinIndex}:`, newRating);
    }
  };

  return (
    <div className="flex w-full flex-col gap-[32px] pb-16">
      <PageHeader title="장소 세부설명" />
      <PlaceCard
        imageUrl={currentPlace?.placeUrl || '/dummy_placecard.png'}
        name={currentPlace?.placeName || '장소 이름'}
        category={currentPlace?.placeCategory || '장소'}
        address={currentPlace?.placeStreetNameAddress || ''}
        addressDetail={currentPlace?.placeNumberAddress || ''}
        rating={rating}
        reviewCount={0}
      />
      <div className="flex flex-col gap-[8px]">
        <label className="text-d1 text-iceblue-8">
          다녀오신 곳의 사진을 올려주세요
          <span className="text-red-6 ml-1">•</span>
        </label>
        <PhotoUploader
          onFilesChange={allFiles => {
            console.log(`[PlaceDetail] PhotoUploader에서 파일 수신 - 핀 ${pinIndex}:`, {
              allFilesCount: allFiles.length,
              allFileNames: allFiles.map(f => f.name),
              currentFilesCount: currentFiles.length,
            });
            // PhotoUploader가 전체 파일 목록을 전달하므로 그대로 사용
            setCurrentFiles(allFiles);
            console.log(`[PlaceDetail] 파일 목록 업데이트 - 핀 ${pinIndex}:`, {
              updatedCount: allFiles.length,
              updatedFileNames: allFiles.map(f => f.name),
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <StarRatingFilter rating={rating} onRatingChange={handleRatingChange} title="별점을 매겨본다면?" />
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
      <div className="pt-[80px]">
        <BottomActionButton type="button" onClick={() => navigate('/place/register')}>
          세부설명 저장
        </BottomActionButton>
      </div>
    </div>
  );
};

export default PlaceDetail;
