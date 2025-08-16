export type ClientListItem = {
  username: string | null;
  membershipType: string | null;
  membershipEndDate: Date | null;
  numberOfFavorites: number;
  numberOfReviews: number;
};
