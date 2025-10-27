import useKakaoLogin from '@hooks/home/useKakaoLogin';
import KakaoMap from '@common/KakaoMap';

const HomePage = () => {
  const { handleKakaoLogin } = useKakaoLogin();
  return (
    <div className="bg-neutral-1 min-h-screen p-8">
      <button className="bg-yellow-5 h-[30px] w-[200px]" onClick={handleKakaoLogin}>
        카카오 로그인
      </button>
      <KakaoMap />
    </div>
  );
};

export default HomePage;
