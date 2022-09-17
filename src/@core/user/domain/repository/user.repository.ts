import User from "../entity/user.entity";

export default interface UserRepository {
  create(user: User): Promise<void>;
  complete(user: User): Promise<void>;
}
