export interface SpecialistListItem {
  id: number;
  name: string;
  phone: string | null;
  provinceId: number | null;
  location1: string | null;
  location2: string | null;
  location3: string | null;
  averageRating: number;
  reviewCount: number;
  favoritedCount: number;
  specialties: number[];
}

export type SpecialistSearchResponse = {
  data: SpecialistListItem[];
  pagination: {
    skip: number;
    take: number;
    total: number;
    hasMore: boolean;
  };
};
