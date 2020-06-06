import { CommonUser, Customer, Seller, Admin } from './User'
import { registrateUser, loginUser, getUserInfo } from '../Networking/ServerRequest'
import { AlertManager } from './AlertManager'

export class UserManager {
    private static instance: UserManager;

    private constructor() { }

    public static getInstance(): UserManager {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }

    public static currentUser : CommonUser;

    public async registrateUser(user: CommonUser, password: string, activityIndicator? : (value : boolean) => void ) : Promise<CommonUser>{
        try {
            if (activityIndicator) activityIndicator(true);
            let info = user.getInfo();
            let response = await registrateUser(info.email, password, info.adress, info.phone, info.type, info.name);
            if (response.code == 403 || response.code == 402 || response.code == 404) throw "Register failed";
            UserManager.currentUser = user;
            user.setId(response.id!)
            AlertManager.alertHandler.alertWithType('success', "Регистрация", "Пользователь успешно зарегистрирован")
        } catch {
            AlertManager.alertHandler.alertWithType('error', "Регистрация", "Пользователь не зарегистрирован")
        } finally {
            if (activityIndicator) activityIndicator(false);
            return user;
        }
    }

    public async loginUser(email: string, password: string, activityIndicator? : (value : boolean) => void ) : Promise<CommonUser>{
        let user : CommonUser = new Customer();
        try {
            if (activityIndicator) activityIndicator(true);
            let response = await loginUser(email, password);
            if (response.code != 200) throw "Login failed"
            let responseInfo = await getUserInfo(response.id!);
            if (responseInfo.code != 200) throw "GetInfo failed"
            let info :{id: number, adress: string, email: string, name: string, phone: string, type: string, image: string} = 
            {id: responseInfo.id!, adress: responseInfo.adress!, email: responseInfo.email!, name: responseInfo.name!, phone: responseInfo.phone!, type: responseInfo.type!, image: responseInfo.image!}
            switch(responseInfo.type) {
                case 'seller':
                    user = new Seller()
                    break;
                case 'customer':
                    user = new Customer()
                    break;
                case 'admin':
                    user = new Admin()
                    break;
                default :
                    user = new Customer()
            }
            user.setInfo(response.id!, info.type, info.image, info.email, info.adress, info.phone, info.name)
            UserManager.currentUser = user;
            AlertManager.alertHandler.alertWithType('success', "Вход", "Вы успешно зашли")
        } catch {
            AlertManager.alertHandler.alertWithType('error', "Вход", "Вход не удался")
        } finally {
            if (activityIndicator) activityIndicator(false);
            return user;
        }
    }
}