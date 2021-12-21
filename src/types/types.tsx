export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string, // enum?
  description: string,
  previewImg: string,
  stringCount: number, // enum?
  rating: number,
  price: number,
  comments?: Comment[],
}

export type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: 1,
};
