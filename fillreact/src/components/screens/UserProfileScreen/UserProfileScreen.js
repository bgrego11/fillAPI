import { useAuth0 } from '@auth0/auth0-react';

const UserProfileScreen = () => {

  const { user } = useAuth0();

  console.log("USER INFO");
  console.log(user);

  return (
    <div>
      {user.name}
    </div>
  )
}

export default UserProfileScreen;