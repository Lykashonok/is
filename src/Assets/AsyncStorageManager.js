import { AsyncStorage } from 'react-native';

export const USER_TOKEN = 'USER_TOKEN'
export const USER_ID = 'USER_ID'
export const USER_TASKS = 'USER_TASKS'

export const storeData = async (keyName, keyValue) => {
    try {
        await AsyncStorage.setItem(keyName, keyValue);
    } catch (error) {
        console.error(error);
    }
};

export const retrieveData = async (keyName) => {
    try {
        let value = await AsyncStorage.getItem(keyName);
        return value
    } catch (error) {
        console.error(error);
    }
};

export const storeDataArray = async (keyName, keyValue) => {
    try {
        await AsyncStorage.setItem(keyName, JSON.stringify(keyValue));
    } catch (error) {
        console.error(error);
    }
};

export const retrieveDataArray = async (keyName) => {
    try {
        let value = await JSON.parse(await AsyncStorage.getItem(keyName));
        return value
    } catch (error) {
        console.error(error);
    }
};