export type Language = "ar" | "en";

export interface TranslationDictionary {
  // Navigation & Header
  nav: {
    home: string;
    courses: string;
    about: string;
    telegram: string;
    admin: string;
    login: string;
    logout: string;
    toggleMenu: string;
    language: string;
    skipToContent: string;
  };
  // Hero Section
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    exploreCourses: string;
    telegramChannel: string;
    instructorCard: string;
    instructorTitle: string;
    directSupport: string;
  };
  // Levels Section
  levels: {
    badge: string;
    title: string;
    subtitle: string;
    viewLevelCourses: string;
  };
  // Instructor Section
  instructor: {
    badge: string;
    title: string;
    subtitle: string;
    joinCommunity: string;
    quote: string;
  };
  // Courses
  courses: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    allLevels: string;
    free: string;
    hours: string;
    lessons: string;
    viewCourse: string;
    emptyTitle: string;
    emptyDescription: string;
    resetFilters: string;
    backToCourses: string;
    courseContent: string;
    whatYouWillLearn: string;
    instructor: string;
    shareCourse: string;
    startCourse: string;
    publishedOn: string;
  };
  // Classroom & Lessons
  classroom: {
    backToCourse: string;
    curriculum: string;
    lesson: string;
    minutes: string;
    previousLesson: string;
    nextLesson: string;
    completeAndContinue: string;
    completed: string;
    notes: string;
    resources: string;
    noResources: string;
    download: string;
    telegramDiscuss: string;
    courseProgress: string;
  };
  // Admin Portal
  admin: {
    portalTitle: string;
    dashboard: string;
    courses: string;
    newCourse: string;
    editCourse: string;
    lessons: string;
    settings: string;
    taxonomies: string;
    logout: string;
    stats: {
      totalCourses: string;
      published: string;
      drafts: string;
      totalLessons: string;
      categories: string;
      levels: string;
    };
    login: {
      title: string;
      subtitle: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      submitButton: string;
      submitting: string;
      backToSite: string;
    };
    courseForm: {
      titleAr: string;
      slug: string;
      shortDesc: string;
      desc: string;
      level: string;
      category: string;
      thumbnail: string;
      uploadThumbnail: string;
      uploading: string;
      durationHours: string;
      isPublished: string;
      isFeatured: string;
      isFree: string;
      objectives: string;
      addObjective: string;
      save: string;
      cancel: string;
      delete: string;
      confirmDelete: string;
    };
    lessonForm: {
      title: string;
      slug: string;
      desc: string;
      videoUrl: string;
      durationMinutes: string;
      notes: string;
      isPublished: string;
      save: string;
      cancel: string;
      delete: string;
    };
    emptyCourses: string;
    emptyLessons: string;
  };
  // Common UI
  common: {
    save: string;
    saving: string;
    cancel: string;
    delete: string;
    edit: string;
    back: string;
    close: string;
    loading: string;
    error: string;
    success: string;
    allRightsReserved: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ar: {
    nav: {
      home: "الرئيسية",
      courses: "الدورات التعليمية",
      about: "عن الأستاذ",
      telegram: "قناة التليجرام",
      admin: "لوحة التحكم",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      toggleMenu: "تبديل القائمة",
      language: "اللغة",
      skipToContent: "انتقل إلى المحتوى الرئيسي",
    },
    hero: {
      badge: "منهجية علمية متكاملة",
      title: "تعلّم الإنجليزية بمنهجية حقيقية وفهم عميق",
      subtitle:
        "دروس تطبيقية مبنية بعناية، تبدأ معك من الأساس وتأخذك خطوة بخطوة نحو إتقان القواعد، النطق، والطلاقة اليومية بعيداً عن الحفظ الجاف.",
      exploreCourses: "تصفح الدورات",
      telegramChannel: "انضم لمجتمع التليجرام",
      instructorCard: "إشراف وتدريس",
      instructorTitle: "أستاذ ومطور محتوى تعليمي",
      directSupport: "متابعة مستمرة وإجابة على الاستفسارات",
    },
    levels: {
      badge: "المسار التعليمي",
      title: "مستويات مصممة لتنقلك من البداية للاحتراف",
      subtitle: "اختر المستوى المناسب لمعرفتك الحالية وتدرج في اكتساب مهارات اللغة بتسلسل منطقي مدروس.",
      viewLevelCourses: "استعرض دورات المستوى",
    },
    instructor: {
      badge: "عن المدرس",
      title: "الأستاذ حسين علي",
      subtitle: "شغفي هو تبسيط المفاهيم المعقدة ونقل المتعلم من التردد إلى التحدث التلقائي بثقة تامة.",
      joinCommunity: "تابع الشروحات اليومية على تليجرام",
      quote: "اللغة مهارة مكتسبة وليست موهبة حصرية؛ حين تفهم التركيب المنطقي للغة وتتدرب عملياً، ستجد تقدمك أسرع بكثير مما تتخيل.",
    },
    courses: {
      badge: "المكتبة التعليمية",
      title: "جميع الدورات المتاحة",
      subtitle: "دورات منظمة تركز على جوهر اللغة وتمنحك الأدوات العملية للتعلم الذاتي المستمر.",
      searchPlaceholder: "ابحث في عناوين الدورات...",
      allCategories: "جميع الأقسام",
      allLevels: "جميع المستويات",
      free: "مجاني",
      hours: "ساعات",
      lessons: "دروس",
      viewCourse: "عرض تفاصيل الدورة",
      emptyTitle: "لا توجد دورات متاحة حاليًا",
      emptyDescription: "يقوم الأستاذ حسين علي حالياً بإعداد وتسجيل دورات جديدة ومحدثة. ترقبوا الإطلاق قريباً على قناتنا على التليجرام!",
      resetFilters: "إعادة ضبط الفلاتر",
      backToCourses: "العودة لقائمة الدورات",
      courseContent: "منهج ومحتويات الدورة",
      whatYouWillLearn: "ماذا ستتعلم في هذه الدورة؟",
      instructor: "المدرّس",
      shareCourse: "مشاركة الدورة",
      startCourse: "بدء التعلم الآن",
      publishedOn: "نُشرت في",
    },
    classroom: {
      backToCourse: "العودة للدورة",
      curriculum: "قائمة الدروس",
      lesson: "الدرس",
      minutes: "دقيقة",
      previousLesson: "الدرس السابق",
      nextLesson: "الدرس التالي",
      completeAndContinue: "إكمال والانتقال للتالي",
      completed: "مكتمل",
      notes: "ملاحظات الدرس والشرح",
      resources: "المرفقات والملفات",
      noResources: "لا توجد ملفات مرفقة لهذا الدرس.",
      download: "تحميل الملف",
      telegramDiscuss: "ناقش هذا الدرس على تليجرام",
      courseProgress: "نسبة الإنجاز في الدورة",
    },
    admin: {
      portalTitle: "لوحة تحكم الأكاديمية",
      dashboard: "الرئيسية والإحصائيات",
      courses: "إدارة الدورات",
      newCourse: "إضافة دورة جديدة",
      editCourse: "تعديل الدورة",
      lessons: "إدارة الدروس",
      settings: "إعدادات المنصة",
      taxonomies: "التصنيفات والمستويات",
      logout: "تسجيل الخروج",
      stats: {
        totalCourses: "إجمالي الدورات",
        published: "منشور",
        drafts: "مسودات",
        totalLessons: "إجمالي الدروس",
        categories: "الأقسام",
        levels: "المستويات التعليمية",
      },
      login: {
        title: "تسجيل الدخول للإدارة",
        subtitle: "منطقة خاصة بالأستاذ حسين علي لإدارة المحتوى والدورات",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "admin@example.com",
        passwordLabel: "كلمة المرور",
        passwordPlaceholder: "••••••••••••",
        submitButton: "تسجيل الدخول",
        submitting: "جاري التحقق...",
        backToSite: "العودة إلى الموقع الرئيسي",
      },
      courseForm: {
        titleAr: "عنوان الدورة",
        slug: "الرابط اللطيف (Slug)",
        shortDesc: "الوصف المختصر",
        desc: "الوصف التفصيلي الشامل",
        level: "المستوى التعليمي",
        category: "القسم / التصنيف",
        thumbnail: "رابط صورة الغلاف",
        uploadThumbnail: "رفع صورة من جهازك",
        uploading: "جاري الرفع...",
        durationHours: "المدة الإجمالية (بالساعات)",
        isPublished: "نشر الدورة فوراً",
        isFeatured: "عرض في الصفحة الرئيسية (مميزة)",
        isFree: "دورة مجانية بالكامل",
        objectives: "أهداف ومخرجات التعلم",
        addObjective: "إضافة هدف تعليمي جديد",
        save: "حفظ بيانات الدورة",
        cancel: "إلغاء",
        delete: "حذف الدورة",
        confirmDelete: "هل أنت متأكد من رغبتك في حذف هذه الدورة وجميع الدروس المرتبطة بها؟ لا يمكن التراجع عن هذا الإجراء.",
      },
      lessonForm: {
        title: "عنوان الدرس",
        slug: "الرابط اللطيف (Slug)",
        desc: "وصف الدرس",
        videoUrl: "رابط الفيديو (YouTube / Vimeo)",
        durationMinutes: "مدة الدرس (بالدقائق)",
        notes: "ملاحظات الدرس والشرح (Markdown مدعوم)",
        isPublished: "منشور",
        save: "حفظ الدرس",
        cancel: "إلغاء",
        delete: "حذف الدرس",
      },
      emptyCourses: "لا توجد دورات حالياً. اضغط على 'إضافة دورة جديدة' للبدء.",
      emptyLessons: "لا توجد دروس مضافة لهذه الدورة بعد.",
    },
    common: {
      save: "حفظ",
      saving: "جاري الحفظ...",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      back: "رجوع",
      close: "إغلاق",
      loading: "جاري التحميل...",
      error: "حدث خطأ غير متوقع",
      success: "تمت العملية بنجاح",
      allRightsReserved: "جميع الحقوق محفوظة © حسين علي | أكاديمية تعلم اللغة الإنجليزية",
    },
  },
  en: {
    nav: {
      home: "Home",
      courses: "Courses",
      about: "About Instructor",
      telegram: "Telegram Channel",
      admin: "Admin Portal",
      login: "Sign In",
      logout: "Log Out",
      toggleMenu: "Toggle Menu",
      language: "Language",
      skipToContent: "Skip to main content",
    },
    hero: {
      badge: "Methodical & Structured English Learning",
      title: "Learn English with Clarity, Logic & Deep Understanding",
      subtitle:
        "Carefully crafted practical lessons that guide you step-by-step toward mastering grammar, pronunciation, and everyday fluency without rote memorization.",
      exploreCourses: "Explore Courses",
      telegramChannel: "Join Telegram Community",
      instructorCard: "Taught & Supervised by",
      instructorTitle: "Educator & English Content Creator",
      directSupport: "Continuous guidance & questions answered",
    },
    levels: {
      badge: "Learning Path",
      title: "Structured Levels from Beginner to Advanced Mastery",
      subtitle: "Choose the level that matches your current knowledge and progress smoothly through carefully sequenced lessons.",
      viewLevelCourses: "Browse Level Courses",
    },
    instructor: {
      badge: "About Instructor",
      title: "Instructor Hussein Ali",
      subtitle: "Dedicated to demystifying English and transforming hesitation into natural, confident conversation.",
      joinCommunity: "Follow Daily Lessons on Telegram",
      quote: "Language is an acquired skill, not an exclusive talent. When you understand the logic behind English and practice actively, your progress will be far faster than you imagine.",
    },
    courses: {
      badge: "Course Catalog",
      title: "Available Courses",
      subtitle: "Well-structured courses that focus on core mastery and empower you with practical tools for lifelong fluency.",
      searchPlaceholder: "Search course titles...",
      allCategories: "All Categories",
      allLevels: "All Levels",
      free: "Free",
      hours: "Hours",
      lessons: "Lessons",
      viewCourse: "View Course Details",
      emptyTitle: "No Courses Available Currently",
      emptyDescription: "Instructor Hussein Ali is currently recording and preparing fresh, updated courses. Stay tuned for the upcoming launch on our Telegram channel!",
      resetFilters: "Reset Filters",
      backToCourses: "Back to Courses",
      courseContent: "Course Curriculum",
      whatYouWillLearn: "What You Will Learn",
      instructor: "Instructor",
      shareCourse: "Share Course",
      startCourse: "Start Learning Now",
      publishedOn: "Published on",
    },
    classroom: {
      backToCourse: "Back to Course",
      curriculum: "Lesson List",
      lesson: "Lesson",
      minutes: "min",
      previousLesson: "Previous Lesson",
      nextLesson: "Next Lesson",
      completeAndContinue: "Complete & Next",
      completed: "Completed",
      notes: "Lesson Notes & Summary",
      resources: "Resources & Attachments",
      noResources: "No downloadable attachments for this lesson.",
      download: "Download Resource",
      telegramDiscuss: "Discuss on Telegram",
      courseProgress: "Course Progress",
    },
    admin: {
      portalTitle: "Academy Admin Portal",
      dashboard: "Dashboard & Stats",
      courses: "Manage Courses",
      newCourse: "Add New Course",
      editCourse: "Edit Course",
      lessons: "Manage Lessons",
      settings: "Platform Settings",
      taxonomies: "Taxonomies & Levels",
      logout: "Sign Out",
      stats: {
        totalCourses: "Total Courses",
        published: "Published",
        drafts: "Drafts",
        totalLessons: "Total Lessons",
        categories: "Categories",
        levels: "Proficiency Levels",
      },
      login: {
        title: "Admin Sign In",
        subtitle: "Exclusive portal for Instructor Hussein Ali to manage educational content",
        emailLabel: "Email Address",
        emailPlaceholder: "admin@example.com",
        passwordLabel: "Password",
        passwordPlaceholder: "••••••••••••",
        submitButton: "Sign In",
        submitting: "Verifying...",
        backToSite: "Return to Main Site",
      },
      courseForm: {
        titleAr: "Course Title",
        slug: "URL Slug",
        shortDesc: "Short Description",
        desc: "Full Comprehensive Description",
        level: "Proficiency Level",
        category: "Category",
        thumbnail: "Thumbnail Image URL",
        uploadThumbnail: "Upload Image File",
        uploading: "Uploading...",
        durationHours: "Total Duration (Hours)",
        isPublished: "Publish Immediately",
        isFeatured: "Featured on Homepage",
        isFree: "Free of Charge",
        objectives: "Learning Objectives",
        addObjective: "Add New Objective",
        save: "Save Course",
        cancel: "Cancel",
        delete: "Delete Course",
        confirmDelete: "Are you sure you want to delete this course and all associated lessons? This action cannot be undone.",
      },
      lessonForm: {
        title: "Lesson Title",
        slug: "URL Slug",
        desc: "Lesson Summary",
        videoUrl: "Video URL (YouTube / Vimeo)",
        durationMinutes: "Duration (Minutes)",
        notes: "Lesson Notes (Markdown supported)",
        isPublished: "Published",
        save: "Save Lesson",
        cancel: "Cancel",
        delete: "Delete Lesson",
      },
      emptyCourses: "No courses found yet. Click 'Add New Course' to create one.",
      emptyLessons: "No lessons added to this course yet.",
    },
    common: {
      save: "Save",
      saving: "Saving...",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      back: "Back",
      close: "Close",
      loading: "Loading...",
      error: "An unexpected error occurred",
      success: "Operation completed successfully",
      allRightsReserved: "All Rights Reserved © Hussein Ali | English Learning Academy",
    },
  },
};
