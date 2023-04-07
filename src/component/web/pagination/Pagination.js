import React, { useEffect, useState } from "react"
import '../pagination/Pagination.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Pagination = ({page=10,setCurrentButton}) => {

    // const page = 10;
    const numOfPages = []
    for (let i = 1; i <= page; i++) {
        numOfPages.push(i)
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [arrOfCurrButtons,setArrOfCurrButtons] = useState([]);

    useEffect(()=> {
        let tempNumOfPages = [...numOfPages]
        if(numOfPages.length<10) {
            tempNumOfPages = [...numOfPages]
        }
         else if(currentPage>=1 && currentPage<=3) {
            tempNumOfPages = [1,2,3,4,'...',numOfPages.length]
        }else if(currentPage==4) {
            const slice = numOfPages.slice(0,5)
            tempNumOfPages = [...slice,'...',numOfPages.length]
        }
        else if(currentPage>4 && currentPage< numOfPages.length-2) {
            const slice1 = numOfPages.slice(currentPage-2,currentPage)
            const slice2 = numOfPages.slice (currentPage,currentPage+1)
            tempNumOfPages = [1,'...',...slice1,...slice2,'...',numOfPages.length]
        }

        else if (currentPage>numOfPages.length-3) {
            const slice = numOfPages.slice(numOfPages.length-4)
            tempNumOfPages = [1,'...',...slice]
        }
        setArrOfCurrButtons(tempNumOfPages);
        setCurrentButton(currentPage)
    },[currentPage])

    console.log(currentPage)

    return (<div>
        <div className="pagination-container">
            <a style={page<10 && {display:'none'}} className={currentPage == 1 ? 'disabled' : ''} onClick={() => setCurrentPage(currentPage - 1)}><NavigateBeforeIcon/></a>
            {arrOfCurrButtons.map((num,index) => (
                <a key={index} className={num == '...' ?'disabledDot':(currentPage==num ? 'active' : '')} onClick={()=>setCurrentPage(num)}>{num}</a>
            ))}
            <a style={page<10 && {display:'none'}} className={currentPage == page ? 'disabled' : ''} onClick={() => setCurrentPage(currentPage + 1)}><NavigateNextIcon/></a>

        </div>
    </div>)

    //     const [currentPage, setCurrentPage] = useState(1);
    //     const recordsPerPage = 5;
    //     const lastIndex = currentPage * recordsPerPage;
    //     const firstIndex = lastIndex - recordsPerPage;
    //     // const records = Data.slice(firstIndex, lastIndex);
    //     console.log('data=>>>>>>>>>', records);
    //     // const numOfPage = Math.ceil(Data.length / recordsPerPage);
    //     // const numbers = [...Array(numOfPage + 1).keys()].slice(1);
    //     const numbers = Array.from({length:numOfPage},(value,index)=> 1+ index);
    //     console.log(numbers);





}





export default Pagination