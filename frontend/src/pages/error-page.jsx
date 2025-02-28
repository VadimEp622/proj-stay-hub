import { Link } from "react-router-dom";



export function ErrorPage() {


    return (
        <section>
            <h1 className='ff-circular-semibold fs28 lh28'>Error - Page not found</h1>
            <Link to={`/`}>
                <button className='explore fs16 lh20'>Return home</button>
            </Link>
        </section>
    )
}