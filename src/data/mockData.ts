export const studentData = {
  id: "STU/2023/12914",
  matricNumber: "2023/12914",
  firstName: "Temitayo",
  lastName: "Job",
  fullName: "Temitayo Job",
  email: "temitayo.job@bellsuniversity.edu.ng",
  phone: "+234 812 345 6789",
  department: "Computer Science",
  collage: "COLNAS",
  level: "300L",
  session: "2024/2025",
  semester: "First Semester",
  cgpa: 3.72,
  avatar: null,
};

export const dashboardStats = {
  cgpa: 3.72,
  totalCourses: 6,
  upcomingDeadlines: 3,
  attendancePercentage: 87,
};

export const announcements = [
  {
    id: 1,
    title: "Mid-Semester Examination Timetable Released",
    content: "The mid-semester examination timetable for the 2024/2025 session has been released. Please check your department notice board for details.",
    date: "2025-01-02",
    category: "Examination",
    isRead: false,
  },
  {
    id: 2,
    title: "Course Registration Deadline Extended",
    content: "The deadline for course registration has been extended to January 15, 2025. Students who have not registered are advised to do so immediately.",
    date: "2024-12-28",
    category: "Academic",
    isRead: false,
  },
  {
    id: 3,
    title: "School Fees Payment Reminder",
    content: "This is to remind all students that the deadline for school fees payment is January 31, 2025. Late payment attracts a penalty.",
    date: "2024-12-25",
    category: "Finance",
    isRead: true,
  },
  {
    id: 4,
    title: "Career Fair 2025",
    content: "The annual career fair will hold on February 10, 2025 at the main auditorium. All students are encouraged to attend.",
    date: "2024-12-20",
    category: "Events",
    isRead: true,
  },
  {
    id: 5,
    title: "Library Extended Hours",
    content: "The library will now operate from 7am to 10pm on weekdays during the examination period.",
    date: "2024-12-18",
    category: "General",
    isRead: true,
  },
];

export const academicRecords = [
  {
    semester: "First Semester",
    session: "2022/2023",
    level: "100L",
    gpa: 3.45,
    courses: [
      { code: "CSC101", title: "Introduction to Computer Science", credits: 3, score: 72, grade: "B" },
      { code: "MTH101", title: "General Mathematics I", credits: 3, score: 68, grade: "B" },
      { code: "PHY101", title: "General Physics I", credits: 3, score: 75, grade: "A" },
      { code: "GST101", title: "Use of English I", credits: 2, score: 65, grade: "B" },
      { code: "GST103", title: "Nigerian Peoples and Culture", credits: 2, score: 58, grade: "C" },
    ],
  },
  {
    semester: "Second Semester",
    session: "2022/2023",
    level: "100L",
    gpa: 3.58,
    courses: [
      { code: "CSC102", title: "Introduction to Programming", credits: 3, score: 78, grade: "A" },
      { code: "MTH102", title: "General Mathematics II", credits: 3, score: 70, grade: "B" },
      { code: "PHY102", title: "General Physics II", credits: 3, score: 72, grade: "B" },
      { code: "GST102", title: "Use of English II", credits: 2, score: 68, grade: "B" },
      { code: "CSC104", title: "Computer Hardware", credits: 3, score: 82, grade: "A" },
    ],
  },
  {
    semester: "First Semester",
    session: "2023/2024",
    level: "200L",
    gpa: 3.72,
    courses: [
      { code: "CSC201", title: "Computer Programming I", credits: 3, score: 85, grade: "A" },
      { code: "CSC203", title: "Discrete Mathematics", credits: 3, score: 78, grade: "A" },
      { code: "CSC205", title: "Data Structures", credits: 3, score: 72, grade: "B" },
      { code: "MTH201", title: "Mathematical Methods I", credits: 3, score: 68, grade: "B" },
      { code: "STA201", title: "Statistics for Science", credits: 3, score: 75, grade: "A" },
    ],
  },
  {
    semester: "Second Semester",
    session: "2023/2024",
    level: "200L",
    gpa: 3.85,
    courses: [
      { code: "CSC202", title: "Computer Programming II", credits: 3, score: 88, grade: "A" },
      { code: "CSC204", title: "Database Management Systems", credits: 3, score: 82, grade: "A" },
      { code: "CSC206", title: "Operating Systems I", credits: 3, score: 75, grade: "A" },
      { code: "MTH202", title: "Mathematical Methods II", credits: 3, score: 70, grade: "B" },
      { code: "CSC208", title: "Web Development", credits: 3, score: 90, grade: "A" },
    ],
  },
  {
    semester: "First Semester",
    session: "2024/2025",
    level: "300L",
    gpa: 3.72,
    courses: [
      { code: "CSC301", title: "Algorithm Design & Analysis", credits: 3, score: 78, grade: "A" },
      { code: "CSC303", title: "Software Engineering I", credits: 3, score: 75, grade: "A" },
      { code: "CSC305", title: "Computer Networks", credits: 3, score: 72, grade: "B" },
      { code: "CSC307", title: "Artificial Intelligence", credits: 3, score: 80, grade: "A" },
      { code: "CSC309", title: "Operating Systems II", credits: 3, score: 68, grade: "B" },
      { code: "CSC311", title: "Systems Programming", credits: 3, score: 70, grade: "B" },
    ],
  },
];

