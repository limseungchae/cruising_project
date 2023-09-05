const inputBar = document.querySelector("#comment-input");
const rootDiv = document.querySelector("#comments");
const btn = document.querySelector("#submit");
const mainCommentCount = document.querySelector('#count');
const imotbtn = document.querySelector('#imot_btn');
const imot = document.querySelector('#imot');
const closeimot = document.querySelector('#close_imot');
let editComment = 0;

imotbtn.addEventListener('click',()=>{
    imot.style.display = 'block';
    if(imot.style.display = 'block'){
        window.addEventListener('click', (e) => {
            console.log(e.target.id);
            if ((e.target.id.substring(0,4) !== "imot")&&(e.target.id!=="fst_line")) {
                imot.style.display = "none";
            }
        });
    }
    closeimot.addEventListener('click', () => {
        imot.style.display = "none"
    });
})

imot.addEventListener('click',(e)=>{
    call_imot(e.target.id);
});

if(imot.style.display === 'block') {
    console.log('test');
    detailmain.addEventListener('click', (event) => {
        console.log(event.target);
        if (event.target.parentNode.id !== "cls_imt" || event.target.parentNode.id !== "fst_line") {
            imot.style.display = "none";
        }
    });
}

function call_imot(id){
    switch(id){
        case 'imot_angry' : inputBar.value = inputBar.value+`😡`; inputBar.focus(); break;
        case 'imot_argh' : inputBar.value = inputBar.value+`😫`; inputBar.focus(); break;
        case 'imot_boo' : inputBar.value = inputBar.value+`😛`; inputBar.focus(); break;
        case 'imot_crying' : inputBar.value = inputBar.value+`😭`; inputBar.focus(); break;
        case 'imot_hmm' : inputBar.value = inputBar.value+`🤔`; inputBar.focus(); break;
        case 'imot_laugh' : inputBar.value = inputBar.value+`😁`; inputBar.focus(); break;
        case 'imot_lovely' : inputBar.value = inputBar.value+`😍`; inputBar.focus(); break;
        case 'imot_noo' : inputBar.value = inputBar.value+`😨`; inputBar.focus(); break;
        case 'imot_oh' : inputBar.value = inputBar.value+`😯`; inputBar.focus(); break;
        case 'imot_omg' : inputBar.value = inputBar.value+`😲`; inputBar.focus(); break;
        case 'imot_sleeping' : inputBar.value = inputBar.value+`😴`; inputBar.focus(); break;
        case 'imot_smile' : inputBar.value = inputBar.value+`😀`; inputBar.focus(); break;
        case 'imot_umm' : inputBar.value = inputBar.value+`😐`; inputBar.focus(); break;
    }
}


//타임스템프 만들기
function generateTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const wDate = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const time = year+'-'+month+'-'+wDate+' '+hour+':'+min+':'+sec;
    return time;

}

function generateUserName(){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var makeUsername = '';
    for(let i=0; i<4;i++){
        let index = Math.floor(Math.random(10) * alphabet.length);
        makeUsername += alphabet[index];
    }
    for(let j=0;j<4;j++){
        makeUsername += "*";
    }
    return makeUsername;
}

function deleteComments(event){
    const btn = event.target;
    const list = btn.parentNode.parentNode;//commentList
    rootDiv.removeChild(list);

    if(mainCommentCount.innerHTML <='0'){
        mainCommentCount.innerHTML = 0;
    }else{
        mainCommentCount.innerHTML--;
    }
}

function editComments(event){
    const Cmt = event.target;
    const list = Cmt.parentNode.parentNode;
    btn.innerText = "수정";
    inputBar.value = list.childNodes[1].innerText;
    inputBar.focus();
    editComment++;
    deleteComments(event);

}

