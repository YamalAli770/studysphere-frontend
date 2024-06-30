"use client";

import { verifyEducationVerificationAction } from "@/actions/education-verification";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { getUserById } from "@/lib/data/user";
import { UserRole, VerificationStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface VerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  role: UserRole;
  emailVerified: Date | null;
  isTwoFactorEnabled: boolean;
};

export const VerifyModal = ({ isOpen, onClose, userId }: VerifyModalProps) => {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [remark, setRemark] = useState<string | null>("");
  const [status, setStatus] = useState<VerificationStatus>("PENDING");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (isOpen && !fetchedUser) {
        let user = await getUserById(userId);
        setFetchedUser(user);
      }
    };
    fetchUser();
  }, [isOpen, fetchedUser]);

  const updateEduVerification = async () => {
    setIsLoading(true);
    const res = await verifyEducationVerificationAction(userId, status, remark);

    if (res.success) {
      toast.success(res.success);
      setIsLoading(false);
      onClose();
    } else {
      setIsLoading(false);
      toast.error(res.error);
    }
  };

  const onChange = (value: VerificationStatus) => {
    setStatus(value);
  }

  return (
    <>
      {fetchedUser && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Verify Education</DialogTitle>
              <DialogDescription>
                Verify user documents to approve their education.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <div
                  id="username"
                  className="col-span-3 text-sm border border-gray-300 p-2 rounded-md"
                >
                  {fetchedUser.name}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <div
                  id="email"
                  className="col-span-3 text-sm border border-gray-300 p-2 rounded-md"
                >
                  {fetchedUser.email}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="remarks" className="text-right">
                  Remarks
                </Label>
                <Input
                  id="remarks"
                  className="col-span-3 text-sm border border-gray-300 p-2 rounded-md"
                  value={remark || ""}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Verification Status
                </Label>
                <div className="col-span-3">
                  <Select onValueChange={onChange}>
                    <SelectTrigger className="w-full text-sm border border-gray-300 p-2 rounded-md">
                      <SelectValue placeholder="Verify Education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem
                          value="VERIFIED"
                        >
                          Verified
                        </SelectItem>
                        <SelectItem
                          value="REJECTED"
                        >
                          Rejected
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} type="submit" onClick={updateEduVerification}>
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
