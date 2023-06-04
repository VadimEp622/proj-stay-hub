import React, { useEffect, useRef, useState } from "react";
import { CarouselImage2 } from "./carousel2";
import CarouselImage3 from "./carousel3";

export function UpperFilter() {
    const [jpegFiles, setJpegFiles] = useState([]);

    useEffect(() => {
        const fileNames = [
            "Beachfront",
            "Countryside",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Beachfront",
            "Countryside",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Countryside",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Lakefront",
            "Beachfront",
            "Countryside",
            "Lakefront",
            "Lakefront",
            "Lakefront",
        ]

        Promise.all(
            fileNames.map((fileName) =>
                import(`../assets/img/airbnb-assets/${fileName}.jpeg`)
                    .then((module) => ({ fileName, module }))
                    .catch((error) => {
                        console.error(`Error loading ${fileName}:`, error);
                        return null;
                    })
            )
        )
            .then((files) => {
                setJpegFiles(files.filter((file) => file !== null));
            })
            .catch((err) => {
                console.error("Error loading JPEG files:", err);
            });
    }, []);

    if (jpegFiles.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <section className="label-filter">
            {jpegFiles.map(({ fileName, module }) => (
                <div className="upper-filter-icon">
                    <img
                        key={fileName}
                        src={module.default}
                        alt={fileName}
                        style={{ width: "24px", height: "24px" }}
                    />
                    {fileName}
                </div>
            ))}
            <CarouselImage3 imgs={jpegFiles} />
        </section>
    );
}
