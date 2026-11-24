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
  // Home Courses Overview
  homeCourses: {
    badge: string;
    title: string;
    viewAll: (count: number) => string;
    featuredBadge: string;
  };
  // Levels Section
  levels: {
    badge: string;
    title: string;
    subtitle: string;
    viewLevelCourses: string;
  };
  levelDescriptions: Record<string, string>;
  // Instructor Section
  instructor: {
    badge: string;
    name: string;
    title: string;
    subtitle: string;
    bio: string;
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
    dashboardOverview: {
      cmsBadge: string;
      welcome: string;
      subtitle: string;
      newCourse: string;
      liveSite: string;
      totalCourses: string;
      publishedBadge: string;
      draftsBadge: string;
      totalLessons: string;
      lessonsSubtitle: string;
      categories: string;
      categoriesSubtitle: string;
      levels: string;
      levelsSubtitle: string;
      recentTitle: string;
      recentSubtitle: string;
      manageAllCourses: string;
      thCourse: string;
      thLevelCategory: string;
      thLessons: string;
      thStatus: string;
      thActions: string;
      lessonsCountLabel: string;
      editAction: string;
      manageLessonsAction: string;
      publishedState: string;
      draftState: string;
    };
    coursesPage: {
      title: string;
      subtitle: string;
      newCourse: string;
      thCourse: string;
      thLevel: string;
      thCategory: string;
      thDuration: string;
      thLessons: string;
      thStatus: string;
      thActions: string;
      publishedForStudents: string;
      draftState: string;
      lessonsBtn: string;
      editBtn: string;
      deleteConfirm: string;
    };
    courseForm: {
      newTitle: string;
      editTitle: string;
      subtitle: string;
      titleAr: string;
      slug: string;
      level: string;
      category: string;
      durationHours: string;
      thumbnail: string;
      uploadThumbnail: string;
      uploading: string;
      shortDesc: string;
      desc: string;
      objectives: string;
      objectivesPlaceholder: string;
      isPublished: string;
      isFeatured: string;
      isFree: string;
      addObjective: string;
      delete: string;
      confirmDelete: string;
      cancel: string;
      save: string;
      saving: string;
      backToList: string;
    };
    taxonomiesPage: {
      title: string;
      subtitle: string;
      categoriesTitle: string;
      categoriesSubtitle: string;
      addCategoryTitle: string;
      catNameAr: string;
      catNameEn: string;
      catDesc: string;
      addCategoryBtn: string;
      addingCategory: string;
      levelsTitle: string;
      levelsSubtitle: string;
      addLevelTitle: string;
      lvlNameAr: string;
      lvlNameEn: string;
      lvlDesc: string;
      addLevelBtn: string;
      addingLevel: string;
    };
    settingsPage: {
      title: string;
      subtitle: string;
      section1Title: string;
      instructorName: string;
      instructorTitle: string;
      instructorBio: string;
      instructorMessage: string;
      section2Title: string;
      siteNameAr: string;
      siteNameEn: string;
      heroTitle: string;
      heroSubtitle: string;
      section3Title: string;
      telegramUrl: string;
      telegramChannel: string;
      contactEmail: string;
      footerCopyright: string;
      saveChanges: string;
      saving: string;
    };
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
      instructorTitle: "أستاذ ومطور محتوى تعليمي للغة الإنجليزية",
      directSupport: "متابعة مستمرة وإجابة على الاستفسارات",
    },
    homeCourses: {
      badge: "الكورسات والمناهج المتاحة",
      title: "أحدث الكورسات التعليمية",
      viewAll: (count: number) => `مشاهدة جميع الكورسات (${count})`,
      featuredBadge: "الكورس المميز المقترح للبدء",
    },
    levels: {
      badge: "المسار التعليمي",
      title: "مستويات مصممة لتنقلك من البداية للاحتراف",
      subtitle: "اختر المستوى المناسب لمعرفتك الحالية وتدرج في اكتساب مهارات اللغة بتسلسل منطقي مدروس.",
      viewLevelCourses: "استعرض دورات المستوى",
    },
    levelDescriptions: {
      beginner: "للراغبين بالبدء من الصفر وبناء اللبنات الأولى للغة.",
      elementary: "تكوين الجمل البسيطة وفهم العبارات اليومية المباشرة.",
      intermediate: "التعامل مع المواقف الحياتية والتعبير عن الآراء والتجارب.",
      "upper-intermediate": "التحدث بطلاقة وتناول موضوعات معقدة وفهم التفاصيل الدقيقة.",
      advanced: "استخدام اللغة بمرونة واحترافية في السياقات الأكاديمية والمهنية.",
    },
    instructor: {
      badge: "عن المدرس",
      name: "حسين علي",
      title: "أستاذ ومطور محتوى تعليمي للغة الإنجليزية",
      subtitle: "التعليم المبني على الإتقان العملي وليس التلقين الجاف",
      bio: "أهلاً بك، أنا حسين علي، شغفي هو نقل الطالب العربي من مرحلة التردد والخوف من الأخطاء إلى مرحلة الاستيعاب العميق والتحدث التلقائي. بنيت هذه المنصة لتكون مرجعك المنظم بعيداً عن التشتت.",
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
      dashboardOverview: {
        cmsBadge: "نظام إدارة المحتوى / CMS",
        welcome: "مرحباً بك يا أستاذ حسين علي",
        subtitle: "من هنا يمكنك إضافة وتعديل الكورسات والدروس، وإدارة محتوى المنصة وقناة التلغرام.",
        newCourse: "إضافة كورس جديد",
        liveSite: "عرض المنصة (onrender.com)",
        totalCourses: "إجمالي الدورات",
        publishedBadge: "منشور",
        draftsBadge: "مسودة",
        totalLessons: "إجمالي الدروس",
        lessonsSubtitle: "دروس تفاعلية ومسجلة",
        categories: "الأقسام اللغوية",
        categoriesSubtitle: "قواعد، محادثة، نطق...",
        levels: "المستويات التعليمية",
        levelsSubtitle: "Beginner → Advanced",
        recentTitle: "الدورات في المنصة",
        recentSubtitle: "إدارة الكورسات، إضافة الدروس، وتعديل الحالة بين منشور ومسودة.",
        manageAllCourses: "إدارة جميع الدورات",
        thCourse: "الدورة",
        thLevelCategory: "المستوى / التصنيف",
        thLessons: "الدروس",
        thStatus: "الحالة",
        thActions: "إجراءات",
        lessonsCountLabel: "دروس",
        editAction: "تعديل",
        manageLessonsAction: "الدروس",
        publishedState: "منشور",
        draftState: "مسودة",
      },
      coursesPage: {
        title: "إدارة الكورسات التعليمية",
        subtitle: "إضافة كورس جديد، تعديل الدروس، النشر، وتحديد المستويات والتصنيفات.",
        newCourse: "إضافة كورس جديد",
        thCourse: "الكورس",
        thLevel: "المستوى",
        thCategory: "التصنيف",
        thDuration: "المدة",
        thLessons: "الدروس",
        thStatus: "الحالة",
        thActions: "إجراءات",
        publishedForStudents: "منشور للطلاب",
        draftState: "مسودة",
        lessonsBtn: "الدروس",
        editBtn: "تعديل",
        deleteConfirm: "هل أنت متأكد من رغبتك في حذف هذا الكورس وجميع دروسه نهائياً؟",
      },
      courseForm: {
        newTitle: "إضافة كورس تعليمي جديد",
        editTitle: "تعديل بيانات الكورس",
        subtitle: "أدخل بيانات الكورس، المستوى والتصنيف. ستتمكن من إضافة الدروس والفيديوهات بعد الحفظ.",
        titleAr: "عنوان الكورس *",
        slug: "المعرّف في الرابط (Slug)",
        level: "المستوى اللغوي *",
        category: "التصنيف اللغوي *",
        durationHours: "المدة التقديرية (بالساعات)",
        thumbnail: "صورة غلاف الكورس (Thumbnail)",
        uploadThumbnail: "رفع صورة لـ Supabase",
        uploading: "جاري الرفع...",
        shortDesc: "نبذة مختصرة (تظهر في بطاقة الكورس) *",
        desc: "الوصف الشامل للكورس *",
        objectives: "أهداف الكورس (ماذا سيكتسب الطالب؟) - سطر لكل هدف",
        objectivesPlaceholder: "فهم أزمنة الفعل واستخدامها بعفوية\nتجنب الأخطاء الشائعة في النطق\nإتقان السؤال والنفي دون ترجمة حرفية",
        isPublished: "نشر الكورس للطلاب فور الحفظ (Publish)",
        isFeatured: "تمييز الكورس في صدارة الصفحة الرئيسية (Featured)",
        isFree: "دورة مجانية بالكامل",
        addObjective: "إضافة هدف تعليمي جديد",
        delete: "حذف الكورس",
        confirmDelete: "هل أنت متأكد من رغبتك في حذف هذا الكورس وجميع الدروس المرتبطة به؟ لا يمكن التراجع عن هذا الإجراء.",
        cancel: "إلغاء والعودة لقائمة الكورسات",
        save: "حفظ بيانات الكورس",
        saving: "جاري الحفظ...",
        backToList: "العودة لقائمة الكورسات",
      },
      taxonomiesPage: {
        title: "إدارة التصنيفات ومستويات اللغة",
        subtitle: "تنظيم مجالات اللغة ومستويات الإطار الأوروبي وتخصيص مسارات الطلاب.",
        categoriesTitle: "تصنيفات الكورسات",
        categoriesSubtitle: "التصنيفات المتاحة لتنظيم مجالات اللغة (Grammar, Speaking, etc.)",
        addCategoryTitle: "إضافة تصنيف جديد",
        catNameAr: "الاسم بالعربية (مثال: محادثة متقدمة)",
        catNameEn: "English Name",
        catDesc: "وصف مختصر للتصنيف...",
        addCategoryBtn: "إضافة التصنيف",
        addingCategory: "جاري الإضافة...",
        levelsTitle: "مستويات اللغة",
        levelsSubtitle: "المستويات المعتمدة للتقسيم التعليمي (Beginner إلى Advanced)",
        addLevelTitle: "إضافة مستوى تعليمي جديد",
        lvlNameAr: "المستوى بالعربية",
        lvlNameEn: "Level in English",
        lvlDesc: "وصف مرحلة التعلم...",
        addLevelBtn: "إضافة المستوى",
        addingLevel: "جاري الإضافة...",
      },
      settingsPage: {
        title: "إعدادات المنصة والمحتوى العام",
        subtitle: "تعديل نبذة المدرس، العناوين الرئيسية، ورابط قناة التلغرام ومعلومات التواصل.",
        section1Title: "بيانات المدرس والهوية الشخصية",
        instructorName: "اسم المدرس *",
        instructorTitle: "الصفة / اللقب المهني *",
        instructorBio: "نبذة تعريفية عن المدرس (تظهر في قسم 'عن المدرس') *",
        instructorMessage: "رسالة المدرس للطلاب (اقتباس ملهم بالصفحة الرئيسية)",
        section2Title: "واجهة الصفحة الرئيسية والـ Hero Section",
        siteNameAr: "اسم المنصة بالعربية",
        siteNameEn: "اسم المنصة بالإنجليزية",
        heroTitle: "العنوان الرئيسي (Hero Title) *",
        heroSubtitle: "الوصف التعريفي (Hero Subtitle) *",
        section3Title: "إعدادات قناة Telegram والتواصل",
        telegramUrl: "رابط قناة Telegram الرسمي *",
        telegramChannel: "معرّف القناة (للعرض)",
        contactEmail: "البريد الإلكتروني للتواصل",
        footerCopyright: "نص حقوق الملكية في الـ Footer",
        saveChanges: "حفظ التغييرات",
        saving: "جاري الحفظ...",
      },
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
    homeCourses: {
      badge: "Available Courses & Curricula",
      title: "Latest Educational Courses",
      viewAll: (count: number) => `View All Courses (${count})`,
      featuredBadge: "Featured Course Recommended to Start",
    },
    levels: {
      badge: "Learning Path",
      title: "Structured Levels from Beginner to Advanced Mastery",
      subtitle: "Choose the level that matches your current knowledge and progress smoothly through carefully sequenced lessons.",
      viewLevelCourses: "Browse Level Courses",
    },
    levelDescriptions: {
      beginner: "For those looking to start from scratch and build foundational language blocks.",
      elementary: "Form simple sentences and understand direct everyday expressions.",
      intermediate: "Handle real-life situations, expressing opinions and experiences.",
      "upper-intermediate": "Speak fluently, address complex topics and grasp subtle details.",
      advanced: "Use English flexibly and professionally in academic and career contexts.",
    },
    instructor: {
      badge: "About Instructor",
      name: "Hussein Ali",
      title: "Educator & English Content Creator",
      subtitle: "Practical Mastery Over Rote Memorization",
      bio: "Welcome! I am Hussein Ali. My passion is taking Arab learners from hesitation and fear of errors to deep comprehension and spontaneous, natural fluency. I built this platform to be your structured, distraction-free reference.",
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
      dashboardOverview: {
        cmsBadge: "Content Management System / CMS",
        welcome: "Welcome, Instructor Hussein Ali",
        subtitle: "From here you can add and manage courses, lessons, and platform content.",
        newCourse: "Add New Course",
        liveSite: "View Live Site (onrender.com)",
        totalCourses: "Total Courses",
        publishedBadge: "Published",
        draftsBadge: "Drafts",
        totalLessons: "Total Lessons",
        lessonsSubtitle: "Interactive & Recorded Lessons",
        categories: "Language Categories",
        categoriesSubtitle: "Grammar, Speaking, Pronunciation...",
        levels: "Proficiency Levels",
        levelsSubtitle: "Beginner → Advanced",
        recentTitle: "Courses on Platform",
        recentSubtitle: "Manage courses, add lessons, and switch publish status.",
        manageAllCourses: "Manage All Courses",
        thCourse: "Course",
        thLevelCategory: "Level / Category",
        thLessons: "Lessons",
        thStatus: "Status",
        thActions: "Actions",
        lessonsCountLabel: "Lessons",
        editAction: "Edit",
        manageLessonsAction: "Lessons",
        publishedState: "Published",
        draftState: "Draft",
      },
      coursesPage: {
        title: "Manage Educational Courses",
        subtitle: "Add a new course, manage lessons, publishing status, and assign levels & categories.",
        newCourse: "Add New Course",
        thCourse: "Course",
        thLevel: "Level",
        thCategory: "Category",
        thDuration: "Duration",
        thLessons: "Lessons",
        thStatus: "Status",
        thActions: "Actions",
        publishedForStudents: "Published for Students",
        draftState: "Draft",
        lessonsBtn: "Lessons",
        editBtn: "Edit",
        deleteConfirm: "Are you sure you want to delete this course and all its lessons permanently?",
      },
      courseForm: {
        newTitle: "Add New Educational Course",
        editTitle: "Edit Course Details",
        subtitle: "Enter the new course details, level, and category. You will be able to add lessons and videos after saving.",
        titleAr: "Course Title *",
        slug: "URL Slug",
        level: "Proficiency Level *",
        category: "Language Category *",
        durationHours: "Estimated Duration (Hours)",
        thumbnail: "Course Thumbnail URL",
        uploadThumbnail: "Upload Image to Supabase",
        uploading: "Uploading...",
        shortDesc: "Short Summary (Appears on course card) *",
        desc: "Comprehensive Course Description *",
        objectives: "Course Objectives (One per line)",
        objectivesPlaceholder: "Understand verb tenses and use them naturally\nAvoid common pronunciation mistakes\nMaster questions and negatives without literal translation",
        isPublished: "Publish course for students immediately",
        isFeatured: "Feature on Homepage",
        isFree: "Completely Free",
        addObjective: "Add New Objective",
        delete: "Delete Course",
        confirmDelete: "Are you sure you want to delete this course and all associated lessons? This action cannot be undone.",
        cancel: "Cancel & Return to Courses",
        save: "Save Course Details",
        saving: "Saving...",
        backToList: "Return to Course List",
      },
      taxonomiesPage: {
        title: "Manage Categories & Language Levels",
        subtitle: "Organize language domains and CEFR levels to structure student learning paths.",
        categoriesTitle: "Course Categories",
        categoriesSubtitle: "Available categories to organize language areas (Grammar, Speaking, etc.)",
        addCategoryTitle: "Add New Category",
        catNameAr: "Arabic Name (e.g., محادثة متقدمة)",
        catNameEn: "English Name",
        catDesc: "Brief category description...",
        addCategoryBtn: "Add Category",
        addingCategory: "Adding...",
        levelsTitle: "Language Levels",
        levelsSubtitle: "Approved CEFR levels (Beginner to Advanced)",
        addLevelTitle: "Add New Educational Level",
        lvlNameAr: "Level in Arabic",
        lvlNameEn: "Level in English",
        lvlDesc: "Learning stage description...",
        addLevelBtn: "Add Level",
        addingLevel: "Adding...",
      },
      settingsPage: {
        title: "Platform Settings & General Content",
        subtitle: "Edit instructor bio, headlines, Telegram channel link, and contact details.",
        section1Title: "Instructor Identity & Profile",
        instructorName: "Instructor Name *",
        instructorTitle: "Professional Title / Designation *",
        instructorBio: "Instructor Bio (Appears in About section) *",
        instructorMessage: "Instructor Quote (Inspiring quote on homepage)",
        section2Title: "Homepage & Hero Section",
        siteNameAr: "Platform Name in Arabic",
        siteNameEn: "Platform Name in English",
        heroTitle: "Hero Title *",
        heroSubtitle: "Hero Subtitle *",
        section3Title: "Telegram Channel & Contact Settings",
        telegramUrl: "Official Telegram Channel Link *",
        telegramChannel: "Channel Handle (for display)",
        contactEmail: "Contact Email",
        footerCopyright: "Footer Copyright Notice",
        saveChanges: "Save Changes",
        saving: "Saving...",
      },
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
