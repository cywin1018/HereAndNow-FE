import bigFolder from '@assets/images/bigFolder.png';
import filterSearchIcon from '@assets/icons/filter_search.svg';
import filterCancelIcon from '@assets/icons/filter_cancel.svg';
import smallFolder from '@assets/images/smallFolder.png';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecentArchive, getCreatedArchives } from 'src/apis/archive/archive';
import { useEffect } from 'react';

// 날짜 포맷팅 함수: "2025-11-05" -> "2025. 11. 05"
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
};

// 며칠 전 계산 함수
const getDaysAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '1일 전';
  return `${diffDays}일 전`;
};

// 태그 색상 매핑 (purple, orange, blue 순환)
const getTagColorClass = (index: number): { bg: string; text: string } => {
  const colors = [
    { bg: 'bg-purple-2', text: 'text-purple-8' },
    { bg: 'bg-orange-2', text: 'text-orange-8' },
    { bg: 'bg-blue-2', text: 'text-blue-8' },
  ];
  return colors[index % colors.length];
};

const ArchivePage = () => {
  const navigate = useNavigate();

  // React Query로 최신 아카이빙 폴더 데이터 가져오기
  const { data: recentArchiveResponse } = useQuery({
    queryKey: ['recentArchive'],
    queryFn: getRecentArchive,
  });

  const recentArchiveData = recentArchiveResponse?.data || null;

  // React Query로 생성한 코스 폴더 리스트 가져오기
  const { data: createdArchivesResponse } = useQuery({
    queryKey: ['createdArchives', { page: 0, size: 32 }],
    queryFn: () => getCreatedArchives({ page: 0, size: 32 }),
  });

  const createdArchives = createdArchivesResponse?.data || [];

  // API 응답 콘솔 출력
  useEffect(() => {
    if (recentArchiveResponse) {
      console.log('getRecentArchive API 응답:', recentArchiveResponse);
      console.log('recentArchiveData:', recentArchiveData);
    }
    if (createdArchivesResponse) {
      console.log('getCreatedArchives API 응답:', createdArchivesResponse);
      console.log('createdArchives:', createdArchives);
    }
  }, [recentArchiveResponse, recentArchiveData, createdArchivesResponse, createdArchives]);

  // 검색바 클릭 핸들러
  const handleSearchClick = () => {
    navigate('/archive/search');
  };

  // 폴더 클릭 핸들러
  const handleFolderClick = (courseId: number) => {
    navigate(`/archive/${courseId}`);
  };

  // 오늘 날짜 포맷팅
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' });
  const month = today.toLocaleDateString('en-US', { month: 'short' });
  const day = today.getDate();

  return (
    <div className="min-h-screen">
      <div className="flex w-full flex-col items-center gap-8">
        {/* 날짜 */}
        <div className="bg-iceblue-2 border-iceblue-2 flex items-center justify-center gap-6 rounded-[50px] border border-solid px-10 py-3">
          <span className="text-s2 text-iceblue-8">{dayOfWeek}</span>
          <span className="text-s2 text-iceblue-8">{month}</span>
          <span className="text-s2 text-iceblue-8">{day}</span>
        </div>

        {/* 폴더 */}
        {recentArchiveData && (
          <>
            <div className="relative h-66.75 w-93">
              <img src={bigFolder} alt="폴더" className="h-full w-full object-cover" />
              {/* 며칠 전 */}
              <span className="text-s2 text-iceblue-1 absolute top-2.75 left-10">
                {getDaysAgo(recentArchiveData.courseVisitDate)}
              </span>

              {/* 개수 */}
              <div className="bg-pink-6 text-s2 absolute top-8 right-6 flex h-9 w-9 items-center justify-center rounded-full text-white">
                {recentArchiveData.commentCount}
              </div>

              {/* 날짜 */}
              <span className="text-s2 text-neutral-10 absolute top-15.5 left-10">
                {formatDate(recentArchiveData.courseVisitDate)}
              </span>

              {/* 사진 */}
              <div className="absolute right-13 bottom-7.5 flex items-center">
                {recentArchiveData.courseImages.slice(0, 3).map((imageUrl, index) => {
                  const zIndexClass = index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10';
                  return (
                    <div
                      key={index}
                      className={`border-neutral-10 ${zIndexClass} ${
                        index < 2 ? '-mr-5.25' : ''
                      } flex h-17.5 w-17.5 items-center justify-center overflow-hidden rounded-full border-[1.75px] border-solid`}
                    >
                      <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 타이틀 / 설명 / 태그 */}
            <div className="flex w-93 flex-col gap-4 px-6.25 py-4">
              {/* 타이틀 */}
              <span className="text-h5 text-neutral-10">{recentArchiveData.courseTitle}</span>

              {/* 설명 */}
              <span className="text-b4 text-iceblue-8">{recentArchiveData.courseDescription}</span>

              {/* 태그 */}
              {/* TODO: 컴포넌트로 분리 */}
              <div className="flex items-center gap-3 overflow-x-visible">
                {recentArchiveData.courseTags.map((tag, index) => {
                  const colorClass = getTagColorClass(index);
                  return (
                    <div
                      key={index}
                      className={`${colorClass.bg} ${colorClass.text} text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap`}
                      style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* 필터 검색 / 폴더 리스트 */}
        <div className="flex w-90.5 flex-col gap-8">
          {/* 필터 검색 */}
          <div className="flex w-full flex-col gap-4">
            {/* 검색 바 */}
            <div
              className="bg-neutral-2 flex h-12 w-full cursor-pointer items-center justify-between rounded-[44px] px-4"
              onClick={handleSearchClick}
            >
              <span className="text-b4 text-neutral-4">찾고 싶은 추억이 있나요?</span>
              <button className="flex h-7 w-7 items-center justify-center">
                <img src={filterSearchIcon} alt="필터 검색" className="h-7 w-7" />
              </button>
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

          {/* 폴더 리스트 */}
          {/* TODO: 컴포넌트로 분리 */}
          {createdArchives.length > 0 && (
            <div className="flex w-full flex-wrap gap-x-5 gap-y-8 px-1.75">
              {createdArchives.map(course => (
                <div
                  key={course.id}
                  className="flex h-26 w-18 cursor-pointer flex-col"
                  onClick={() => handleFolderClick(course.id)}
                >
                  {/* 폴더 */}
                  <div className="relative flex h-18 w-18 items-center justify-center">
                    <img src={smallFolder} alt="폴더" className="h-full w-full object-cover" />

                    {/* 개수 */}
                    <div className="bg-pink-6 text-d4 absolute top-2.5 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-white">
                      {course.commentCount}
                    </div>
                  </div>

                  {/* 타이틀 */}
                  <div className="flex w-full flex-col gap-0.5">
                    <span className="text-d2 text-neutral-10 line-clamp-1 w-17 text-center">{course.courseTitle}</span>
                    <span className="text-d3 text-neutral-5 line-clamp-1 w-17 text-center">
                      {formatDate(course.courseVisitDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
