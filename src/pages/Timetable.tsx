import { motion } from 'framer-motion';
import { Clock, MapPin, User } from 'lucide-react';
import { timetable, registeredCourses } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
];

const courseColors = [
  'bg-primary/10 border-primary/20 text-primary',
  'bg-success/10 border-success/20 text-success',
  'bg-warning/10 border-warning/20 text-warning',
  'bg-accent/10 border-accent/20 text-accent',
  'bg-destructive/10 border-destructive/20 text-destructive',
  'bg-purple-500/10 border-purple-500/20 text-purple-500',
];

const Timetable = () => {
  const getCourseColor = (code: string) => {
    const index = registeredCourses.findIndex(c => c.code === code);
    return courseColors[index % courseColors.length];
  };

  const getClassForSlot = (day: string, time: string) => {
    return timetable.find(item => item.day === day && item.time === time);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Class Timetable</h1>
          <p className="text-muted-foreground mt-1">Your weekly class schedule</p>
        </div>

        {/* Desktop View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block card-elevated overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-muted">
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground w-32">
                    Time
                  </th>
                  {days.map(day => (
                    <th key={day} className="p-4 text-center text-sm font-semibold text-muted-foreground">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, timeIndex) => (
                  <tr key={time} className="border-t border-border">
                    <td className="p-4 text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {time}
                    </td>
                    {days.map(day => {
                      const classItem = getClassForSlot(day, time);
                      return (
                        <td key={`${day}-${time}`} className="p-2">
                          {classItem ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: timeIndex * 0.05 }}
                              className={cn(
                                "timetable-cell border rounded-xl cursor-pointer",
                                getCourseColor(classItem.course)
                              )}
                            >
                              <p className="font-bold text-sm">{classItem.course}</p>
                              <div className="flex items-center gap-1 mt-1 text-xs opacity-80">
                                <MapPin className="w-3 h-3" />
                                <span>{classItem.venue}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5 text-xs opacity-80">
                                <User className="w-3 h-3" />
                                <span className="truncate">{classItem.lecturer}</span>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="h-20 rounded-xl bg-muted/30 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground/50">—</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile View - Stacked by day */}
        <div className="lg:hidden space-y-4">
          {days.map((day, dayIndex) => {
            const dayClasses = timetable.filter(item => item.day === day);
            
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.1 }}
                className="card-elevated overflow-hidden"
              >
                <div className="p-4 bg-muted border-b border-border">
                  <h2 className="font-semibold text-foreground">{day}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {dayClasses.length} class{dayClasses.length !== 1 ? 'es' : ''}
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  {dayClasses.length > 0 ? (
                    dayClasses.map((classItem, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-4 rounded-xl border",
                          getCourseColor(classItem.course)
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-bold">{classItem.course}</p>
                            <p className="text-sm opacity-80 mt-0.5">
                              {registeredCourses.find(c => c.code === classItem.course)?.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background/50">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs font-medium">{classItem.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm opacity-80">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{classItem.venue}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{classItem.lecturer}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="text-sm">No classes scheduled</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card-elevated p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">Course Legend</h3>
          <div className="flex flex-wrap gap-2">
            {registeredCourses.map((course, index) => (
              <div
                key={course.code}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium border",
                  courseColors[index % courseColors.length]
                )}
              >
                {course.code}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Timetable;
