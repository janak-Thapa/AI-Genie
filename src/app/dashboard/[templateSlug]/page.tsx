"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contentTemplates } from '@/lib/contentTemplate';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import Editor from './_components/Editor';
import { chatSession } from '@/lib/geminiAI';
import axios from 'axios';

interface TemplateSlugProps {
  templateSlug: string;
}

const TemplateSlug = ({ params }: { params: TemplateSlugProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput,setAIOutput] = useState<string>("")
  const selectedTemplate = contentTemplates.find((item) => item.slug === params.templateSlug);

  const generateAIContent = async (formData:FormData) =>{
    setIsLoading(true)
    try {
      let dataSet = {title:formData.get("title"),description:formData.get("description")}
       
      const selectedPrompt = selectedTemplate?.aiPrompt;

      const finalAIPrompt = JSON.stringify(dataSet) + " ," + selectedPrompt

      const result = await chatSession.sendMessage(finalAIPrompt)

      setAIOutput(result.response.text())
      const response = await axios.post("/api/",{
        title:dataSet.title,
        description:result.response.text(),
        templateUsed:selectedTemplate?.name
      })
      setIsLoading(false)




    } catch (error) {
      console.log(error)
      
    }
  }

  const onSubmit = async (formData :FormData) =>{
    generateAIContent(formData)
  }

  return (
    <div className='mx-5 py-2'>
      <div className='mt-5 py-6 px-4 bg-white'>
        <h2 className='font-medium'>{selectedTemplate?.name}</h2>
      </div>
      <form action={onSubmit}>
        <div className='flex flex-col gap-4 p-5 mt-5 bg-white'>
          {selectedTemplate?.form?.map((form) => (
            <div key={form.label}>
              <label>{form.label}</label>
              {form.field === 'input' ? (
                <div className='mt-5'>
                  <Input />
                </div>
              ) : (
                <div className='mt-5'>
                  <Textarea name='description' />
                </div>
              )}
            </div>
          ))}
        </div>
        <Button className='mt-5' type='submit'>
          {isLoading? <Loader className='animate-spin'/> : "Generate Content"}

        </Button>
      </form>
      <div className='my-10'>
        <Editor value={isLoading? "Genarating..." : aiOutput}/>
      </div>
    </div>
  );
}

export default TemplateSlug;
