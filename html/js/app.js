/*
 * Create a list that holds all of your cards
 */
var cards=["fa-diamond","fa-diamond",
            "fa-paper-plane-o","fa-paper-plane-o",
            "fa-github","fa-github",
            "fa-apple","fa-apple",
            "fa-cube","fa-cube",
            "fa-leaf","fa-leaf",
            "fa-bicycle","fa-bicycle",
            "fa-bomb","fa-bomb"];

    function genarateCard(card)
    {
    	
    	
    	console.log("i am called");
    		 return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
    		
    	console.log(`<li class="card">
                <i class="fa ${card}"></i>
            </li>`);
    	
    }   

    function initGame()
    {
    	var deck=document.querySelector('.deck');
    	var cardHtml=shuffle(cards.map(function(card)
    	{
         console.log("the card is"+card); 
           return genarateCard(card);
    	}));
    

    	
 console.log("i am cardHtml"+cardHtml.join(''));
    	deck.innerHTML=cardHtml.join('');

    	setMovesInit();
    }
initGame();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
console.log("the currentIndex"+currentIndex);
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        console.log("the randomIndex"+randomIndex);
        currentIndex -= 1;
        console.log("the currentIndex new"+currentIndex);
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var restart=document.querySelector('.restart');
restart.addEventListener('click',function(event)
	{
document.location.reload();
	});
// var net =[5,6,7,8,9,8,7,3,0,7,4,6,8,2,3,1];
// shuffle(net);

var gametime = document.querySelector('.timer'),seconds = 0, minutes = 0,t;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        
        
    }
    
    gametime.textContent = `   ${minutes}m:${seconds} s`;

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();
var stars=document.querySelector('.stars');
console.log(stars.children);
console.log(stars.children[2]);

var allcards=document.querySelectorAll('.card');
// console.log(allcards);
var opencards=[];
var trackmoves;
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
allcards.forEach(function(card)
{
console.log("the contains open is"+card.classList.contains('open'));
	 
	card.addEventListener('click',function(event){

		if(!card.classList.contains('open')&& !card.classList.contains('show')&& !card.classList.contains('match'))
{


	console.log("the contains open is"+card.classList.contains('open'));
	console.log(card+" was clicked");

	opencards.push(card);
	console.log("the card is" +opencards.length);
	if(opencards.length<2){
	opencards[0].classList.add('open');
	opencards[0].classList.add('show');
	console.log("inside lesser than")

}
if(opencards.length==2){
	console.log("inside greter than")
opencards[0].classList.add('open','show');	
	opencards[1].classList.add('open','show');

if(opencards[0].dataset.card===opencards[1].dataset.card)
{   
	console.log("yes it is matched");
	opencards[0].classList.add('match');
	opencards[0].classList.add('open');
	opencards[0].classList.add('show');
	opencards[1].classList.add('match');
	opencards[1].classList.add('open');
	opencards[1].classList.add('show');
	
	opencards=[];
	incrementMoves();
    trackmoves=document.querySelector('.moves').innerText;
    console.log("the trackmoves is"+trackmoves);
    if(trackmoves==='10')
    {
        stars.children[2].remove('fa fa-star');
    }

    if(trackmoves==='15')
    {
        //stars.children[2].remove('fa','fa-star');
        stars.children[1].remove('fa','fa-star');
    }
	console.log("checking for winner");
	winning();

}
else
{

    incrementMoves();
    trackmoves=document.querySelector('.moves').innerText;
    console.log("the trackmoves is"+trackmoves);
    if(trackmoves==='10')
    {
        stars.children[2].remove('fa fa-star');
    }

    if(trackmoves==='15')
    {
        //stars.children[2].remove('fa','fa-star');
        stars.children[1].remove('fa','fa-star');
    }
setTimeout(function()
{
 opencards[0].classList.remove('open','show');	

 opencards[1].classList.remove('open','show');

opencards=[];

},1000);
}	
}
}
});

});
function winning()
{
	console.log(" i am inside winning function");
var allcards=document.querySelectorAll('.card');

var allmatch=[];
allcards.forEach(function(card)
{
if(card.classList.contains('match'))
{
allmatch.push(card);
}
});
if(allmatch.length===16)
{
	
	stoptimer();
	console.log("Congratulations you won the game in "+document.querySelector('.timer').innerText+"   with "+document.querySelector('.moves').innerText+ "   moves");
    var modalcontent=document.querySelector('.winningcontent');
    var performance,displaystars=0;
perfomance=document.querySelector('.moves').innerText;
if(perfomance>=10)
{
    displaystars=2;
}
if(perfomance>=15)
{
    displaystars=1
}
if(perfomance<10)
{
    displaystars=3
}

    var winmessage=`CONGRATULATIONS YOU WON the game with ${displaystars} stars and in a Timing of  ${document.querySelector('.timer').innerText}`;
    console.log("the winn message is"+winmessage);
    modalcontent.innerText=winmessage;
        setTimeout(modalDisplay,1000);

}

}

function setMovesInit()
{

	var moves=0;
    document.querySelector('.moves').innerText=moves;
}

function incrementMoves()
{
	var currentmoves=document.querySelector('.moves').innerText;
	currentmoves++;
	document.querySelector('.moves').innerText=currentmoves;
    
}
function stoptimer() {
    clearTimeout(t);
}
function modalDisplay()
{
    modal.style.display = "block"
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
