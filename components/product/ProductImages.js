'use client';

export default function ProductImages({ productImages, productName }) {
  const defaultImage = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200';

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={productImages[0]}
          alt={productName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>
      {productImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {productImages.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={image}
                alt={`${productName} ${index + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}