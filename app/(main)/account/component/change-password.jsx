"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { changePassword } from "@/app/actions/account";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    reTypeNewPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPasswordState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const doPasswordChange = async (event) => {
    event.preventDefault();

    const { oldPassword, newPassword, reTypeNewPassword } = passwordState;

    // validation
    if (newPassword !== reTypeNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await changePassword(email, oldPassword, newPassword);

      toast.success("Password changed successfully");

      // reset form
      setPasswordState({
        oldPassword: "",
        newPassword: "",
        reTypeNewPassword: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>

      <form onSubmit={doPasswordChange}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              name="oldPassword"
              placeholder="Old password"
              value={passwordState.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              name="newPassword"
              placeholder="New password"
              value={passwordState.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label className="mb-2 block">Confirm new password :</Label>
            <Input
              type="password"
              name="reTypeNewPassword"
              placeholder="Re-type new password"
              value={passwordState.reTypeNewPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Button
          className="mt-5 cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
