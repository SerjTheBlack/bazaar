export interface UserModel {
  username: String;
  password: String;
  fio: String;
  cash: Number;
  inventory: Array<StuffModel>;
}

export interface StuffModel {
  name: String;
  price: Number;
}
