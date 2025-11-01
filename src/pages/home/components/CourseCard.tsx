import LocationIcon from '@assets/icons/pinpoint.svg';
import MapIcon from '@assets/icons/map.svg';
import Tag from '@common/Tag';

interface CourseCardProps {
  profileImageUrl: string;
  authorName: string;
  title: string;
  location: string;
  placeCount: number;
  tags: string[];
}

const CourseCard = ({ profileImageUrl, authorName, title, location, placeCount, tags }: CourseCardProps) => {
  return (
    <div className="flex w-full gap-2 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <img src={profileImageUrl} alt={authorName} className="h-[20px] w-[20px] rounded-full object-cover" />
          <span className="text-d1 text-neutral-5">{authorName}</span>
        </div>

        <h3 className="text-s4 text-neutral-8">{title}</h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <img src={LocationIcon} alt="위치" className="h-4 w-4" />
            <span className="text-d2 text-neutral-5">{location}</span>
          </div>

          <div className="bg-neutral-5 h-3 w-px" />

          <div className="flex items-center gap-1.5">
            <img src={MapIcon} alt="장소" className="h-4 w-4" />
            <span className="text-d2 text-neutral-5">장소 {placeCount}개</span>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-1.5">
          {tags.map((tag, index) => {
            const tagColors = [
              { bgColor: 'bg-orange-2', textColor: 'text-orange-8' },
              { bgColor: 'bg-purple-1', textColor: 'text-purple-8' },
            ];
            const color = tagColors[index % tagColors.length];

            return <Tag key={index} text={tag} bgColor={color.bgColor} textColor={color.textColor} />;
          })}
        </div>
      </div>

      <div className="bg-iceblue-3 relative h-[128px] w-[128px] flex-shrink-0 rounded-lg">
        <img src="/public/dummy_course_preview.png" />
      </div>
    </div>
  );
};

export default CourseCard;
