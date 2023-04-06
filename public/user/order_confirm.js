const thankyou = document.getElementById('thankyou');
function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));

    if (!userInfo) {
        alert("You need to login to access this page!");
        window.location.href = "/user/user_login.html";
    }
    thankyou.innerHTML = `${userInfo.name}, Thank you for your order!`;
}
getUserInfo();