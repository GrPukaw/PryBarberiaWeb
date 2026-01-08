interface ServiceCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  imageUrl?: string;
  onBook?: (id: string) => void;
}

export default function ServiceCard({
  id,
  name,
  description,
  price,
  duration,
  imageUrl,
  onBook,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      {/* Image Section */}
      <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl">✂️</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full font-bold">
          ${price.toFixed(2)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration} min
          </div>
          
          {onBook && (
            <button
              onClick={() => onBook(id)}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              Reservar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
