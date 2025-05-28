import React, { useState, useEffect } from "react";
import { Separator } from "../../components/ui/separator";
import WorkspaceHeader from "../../components/workspace/common/workspace-header";
import { EditableField } from "../../components/workspace/profile/editable-field";
import useEditProfileFieldDialog from "../../hooks/use-edit-profile-field-dialog";
import EditProfileFieldDialog from "../../components/workspace/profile/edit-profile-field-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { PenBoxIcon } from "lucide-react";

const Profile = () => {
  const { open, onOpen, onClose, field, value } = useEditProfileFieldDialog();

  const [loading, setLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUserProfileData({
        username: "Walter Nila",
        companyName: "Nila Pharmacy",
        email: "walternila@gmail.com",
        phone: "0758***306",
        password: "************",
        profilePicUrl: "/images/default-avatar.png",
        cusCode: "CUS005",
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleEditClick = (fieldName, fieldValue) => {
    onOpen(fieldName, fieldValue);
  };

  return (
    <div className="w-full h-auto py-2">
      {/* <WorkspaceHeader /> */}
      <div className="px-6 py-4">
        <h2 className="text-xl leading-6 font-medium text-gray-900 mb-4">Account Information</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Avatar className="w-16 h-16">
              <AvatarImage src={userProfileData?.profilePicUrl} alt="Profile Picture" />
              <AvatarFallback>
                {userProfileData?.username?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-secondary rounded-full p-0.5 shadow cursor-pointer">
              <PenBoxIcon className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-lg text-caramel font-semibold">{userProfileData?.cusCode} - {userProfileData?.companyName}</h2>
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
              value={userProfileData?.username}
              loading={loading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Company Name"
              field="companyName"
              value={userProfileData?.companyName}
              loading={loading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Email"
              field="email"
              value={userProfileData?.email}
              loading={loading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Phone"
              field="phone"
              value={userProfileData?.phone}
              loading={loading}
              fullWidth
              readOnly
            />
            <EditableField
              label="Password"
              field="password"
              value={userProfileData?.password}
              isPassword
              onEdit={handleEditClick}
              loading={loading}
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
