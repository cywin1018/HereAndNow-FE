import bigFolder from '@assets/images/bigFolder.png';
import filterSearchIcon from '@assets/icons/filter_search.svg';
import filterCancelIcon from '@assets/icons/filter_cancel.svg';
import smallFolder from '@assets/images/smallFolder.png';

const ArchivePage = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* TODO: overflow-hidden 어디에 넣을지 상의해야함 */}
      <div className="flex w-full flex-col items-center gap-8">
        {/* 날짜 */}
        <div className="bg-iceblue-2 border-iceblue-2 flex items-center justify-center gap-6 rounded-[50px] border border-solid px-10 py-3">
          <span className="text-s2 text-iceblue-8">Fri</span>
          <span className="text-s2 text-iceblue-8">Nov</span>
          <span className="text-s2 text-iceblue-8">7</span>
        </div>

        {/* 폴더 */}
        <div className="relative h-66.75 w-93">
          <img src={bigFolder} alt="폴더" className="h-full w-full object-cover" />
          {/* 며칠 전 */}
          <span className="text-s2 text-iceblue-1 absolute top-2.75 left-10">2일 전</span>

          {/* 개수 */}
          <div className="bg-pink-6 text-s2 absolute top-8 right-6 flex h-9 w-9 items-center justify-center rounded-full text-white">
            4
          </div>

          {/* 날짜 */}
          <span className="text-s2 text-neutral-10 absolute top-15.5 left-10">2025. 11. 05</span>

          {/* 사진 */}
          <div className="absolute right-13 bottom-7.5 flex items-center">
            <div className="border-neutral-10 z-30 -mr-5.25 flex h-17.5 w-17.5 items-center justify-center overflow-hidden rounded-full border-[1.75px] border-solid">
              <img src="/public/dummy_placecard.png" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="border-neutral-10 z-20 -mr-5.25 flex h-17.5 w-17.5 items-center justify-center overflow-hidden rounded-full border-[1.75px] border-solid">
              <img src="/public/dummy_placecard.png" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="border-neutral-10 z-10 flex h-17.5 w-17.5 items-center justify-center overflow-hidden rounded-full border-[1.75px] border-solid">
              <img src="/public/dummy_placecard.png" alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* 타이틀 / 설명 / 태그 */}
        <div className="flex w-93 flex-col gap-4 px-6.25 py-4">
          {/* 타이틀 */}
          <span className="text-h5 text-neutral-10">성수동 주말, 오랜만에 만난 친구와 완벽한 하루</span>

          {/* 설명 */}
          <span className="text-b4 text-iceblue-8">
            처음 가본 성수동은 신기한 동네다. 한국인데 해외같고, 음식도 다 맛있어서 또 오고 싶어!
          </span>

          {/* 태그 */}
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
        </div>

        {/* 필터 검색 / 폴더 리스트 */}
        <div className="flex w-90.5 flex-col gap-8">
          {/* 필터 검색 */}
          <div className="flex w-full flex-col gap-4">
            {/* 검색 바 */}
            <div className="bg-neutral-2 flex h-12 w-full cursor-pointer items-center justify-between rounded-[44px] px-4">
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
          <div className="flex w-full flex-wrap gap-x-5 gap-y-8 px-1.75">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="flex h-26 w-18 flex-col">
                {/* 폴더 */}
                <div key={index} className="relative flex h-18 w-18 items-center justify-center">
                  <img src={smallFolder} alt="폴더" className="h-full w-full object-cover" />

                  {/* 개수 */}
                  <div className="bg-pink-6 text-d4 absolute top-2.5 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-white">
                    4
                  </div>
                </div>

                {/* 타이틀 */}
                <div className="flex w-full flex-col gap-0.5">
                  <span className="text-d2 text-neutral-10 line-clamp-1 w-17 text-center">강남에서 보내던 하루</span>
                  <span className="text-d3 text-neutral-5 line-clamp-1 w-17 text-center">2025. 11. 02</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
