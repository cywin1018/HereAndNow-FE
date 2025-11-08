import { useState } from 'react';
import BackIcon from '@assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';
import AddressSearch from '@common/AddressSearch';
import BottomSheet from '@common/BottomSheet';
import KakaoMap from '@common/KakaoMap';

interface AddressData {
  zonecode: string;
  address: string;
  addressType: string;
  bname?: string;
  buildingName?: string;
  fullAddress: string;
}

const AddPlacePage = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleAddressComplete = (data: AddressData) => {
    setSelectedAddress(data);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleReregister = () => {
    setIsBottomSheetOpen(false);
    setSelectedAddress(null);
    setPlaceName('');
    setDetailAddress('');
  };

  const handleConfirm = () => {
    // 여기에 등록 로직 추가
    console.log('장소 등록:', {
      address: selectedAddress,
      placeName,
      detailAddress,
    });
    setIsBottomSheetOpen(false);
  };

  // 주소를 좌표로 변환 (임시로 기본 좌표 사용, 실제로는 Geocoder API 사용)
  const getCoordinates = () => {
    // 실제로는 카카오 Geocoder API를 사용하여 주소를 좌표로 변환해야 함
    // 임시로 강남역 좌표 사용
    return { latitude: 37.566826, longitude: 126.9786567 };
  };

  const coordinates = selectedAddress ? getCoordinates() : { latitude: 37.566826, longitude: 126.9786567 };

  // 도로명 주소와 지번 주소 구분
  const roadAddress = selectedAddress?.address || '';
  const oldAddress = selectedAddress?.bname ? `서울 ${selectedAddress.bname} ${selectedAddress.zonecode}` : '';

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <header className="mb-2 grid grid-cols-3 items-center">
        <button type="button" className="cursor-pointer justify-self-start p-2" onClick={handleNavigateBack}>
          <img src={BackIcon} alt="뒤로가기" className="h-6 w-6" />
        </button>
        <h1 className="text-s4 text-neutral-8 text-center">장소 추가</h1>
        <div className="justify-self-end"></div>
      </header>

      <main className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-s5 text-neutral-8">주소 검색</h2>
          <AddressSearch onComplete={handleAddressComplete} className="w-full" />
        </div>

        {selectedAddress && !isBottomSheetOpen && (
          <button
            type="button"
            onClick={() => setIsBottomSheetOpen(true)}
            className="border-neutral-4 hover:bg-neutral-2 flex w-full flex-col gap-2 rounded-lg border bg-white p-4 text-left transition-colors"
          >
            <h3 className="text-s6 text-neutral-8">검색 결과</h3>
            <div className="flex flex-col gap-1">
              <div className="text-d1 text-neutral-8">
                <span className="text-d2 text-neutral-5">우편번호: </span>
                {selectedAddress.zonecode}
              </div>
              <div className="text-d1 text-neutral-8">
                <span className="text-d2 text-neutral-5">주소: </span>
                {selectedAddress.fullAddress}
              </div>
            </div>
          </button>
        )}
      </main>

      {/* 바텀시트 */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <div className="flex flex-col gap-4 px-4">
          {/* 제목 */}
          <h2 className="text-s4 text-neutral-8">이 장소가 맞나요?</h2>

          {/* 지도 영역 */}
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <KakaoMap
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              level={3}
              className="h-full w-full"
              showMarker={true}
              showHeartButton={false}
            />
            {/* 장소명 오버레이 */}
            {placeName && (
              <div className="border-pink-6 absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-lg border-2 bg-white px-3 py-1 shadow-lg">
                <span className="text-b3 text-pink-6">{placeName}</span>
              </div>
            )}
          </div>

          {/* 주소 정보 */}
          <div className="flex flex-col gap-2">
            <div className="text-b3 text-neutral-8">{roadAddress}</div>
            {oldAddress && <div className="text-d1 text-neutral-5">{oldAddress}</div>}
          </div>

          {/* 상세 주소 입력 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="detail-address" className="text-s6 text-neutral-8">
              상세 주소
            </label>
            <input
              id="detail-address"
              type="text"
              value={detailAddress}
              onChange={e => setDetailAddress(e.target.value)}
              placeholder="1-3층"
              className="border-neutral-4 bg-neutral-2 text-d1 text-neutral-8 placeholder:text-neutral-5 focus:border-pink-6 rounded-lg border px-4 py-3 outline-none"
            />
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3 pb-4">
            <button
              type="button"
              onClick={handleReregister}
              className="border-neutral-4 text-b3 text-neutral-8 hover:bg-neutral-2 flex-1 rounded-lg border bg-white px-4 py-3 transition-colors"
            >
              다시 입력하기
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-pink-6 text-b3 hover:bg-pink-7 flex-1 rounded-lg px-4 py-3 text-white transition-colors"
            >
              이대로 등록
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default AddPlacePage;
