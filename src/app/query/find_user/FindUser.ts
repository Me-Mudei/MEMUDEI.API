import DAOFactory from '../../../domain/factory/DAOFactory';
import userDAO from '../../dao/UserDAO';

export default class FindUser {
  userDAO: userDAO;
  constructor(readonly DAOFactory: DAOFactory) {
    this.userDAO = DAOFactory.createUserDAO();
  }

  async execute(query: { [key: string]: string }): Promise<any> {
    const user = await this.userDAO.findUnique(query);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
