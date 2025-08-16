export type ClientListItem = {
  id: number;
  username: string | null;
  membershipType: string | null;
  membershipEndDate: Date | null;
  numberOfFavorites: number;
  numberOfReviews: number;
};
