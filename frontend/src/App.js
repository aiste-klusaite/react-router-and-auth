import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetail';
import { NewEventPage } from './pages/NewEventPage';
import { EditEventPage } from './pages/EditEvent';
import { RootLayout } from './pages/Root';
import { EventsRootLayout } from './pages/EventsRoot';
import { eventsLoader, eventLoader } from './router/loaders/loaderData';
import { ErrorPage } from './pages/ErrorPage';
import { submitAction, deleteAction, newsLetterAction, authAction, logoutAction } from './router/actions/actions';
import { NewsletterPage } from './pages/Newsletter';
import { AuthenticationPage } from './pages/Authentication';
import { LogoutPage } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './utils/auth';

const router = createBrowserRouter([
  { path: '/', 
    element: <RootLayout />, 
    errorElement: <ErrorPage />, 
    id: 'root',
    loader: tokenLoader,
    children: [
    { index: true, element: <HomePage />},
    { path: 'events', element: <EventsRootLayout />, errorElement: <ErrorPage />, 
      children: [
      { index: true, element: <EventsPage />, loader: eventsLoader },
      { path: ':eventId', 
        id: 'event-detail',
        loader: eventLoader, 
        children: [
        {
          index: true,
          element: <EventDetailPage />,
          action: deleteAction,
        },
        { path: 'edit', element: <EditEventPage/>, action: submitAction, loader: checkAuthLoader },
      ]},
      { path: 'new', element: <NewEventPage />, action: submitAction, loader: checkAuthLoader },
    ]},
    {
      path: 'auth',
      element: <AuthenticationPage />,
      action: authAction,
    },
    { path: 'newsletter', element: <NewsletterPage />, action: newsLetterAction },
    {
      path: 'logout', element: <LogoutPage />, action: logoutAction,
    }
  ]},
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
