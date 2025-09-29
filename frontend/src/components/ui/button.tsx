type Props = {
    label: string,
    onClick?: () => void,
    size: 1 | 2 | 3,
    type?: "button" | "submit" | "reset"
}

export const Button = ({ label, onClick, size, type = "button" }: Props) => {

    return (

        <>
            <button
                type={type}
                onClick={onClick}
                className={`flex justify-center items-center cursor-pointer bg-white text-black font-bold rounded-3xl
                ${size === 1 && 'h-14 text-lg'}
                ${size === 2 && 'h-10 text-md'}
                ${size === 3 && 'h-7 text-xs'}`}>
                {label}
            </button>
        </>
    )
}