ATTENDANCE SYSTEM — PHASE 3 TEST

1. Extract the ZIP.
2. Open your existing GitHub repository: https://github.com/seanlian0029/1
3. Choose Add file > Upload files.
4. Upload ALL files in this ZIP, replacing the earlier connection-test files when prompted, and Commit changes.
5. Visit https://seanlian0029.github.io/1/ and refresh.
6. Click Connect Google Account.
7. If no academic period is active, click Create Test Period.
8. Enter a fictional student ID already added to your users tab (role must be student).
9. First submission records Time In. Second records Time Out. Third is rejected for that day.
10. Inspect the attendance_logs sheet to verify values.

REQUIREMENTS:
* All sample users must have student_id and role='student' in the six-tab Google Sheet.
* Staff Google account must have Google Sheets edit access.
* This is an early single-station test, NOT production-ready for simultaneous check-ins.
* Do not publish the original attendance ZIP, SQL backups, account passwords, or live student data.
* This version does NOT implement full report/late/credited-hours rules.
* Google OAuth browser-side access uses the permissions of the logged-in editor. Do not make this public to students as a write-enabled portal.
* If a Google API write operation fails or times out, check the Sheet before retrying to avoid duplicates.
