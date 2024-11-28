var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var dialog = document.getElementById("box-info");
var closeBtn = document.getElementById("closeBtn");
var dup= document.getElementById('dup');
var boxConent=document.getElementById('box-conent');
var bookmarksList = [];
if (localStorage.length) {
    bookmarksList = JSON.parse(localStorage.getItem('bookmarksList'));
    displayBookmark(bookmarksList);
}

function addBookmark() {
    if (validate(siteNameInput) && validate(siteURLInput)) {
        if (isDuplicate(siteNameInput.value, siteURLInput.value)) {
            dup.showModal();
        }
        else {
            bookmark = {
                siteName: siteNameInput.value,
                siteURL: siteURLInput.value,
            };
            bookmarksList.push(bookmark);
            localStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
            clearForm();
            displayBookmark(bookmarksList);
        }
    }
    else{
        dialog.classList.remove('d-none');
    }
}
function clearForm() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}
function displayBookmark(arr) {
    var newBookmark = '';
    for (var i = 0; i < arr.length; i++) {
        newBookmark += `
              <tr>
                <td>${i + 1}</td>
                <td class="text-capitalize">${arr[i].siteName}</td>              
                <td>
                  <button class="btn btn-visit" onclick="visitBookmark(${i})"">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" onclick="deleteBookmark(${i})"">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
    }
    tableContent.innerHTML = newBookmark;
}
function deleteBookmark(deleteIndex) {
    bookmarksList.splice(deleteIndex, 1);
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
    displayBookmark(bookmarksList);
}
function visitBookmark(visitIndex) {
    open(`https://${bookmarksList[visitIndex].siteURL}`)
}
function isDuplicate(name, url) {
    for (var i = 0; i < bookmarksList.length; i++) {
        if (bookmarksList[i].siteName.toLowerCase() === name.toLowerCase() || bookmarksList[i].siteURL.toLowerCase() === url.toLowerCase()) {
            return true;
        }
        else { return false; }
    }
}
function validate(input) {
    var regex = {
        bookmarkName: /^\w{3,}(\s+\w+)*$/,
        bookmarkURL: /^((https?|ftp):\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/
    }
    var isValid = regex[input.id].test(input.value);
    if (isValid) {
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        input.nextElementSibling.classList.replace('d-block', 'd-none');
    }
    else {
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        input.nextElementSibling.classList.replace('d-none', 'd-block');
    }
    return isValid;
}
function closeDialog(){
    dialog.classList.add('d-none');
    siteNameInput.nextElementSibling.classList.replace('d-block', 'd-none');
    siteNameInput.classList.remove('is-invalid');
}
function closeDup(){
    dup.close();
}
