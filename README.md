# Face Recognition Attendance System (Vercel + Supabase)

Face detection/recognition browser me chalta hai (face-api.js). Backend = Vercel serverless (`/api`), DB = Supabase.
Sirf face descriptors (128 numbers) store hote hain, raw photos nahi.

## Setup
1. **Supabase**: naya project banao -> SQL Editor me `supabase/schema.sql` paste karke Run.
   Settings -> API se `Project URL` aur `service_role` key copy karo (service key kabhi frontend me mat daalna).
2. **GitHub**: ye folder ek repo me push karo.
3. **Vercel**: New Project -> repo import -> Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `ADMIN_PASSWORD` (login password)
   Deploy.
4. Site kholo -> password se login -> **Register** me students add karo -> **Scan** me attendance.

Local test: `npm i -g vercel && npm i && vercel dev` (`.env.example` ko `.env` banao).

## Features
Register (3-sample average), live scan + auto attendance, duplicate roke (1 student = 1 entry/day),
unknown face detect, student delete, date-wise Present/Absent report, CSV export, admin password protection, IST timezone.

## Notes
- Camera ke liye HTTPS chahiye (Vercel me by default hai).
- Match threshold `0.5` (`index.html` me `FaceMatcher`), kam = strict.
- Liveness detection (blink) abhi nahi hai - report ke Future Enhancements me hai.
