import Star from './Star';

interface PlaceCardProps {
  imageUrl: string;
  name: string;
  category: string;
  address: string;
  addressDetail?: string;
  rating: number;
  reviewCount: number;
}

const PlaceCard = ({ imageUrl, name, category, address, addressDetail, rating, reviewCount }: PlaceCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const starRating = rating - i;
      let fillPercentage = 0;

      if (starRating >= 1) {
        fillPercentage = 100;
      } else if (starRating > 0) {
        fillPercentage = starRating * 100;
      }

      stars.push(<Star key={i} fillPercentage={fillPercentage} starId={i} />);
    }

    return stars;
  };

  return (
    <div className="flex w-full overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="h-[120px] w-[120px] flex-shrink-0">
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h3 className="text-b3 text-neutral-8">{name}</h3>
            <span className="text-d3 text-neutral-5">{category}</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-d1 text-neutral-5">{address}</p>
            {addressDetail && <p className="text-d1 text-neutral-4">{addressDetail}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-b5 text-yellow-5">{rating}</span>
          <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
          <span className="text-b5 text-neutral-5">리뷰 {reviewCount}건</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
