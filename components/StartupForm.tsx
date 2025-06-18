"use client";
import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import MDeditor from '@uiw/react-md-editor'
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {z} from 'zod'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            pitch,
        }

        await formSchema.parseAsync(formValues)

        const result = await createPitch(prevState, formData, pitch)
        if(result.status === 'SUCCESS'){
               toast.success('Your Startup Pitch Has Been Created Successfully!', {
                duration: 4000,
                position: 'top-center',
                style: {
                  backgroundColor:'black',
                  color: 'white'
                },

            })
            router.push(`/startup/${result._id}`)
        }
        return result
        
    } catch (error) {
        if(error instanceof z.ZodError){
            const fieldErrors  = error.flatten().fieldErrors
            setErrors(fieldErrors as unknown as Record<string, string>)

            console.log(error)
            toast.error('this is an error!', {
                duration: 3000,
                position: 'top-center',
                style: {
                  backgroundColor:'black',
                  color: 'white'
                },
            })
          
            return {...prevState,  error: 'VALIDATION FAILED', status : 'ERROR'}    
        };
      } 

      return  {
          ...prevState,
          error: 'An unexpected error has occured',
          status: 'ERROR'
      }
  }

  const  [state, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status: 'INITIAL'})

  return (
    <>
      <form action={formAction} className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6">
        <div>
          <label
            htmlFor="title"
            className="font-bold text-[18px] text-black uppercase"
          >
            title
          </label>
          <Input
            id="title"
            name="title"
            className=" border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
            required
            placeholder="Startup title"
          />
          {errors.title && (
            <p className="text-red-500 mt-2 ml-5">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="font-bold text-[18px] text-black uppercase"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300"
            required
            placeholder="Startup Description"
          />
          {errors.description && (
            <p className="text-red-500 mt-2 ml-5">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="font-bold text-[18px] text-black uppercase"
          >
            Category
          </label>
          <Input
            id="category"
            name="category"
            className=" border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
            required
            placeholder="Startup Category (Tech, Health, Education ...)"
          />
          {errors.Category && (
            <p className="text-red-500 mt-2 ml-5">{errors.Category}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="link"
            className="font-bold text-[18px] text-black uppercase"
          >
            Image Link
          </label>
          <Input
            id="link"
            name="link"
            className=" border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
            required
            placeholder="URL Starting With https://Image Is Valid"
          />
          {errors.link && (
            <p className="text-red-500 mt-2 ml-5">{errors.link}</p>
          )}
        </div>

         <div data-color-mode = 'light'>
          <label
            htmlFor="pitch"
            className="font-bold text-[18px] text-black uppercase"
          >
            Pitch
          </label>
                <MDeditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{borderRadius: 20, overflow: "hidden"}}
                    textareaProps={{
                        placeholder: "Briefly Describe Your Idea"
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                    />
          {errors.pitch && (
            <p className="text-red-500 mt-2 ml-5">{errors.pitch}</p>
          )}
        
        
        </div>

        <Button type="submit" className=" bg-[#EE2B69] border-[4px] hover:bg-[#ee2b86] border-black text-white cursor-pointer rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]" disabled={isPending}>
          {isPending ? 'Submitting ... ' : 'Submit Your Pitch'}
          <Send className="size-6 ml-1"/>
        </Button>

      </form>
    </>
  );
};

export default StartupForm;
