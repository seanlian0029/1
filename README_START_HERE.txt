ATTENDANCE SYSTEM — REFINED EDITION (STAFF REVIEW BUILD)
====================================================
This version retains your original charcoal Bootstrap navigation and school logo,
refines colors, adds navigation dropdowns, and shows credited hours in Recent Entries.

HOW TO DEPLOY
1. Extract this ZIP.
2. Open https://github.com/seanlian0029/1
3. Upload the 10 files from this ZIP to the repository root (not the ZIP itself).
4. Commit changes and visit https://seanlian0029.github.io/1/
5. Hard-refresh with Ctrl+Shift+R.
6. Connect using a Google account that has spreadsheet access.
7. Check Attendance Entry -> Recent Entries. Select All / Time In / Time Out.
8. Check Reports for complete date and student-filtered totals.

IMPORTANT — NOT YET APPROVED FOR LIVE STUDENTS
- Existing app talks directly to Google Sheets using OAuth scope spreadsheets.
  A staff account with spreadsheet editor access can edit the database directly;
  page-level navigation is NOT a security boundary.
- Concurrent scans from two devices can create duplicates (read-then-write race).
- This is not appropriate for public students or multiple check-in kiosks yet.
- The currently active academic period may still be TEST-2026-2027.
  Do not convert that test period into official attendance.
- Original PHP attendance formulas have edge cases and require policy review.
- Recent entry hours are calculated from existing records; no Sheets column added.
- Do not upload old PHP/SQL backups to a public repository.

To make this a true live production site: move attendance writes to a backend with
atomic duplicate prevention and role-scoped permissions; approve calculation rules;
configure real academic period; test a backup/restore plan.
