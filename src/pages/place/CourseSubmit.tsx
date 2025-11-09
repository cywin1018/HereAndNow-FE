import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@common/layout/PageHeader';
import StarRatingFilter from '@common/components/StarRatingFilter';
import BottomActionButton from '@common/button/BottomActionButton';
import LabeledTextarea from '@common/components/LabeledTextarea';

const CourseSubmit = () => {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [highlight, setHighlight] = useState('');
  const [downside, setDownside] = useState('');

  const TITLE_MAX = 50;
  const DESCRIPTION_MAX = 100;

  const isFormValid = useMemo(() => {
    return (
      rating > 0 &&
      courseTitle.trim().length > 0 &&
      courseDescription.trim().length > 0 &&
      highlight.trim().length > 0 &&
      downside.trim().length > 0
    );
  }, [courseTitle, courseDescription, highlight, downside, rating]);

  const handleSubmit = () => {
    if (!isFormValid) return;
    navigate('/place/course/result');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white pb-32">
      <PageHeader title="코스 등록" />

      <main className="flex flex-1 flex-col gap-8 px-5 pt-6 pb-16">
        <section className="flex flex-col gap-3">
          <h1 className="text-h3 text-neutral-10 leading-snug">
            코스를 완성하기 위한
            <br />
            마지막 단계예요
          </h1>
          <StarRatingFilter rating={rating} onRatingChange={setRating} title="별점을 매겨본다면?" />
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-d1 text-iceblue-8">
              코스의 제목을 알려주세요
              <span className="text-red-6 ml-1">•</span>
            </label>
            <div className="border-iceblue-3/60 rounded-[18px] border bg-white px-[20px] py-3 shadow-[0_8px_18px_rgba(24,44,70,0.04)]">
              <input
                type="text"
                value={courseTitle}
                onChange={event => setCourseTitle(event.target.value.slice(0, TITLE_MAX))}
                placeholder="자유롭게 작성해주세요"
                className="text-b3 text-iceblue-8 placeholder:text-iceblue-6 w-full border-none bg-transparent p-0 leading-[24px] outline-none"
              />
            </div>
            <div className="text-b4 text-iceblue-6 text-right">
              {courseTitle.length}/{TITLE_MAX}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-d1 text-iceblue-8">
              코스의 설명을 알려주세요
              <span className="text-red-6 ml-1">•</span>
            </label>
            <div className="border-iceblue-3/60 rounded-[18px] border bg-white px-[20px] py-3 shadow-[0_8px_18px_rgba(24,44,70,0.04)]">
              <textarea
                value={courseDescription}
                onChange={event => setCourseDescription(event.target.value.slice(0, DESCRIPTION_MAX))}
                placeholder="자유롭게 작성해주세요"
                className="text-b3 text-iceblue-8 placeholder:text-iceblue-6 h-[96px] w-full resize-none bg-transparent p-0 leading-[24px] outline-none"
              />
            </div>
            <div className="text-b4 text-iceblue-6 text-right">
              {courseDescription.length}/{DESCRIPTION_MAX}
            </div>
          </div>

          <LabeledTextarea label="어떤 점이 좋았나요?" required maxLength={100} onChange={setHighlight} />
          <LabeledTextarea label="어떤 점이 아쉬웠나요?" required maxLength={100} onChange={setDownside} />
        </section>
      </main>

      <BottomActionButton type="button" disabled={!isFormValid} onClick={handleSubmit}>
        코스 등록하기
      </BottomActionButton>
    </div>
  );
};

export default CourseSubmit;
