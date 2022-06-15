'use strict'
const elForm=document.querySelector('.form');
const elInput=document.querySelector('.input');
const elList=document.querySelector('.list');

let todoArr=[];
elList.addEventListener('click',evt=>{
    let btnConnectId=evt.target.dataset.deleteBtnID*1
    let todoItemIndex=todoArr.findIndex(todoItem=>todoItem.id===btnConnectId);
    if(evt.target.matches('.delete')){
        todoArr.splice(todoItemIndex,1);
        elList.innerHTML='';
        renderList(todoArr,elList);
    }
    else if(evt.target.matches('.delete-chekbox')){
        let checkboxConnectId=evt.target.dataset.deleteCheckboxID*1
        let todoItemObj=todoArr.find(item=>item.id===checkboxConnectId);
        todoItemObj.isComplited=!todoItemObj.isComplited;
        elList.innerHTML=null;
        renderList(todoArr,elList)
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
        }
        // initialize elements
        htmlElement.appendChild(newItem);
        newItem.appendChild(newDiv);
        newDiv.appendChild(newCheckbox)
        newDiv.appendChild(newBtn);
    });
}