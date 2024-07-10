import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import StarRating from "./star-rating";
import { createFeedbackAction } from "@/actions/feedback";
import { toast } from "sonner";

interface ReviewModalProps {
  orderId: string;
  isModalOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ orderId, isModalOpen, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false); // Loading state

  const submitFeedback = async () => {
    setLoading(true); // Start loading

    try {
      const res = await createFeedbackAction(orderId, rating, content);

      if (res.success) {
        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Unable to create feedback.");
    } finally {
      setLoading(false); // Stop loading
      onClose(); // Close the modal regardless of success or failure
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Mentor</DialogTitle>
          <DialogDescription>
            In order to help others, please review the mentor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="feedback" className="text-right">
              Feedback
            </Label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 border rounded p-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={submitFeedback} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
