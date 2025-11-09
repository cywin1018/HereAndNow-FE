import { useEffect } from 'react';
import PageHeader from '@common/layout/PageHeader';
import clappingHandsImage from '@assets/images/clapping-hands.png';
import { useNavigate } from 'react-router-dom';

const CourseResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/archive');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageHeader title="코스 등록" />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-8">
        <h1 className="text-h2 text-neutral-10 text-center">코스 등록을 성공했어요!</h1>
        <img src={clappingHandsImage} alt="박수 이미지" className="h-[136px] w-[136px]" />
      </main>
    </div>
  );
};

export default CourseResult;
