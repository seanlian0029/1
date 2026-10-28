ATTENDANCE CONNECTION TEST — STEP 2

These files test the Google Sheets database without modifying any rows.

1. Create a new PUBLIC GitHub repository e.g. attendance-connect-test.
2. Upload the SIX files from this folder (index.html, style.css, config.js, api.js, auth.js, app.js) to the repository root. Do NOT upload your original attendance ZIP or SQL backups.
3. On GitHub: Settings > Pages > Deploy from branch > main > /(root) > Save.
4. Copy the website address, usually https://YOUR_USERNAME.github.io/attendance-connect-test/ .
5. In Google Cloud Console, open the OAuth Web Client from your previous renewal system. Under Authorized JavaScript origins add ONLY your origin, e.g. https://YOUR_USERNAME.github.io (NO slash or repo path). If using an API key restricted by HTTP referrer, allow your new website's exact URL path as appropriate.
6. Verify Google Sheets API is enabled for the associated Google Cloud project. Make sure the Google account you sign in with has access to your new spreadsheet.
7. Open your GitHub Pages site. Click Connect Google Account, then Test Spreadsheet Access.

Do NOT add an OAuth client secret or service account private key into GitHub. If the old API key is unrestricted, restrict it in Google Cloud Console to the Sheets API and your GitHub Pages website before going live.

NOTE: This browser-only approach is suitable for trusted staff members who have access to the spreadsheet. It is NOT a secure student portal or tamper-proof attendance submission system. Staff editors can also modify the sheet directly. We must design authorized writing and duplicate handling before production deployment.
