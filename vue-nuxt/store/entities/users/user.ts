import Entity from '../entity'
export default class User extends Entity<number>{
    UserName: string;
    Name: string;
    Surname: string;
    EmailAddress: string;
    IsActive: boolean;
    RoleNames: string[];
}
