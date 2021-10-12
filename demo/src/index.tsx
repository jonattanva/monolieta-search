import "./index.css";
import ReactDOM from "react-dom";
import dataset from "./dataset.json";
import Input from "./component/search";
import Picture from "./component/picture";
import { Search } from "monolieta-search";
import { useState } from "react";

interface Annotation {
    id: string;
    caption: string;
}

interface Resource {
    id: string;
    url: string;
    annotation: Annotation[];
}

const search = new Search();

const Main = () => {
    const [collection] = useState<Resource[]>(() => {
        console.time("annotation");
        const annotations = dataset.annotations.reduce(
            (previous: any, current: any) => {
                return {
                    ...previous,
                    [current.image_id]: [
                        ...(previous[current.image_id] || []),
                        {
                            id: `${current.id}`,
                            caption: current.caption,
                        },
                    ],
                };
            },
            {}
        );
        console.timeEnd("annotation");

        console.time("resources");
        const resources = dataset.images.map((image) => ({
            id: `${image.id}`,
            url: image.coco_url,
            annotation: annotations[image.id] || [],
        }));
        console.timeEnd("resources");

        console.time("index");
        const total = resources.length;
        for (let index = 0; index < total; index++) {
            const resource = resources[index];
            search.index(
                resource.id,
                resource.annotation.map(
                    (annotation: Annotation) => annotation.caption
                )
            );
        }
        console.timeEnd("index");
        return resources;
    });

    const onSearch = (criteria: string) => {
        console.time("search");
        console.log("search:", criteria, search.where(criteria));
        console.log(search);
        console.timeEnd("search");

        // "A person with an orange blanket covering them, sleeping on a wooden park bench." error
    };

    return (
        <div>
            <div>Monolieta search</div>
            <div>
                <Input onSearch={onSearch} />
                <div className="dataset">
                    {collection.map((item, index) => (
                        <Picture key={index} url={item.url} />
                    ))}
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
