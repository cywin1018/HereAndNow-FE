import PlusIcon from '@assets/icons/plus.svg';

const AddCourse = () => {
  return (
    <div className="border-iceblue-4 bg-iceblue-4 flex w-full items-center justify-between rounded-lg border px-4 py-4">
      <div className="flex flex-col gap-1">
        <span className="text-b4 text-iceblue-8">오늘의 순간,</span>
        <span className="text-b4 text-iceblue-8">누군가의 다음 데이트가 될지도 몰라 :)</span>
      </div>
      <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
        <img src={PlusIcon} alt="추가" className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AddCourse;