export const availableCourses = [
  { code: "CSC301", title: "Algorithm Design & Analysis", credits: 3, lecturer: "Dr. Adekunle", status: "compulsory" },
  { code: "CSC303", title: "Software Engineering I", credits: 3, lecturer: "Prof. Okafor", status: "compulsory" },
  { code: "CSC305", title: "Computer Networks", credits: 3, lecturer: "Dr. Ibrahim", status: "compulsory" },
  { code: "CSC307", title: "Artificial Intelligence", credits: 3, lecturer: "Dr. Adesanya", status: "compulsory" },
  { code: "CSC309", title: "Operating Systems II", credits: 3, lecturer: "Dr. Bello", status: "compulsory" },
  { code: "CSC311", title: "Systems Programming", credits: 3, lecturer: "Dr. Chukwu", status: "compulsory" },
  { code: "CSC313", title: "Human Computer Interaction", credits: 2, lecturer: "Dr. Fadeyi", status: "elective" },
  { code: "CSC315", title: "Mobile App Development", credits: 2, lecturer: "Mr. Ganiyu", status: "elective" },
  { code: "CSC317", title: "Cloud Computing", credits: 2, lecturer: "Dr. Hassan", status: "elective" },
  { code: "GST301", title: "Entrepreneurship", credits: 2, lecturer: "Dr. Ijeoma", status: "required" },
];

export const registeredCourses = [
  { code: "CSC301", title: "Algorithm Design & Analysis", credits: 3, lecturer: "Dr. Adekunle" },
  { code: "CSC303", title: "Software Engineering I", credits: 3, lecturer: "Prof. Okafor" },
  { code: "CSC305", title: "Computer Networks", credits: 3, lecturer: "Dr. Ibrahim" },
  { code: "CSC307", title: "Artificial Intelligence", credits: 3, lecturer: "Dr. Adesanya" },
  { code: "CSC309", title: "Operating Systems II", credits: 3, lecturer: "Dr. Bello" },
  { code: "CSC311", title: "Systems Programming", credits: 3, lecturer: "Dr. Chukwu" },
];

