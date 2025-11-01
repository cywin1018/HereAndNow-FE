import KakaoMap from '@common/KakaoMap';
import AddCourse from './components/AddCourse';

const HomePage = () => {
  return (
    <div className="bg-neutral-1 min-h-screen">
      <div className="flex flex-col gap-[28px]">
        <AddCourse />
        <KakaoMap latitude={37.566826} longitude={126.9786567} className="h-[292px]" />
      </div>
    </div>
  );
};

export default HomePage;
