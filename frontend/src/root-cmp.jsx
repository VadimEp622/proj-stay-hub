// Node Modules
import { useLocation } from "react-router-dom"

// Routes
import MyCustomRouter from "./routes.js"

// Store
import { systemSetIsExpandedHeader, systemSetIsUnclickableBg } from "./store/systemSlice"
import { useAppDispatch, useAppSelector } from "./store/hooks"

// Services

// Custom Hooks
import useIsMobile from "./customHooks/useIsMobile.js"

// Components
import { AppHeader } from "./cmps/app-header.jsx"
import { AppFooter } from "./cmps/app-footer.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { AppMainModal } from "./cmps/app-main-modal.jsx"


// TODO-priority-urgent: discovered an error when surfing site, and switching between mobile-desktop screens:
// TypeError: n.guests is undefined
// ae filter-expanded.jsx:114
// React 12
// e useIsMobile.js:12
// ^
// FIX this ASAP 
// !!!! can't seem to reproduce this... !!!!


// TODO: make backend DB testing, to check that ALL the current items in the DB have the correct keys, and value types

// TODO-priority-urgent: make an error page, for faulty search params in stay-index. when done, test everything works, and deploy to cloud

// TODO-priority-high: make all pages start from top! (some pages start scrolling from middle on route change)

// TODO: Create StayHub your home (like Airbnb your home), where you can List/Create/Edit/Delete YOUR stays

// TODO: when filtering by label, make it possible to remove/reset the label filtering

// TODO: research where the following custom-hooks can be used:
//          1. useEffectUpdate.js
//          2. useForm.js

// TODO: attempt to abstract some custom-hooks, with the final goal to immediately understand what each hook does,
//    and to prevent too many hooks for one page cmp.

// TODO: add more variety to userMsg, and make styling better!

// TODO: have more different (Quick) registration options
// I. Regular User ✔
// II. Host ❌
// III. Site Admin ❌

// **** Abstract ****
// TODO-priority-high: organize cmps
// TODO-priority-high: attempt to extract the state from the store, to the URL search params

// TODO-medium: handle server interactions with minimum data transfer | sockets
// TODO-medium: in 'stay-details.jsx', In navbar, clicking on: 'photos/amenities/reviews/location'
//       makes it so ,in reviews, profile pictures keep changing.

// Extra: on mobile, horizontal scroll of shame in stay-details

export function RootCmp() {
  const isUnclickableBg = useAppSelector(storeState => storeState.systemModule.isUnclickableBg)
  const appModal = useAppSelector(storeState => storeState.systemModule.appModal)
  const location = useLocation()
  const isStayDetailsPage = location.pathname.startsWith("/stay/")
  const isMobile = useIsMobile()
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //     socketService.setup()
  //     return () => {
  //         socketService.terminate()
  //     }
  // }, [])

  function closeBackground(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    dispatch(systemSetIsExpandedHeader(false))
    dispatch(systemSetIsUnclickableBg(false))
  }

  return (
    <>
      {isUnclickableBg && (<div className="gray-viewport" onClick={(ev) => closeBackground(ev)}></div>)}

      {appModal && <AppMainModal modalType={appModal} />}

      <section className={`app ${!isStayDetailsPage ? "main-layout" : "details-layout"}`}>
        <AppHeader isStayDetailsPage={isStayDetailsPage} isMobile={isMobile} />
        <main className={`app-main${isStayDetailsPage ? " full details-layout" : ""}`}>
          <MyCustomRouter />
        </main>
        {!isMobile && <AppFooter isStayDetailsPage={isStayDetailsPage} />}
        <UserMsg />
      </section>
    </>
  )
}
