import { useState, useEffect } from 'react';
import BackIcon from '@assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';
import RegionDropdown from '@common/RegionDropdown';

type CompanionType = '연인' | '친구' | '혼자' | '가족' | '지인';

const CourseSave = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionType | null>('연인');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const companionOptions: CompanionType[] = ['연인', '친구', '혼자', '가족', '지인'];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  // 폼 유효성 검사
  useEffect(() => {
    const isValid = selectedDate !== '' && selectedCompanion !== null && selectedRegion !== '';
    setIsFormValid(isValid);
  }, [selectedDate, selectedCompanion, selectedRegion]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <header className="mb-2 grid grid-cols-3 items-center">
        <button type="button" className="cursor-pointer justify-self-start p-2" onClick={handleNavigateBack}>
          <img src={BackIcon} alt="뒤로가기" className="h-6 w-6" />
        </button>
        <h1 className="text-s4 text-neutral-8 text-center">코스 등록</h1>
        <div className="justify-self-end"></div>
      </header>

      <main className="flex flex-col gap-6 py-2 pb-24">
        {/* 날짜 입력 섹션 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="visit-date" className="text-s5 text-neutral-8">
            언제 다녀오셨나요?
            <span className="text-red-6 ml-1">•</span>
          </label>
          <input
            id="visit-date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border-neutral-4 text-d1 text-neutral-8 focus:border-pink-6 w-full rounded-lg border bg-white px-4 py-3 outline-none"
          />
        </div>

        {/* 동행 선택 섹션 */}
        <div className="flex flex-col gap-2">
          <label className="text-s5 text-neutral-8">
            누구와 함께하셨나요?
            <span className="text-red-6 ml-1">•</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {companionOptions.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedCompanion(option)}
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
        <div>
          <RegionDropdown selectedRegion={selectedRegion} onSelect={handleRegionSelect} />
        </div>
      </main>

      {/* 하단 고정 버튼 영역 */}
      <div className="fixed right-0 bottom-8 left-0 mx-auto w-full max-w-md px-4">
        <button
          type="button"
          disabled={!isFormValid}
          className={`text-s4 mx-auto w-full max-w-[362px] rounded-lg px-4 py-3 transition-colors ${
            isFormValid ? 'bg-pink-6 hover:bg-pink-7 text-white' : 'bg-neutral-2 text-neutral-6 cursor-not-allowed'
          }`}
        >
          장소 추가하기
        </button>
      </div>
    </div>
  );
};

export default CourseSave;
