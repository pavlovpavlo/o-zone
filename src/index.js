"use strict";

//checkbox

function toggleCheckbox(){
	const checkbox = document.querySelectorAll('#discount-checkbox');
	checkbox.forEach(function(elem){
		elem.addEventListener('change', function(){
			if(this.checked){
				this.nextElementSibling.classList.add('checked');
			} else{
				this.nextElementSibling.classList.remove('checked');
			}
		});	
	});
}


//cart

function toggleCart(){
	const btnCart = document.getElementById('cart');
	const modalCart = document.querySelector('.cart');
	const closeBtn = document.querySelector('.cart-close');
	btnCart.addEventListener('click', ()=>{
		modalCart.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	});
	closeBtn.addEventListener('click', ()=>{
		modalCart.style.display = 'none';
		document.body.style.overflow = '';
	});
}

//order

function addCart(){
	const cards = document.querySelectorAll('.goods .card'),
	  	cartWrapper = document.querySelector('.cart-wrapper'),
	  	cartEmpty = document.querySelector('#cart-empty'),
	  	countGoods = document.querySelector('.counter');

  	cards.forEach((card) => {
		const btn = card.querySelector('button');
		btn.addEventListener('click', ()=>{
			const cardClone = card.cloneNode(true);
			cartWrapper.appendChild(cardClone);
			showData();
			const removeBtn = cardClone.querySelector('.btn');
			removeBtn.textContent = "Удалить из корзины";
			removeBtn.addEventListener('click', ()=>{
				cardClone.remove();
				showData();
			});
		});
	});
	function showData(){
		const cardsCart = cartWrapper.querySelectorAll('.card'),
		cardsPrice = cartWrapper.querySelectorAll('.card-price'),
		cardTotal = document.querySelector('.cart-total span');
		countGoods.textContent = cardsCart.length;
		var sum = 0;
		cardsPrice.forEach((cardPrice) =>{
			sum+= parseFloat(cardPrice.textContent);
		})
		cardTotal.textContent = sum;
		if(cardsCart.length != 0)
			cartEmpty.remove();
		else
			cartWrapper.appendChild(cartEmpty);
	}
}

//filter

function actionPage(){
	const cards = document.querySelectorAll('.goods .card'),
		discountCheckbox = document.getElementById('discount-checkbox'),
		goods = document.querySelector('.goods'),
		min = document.getElementById('min'),
		max = document.getElementById('max'),
		search = document.querySelector('.search-wrapper_input'),
		searchBtn = document.querySelector('.search-btn');

	discountCheckbox.addEventListener('click', mainFilter);
	min.addEventListener('change', mainFilter);
	max.addEventListener('change', mainFilter);
	function mainFilter(){
		cards.forEach((card)=>{
			const cardPrice = card.querySelector('.card-price');
			const price = parseFloat(cardPrice.textContent);

			if((min.value && price < min.value) || (max.value && price > max.value)){
				card.parentNode.remove();

			} else{
				if(discountCheckbox.checked){
					if(!card.querySelector('.card-sale')){
						card.parentNode.remove();
						//card.parentNode.style.display = 'none';
					}
				} else{
					goods.appendChild(card.parentNode);
					//card.parentNode.style.display = '';
				}	
					//goods.appendChild(card.parentNode);
			}
		});
	}
	searchBtn.addEventListener('click', ()=>{
		const searchText = new RegExp(search.value.trim(), 'i');
		cards.forEach((card)=>{
			const title = card.querySelector('.card-title');
			if(!searchText.test(title.textContent)){
				card.parentNode.style.display = 'none';
			} else{
				card.parentNode.style.display = '';
			}
		});
	});
}
//Получение данных с сервера



function getData(){
	const goodsWrapper = document.querySelector('.goods');
	console.log( window.fetch('./db/db.json'));/*.then((response)=>{
		if(response.ok){
			return response.json();
		} else{
			throw new Error('Данные не были получены, ошибка:'+response.status);
		}
	})
	.then((data)=>{ 
		return data;
	}).catch(err=>{
		console.warn(err);
		goodsWrapper.innerHTML='<div style="color:red; font-size:30px;"Упс что-то пошло не так</div>';
	});*/

}
function renderCards(data){
	const goodsWrapper = document.querySelector('.goods');

	data.goods.forEach((good)=>{
		const card = document.createElement('<div>');
		card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
		card.innerHTML = `
			<div class="card">
				<div class="card-img-wrapper">
					<span class="card-img-top"
						style="background-image: url('https://cdn1.ozone.ru/multimedia/c400/1033180284.jpg')"></span>
				</div>
				<div class="card-body justify-content-between">
					<div class="card-price">33990 ₽</div>
					<h5 class="card-title">Игровая приставка Sony PlayStation 4 Pro</h5>
					<button class="btn btn-primary">В корзину</button>
				</div>
			00        00000000000000000000000    </div>
		`;
		goodsWrapper.appendChild(card);
	});
}

getData();

toggleCheckbox();
toggleCart();
addCart();
actionPage()