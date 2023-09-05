//join.js

let email = document.querySelector('#email');
let passwd = document.querySelector('input[name="passwd"]');
let repasswd = document.querySelector('input[name="repasswd"]');
let name = document.querySelector('input[name="name"]');
let phone = document.querySelector('input[name="phone"]');
let nick = document.querySelector('input[name="nick"]');
let bth = document.querySelector('input[name="bth"]');

let warn1 =document.querySelector('#warn1');
let warn2 =document.querySelector('#warn2');
let warn3 =document.querySelector('#warn3');
let warn4 =document.querySelector('#warn4');
let warn5 =document.querySelector('#warn5');
let warn6 =document.querySelector('#warn6');
let warn7 =document.querySelector('#warn7');

let joinbtn = document.querySelector('#joinbtn');

const processjoin = async () => {
    let frm = document.joinfrm;
    warn1.textContent = '';
    warn2.textContent = '';
    warn3.textContent = '';
    warn4.textContent = '';
    warn5.textContent = '';
    warn6.textContent = '';
    warn7.textContent = '';
    let emailRe = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[-a-zA-Z0-9]+)+)*$/g;
    let passwdRe = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*_-]).{6,20}$/g;
    let phoneRe = /\d{3}-\d{3,4}-\d{4}/;

    const response = await fetch(`/member/check-email?email=${email.value}`);
    const data = await response.json();
    console.log(data.exists);
    if (data.exists) {
        warn1.textContent = '이미 사용 중인 이메일입니다.';
        email.focus();
    } else if (email.value == '') {
        warn1.textContent = '이메일을 입력하세요!!';
        email.focus();
    } else if (!emailRe.test(email.value)) {
        warn1.textContent = ' 올바른 이메일을 입력해주세요!!';
        email.focus();

    }else if (passwd.value == '') {
        warn2.textContent = '비밀번호 입력하세요!!';
        passwd.focus();
    } else if (!passwdRe.test(passwd.value)) {
        console.log(passwdRe.test(passwd.value));
        warn2.textContent = ' 10~16 자리, 영문/숫자/특수문자 모두 조합!!';
        passwd.focus();
    } else if (repasswd.value == '') {
        warn3.textContent = '비밀번호 확인 입력하세요!!';
        repasswd.focus();
    } else if (repasswd.value !== passwd.value) {
        warn3.textContent = '비밀번호 일치 해야합니다!!';
        repasswd.focus();
    } else if (name.value == '') {
        warn4.textContent = '이름을 입력하세요!!';
        name.focus();
    } else if (phone.value == '') {
        warn5.textContent = '전화번호 입력하세요!!';
        phone.focus();
    } else if (!phoneRe.test(phone.value)) {
        console.log(phoneRe.test(phone.value));
        warn5.textContent = ' 올바른 번호를 입력하세요!!';
        phone.focus();
    } else if (nick.value == '') {
        warn6.textContent = '닉네임 입력하세요!!';
        nick.focus();
    } else if (bth.value == '') {
        warn7.textContent = '생년월일 입력하세요!!';
        bth.focus();
    } else if (grecaptcha.getResponse() === '') {
        warn7.textContent = '자동가입방지를 체크 해주세요!!';
    } else {
        frm.method = 'post';
        frm.enctype = 'application/x-www-form-urlencoded'; //인코팅타입enctyp
        frm.submit();
    }

}
joinbtn.addEventListener('click',processjoin);

//////////////////////////////////////////////////////////////////


const checkbtn = document.querySelector('#checkbtn');
checkbtn.addEventListener('click', async () => {
    let emailRe = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[-a-zA-Z0-9]+)+)*$/g;
    try {
        const response = await fetch(`/member/check-email?email=${email.value}`);
        const data = await response.json();
        if (data.exists) {
            warn1.textContent = '이미 사용 중인 이메일입니다.';
        } else if(email.value == '' ) {
            warn1.textContent = '이메일을 입력하세요!!';
            email.focus();
        }else if (!emailRe.test(email.value)) {
            warn1.textContent = ' 올바른 이메일을 입력해주세요!!';
            email.focus();
        }else{
            warn1.textContent = '사용 가능한 이메일입니다.';
        }

    } catch (error) {
        console.error(error);
        warn7.textContent = '서버 오류가 발생했습니다.join';
    }

});
