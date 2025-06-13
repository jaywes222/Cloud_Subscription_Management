import React, { useState, useEffect } from "react";
import { Separator } from "../../components/ui/separator";
import { EditableField } from "../../components/workspace/profile/editable-field";
import useEditProfileFieldDialog from "../../hooks/use-edit-profile-field-dialog";
import EditProfileFieldDialog from "../../components/workspace/profile/edit-profile-field-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { PenBoxIcon } from "lucide-react";
import {useAuthContext} from "../../context/auth-provider"

const Profile = () => {
  const {isLoading, user} = useAuthContext()
  const { open, onOpen, onClose, field, value } = useEditProfileFieldDialog();

  const handleEditClick = (fieldName, fieldValue) => {
    onOpen(fieldName, fieldValue);
  };

  const username = user?.fullname || "Unknown User";
  const companyName = user?.companyName || "Unknown Company";
  const email = user?.email || "N/A";
  const phone = user?.phone || "N/A";
  const password = "************";
  const profilePicUrl = user?.profilePicUrl || "/images/default-avatar.png";
  const cusCode = user?.psCusCode || "CUSXXX";

  return (
    <div className="w-full h-auto py-2">
      {/* <WorkspaceHeader /> */}
      <div className="px-6 py-4">
        <h2 className="text-xl leading-6 font-medium text-gray-900 mb-4">Account Information</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profilePicUrl} alt="Profile Picture" />
              <AvatarFallback>
                {username[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-secondary rounded-full p-0.5 shadow cursor-pointer">
              <PenBoxIcon className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-lg text-caramel font-semibold">{cusCode} - {companyName}</h2>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <main>
        <div className="w-full max-w-2xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="mt-2 grid grid-cols-1 gap-y-4">
            <EditableField
              label="Username"
              field="username"
              value={username}
              loading={isLoading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Company Name"
              field="companyName"
              value={companyName}
              loading={isLoading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Email"
              field="email"
              value={email}
              loading={isLoading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Phone"
              field="phone"
              value={phone}
              loading={isLoading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Password"
              field="password"
              value={password}
              isPassword
              onEdit={handleEditClick}
              loading={isLoading}
              fullWidth
            />
          </div>
        </div>
      </main>

      {/* Safely render dialog only when field is available */}
      {field && (
        <EditProfileFieldDialog
          open={open}
          onClose={onClose}
          field={field}
          initialValue={value}
        />
      )}
    </div>
  );
};

export default Profile;
