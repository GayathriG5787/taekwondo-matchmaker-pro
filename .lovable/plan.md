

# Rule-Based Sports Tournament Management System
### Taekwondo Tournament Prototype

A frontend-only demonstration application for your college final year project that visualizes automated player registration and match allocation.

---

## Pages & Features

### 1. Home / Overview Page
- **Project title** prominently displayed: "Rule-Based Sports Tournament Management System"
- **Description section** explaining the system automates player registration and match allocation for sports tournaments
- **Quick stats cards** showing total players, upcoming matches, tournament status
- **Navigation cards** linking to Player Registration and Admin Dashboard

---

### 2. Player Registration Page
- **Clean registration form** with fields:
  - Player Name (text input)
  - Age (number input)
  - Gender (Male/Female dropdown)
  - District (dropdown with sample districts)
  - Weight Category (Fin, Fly, Bantam, Feather, Light, Welter, Middle, Heavy)
- **Submit button** with success toast notification
- **Recently registered players** preview list below the form

---

### 3. Admin Dashboard
- **Players table** with sortable columns:
  - Name, Age, Gender, District, Weight Category
- **Tournament Rules Panel** with toggle switches:
  - Gender-based matching (on/off)
  - Weight category matching (on/off)
  - District restriction toggle (prevent same-district matchups)
- **Generate Matches button** that applies rules and creates pairings
- **Summary statistics** showing player count by category

---

### 4. Match Allocation View
- **Round-wise display format**:
  - Round 1 (Quarterfinals) - 4 matches
  - Semi Finals - 2 matches
  - Final - 1 match
- **Match cards** showing:
  - Player 1 vs Player 2
  - Weight category
  - Match status (Upcoming/In Progress/Completed)
- **Winner selection** (click to simulate advancement to next round)
- **Progress indicator** showing tournament completion

---

## Design & Layout

- **Clean minimal theme** with white/gray tones and subtle accents
- **Professional dashboard layout** with sidebar navigation
- **Readable tables** with proper spacing
- **Responsive design** for laptop/desktop presentation
- **8 pre-loaded mock players** across different weight categories

---

## Technical Approach

- React with TypeScript
- Client-side state management (React useState/Context)
- Mock data stored in component state
- Shadcn UI components for professional look
- No backend, database, or authentication required

