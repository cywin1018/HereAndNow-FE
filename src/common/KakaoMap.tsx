import { useEffect, useRef, useCallback } from 'react';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  level?: number;
  width?: string;
  height?: string;
  className?: string;
  showMarker?: boolean;
}

const KakaoMap = ({
  latitude,
  longitude,
  level = 3,
  width = '100%',
  height,
  className,
  showMarker = true,
}: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

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

  return <div className={className} style={{ width, height }} ref={mapContainer} />;
};

export default KakaoMap;
