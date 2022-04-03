export default interface UserDAO {
  findUnique(query: { [key: string]: string }): Promise<any>;
}
