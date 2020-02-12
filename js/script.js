let buttons = document.getElementById('game-buttons');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let title = document.getElementById('title');
let description = document.getElementById('description');

let punten = [];
let vraag = 0;
Main();
function Main() {
  verandertitel('Hoofdmenu');
  veranderbuttonText('Start', '', '', 'sla deze vraag over -->');
  knoppendisplay('inline-block', 'none', 'none', 'none');
  button1.onclick = function() {
    Start();
  };
  for (a = 0; a < subjects[0].parties.length; a++) {
    punten.push(0);
  }
}
function verandertitel(titeltekst) {
  title.innerHTML = titeltekst;
}
function veranderbuttonText(waarde1, waarde2, waarde3, waarde4) {
  button1.innerHTML = waarde1;
  button2.innerHTML = waarde2;
  button3.innerHTML = waarde3;
  button4.innerHTML = waarde4;
}
function knoppendisplay(waarde1, waarde2, waarde3, waarde4) {
  button1.style.display = waarde1;
  button2.style.display = waarde2;
  button3.style.display = waarde3;
  button4.style.display = waarde4;
}
function veranderdescriptionText(descriptiontekst) {
  description.innerHTML = descriptiontekst;
}
function buttonhandler(statement) {
  for (k = 0; k < subjects[0].parties.length; k++) {
    if (subjects[vraag].parties[k].position === statement) {
      punten[k] += 1;
    }
    console.log(punten);
  }
}
function Start() {
  verandertitel(subjects[vraag].title);
  veranderdescriptionText(subjects[vraag].statement);
  knoppendisplay(
    'inline-block',
    'inline-block',
    'inline-block',
    'inline-block'
  );
  veranderbuttonText(
    'Eens',
    'Geen van Beide',
    'oneens',
    'sla deze vraag over -->'
  );

  button1.onclick = function() {
    buttonhandler('pro');
    vraag++;
    Start();
  };
  button2.onclick = function() {
    vraag++;
    Start();
  };
  button3.onclick = function() {
    vraag++;
    Start();
  };
  button4.onclick = function() {
    vraag++;
    Start();
  };
}
