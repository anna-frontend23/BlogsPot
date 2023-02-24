import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Posts } from './pages/Posts';
import { AddPost } from './pages/AddPost';
import { Post } from './pages/Post';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { UserPage } from './pages/UserPage';
import { Favourites } from './pages/Favourites';

const queryClient = new QueryClient()

const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
        {
          path: 'signIn',
          element: <SignIn/>
        },
        {
          path: 'signUp',
          element: <SignUp/>
        },
        {
          path: 'posts',
          element: <Posts/>
        },
        {
          path: 'favourites',
          element: <Favourites/>
        },
        {
          path: ':id',
          element: <Post/>
        },
        {
          path: 'addPost',
          element: <AddPost/>
        }, 
        {
          path: 'user',
          element: <UserPage/>
        }
      ]
  }
  
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={myRouter}/>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);


