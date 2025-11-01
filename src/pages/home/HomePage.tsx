import KakaoMap from '@common/KakaoMap';

const HomePage = () => {
  return (
    <div className="bg-neutral-1 min-h-screen p-8">
      <KakaoMap latitude={37.566826} longitude={126.9786567} />
    </div>
  );
};

export default HomePage;
