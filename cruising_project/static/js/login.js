
const processLogin = () => {
    let frm = document.login;
    if (frm.email.value === '') alert('아이디는?');
    else if (frm.passwd.value === '') alert('비번은?');
    else {
        frm.method = 'post';
        frm.submit();
    }
};

let loginbtn = document.querySelector('#loginbtn');
loginbtn.addEventListener('click', processLogin);

// 로그인 폼과 로그인 버튼 요소 가져오기
const loginForm = document.querySelector("form[name='login']");
const loginBtn = document.querySelector("#loginbtn");

// 로그인 폼에서 키보드 이벤트를 듣기
loginForm.addEventListener("keypress", function(event) {
// 눌린 키가 Enter 키인지 확인
    if (event.keyCode === 13) {
// 기본 폼 제출 동작 방지
        event.preventDefault();
// 로그인 버튼 클릭 이벤트 모방
        loginBtn.click();
    }
});

