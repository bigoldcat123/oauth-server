'use client'
import { cn } from "@/lib/utils";
import React from "react";

export default function Upload({
    children,
    onChoseFile,
    multiple = false,
    accept = 'image/*',
    className = ''
}:{
    children?:React.ReactNode,
    onChoseFile:(file: File[]) => void ,
    multiple?:boolean,
    accept?:string,
    className?:string
}) {
    const handleClick = () => {
        const ipt = document.createElement('input')
        ipt.type = 'file'
        ipt.multiple = multiple
        ipt.accept = accept
        ipt.onchange = (e) => {
            const files = ipt.files
            if(files){
                onChoseFile(Array.from(files))
            }
        }
        ipt.click()
    }
  return (
    <>
      <div onClick={handleClick} className={cn(" overflow-hidden cursor-pointer size-10 rounded-full border-dashed border-2",className)}>
        {children}
      </div>
    </>
  );
}