import LocationIcon from '@assets/icons/pinpoint.svg';
import MapIcon from '@assets/icons/map.svg';
import placeSaveIcon from '@assets/icons/place_save.svg';
import Tag from '@common/Tag';
import CommentItem from '@pages/archive/components/CommentItem';
import useGetCourseComment from '@apis/course/query/useGetCourseComment';

interface CourseCardProps {
  courseId: number;
  profileImageUrl: string;
  authorName: string;
  title: string;
  location: string;
  placeCount: number;
  tags: string[];
  hasComments?: boolean;
  onClick?: () => void;
}

const CourseCard = ({
  courseId,
  profileImageUrl,
  authorName,
  title,
  location,
  placeCount,
  tags,
  hasComments,
  onClick,
}: CourseCardProps) => {
  // 실제 댓글 데이터 가져오기
  const { data: commentData } = useGetCourseComment(courseId);
  const comments = commentData?.data?.comments || [];
  const commentCount = commentData?.data?.count || 0;
  return (
    <div className="flex w-full rounded-lg bg-white p-4 shadow-sm cursor-pointer" onClick={onClick}>
      <div className="flex w-full flex-col gap-3">
        {/* 코스 정보 */}
        <div className="flex w-full gap-2">
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

        {/* 댓글 */}
        {hasComments && commentCount > 0 && (
          <div className="flex w-full flex-col gap-4">
            {/* 댓글 작성 폼 */}
            <div className="flex w-full flex-col gap-2">
              <span className="text-d1 text-iceblue-8">댓글 {commentCount}개</span>
              <div className="flex w-full items-center gap-[10px]">
                <div className="border-iceblue-2 flex h-12 flex-1 items-center justify-center rounded-[8px] border px-5 py-3">
                  <input
                    type="text"
                    className="placeholder:text-iceblue-7 placeholder:text-b4 h-full w-full bg-transparent outline-none"
                    placeholder="댓글을 남겨보세요!"
                  />
                </div>
                <button className="border-iceblue-2 flex h-12 w-12 items-center justify-center rounded-[4px] border bg-transparent">
                  <img src={placeSaveIcon} alt="저장" className="h-8 w-8" />
                </button>
              </div>
            </div>

            {/* 댓글 리스트 */}
            <div className="flex w-full flex-col gap-4">
              {comments.map((comment, index) => (
                <CommentItem
                  key={comment.commentId || index}
                  profileImage={comment.profileImage}
                  userName={comment.nickName}
                  content={comment.content}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
