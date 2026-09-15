import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { SkillPracticePage } from './pages/SkillPracticePage';
import { ListeningStudioPage } from './features/listening/ListeningStudioPage';
import { ReadingStudioPage } from './features/reading/ReadingStudioPage';
import { WritingStudioPage } from './features/writing/WritingStudioPage';
import { SpeakingStudioPage } from './features/speaking/SpeakingStudioPage';
import { FlashcardPage } from './features/flashcard/FlashcardPage';
import { MockTestPage } from './pages/MockTestPage';
import { UpdateNotificationToast } from './components/pwa/UpdateNotificationToast';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/practice" element={<SkillPracticePage />} />
            <Route path="/practice/listening" element={<ListeningStudioPage />} />
            <Route path="/practice/reading" element={<ReadingStudioPage />} />
            <Route path="/practice/writing" element={<WritingStudioPage />} />
            <Route path="/practice/speaking" element={<SpeakingStudioPage />} />
            <Route path="/flashcard" element={<FlashcardPage />} />
            <Route path="/mock-test" element={<MockTestPage />} />
            <Route path="/profile" element={<Navigate to="/" replace />} />
            <Route path="/settings" element={<Navigate to="/" replace />} />
            <Route path="/dev" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
      <UpdateNotificationToast />
    </>
  );
};

export default App;
