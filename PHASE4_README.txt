ATTENDANCE PHASE 4 — HOURS & STATUS (TEST VERSION)

WHAT IS NEW
- Student/period attendance reporting and daily credited whole hours
- Original PHP regular-department and Library classification ported to rules.js
- Late and Undertime Flexible Time override, lunch deduction, summary counters
- Filter reports by student and date; refresh reads existing Google Sheets logs
- Existing first scan / second scan / third scan logic remains unchanged

HOW TO INSTALL
1. Download ZIP, extract all files to a folder.
2. In your existing repository https://github.com/seanlian0029/1 upload the extracted files, replacing matching filenames.
3. Commit changes. Open https://seanlian0029.github.io/1/ and force refresh Ctrl+Shift+R.
4. Connect Google and scroll down to Attendance Hours & Status — Phase 4.
5. Choose a student and click Refresh Report. This reads the currently active test period.

IMPORTANT
- TEST ONLY. Original PHP rules contain some odd edge cases; validate with your school's policy.
- This is a browser-side report calculation and does NOT change the spreadsheet columns or save hours.
- Google Sheets direct-write is currently for trusted staff, with a single active station only.
- No password, SQL backups, or private student data should be committed to public GitHub.
- Department matching uses the users.department column, or the departments tab via department_id.
- The Library rule uses the exact department name 'Library' (case-insensitive).
- Hours are whole-hour credits, not decimal hour fractions.
- Original PHP flexible-time rule replaces Late / Undertime classifications when a shift is at least 2 elapsed whole hours, with a 1-hour lunch deduction only when attendance spans 12:00 to 13:00.
- The original app may count 1 hour on an Invalid Shift; review the school's policy before actual use.

NO NEW SPREADSHEET TABS ARE NEEDED.
