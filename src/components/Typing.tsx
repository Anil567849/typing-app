import { useEffect, useRef, useState } from 'react'

const data = [
        "Happiness is an emotional state of well-being that can be experienced in a narrow or broad sense. In a narrow sense, it can be a feeling of joy, satisfaction, or contentment that occurs in a specific moment when good things happen. In a broader sense, it can be a positive evaluation of one's life and accomplishments overall, also known as subjective well-being.",
        "A happy life is a state of mind that includes feelings of joy, contentment, and other positive emotions, as well as a sense that your life is meaningful and valued. It can also be described as a life that is full of hope. According to Psychology Today, the happiest people have the highest hope and the least hunger.",
        "Mindfulness is a type of meditation that involves being aware of what you're sensing and feeling in the moment, without judgment or interpretation. It originated in Eastern meditation practices and is described as a state of active, open attention to the present.",
        "Kindness is a type of behavior marked by acts of generosity, consideration, rendering assistance, or concern for others, without expecting praise or reward in return. It is a subject of interest in philosophy, religion, and psychology.",
]

const para = data[ Math.floor(Math.random() * data.length)];
const arr = para.split(' ');

function Typing() {

    const [letter, setLetter] = useState("")
    const [typed, setTyped] = useState<string | null>(null)
    const [sTime, setSTime] = useState<number>(-1)
    const [currentLetter, setCurrentLetter] = useState<number>(0)
    const [currentWord, setCurrentWord] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [res, setRes] = useState<number[]>([]);

    useEffect(() => {
        if(inputRef && inputRef.current) {
            inputRef.current.focus();
        }
        function handleClick() {
            if(inputRef && inputRef.current) {
                inputRef.current.focus();
            }
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
          };
    }, [])

    useEffect(() => {
        if(!typed) return;
        
        if(sTime == -1){
            const date = new Date().getTime();            
            setSTime(date);
        }

        const wLen = arr[currentWord].length;
        if(wLen == currentLetter+1 && currentWord+1 == arr.length){
            const date: any = new Date().getTime();
            const milliseconds = (date - sTime);
            const minutes = milliseconds / 60000;
            const WPM = Math.floor(arr.length / minutes);
            alert(`${WPM} WPM, Amazing`);
            window.location.reload();
            return;
        }
        
        if(wLen == currentLetter){
            if(typed != ' ') return;
            setCurrentLetter(0);
            setCurrentWord(currentWord+1);
            return;
        }
        
        if(typed === arr[currentWord][currentLetter]){
            // alert('correct')
            setRes((prev) => {
                return [...prev, 1];
            });
        }else{
            // alert("incorrect")   
            setRes((prev) => {
                return [...prev, 0];
            });
        }

        setCurrentLetter(currentLetter+1);
        
        
    }, [typed, letter])

    function handleInput(e: any){
        const lastChar = e.key;
        const a = lastChar.charCodeAt(0) >= 32 && lastChar.charCodeAt(0) <= 126;
        if(a && lastChar.length == 1){
            setLetter(lastChar);
            setTyped(lastChar)
            setLetter(e.target.value)
        }
        if(lastChar === "Backspace"){
            if(currentLetter != 0) {
                setCurrentLetter(currentLetter-1);
                setTyped(null);
                setRes((prev) => {
                    prev.pop();
                    return [...prev];
                });
            }
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center'>
            <div className='flex flex-col pt-36 items-center w-[90vw]'>
                <div className='pb-10'>
                    <h1 className="text-white font-bold text-3xl">Type Like a Master</h1>
                </div>
                <div>
                    <div className="text-[#5E6063] text-2xl font-bold font-mono">
                        {
                            arr.map((word, ind) => {
                                return <div key={ind} className="inline">
                                <Character word={word} wordNumber={ind} res={res}/>
                                </div>
                            })
                        }
                    </div>
                    <input className="absolute -left-[500rem]" ref={inputRef} type='text' onKeyDown={handleInput}/>
                </div>
            </div>
        </div>
    )
}

function Character({word, wordNumber, res}: {word: string, wordNumber: number, res: number[]}){
    const letters = word.split('');

    let num = 0;
    for(let i = 0; i < wordNumber; i++){
        num += arr[i].length;
    }

    return <>
        {
            letters.map((w, ind) => {
                return <p key={ind} className={`inline ${
                    res.length == 0 || res.length <= num+ind ? '' :
                    res[num+ind] == 1 ? 'text-white' : 'text-red-500'}`}>{w}</p>
            })
        }
        <span> </span>
    </>
}

export default Typing