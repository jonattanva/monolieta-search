import "./picture.css";

interface PropTypes {
    url: string;
}

export default (props: PropTypes) => (
    <div className="picture">
        <img loading="lazy" src={props.url} alt="" />
    </div>
);
