import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';
import { notifications } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';

const typeConfig = {
  exam: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  academic: { icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  deadline: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  finance: { icon: CreditCard, color: 'text-success', bg: 'bg-success/10' },
  event: { icon: Calendar, color: 'text-accent', bg: 'bg-accent/10' },
  general: { icon: Bell, color: 'text-muted-foreground', bg: 'bg-muted' },
};

const Notifications = () => {
  const [filter, setFilter] = useState<string>('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const filteredNotifications = filter === 'all' 
    ? notificationList 
    : filter === 'unread'
    ? notificationList.filter(n => !n.isRead)
    : notificationList.filter(n => n.type === filter);

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notificationList.filter(n => !n.isRead).length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes}m ago`;
      }
      return `${hours}h ago`;
    }
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'exam', label: 'Exams' },
    { id: 'academic', label: 'Academic' },
    { id: 'deadline', label: 'Deadlines' },
    { id: 'finance', label: 'Finance' },
    { id: 'event', label: 'Events' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 text-sm font-semibold rounded-full bg-destructive text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-muted-foreground mt-1">Stay updated with announcements and alerts</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.label}
              {f.id === 'unread' && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-destructive text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => {
              const config = typeConfig[notification.type as keyof typeof typeConfig] || typeConfig.general;
              const Icon = config.icon;

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    "card-interactive p-4 cursor-pointer",
                    !notification.isRead && "notification-unread"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      config.bg
                    )}>
                      <Icon className={cn("w-5 h-5", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={cn(
                          "font-medium",
                          !notification.isRead ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.isRead && (
                            <span className="w-2 h-2 rounded-full bg-primary" />
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(notification.date)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <span className={cn(
                        "inline-block mt-2 px-2 py-0.5 text-xs rounded-full capitalize",
                        config.bg,
                        config.color
                      )}>
                        {notification.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Bell className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-1">No notifications</h3>
              <p className="text-sm text-muted-foreground">
                {filter === 'unread' 
                  ? "You're all caught up!" 
                  : "No notifications in this category"
                }
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
