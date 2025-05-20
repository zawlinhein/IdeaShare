"use client";
import React, { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import StartupInputBox from "./StartupInputBox";
import { CheckCircle, Send, XCircle } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { createStartup } from "@/lib/action";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<Record<string, string>>({});

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: formData.get("pitch") as string,
      };

      await formSchema.parseAsync(formValues);
      const result = await createStartup(state, formData);
      if (result.status === "SUCCESS") {
        setError({});
        toast.success("Submission Successful", {
          description: "Your startup has been created.",
          duration: 3000,
          icon: <CheckCircle className="text-black" />,
          closeButton: true,
        });
        router.push(`/startup/${result._id}`);
      } else {
        toast.error("Error", {
          description: "Submition failed",
          duration: 3000,
          icon: <XCircle className="text-red-700" />,
          closeButton: true,
          style: { color: "white", backgroundColor: "hsl(4, 87%, 61%)" },
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setError(fieldErrors as unknown as Record<string, string>);
        toast.error("Error", {
          description: "Validation failed",
          duration: 3000,
          icon: <XCircle className="text-red-700" />,
          closeButton: true,
          style: { color: "white", backgroundColor: "hsl(4, 87%, 61%)" },
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast.error("Error", {
        description: "An unexpected error has occured",
        duration: 3000,
        icon: <XCircle className="text-red-700" />,
        style: { color: "white", backgroundColor: "hsl(4, 87%, 61%)" },
        closeButton: true,
      });
      return {
        ...prevState,
        error: "An unexpected error has occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form className="startup-form" action={formAction}>
      <StartupInputBox
        id="title"
        name="title"
        placeholder="Startup Title"
        error={error.title}
      />
      <StartupInputBox
        id="description"
        name="description"
        placeholder="Startup Description"
        error={error.description}
      />
      <StartupInputBox
        id="category"
        name="category"
        placeholder="Startup Category(Technolgy,Health,Education...)"
        error={error.category}
      />
      <StartupInputBox
        id="link"
        name="link"
        placeholder="Startup Image URL"
        error={error.link}
      />
      <StartupInputBox
        id="pitch"
        name="pitch"
        placeholder="Briefly describe your idea...."
        error={error.pitch}
      />
      <Button
        className="startup-form_btn text-white"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Submitting...." : "Submit your starup"}
        <Send size={8} />
      </Button>
    </form>
  );
};

export default StartupForm;
