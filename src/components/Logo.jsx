export default function Logo({ className = '' }) {
  return (
    <img
      src="/images/logo-brainfrags.png"
      alt="BrainFrags"
      className={`h-7 w-auto md:h-8 ${className}`}
    />
  )
}
