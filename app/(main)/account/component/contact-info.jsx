//

"use client";

import { changeUserContactInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactInfo = ({ userInfo }) => {
  const [phone, setPhone] = useState(userInfo?.phone || "");

  const defaultLinks =
    userInfo?.socialMedia && Object.keys(userInfo.socialMedia).length > 0
      ? Object.entries(userInfo.socialMedia).map(([platform, url]) => ({
          platform,
          url,
        }))
      : [{ platform: "", url: "" }];

  const [links, setLinks] = useState(defaultLinks);

  const addField = () => {
    setLinks([...links, { platform: "", url: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const doContactInfoChange = async (e) => {
    e.preventDefault();

    const socialMedia = {};

    links.forEach((item) => {
      if (item.platform.trim() && item.url.trim()) {
        socialMedia[item.platform.trim()] = item.url.trim();
      }
    });

    const updatedData = {
      phone,
      socialMedia,
    };

    if (!phone.trim() && Object.keys(socialMedia).length === 0) {
      toast.error(
        "Please enter a phone number or at least one social media link",
      );
      return;
    }

    try {
      await changeUserContactInfo(userInfo?.email, updatedData);
      setLinks(
        Object.entries(socialMedia).map(([platform, url]) => ({
          platform,
          url,
        })),
      );
      toast.success("Contact info updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info</h5>

      <form onSubmit={doContactInfoChange}>
        <div className="mb-4">
          <Label className="mb-2 block">Phone</Label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
        </div>

        <Label className="mb-2 block">Social Media</Label>

        {links.map((item, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <Input
              placeholder="Platform (twitter)"
              value={item.platform}
              onChange={(e) => handleChange(index, "platform", e.target.value)}
            />

            <Input
              placeholder="URL"
              value={item.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
          </div>
        ))}
        <div className="flex justify-between mt-5">
          <Button type="button" onClick={addField}>
            + Add
          </Button>

          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
