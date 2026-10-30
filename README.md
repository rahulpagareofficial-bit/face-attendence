# Face Recognition Attendance System (Vercel + Supabase)

Face detection and recognition run in the browser (face-api.js). Backend: Vercel serverless functions (`/api`). Database: Supabase.
Only face descriptors (128 numbers) are stored, never raw photos.

## Setup
1. **Supabase**: create a project, open the SQL Editor, paste `supabase/schema.sql` and run it.
   From Settings -> API copy the `Project URL` and the `service_role` key (never expose the service key in frontend code).
2. **GitHub**: push this folder to a repository.
3. **Vercel**: New Project -> import the repo -> add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `ADMIN_PASSWORD` (the login password)
   Then deploy.
4. Open the site, log in, add students in **Register**, then take attendance in **Scan**.

Local test: `npm i -g vercel && npm i && vercel dev` (copy `.env.example` to `.env`).

## Features
Register (3-sample average), live scan with automatic attendance, duplicate prevention (one entry per student per day),
unknown face handling, delete students, date-wise Present/Absent report, CSV export, admin password protection, IST timezone.

## Tips
- Camera access needs HTTPS (Vercel provides it) and browser permission.
- Match threshold is `0.5` in `index.html` (`FaceMatcher`); lower is stricter.
- Liveness detection (blink check) is not included yet.