function showComment(comment, ranPoint){
    const userName = document.createElement('div');
    const commtop = document.createElement('div');
    const starPoint = document.createElement('div');
    const inputValue = document.createElement('div');
    const showTime = document.createElement('div');
    const voteDiv = document.createElement('div');
    const countSpan = document.createElement('span')
    const voteUp = document.createElement('button');
    const voteDown = document.createElement('button');
    const commentList = document.createElement('div');  //이놈이 스코프 밖으로 나가는 순간 하나지우면 다 지워지고 입력하면 리스트 다불러옴.

    commentList.className = "eachComment";
    commtop.className = "commtop";
    userName.className="name";
    starPoint.className="starPoint";
    inputValue.className="inputValue";
    showTime.className="time";
    voteDiv.className="voteDiv";


    commtop.appendChild(userName);
    commtop.appendChild(starPoint);
    
    userName.style.float = "left";
    userName.innerHTML = generateUserName();
    if(btn.onclick){
        userName.innerHTML = document.getElementById('comm_top').dataset.type;

        const delBtn = document.createElement('button');
        delBtn.className ="deleteComment";
        delBtn.innerHTML="삭제";
        delBtn.style.position = "relative";
        delBtn.style.display = "inline";
        commtop.appendChild(delBtn);
        delBtn.addEventListener("click",deleteComments);

        const editBtn = document.createElement('button');
        editBtn.className ="editComment";
        editBtn.innerHTML="수정";
        editBtn.style.position = "relative";
        editBtn.style.display = "inline";
        commtop.appendChild(editBtn);
        editBtn.addEventListener("click",editComments);
    }

    starPoint.innerHTML = `
        <div class="star" style="
            display: inline-block;
            float: none;
            left: 5px;
            width: 85px;
            height: 16px;
            position: relative;
            font-size: 32px;
            color: #ddd;">
            <img src='../img/graystar.png' style="position: absolute">
            <div id="redstar" style="
                width: ${ranPoint};
                height: 16px;
                position: absolute;
                left: 0px;
                top: 0;
                color: red;
                overflow: hidden;;
                pointer-events: none;">
            <img src="../img/redstar.png" id="redstar" style="position: absolute">
            </div>
        </div>`;
    
    inputValue.style.display = "block";
    inputValue.innerHTML = comment;
    
    showTime.innerHTML = generateTime();
    countSpan.innerHTML=0;
    
    voteUp.id = "voteUp";
    voteUp.innerHTML = `<img src='../img/thumb_up.png'>`;
    voteUp.className = voteUp;
    voteUp.style.backgroundColor = 'white';
    voteUp.style.marginRight = "5px";
    voteUp.style.borderRadius = "5px";
    voteDown.id = "voteDown";
    voteDown.innerHTML = `<img src='../img/thumb_down.png'>`;
    voteDown.className = voteDown;
    voteDown.style.backgroundColor = 'white';
    voteDown.style.borderRadius = "5px";
    voteDiv.appendChild(voteUp);
    voteDiv.appendChild(voteDown);
    
    commentList.appendChild(commtop);
    commentList.appendChild(inputValue);
    commentList.appendChild(showTime);
    commentList.appendChild(voteDiv);
    rootDiv.prepend(commentList);

    voteUp.onclick=function (){
        let count = 0;
        ++count;
        voteUp.innerHTML = '💖 ' + count;
    };

    voteDown.onclick=function (){
        let count = 0;
        ++count;
        voteDown.innerHTML = '💔 ' + count;
    };
}

function pressBtn() {
    if(editComment===1){
        if(inputBar.value==="")inputBar.value = inputBar.placeholder;
        --editComment;
        btn.innerText = "등록";
    }
    const currentVal = inputBar.value;
    const starPoint = document.getElementById('starRange').value + '0%';
    if (!currentVal.length) {
        alert("댓글을 입력해주세요!!");
    } else if(document.getElementById('starRange').value==="0") {
        alert("별점을 입력해주세요!!");
    } else {
        showComment(currentVal, starPoint);
        mainCommentCount.innerHTML++;
        inputBar.value = '';
    }
}

function initialCmt(){
    let bot_comment = [
        '사장님이 맛있고 음식이 친절해요!',
        '😍',
        '리뷰쓰면 군만두 서비스로 준데요']
    for(let i=0;i<3;++i) {
        const currentVal = bot_comment[i];
        const ranPoint = String(Math.round(Math.random()*10+1)*10)+'%';
        showComment(currentVal, ranPoint);
        mainCommentCount.innerHTML++;
        inputBar.value = '';
    }
}

initialCmt();

btn.onclick = pressBtn;