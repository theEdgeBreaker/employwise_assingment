import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchQuery } from '../../redux/slices/userSlice';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import UserCard from './UserCard';
import { toast } from 'react-toastify';

const UserList = () => {
  const dispatch = useDispatch();
  const { filteredUsers, totalPages, currentPage, isLoading, error, searchQuery } = useSelector((state) => state.users);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePageChange = (page) => {
    dispatch(fetchUsers(page));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchQuery ? 'No users match your search' : 'No users found'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            >
              Previous
            </Button>
            
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
                disabled={isLoading}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
