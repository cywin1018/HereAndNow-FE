import { useState, useRef } from 'react';
import LockIcon from '@assets/icons/material-symbols_lock_pink.svg';
import SendIcon from '@assets/icons/mingcute_send-fill_img.svg';
import ImgIcon from '@assets/icons/mdi_image_pink.svg';
import { getPresignedUrls, uploadFile } from '@apis/common/usePresignedUpload';
import usePostCommentImg from '@apis/connecting/usePostCommentImg';
import usePostCommentText from '@apis/connecting/usePostCommentText';

interface Comment {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  emojis?: string;
}

interface CoupleCommentProps {
  courseId?: number;
  comments?: Comment[];
  onSendComment?: (content: string, imageUrl?: string) => void;
}

const CoupleComment = ({ courseId = 17, comments = [], onSendComment }: CoupleCommentProps) => {
  const [commentText, setCommentText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postCommentImgMutation = usePostCommentImg();
  const postCommentTextMutation = usePostCommentText();

  const handleSend = async () => {
    if (!commentText.trim() || isUploading || isSending) return;

    const trimmedText = commentText.trim();

    console.log('[댓글 전송] 시작:', {
      commentText: trimmedText,
      hasSelectedImage: !!selectedImage,
      selectedImageName: selectedImage?.name,
      courseId,
    });

    setIsSending(true);

    try {
      // 댓글 텍스트 등록 API 호출
      const requestData = {
        courseId,
        content: trimmedText,
      };

      console.log('[댓글 전송] API 요청:', requestData);

      await postCommentTextMutation.mutateAsync(requestData);

      console.log('[댓글 전송] API 응답 성공: 200 OK');

      // 콜백 호출 (옵션)
      if (onSendComment) {
        onSendComment(trimmedText);
        console.log('[댓글 전송] 콜백 호출 완료');
      }

      // 초기화
      setCommentText('');
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      console.log('[댓글 전송] 초기화 완료');
    } catch (error) {
      console.error('[댓글 전송] 실패:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined,
        courseId,
        commentText: trimmedText,
      });
      alert('댓글 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSending(false);
      console.log('[댓글 전송] 상태 초기화 완료');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('[이미지 선택] 파일이 선택되지 않음');
      return;
    }

    console.log('[이미지 선택] 파일 선택됨:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      courseId,
    });

    // 이미지 파일만 허용
    if (!file.type.startsWith('image/')) {
      console.warn('[이미지 선택] 이미지 파일이 아님:', file.type);
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setSelectedImage(file);
    setIsUploading(true);

    try {
      // 1. Presigned URL 발급
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const filename = `${Date.now()}.${ext}`;
      const dirname = `course/${courseId}/couple/comment`;

      console.log('[이미지 업로드] 1단계 - Presigned URL 요청:', {
        dirname,
        filename,
        courseId,
      });

      const presignedResponse = await getPresignedUrls({
        dirname,
        filename: [filename],
      });

      console.log('[이미지 업로드] Presigned URL 응답:', {
        dataLength: presignedResponse.data.length,
        objectKeys: presignedResponse.data.map(item => item.objectKey),
        presignedUrls: presignedResponse.data.map(item => item.presignedUrl.substring(0, 50) + '...'),
      });

      if (presignedResponse.data.length === 0) {
        throw new Error('Presigned URL 발급 실패');
      }

      const { presignedUrl, objectKey } = presignedResponse.data[0];

      console.log('[이미지 업로드] 2단계 - 파일 업로드 시작:', {
        objectKey,
        fileName: file.name,
        fileSize: file.size,
      });

      // 2. 파일 업로드
      await uploadFile(presignedUrl, file, objectKey);

      console.log('[이미지 업로드] 파일 업로드 완료:', objectKey);

      // 3. 댓글 이미지 등록 API 호출
      const requestData = {
        courseId,
        objectKey,
      };

      console.log('[이미지 업로드] 3단계 - 댓글 이미지 등록 API 요청:', requestData);

      await postCommentImgMutation.mutateAsync(requestData);

      console.log('[이미지 업로드] 댓글 이미지 등록 API 응답: 200 OK');

      console.log('[이미지 업로드] 전체 프로세스 완료:', objectKey);
    } catch (error) {
      console.error('[이미지 업로드] 실패:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined,
        courseId,
        fileName: file.name,
      });
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsUploading(false);
      console.log('[이미지 업로드] 상태 초기화 완료');
    }
  };

  // 기본 댓글 데이터 (이미지에 표시된 예시)
  const defaultComments: Comment[] = [
    {
      id: '1',
      author: '마윤서',
      authorImage: '/dummy_profile.png',
      content: '자기얌 여기 진짜 재밌었는데 기억나? ㅎㅎ아',
      emojis: '😴💗',
    },
  ];

  const displayComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="bg-pink-1 -mx-5 flex flex-col gap-4 px-5">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <h3 className="text-h5 text-pink-6">우리끼리의 댓글</h3>
        <img src={LockIcon} alt="잠금" className="h-4 w-4" />
      </div>

      {/* 입력 영역 */}
      <div className="flex items-center gap-2">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <div className="border-pink-3 flex flex-1 items-center rounded-[18px] border bg-white px-4 py-3">
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 남겨보세요!"
            disabled={isUploading || isSending}
            className="text-b3 placeholder:text-pink-4 text-pink-4 flex-1 bg-transparent outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!commentText.trim() || isUploading || isSending}
            className="ml-2 flex flex-shrink-0 items-center justify-center disabled:opacity-50"
            aria-label="전송"
          >
            <img src={SendIcon} alt="전송" className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleImageSelect}
          disabled={isUploading || isSending}
          className="border-pink-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border bg-white disabled:opacity-50"
          aria-label="이미지 업로드"
        >
          <img src={ImgIcon} alt="이미지" className="h-5 w-5" />
        </button>
      </div>
      {selectedImage && <div className="text-b4 text-pink-6">선택된 이미지: {selectedImage.name}</div>}

      {/* 댓글 리스트 */}
      <div className="flex flex-col gap-3">
        {displayComments.map(comment => (
          <div key={comment.id} className="flex items-start gap-3">
            <img
              src={comment.authorImage}
              alt={comment.author}
              className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-b4 text-neutral-8 font-medium">{comment.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-b4 text-neutral-6">{comment.content}</span>
                {comment.emojis && <span className="text-b4">{comment.emojis}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoupleComment;
