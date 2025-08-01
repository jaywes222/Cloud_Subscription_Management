import React, { useRef } from "react";
import { Button, Card, Container } from "react-bootstrap";
import TermsSection from "./TermsSection";
import { DialogHeader, DialogTitle } from "../../ui/Dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { activateAccountMutationFn, getFilesQueryFn } from "../../../lib/api";
import { toast } from "../../../hooks/use-toast";


const Activation = ({
  termsChecked,
  setTermsChecked,
}) => {
  const formRef = useRef();

  const { data: uploadedFiles = [], isLoading: filesLoading } = useQuery({
    queryKey: ['uploadedFiles'],
    queryFn: getFilesQueryFn,

  })

  const { mutate: activateAccount, isPending } = useMutation({
    mutationFn: activateAccountMutationFn,
    onSuccess: (data) => {
      toast({
        title: "Activation Success!",
        description: "Your account has been successfully activated! Please check your email for confirmation.",
        variant: "success",
      }),
      console.log("Account successfully activated!", data);
      formRef.current?.reset(); // Reset form after success
      setTermsChecked(false); // Reset checkbox after success
    },
    onError: (error) => {
      toast({
        title: "Activation Failure",
        description: `${error.message || "Activation failed. Please try again."}`,
        variant: "destructive",
      }),
      console.error("Activation failed:", error);
    }
  });

  const hasTrainingSheet = uploadedFiles.some(file => file.isTrainingSheet);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasTrainingSheet) {
      toast({
        title: "Missing Training Sheet",
        description: "Please upload your signed training sheet to activate your account!",
        variant: "destructive",
      });
      return;
    }

    activateAccount({ termsChecked });
  }

  return (
    <div className="bs">
      <Container className="mt-4">
        <Card className="px-4 w-100" style={{ maxWidth: "60rem", fontSize: "20px", }}>
          <Card.Body>
            <DialogHeader>
              <DialogTitle>Activate my Subscription</DialogTitle>
            </DialogHeader>


            {/* Terms Section and Activate Button */}

            <TermsSection
              termsChecked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
              hasTrainingSheet={hasTrainingSheet}
            />

            <div className="activate-btn">
              <Button
                type="submit"
                variant="secondary"
                disabled={!termsChecked || isPending || filesLoading}
                style={{
                  backgroundColor: termsChecked && hasTrainingSheet ? "#c58c4f" : "#d6d6d6",
                  cursor: termsChecked && hasTrainingSheet ? "pointer" : "not-allowed",
                  // opacity: termsChecked && hasTrainingSheet >= 3 ? 1 : 0.6,
                  borderRadius: "5px",
                  padding: "5px 10px",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
                onClick={handleSubmit}
              >
                {isPending ? "Activating...":  "Activate Now"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Activation;
