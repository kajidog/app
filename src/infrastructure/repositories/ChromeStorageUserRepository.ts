import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class ChromeStorageUserRepository implements IUserRepository {
  private readonly STORAGE_KEY = 'users';

  async findById(id: string): Promise<User | null> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const users = result[this.STORAGE_KEY] || {};
    const userData = users[id];

    if (!userData) return null;

    return new User(userData);
  }

  async save(user: User): Promise<void> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const users = result[this.STORAGE_KEY] || {};
    
    users[user.id] = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    await chrome.storage.local.set({ [this.STORAGE_KEY]: users });
  }

  async delete(id: string): Promise<void> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const users = result[this.STORAGE_KEY] || {};
    
    delete users[id];
    
    await chrome.storage.local.set({ [this.STORAGE_KEY]: users });
  }
} 