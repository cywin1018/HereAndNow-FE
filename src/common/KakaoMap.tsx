import { useEffect, useRef, useCallback, useState } from 'react';
import HeartIcon from '@assets/icons/heart.svg';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  level?: number;
  width?: string;
  height?: string;
  className?: string;
  showMarker?: boolean;
  searchBar?: {
    placeholder?: string;
    previewImages?: string[];
    onSearch?: (query: string) => void;
  };
  showHeartButton?: boolean;
}

const KakaoMap = ({
  latitude,
  longitude,
  level = 3,
  width = '100%',
  height,
  className,
  showMarker = true,
  searchBar,
  showHeartButton = true,
}: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const initMap = useCallback(() => {
    if (mapContainer.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: level,
      };
      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

      if (showMarker) {
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        const imageSize = new window.kakao.maps.Size(24, 35);
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
      }
    }
  }, [latitude, longitude, level, showMarker]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer,drawing&autoload=false`;
      document.head.appendChild(script);
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
      script.onerror = () => {
        console.error('Kakao Maps 스크립트 로드 실패');
      };
    }
  }, [initMap]);

  return (
    <div className={`relative overflow-hidden rounded-lg ${className || ''}`} style={{ width, height }}>
      <div className="overflow-hidden rounded-lg" ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      <div className="absolute right-4 bottom-4 left-4 z-10 flex items-end gap-[18px]">
        {searchBar && (
          <div className="flex flex-1 items-center gap-4 rounded-[16px] bg-white pt-[6px] pr-[6px] pb-[6px] pl-4 shadow-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && searchBar.onSearch) {
                  searchBar.onSearch(searchQuery);
                }
              }}
              placeholder={searchBar.placeholder || '장소를 검색하세요'}
              className="text-b3 text-neutral-8 placeholder:text-neutral-5 max-w-[170px] min-w-0 flex-auto border-none bg-transparent outline-none"
            />

            {searchBar.previewImages && searchBar.previewImages.length > 0 && (
              <div className="flex">
                {searchBar.previewImages.slice(0, 3).map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`h-[40px] w-[40px] overflow-hidden rounded-full ${index > 0 ? '-ml-4' : ''}`}
                  >
                    <img src={imageUrl} alt={`미리보기 ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showHeartButton && (
          <div className="relative flex flex-shrink-0 items-center justify-center rounded-lg bg-white p-[10px] shadow-lg">
            <img src={HeartIcon} alt="하트" className="h-[32px] w-[32px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default KakaoMap;
