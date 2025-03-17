import React from 'react';
import { User } from '../../domain/entities/User';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}; 