export const timetable = [
  { day: "Monday", time: "08:00 - 10:00", course: "CSC301", venue: "LT 101", lecturer: "Dr. Adekunle" },
  { day: "Monday", time: "10:00 - 12:00", course: "CSC303", venue: "Lab 2", lecturer: "Prof. Okafor" },
  { day: "Monday", time: "14:00 - 16:00", course: "CSC305", venue: "LT 203", lecturer: "Dr. Ibrahim" },
  { day: "Tuesday", time: "08:00 - 10:00", course: "CSC307", venue: "Lab 1", lecturer: "Dr. Adesanya" },
  { day: "Tuesday", time: "12:00 - 14:00", course: "CSC309", venue: "LT 102", lecturer: "Dr. Bello" },
  { day: "Wednesday", time: "08:00 - 10:00", course: "CSC311", venue: "Lab 3", lecturer: "Dr. Chukwu" },
  { day: "Wednesday", time: "10:00 - 12:00", course: "CSC301", venue: "LT 101", lecturer: "Dr. Adekunle" },
  { day: "Wednesday", time: "14:00 - 16:00", course: "CSC303", venue: "LT 205", lecturer: "Prof. Okafor" },
  { day: "Thursday", time: "08:00 - 10:00", course: "CSC305", venue: "Lab 2", lecturer: "Dr. Ibrahim" },
  { day: "Thursday", time: "10:00 - 12:00", course: "CSC307", venue: "LT 103", lecturer: "Dr. Adesanya" },
  { day: "Friday", time: "08:00 - 10:00", course: "CSC309", venue: "LT 201", lecturer: "Dr. Bello" },
  { day: "Friday", time: "10:00 - 12:00", course: "CSC311", venue: "Lab 1", lecturer: "Dr. Chukwu" },
];

export const feesData = {
  session: "2024/2025",
  totalFees: 175000,
  amountPaid: 100000,
  balance: 75000,
  dueDate: "2025-01-31",
  payments: [
    { id: 1, date: "2024-09-15", amount: 50000, reference: "PAY/2024/001234", status: "confirmed" },
    { id: 2, date: "2024-11-20", amount: 50000, reference: "PAY/2024/005678", status: "confirmed" },
  ],
  breakdown: [
    { item: "Tuition Fee", amount: 100000 },
    { item: "Laboratory Fee", amount: 25000 },
    { item: "Library Fee", amount: 15000 },
    { item: "ICT Fee", amount: 20000 },
    { item: "Examination Fee", amount: 10000 },
    { item: "Student Union Dues", amount: 5000 },
  ],
};

export const notifications = [
  {
    id: 1,
    title: "Mid-Semester Examination Timetable Released",
    message: "The mid-semester examination timetable for the 2024/2025 session has been released. Please check your department notice board for details.",
    date: "2025-01-02T09:30:00",
    type: "exam",
    isRead: false,
  },
  {
    id: 2,
    title: "Course Registration Deadline Extended",
    message: "The deadline for course registration has been extended to January 15, 2025. Students who have not registered are advised to do so immediately.",
    date: "2024-12-28T14:00:00",
    type: "academic",
    isRead: false,
  },
  {
    id: 3,
    title: "Assignment Submission Reminder",
    message: "Your CSC301 assignment is due tomorrow. Please ensure you submit before 11:59 PM.",
    date: "2024-12-27T08:00:00",
    type: "deadline",
    isRead: false,
  },
  {
    id: 4,
    title: "School Fees Payment Reminder",
    message: "This is to remind you that your school fees balance of ₦75,000 is due by January 31, 2025.",
    date: "2024-12-25T10:00:00",
    type: "finance",
    isRead: true,
  },
  {
    id: 5,
    title: "Career Fair 2025",
    message: "The annual career fair will hold on February 10, 2025 at the main auditorium. Top companies including Google, Microsoft, and MTN will be present.",
    date: "2024-12-20T11:30:00",
    type: "event",
    isRead: true,
  },
  {
    id: 6,
    title: "Library Extended Hours",
    message: "The library will now operate from 7am to 10pm on weekdays during the examination period.",
    date: "2024-12-18T09:00:00",
    type: "general",
    isRead: true,
  },
  {
    id: 7,
    title: "New Course Material Available",
    message: "Prof. Okafor has uploaded new course material for CSC303 Software Engineering. Please download from the portal.",
    date: "2024-12-15T16:45:00",
    type: "academic",
    isRead: true,
  },
];
