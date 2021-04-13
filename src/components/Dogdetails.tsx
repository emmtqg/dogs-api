import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Masonry from 'react-masonry-css';
import generateRandomString from '../utils/generateRandomString';

type DogdetailsProps = {
    breed: string;
}

const Dogdetails = (props: DogdetailsProps) => {
    const { breed } = props;
    const [images, setImages] = useState<Array<string>>([]);
    const [load, setLoad] = useState(false);
    console.log(`breed = ${breed}`);

    useEffect(() => {
        axios.get(`https://dog.ceo/api/breed/${breed}/images`)
            .then(res => {
                let dogs: string [] = [];
                res.data.message.forEach((imgSrc: string) => {
                   dogs.push(imgSrc); 
                });
                setImages(dogs);
            })
            .catch((err) => {
                setLoad(true);
            });
    });

return(
    <div>
        {/* {load && <div>loading.....</div>} */}
        <Masonry
            breakpointCols={4}
            className="dog-masonry-grid"
            columnClassName="dog-masonry-grid_column">
                {images.map(imgSrc => <img src={imgSrc} alt={imgSrc} key={generateRandomString()} />)}
        </Masonry>
    </div>
)}

export default Dogdetails;
