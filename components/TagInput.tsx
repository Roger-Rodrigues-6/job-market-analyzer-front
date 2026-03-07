"use client"

import { useState } from "react"

type Props = {
  label: string
  tags: string[]
  setTags: (tags: string[]) => void
  placeholder?: string
  variant?: "include" | "exclude"
}

export default function TagInput({
  label,
  tags,
  setTags,
  placeholder,
  variant = "include"
}: Props) {

  const [input,setInput] = useState("")

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if(e.key === "Enter"){

      e.preventDefault()

      const value = input.trim()

      if(value && !tags.includes(value)){
        setTags([...tags,value])
        setInput("")
      }

    }

  }

  const removeTag = (tag:string) => {

    setTags(tags.filter(t => t !== tag))

  }

  const tagClass = variant === "exclude"
    ? "tag-exclude"
    : "tag-include"

  return (

    <div>

      <label className="label-base">
        {label}
      </label>

      <input
        className="input-base"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder={placeholder}
      />

      <div className="tag-container">

        {tags.map(tag => (

          <span
            key={tag}
            className={tagClass}
            onClick={()=>removeTag(tag)}
          >
            {tag}
          </span>

        ))}

      </div>

    </div>

  )

}