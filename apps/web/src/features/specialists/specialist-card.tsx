import { Card, CardContent } from "@/components/ui/card";
import {
  getLabelByValueFromList,
  provinceOptions,
  specialtyOptions,
} from "@/lib/data/data-options";
import { SpecialistListItem } from "@repo/types";
import { useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <div className="overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
  }
  return stars;
};

export default function SpecialistCard({
  specialist,
}: {
  specialist: SpecialistListItem &
    Partial<{ title: string; avatarUrl: string }>;
}) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden py-0">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">
          <div className="text-gray-400 text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <span className="text-sm">No Image</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8 cursor-pointer"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
        </div>
      </div>

      {/* Removed default padding & spacing */}
      <CardContent className="px-2 py-2 space-y-1">
        <h3 className="font-semibold text-lg line-clamp-1">
          {specialist.name}
        </h3>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">
            {getLabelByValueFromList(provinceOptions, specialist.provinceId)}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="text-sm line-clamp-1">
            {specialist.location1}, {specialist.location2}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {specialist.specialties
              .map((id) => getLabelByValueFromList(specialtyOptions, id))
              .join(", ")}
          </p>
        </div>

        <div className="h-6 flex items-center">
          {specialist.reviewCount > 0 ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(specialist.averageRating)}
              </div>
              <span className="text-sm text-gray-600">
                {specialist.averageRating.toFixed(1)}{" "}
                {specialist.reviewCount &&
                  `(${specialist.reviewCount} reviews)`}
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-500 italic">No rating yet</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
