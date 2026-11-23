# حسين علي | أكاديمية تعلم اللغة الإنجليزية
### Hussein Ali English Academy

🔗 **رابط المنصة الرسمي على Render**: [https://hussein-ali-english.onrender.com](https://hussein-ali-english.onrender.com)  
🔐 **بوابة إدارة المحتوى (خاص بالأستاذ حسين)**: [https://hussein-ali-english.onrender.com/admin/login](https://hussein-ali-english.onrender.com/admin/login)  
🩺 **فحص حالة الخادم وقاعدة البيانات**: [https://hussein-ali-english.onrender.com/api/health](https://hussein-ali-english.onrender.com/api/health)

---

منصة تعليمية متكاملة واحترافية لتعليم اللغة الإنجليزية لصالح الأستاذ **حسين علي**.
تم بناء المشروع بأحدث تقنيات الويب الحديثة لتقديم تجربة تعليمية سلسة، هادئة، وخالية من المشتتات، مع لوحة تحكم إدارية خاصة بالمدرس لإدارة الكورسات والدروس، وتكامل مباشر مع قناة Telegram الرسمية.

---

## 🌟 مميزات المنصة

- **تصميم تحريري هادئ وأكاديمي (Human-Crafted Editorial Design)**:
  - ألوان طبيعية وورقية مريحة للعين (`#FCFBF8`) مع درجات حبر إنجليزية عميقة (`#13211D`) ولمسات نحاسية دافئة (`#BA7C2C`).
  - دعم كامل للغة العربية والاتجاه **RTL** مع عرض النصوص والمصطلحات الإنجليزية بنسق **LTR**.
  - تجنب التصاميم الجاهزة ومظاهر الـ AI النيونية أو الزجاجية المبتذلة.
- **تكامل مباشر مع قناة Telegram**:
  - رابط قناة الأستاذ حسين علي: [https://t.me/gccxic](https://t.me/gccxic) في جميع أقسام المنصة وصفحات المشاهدة.
- **فهرس الكورسات والبحث الذكي**:
  - تصنيف الكورسات حسب المستويات الخمسة (Beginner, Elementary, Intermediate, Upper-Intermediate, Advanced).
  - تصنيف حسب المهارات اللغوية (Grammar, Speaking, Vocabulary, Pronunciation, Listening, Writing).
  - بحث فوري عن الكورسات والموضوعات.
- **قاعة مشاهدة الدروس وتتبع التقدم (Classroom Player)**:
  - مشغل فيديو يدعم تضمين YouTube و Vimeo والفيديوهات المباشرة.
  - إمكانية تحديد الدرس كمكتمل مع حفظ التقدم تلقائياً للطلاب.
  - شريط نسبة الإنجاز في الكورس وملاحظات وشروحات الدرس المكتوبة.
  - روابط تحميل الملحقات وملفات الـ PDF.
- **لوحة تحكم كاملة للمدرس (`/admin`)**:
  - حماية تامة ومصادقة إدارية آمنة تمنع وصول الزوار.
  - إضافة، تعديل، حذف، ونشر الكورسات.
  - إدارة دروس الكورس مع ميزة إعادة الترتيب صعوداً وهبوطاً (Move Up/Down).
  - تعديل بيانات المدرس، نبذته، رسالته، وعنوان الصفحة الرئيسية، ورابط التلغرام.
  - إدارة التصنيفات ومستويات اللغة.
- **جاهزية التوسع المستقبلي للكورسات المدفوعة**:
  - بنية قاعدة البيانات مهيأة مسبقاً لحقول الأسعار وبوابات الدفع وتسجيل الطلاب عند الحاجة لاحقاً دون إعادة بناء النظام.

---

## 🛠 التقنيات المستخدمة (Tech Stack)

- **Frontend & Backend**: Next.js 14 (App Router), React 18, TypeScript (Strict Mode).
- **Styling**: Tailwind CSS, Editorial Layouts, Hairline Borders.
- **Database & Auth**: PostgreSQL (Supabase Database & Migrations), Supabase Auth.
- **Icons**: Lucide React.
- **Validation & Types**: Zod, TypeScript.
- **Deployment**: Render Web Service (`render.yaml`), Docker/Node 20.

---

## 📁 هيكلية المشروع

```text
├── data/
│   └── store.json               # مستودع بيانات محلي احتياطي متزامن
├── render.yaml                  # ملف إعدادات النشر المباشر على Render
├── supabase/
│   ├── migrations/
│   │   └── 20261123_init_schema.sql  # مخطط الجداول والصلاحيات و RLS
│   └── seed.sql                 # البيانات الأولية للكورسات والدروس
├── src/
│   ├── app/
│   │   ├── (dashboard)/         # مسارات لوحة التحكم المحمية
│   │   ├── admin/login/         # صفحة تسجيل دخول المدرس
│   │   ├── api/health/          # نقطة مراقبة حالة الخادم لـ Render
│   │   ├── courses/             # فهرس وتفاصيل الكورسات وقاعة الدروس
│   │   ├── layout.tsx           # المظهر العام والخطوط
│   │   ├── page.tsx             # الصفحة الرئيسية
│   │   ├── robots.ts            # ملف robots.txt لتحسين SEO
│   │   └── sitemap.ts           # خريطة الموقع التفاعلية sitemap.xml
│   ├── components/
│   │   ├── admin/               # مكونات لوحة التحكم
│   │   ├── classroom/           # مشغل الفيديو وقاعة الدرس
│   │   ├── courses/             # بطاقات الكورسات والفلاتر
│   │   ├── home/                # أقسام الصفحة الرئيسية
│   │   └── layout/              # الهيدر والفوتر
│   ├── lib/
│   │   ├── actions/             # Server Actions (إدارة الكورسات، المصادقة)
│   │   ├── auth/                # إدارة جلسات المدير المشفرة
│   │   ├── data/                # مستودع البيانات الموحد (Supabase / Local)
│   │   ├── db.ts                # اتصال مباشر بقاعدة بيانات PostgreSQL
│   │   └── supabase/            # عملاء Supabase (Browser, Server, Admin)
│   ├── middleware.ts            # حماية مسارات الإدارة
│   └── types/                   # تعريفات TypeScript
```

---

## 🚀 التشغيل المباشر والإنتاج (Live Production)

- **رابط المنصة المنشور**: [https://hussein-ali-english.onrender.com](https://hussein-ali-english.onrender.com)
- **لوحة الإدارة**: [https://hussein-ali-english.onrender.com/admin](https://hussein-ali-english.onrender.com/admin)

### التشغيل محلياً:
1. تثبيت التبعات:
   ```bash
   npm install
   ```
2. تشغيل خادم التطوير:
   ```bash
   npm run dev
   ```
3. فتح الموقع في المتصفح: [https://hussein-ali-english.onrender.com](https://hussein-ali-english.onrender.com) أو عبر المنفذ المحلي `http://localhost:3000`.

---

## 🔐 بيانات دخول لوحة التحكم (Admin Portal)

- **الرابط**: [https://hussein-ali-english.onrender.com/admin/login](https://hussein-ali-english.onrender.com/admin/login)
- **البريد الافتراضي**: `admin@husseinali.com`
- **كلمة المرور الافتراضية**: `HusseinAli2026!`

*(يمكن تخصيصها عبر ملف `.env` أو متغيرات استضافة Render عبر `ADMIN_EMAIL` و `ADMIN_PASSWORD`)*.

---

## 🌐 النشر على Render

تم تجهيز ملف `render.yaml` مسبقاً، كل ما عليك هو:
1. ربط هذا المستودع بحسابك على [Render](https://render.com).
2. إضافة متغيرات البيئة الموضحة في ملف `.env.example`.
3. ستبدأ عملية البناء والنشر تلقائياً مع مراقبة الصحة عبر `/api/health`.

---

© جميع الحقوق محفوظة للأستاذ **حسين علي** | منصة تعلم اللغة الإنجليزية.
