// for input value
const image = document.getElementById('image');
const names = document.getElementById('name');
const description = document.getElementById('description');

// for History List
const list = document.getElementById('list');
const form = document.getElementById('form');

// Get transactions from local storage
const localStorageFoodies = JSON.parse(localStorage.getItem('foodies'));

let foodies =
	localStorage.getItem('foodies') !== null ? localStorageFoodies : [];

// Add transaction
function addFoodies(e) {
	e.preventDefault();

	const errorMsg = document.querySelector('.errorMsg');
	if (
		image.value === '' ||
		names.value.trim() === '' ||
		description.value.trim() === ''
	) {
		errorMsg.innerHTML = `
		<div class="text-center">
			<span class=" text-danger"">* Field cannot be blank.</span>
		</div>
		`;
	} else {
		const food = {
			id: generateID(),
			image: image.value,
			names: names.value,
			description: description.value,
		};

		foodies.push(food);
		addFoodiesDOM(food);

		updateLocalStorage();

		errorMsg.innerHTML = '';
		image.value = '';
		names.value = '';
		description.value = '';
	}
}
// Generate random ID
function generateID() {
	return Math.floor(Math.random() * 100000000);
}

// Transactions history
function addFoodiesDOM(foodies) {
	// Get sign

	const item = document.createElement('tr');

	// Add class based on value
	item.innerHTML = `
	<td class="col-lg-12 col-xl-12 d-lg-flex d-xl-flex point"> 
		<div class="  col-lg-5 col-xl-5 text-center ">
			<img class="add-food-img" src=${foodies.image} alt="photos">
		</div>

		<div class="col-lg-6 col-xl-6">
			<h2 class="add-food-name">${foodies.names}</h2>
			<p>${foodies.description}</p>
		</div>
		<div class=" col-1">
			<button class="delBtn btn btn-danger btn-sm" onclick="removeFoodies(${foodies.id})">X</button>
		</div>
	</td>
	`;
	list.appendChild(item);
	getSelectedRow();
}

// Remove transaction by ID
function removeFoodies(id) {
	foodies = foodies.filter((foodies) => foodies.id !== id);
	alert('This item will be deleted');
	updateLocalStorage();
	location.reload()
	start();
}

// Update local storage transactions
function updateLocalStorage() {
	localStorage.setItem('foodies', JSON.stringify(foodies));
}

// Start app
function start() {
	list.innerHTML = '';
	foodies.forEach(addFoodiesDOM);
}

start();

form.addEventListener('submit', addFoodies);

// up and down

var index;  // variable to set the selected row index
function getSelectedRow()
{
	var table = document.getElementById("table");
	for(var i = 1; i < table.rows.length; i++)
	{
		table.rows[i].onclick = function()
		{
			// clear the selected from the previous selected row
			// the first time index is undefined
			if(typeof index !== "undefined"){
				table.rows[index].classList.toggle("selected");
			}
		   
			index = this.rowIndex;
			this.classList.toggle("selected");

		};
	}
		
}


getSelectedRow();


function upNdown(direction)
{
	var rows = document.getElementById("table").rows,
		parent = rows[index].parentNode;
	 if(direction === "up")
	 {
		 if(index > 1){
			parent.insertBefore(rows[index],rows[index - 1]);
			// when the row go up the index will be equal to index - 1
			index--;
		}
	 }
	 
	 if(direction === "down")
	 {
		 if(index < rows.length -1){
			parent.insertBefore(rows[index + 1],rows[index]);
			// when the row go down the index will be equal to index + 1
			index++;
		}
	 }
}
