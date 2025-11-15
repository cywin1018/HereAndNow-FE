import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '@common/layout/PageHeader';
import ConfirmAddressBottomSheet from './components/ConfirmAddressBottomSheet';
import type { AddressData } from './types';

interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  place_url: string;
  x: string; // 경도
  y: string; // 위도
  distance: string;
}

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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<KakaoPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 카카오 로컬 검색 API 호출
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('검색어를 입력해주세요');
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        params: {
          query: searchQuery,
          size: 15, // 최대 15개
        },
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`,
        },
      });

      console.log('[AddPlacePage] 검색 결과:', response.data);
      setSearchResults(response.data.documents || []);
    } catch (error) {
      console.error('[AddPlacePage] 검색 실패:', error);
      alert('장소 검색에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSearching(false);
    }
  };

  // 장소 선택
  const handlePlaceSelect = (place: KakaoPlace) => {
    console.log('[AddPlacePage] 선택된 장소:', place);

    // AddressData 형식으로 변환
    const formattedData: AddressData = {
      zonecode: '', // 카카오 검색에서는 우편번호 정보 없음
      address: place.address_name,
      addressType: 'R',
      bname: place.address_name.split(' ')[2] || '', // 대략적인 동네 이름
      buildingName: place.place_name,
      fullAddress: place.road_address_name || place.address_name,
    };

    setSelectedAddress(formattedData);
    setPlaceName(place.place_name);
    setCoordinates({
      latitude: Number(place.y),
      longitude: Number(place.x),
    });
    setIsSearchModalOpen(false);
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
    setSearchQuery('');
    setSearchResults([]);
    setCoordinates({ latitude: 37.566826, longitude: 126.9786567 });
  };

  const handleConfirm = (pinIndex: number) => {
    if (!selectedAddress) {
      return;
    }

    const statePayload = {
      address: selectedAddress,
      placeName,
      detailAddress,
      coordinates,
      pinIndex, // 새로 추가된 핀의 인덱스
    };

    console.log('[AddPlacePage] PlaceDetail로 이동:', {
      pinIndex,
      placeName,
    });

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
          <h2 className="text-s5 text-neutral-8">장소 검색</h2>
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="text-d1 text-neutral-8 border-neutral-4 hover:bg-neutral-2 w-full rounded-lg border bg-white px-4 py-3 text-left transition-colors"
          >
            {selectedAddress?.fullAddress || '장소를 검색하세요'}
          </button>
        </div>

        {selectedAddress && !isBottomSheetOpen && (
          <button
            type="button"
            onClick={() => setIsBottomSheetOpen(true)}
            className="border-neutral-4 hover:bg-neutral-2 flex w-full flex-col gap-2 rounded-lg border bg-white p-4 text-left transition-colors"
          >
            <h3 className="text-s6 text-neutral-8">선택된 장소</h3>
            <div className="flex flex-col gap-1">
              <div className="text-d1 text-neutral-8">
                <span className="text-d2 text-neutral-5">장소명: </span>
                {placeName}
              </div>
              <div className="text-d1 text-neutral-8">
                <span className="text-d2 text-neutral-5">주소: </span>
                {selectedAddress.fullAddress}
              </div>
            </div>
          </button>
        )}
      </main>

      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[80vh] w-full max-w-[500px] flex-col rounded-2xl bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-s4 text-neutral-8">장소 검색</h2>
              <button
                type="button"
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="text-d1 text-neutral-6 hover:text-neutral-8"
              >
                닫기
              </button>
            </div>

            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
                placeholder="장소명을 입력하세요"
                className="border-neutral-4 focus:border-pink-6 flex-1 rounded-lg border bg-white px-4 py-3 outline-none"
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-pink-6 hover:bg-pink-7 disabled:bg-neutral-4 rounded-lg px-6 py-3 text-white"
              >
                {isSearching ? '검색중...' : '검색'}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {searchResults.map(place => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => handlePlaceSelect(place)}
                      className="border-neutral-3 hover:bg-neutral-1 flex flex-col gap-1 rounded-lg border bg-white p-4 text-left transition-colors"
                    >
                      <div className="text-d1 text-neutral-8 font-semibold">{place.place_name}</div>
                      <div className="text-b4 text-neutral-6">{place.category_name}</div>
                      <div className="text-b4 text-neutral-6">{place.road_address_name || place.address_name}</div>
                      {place.phone && <div className="text-b4 text-neutral-6">{place.phone}</div>}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-neutral-6 flex h-40 items-center justify-center">
                  {isSearching ? '검색 중...' : '장소를 검색해주세요'}
                </div>
              )}
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
