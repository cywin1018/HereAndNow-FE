import { useState } from 'react';
import StarRatingFilter from '@common/components/StarRatingFilter';
import TagSelector from '@common/components/TagSelector';
import Modal from '@common/components/Modal';
import { useNavigate } from 'react-router-dom';
import RegionDropdown from '@common/RegionDropdown';

type CompanionType = '연인' | '친구' | '혼자' | '가족' | '지인';

const companionOptions: CompanionType[] = ['연인', '친구', '혼자', '가족', '지인'];

const ExploreSearchPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionType | null>('연인');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [isCoupleModalOpen, setIsCoupleModalOpen] = useState(false);

  // 언제 다녀오셨나요? 선택 핸들러
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // 누구와 함께하셨나요? 선택 핸들러
  const handleCompanionClick = (option: CompanionType) => {
    setSelectedCompanion(option);
    if (option === '연인') {
      setIsCoupleModalOpen(true);
    }
  };

  // 어느 지역 인가요? 선택 핸들러
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div className="bg-neutral-1 flex min-h-screen flex-col">
      <span className="text-h4 text-neutral-10 py-8">찾고 싶은 추억이 있나요?</span>

      {/* 검색 필터 리스트 */}
      <div className="flex w-full flex-col gap-8">
        <StarRatingFilter rating={rating} onRatingChange={setRating} title="별점으로 찾아볼까요?" />
      </div>

      {/* 필터 리스트 */}
      {/* TODO: 퍼블리싱 새로 해야함 (현재는 빠른 개발을 위해 일단 넘어감) */}
      <div className="flex w-full flex-col gap-8">
        {/* 생각나는 키워드가 있나요? */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">생각나는 키워드가 있나요?</span>

          {/* TODO: 퍼블리싱 새로 해야함 (현재는 빠른 개발을 위해 일단 넘어감) */}
          <TagSelector options={['선물', '추억', '기념일', '연인', '친구']} maxSelected={3} />
        </div>

        {/* 언제 다녀오셨나요? */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">언제 다녀오셨나요?</span>
          <input
            id="visit-date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border-neutral-4 text-d1 text-neutral-8 focus:border-pink-6 w-full rounded-lg border bg-white px-4 py-3 outline-none"
          />
        </div>

        {/* 누구와 함께하셨나요? */}
        <div className="flex w-full flex-col gap-2">
          <label className="text-d1 text-iceblue-8">
            누구와 함께하셨나요?
            <span className="text-red-6 ml-1">•</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {companionOptions.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => handleCompanionClick(option)}
                className={`text-d1 rounded-lg px-4 py-2 transition-colors ${
                  selectedCompanion === option
                    ? 'bg-neutral-6 text-white'
                    : 'border-neutral-4 bg-neutral-2 text-neutral-6 border'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 어느 지역 인가요? */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">어느 지역 인가요?</span>
          <RegionDropdown selectedRegion={selectedRegion} onSelect={handleRegionSelect} className="w-full" />
        </div>

        {/* 어디에 다녀오셨나요? */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">어디에 다녀오셨나요?</span>
          <TagSelector
            options={[
              '관광명소',
              '숙박',
              '음식점',
              '카페',
              '문화시설',
              '중개업소',
              '공공기관',
              '병원',
              '약국',
              '편의점',
              '대형마트',
              '어린이집, 유치원',
              '학교',
              '학원',
              '주차장',
              '주유소, 충전소',
              '지하철역',
              '은행',
            ]}
            maxSelected={3}
          />
        </div>

        {/* 분위기는 어떠셨나요? */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">분위기는 어떠셨나요?</span>
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
            maxSelected={3}
          />
        </div>

        {/* 음식/가격은 어떠셨나요? */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">음식/가격은 어떠셨나요?</span>
          <TagSelector options={['음식이 맛있어요', '메뉴가 다양해요', '특별한 메뉴가 있어요']} maxSelected={3} />
        </div>

        {/* 시설은 어떠셨나요? */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">시설은 어떠셨나요?</span>
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
            maxSelected={3}
          />
        </div>

        {/* 기타사항 */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-d1 text-iceblue-8">기타사항</span>
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
            maxSelected={3}
          />
        </div>
      </div>

      {/* 검색하기 버튼 */}
      <div className="mt-[49px] w-full py-5">
        <button
          type="button"
          className="bg-pink-6 text-s5 flex h-13.5 w-full items-center justify-center rounded-[12px] text-white"
          onClick={() => navigate('/archive/1')}
        >
          검색하기
        </button>
      </div>

      <Modal
        isOpen={isCoupleModalOpen}
        onClose={() => setIsCoupleModalOpen(false)}
        mainMessage="연인을 초대해주세요"
        subMessage="커넥팅 화면에서 연인을 초대 후 이용 가능해요"
        leftButtonText="홈으로"
        leftButtonOnClick={() => {
          setIsCoupleModalOpen(false);
          navigate('/');
        }}
        rightButtonText="연인 초대하기"
        rightButtonOnClick={() => {
          setIsCoupleModalOpen(false);
        }}
      />
    </div>
  );
};

export default ExploreSearchPage;
