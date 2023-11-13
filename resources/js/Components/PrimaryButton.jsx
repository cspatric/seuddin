import classNames from "classnames";

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={classNames(
                'inline-flex items-center px-4 py-2 bg-purple-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150',
                {'opacity-25': disabled},
                className
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

