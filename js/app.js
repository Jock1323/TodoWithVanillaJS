'use strict'
const elForm=document.querySelector('.form');
const elInput=document.querySelector('.input');
const elList=document.querySelector('.list');
const elAllBtn=document.querySelector('.btn__all');
const elCompletedBtn=document.querySelector('.btn__completed')
const elUncompletedBtn=document.querySelector('.btn__uncompleted')
const elAllBtnNumber=document.querySelector('.btn__all-number');
const elCompletedBtnNumber=document.querySelector('.btn__completed-number');
const elUncompletedBtnNumber=document.querySelector('.btn__uncompleted-number');

let todoArr=[];
let completed=[];
let counter=0;
elList.addEventListener('click',evt=>{
    let btnConnectId=evt.target.dataset.deleteBtnID*1
    let todoItemIndex=todoArr.findIndex(todoItem=>todoItem.id===btnConnectId);
    let checkboxConnectId=evt.target.dataset.deleteCheckboxID*1
    let todoItemObj=todoArr.find(item=>item.id===checkboxConnectId);
     if(evt.target.matches('.delete-chekbox')){
        todoItemObj.isComplited=!todoItemObj.isComplited;
        if(todoItemObj.isComplited){
            counter++
        }
        else{
            counter--;
        }
        elCompletedBtnNumber.textContent=`(${counter})`
        elUncompletedBtnNumber.textContent=`(${todoArr.length-counter})`;
        elList.innerHTML=null;
        renderList(todoArr,elList)
    }
    else if(evt.target.matches('.delete')){
        if(evt.target.matches('.checkbtn')){
            counter--
        }
        elCompletedBtnNumber.textContent=`(${counter})`
        todoArr.splice(todoItemIndex,1);
        elUncompletedBtnNumber.textContent=`(${todoArr.length-counter})`;
        elList.innerHTML='';
        renderList(todoArr,elList);
    }
})
// btn click
elForm.addEventListener('submit',evt=>{
    evt.preventDefault();
    let inputValue=elInput.value;
    let todoItem={
        id:todoArr[todoArr.length-1]?.id+1 ||0,
        title:inputValue,
        isComplited:false
    }
    todoArr.push(todoItem);
    elUncompletedBtnNumber.textContent=`(${todoArr.length-counter})`;
    elInput.value=null
    elList.innerHTML=null
    renderList(todoArr,elList);
})
// renderList
let renderList=(fullArray,htmlElement)=>{
    fullArray.forEach(element => {
        //create elements
        let newItem=document.createElement('li');
        let newDiv=document.createElement('div');
        let newBtn=document.createElement('button');
        let newCheckbox=document.createElement('input');

        newBtn.textContent='Delete'
        //set type
        newCheckbox.type='checkbox';
        newItem.textContent=element.title;

        //set attribute
        newItem.setAttribute('class','d-flex justify-content-between')
        newItem.style.width="80%"
        newItem.style.marginTop="20px"
        newDiv.setAttribute('class','align-items-center')
        newBtn.style.marginLeft='20px'
        newBtn.setAttribute('class','btn btn-danger')
        newCheckbox.setAttribute('class','form-check-input')


        // add class
        newBtn.classList.add('delete');
        newCheckbox.classList.add('delete-chekbox')

        // add dataset
        newBtn.dataset.deleteBtnID=element.id;
        newCheckbox.dataset.deleteCheckboxID=element.id;

        if(element.isComplited){
            newCheckbox.checked=true;
            newItem.style.textDecoration = "line-through";
            newBtn.classList.add('checkbtn')
        }
        // initialize elements
        htmlElement.appendChild(newItem);
        newItem.appendChild(newDiv);
        newDiv.appendChild(newCheckbox)
        newDiv.appendChild(newBtn);
    });
    if(todoArr.length===0){
        elAllBtnNumber.textContent='(0)';
       }
       else{
        elAllBtnNumber.textContent=`(${todoArr.length})`;
       }
}
elAllBtn.addEventListener('click',()=>{
    elList.innerHTML=null;
    renderList(todoArr,elList)
})
elCompletedBtn.addEventListener('click',()=>{
    let completed=todoArr.filter(item=>item.isComplited==true)
    elList.innerHTML=null;
    renderList(completed,elList)
})
elUncompletedBtn.addEventListener('click',()=>{
    let uncompleted=todoArr.filter(item=>item.isComplited==false)
    elList.innerHTML=null;
    renderList(uncompleted,elList)
})