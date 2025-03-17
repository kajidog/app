import React, { useEffect, useState } from 'react';
import { User } from '../../domain/entities/User';
import { UserProfile } from '../components/UserProfile';
import { GetUserUseCase } from '../../application/useCases/user/GetUserUseCase';
import { ChromeStorageUserRepository } from '../../infrastructure/repositories/ChromeStorageUserRepository';

export const Popup: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const userRepository = new ChromeStorageUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  useEffect(() => {
    const loadUser = async () => {
      const userId = '1'; // 実際のアプリケーションでは適切な方法でユーザーIDを取得
      const userData = await getUserUseCase.execute(userId);
      setUser(userData);
    };

    loadUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-96 p-4">
      <h1 className="text-2xl font-bold mb-4">Chrome Extension</h1>
      <UserProfile user={user} />
    </div>
  );
}; 