// import logo from './assets/img/logo-airbnb.svg'

import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { StayIndex } from './pages/stay-index.jsx'
import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'


// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Airbnb DEMO',
        isLogo: true,
    },
    // {
    //     path: 'stay',
    //     component: <StayIndex />,
    //     label: 'Stays'
    // },
    // {
    //     path: 'review',
    //     component: <ReviewIndex />,
    //     label: 'Reviews'
    // },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes