import { motion } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Download,
  Clock,
  FileText
} from 'lucide-react';
import { feesData } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Fees = () => {
  const { toast } = useToast();

  const paymentPercentage = (feesData.amountPaid / feesData.totalFees) * 100;

  const handlePayNow = () => {
    toast({
      title: "Payment Portal",
      description: "Redirecting to payment gateway...",
    });
  };

  const handleDownloadReceipt = (reference: string) => {
    toast({
      title: "Downloading Receipt",
      description: `Receipt ${reference} is being downloaded.`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Fees & Payment</h1>
          <p className="text-muted-foreground mt-1">Manage your tuition and other fees</p>
        </div>

        {/* Payment Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 card-elevated p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Academic Session</p>
                <p className="text-lg font-semibold text-foreground">{feesData.session}</p>
              </div>
              {feesData.balance > 0 ? (
                <span className="px-3 py-1 rounded-full bg-warning/10 text-warning text-sm font-medium flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Outstanding Balance
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Fully Paid
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Progress</span>
                <span className="font-medium text-foreground">{paymentPercentage.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${paymentPercentage}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={cn(
                    "h-full rounded-full",
                    paymentPercentage >= 100 ? "bg-success" : "bg-primary"
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground">Total Fees</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {formatCurrency(feesData.totalFees)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <p className="text-sm text-success">Amount Paid</p>
                <p className="text-2xl font-bold text-success mt-1">
                  {formatCurrency(feesData.amountPaid)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                <p className="text-sm text-warning">Balance Due</p>
                <p className="text-2xl font-bold text-warning mt-1">
                  {formatCurrency(feesData.balance)}
                </p>
              </div>
            </div>

            {feesData.balance > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-warning/5 border border-warning/20">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Payment Deadline</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(feesData.dueDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-elevated p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {feesData.balance > 0 && (
                <Button onClick={handlePayNow} className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              )}
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Invoice
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Statement
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fee Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated"
          >
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Fee Breakdown</h3>
            </div>
            <div className="p-6 space-y-3">
              {feesData.breakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <span className="text-muted-foreground">{item.item}</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary text-lg">
                    {formatCurrency(feesData.totalFees)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-elevated"
          >
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Payment History</h3>
            </div>
            <div className="p-6 space-y-4">
              {feesData.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {payment.reference}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(payment.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadReceipt(payment.reference)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
              
              {feesData.payments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No payment records found</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Fees;
