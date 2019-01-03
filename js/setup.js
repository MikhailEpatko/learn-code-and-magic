'use strict';

var Wizard = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария',
    'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла',
    'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
    'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  COUNT: 4
};

var KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userInput = userDialog.querySelector('.setup-user-name');

var similarList = userDialog.querySelector('.setup-similar');
var similarListElement = similarList.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < Wizard.COUNT; i++) {
    wizards.push({
      name: getRandomElement(Wizard.NAMES) + ' ' + getRandomElement(Wizard.SURNAMES),
      coatColor: getRandomElement(Wizard.COAT_COLORS),
      eyesColor: getRandomElement(Wizard.EYES_COLORS)
    });
  }
  return wizards;
};

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizards = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createWizard(arr[i]));
  }

  similarListElement.appendChild(fragment);
};

var showSimilarWizards = function () {
  var wizards = generateWizards();
  createSimilarWizards(wizards);
  similarList.classList.remove('hidden');
};

showSimilarWizards();

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  if (userInput !== document.activeElement) {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  }
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    closePopup();
  }
});

// Изменение цвета мантии, глаз и фаербола по клику на соответствующем элементе
var setupPlayer = userDialog.querySelector('.setup-player');

var wizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
var wizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');

var inputCoat = setupPlayer.querySelector('input[name="coat-color"]');
var inputEyes = setupPlayer.querySelector('input[name="eyes-color"]');
var inputFireball = setupPlayer.querySelector('input[name="fireball-color"]');

var makeCounter = function (arr) {
  var i = 1;
  return function () {
    if (i === arr.length) {
      i = 0;
    }
    return arr[i++];
  };
};

var coatColorCounter = makeCounter(Wizard.COAT_COLORS);
var eyesColorCounter = makeCounter(Wizard.EYES_COLORS);
var fireballColorCounter = makeCounter(Wizard.FIREBALL_COLORS);


var changeCoatColor = function () {
  wizardCoat.style.fill = inputCoat.value = coatColorCounter();
};

var changeEyesColor = function () {
  wizardEyes.style.fill = inputEyes.value = eyesColorCounter();
};

var changeFireballColor = function () {
  wizardFireball.style.backgroundColor = inputFireball.value = fireballColorCounter();
};

wizardCoat.addEventListener('click', changeCoatColor);

wizardEyes.addEventListener('click', changeEyesColor);

wizardFireball.addEventListener('click', changeFireballColor);
