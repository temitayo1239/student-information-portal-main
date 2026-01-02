import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building, BookOpen, Camera, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { student } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: student?.email || '',
    phone: student?.phone || '',
  });

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const InfoItem = ({ 
    icon: Icon, 
    label, 
    value, 
    editable = false,
    field 
  }: { 
    icon: React.ElementType; 
    label: string; 
    value: string;
    editable?: boolean;
    field?: string;
  }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        {isEditing && editable && field ? (
          <Input
            value={formData[field as keyof typeof formData]}
            onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
            className="h-9"
          />
        ) : (
          <p className="text-foreground font-medium">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">View and manage your personal information</p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated overflow-hidden"
        >
          <div className="h-32 bg-primary relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sidebar-primary blur-3xl" />
            </div>
          </div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-card border-4 border-card shadow-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {student?.firstName?.[0]}{student?.lastName?.[0]}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{student?.fullName}</h2>
                <p className="text-muted-foreground">{student?.matricNumber}</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {student?.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-elevated p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="space-y-3">
              <InfoItem icon={User} label="Full Name" value={student?.fullName || ''} />
              <InfoItem 
                icon={Mail} 
                label="Email Address" 
                value={isEditing ? formData.email : student?.email || ''} 
                editable 
                field="email"
              />
              <InfoItem 
                icon={Phone} 
                label="Phone Number" 
                value={isEditing ? formData.phone : student?.phone || ''} 
                editable 
                field="phone"
              />
            </div>
          </motion.div>

          {/* Academic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Academic Information</h3>
            <div className="space-y-3">
              <InfoItem icon={Building} label="Department" value={student?.department || ''} />
              <InfoItem icon={Building} label="Collage" value={student?.collage || ''} />
              <InfoItem icon={BookOpen} label="Level" value={student?.level || ''} />
            </div>
          </motion.div>

          {/* Session Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-elevated p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Current Session</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-xl bg-muted/30">
                <span className="text-muted-foreground">Academic Session</span>
                <span className="font-semibold text-foreground">{student?.session}</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl bg-muted/30">
                <span className="text-muted-foreground">Current Semester</span>
                <span className="font-semibold text-foreground">{student?.semester}</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl bg-muted/30">
                <span className="text-muted-foreground">Student ID</span>
                <span className="font-semibold text-foreground">{student?.id}</span>
              </div>
            </div>
          </motion.div>

          {/* CGPA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-elevated p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Academic Performance</h3>
            <div className="text-center py-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <div>
                  <p className="text-4xl font-bold text-primary">{student?.cgpa?.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Cumulative Grade Point Average out of 5.00
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Semesters</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">25</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">87%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
