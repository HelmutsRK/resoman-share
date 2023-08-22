import React, {Suspense} from 'react';
import './App.css';
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';

const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
);

function App({ pageComponent, id, authStatus, layoutComponent, pageTitle, routeProtected, ...props }) {
    const PageComponent = pageComponent;
    const LayoutComponent = layoutComponent;

    return (
      <Suspense fallback={<Loader />}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              {routeProtected
                  ? <ProtectedRoute>
                      <LayoutComponent pageTitle={pageTitle}>
                          <PageComponent />
                      </LayoutComponent>
                    </ProtectedRoute>
                  : <LayoutComponent pageTitle={pageTitle}>
                      <PageComponent />
                    </LayoutComponent>
              }
          </LocalizationProvider>
      </Suspense>
    );
}

export default App;
