import { stayService } from "../services/stay.service";

export function MyListings() {
    const loggedInUser = userService.getLoggedinUser();
    const [listings, setListings] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const listings = await stayService.query();
                const filteredListings = listings.filter(
                    (listing) => listing.host._id === loggedInUser._id
                )
                setListings(filteredListings)
            } catch (error) {
                showErrorMsg('Error fetching orders');
            }
        }

        fetchOrders();
    }, [])

    if (!loggedInUser) {
        showErrorMsg('You must be logged in to view your trips');
        return navigate('/');
    }

    return (
        <div className="listings">
            <h3>{listings.length} listings</h3>

        </div>
    )

}