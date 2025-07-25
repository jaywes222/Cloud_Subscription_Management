import React, { useRef, useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Building2,
  Calendar,
  CalendarDays,
  ReceiptText,
  Upload,
  User2,
  ListTodo
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import CollapsibleRow from '../../components/ui/collapsiblerow';
import { useAuthContext } from '../../context/auth-provider';
import useActivateNowDialog from '../../hooks/use-activate-now-dialog';
import usePayNowDialog from '../../hooks/use-pay-now-dialog';
import { toast } from '../../hooks/use-toast';
import {
  uploadFileMutationFn,
  getSubscriptionDatesQueryFn
} from '../../lib/api';
import { getFileTypeEnum } from '../../utils/getFileType';
import { InvoiceTable } from './accordion/invoice-table';
import SubscriptionScheduleTable from './accordion/subscription-schedule-table';
import UploadsTable from './accordion/uploads-table';
import PendingApprovalTable from './accordion/pending-approvals-table';

const WorkspaceAnalytics = () => {
  const { user } = useAuthContext();
  const { onOpen: onPayNowOpen } = usePayNowDialog();
  const { onOpen: onActivateNowOpen } = useActivateNowDialog();
  const queryClient = useQueryClient();

  const fileInputRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [isUploadsVisible, setUploadsVisible] = useState(false);

  const billingCycle = user?.billingCycle || 'Unknown Cycle';
  const branchCount = user?.branchCount ?? 0;
  const userCount = user?.userCount ?? 0;

  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: uploadFileMutationFn,
    onSuccess: (data) => {
      toast({
        title: 'File(s) uploaded successfully!',
        description: `File(s): ${data.originalFileName}`,
        variant: 'success'
      });
      queryClient.invalidateQueries(['uploaded-files']);
    },
    onError: (error) => {
      toast({
        title: 'Upload failed',
        description: error.message || 'An error occurred during upload.',
        variant: 'destructive'
      });
    }
  });

  const {
    data: scheduleDates,
    isLoading: loadingDates,
    isError: subDatesError
  } = useQuery({
    queryKey: ['sub-dates'],
    queryFn: getSubscriptionDatesQueryFn
  });

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
      : 'N/A';

  const subDetails = useMemo(() => {
    const item = scheduleDates?.items?.[0];
    if (!item) return [];

    return [
      {
        id: 'last-payment-on',
        label: 'Last Payment On',
        value: formatDate(item.lastpayment)
      },
      {
        id: 'next-payment-on',
        label: 'Next Payment On',
        value: formatDate(item.duedatepayment)
      },
      {
        id: 'expiry-date',
        label: 'Subscription Expires',
        value: formatDate(item.expiryDate)
      },
      {
        id: 'next-payment-amt',
        label: 'Next Payment Amount',
        value: item.amtDue
          ? new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
          }).format(item.amtDue)
          : 'KES 0.00',
        isHighlight: true
      }
    ];
  }, [scheduleDates]);


  const handleToggle = (index) => {
    if (index === 0 && !isUploadsVisible) setUploadsVisible(true);
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = getFileTypeEnum(file);
    if (!fileType) {
      toast({
        title: 'Unsupported file type',
        description: 'Please upload a PDF, Excel, or Image file.',
        variant: 'destructive'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    uploadFile(formData);

    e.target.value = '';
  };

  return (
    <div className="flex flex-col px-4 py-3">
      <Card className="flex flex-col flex-1 rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row gap-6 items-stretch pb-2">
          {/* Left */}
          <div className="flex-1 space-y-2 text-sm text-muted-foreground min-w-[140px]">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{billingCycle}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{branchCount} {branchCount === 1 ? 'Branch' : 'Branches'}</span>
            </div>
            <div className="flex items-center gap-2">
              <User2 className="w-4 h-4" />
              <span>{userCount} {userCount === 1 ? 'User' : 'Users'}</span>
            </div>
          </div>

          {/* Center */}
          <div className="flex-1 space-y-2 text-sm min-w-[200px]">
            {loadingDates ? (
              <div>Loading subscription details...</div>
            ) : subDatesError || !subDetails.length ? (
              <div className="text-red-600">No subscription added.</div>
            ) : (
              subDetails.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span className={`font-medium ${item.isHighlight ? 'text-green-700' : 'text-gray-800'}`}>
                    {item.value}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            <Button
              variant="outline"
              onClick={onActivateNowOpen}
              className="!text-[15px]"
              disabled={user?.isAccountActive}
              title={user?.isAccountActive ? 'Client is already active' : 'Activate account'}
            >
              {user?.isAccountActive ? 'Active' : 'Activate Now'}
            </Button>
            <Button onClick={onPayNowOpen} className="!text-[15px]" variant="outline">
              Pay Now
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4">
          <div className="flex flex-col space-y-4">
            <CollapsibleRow
              icon={<Upload className="w-4 h-4" />}
              label="Uploads"
              isOpen={openIndex === 0}
              onToggle={() => handleToggle(0)}
            >
              <div className="flex justify-between items-center">
                <a
                  onClick={handleUploadClick}
                  className="mt-2 ml-4 mb-3 text-sm font-medium text-caramel hover:underline cursor-pointer"
                >
                  {isPending ? 'Uploading...' : 'Upload File'}
                </a>
                <h5 className="mt-2 mr-4 mb-3 font-bold text-caramel">
                  Max File Size: 5MB
                </h5>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                />
              </div>
              {isUploadsVisible && <UploadsTable />}
            </CollapsibleRow>

            <CollapsibleRow
              icon={<ReceiptText className="w-4 h-4" />}
              label="Invoices / Receipts"
              isOpen={openIndex === 1}
              onToggle={() => handleToggle(1)}
            >
              <InvoiceTable />
            </CollapsibleRow>

            <CollapsibleRow
              icon={<Calendar className="w-4 h-4" />}
              label="Subscription Schedule"
              isOpen={openIndex === 2}
              onToggle={() => handleToggle(2)}
            >
              <SubscriptionScheduleTable />
            </CollapsibleRow>

            <CollapsibleRow
              icon={<ListTodo className="w-4 h-4" />}
              label="Pending Approvals"
              isOpen={openIndex === 3}
              onToggle={() => handleToggle(3)}
            >
              <PendingApprovalTable />
            </CollapsibleRow>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceAnalytics;
