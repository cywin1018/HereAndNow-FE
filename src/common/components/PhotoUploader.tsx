import { useState, type FormEvent } from 'react';

interface PhotoUploaderProps {
  maxCount?: number;
  onChange?: (photos: string[]) => void;
}

const PhotoUploader = ({ maxCount = 7, onChange }: PhotoUploaderProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const canAddMorePhotos = photos.length < maxCount;

  const handlePhotoUpload = (event: FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files) return;

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
      })
      .catch(error => {
        console.error('[PhotoUploader] 이미지 업로드 실패:', error);
      })
      .finally(() => {
        event.currentTarget.value = '';
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
            <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
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
