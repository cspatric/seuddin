import { forwardRef, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';

const BaseInput = forwardRef(
    (props, ref) => {
        if (Object(props).hasOwnProperty("mask")) {
            return (
                <InputMask
                    maskChar={null}
                    inputRef={ref}
                    {...props}
                />
            );
        }

        if (props.multiline) {
            return (
                <textarea
                    {...(props)}
                    ref={ref}
                />
            );
        }

        return (
            <input
                {...(props)}
                ref={ref}
            />
        );
    }
);

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <BaseInput
            {...props}
            type={type}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-purple-800 dark:focus:border-purple-800 focus:ring-purple-800 dark:focus:ring-purple-800 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
