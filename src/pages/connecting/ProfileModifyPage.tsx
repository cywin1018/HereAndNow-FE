import { useMemo, useState } from 'react';
import PageHeader from '@common/layout/PageHeader';
import PlusCircleIcon from '@assets/icons/bx_plus-circle.svg';
import SelectBox from '@common/components/SelectBox';
import BottomActionButton from '@common/button/BottomActionButton';
import { useNavigate } from 'react-router-dom';

const years = Array.from({ length: 60 }, (_, idx) => new Date().getFullYear() - idx);
const months = Array.from({ length: 12 }, (_, idx) => idx + 1);
const days = Array.from({ length: 31 }, (_, idx) => idx + 1);

const ProfileModifyPage = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const navigate = useNavigate();
  const dayOptions = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
  }, [selectedYear, selectedMonth]);

  return (
    <div className="flex w-full flex-col pb-24">
      <PageHeader title="수정" />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-d1 text-neutral-6">처음 만난 날</span>
          <div className="flex gap-3">
            <SelectBox
              value={selectedYear}
              onChange={value => setSelectedYear(Number(value))}
              options={years.map(year => ({ label: String(year), value: year }))}
            />
            <SelectBox
              value={selectedMonth}
              onChange={value => setSelectedMonth(Number(value))}
              options={months.map(month => ({
                label: month.toString().padStart(2, '0'),
                value: month,
              }))}
            />
            <SelectBox
              value={selectedDay}
              onChange={value => setSelectedDay(Number(value))}
              options={dayOptions.map(day => ({
                label: day.toString().padStart(2, '0'),
                value: day,
              }))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-d1 text-neutral-6">커버 이미지</span>
          <button
            type="button"
            className="border-iceblue-6 flex w-full items-center justify-center rounded-[8px] border border-dashed bg-white/60 px-5 py-6 transition hover:border-purple-200 hover:bg-purple-50"
          >
            <div className="flex flex-col items-center gap-3 rounded-[20px] px-[20px] py-4">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full">
                <img src={PlusCircleIcon} alt="커버 이미지 추가" className="h-[32px] w-[32px]" />
              </div>
              <span className="text-d1 text-iceblue-5">커버 이미지 추가하기</span>
            </div>
          </button>
        </div>
        <BottomActionButton type="button" onClick={() => navigate('/connecting')}>
          저장
        </BottomActionButton>
      </section>
    </div>
  );
};

export default ProfileModifyPage;
