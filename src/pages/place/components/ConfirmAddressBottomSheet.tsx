import { useEffect, useState } from 'react';
import BottomSheet from '@common/BottomSheet';
import KakaoMap from '@common/KakaoMap';
import type { AddressData } from '../types';
import { useCourseSaveStore } from '@stores/course-save';
import type { Place, Pin } from '@stores/course-save';
import useEnsureKakaoMapsReady from '../../../hooks/course/useEnsureKakaoMapsReady';

interface ConfirmAddressBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onReregister: () => void;
  onConfirm: (pinIndex: number) => void;
  coordinates: { latitude: number; longitude: number };
  placeName: string;
  address: AddressData | null;
  detailAddress: string;
  onDetailAddressChange: (value: string) => void;
}

const ConfirmAddressBottomSheet = ({
  isOpen,
  onClose,
  onReregister,
  onConfirm,
  coordinates,
  placeName,
  address,
  detailAddress,
  onDetailAddressChange,
}: ConfirmAddressBottomSheetProps) => {
  const { addPin, courseData } = useCourseSaveStore();
  const ensureKakaoMapsReady = useEnsureKakaoMapsReady();
  const [placeDetails, setPlaceDetails] = useState<{
    category: string;
    groupCode: string;
    url: string;
  } | null>(null);

  // 카카오 맵 API로 장소 정보 검색
  useEffect(() => {
    if (!isOpen || !coordinates || !placeName) return;

    ensureKakaoMapsReady()
      .then(() => {
        if (!window.kakao?.maps?.services) return;

        const ps = new window.kakao.maps.services.Places();

        // 키워드 검색 콜백
        const searchCallback = (result: any[], status: any) => {
          console.log('[ConfirmAddressBottomSheet] 카카오 장소 검색 결과:', {
            status,
            resultCount: result?.length,
            results: result,
          });

          // 각 검색 결과의 상세 정보 출력
          if (result && result.length > 0) {
            console.log('[ConfirmAddressBottomSheet] 검색된 장소 목록:');
            result.forEach((place, index) => {
              console.log(`  [${index}] ${place.place_name}:`, {
                id: place.id,
                place_name: place.place_name,
                category_name: place.category_name,
                category_group_code: place.category_group_code,
                category_group_name: place.category_group_name,
                phone: place.phone,
                address_name: place.address_name,
                road_address_name: place.road_address_name,
                place_url: place.place_url,
                x: place.x, // 경도
                y: place.y, // 위도
                distance: place.distance,
                전체객체: place,
              });
            });
          }

          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            // 좌표와 가장 가까운 장소 찾기
            const closest = result.reduce((prev, curr) => {
              const prevDist = Math.sqrt(
                Math.pow(Number(prev.y) - coordinates.latitude, 2) +
                  Math.pow(Number(prev.x) - coordinates.longitude, 2),
              );
              const currDist = Math.sqrt(
                Math.pow(Number(curr.y) - coordinates.latitude, 2) +
                  Math.pow(Number(curr.x) - coordinates.longitude, 2),
              );
              return currDist < prevDist ? curr : prev;
            });

            console.log('[ConfirmAddressBottomSheet] 선택된 장소:', {
              placeName: closest.place_name,
              category: closest.category_name,
              groupCode: closest.category_group_code,
              url: closest.place_url,
            });

            setPlaceDetails({
              category: closest.category_name || '',
              groupCode: closest.category_group_code || '',
              url: closest.place_url || '',
            });
          } else {
            console.warn('[ConfirmAddressBottomSheet] 장소 검색 결과 없음');
            setPlaceDetails({
              category: '',
              groupCode: '',
              url: '',
            });
          }
        };

        // 장소명으로 키워드 검색 (반경 1km 이내)
        const searchOptions = {
          location: new window.kakao.maps.LatLng(coordinates.latitude, coordinates.longitude),
          radius: 1000, // 1km
        };

        ps.keywordSearch(placeName, searchCallback, searchOptions);
      })
      .catch(error => {
        console.error('[ConfirmAddressBottomSheet] 카카오 맵 API 에러:', error);
      });
  }, [isOpen, coordinates, placeName, ensureKakaoMapsReady]);

  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDetailAddressChange(event.target.value);
  };

  const handleConfirmClick = () => {
    if (!address || !placeName) {
      return;
    }

    // Place 정보 구성
    const fullStreetAddress = detailAddress ? `${address.address} ${detailAddress}` : address.address;
    const fullNumberAddress = address.bname
      ? `서울시 ${address.bname} ${address.zonecode}${detailAddress ? ` ${detailAddress}` : ''}`
      : '';

    const place: Place = {
      placeName,
      placeStreetNameAddress: fullStreetAddress,
      placeNumberAddress: fullNumberAddress,
      placeLatitude: coordinates.latitude,
      placeLongitude: coordinates.longitude,
      placeGroupCode: placeDetails?.groupCode || '',
      placeCategory: placeDetails?.category || '',
      placeUrl: placeDetails?.url || '',
    };

    console.log('[ConfirmAddressBottomSheet] 생성된 Place 정보:', {
      place,
      placeDetails,
    });

    // 새로 추가될 핀의 인덱스 계산 (addPin 전에 계산해야 함)
    const newPinIndex = courseData?.pinList?.length || 0;
    console.log('[ConfirmAddressBottomSheet] 핀 추가 시작:', {
      newPinIndex,
      placeName,
      currentPinListLength: courseData?.pinList?.length,
    });

    // 임시 Pin 생성 (평점, 설명, 태그는 PlaceDetail에서 입력받을 예정)
    const pin: Pin = {
      pinRating: 0,
      pinPositiveDescription: '',
      pinNegativeDescription: '',
      pinTagNames: [],
      place,
    };

    // 스토어에 Pin 추가
    addPin(pin);

    console.log('[ConfirmAddressBottomSheet] 핀 추가 완료:', {
      newPinIndex,
      placeName,
    });

    // onConfirm에 pinIndex 전달
    onConfirm(newPinIndex);
  };

  const roadAddress = address?.address || '';
  const oldAddress = address?.bname ? `서울 ${address.bname} ${address.zonecode}` : '';

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 px-[20px]">
        <h2 className="text-b3 text-iceblue-8">이 장소가 맞나요?</h2>

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
            onChange={handleDetailChange}
            placeholder="상세주소를 입력해주세요"
            className="border-iceblue-3 bg-iceblue-2 text-d1 text-neutral-8 placeholder:text-neutral-5 focus:border-pink-6 rounded-lg border px-4 py-3 outline-none"
          />
        </div>

        <div className="flex gap-3 py-[20px]">
          <button
            type="button"
            onClick={onReregister}
            className="text-s5 text-iceblue-7 bg-iceblue-2 flex-1 rounded-[12px] p-[10px] transition-colors"
          >
            다시 입력하기
          </button>
          <button
            type="button"
            onClick={handleConfirmClick}
            className="bg-pink-6 text-s4 flex-1 rounded-[12px] p-[10px] text-white transition-colors"
          >
            이대로 등록
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default ConfirmAddressBottomSheet;
