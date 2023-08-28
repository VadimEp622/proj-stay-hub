import { ThreeDots } from 'react-loader-spinner'

export function Loader() {
    return (
        <ThreeDots
            height="40"
            width="40"
            radius="6"
            color="rgb(113, 113, 113)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="flex justify-center"
            visible={true}
        />
    )
}

