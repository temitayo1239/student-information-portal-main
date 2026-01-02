import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, BookOpen, AlertCircle, ShoppingCart } from 'lucide-react';
import { availableCourses, registeredCourses as initialRegistered } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CourseRegistration = () => {
  const [registeredCourses, setRegisteredCourses] = useState(
    initialRegistered.map(c => c.code)
  );
  const [cart, setCart] = useState<string[]>([]);
  const { toast } = useToast();

  const maxCredits = 24;
  const currentCredits = availableCourses
    .filter(c => registeredCourses.includes(c.code) || cart.includes(c.code))
    .reduce((sum, c) => sum + c.credits, 0);

  const isRegistered = (code: string) => registeredCourses.includes(code);
  const isInCart = (code: string) => cart.includes(code);

  const addToCart = (code: string) => {
    const course = availableCourses.find(c => c.code === code);
    if (course && currentCredits + course.credits <= maxCredits) {
      setCart([...cart, code]);
      toast({
        title: "Course added",
        description: `${code} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Credit limit exceeded",
        description: "You cannot register more than 24 credit units.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = (code: string) => {
    setCart(cart.filter(c => c !== code));
    toast({
      title: "Course removed",
      description: `${code} has been removed from your cart.`,
    });
  };

  const dropCourse = (code: string) => {
    setRegisteredCourses(registeredCourses.filter(c => c !== code));
    toast({
      title: "Course dropped",
      description: `${code} has been dropped from your registration.`,
    });
  };

  const confirmRegistration = () => {
    setRegisteredCourses([...registeredCourses, ...cart]);
    setCart([]);
    toast({
      title: "Registration successful",
      description: "Your course registration has been updated.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compulsory':
        return 'bg-destructive/10 text-destructive';
      case 'elective':
        return 'bg-primary/10 text-primary';
      case 'required':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Course Registration</h1>
            <p className="text-muted-foreground mt-1">Register for courses this semester</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg bg-muted">
              <span className="text-sm text-muted-foreground">Credits: </span>
              <span className={cn(
                "font-bold",
                currentCredits > maxCredits ? "text-destructive" : "text-foreground"
              )}>
                {currentCredits}
              </span>
              <span className="text-muted-foreground">/{maxCredits}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Courses */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card-elevated p-4 md:p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Available Courses</h2>
              <div className="space-y-3">
                {availableCourses.map((course, index) => (
                  <motion.div
                    key={course.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "p-4 rounded-xl border transition-all",
                      isRegistered(course.code) 
                        ? "bg-success/5 border-success/20" 
                        : isInCart(course.code)
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/30 border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground">{course.code}</h3>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full capitalize",
                              getStatusBadge(course.status)
                            )}>
                              {course.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{course.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {course.lecturer} • {course.credits} Credit Units
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {isRegistered(course.code) ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => dropCourse(course.code)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Minus className="w-4 h-4 mr-1" />
                            Drop
                          </Button>
                        ) : isInCart(course.code) ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(course.code)}
                          >
                            <Minus className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(course.code)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Summary */}
          <div className="space-y-4">
            {/* Cart */}
            <motion.div
              layout
              className="card-elevated p-4 md:p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Registration Cart</h2>
                {cart.length > 0 && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    {cart.length}
                  </span>
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {cart.length > 0 ? (
                  <div className="space-y-2">
                    {cart.map((code) => {
                      const course = availableCourses.find(c => c.code === code);
                      return (
                        <motion.div
                          key={code}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div>
                            <p className="font-medium text-sm text-foreground">{code}</p>
                            <p className="text-xs text-muted-foreground">{course?.credits} CU</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(code)}
                            className="p-1 rounded-full hover:bg-destructive/10 text-destructive"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                    <Button
                      onClick={confirmRegistration}
                      className="w-full mt-4"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirm Registration
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No courses in cart</p>
                    <p className="text-xs mt-1">Add courses to register</p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Registered Courses */}
            <motion.div layout className="card-elevated p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-5 h-5 text-success" />
                <h2 className="text-lg font-semibold text-foreground">Registered</h2>
              </div>
              <div className="space-y-2">
                {registeredCourses.map((code) => {
                  const course = availableCourses.find(c => c.code === code);
                  return (
                    <div
                      key={code}
                      className="flex items-center justify-between p-3 rounded-lg bg-success/5"
                    >
                      <div>
                        <p className="font-medium text-sm text-foreground">{code}</p>
                        <p className="text-xs text-muted-foreground">{course?.credits} CU</p>
                      </div>
                      <Check className="w-4 h-4 text-success" />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Registered</span>
                  <span className="font-semibold text-foreground">
                    {availableCourses
                      .filter(c => registeredCourses.includes(c.code))
                      .reduce((sum, c) => sum + c.credits, 0)} CU
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Credit Warning */}
            {currentCredits > 20 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-warning/10 border border-warning/20"
              >
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">High credit load</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You're registering for {currentCredits} credit units. Consider your workload carefully.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseRegistration;
