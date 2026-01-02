import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, TrendingUp, Award, BookOpen } from 'lucide-react';
import { academicRecords, studentData } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';

const getGradeClass = (grade: string) => {
  switch (grade) {
    case 'A': return 'grade-A';
    case 'B': return 'grade-B';
    case 'C': return 'grade-C';
    case 'D': return 'grade-D';
    case 'F': return 'grade-F';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Results = () => {
  const [expandedSemester, setExpandedSemester] = useState<string | null>(
    `${academicRecords[academicRecords.length - 1].semester}-${academicRecords[academicRecords.length - 1].session}`
  );

  const toggleSemester = (key: string) => {
    setExpandedSemester(expandedSemester === key ? null : key);
  };

  const totalCredits = academicRecords.reduce(
    (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.credits, 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Academic Records</h1>
          <p className="text-muted-foreground mt-1">View your semester results and cumulative CGPA</p>
        </div>

        {/* CGPA Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cumulative CGPA</p>
                <p className="text-3xl font-bold text-foreground">{studentData.cgpa.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Out of 5.00</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-elevated p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credit Units</p>
                <p className="text-3xl font-bold text-foreground">{totalCredits}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center">
                <Award className="w-7 h-7 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class of Degree</p>
                <p className="text-3xl font-bold text-foreground">2nd Upper</p>
                <p className="text-xs text-muted-foreground">Projected</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Semester Results */}
        <div className="space-y-4">
          {academicRecords.slice().reverse().map((semester, index) => {
            const key = `${semester.semester}-${semester.session}`;
            const isExpanded = expandedSemester === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated overflow-hidden"
              >
                <button
                  onClick={() => toggleSemester(key)}
                  className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{semester.level}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">
                        {semester.semester}
                      </h3>
                      <p className="text-sm text-muted-foreground">{semester.session}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-muted-foreground">GPA</p>
                      <p className="text-xl font-bold text-foreground">{semester.gpa.toFixed(2)}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-6">
                        <div className="border-t border-border pt-4">
                          {/* Mobile View */}
                          <div className="md:hidden space-y-3">
                            {semester.courses.map((course, idx) => (
                              <div key={idx} className="p-4 rounded-xl bg-muted/30">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-foreground">{course.code}</p>
                                    <p className="text-sm text-muted-foreground">{course.title}</p>
                                  </div>
                                  <span className={cn("grade-badge", getGradeClass(course.grade))}>
                                    {course.grade}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-muted-foreground">
                                    <span className="font-medium text-foreground">{course.credits}</span> Credits
                                  </span>
                                  <span className="text-muted-foreground">
                                    <span className="font-medium text-foreground">{course.score}</span> Score
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Desktop View */}
                          <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="table-header">
                                  <th className="text-left p-3 rounded-l-lg">Course Code</th>
                                  <th className="text-left p-3">Course Title</th>
                                  <th className="text-center p-3">Credits</th>
                                  <th className="text-center p-3">Score</th>
                                  <th className="text-center p-3 rounded-r-lg">Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {semester.courses.map((course, idx) => (
                                  <tr 
                                    key={idx} 
                                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                                  >
                                    <td className="p-3 font-medium text-foreground">{course.code}</td>
                                    <td className="p-3 text-muted-foreground">{course.title}</td>
                                    <td className="p-3 text-center">{course.credits}</td>
                                    <td className="p-3 text-center font-medium">{course.score}</td>
                                    <td className="p-3 text-center">
                                      <span className={cn("grade-badge mx-auto", getGradeClass(course.grade))}>
                                        {course.grade}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Semester Summary */}
                          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">
                                Total Courses: <span className="font-semibold text-foreground">{semester.courses.length}</span>
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Total Credits: <span className="font-semibold text-foreground">
                                  {semester.courses.reduce((sum, c) => sum + c.credits, 0)}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10">
                              <span className="text-sm text-muted-foreground">Semester GPA:</span>
                              <span className="text-lg font-bold text-primary">{semester.gpa.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Results;
