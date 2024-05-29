// save button
const saveBtn = document.getElementById("input-btn");

// delete button
const deleteBtn = document.getElementById("delete-btn");

// save tab button
const saveTabBtn = document.querySelector("#savetab-btn");

// initially setting my leads to empty array
let myLeads = [];

// un-oredered list element
const ulEl = document.getElementById("ul-el");

// input element
const inputEl = document.getElementById("input-el");

// creating a local storage variable and making it array from string
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// check condition to display if there's something in leads array
if (leadsFromLocalStorage) {
  // setting my leads variable to leads from localstorage
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// save tab click event
saveTabBtn.addEventListener("click", () => {

  //to get current url , interact with chrome api and get active tab and active window.
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

    // took the received tab and pushed it into myLeads and then local storage
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);

  })
  
});

// function to iterate through given parameter only receives array parameter
function render(lead) {
  // initally setting list items to empty string
  let listItems = "";

  for (let i = 0; i < lead.length; i++) {
    // assigning list items html values using template string
    listItems += `<li> 
        <a href = "${lead[i]}" target= "_blank"> ${lead[i]} </a>
      </li>`;
  }

  // assigning ul element the list values
  ulEl.innerHTML = listItems;
}

// save input button click event
saveBtn.addEventListener("click", () => {
  // pushing value from input element to leads array
  myLeads.push(inputEl.value);

  //clearing input value to empty
  inputEl.value = "";

  //assigning key value pair to localstorage by converting myLeads array to string as local dtorage only accept string
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);
});

// doubleclick listner event for delete button
deleteBtn.addEventListener("dblclick", () => {
  // clearing local storage
  localStorage.clear();

  // reassigning Myleads array to null
  myLeads = [];
  render(myLeads);
});
