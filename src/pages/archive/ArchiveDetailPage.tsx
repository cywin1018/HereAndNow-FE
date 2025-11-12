import KakaoMap from '@common/KakaoMap';
import ArchivePlaceItem from '@common/components/ArchivePlaceItem';
import CommentItem from './components/CommentItem';
import Modal from '@common/components/Modal';
import { useState } from 'react';

const PLACES = [
  {
    title: 1,
    thumbnail: '/public/dummy_placecard.png',
    placeName: '서울숲',
    category: '도시근린공원',
    roadAddress: '서울 성동구 성수동1가 678-1',
    rating: 4.7,
    reviewCount: 531,
    photos: Array.from({ length: 6 }).map(() => '/public/dummy_placecard.png'),
    goodPoints:
      '입장료가 무료라서 좋다. 그리고 내부 꽃사슴도 볼 수 있고, 멋있는 조형물도 보는 재미가 있다. 평야에서 사람들이 돗자리 깔고 여유를 즐기는 모습을 바라보는 풍경도 평화로워!',
    badPoints: '무료라서 막 엄청 보고 즐길 건 없는 듯?',
  },
  {
    title: 2,
    thumbnail: '/public/dummy_placecard.png',
    placeName: '5to7',
    category: '카페',
    roadAddress: '서울 성동구 서울숲2길 44-13 1-2층',
    rating: 3.8,
    reviewCount: 188,
    photos: Array.from({ length: 6 }).map(() => '/public/dummy_placecard.png'),
    goodPoints: '수플레 존맛.. 또 먹고 싶음!! 거울 셀카도 겟~~!',
    badPoints: '사람이 쫌 만타',
  },
  {
    title: 3,
    thumbnail: '/public/dummy_placecard.png',
    placeName: '북악스카이웨이',
    category: '드라이브코스',
    roadAddress: '서울 종로구 평창동 산 6-94',
    rating: 4.3,
    reviewCount: 177,
    photos: Array.from({ length: 6 }).map(() => '/public/dummy_placecard.png'),
    goodPoints:
      '진짜 숨은 명소 인 듯! 밤에 오면 서울 야경이 다 보여서 속이 뻥 뜰리는 느낌! 아직 그렇게 안 추워서 지금 오기 딱 좋은 것 같다. 드라이브 코스도 좋고 팔각정도 예뻐요.',
  },
];

const COMMENTS = [
  {
    profileImage: '/public/dummy_profile.png',
    userName: '홍**',
    content: '우와! 성수동에서 북한산까지 가셨군요? 좋아요 누르고 갑니당!!',
  },
  {
    profileImage: '/public/dummy_profile.png',
    userName: '문**',
    content: '리뷰 넘 귀여워용 💕',
  },
  {
    profileImage: '/public/dummy_profile.png',
    userName: '마**',
    content: '저도 성수동 잘 안 가봤는데 코스 참고할게요 ㅎㅎ 감사합니다~!',
  },
  {
    profileImage: '/public/dummy_profile.png',
    userName: '김**',
    content: '좋아요 눌러요~^^',
  },
];

const ArchiveDetailPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteCompleteModalOpen, setIsDeleteCompleteModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-8">
        {/* 지도 */}
        {/* TODO: 지도 커스텀 해야함 */}
        <div className="relative flex h-[438px] w-[402px] min-w-[402px] items-center justify-center">
          {/* 날짜 */}
          <div className="bg-iceblue-2 border-iceblue-2 absolute top-0 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-6 rounded-[50px] border border-solid px-10 py-3">
            <span className="text-s2 text-iceblue-8">Wed</span>
            <span className="text-s2 text-iceblue-8">Nov</span>
            <span className="text-s2 text-iceblue-8">5</span>
          </div>

          {/* 지도 */}
          <KakaoMap
            latitude={37.566826}
            longitude={126.9786567}
            showMarker
            showHeartButton={false}
            className="h-full w-full"
          />
        </div>

        {/* 타이틀 / 설명 / 태그 */}
        <div className="flex w-93 flex-col gap-4">
          {/* 타이틀 */}
          <span className="text-h5 text-neutral-10 w-[322px]">성수동 주말, 오랜만에 만난 친구와 완벽한 하루</span>

          {/* 설명 */}
          <span className="text-b4 text-iceblue-8 w-[322px]">
            처음 가본 성수동은 신기한 동네다. 한국인데 해외같고, 음식도 다 맛있어서 또 오고 싶어!
          </span>

          {/* 태그 */}
          {/* TODO: 컴포넌트로 분리 */}
          <div className="flex items-center gap-3 overflow-x-visible">
            <div
              className="bg-purple-2 text-purple-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
              style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
            >
              사진 찍기 좋아요
            </div>
            <div
              className="bg-orange-2 text-orange-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
              style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
            >
              음식이 맛있어요
            </div>
            <div
              className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
              style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
            >
              시설이 깨끗해요
            </div>
            <div
              className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
              style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
            >
              시설이 깨끗해요
            </div>
            <div
              className="bg-blue-2 text-blue-8 text-b4 flex h-9 items-center justify-center rounded-sm px-2.5 whitespace-nowrap"
              style={{ boxShadow: '0px 4px 8px 0px #0000000F' }}
            >
              시설이 깨끗해요
            </div>
          </div>
        </div>

        {/* 아카이브 리스트 */}
        <div className="flex w-full flex-col gap-11">
          {PLACES.map(place => (
            <ArchivePlaceItem
              key={place.title}
              title={place.title}
              thumbnail={place.thumbnail}
              placeName={place.placeName}
              category={place.category}
              roadAddress={place.roadAddress}
              rating={place.rating}
              reviewCount={place.reviewCount}
              photos={place.photos}
              goodPoints={place.goodPoints}
              badPoints={place.badPoints}
            />
          ))}
        </div>

        {/* 댓글 */}
        <div className="flex w-full flex-col gap-4">
          {/* 댓글 작성 폼 */}
          <div className="flex w-full flex-col gap-2">
            <span className="text-d1 text-iceblue-8">댓글 4개</span>
            <div className="border-iceblue-2 flex h-12 w-full items-center justify-center rounded-[8px] border px-5 py-3">
              <input
                type="text"
                className="placeholder:text-iceblue-7 placeholder:text-b4 h-full w-full bg-transparent outline-none"
                placeholder="댓글을 남겨보세요!"
              />
            </div>
          </div>

          {/* 댓글 리스트 */}
          <div className="flex w-full flex-col gap-4">
            {COMMENTS.map((comment, index) => (
              <CommentItem
                key={index}
                profileImage={comment.profileImage}
                userName={comment.userName}
                content={comment.content}
              />
            ))}
          </div>
        </div>

        {/* 삭제하기 / 공유하기 버튼 */}
        <div className="mt-[27px] flex w-full gap-3 py-5">
          <button
            type="button"
            className="bg-iceblue-2 text-s5 text-iceblue-7 flex h-13.5 w-full flex-1 cursor-pointer items-center justify-center rounded-[12px]"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제하기
          </button>
          <button
            type="button"
            className="bg-pink-6 text-s5 flex h-13.5 w-full flex-1 cursor-pointer items-center justify-center rounded-[12px] text-white"
            onClick={() => setIsShareModalOpen(true)}
          >
            공유하기
          </button>
        </div>
      </div>

      {/* 삭제 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        mainMessage="정말 코스를 삭제하시겠어요?"
        leftButtonText="네, 삭제할게요"
        leftButtonOnClick={() => {
          setIsDeleteModalOpen(false);
          setIsDeleteCompleteModalOpen(true);
        }}
        rightButtonText="아니요"
        rightButtonOnClick={() => setIsDeleteModalOpen(false)}
      />

      {/* 삭제 완료 모달 */}
      <Modal
        isOpen={isDeleteCompleteModalOpen}
        onClose={() => setIsDeleteCompleteModalOpen(false)}
        mainMessage="코스가 삭제되었어요"
        rightButtonText="확인"
        rightButtonOnClick={() => setIsDeleteCompleteModalOpen(false)}
      />

      {/* 공유 모달 */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        mainMessage="링크를 눌러 복사할 수 있어요"
        subMessageLink="https://here-and-now-fe.vercel.app/"
        rightButtonText="확인"
        rightButtonOnClick={() => setIsShareModalOpen(false)}
      />
    </>
  );
};

export default ArchiveDetailPage;
