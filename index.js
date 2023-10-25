let myleads=[]
// 1. Turn the myLeads string into an array
// 2. Push a new value to the array
// 3. Turn the array into a string again
// 4. These things would be done in our addEventListener (line 40)


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const data = document.getElementById("input-dt")
const tabBtn = document.getElementById("input-tab")
// getting elements from myleads array using for loop so that we can see the elements on web page basically we are rendering 
//the input text data and showing it to the web page
//Little bit upgrading our function so that we can improve our performance of our function
//In more simple terms we are going to pass an parameter i.e., our array "myleads"
function render(leads){
    let listData = ""
    for(let i=0; i < leads.length; i++)
    {
        //data.textContent += myleads[i] + "  "
        //another alternative way of doing this .innerhtml is
        //1.create html element
        //const li = document.createElement("li")
        //2.set textcontent
        //li.textContent = myleads[i]
        // append to ul in .html file
        //data.append(li)
        //listData += "<li><a target='_blank' href='" + myleads[i] + "'>" + myleads[i] + "</a></li>"
         // Refactor the code below to use a template string
         listData += `
         <li>
             <a target='_blank' href='${leads[i]}'>
                 ${leads[i]}
             </a>
         </li>`
    }
    data.innerHTML = listData
}

inputBtn.addEventListener("click", function()
{
    myleads.push(inputEl.value)
    //cleat the input field
    //simply if we just empty the string value we are getting from input field we can do this the string which we get is inputEl
    inputEl.value = "" 
    // Save the myLeads array to localStorage 
    // PS: remember JSON.stringify()
    localStorage.setItem("myleads", JSON.stringify(myleads))
    render(myleads)
})


// There is one issue that if the user exit the browser all data from extension will be removed
//Therefore, we have to keep those data it simply that the browser should remember those data 
//now here we will use the concept of "LOcal Storage" which you can see in "Inspect->Application" part
//for exapmle let's say you store one web link in the local storage
//localStorage.setItem("myLeads", "www.examplelead.com") // let's say you remove this line that means it has been deleted fro local storage
//console.log( localStorage.getItem("myLeads") )
//localStorage.clear()

// Now we are going to do this so that each time user save a link or tab it should remain even after user exit the web browser

// 1. Save a key-value pair in localStorage
// 2. Refresh the page. Get the value and log it to the console
// 3. Clear localStorage
// 4. We are going to store array i.e.., the links in our local storage
//There is one problem that in local storage the data stored is in string format but in our extension the data come in array format 
// therefore we have to find a way to store the array in local storage

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myleads") )
//1. Checking if any leads are in local storage and if it is there parse it in a new variable
if(leadsFromLocalStorage)
{
    myleads = leadsFromLocalStorage
    render(myleads)
}


//1. To make delete buttton work we are first going to make a delete-btn variable
const deleteBtn = document.getElementById("delete-btn")
// To make this work we are going to addEventListener
deleteBtn.addEventListener ("click", function()
{
    //First let's understand what is going to happen when you are going to double click on "DELETE ALL" button
    //1.CLear Local Stoarge
    localStorage.clear()
    //2.Emptying our array of myleads
    myleads = []
    //3.Calling our function "renderleads() so that this all could be happen in our extension and to get visible so that our user can see"
    render(myleads)
})

// Saving our Google Tab by using chrome.tabs.query API
tabBtn.addEventListener("click",function()
{
    //Grab the URl of current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    }); 
})