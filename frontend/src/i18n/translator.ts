import { SupportedLanguage } from './languages';

type TranslationMap = Record<string, Record<SupportedLanguage, string>>;

const translations: TranslationMap = {
  // ─── App-wide ───
  'app.title': {
    en: 'TaskFlow', hi: 'टास्कफ्लो', te: 'టాస్క్‌ఫ్లో', ta: 'டாஸ்க்ஃப்ளோ', kn: 'ಟಾಸ್ಕ್‌ಫ್ಲೋ',
  },
  'app.subtitle': {
    en: 'Streamline your workflow', hi: 'अपने वर्कफ़्लो को सुव्यवस्थित करें', te: 'మీ వర్క్‌ఫ్లోను క్రమబద్ధీకరించండి', ta: 'உங்கள் பணிப்பாய்வை ஒழுங்குபடுத்துங்கள்', kn: 'ನಿಮ್ಮ ವರ್ಕ್‌ಫ್ಲೋ ಅನ್ನು ಸುಗಮಗೊಳಿಸಿ',
  },

  // ─── Auth ───
  'auth.welcome': {
    en: 'Welcome Back', hi: 'वापसी पर स्वागत है', te: 'తిరిగి స్వాగతం', ta: 'மீண்டும் வரவேற்கிறோம்', kn: 'ಮರಳಿ ಸ್ವಾಗತ',
  },
  'auth.login': {
    en: 'Sign In', hi: 'साइन इन', te: 'సైన్ ఇన్', ta: 'உள்நுழை', kn: 'ಸೈನ್ ಇನ್',
  },
  'auth.signup': {
    en: 'Sign Up', hi: 'साइन अप', te: 'సైన్ అప్', ta: 'பதிவு செய்', kn: 'ಸೈನ್ ಅಪ್',
  },
  'auth.email': {
    en: 'Email', hi: 'ईमेल', te: 'ఇమెయిల్', ta: 'மின்னஞ்சல்', kn: 'ಇಮೇಲ್',
  },
  'auth.password': {
    en: 'Password', hi: 'पासवर्ड', te: 'పాస్‌వర్డ్', ta: 'கடவுச்சொல்', kn: 'ಪಾಸ್‌ವರ್ಡ್',
  },
  'auth.name': {
    en: 'Full Name', hi: 'पूरा नाम', te: 'పూర్తి పేరు', ta: 'முழு பெயர்', kn: 'ಪೂರ್ಣ ಹೆಸರು',
  },
  'auth.role': {
    en: 'Role', hi: 'भूमिका', te: 'పాత్ర', ta: 'பங்கு', kn: 'ಪಾತ್ರ',
  },
  'auth.noAccount': {
    en: "Don't have an account?", hi: 'खाता नहीं है?', te: 'ఖాతా లేదా?', ta: 'கணக்கு இல்லையா?', kn: 'ಖಾತೆ ಇಲ್ಲವೇ?',
  },
  'auth.hasAccount': {
    en: 'Already have an account?', hi: 'पहले से खाता है?', te: 'ఇప్పటికే ఖాతా ఉందా?', ta: 'ஏற்கனவே கணக்கு உள்ளதா?', kn: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
  },
  'auth.createAccount': {
    en: 'Create Account', hi: 'खाता बनाएं', te: 'ఖాతా సృష్టించండి', ta: 'கணக்கை உருவாக்கு', kn: 'ಖಾತೆ ರಚಿಸಿ',
  },
  'auth.loginSubtitle': {
    en: 'Sign in to manage your tasks', hi: 'अपने कार्यों को प्रबंधित करने के लिए साइन इन करें', te: 'మీ టాస్క్‌లను నిర్వహించడానికి సైన్ ఇన్ చేయండి', ta: 'உங்கள் பணிகளை நிர்வகிக்க உள்நுழையவும்', kn: 'ನಿಮ್ಮ ಕಾರ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
  },

  // ─── Navigation ───
  'nav.dashboard': {
    en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డాష్‌బోర్డ్', ta: 'டாஷ்போர்டு', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  'nav.tasks': {
    en: 'Tasks', hi: 'कार्य', te: 'టాస్క్‌లు', ta: 'பணிகள்', kn: 'ಕಾರ್ಯಗಳು',
  },
  'nav.logout': {
    en: 'Logout', hi: 'लॉग आउट', te: 'లాగ్ అవుట్', ta: 'வெளியேறு', kn: 'ಲಾಗ್ ಔಟ್',
  },
  'nav.settings': {
    en: 'Settings', hi: 'सेटिंग्स', te: 'సెట్టింగ్‌లు', ta: 'அமைப்புகள்', kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
  },

  // ─── Sidebar ───
  'sidebar.forYou': {
    en: 'For you', hi: 'आपके लिए', te: 'మీ కోసం', ta: 'உங்களுக்காக', kn: 'ನಿಮಗಾಗಿ',
  },
  'sidebar.spaces': {
    en: 'Spaces', hi: 'स्पेस', te: 'స్పేస్‌లు', ta: 'இடங்கள்', kn: 'ಸ್ಪೇಸ್‌ಗಳು',
  },
  'sidebar.moreSpaces': {
    en: 'More spaces', hi: 'और स्पेस', te: 'మరిన్ని స్పేస్‌లు', ta: 'மேலும் இடங்கள்', kn: 'ಹೆಚ್ಚಿನ ಸ್ಪೇಸ್‌ಗಳು',
  },
  'sidebar.recommended': {
    en: 'Recommended', hi: 'अनुशंसित', te: 'సిఫార్సు', ta: 'பரிந்துரை', kn: 'ಶಿಫಾರಸು',
  },
  'sidebar.collectRequests': {
    en: 'Collect requests', hi: 'अनुरोध एकत्र करें', te: 'అభ్యర్థనలు సేకరించండి', ta: 'கோரிக்கைகள் சேகரி', kn: 'ವಿನಂತಿ ಸಂಗ್ರಹಿಸಿ',
  },
  'sidebar.importWork': {
    en: 'Import work', hi: 'काम आयात करें', te: 'పని దిగుమతి చేయండి', ta: 'வேலை இறக்குமதி செய்', kn: 'ಕೆಲಸ ಆಮದು ಮಾಡಿ',
  },
  'sidebar.more': {
    en: 'More', hi: 'अधिक', te: 'మరింత', ta: 'மேலும்', kn: 'ಇನ್ನಷ್ಟು',
  },
  'sidebar.spaceName': {
    en: 'NaveenPersonal', hi: 'NaveenPersonal', te: 'NaveenPersonal', ta: 'NaveenPersonal', kn: 'NaveenPersonal',
  },
  'sidebar.logout': {
    en: 'Logout', hi: 'लॉग आउट', te: 'లాగ్ అవుట్', ta: 'வெளியேறு', kn: 'ಲಾಗ್ ಔಟ್',
  },

  // ─── Header ───
  'header.search': {
    en: 'Search', hi: 'खोजें', te: 'శోధించు', ta: 'தேடு', kn: 'ಹುಡುಕಿ',
  },
  'header.profile': {
    en: 'Profile', hi: 'प्रोफ़ाइल', te: 'ప్రొఫైల్', ta: 'சுயவிவரம்', kn: 'ಪ್ರೊಫೈಲ್',
  },
  'header.seePlans': {
    en: 'See plans', hi: 'योजनाएं देखें', te: 'ప్రణాళికలు చూడండి', ta: 'திட்டங்கள் பாருங்கள்', kn: 'ಯೋಜನೆಗಳನ್ನು ನೋಡಿ',
  },
  'header.notifications': {
    en: 'Notifications', hi: 'सूचनाएं', te: 'నోటిఫికేషన్లు', ta: 'அறிவிப்புகள்', kn: 'ಅಧಿಸೂಚನೆಗಳು',
  },
  'header.summary': {
    en: 'Summary', hi: 'सारांश', te: 'సారాంశం', ta: 'சுருக்கம்', kn: 'ಸಾರಾಂಶ',
  },
  'header.backlog': {
    en: 'Backlog', hi: 'बैकलॉग', te: 'బ్యాక్‌లాగ్', ta: 'பேக்லாக்', kn: 'ಬ್ಯಾಕ್‌ಲಾಗ್',
  },
  'header.board': {
    en: 'Board', hi: 'बोर्ड', te: 'బోర్డ్', ta: 'போர்டு', kn: 'ಬೋರ್ಡ್',
  },
  'header.code': {
    en: 'Code', hi: 'कोड', te: 'కోడ్', ta: 'குறியீடு', kn: 'ಕೋಡ್',
  },
  'header.timeline': {
    en: 'Timeline', hi: 'समयरेखा', te: 'టైమ్‌లైన్', ta: 'காலவரிசை', kn: 'ಟೈಮ್‌ಲೈನ್',
  },
  'header.pages': {
    en: 'Pages', hi: 'पृष्ठ', te: 'పేజీలు', ta: 'பக்கங்கள்', kn: 'ಪುಟಗಳು',
  },
  'header.forms': {
    en: 'Forms', hi: 'फॉर्म', te: 'ఫారమ్‌లు', ta: 'படிவங்கள்', kn: 'ಫಾರ್ಮ್‌ಗಳು',
  },

  // ─── Summary / Dashboard ───
  'summary.title': {
    en: 'Summary', hi: 'सारांश', te: 'సారాంశం', ta: 'சுருக்கம்', kn: 'ಸಾರಾಂಶ',
  },
  'summary.completed': {
    en: 'completed', hi: 'पूर्ण', te: 'పూర్తయింది', ta: 'நிறைவு', kn: 'ಪೂರ್ಣ',
  },
  'summary.updated': {
    en: 'updated', hi: 'अपडेट', te: 'నవీకరించబడింది', ta: 'புதுப்பிக்கப்பட்டது', kn: 'ನವೀಕರಿಸಲಾಗಿದೆ',
  },
  'summary.created': {
    en: 'created', hi: 'बनाया', te: 'సృష్టించబడింది', ta: 'உருவாக்கப்பட்டது', kn: 'ರಚಿಸಲಾಗಿದೆ',
  },
  'summary.dueSoon': {
    en: 'due soon', hi: 'जल्द देय', te: 'త్వరలో', ta: 'விரைவில்', kn: 'ಶೀಘ್ರದಲ್ಲಿ',
  },
  'summary.inLast7Days': {
    en: 'in the last 7 days', hi: 'पिछले 7 दिनों में', te: 'గత 7 రోజులలో', ta: 'கடந்த 7 நாட்களில்', kn: 'ಕಳೆದ 7 ದಿನಗಳಲ್ಲಿ',
  },
  'summary.inNext7Days': {
    en: 'in the next 7 days', hi: 'अगले 7 दिनों में', te: 'రాబోయే 7 రోజులలో', ta: 'அடுத்த 7 நாட்களில்', kn: 'ಮುಂದಿನ 7 ದಿನಗಳಲ್ಲಿ',
  },
  'summary.statusOverview': {
    en: 'Status overview', hi: 'स्थिति अवलोकन', te: 'స్థితి సమీక్ష', ta: 'நிலை கண்ணோட்டம்', kn: 'ಸ್ಥಿತಿ ಅವಲೋಕನ',
  },
  'summary.viewAllWorkItems': {
    en: 'View all work items', hi: 'सभी कार्य आइटम देखें', te: 'అన్ని వర్క్ ఐటమ్‌లు చూడండి', ta: 'அனைத்து பணிகளையும் காண்க', kn: 'ಎಲ್ಲಾ ಕೆಲಸಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  },
  'summary.recentActivity': {
    en: 'Recent activity', hi: 'हालिया गतिविधि', te: 'ఇటీవలి కార్యకలాపాలు', ta: 'சமீபத்திய செயல்பாடு', kn: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ',
  },
  'summary.stayUpToDate': {
    en: "Stay up to date with what's happening across the space.", hi: 'स्पेस में क्या हो रहा है इसकी जानकारी रखें।', te: 'స్పేస్‌లో ఏం జరుగుతుందో తెలుసుకోండి.', ta: 'இடத்தில் என்ன நடக்கிறது என்பதை அறியுங்கள்.', kn: 'ಸ್ಪೇಸ್‌ನಲ್ಲಿ ಏನು ನಡೆಯುತ್ತಿದೆ ಎಂದು ತಿಳಿಯಿರಿ.',
  },
  'summary.today': {
    en: 'Today', hi: 'आज', te: 'ఈరోజు', ta: 'இன்று', kn: 'ಇಂದು',
  },
  'summary.updatedField': {
    en: 'updated field', hi: 'फ़ील्ड अपडेट किया', te: 'ఫీల్డ్ నవీకరించారు', ta: 'புலத்தை புதுப்பித்தார்', kn: 'ಫೀಲ್ಡ್ ನವೀಕರಿಸಿದರು',
  },
  'summary.teamWorkload': {
    en: 'Team workload', hi: 'टीम कार्यभार', te: 'జట్టు పనిభారం', ta: 'குழு பணிச்சுமை', kn: 'ತಂಡದ ಕೆಲಸದ ಹೊರೆ',
  },
  'summary.monitorCapacity': {
    en: 'Monitor your team capacity.', hi: 'टीम क्षमता की निगरानी करें।', te: 'జట్టు సామర్థ్యాన్ని పర్యవేక్షించండి.', ta: 'குழு திறனை கண்காணியுங்கள்.', kn: 'ತಂಡದ ಸಾಮರ್ಥ್ಯವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
  },
  'summary.tasks': {
    en: 'tasks', hi: 'कार्य', te: 'టాస్క్‌లు', ta: 'பணிகள்', kn: 'ಕಾರ್ಯಗಳು',
  },
  'summary.epicProgress': {
    en: 'Epic progress', hi: 'एपिक प्रगति', te: 'ఎపిక్ ప్రగతి', ta: 'எபிக் முன்னேற்றம்', kn: 'ಎಪಿಕ್ ಪ್ರಗತಿ',
  },
  'summary.trackEpics': {
    en: 'Track your epics and large initiatives.', hi: 'अपने एपिक्स और बड़ी पहलों को ट्रैक करें।', te: 'మీ ఎపిక్‌లను ట్రాక్ చేయండి.', ta: 'உங்கள் எபிக்களை கண்காணியுங்கள்.', kn: 'ನಿಮ್ಮ ಎಪಿಕ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
  },
  'summary.totalWorkItems': {
    en: 'Total work items', hi: 'कुल कार्य आइटम', te: 'మొత్తం వర్క్ ఐటమ్‌లు', ta: 'மொத்த பணி உருப்படிகள்', kn: 'ಒಟ್ಟು ಕೆಲಸದ ಐಟಂಗಳು',
  },
  'summary.getSnapshot': {
    en: 'Get a snapshot of the status of your work items.', hi: 'अपने कार्य आइटम की स्थिति का स्नैपशॉट प्राप्त करें।', te: 'మీ వర్క్ ఐటమ్‌ల స్థితి స్నాప్‌షాట్ చూడండి.', ta: 'உங்கள் பணிகளின் நிலைக் காட்சியைப் பாருங்கள்.', kn: 'ನಿಮ್ಮ ಕೆಲಸದ ಐಟಂಗಳ ಸ್ಥಿತಿಯ ಸ್ನ್ಯಾಪ್‌ಶಾಟ್ ಪಡೆಯಿರಿ.',
  },

  // ─── Dashboard (legacy) ───
  'dashboard.title': {
    en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డాష్‌బోర్డ్', ta: 'டாஷ்போர்டு', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  'dashboard.totalTasks': {
    en: 'Total Tasks', hi: 'कुल कार्य', te: 'మొత్తం టాస్క్‌లు', ta: 'மொத்த பணிகள்', kn: 'ಒಟ್ಟು ಕಾರ್ಯಗಳು',
  },
  'dashboard.completed': {
    en: 'Completed', hi: 'पूर्ण', te: 'పూర్తయింది', ta: 'நிறைவு', kn: 'ಪೂರ್ಣ',
  },
  'dashboard.inProgress': {
    en: 'In Progress', hi: 'प्रगति में', te: 'ప్రగతిలో', ta: 'செயலில்', kn: 'ಪ್ರಗತಿಯಲ್ಲಿ',
  },
  'dashboard.overdue': {
    en: 'Overdue', hi: 'अतिदेय', te: 'ఆలస్యం', ta: 'காலாவதி', kn: 'ವಿಳಂಬ',
  },
  'dashboard.completionRate': {
    en: 'Completion Rate', hi: 'पूर्णता दर', te: 'పూర్తి రేటు', ta: 'நிறைவு விகிதம்', kn: 'ಪೂರ್ಣಗೊಳಿಸುವ ದರ',
  },
  'dashboard.completedThisWeek': {
    en: 'Completed This Week', hi: 'इस सप्ताह पूर्ण', te: 'ఈ వారం పూర్తి', ta: 'இந்த வாரம் நிறைவு', kn: 'ಈ ವಾರ ಪೂರ್ಣ',
  },
  'dashboard.tasksByStatus': {
    en: 'Tasks by Status', hi: 'स्थिति अनुसार कार्य', te: 'స్థితి ప్రకారం టాస్క్‌లు', ta: 'நிலை படி பணிகள்', kn: 'ಸ್ಥಿತಿ ಪ್ರಕಾರ ಕಾರ್ಯಗಳು',
  },
  'dashboard.tasksByPriority': {
    en: 'Tasks by Priority', hi: 'प्राथमिकता अनुसार कार्य', te: 'ప్రాధాన్యత ప్రకారం టాస్క్‌లు', ta: 'முன்னுரிமை படி பணிகள்', kn: 'ಆದ್ಯತೆ ಪ್ರಕಾರ ಕಾರ್ಯಗಳು',
  },
  'dashboard.recentTasks': {
    en: 'Recent Tasks', hi: 'हाल के कार्य', te: 'ఇటీవలి టాస్క్‌లు', ta: 'சமீபத்திய பணிகள்', kn: 'ಇತ್ತೀಚಿನ ಕಾರ್ಯಗಳು',
  },
  'dashboard.teamPerformance': {
    en: 'Team Performance', hi: 'टीम प्रदर्शन', te: 'జట్టు పనితీరు', ta: 'குழு செயல்திறன்', kn: 'ತಂಡದ ಕಾರ್ಯಕ್ಷಮತೆ',
  },

  // ─── Tasks ───
  'task.title': {
    en: 'Task Title', hi: 'कार्य शीर्षक', te: 'టాస్క్ శీర్షిక', ta: 'பணி தலைப்பு', kn: 'ಕಾರ್ಯ ಶೀರ್ಷಿಕೆ',
  },
  'task.description': {
    en: 'Description', hi: 'विवरण', te: 'వివరణ', ta: 'விளக்கம்', kn: 'ವಿವರಣೆ',
  },
  'task.status': {
    en: 'Status', hi: 'स्थिति', te: 'స్థితి', ta: 'நிலை', kn: 'ಸ್ಥಿತಿ',
  },
  'task.priority': {
    en: 'Priority', hi: 'प्राथमिकता', te: 'ప్రాధాన్యత', ta: 'முன்னுரிமை', kn: 'ಆದ್ಯತೆ',
  },
  'task.assignee': {
    en: 'Assignee', hi: 'असाइनी', te: 'అసైనీ', ta: 'ஒதுக்கப்பட்டவர்', kn: 'ನಿಯೋಜಿತ',
  },
  'task.dueDate': {
    en: 'Due Date', hi: 'नियत तारीख', te: 'గడువు తేదీ', ta: 'நிலுவை தேதி', kn: 'ಅಂತಿಮ ದಿನಾಂಕ',
  },
  'task.create': {
    en: 'Create', hi: 'बनाएं', te: 'సృష్టించు', ta: 'உருவாக்கு', kn: 'ರಚಿಸಿ',
  },
  'task.edit': {
    en: 'Edit Task', hi: 'कार्य संपादित करें', te: 'టాస్క్ సవరించు', ta: 'பணி திருத்து', kn: 'ಕಾರ್ಯ ಸಂಪಾದಿಸಿ',
  },
  'task.delete': {
    en: 'Delete Task', hi: 'कार्य हटाएं', te: 'టాస్క్ తొలగించు', ta: 'பணி நீக்கு', kn: 'ಕಾರ್ಯ ಅಳಿಸಿ',
  },
  'task.noTasks': {
    en: 'No tasks found', hi: 'कोई कार्य नहीं मिला', te: 'టాస్క్‌లు కనుగొనబడలేదు', ta: 'பணிகள் கிடைக்கவில்லை', kn: 'ಯಾವುದೇ ಕಾರ್ಯ ಸಿಗಲಿಲ್ಲ',
  },
  'task.kanbanView': {
    en: 'Board View', hi: 'बोर्ड दृश्य', te: 'బోర్డ్ వ్యూ', ta: 'போர்டு காட்சி', kn: 'ಬೋರ್ಡ್ ವ್ಯೂ',
  },

  // ─── Status values ───
  'status.todo': {
    en: 'TO DO', hi: 'करना है', te: 'చేయాల్సింది', ta: 'செய்ய வேண்டியது', kn: 'ಮಾಡಬೇಕಾದದ್ದು',
  },
  'status.inprogress': {
    en: 'IN PROGRESS', hi: 'प्रगति में', te: 'ప్రగతిలో', ta: 'செயலில்', kn: 'ಪ್ರಗತಿಯಲ್ಲಿ',
  },
  'status.inreview': {
    en: 'IN REVIEW', hi: 'समीक्षा में', te: 'సమీక్షలో', ta: 'மதிப்பாய்வில்', kn: 'ಪರಿಶೀಲನೆಯಲ್ಲಿ',
  },
  'status.completed': {
    en: 'DONE', hi: 'पूर्ण', te: 'పూర్తయింది', ta: 'நிறைவு', kn: 'ಪೂರ್ಣ',
  },

  // ─── Priority values ───
  'priority.low': {
    en: 'Low', hi: 'कम', te: 'తక్కువ', ta: 'குறைவு', kn: 'ಕಡಿಮೆ',
  },
  'priority.medium': {
    en: 'Medium', hi: 'मध्यम', te: 'మధ్యస్థం', ta: 'நடுத்தரம்', kn: 'ಮಧ್ಯಮ',
  },
  'priority.high': {
    en: 'High', hi: 'उच्च', te: 'అధిక', ta: 'உயர்வு', kn: 'ಹೆಚ್ಚು',
  },
  'priority.critical': {
    en: 'Critical', hi: 'गंभीर', te: 'క్రిటికల్', ta: 'முக்கியமான', kn: 'ನಿರ್ಣಾಯಕ',
  },
  'priority.highest': {
    en: 'Highest', hi: 'सर्वोच्च', te: 'అత్యధిక', ta: 'மிக உயர்', kn: 'ಅತ್ಯಧಿಕ',
  },
  'priority.lowest': {
    en: 'Lowest', hi: 'सबसे कम', te: 'అత్యల్ప', ta: 'மிக குறை', kn: 'ಅತ್ಯಂತ ಕಡಿಮೆ',
  },
  'priority.none': {
    en: 'None', hi: 'कोई नहीं', te: 'ఏదీ లేదు', ta: 'எதுவுமில்லை', kn: 'ಯಾವುದೂ ಇಲ್ಲ',
  },

  // ─── Backlog ───
  'backlog.searchBacklog': {
    en: 'Search backlog', hi: 'बैकलॉग खोजें', te: 'బ్యాక్‌లాగ్ శోధించు', ta: 'பேக்லாக் தேடு', kn: 'ಬ್ಯಾಕ್‌ಲಾಗ್ ಹುಡುಕಿ',
  },
  'backlog.backlog': {
    en: 'Backlog', hi: 'बैकलॉग', te: 'బ్యాక్‌లాగ్', ta: 'பேக்லாக்', kn: 'ಬ್ಯಾಕ್‌ಲಾಗ್',
  },
  'backlog.workItems': {
    en: 'work items', hi: 'कार्य आइटम', te: 'వర్క్ ఐటమ్‌లు', ta: 'பணி உருப்படிகள்', kn: 'ಕೆಲಸದ ಐಟಂಗಳು',
  },
  'backlog.createSprint': {
    en: 'Create sprint', hi: 'स्प्रिंट बनाएं', te: 'స్ప్రింట్ సృష్టించు', ta: 'ஸ்பிரிண்ட் உருவாக்கு', kn: 'ಸ್ಪ್ರಿಂಟ್ ರಚಿಸಿ',
  },
  'backlog.startSprint': {
    en: 'Start sprint', hi: 'स्प्रिंट शुरू करें', te: 'స్ప్రింట్ ప్రారంభించు', ta: 'ஸ்பிரிண்ட் தொடங்கு', kn: 'ಸ್ಪ್ರಿಂಟ್ ಪ್ರಾರಂಭಿಸಿ',
  },
  'backlog.completeSprint': {
    en: 'Complete sprint', hi: 'स्प्रिंट पूरा करें', te: 'స్ప్రింట్ పూర్తి చేయి', ta: 'ஸ்பிரிண்ட் முடிக்கவும்', kn: 'ಸ್ಪ್ರಿಂಟ್ ಪೂರ್ಣಗೊಳಿಸಿ',
  },
  'backlog.addDates': {
    en: 'Add dates', hi: 'तारीखें जोड़ें', te: 'తేదీలు జోడించు', ta: 'தேதிகளை சேர்', kn: 'ದಿನಾಂಕಗಳನ್ನು ಸೇರಿಸಿ',
  },
  'backlog.planSprint': {
    en: 'Plan a sprint by dragging work items into it.', hi: 'कार्य आइटम को ड्रैग करके स्प्रिंट प्लान करें।', te: 'వర్క్ ఐటమ్‌లను డ్రాగ్ చేసి స్ప్రింట్ ప్లాన్ చేయండి.', ta: 'பணிகளை இழுத்து ஸ்பிரிண்ட் திட்டமிடுங்கள்.', kn: 'ಕೆಲಸದ ಐಟಂಗಳನ್ನು ಡ್ರ್ಯಾಗ್ ಮಾಡಿ ಸ್ಪ್ರಿಂಟ್ ಯೋಜಿಸಿ.',
  },
  'backlog.create': {
    en: '+ Create', hi: '+ बनाएं', te: '+ సృష్టించు', ta: '+ உருவாக்கு', kn: '+ ರಚಿಸಿ',
  },
  'backlog.workItemsVisible': {
    en: 'work items visible', hi: 'दृश्य कार्य आइटम', te: 'కనిపించే వర్క్ ఐటమ్లు', ta: 'தெரியும் பணிகள்', kn: 'ಕಾಣುವ ಕೆಲಸಗಳು',
  },
  'backlog.estimate': {
    en: 'Estimate', hi: 'अनुमान', te: 'అంచనా', ta: 'மதிப்பீடு', kn: 'ಅಂದಾಜು',
  },

  // ─── Board ───
  'board.searchBoard': {
    en: 'Search board', hi: 'बोर्ड खोजें', te: 'బోర్డ్ శోధించు', ta: 'போர்டு தேடு', kn: 'ಬೋರ್ಡ್ ಹುಡುಕಿ',
  },
  'board.completeSprint': {
    en: 'Complete sprint', hi: 'स्प्रिंट पूरा करें', te: 'స్ప్రింట్ పూర్తి చేయి', ta: 'ஸ்பிரிண்ட் முடிக்கவும்', kn: 'ಸ್ಪ್ರಿಂಟ್ ಪೂರ್ಣಗೊಳಿಸಿ',
  },
  'board.group': {
    en: 'Group', hi: 'समूह', te: 'గ్రూప్', ta: 'குழு', kn: 'ಗುಂಪು',
  },
  'board.todo': {
    en: 'TO DO', hi: 'करना है', te: 'చేయాల్సినవి', ta: 'செய்ய வேண்டியவை', kn: 'ಮಾಡಬೇಕು',
  },
  'board.inprogress': {
    en: 'IN PROGRESS', hi: 'प्रगति में', te: 'ప్రగతిలో', ta: 'செயலில்', kn: 'ಪ್ರಗತಿಯಲ್ಲಿ',
  },
  'board.inreview': {
    en: 'IN REVIEW', hi: 'समीक्षा में', te: 'సమీక్షలో', ta: 'மதிப்பாய்வில்', kn: 'ವಿಮರ್ಶೆಯಲ್ಲಿ',
  },
  'board.done': {
    en: 'DONE', hi: 'पूरा हुआ', te: 'పూర్తయింది', ta: 'முடிந்தது', kn: 'ಮುಗಿದಿದೆ',
  },
  'board.create': {
    en: '+ Create', hi: '+ बनाएं', te: '+ సృష్టించు', ta: '+ உருவாக்கு', kn: '+ ರಚಿಸಿ',
  },

  // ─── Roles ───
  'role.admin': {
    en: 'Admin', hi: 'व्यवस्थापक', te: 'అడ్మిన్', ta: 'நிர்வாகி', kn: 'ನಿರ್ವಾಹಕ',
  },
  'role.manager': {
    en: 'Manager', hi: 'प्रबंधक', te: 'మేనేజర్', ta: 'மேலாளர்', kn: 'ವ್ಯವಸ್ಥಾಪಕ',
  },
  'role.employee': {
    en: 'Employee', hi: 'कर्मचारी', te: 'ఉద్యోగి', ta: 'பணியாளர்', kn: 'ಉದ್ಯೋಗಿ',
  },

  // ─── Common ───
  'common.save': {
    en: 'Save', hi: 'सहेजें', te: 'సేవ్ చేయి', ta: 'சேமி', kn: 'ಉಳಿಸಿ',
  },
  'common.cancel': {
    en: 'Cancel', hi: 'रद्द करें', te: 'రద్దు చేయి', ta: 'ரத்து செய்', kn: 'ರದ್ದುಮಾಡಿ',
  },
  'common.delete': {
    en: 'Delete', hi: 'हटाएं', te: 'తొలగించు', ta: 'நீக்கு', kn: 'ಅಳಿಸಿ',
  },
  'common.confirm': {
    en: 'Confirm', hi: 'पुष्टि करें', te: 'నిర్ధారించు', ta: 'உறுதிப்படுத்து', kn: 'ಖಚಿತಪಡಿಸಿ',
  },
  'common.loading': {
    en: 'Loading...', hi: 'लोड हो रहा है...', te: 'లోడ్ అవుతోంది...', ta: 'ஏற்றுகிறது...', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
  },
  'common.search': {
    en: 'Search', hi: 'खोजें', te: 'శోధించు', ta: 'தேடு', kn: 'ಹುಡುಕಿ',
  },
  'common.filter': {
    en: 'Filter', hi: 'फ़िल्टर', te: 'ఫిల్టర్', ta: 'வடிகட்டி', kn: 'ಫಿಲ್ಟರ್',
  },
  'common.sort': {
    en: 'Sort', hi: 'क्रमबद्ध करें', te: 'క్రమబద్ధీకరించు', ta: 'வரிசைப்படுத்து', kn: 'ಕ್ರಮಗೊಳಿಸಿ',
  },
  'common.close': {
    en: 'Close', hi: 'बंद करें', te: 'మూసివేయి', ta: 'மூடு', kn: 'ಮುಚ್ಚಿ',
  },
  'common.darkMode': {
    en: 'Dark Mode', hi: 'डार्क मोड', te: 'డార్క్ మోడ్', ta: 'இருள் பயன்முறை', kn: 'ಡಾರ್ಕ್ ಮೋಡ್',
  },
  'common.lightMode': {
    en: 'Light Mode', hi: 'लाइट मोड', te: 'లైట్ మోడ్', ta: 'ஒளி பயன்முறை', kn: 'ಲೈಟ್ ಮೋಡ್',
  },
  'common.language': {
    en: 'Language', hi: 'भाषा', te: 'భాష', ta: 'மொழி', kn: 'ಭಾಷೆ',
  },

  // ─── Comments ───
  'comment.comments': {
    en: 'Comments', hi: 'टिप्पणियाँ', te: 'వ్యాఖ్యలు', ta: 'கருத்துகள்', kn: 'ಕಾಮೆಂಟ್‌ಗಳು',
  },
  'comment.addComment': {
    en: 'Add a comment...', hi: 'टिप्पणी जोड़ें...', te: 'వ్యాఖ్య జోడించండి...', ta: 'கருத்தை சேர்...', kn: 'ಕಾಮೆಂಟ್ ಸೇರಿಸಿ...',
  },
  'comment.placeholder': {
    en: 'Type your comment here...', hi: 'यहाँ लिखें...', te: 'ఇక్కడ టైప్ చేయండి...', ta: 'இங்கே உள்ளிடுங்கள்...', kn: 'ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
  },
  'comment.send': {
    en: 'Save', hi: 'भेजें', te: 'పంపు', ta: 'அனுப்பு', kn: 'ಕಳುಹಿಸಿ',
  },
  'comment.delete': {
    en: 'Delete', hi: 'हटाएं', te: 'తొలగించు', ta: 'நீக்கு', kn: 'ಅಳಿಸಿ',
  },
  'comment.noComments': {
    en: 'No comments yet', hi: 'अभी तक कोई टिप्पणी नहीं', te: 'ఇంకా వ్యాఖ్యలు లేవు', ta: 'இன்னும் கருத்துகள் இல்லை', kn: 'ಇನ್ನೂ ಕಾಮೆಂಟ್‌ಗಳಿಲ್ಲ',
  },
  'comment.activity': {
    en: 'Activity', hi: 'गतिविधि', te: 'కార్యకలాపాలు', ta: 'செயல்பாடு', kn: 'ಚಟುವಟಿಕೆ',
  },
  'comment.details': {
    en: 'Details', hi: 'विवरण', te: 'వివరాలు', ta: 'விவரங்கள்', kn: 'ವಿವರಗಳು',
  },
  'comment.description': {
    en: 'Description', hi: 'विवरण', te: 'వివరణ', ta: 'விளக்கம்', kn: 'ವಿವರಣೆ',
  },
  'comment.status': {
    en: 'Status', hi: 'स्थिति', te: 'స్థితి', ta: 'நிலை', kn: 'ಸ್ಥಿತಿ',
  },
  'comment.priority': {
    en: 'Priority', hi: 'प्राथमिकता', te: 'ప్రాధాన్యత', ta: 'முன்னுரிமை', kn: 'ಆದ್ಯತೆ',
  },
  'comment.assignee': {
    en: 'Assignee', hi: 'असाइनी', te: 'అసైనీ', ta: 'ஒதுக்கப்பட்டவர்', kn: 'ನಿಯೋಜಿತ',
  },
  'comment.dueDate': {
    en: 'Due date', hi: 'नियत तारीख', te: 'గడువు తేదీ', ta: 'நிலுவை தேதி', kn: 'ಅಂತಿಮ ದಿನಾಂಕ',
  },
  'comment.created': {
    en: 'Created', hi: 'बनाया गया', te: 'సృష్టించబడింది', ta: 'உருவாக்கப்பட்டது', kn: 'ರಚಿಸಲಾಗಿದೆ',
  },
  'comment.updated': {
    en: 'Updated', hi: 'अपडेट किया', te: 'నవీకరించబడింది', ta: 'புதுப்பிக்கப்பட்டது', kn: 'ನವೀಕರಿಸಲಾಗಿದೆ',
  },
};

export const getLabel = (key: string, lang: string): string => {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang as SupportedLanguage] || entry[SupportedLanguage.ENGLISH] || key;
};

export default translations;
