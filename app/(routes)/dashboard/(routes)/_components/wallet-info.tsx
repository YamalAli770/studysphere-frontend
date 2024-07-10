"use client";
import { createWallet, depositFund, fetchWalletInfo } from "@/actions/wallet";
import { Button } from "@/components/ui/button";
import { CurrencyType } from "@prisma/client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Wallet } from "lucide-react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { connectStripeAccount, transferToAccount, withdrawToStripeAction } from "@/actions/subscription";

interface WalletInfo {
  balance: number;
  currency: CurrencyType;
}

const WalletComponent = () => {
  const router = useRouter();
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isPending, setIsPending] = useState(true);
  const user = useCurrentUser();
  const fetchWallet = async () => {
    setIsPending(true);
    try {
      const walletInfo = await fetchWalletInfo();
      if (walletInfo && "error" in walletInfo) {
        toast.error(walletInfo.error);
        console.log(walletInfo.error);
      } else {
        setWallet(walletInfo);
      }
    } catch (ex) {
      console.log("Error fetching wallet info", ex);
    }
    setIsPending(false);
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const withdrawToStripe = async ()=> {
    setIsPending(true);
    try
    {
      const result = await withdrawToStripeAction();
      if(result.success && result)
      {
        toast.success(result.success);
        await fetchWallet();
      }
      else
      {
        console.log(result);
        if(result.error && (result.code == 400 || result.code == 404))
        {
          toast.success("Redirecting to Stripe");
          const result = await connectStripeAccount();
          if(result.accountId)
          {
            router.push(result.accountLinkUrl);
          }
          else
          {
            toast.error(result.error);
          }
        }
        else
        {
          toast.error(result.error);
        }
      }
      
    }
    catch(ex)
    {
      toast.error("Invalid error occurred");
      console.log(ex);
    }
    setIsPending(false);
  }

  const formatBalance = (balance: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(balance);
  };

  const handleCreateWallet = async () => {
    setIsPending(true);
    try {
      const wallet = await createWallet();
      if (wallet && "error" in wallet) {
        toast.error(wallet.error);
      } else {
        setWallet(wallet);
      }
      console.log(wallet);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
    setIsPending(false);
  };


  return (
    <div>
      {!wallet ? (
        <Button
          variant={"outline"}
          onClick={handleCreateWallet}
          disabled={isPending}
        >
          {isPending ? (
            <div className="mx-7">
              <ClipLoader color="black" size={20} />
            </div>
          ) : (
            "Create Wallet"
          )}
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              {isPending ? (
                <div className="mx-7">
                  <ClipLoader color="black" size={20} />
                </div>
              ) : (
                <>
                  <Wallet size={18} className="me-2" />
                  {formatBalance(wallet.balance, wallet.currency)}
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Wallet Info</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-8">
              <div className="text-center">
                <p>
                  Wallet Balance:{" "}
                  {formatBalance(wallet.balance, wallet.currency)}
                </p>
                <p>Currency: {wallet.currency}</p>
              </div>
            </div>
            <DialogFooter>
            
              <Button onClick={withdrawToStripe} disabled={isPending} className="w-full">
              {isPending ? (
            <div className="mx-7">
              <ClipLoader color="white" size={20} />
            </div>
          ) : (
            "Withdraw to stripe"
          )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WalletComponent;
