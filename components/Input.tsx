type Props = {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function Input({ label, value, placeholder, onChange }: Props) {

  return (

    <div>

      <label className="label-base">
        {label}
      </label>

      <input
        className="input-base"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>

  )

}