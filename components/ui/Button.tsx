type Props = {
  children: React.ReactNode
  onClick?: () => void
  loading?: boolean
}

export default function Button({ children, onClick, loading }: Props) {

  return (

    <button
      onClick={onClick}
      className="btn-primary"
    >
      {loading ? "Buscando..." : children}
    </button>

  )

}