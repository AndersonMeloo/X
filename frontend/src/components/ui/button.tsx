type Props = {
    label: string,
    onClick?: () => void,
    size: 1 | 2 | 3,
    type?: "button" | "submit" | "reset",
    disable?: boolean
}

export const Button = ({ label, onClick, size, type = "button", disable }: Props) => {

    return (

        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disable}
                className={`flex justify-center items-center cursor-pointer bg-white text-black font-bold rounded-3xl p-4
                ${size === 1 && 'h-14 text-lg'}
                ${size === 2 && 'h-10 text-md'}
                ${size === 3 && 'h-7 text-xs'}`}>
                {label}
            </button>
        </>
    )
}