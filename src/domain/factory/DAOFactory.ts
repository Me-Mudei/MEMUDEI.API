import UserDAO from '../../app/dao/UserDAO';

export default interface DAOFactory {
  createUserDAO(): UserDAO;
}
