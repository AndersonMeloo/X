type Props = {
    placehoder: string,
    rows: number,
    value?: string
}

export const TextArea = ({ placehoder, rows, value }: Props) => {

    return (

        <div className="has-[:focus]:border-white flex items-center rounded-3xl border-2 border-gray-700">
            <textarea
                className="flex-1 outline-none bg-transparent h-full p-5 resize-none"
                placeholder={placehoder}
                value={value}
                rows={rows}
            >
            </textarea>
        </div>
    )
}