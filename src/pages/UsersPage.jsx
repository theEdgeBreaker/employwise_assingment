import Header from '../components/Header';
import UserList from '../features/users/UserList';

const UsersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <UserList />
      </main>
    </div>
  );
};

export default UsersPage;
