import React, { useEffect, useState } from 'react';
import '../../scss/home_page.scss';

function useAsyncState(initialValue) {
    const [value, setValue] = useState(initialValue);
    const setter = x =>
        new Promise(resolve => {
            setValue(x);
            resolve(x);
        });
    return [value, setter];
}

const HomePage = () => {
    const [name, setName] = useState('');
    const [memesImg, setMemesImg] = useState('');
    const [memesData, setMemesData] = useState();
    const [count, setCount] = useAsyncState(0);
    const [nextBtnDisabled, setNextDisable] = useState(false);
    const [prevBtnDisabled, setPrevDisable] = useState(false);
    let countValue = 0;

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('https://api.imgflip.com/get_memes')
            .then(async response => {
                const data = await response.json();
                if (response.ok) {
                    setMemesData(data);
                    setName(data.data.memes[countValue].name);
                    setMemesImg(data.data.memes[countValue].url);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    async function nextMemesData() {
        if (count < 99) {
            const newCount = await setCount(count + 1);
            setPrevDisable(false);
            setName(memesData.data.memes[newCount].name);
            setMemesImg(memesData.data.memes[newCount].url);
        }
        else if (count === 99) {
            const newCount = await setCount(0);
            setName(memesData.data.memes[newCount].name);
            setMemesImg(memesData.data.memes[newCount].url);
        }
        else {
            setNextDisable(true);
        }
    }

    async function prevMemesData() {
        if (count > 0) {
            const newCount = await setCount(count - 1);
            setName(memesData.data.memes[newCount].name);
            setMemesImg(memesData.data.memes[newCount].url);
        }
        else if (count === 0) {
            const newCount = await setCount(99);
            setName(memesData.data.memes[newCount].name);
            setMemesImg(memesData.data.memes[newCount].url);
        }
        else {
            setPrevDisable(true);
        }
    }

    return (
        <div className='pageBody'>
            <div className='container'>
                <p className='title'>Random Memes Generator</p>
                <div className='cardContainer'>
                    <div className='memesImg'>
                        <img src={memesImg} width='100%' height='300px' alt='meme' />
                    </div>
                    <div className='cardBody'>
                        <div className='memesName'>
                            {name}
                        </div>
                        <div className='btnContainer'>
                            <div className='nextBtn'>
                                <button type="button" class="btn btn-info btn btn-primary btn-lg" onClick={() => nextMemesData()} disabled={nextBtnDisabled}>Next Meme</button>
                            </div>
                            <div className='prevBtn'>
                                <button type="button" class="btn btn-info btn btn-primary btn-lg" onClick={prevMemesData} disabled={prevBtnDisabled}>Previous Meme</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;