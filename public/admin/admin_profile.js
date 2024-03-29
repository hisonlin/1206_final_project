const baseUrl = 'https://dreamcardealershop.onrender.com/api/v1';

function needLogin() {
    const adminInfo = JSON.parse(localStorage.getItem('current-admin'));
  
    if (!adminInfo) {
      alert("You need to login to access this page!");
      window.location.href = "/admin/admin_login.html";
    }
    
  }
  needLogin();

const update = (event) =>{
    event.preventDefault();
    const change_email = document.getElementById('change_email');
    const confirm_email = document.getElementById('confirm_email');
    const change_password = document.getElementById('change_password');
    const confirm_password = document.getElementById('confirm_password');
    const alertBox = document.getElementById('notification');
    const adminInfo = JSON.parse(localStorage.getItem('current-admin'));

    // check if passwords match
    if (change_password.value !== confirm_password.value) {
        alertBox.innerHTML = `<div class="alert alert-danger" role="alert">Passwords do not match</div>`;
        change_email.value = "";
        confirm_email.value = "";
        change_password.value = "";
        confirm_password.value = "";
        return;
    }

    if (change_email.value !== confirm_email.value) {
        alertBox.innerHTML = `<div class="alert alert-danger" role="alert">Emails do not match</div>`;
        change_email.value = "";
        confirm_email.value = "";
        change_password.value = "";
        confirm_password.value = "";
        return;
    }

    fetch (`${baseUrl}/admins/${adminInfo._id}`, {
        method: 'PUT',
        body: JSON.stringify({
            admin_id: adminInfo.admin_id,
            name: adminInfo.name,
            email: change_email.value,
            password: change_password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data) {
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;
            localStorage.setItem('current-admin', JSON.stringify(data.data));
            change_email.value = "";
            confirm_email.value = "";
            change_password.value = "";
            confirm_password.value = "";
        } else {
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
            change_email.value = "";
            confirm_email.value = "";
            change_password.value = "";
            confirm_password.value = "";
        }
    })
    .catch(error => {
        console.log(error);
    })

}