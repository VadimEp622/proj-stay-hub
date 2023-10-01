import { useEffect } from 'react'

export default function useStayDetailsIntersectionObserver(isNotObserving) {

    useEffect(() => {
        if (!isNotObserving) {
            const photos = document.querySelector('.stay-photos-container')
            const altHeader = document.querySelector('.stay-details-nav-reserve-sticky-container')
            const orderSidebarBtn = document.querySelector('.order-sidebar .btn-main-container')
            const reserveLink = document.querySelector('.reserve-container')

            const photosObserver = new IntersectionObserver(onPhotosObserved, {
                rootMargin: "-5px 0px 0px",
            })
            const orderSidebarBtnObserver = new IntersectionObserver(onOrderSidebarBtnObserved, {
                rootMargin: "-80px 0px 0px 0px"
            })

            function onPhotosObserved(entries) {
                entries.forEach((entry) => {
                    altHeader.style.display = entry.isIntersecting ? 'none' : 'grid'
                })
            }

            function onOrderSidebarBtnObserved(entries) {
                entries.forEach((entry) => {
                    reserveLink.style.display = entry.isIntersecting ? 'none' : 'flex'
                })
            }

            photosObserver.observe(photos)
            orderSidebarBtnObserver.observe(orderSidebarBtn)

            return () => {
                altHeader.style.removeProperty("display")
                reserveLink.style.removeProperty("display")
                photosObserver.disconnect()
                orderSidebarBtnObserver.disconnect()
            }
        }
    }, [isNotObserving])
}