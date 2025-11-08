import { useEffect, useRef } from 'react';
import KakaoMap from './KakaoMap';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 z-50 bg-black/40 transition-opacity" onClick={onClose} />

      {/* 바텀시트 */}
      <div
        ref={sheetRef}
        className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-h-[90vh] w-full max-w-md rounded-t-2xl bg-white shadow-lg"
      >
        {/* 드래그 핸들 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="bg-neutral-4 h-1 w-12 rounded-full" />
        </div>

        {/* 컨텐츠 */}
        <div className="max-h-[calc(90vh-16px)] overflow-y-auto pb-4">{children}</div>
      </div>
    </>
  );
};

export default BottomSheet;
