import React from 'react';
import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { SkillPracticePage } from './pages/SkillPracticePage';
import { FlashcardPage } from './features/flashcard/FlashcardPage';
import { MockTestPage } from './pages/MockTestPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<SkillPracticePage />} />
          <Route path="/flashcard" element={<FlashcardPage />} />
          <Route path="/mock-test" element={<MockTestPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
