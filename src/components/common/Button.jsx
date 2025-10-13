const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '',
  disabled = false 
}) => {
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    light: 'btn-light'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

export default Button