import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Users, 
  Bell,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardStats, announcements, registeredCourses, timetable } from '@/data/mockData';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  value: string | number; 
  subtitle?: string;
  icon: React.ElementType;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="stat-card"
    style={{ '--stat-color': color } as React.CSSProperties}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
    <p className="text-sm font-medium text-muted-foreground">{title}</p>
    {subtitle && (
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    )}
  </motion.div>
);

const Dashboard = () => {
  const { student } = useAuth();

  const todayClasses = timetable.filter(item => item.day === 'Monday').slice(0, 3);
  const unreadAnnouncements = announcements.filter(a => !a.isRead);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Good morning, {student?.firstName}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your academic journey
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Stats grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <motion.div variants={item}>
            <StatCard
              title="Current CGPA"
              value={dashboardStats.cgpa.toFixed(2)}
              subtitle="Out of 5.00"
              icon={TrendingUp}
              color="bg-success/10 text-success"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="Registered Courses"
              value={dashboardStats.totalCourses}
              subtitle="This semester"
              icon={BookOpen}
              color="bg-primary/10 text-primary"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="Upcoming Deadlines"
              value={dashboardStats.upcomingDeadlines}
              subtitle="This week"
              icon={Calendar}
              color="bg-warning/10 text-warning"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard
              title="Attendance"
              value={`${dashboardStats.attendancePercentage}%`}
              subtitle="Overall attendance"
              icon={Users}
              color="bg-accent/10 text-accent"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <motion.div 
            variants={item}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 card-elevated"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Today's Classes</h2>
                <Link 
                  to="/timetable" 
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {todayClasses.length > 0 ? (
                todayClasses.map((cls, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-primary">{cls.course}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {cls.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{cls.venue}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cls.lecturer}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No classes scheduled for today</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div 
            variants={item}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 card-elevated"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">Recent Announcements</h2>
                  {unreadAnnouncements.length > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-destructive text-destructive-foreground">
                      {unreadAnnouncements.length} new
                    </span>
                  )}
                </div>
                <Link 
                  to="/notifications" 
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {announcements.slice(0, 4).map((announcement) => (
                <div 
                  key={announcement.id}
                  className={`p-4 hover:bg-muted/50 transition-colors ${!announcement.isRead ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center ${
                      announcement.category === 'Examination' ? 'bg-destructive/10 text-destructive' :
                      announcement.category === 'Academic' ? 'bg-primary/10 text-primary' :
                      announcement.category === 'Finance' ? 'bg-warning/10 text-warning' :
                      announcement.category === 'Events' ? 'bg-success/10 text-success' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {announcement.category === 'Examination' ? <AlertCircle className="w-4 h-4" /> :
                       announcement.category === 'Academic' ? <BookOpen className="w-4 h-4" /> :
                       announcement.category === 'Finance' ? <FileText className="w-4 h-4" /> :
                       announcement.category === 'Events' ? <Calendar className="w-4 h-4" /> :
                       <Bell className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-sm font-medium ${!announcement.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {announcement.title}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(announcement.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Links & Registered Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Links */}
          <motion.div 
            variants={item}
            initial="hidden"
            animate="show"
            className="card-elevated p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/courses"
                className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <BookOpen className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Course Registration</span>
              </Link>
              <Link 
                to="/results"
                className="p-4 rounded-xl bg-success/5 hover:bg-success/10 transition-colors group"
              >
                <TrendingUp className="w-6 h-6 text-success mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">View Results</span>
              </Link>
              <Link 
                to="/fees"
                className="p-4 rounded-xl bg-warning/5 hover:bg-warning/10 transition-colors group"
              >
                <FileText className="w-6 h-6 text-warning mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Pay Fees</span>
              </Link>
              <Link 
                to="/timetable"
                className="p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors group"
              >
                <Calendar className="w-6 h-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Timetable</span>
              </Link>
            </div>
          </motion.div>

          {/* Registered Courses */}
          <motion.div 
            variants={item}
            initial="hidden"
            animate="show"
            className="card-elevated"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Registered Courses</h2>
                <span className="text-sm text-muted-foreground">
                  {registeredCourses.reduce((sum, c) => sum + c.credits, 0)} credit units
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {registeredCourses.slice(0, 4).map((course, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{course.code.slice(0, 3)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{course.code}</p>
                      <p className="text-xs text-muted-foreground">{course.title}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {course.credits} CU
                  </span>
                </div>
              ))}
              <Link 
                to="/courses"
                className="block text-center py-3 text-sm text-primary hover:underline"
              >
                View all courses →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
