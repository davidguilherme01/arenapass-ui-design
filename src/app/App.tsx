import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { HomeScreen } from './components/HomeScreen';
import { MatchDetails } from './components/MatchDetails';
import { SeatSelection } from './components/SeatSelection';
import { PaymentScreen } from './components/PaymentScreen';
import { MyTickets } from './components/MyTickets';
import { ExploreScreen } from './components/ExploreScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  return (
    <Router>
      <div className="size-full bg-gray-50">
        <Routes>
          <Route path="/" element={<><HomeScreen /><BottomNavigation /></>} />
          <Route path="/match/:matchId" element={<MatchDetails />} />
          <Route path="/seat-selection/:matchId" element={<SeatSelection />} />
          <Route path="/payment/:matchId" element={<PaymentScreen />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/explore" element={<ExploreScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}