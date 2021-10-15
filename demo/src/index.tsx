import "./index.css";
import { useState } from "react";
import ReactDOM from "react-dom";
import dataset from "./dataset.json";
import Input from "./component/search";
import Picture from "./component/picture";
import { Search } from "monolieta-search";

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
        // Annotation: 90975.87280273438 ms
        // annotation: 99.641845703125 ms

        console.time("annotation");

        const annotations = new Map<string, Annotation[]>();
        const annotationsTotal = dataset.annotations.length;

        for (let index = 0; index < annotationsTotal; index++) {
            const { id, image_id, caption } = dataset.annotations[index];
            if (!annotations.has(`${image_id}`)) {
                annotations.set(`${image_id}`, []);
            }

            const current = annotations.get(`${image_id}`);
            if (current) {
                current.push({
                    id: `${id}`,
                    caption: caption,
                });
            }
        }

        console.timeEnd("annotation");

        // Resources: 41.408203125 ms
        // resources: 5.4189453125 ms

        console.time("resources");
        const resources = [];
        const imagesTotal = dataset.images.length;

        for (let index = 0; index < imagesTotal; index++) {
            const { id, coco_url } = dataset.images[index];
            resources.push({
                id: `${id}`,
                url: coco_url,
                annotation: annotations.get(`${id}`) || [],
            });
        }

        console.timeEnd("resources");

        // index: 6817.927001953125 ms
        // index: 6531.689208984375 ms
        // index: 455.589599609375 ms
        // index: 268.406982421875 ms
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
        <div className="main">
            <div className="title">Monolieta search</div>
            <div className="content">
                <Input onSearch={onSearch} />
                <div className="info">{`Viewing ${collection.length} resources`}</div>
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
