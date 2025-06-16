import React, { useState } from "react";
import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { toast } from "../../hooks/use-toast";

const LogoutDialog = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(() => {
    setIsLoading(true);

    try {
      queryClient.removeQueries({ queryKey: ["authUser"] });
      localStorage.removeItem("token");
      sessionStorage.clear();

      toast({
        title: "Signed out",
        description: "You’ve been logged out successfully.",
        variant: "success"
      });

      navigate("/");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error?.message || "Something went wrong during logout.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [queryClient, navigate, setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogDescription>
            This will end your current session and you will need to log in
            again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} type="button" onClick={handleLogout}>
            {isLoading && <Loader className="animate-spin" />}
            Sign out
          </Button>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
