import exploreSearchIcon from '@assets/icons/explore_search.svg';
import exploreBackIcon from '@assets/icons/explore_back.svg';
import filterCancelIcon from '@assets/icons/filter_cancel.svg';
import { useNavigate } from 'react-router-dom';
import CourseCard from '@pages/home/components/CourseCard';

const ExploreCoursePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="flex w-full flex-col py-[54px]">
        {/* 필터링 */}
        <div className="flex w-full flex-col gap-4">
          {/* 검색 바 */}
          <div className="flex h-12 max-h-12 min-h-12 w-full items-center gap-4">
            {/* 뒤로가기 버튼 */}
            <button
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white"
              style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}
              onClick={() => navigate(-1)}
            >
              <img src={exploreBackIcon} alt="뒤로가기" className="h-6 w-6" />
            </button>

            {/* 검색 바 */}
            <div
              className="flex h-full flex-1 cursor-pointer items-center justify-between rounded-[44px] bg-white px-4"
              style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}
              onClick={() => navigate('/explore/search')}
            >
              <input
                type="text"
                placeholder="찾고 싶은 장소가 있나요?"
                className="text-b4 placeholder:text-neutral-4 h-full w-full focus:outline-none"
              />
              <button className="flex h-7 w-7 cursor-pointer items-center justify-center">
                <img src={exploreSearchIcon} alt="검색" className="h-7 w-7" />
              </button>
            </div>
          </div>

          {/* 필터 리스트 */}
          {/* TODO: 컴포넌트로 분리 */}
          <div className="flex w-full items-center gap-1 overflow-x-visible">
            <div className="border-neutral-3 flex h-9 items-center gap-1 rounded-[50px] border-[0.5px] border-solid bg-white pr-3 pl-1.5 whitespace-nowrap">
              {/* 삭제 버튼 */}
              <div className="flex h-6 w-6 items-center justify-center">
                <img src={filterCancelIcon} alt="삭제" className="h-6 w-6" />
              </div>

              {/* 필터 이름 */}
              <span className="text-d1 text-neutral-4">별점</span>

              {/* 필터 값 */}
              <span className="text-d1 text-neutral-6">5점</span>
            </div>
            <div className="border-neutral-3 flex h-9 items-center gap-1 rounded-[50px] border-[0.5px] border-solid bg-white pr-3 pl-1.5 whitespace-nowrap">
              {/* 삭제 버튼 */}
              <div className="flex h-6 w-6 items-center justify-center">
                <img src={filterCancelIcon} alt="삭제" className="h-6 w-6" />
              </div>

              {/* 필터 이름 */}
              <span className="text-d1 text-neutral-4">언제</span>

              {/* 필터 값 */}
              <span className="text-d1 text-neutral-6">2025.09 ~</span>
            </div>
            <div className="border-neutral-3 flex h-9 items-center gap-1 rounded-[50px] border-[0.5px] border-solid bg-white pr-3 pl-1.5 whitespace-nowrap">
              {/* 삭제 버튼 */}
              <div className="flex h-6 w-6 items-center justify-center">
                <img src={filterCancelIcon} alt="삭제" className="h-6 w-6" />
              </div>

              {/* 필터 이름 */}
              <span className="text-d1 text-neutral-4">누구와</span>

              {/* 필터 값 */}
              <span className="text-d1 text-neutral-6">친구</span>
            </div>
            <div className="border-neutral-3 flex h-9 items-center gap-1 rounded-[50px] border-[0.5px] border-solid bg-white pr-3 pl-1.5 whitespace-nowrap">
              {/* 삭제 버튼 */}
              <div className="flex h-6 w-6 items-center justify-center">
                <img src={filterCancelIcon} alt="삭제" className="h-6 w-6" />
              </div>

              {/* 필터 이름 */}
              <span className="text-d1 text-neutral-4">누구와</span>

              {/* 필터 값 */}
              <span className="text-d1 text-neutral-6">친구</span>
            </div>
          </div>

          {/* 태그 리스트 */}
          <div className="flex w-full items-center gap-2 overflow-x-visible">
            <div className="bg-purple-2 text-d1 text-purple-8 flex h-8 items-center justify-center rounded-sm px-2.5 whitespace-nowrap">
              사진 찍기 좋아요
            </div>
            <div className="bg-orange-2 text-d1 text-orange-8 flex h-8 items-center justify-center rounded-sm px-2.5 whitespace-nowrap">
              음식이 맛있어요
            </div>
            <div className="bg-blue-2 text-d1 text-blue-8 flex h-8 items-center justify-center rounded-sm px-2.5 whitespace-nowrap">
              시설이 깨끗해요
            </div>
            <div className="bg-green-2 text-d1 text-green-8 flex h-8 items-center justify-center rounded-sm px-2.5 whitespace-nowrap">
              친절해요
            </div>
          </div>
        </div>

        {/* 코스 리스트 */}
        <div className="mt-8 flex w-full flex-col gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <CourseCard
              profileImageUrl="/dummy_profile.png"
              authorName="홍**"
              title="아직 어색한 사이인 커플을 위한 감성 충만 코스"
              location="강남"
              placeCount={5}
              tags={['음식이 맛있어요', '사진 찍기 좋아요']}
              hasComments
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCoursePage;
