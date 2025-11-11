import PageHeader from '@common/layout/PageHeader';
import KakaoMap from '@common/KakaoMap';
import TagSelector from '@common/components/TagSelector';
import LabeledTextarea from '@common/components/LabeledTextarea';
import BottomActionButton from '@common/button/BottomActionButton';
import { useNavigate } from 'react-router-dom';

const ConnectingCourseDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden">
      <PageHeader title="커넥팅 코스 상세" />
      <div className="flex w-full flex-col items-center gap-8">
        <div className="bg-pink-2 border-pink-2 flex items-center justify-center gap-6 rounded-[50px] border border-solid px-10 py-3">
          <span className="text-s2 text-pink-6">Fri</span>
          <span className="text-s2 text-pink-6">Nov</span>
          <span className="text-s2 text-pink-6">7</span>
        </div>
      </div>
      <KakaoMap latitude={37.566826} longitude={126.9786567} className="h-[292px]" />
      <div className="flex flex-col gap-[32px]">
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
      </div>{' '}
      <div className="pt-[80px]">
        <BottomActionButton type="button" onClick={() => navigate('/place/register')}>
          세부설명 저장
        </BottomActionButton>
      </div>
    </div>
  );
};

export default ConnectingCourseDetail;
