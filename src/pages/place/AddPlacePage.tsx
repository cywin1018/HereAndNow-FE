import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import PageHeader from '@common/layout/PageHeader';
import useEnsureKakaoMapsReady from '../../hooks/course/useEnsureKakaoMapsReady';
import ConfirmAddressBottomSheet from './components/ConfirmAddressBottomSheet';
import type { AddressData } from './types';

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
  const ensureKakaoMapsReady = useEnsureKakaoMapsReady();

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

    ensureKakaoMapsReady()
      .then(() => {
        if (!window.kakao?.maps?.services) {
          return;
        }
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          formattedData.fullAddress,
          (result: AddressSearchResultItem[], status: AddressSearchStatus) => {
            if (status === 'OK' && result[0]) {
              const { x, y } = result[0];
              setCoordinates({ latitude: Number(y), longitude: Number(x) });
            } else {
              console.warn('[AddPlacePage] 지오코딩 실패:', status);
            }
          },
        );
      })
      .catch(() => {});
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
      return;
    }

    const statePayload = {
      address: selectedAddress,
      placeName,
      detailAddress,
      coordinates,
    };

    setIsBottomSheetOpen(false);
    navigate(`/place/detail/${encodeURIComponent(selectedAddress.zonecode)}`, {
      state: statePayload,
    });
  };

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

      <ConfirmAddressBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onReregister={handleReregister}
        onConfirm={handleConfirm}
        coordinates={coordinates}
        placeName={placeName}
        address={selectedAddress}
        detailAddress={detailAddress}
        onDetailAddressChange={setDetailAddress}
      />
    </div>
  );
};

export default AddPlacePage;
