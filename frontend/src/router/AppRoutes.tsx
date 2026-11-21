import type { JSX } from 'react'

import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '../components/AppLayout/AppLayout'
import { RequireAuth } from '../components/RequireAuth/RequireAuth'
import { HomePage } from '../pages/HomePage/HomePage'
import { LeaderboardPage } from '../pages/LeaderboardPage/LeaderboardPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import { PlayerProfilePage } from '../pages/PlayerProfilePage/PlayerProfilePage'
import { ProfileSettingsPage } from '../pages/ProfileSettingsPage/ProfileSettingsPage'
import { RoomBattlePage } from '../pages/RoomBattlePage/RoomBattlePage'
import { RoomsPage } from '../pages/RoomsPage/RoomsPage'
import { RulesPage } from '../pages/RulesPage/RulesPage'
import { SoloGamePage } from '../pages/SoloGamePage/SoloGamePage'

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="play/solo" element={<SoloGamePage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="rooms/:roomId" element={<RoomBattlePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="players/:playerId" element={<PlayerProfilePage />} />
        <Route path="rules" element={<RulesPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <ProfileSettingsPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
