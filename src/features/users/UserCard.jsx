import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/slices/userSlice';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import EditUserDialog from './EditUserDialog';
import { toast } from 'react-toastify';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
      try {
        await dispatch(deleteUser(user.id)).unwrap();
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <img 
              src={user.avatar} 
              alt={`${user.first_name} ${user.last_name}`} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{user.first_name} {user.last_name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <CardContent className="p-0 pt-4 flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardContent>
        </div>
      </Card>
      
      <EditUserDialog 
        user={user} 
        open={isEditing} 
        onOpenChange={setIsEditing} 
      />
    </>
  );
};

export default UserCard;
