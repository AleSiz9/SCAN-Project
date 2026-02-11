import { render } from '@testing-library/react';
import App from './App';

jest.mock('./authService/authService', () => ({
  useAuth: jest.fn(() => ({ 
    isAuthenticated: false, 
    loading: false 
  })),
  AuthProvider: ({ children }) => <>{children}</>
}));

jest.mock('./components/Layout/main/searchPage/searchPage', () => () => 
  <div data-testid="search-page">Search Page</div>
);

jest.mock('./components/skeleton/skeleton', () => ({
  FormSkeleton: () => <div data-testid="form-skeleton">Form Skeleton</div>,
  LayoutSkeleton: () => <div data-testid="layout-skeleton">Layout Skeleton</div>,
  SearchSkeleton: () => <div data-testid="search-skeleton">Search Skeleton</div>
}));

jest.mock('./components/Layout/main/main', () => () => 
  <div data-testid="main-page">Main Page</div>
);

jest.mock('./components/LoginPage/loginPage', () => () => 
  <div data-testid="mock-login">Mock Login</div>
);

test('App не падает при рендере', () => {

  expect(() => {
    render(<App />);
  }).not.toThrow();
  
  expect(document.body.innerHTML).not.toBe('');
});