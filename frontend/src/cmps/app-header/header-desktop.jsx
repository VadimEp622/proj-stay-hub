// Components
import { Logo } from './header-desktop/logo.jsx'
import { SearchbarToggler } from './header-desktop/searchbar-toggler.jsx'
import { MainNavMenu } from './header-desktop/main-nav-menu.jsx'
import { FilterExpanded } from './header-desktop/filter-expanded.jsx'

export function HeaderDesktop({
    isFilterExpanded,
    selectedExperienceTab,
    setSelectedExperienceTab,
    filterBy,
    setFilterBy,
    handleChange,
    handleGuestCountChange,
    onSubmit,
    onSetFilterDates,
    selectedFilterBox,
    onSetSelectedFilterBox,
    setSelectedFilterBox,
}) {

    return (
        <>
            <nav className="app-header">
                <Logo />
                <SearchbarToggler
                    isFilterExpanded={isFilterExpanded}
                    selectedExperienceTab={selectedExperienceTab}
                    setSelectedExperienceTab={setSelectedExperienceTab}
                />
                <MainNavMenu />
            </nav>

            <FilterExpanded
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                handleChange={handleChange}
                handleGuestCountChange={handleGuestCountChange}
                onSubmit={onSubmit}
                onSetFilterDates={onSetFilterDates}
                isFilterExpanded={isFilterExpanded}
                selectedExperienceTab={selectedExperienceTab}
                selectedFilterBox={selectedFilterBox}
                onSetSelectedFilterBox={onSetSelectedFilterBox}
                setSelectedFilterBox={setSelectedFilterBox}
            />
        </>
    )
}