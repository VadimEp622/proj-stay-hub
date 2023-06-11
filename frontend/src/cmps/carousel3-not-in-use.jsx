// import React, { useContext, useState } from 'react';
// import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// import 'react-horizontal-scrolling-menu/dist/styles.css';

// const getItems = () =>
//     Array(20)
//         .fill(0)
//         .map((_, ind) => ({ id: `element-${ind}` }));

// function CarouselImage3({ imgs }) {
//     const [items, setItems] = useState(getItems);
//     const [selected, setSelected] = useState([]);
//     const [position, setPosition] = useState(0);

//     const isItemSelected = (id) => !!selected.find((el) => el === id);

//     const handleClick = (id) => ({ getItemById, scrollToItem }) => {
//         const itemSelected = isItemSelected(id);

//         setSelected((currentSelected) =>
//             itemSelected
//                 ? currentSelected.filter((el) => el !== id)
//                 : currentSelected.concat(id)
//         );
//     };

//     return (
//         <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
//             {items.map(({ id }) => (
//                 <Card
//                     itemId={id} // NOTE: itemId is required for track items
//                     title={id}
//                     key={id}
//                     onClick={handleClick(id)}
//                     selected={isItemSelected(id)}
//                 />
//             ))}
//         </ScrollMenu>
//     );
// }

// function LeftArrow() {
//     const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

//     return (
//         <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
//             Left
//         </Arrow>
//     );
// }

// function RightArrow() {
//     const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

//     return (
//         <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
//             Right
//         </Arrow>
//     );
// }

// function Card({ onClick, selected, title, itemId }) {
//     const visibility = useContext(VisibilityContext);

//     return (
//         <div
//             onClick={() => onClick(visibility)}
//             style={{
//                 width: '160px',
//             }}
//             tabIndex={0}
//         >
//             <div className="card">
//                 <div>{title}</div>
//                 <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
//                 <div>selected: {JSON.stringify(!!selected)}</div>
//             </div>
//             <div
//                 style={{
//                     height: '200px',
//                 }}
//             />
//         </div>
//     );
// }

// export default CarouselImage3;

// function Arrow({ children, disabled, onClick }) {
//     return (
//         <button
//             disabled={disabled}
//             onClick={onClick}
//             style={{
//                 opacity: disabled ? "0" : "1",
//             }}
//         >
//             {children}
//         </button>
//     );
// }