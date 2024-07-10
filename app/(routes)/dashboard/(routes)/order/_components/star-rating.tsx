const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
return (
    <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
        <svg
        key={star}
        onClick={() => setRating(star)}
        className={`w-6 h-6 cursor-pointer ${
            rating >= star ? "text-yellow-500" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path d="M9.049 2.927C9.198 2.36 9.802 2.36 9.951 2.927L11.24 7.574L16.067 8.194C16.654 8.268 16.895 8.976 16.491 9.357L12.971 12.407L13.81 17.213C13.925 17.786 13.369 18.211 12.858 17.956L8.995 16.06L5.132 17.956C4.621 18.211 4.065 17.786 4.18 17.213L5.019 12.407L1.499 9.357C1.095 8.976 1.336 8.268 1.923 8.194L6.75 7.574L8.039 2.927H9.049Z" />
        </svg>
    ))}
    </div>
);
};

export default StarRating;