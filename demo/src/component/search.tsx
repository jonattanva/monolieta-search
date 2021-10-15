import "./search.css";
import { useState, useEffect } from "react";

interface PropTypes {
    onSearch?: (criteria: string) => void;
}

export default ({ onSearch }: PropTypes) => {
    const [criteria, setCriteria] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            if (onSearch) {
                onSearch(criteria);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [criteria, onSearch]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCriteria(event.target.value);
    };

    return (
        <div className="search-container">
            <input className="search" type="search" onChange={onChange} />
        </div>
    );
};
