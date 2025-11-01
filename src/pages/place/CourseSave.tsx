import BackIcon from '@assets/icons/back.svg';
import SearchIcon from '@assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';

const CourseSave = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col">
      <header className="mb-2 grid grid-cols-3 items-center">
        <button type="button" className="cursor-pointer justify-self-start p-2" onClick={handleNavigateBack}>
          <img src={BackIcon} alt="뒤로가기" className="h-6 w-6" />
        </button>
        <h1 className="text-s4 text-neutral-8 text-center">장소 추가</h1>
        <div className="justify-self-end"></div>
      </header>

      <main className="flex flex-col py-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-s5 text-neutral-8">주소 검색</h2>
          <div className="border-neutral-4 flex h-12 w-[362px] items-center rounded-lg border bg-white pr-4 pl-4">
            <input
              type="text"
              placeholder="상호명, 주소로 장소 검색"
              className="text-d1 text-neutral-8 placeholder:text-neutral-5 flex-1 border-none bg-transparent outline-none"
            />
            <img src={SearchIcon} alt="검색" className="ml-4 h-5 w-5 flex-shrink-0" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseSave;
