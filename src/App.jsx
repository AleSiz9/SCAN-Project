import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import { useAuth, AuthProvider } from './authService/authService';
import { FormSkeleton, LayoutSkeleton, SearchSkeleton } from './components/skeleton/skeleton';
const SearchPage = lazy(() => import('./components/Layout/main/searchPage/searchPage'));
const RegistrationPage = lazy(() => import('./components/Layout/LoginPage/loginPage'));
const Main = lazy(() => import('./components/Layout/main/main'));
const Layout = lazy(() => import('./components/Layout/layout'));
const SearchResultsPage = lazy(() => import('./components/Layout/main/resultPage/searchResultsPage'));


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <SearchSkeleton />;
	}

	return isAuthenticated ? children : <Navigate to="/login" />;
};

// Публичный роут (только для неавторизованных)
const PublicRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	return !isAuthenticated ? children : <Navigate to="/search" />;
};

const AppRoutes = () => {
	return (
		<Suspense fallback={<LayoutSkeleton />}>
			<Routes>
				<Route path="/" element={<Layout />}>

					<Route index element={<Suspense fallback={<SearchSkeleton />}><Main /></Suspense>} />
					<Route path='search' element={
						<ProtectedRoute>
							<Suspense fallback={<SearchSkeleton />}>
								<SearchPage />
							</Suspense>
						</ProtectedRoute>
					} />
					<Route path='results' element={
						<ProtectedRoute>
							<Suspense fallback={<SearchSkeleton />}>
								<SearchResultsPage />
							</Suspense>
						</ProtectedRoute>
					} />
					<Route path='*' element={<h1>Страница не найдена</h1>} />
					<Route path='login' element={
						<PublicRoute>
							<Suspense fallback={<FormSkeleton />}>
								<RegistrationPage />
							</Suspense>
						</PublicRoute>
					} />
				</Route>
			</Routes>
		</Suspense>
	)
};

const App = () => {
	return (
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	);
};


export default App;
