import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import BottomSheet from '@common/BottomSheet';
import KakaoMap from '@common/KakaoMap';
import PageHeader from '@common/layout/PageHeader';

interface AddressData {
  zonecode: string;
  address: string;
  addressType: string;
  bname?: string;
  buildingName?: string;
  fullAddress: string;
}

type AddressSearchResultItem = {
  x: string;
  y: string;
  [key: string]: unknown;
};

type AddressSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

const AddPlacePage = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>({
    latitude: 37.566826,
    longitude: 126.9786567,
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    const formattedData: AddressData = {
      zonecode: data.zonecode,
      address: data.address,
      addressType: data.addressType,
      bname: data.bname,
      buildingName: data.buildingName,
      fullAddress,
    };

    setSelectedAddress(formattedData);
    setPlaceName(data.buildingName || data.address);
    setIsAddressModalOpen(false);
    setIsBottomSheetOpen(true);

    if (window.kakao?.maps?.services) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      console.log('[AddPlacePage] 주소 검색 완료:', formattedData);
      geocoder.addressSearch(
        formattedData.fullAddress,
        (result: AddressSearchResultItem[], status: AddressSearchStatus) => {
          console.log('[AddPlacePage] 지오코딩 결과:', { status, result });
          if (status === 'OK' && result[0]) {
            const { x, y } = result[0];
            setCoordinates({ latitude: Number(y), longitude: Number(x) });
          } else {
            console.warn('[AddPlacePage] 지오코딩 실패:', status);
          }
        },
      );
    } else {
      console.warn('[AddPlacePage] Kakao 지도 SDK가 아직 준비되지 않았습니다.');
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleReregister = () => {
    setIsBottomSheetOpen(false);
    setSelectedAddress(null);
    setPlaceName('');
    setDetailAddress('');
    setCoordinates({ latitude: 37.566826, longitude: 126.9786567 });
  };

  const handleConfirm = () => {
    if (!selectedAddress) {
      console.warn('[AddPlacePage] 선택된 주소가 없어 상세 페이지로 이동하지 못했습니다.');
      return;
    }

    const statePayload = {
      address: selectedAddress,
      placeName,
      detailAddress,
      coordinates,
    };

    console.log('[AddPlacePage] 장소 등록 버튼 클릭, 상세 페이지로 이동:', statePayload);
    setIsBottomSheetOpen(false);
    navigate(`/place/detail/${encodeURIComponent(selectedAddress.zonecode)}`, {
      state: statePayload,
    });
  };

  // 도로명 주소와 지번 주소 구분
  const roadAddress = selectedAddress?.address || '';
  const oldAddress = selectedAddress?.bname ? `서울 ${selectedAddress.bname} ${selectedAddress.zonecode}` : '';

  useEffect(() => {
    console.log('[AddPlacePage] 현재 좌표 상태:', coordinates);
  }, [coordinates]);

  return (
    <div className="flex w-full flex-col">
      <PageHeader title="장소 추가" />

      <main className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-s5 text-neutral-8">주소 검색</h2>
          <button
            type="button"
            onClick={() => setIsAddressModalOpen(true)}
            className="text-d1 text-neutral-8 border-neutral-4 hover:bg-neutral-2 w-full rounded-lg border bg-white px-4 py-3 text-left transition-colors"
          >
            {selectedAddress?.fullAddress || '주소를 검색하세요'}
          </button>
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

      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-[402px] rounded-2xl bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-s4 text-neutral-8">주소 검색</h2>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="text-d1 text-neutral-6 hover:text-neutral-8"
              >
                닫기
              </button>
            </div>
            <div className="border-neutral-4 overflow-hidden rounded-xl border">
              <DaumPostcode
                onComplete={handleAddressComplete}
                onClose={() => setIsAddressModalOpen(false)}
                autoClose={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* 바텀시트 */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <div className="flex flex-col gap-4 px-[20px]">
          <h2 className="text-b3 text-iceblue-8">이 장소가 맞나요?</h2>

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
            {placeName && (
              <div className="border-pink-6 absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-lg border bg-white px-[8px] py-[4px] shadow-lg">
                <span className="text-d2 text-iceblue-8">{placeName}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-s1 text-iceblue-8">{roadAddress}</div>
            {oldAddress && <div className="text-b4 text-iceblue-8">{oldAddress}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="detail-address" className="text-b4 text-iceblue-8">
              상세 주소
            </label>
            <input
              id="detail-address"
              type="text"
              value={detailAddress}
              onChange={e => setDetailAddress(e.target.value)}
              placeholder="1-3층"
              className="border-iceblue-3 bg-iceblue-2 text-d1 text-neutral-8 placeholder:text-neutral-5 focus:border-pink-6 rounded-lg border px-4 py-3 outline-none"
            />
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3 py-[20px]">
            <button
              type="button"
              onClick={handleReregister}
              className="text-s5 text-iceblue-7 bg-iceblue-2 flex-1 rounded-[12px] p-[10px] transition-colors"
            >
              다시 입력하기
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-pink-6 text-s4 flex-1 rounded-[12px] p-[10px] text-white transition-colors"
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
