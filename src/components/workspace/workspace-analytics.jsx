import React, { useRef } from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Upload, ReceiptText, Calendar } from "lucide-react";
import CollapsibleRow from "../../components/ui/collapsiblerow";
import { InvoiceTable } from "./accordion/invoice-table";
import SubscriptionScheduleTable from "./accordion/subscription-schedule-table";
import UploadsTable from "./accordion/uploads-table";
import useWorkspaceId from "../../hooks/use-workspace-id";
import usePayNowDialog from "../../hooks/use-pay-now-dialog";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth-provider";
import useActivateNowDialog from "../../hooks/use-activate-now-dialog";
import { Plus } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import { uploadFileMutationFn } from "../../lib/api";
import { toast } from "../../hooks/use-toast";



const branches = [
  "Nairobi West",
  "Kitengela",
  "CBD",
  "Thika",
  "Syokimau"
];

const uploadedFiles = [
  {
    id: "1",
    name: "CV.pdf",
    status: "Approved",
    lastModifiedAt: "2025-05-26 09:00 AM",
    fileType: "PDF Document",
    size: 1.2 * 1024 * 1024,
  },
  {
    id: "2",
    name: "Profile.jpg",
    status: "Pending",
    lastModifiedAt: "2025-05-26 07:00 PM",
    fileType: "JPEG Image",
    size: 2.4 * 1024 * 1024,
  },
  {
    id: "3",
    name: "Document.docx",
    status: "Approved",
    lastModifiedAt: "2025-05-25 04:00 PM",
    fileType: "Word Document",
    size: 3.5 * 1024 * 1024,
  },
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
const subscriptionSchedule = [
  // Monthly subscription
  {
    id: "SUB10001",
    name: "phAMAcore Lite Monthly Plan",
    startDate: "2025-05-01",
    cycle: "monthly",
    schedule: [
      { date: "May 1", amount: 10000, status: "paid" },
      { date: "Jun 1", amount: 10000, status: "paid" },
      { date: "Jul 1", amount: 10000, status: "due" },
      { date: "Aug 1", amount: 10000, status: "due" },
    ],
    paymentMethod: "Mobile Money",
    status: "Active",
  },

  // Quarterly subscription
  {
    id: "SUB12345",
    name: "cliniCore Quarterly Plan",
    startDate: "2025-01-15",
    cycle: "quarterly",
    schedule: [
      { date: "May 15", amount: 250000, status: "paid" },
      { date: "Aug 15", amount: 250000, status: "due" },
      { date: "Nov 15", amount: 250000, status: "due" },
    ],
    paymentMethod: "Credit Card",
    status: "Inactive",
  },

  // Annual subscription
  {
    id: "SUB54321",
    name: "phAMAcore Enterprise Annual Plan",
    startDate: "2025-03-10",
    cycle: "annually",
    schedule: [
      { date: "Mar 10", amount: 1200000, status: "paid" },
      { date: "Mar 10, 2026", amount: 1200000, status: "due" },
    ],
    paymentMethod: "Bank Transfer",
    status: "Active",
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
    const workspaceId = useWorkspaceId();
    const { onOpen: onPayNowOpen } = usePayNowDialog();
    const { onOpen: onActivateNowOpen } = useActivateNowDialog();

    const { user, isLoading } = useAuthContext();
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
      setOpenIndex(prev => (prev === index ? null : index));
    };

    const username = user?.fullname || "Unknown User";
    const packageName = user?.packageName || "Unknown Client Package"
    const companyName = user?.companyName || "Unknown Company";
    const cusCode = user?.psCusCode || "CUSXXX";
    const billingCycle = user?.billingCycle || "Unknown Cycle";
    const branchCount = user?.branchCount || "Unknown Branches";
    const userCount = user?.userCount || "Unknown Users";

    const fileInputRef = useRef(null);
    
    const { mutate: uploadFile, isPending } = useMutation({
      mutationFn: uploadFileMutationFn,
      onSuccess: (data) => {
        toast({
          title: "File(s) uploaded successfully!",
          description: `File(s): ${data.originalFileName} uploaded successfully!`,
          variant: "success",
        }),
        console.log("File(s) uploaded successfully: ", data.originalFileName);
      }, 
      onError: (error) => {
        toast({
          title: "Failed to upload file(s)",
          description: error.message || "An error occurred while uploading the file(s).",
          variant: "destructive",
        }),
        console.error("Error uploading file(s): ", error);
      }
    })

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        uploadFile(formData);
        e.target.value = "";
      }
    }

  return (
    <div className="bs">
      <div className="min-h-screen flex flex-col px-6 py-4">
        <Card className="flex flex-col flex-1 overflow-hidden rounded-2xl">
          {/* Top Summary Section */}
          <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6">
            <div className="flex-1 min-w-[140px]">
              <CardTitle className="text-xl">{cusCode} - {companyName}</CardTitle>
              <p className="text-sm text-caramel font-medium mt-1">
                {packageName}
              </p>
              <div className="text-muted-foreground mt-2 text-sm leading-6">
                <div>{billingCycle} <br /></div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <p className="flex items-center gap-1 cursor-pointer w-fit">
                      <span>{branchCount} Branches</span>
                      <ChevronDown className="w-4 h-4" />
                    </p>
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

                <div>{userCount} Users</div>
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

            <div className="flex flex-col gap-2 min-w-[140px]">
              <Button
              onClick={onActivateNowOpen}
              className="!text-[15px]"
              variant="outline"
            >
                  Activate Now
              </Button>
              <Button
                onClick={onPayNowOpen}
                className="!text-[15px]"
                variant="outline"
              >
                  Pay Now
              </Button>
            </div>
          </CardHeader>

          {/* Upload File Button */}
          <div className="flex justify-start">
            <Button
              variant="secondary"
              onClick={handleUploadClick}
              className="upload-file-btn"
              style={{ maxWidth: "200px" }}
            >
              <span className="d-flex align-items-center justify-content-start">
                <Plus className="me-1" size={14} style={{ color: "orange" }} />
                {isPending? "Uploading..." :"Upload File"}
              </span>
            </Button>

            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
            />
          </div>

          {/* Scrollable Collapsible Section */}
            <CardContent className="flex-1 min-h-0 overflow-hidden px-0 pb-6">
              <div className="flex flex-col space-y-4 h-full">
              {/* Uploads Section */}
              <CollapsibleRow
                icon={<Upload className="w-4 h-4" />}
                label="Uploads (3)"
                isOpen={openIndex === 0}
                onToggle={() => handleToggle(0)}
              >
                <UploadsTable files={uploadedFiles} />
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
                <SubscriptionScheduleTable subscriptions={subscriptionSchedule} />
              </CollapsibleRow>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceAnalytics;
