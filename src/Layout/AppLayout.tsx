import { Outlet } from 'react-router-dom';
import Header from '@components/Common/Header';
import Sidebar from '@components/Common/Sidebar';
import { useAuth } from '@context/AuthContext';

const AppLayout = () => {
  const { isLogged } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <div className="flex">
        {isLogged && (
          <div className="fixed left-0 top-0 h-screen z-40 pt-16">
            <Sidebar />
          </div>
        )}
        
        <main className={`flex-1 pt-16 ${isLogged ? 'ml-16' : ''} min-h-screen`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 