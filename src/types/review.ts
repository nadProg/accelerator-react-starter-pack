export type ReviewGet = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

export type ReviewPost = {
  guitarId: number;
  userName: string;
  rating: number;
  advantage: string;
  disadvantage: string;
  comment: string;
};
