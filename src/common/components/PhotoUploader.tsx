import { useState, useRef, useEffect, type FormEvent } from 'react';

interface PhotoUploaderProps {
  maxCount?: number;
  onChange?: (photos: string[]) => void;
  onFilesChange?: (files: File[]) => void;
}

const PhotoUploader = ({ maxCount = 7, onChange, onFilesChange }: PhotoUploaderProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canAddMorePhotos = photos.length < maxCount;

  // 파일이 변경되면 부모에게 알림 (렌더링 후 실행)
  useEffect(() => {
    if (onFilesChange) {
      // 파일이 없어도 빈 배열로 전달 (부모에서 관리)
      onFilesChange(fileObjects);
    }
  }, [fileObjects, onFilesChange]);

  const handlePhotoUpload = (event: FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files) return;

    // 이벤트 타겟을 미리 저장 (비동기 작업 후에도 사용하기 위해)
    const inputElement = event.currentTarget;

    const availableSlots = maxCount - photos.length;
    const selectedFiles = Array.from(files).slice(0, availableSlots);

    const readers = selectedFiles.map(
      file =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => {
            if (typeof e.target?.result === 'string') {
              resolve(e.target.result);
            } else {
              reject(new Error('이미지 데이터를 읽을 수 없습니다.'));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers)
      .then(imageUrls => {
        setPhotos(prev => {
          const updated = [...prev, ...imageUrls].slice(0, maxCount);
          onChange?.(updated);
          return updated;
        });

        // File 객체도 함께 저장 (렌더링 후 useEffect에서 부모에게 전달)
        setFileObjects(prev => {
          const updated = [...prev, ...selectedFiles].slice(0, maxCount);
          return updated;
        });
      })
      .catch(error => {
        console.error('[PhotoUploader] 이미지 업로드 실패:', error);
      })
      .finally(() => {
        // ref를 사용하거나 저장된 input 요소를 사용
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        } else if (inputElement) {
          inputElement.value = '';
        }
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {photos.map((photo, index) => (
          <div
            key={`photo-${index}`}
            className="border-iceblue-3 h-[81px] w-[81px] overflow-hidden rounded-[12px] border"
          >
            <img src={photo} alt={`업로드한 사진 ${index + 1}`} className="h-full w-full object-cover" />
          </div>
        ))}
        {canAddMorePhotos && (
          <label className="border-iceblue-3 bg-iceblue-2 text-iceblue-6 hover:bg-iceblue-3 flex h-[81px] w-[81px] cursor-pointer items-center justify-center rounded-[12px] border border-dashed">
            <span className="text-h4 leading-none">+</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
      <span className="text-d3 text-iceblue-6">
        {photos.length}/{maxCount}장 업로드했어요
      </span>
    </div>
  );
};

export default PhotoUploader;
