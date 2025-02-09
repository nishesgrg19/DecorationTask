import React, { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Proposal from './components/Services/Proposals';
import Birthday from './components/Services/Birthdays';
import Mehendi from './components/Services/Mehendi';
import Shower from './components/Services/Showers';
import School from './components/Services/School';

const Home = lazy(() => import('./components/Home/Home'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/proposals" element={<Proposal />} />
              <Route path="/services/birthdays" element={<Birthday />} />
              <Route path="/services/mehendi" element={<Mehendi />} />
              <Route path="/services/showers" element={<Shower />} />
              <Route path="/services/school" element={<School />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;