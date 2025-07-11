import { useAuth } from '@/stores';

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Profile</h1>
      <p>Welcome {user?.firstName}</p>
    </>
  );
};

export default Profile;
