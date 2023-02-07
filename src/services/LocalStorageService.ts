import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ILocalStorageService {
  getItem<T>(key: string): Promise<T | undefined>;
  setItem(key: string, data: any): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export class LocalStorageService implements ILocalStorageService {
  async getItem<T>(key: string): Promise<T | undefined> {
    const data = await AsyncStorage.getItem(key);
    if (!data) return;
    const dataObj = JSON.parse(data);
    return dataObj;
  }

  async setItem(key: string, data: any): Promise<void> {
    if (typeof data === "string") {
      await AsyncStorage.setItem(key, data);
      return;
    }
    const dataStr = JSON.stringify(data);
    await AsyncStorage.setItem(key, dataStr);
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
