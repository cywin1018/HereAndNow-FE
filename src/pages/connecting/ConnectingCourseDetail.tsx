import PageHeader from '@common/layout/PageHeader';
import KakaoMap from '@common/KakaoMap';
import DetailSection from './components/DetailSection';

const ConnectingCourseDetail = () => {
  return (
    <div className="">
      <PageHeader title="코스 상세" />
      <div className="relative z-0 w-full overflow-hidden rounded-[24px]">
        <KakaoMap latitude={37.566826} longitude={126.9786567} className="h-[292px] w-full" />

        <div className="absolute top-1 left-1/2 z-20 flex -translate-x-1/2 gap-4">
          <div className="bg-pink-2 border-pink-2 shadow-pink-3/30 flex items-center justify-center gap-6 rounded-[50px] border border-solid px-10 py-3 shadow-lg">
            <span className="text-s2 text-pink-6">Fri</span>
            <span className="text-s2 text-pink-6">Nov</span>
            <span className="text-s2 text-pink-6">7</span>
          </div>
        </div>
      </div>
      <div className="flex w-93 flex-col gap-4 py-[32px]">
        <div className="flex flex-col gap-2">
          <img src="/public/dummy_course_detail.png" alt="코스 상세" className="h-full w-full object-cover" />
        </div>
        <span className="text-h5 text-neutral-10">우리의 첫 도쿄</span>

        <span className="text-b4 text-iceblue-8">
          엔화 미리 환전할 걸 까먹고 공항에서 했는데 미리 하는게 훨씬 낫다는 걸 이제 알았다..괜찮아 배워가는겨
        </span>

        {/* TODO: 컴포넌트로 분리 */}
        <div className="flex items-center gap-3 overflow-x-visible">
          <div
            className="bg-purple-2 text-purple-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            사진 찍기 좋아요
          </div>
          <div
            className="bg-orange-2 text-orange-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            음식이 맛있어요
          </div>
          <div
            className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            시설이 깨끗해요
          </div>
          <div
            className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            시설이 깨끗해요
          </div>
          <div
            className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
            style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
          >
            시설이 깨끗해요
          </div>
        </div>
        <DetailSection />
      </div>
    </div>
  );
};

export default ConnectingCourseDetail;
