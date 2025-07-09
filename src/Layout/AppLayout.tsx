import { Outlet } from 'react-router-dom';
import Sidebar from '@components/Common/Sidebar';
import { useAuth } from '@context/AuthContext';

const AppLayout = () => {
  const { isLogged } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {isLogged && (
          <div className="fixed left-0 top-0 h-screen z-40 w-64 hidden lg:block">
            <Sidebar />
          </div>
        )}
        
        <main className={`flex-1 ${isLogged ? 'lg:ml-64' : ''} min-h-screen`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 