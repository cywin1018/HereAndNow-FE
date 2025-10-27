import useKakaoLogin from '@hooks/home/useKakaoLogin';
import KakaoMap from '@common/KakaoMap';

const HomePage = () => {
  const { handleKakaoLogin } = useKakaoLogin();
  return (
    <div className="bg-neutral-1 min-h-screen p-8">
      <button className="bg-yellow-5 h-[30px] w-[200px]" onClick={handleKakaoLogin}>
        카카오 로그인
      </button>
      <div>
        <h2 className="mb-2 text-xl font-bold">서울 시청</h2>
        <KakaoMap latitude={37.566826} longitude={126.9786567} />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">부산 해운대 해수욕장</h2>
        <KakaoMap latitude={35.15868} longitude={129.1604} level={4} width="600px" height="300px" showMarker={false} />
      </div>
    </div>
  );
};

export default HomePage;
