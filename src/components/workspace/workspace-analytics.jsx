import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Building2, Calendar, CalendarDays, ChevronDown, Plus, ReceiptText, Upload, User2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader
} from "../../components/ui/card";
import CollapsibleRow from "../../components/ui/collapsiblerow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { sampleMonthlyTransactions } from '../../constant/sample-data';
import { useAuthContext } from "../../context/auth-provider";
import useActivateNowDialog from "../../hooks/use-activate-now-dialog";
import usePayNowDialog from "../../hooks/use-pay-now-dialog";
import { toast } from "../../hooks/use-toast";
import { uploadFileMutationFn } from "../../lib/api";
import { getFileTypeEnum } from "../../utils/getFileType";
import { InvoiceTable } from "./accordion/invoice-table";
import SubscriptionScheduleTable from "./accordion/subscription-schedule-table";
import UploadsTable from "./accordion/uploads-table";



const branches = [
  "Nairobi West",
  "Kitengela",
  "CBD"
];

const invoices = [
  {
    id: "INV-202501",
    dateIssued: "2025-05-21",
    description: "Monthly subscription - Premium Plan",
    amount: 4999.0,
    paymentMethod: "MPesa",
    status: "paid",
  },
  {
    id: "INV-202502",
    dateIssued: "2025-05-19",
    description: "Event booth registration - Expo 2025",
    amount: 12000.0,
    paymentMethod: "Credit Card",
    status: "unpaid",
  },
  {
    id: "INV-202503",
    dateIssued: "2025-05-15",
    description: "Ticket sales commission",
    amount: 8550.75,
    paymentMethod: "Bank Transfer",
    status: "failed",
  },
  {
    id: "INV-202504",
    dateIssued: "2025-05-10",
    description: "Merchandise sales - Conference bundle",
    amount: 17500.0,
    paymentMethod: "PayPal",
    status: "paid",
  },
  {
    id: "INV-202505",
    dateIssued: "2025-05-08",
    description: "Custom analytics dashboard setup",
    amount: 27500.0,
    paymentMethod: "Mobile Money",
    status: "unpaid",
  },
];

const subDetails = [
  { id: "last-payment-on", label: "Last Payment On", value: "May 16 2025" },
  { id: "next-payment-on", label: "Next Payment On", value: "June 16 2025" },
  {
    id: "next-payment-amt",
    label: "Next Payment Amount",
    value: "KES250,000.00",
    isDestructive: true,
  },
  { id: "mobile-number", label: "Mobile No", value: "0758***306" },
];

const WorkspaceAnalytics = () => {
  const { onOpen: onPayNowOpen } = usePayNowDialog();
  const { onOpen: onActivateNowOpen } = useActivateNowDialog();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const [openIndex, setOpenIndex] = useState(null);
  const [isUploadsVisible, setUploadsVisible] = useState(false);

  const fileInputRef = useRef(null);

  const billingCycle = user?.billingCycle || "Unknown Cycle";
  const branchCount = user?.branchCount || "Unknown Branches";
  const userCount = user?.userCount || "Unknown Users";

  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: uploadFileMutationFn,
    onSuccess: (data) => {
      toast({
        title: "File(s) uploaded successfully!",
        description: `File(s): ${data.originalFileName} uploaded successfully!`,
        variant: "success",
      }),
        console.log("File(s) uploaded successfully: ", data.originalFileName);
      queryClient.invalidateQueries(["uploaded-files"]);
    },
    onError: (error) => {
      toast({
        title: "Failed to upload file(s)",
        description: error.message || "An error occurred while uploading the file(s).",
        variant: "destructive",
      }),
        console.error("Error uploading file(s): ", error);
    }
  });

  const handleToggle = (index) => {
    if (index === 0 && !isUploadsVisible) {
      setUploadsVisible(true);
    }
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = getFileTypeEnum(file);
    if (!fileType) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF, Excel, or Image file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType)

    uploadFile(formData);
    e.target.value = "";
  }

  return (
    <div className="flex flex-col px-4 py-3">
      <Card className="flex flex-col flex-1 overflow-hidden rounded-2xl">
        {/* Top Summary Section */}
        <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-6 pb-2">
          <div className="flex-1 min-w-[140px]">
            <div className="text-muted-foreground mt-2 text-sm leading-6 space-y-2">
              {/* Billing Cycle */}
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <span>{billingCycle}</span>
              </div>

              {/* Branches Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer w-fit">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{branchCount} Branches</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="min-w-48 rounded-md py-1">
                  {branches.map((branch, id) => (
                    <DropdownMenuItem
                      key={id}
                      className="pointer-events-none text-muted-foreground"
                    >
                      {branch}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Count */}
              <div className="flex items-center gap-2">
                <User2 className="w-4 h-4 text-muted-foreground" />
                <span>{userCount} Users</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-2 text-sm">
            {subDetails.map((detail) => (
              <div key={detail.id} className="flex justify-between">
                <span className="text-muted-foreground">{detail.label}:</span>
                <span
                  className={`font-medium ${detail.isDestructive ? "text-red-600" : "text-gray-800"
                    }`}
                >
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            <Button
              onClick={onPayNowOpen}
              className="!text-[15px]"
              variant="outline"
            >
              Pay Now
            </Button>
            <Button
              onClick={onActivateNowOpen}
              className="!text-[15px]"
              variant="outline"
            >
              Activate Now
            </Button>
          </div>
        </CardHeader>

        {/* Scrollable Collapsible Section */}
        <CardContent className="px-4 pb-4">
          <div className="flex flex-col space-y-4 h-full">
            {/* Uploads Section */}
            <CollapsibleRow
              icon={<Upload className="w-4 h-4" />}
              label="Uploads"
              isOpen={openIndex === 0}
              onToggle={() => handleToggle(0)}
            >
              {/* Upload File Button */}
              <div className="bs flex justify-start">
                <a 
                  onClick={handleUploadClick}
                  className='mt-2 inline-flex items-center text-sm font-medium mb-3 ml-4 text-caramel hover:underline cursor-pointer'
                  >
                  {isPending ? "Uploading..." : "Upload File"}
                </a>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                />
              </div>
              {isUploadsVisible && <UploadsTable />}
            </CollapsibleRow>

            {/* Invoices/Receipts Section */}
            <CollapsibleRow
              icon={<ReceiptText className="w-4 h-4" />}
              label="Invoices / Receipts"
              isOpen={openIndex === 1}
              onToggle={() => handleToggle(1)}>
              <InvoiceTable invoices={invoices} />
            </CollapsibleRow>

            {/* Sub Schedule Section */}
            <CollapsibleRow
              icon={<Calendar className="w-4 h-4" />}
              label="Subscription Schedule"
              isOpen={openIndex === 2}
              onToggle={() => handleToggle(2)}>
              <SubscriptionScheduleTable
                transactions={sampleMonthlyTransactions}
                billingCycle='monthly'
              />
            </CollapsibleRow>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceAnalytics;
