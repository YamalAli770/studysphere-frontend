"use client"

import ActionIcon from "./action-icons";
import { Link, Send } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  postId: string;
}

export default function ShareButton({ postId }: ShareButtonProps) {
    return (
        <ActionIcon
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/dashboard/p/${postId}`
            );
            toast("Link copied to clipboard", {
              icon: <Link className={"h-5 w-5"} />,
            });
          }}
        >
          <Send className={"h-6 w-6"} />
        </ActionIcon>
      );
}
