import BottomSheet from '@common/BottomSheet';
import KakaoMap from '@common/KakaoMap';
import type { AddressData } from '../types';

interface ConfirmAddressBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onReregister: () => void;
  onConfirm: () => void;
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
  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDetailAddressChange(event.target.value);
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
            placeholder="1-3층"
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
            onClick={onConfirm}
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
