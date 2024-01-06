import React, {FC, HTMLAttributes, useRef} from 'react'
import classNames from 'classnames'
import CheckIcon from '@/Assets/icons/check.svg?react';
import ExclamationIcon from '@/Assets/icons/exclamation.svg?react';
import ProgressActivityIcon from '@/Assets/icons/expand-more.svg?react';

const Button = ({
  className,
  children,
  variant = 'primary',
  size = 'medium',
  error,
  disabled,
  loading,
  success,
  ...props
}) => {
  const defaultClassNames = [
    'uppercase tracking-widest inline-flex justify-center items-center font-light rounded-md transition-all duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150',
  ]
  const variantClassNamesMapping = {
    primary:
      'bg-purple-900 text-white border-ultramarine-600 shadow-sm hover:bg-purple-700 hover:text-ultramarine focus:ring-purple-800',
    secondary:
      'bg-white dark:bg-gray-800 !border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-purple-800 dark:focus:ring-offset-gray-800',
    ghost: 'bg-transparent text-purple-900 hover:text-purple-700',
  }
  const sizeClassNamesMapping = {
    smallest: 'px-1.5 py-0.5 text-[10px]',
    small: 'px-3 py-1 text-xs min-h-[34px]',
    medium: 'px-6 py-2 text-sm',
    large: 'px-10 py-2 text-base',
  }
  const modifierClassNames = [
    {'bg-red-500 border-red-500 hover:text-white': error},
    {'bg-zinc-100 !border-zinc-300 pointer-events-none text-zinc-500': disabled},
  ]

  return (
    <button
      disabled={loading || error}
      className={classNames(
        defaultClassNames,
        sizeClassNamesMapping[size],
        variantClassNamesMapping[variant],
        modifierClassNames,
        className
      )}
      {...props}
    >
      {error ? (
        <ExclamationIcon className="w-6 h-6" />
      ) : loading ? (
        <>
          <ProgressActivityIcon className="w-5 h-5 text-zinc-500 animate-spin mr-2" />
          {children}
        </>
      ) : success ? (
        <CheckIcon className="w-6 h-6" />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
