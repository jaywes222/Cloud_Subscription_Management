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

  const fullname = user?.fullname || "Unknown User";
  const companyName = user?.companyName || "Unknown Company";
  const email = user?.email || "N/A";
  const phone = user?.phone || "N/A";
  const password = "************";
  const cusCode = user?.psCusCode || "CUSXXX";

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full h-auto py-2">
      {/* <WorkspaceHeader /> */}
      <div className="px-6 py-4">
        <h2 className="text-xl leading-6 font-medium text-gray-900 mb-4">Account Information</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Avatar className="w-16 h-16">
              <AvatarFallback>
                {getInitials(fullname)}
              </AvatarFallback>
            </Avatar>
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
              label="Full Name"
              field="fullname"
              value={fullname}
              onEdit={handleEditClick}
              loading={isLoading}
              fullWidth
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
              onEdit={handleEditClick}
              loading={isLoading}
              fullWidth
            />
            <EditableField
              label="Phone"
              field="phone"
              value={phone}
              onEdit={handleEditClick}
              loading={isLoading}
              fullWidth
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
