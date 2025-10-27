import { useEffect, useRef } from 'react';

const KakaoMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        if (mapContainer.current) {
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          new window.kakao.maps.Map(mapContainer.current, options);
        }
      });
    } else {
      console.error('Kakao Maps script not loaded yet.');
    }
  }, []);

  return <div style={{ width: '100%', height: '500px' }} ref={mapContainer} />;
};

export default KakaoMap;
