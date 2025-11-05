import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import BooksList from "../components/BooksList";

import { useAuthToken } from "../hooks/useAuthToken";

function Home() {
  const { isAuthenticated, user } = useAuth0();
  useAuthToken();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bookshelf</h1>
          <p className="text-gray-600 mb-6">Manage your personal book collection with ease</p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Bookshelf</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {user !== null && user !== undefined && (
                <span className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
                  Welcome, {user.name || user.email}
                </span>
              )}
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      <BooksList />
    </div>
  );
}

export default Home;
